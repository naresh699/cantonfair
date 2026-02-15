<?php
/**
 * Plugin Name: CantonFairIndia Visa Leads (Auto-Active)
 * Description: Captures and manages Visa Assistant leads and Itinerary content in the WordPress dashboard.
 * Version: 1.1
 * Author: CantonFairIndia
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Register Custom Post Types
function cfi_register_post_types()
{
    // Visa Leads
    register_post_type('visa_lead', array(
        'labels' => array(
            'name' => 'Visa Leads',
            'singular_name' => 'Visa Lead',
            'menu_name' => 'Visa Leads',
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'supports' => array('title', 'custom-fields'),
        'menu_icon' => 'dashicons-id-alt',
    ));

    // Itinerary Days
    register_post_type('itinerary_day', array(
        'labels' => array(
            'name' => 'Itinerary Days',
            'singular_name' => 'Itinerary Day',
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'itineraryDay',
        'graphql_plural_name' => 'itineraryDays',
        'capability_type' => 'post',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-calendar-alt',
    ));

    // Trips
    register_post_type('trip', array(
        'labels' => array(
            'name' => 'Trips',
            'singular_name' => 'Trip',
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'trip',
        'graphql_plural_name' => 'trips',
        'capability_type' => 'post',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-airplane',
    ));

    // FAQs
    register_post_type('faq', array(
        'labels' => array(
            'name' => 'FAQs',
            'singular_name' => 'FAQ',
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'faq',
        'graphql_plural_name' => 'faqs',
        'capability_type' => 'post',
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-editor-help',
    ));

    // Site Content (Hero, etc.)
    register_post_type('site_content', array(
        'labels' => array(
            'name' => 'Site Content',
            'singular_name' => 'Content Item',
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'siteContent',
        'graphql_plural_name' => 'siteContents',
        'capability_type' => 'post',
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-welcome-widgets-menus',
    ));

    // Register Meta for REST
    register_post_meta('trip', 'trip_image_url', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));

    register_post_meta('site_content', 'content_json', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
}
add_action('init', 'cfi_register_post_types');

// 2. Register REST API for Lead Submission
add_action('rest_api_init', function () {
    register_rest_route('cfi/v1', '/submit-lead', array(
        'methods' => 'POST',
        'callback' => 'cfi_handle_lead_submission',
        'permission_callback' => '__return_true',
    ));
});

function cfi_handle_lead_submission($request)
{
    $params = $request->get_json_params();
    $secret = $params['secret'] ?? '';

    if ($secret !== 'cfi_secure_submission_2026') {
        return new WP_Error('unauthorized', 'Invalid secret', array('status' => 403));
    }

    $post_id = wp_insert_post(array(
        'post_title' => sanitize_text_field($params['name']),
        'post_type' => 'visa_lead',
        'post_status' => 'publish',
    ));

    if ($post_id) {
        update_post_meta($post_id, '_cfi_email', sanitize_email($params['email']));
        update_post_meta($post_id, '_cfi_phone', sanitize_text_field($params['phone'] ?? ''));
        update_post_meta($post_id, '_cfi_occupation', sanitize_text_field($params['occupation'] ?? ''));
        update_post_meta($post_id, '_cfi_message', sanitize_textarea_field($params['message'] ?? ''));

        // Send Email Notification
        $admin_email = get_option('admin_email');
        $subject = 'New Visa Lead: ' . sanitize_text_field($params['name']);
        $headers = array('Content-Type: text/html; charset=UTF-8');
        $message = sprintf(
            '<h3>New Visa Assistance Request</h3>
            <p><strong>Name:</strong> %s</p>
            <p><strong>Email:</strong> %s</p>
            <p><strong>Phone:</strong> %s</p>
            <p><strong>Occupation:</strong> %s</p>
            <p><strong>Message:</strong><br>%s</p>',
            $params['name'],
            $params['email'],
            $params['phone'] ?? 'N/A',
            $params['occupation'] ?? 'N/A',
            nl2br($params['message'] ?? '')
        );

        wp_mail($admin_email, $subject, $message, $headers);

        // Send WhatsApp Notification (CallMeBot)
        $wa_message = "New Visa Lead:\n" .
            "Name: " . $params['name'] . "\n" .
            "Phone: " . ($params['phone'] ?? 'N/A') . "\n" .
            "Occupation: " . ($params['occupation'] ?? 'N/A');

        cfi_send_whatsapp_notification($wa_message);

        return array('success' => true, 'lead_id' => $post_id);
    }

    return new WP_Error('failed', 'Failed to save lead', array('status' => 500));
}

function cfi_send_whatsapp_notification($message)
{
    // INFO: To get API Key: Add +34 621 00 24 99 to contacts, send "I allow callmebot to send me messages"
    $phone = '917568778898';
    $apikey = 'YOUR_API_KEY_HERE'; // <--- USER MUST REPLACE THIS

    if ($apikey === 'YOUR_API_KEY_HERE')
        return;

    $url = 'https://api.callmebot.com/whatsapp.php?phone=' . $phone . '&text=' . urlencode($message) . '&apikey=' . $apikey;
    wp_remote_get($url);
}

// 2b. Register Seeding Endpoint
add_action('rest_api_init', function () {
    register_rest_route('cfi/v1', '/seed-content', array(
        'methods' => 'POST',
        'callback' => 'cfi_handle_content_seeding',
        'permission_callback' => '__return_true',
    ));
});

function cfi_handle_content_seeding($request)
{
    $defaults = [
        'visa-features' => [
            'title' => 'Visa Page Features',
            'json' => json_encode(['features' => ["Official document handling", "Fast processing (3-5 days)", "Business Invitations included"], 'form_title' => "Start Your Application"])
        ],
        'footer-content' => [
            'title' => 'Footer Content',
            'json' => json_encode(['tagline_main' => "Canton Fair India. Expert-led business guidance.", 'tagline_sub' => "Bridging Indo-China Business Alliances.", 'copyright' => "© " . date('Y') . " Canton Fair India. All rights reserved."])
        ],
        'canton-page-content' => [
            'title' => 'Canton Fair Page Content',
            'json' => json_encode([
                'why_us' => [
                    ['icon' => 'Users', 'title' => 'Expert Delegation Leader', 'description' => 'Travel with a seasoned China trade expert who speaks Mandarin and knows every hall of the Canton Fair Complex.'],
                    ['icon' => 'ShieldCheck', 'title' => 'Visa & Invitation Handled', 'description' => 'We handle your Business Visa (M Category) application and provide the official invitation letter — zero paperwork stress.'],
                    ['icon' => 'Building2', 'title' => 'Premium Accommodation', 'description' => 'Stay at hand-picked hotels near the Pazhou Complex with breakfast included. Walking distance to the fair.'],
                    ['icon' => 'Target', 'title' => 'Supplier Matching', 'description' => 'Tell us your product requirements before the trip. We pre-identify verified suppliers and schedule meetings for you.'],
                    ['icon' => 'CreditCard', 'title' => 'Payment & Logistics Support', 'description' => 'Navigate WeChat Pay, Alipay, and RMB transactions easily. We assist with sample shipping and freight forwarding.'],
                    ['icon' => 'Trophy', 'title' => 'Post-Fair Support', 'description' => 'Our relationship doesn\'t end at the fair. We help with order follow-ups, quality inspections, and shipping coordination.']
                ]
            ])
        ]
    ];

    $created = [];
    foreach ($defaults as $slug => $data) {
        if (!get_page_by_path($slug, OBJECT, 'site_content')) {
            $pid = wp_insert_post([
                'post_title' => $data['title'],
                'post_name' => $slug,
                'post_type' => 'site_content',
                'post_status' => 'publish',
                'meta_input' => ['content_json' => $data['json']]
            ]);
            $created[] = $slug;
        }
    }

    return ['success' => true, 'created' => $created];
}

// 3. Register GraphQL Fields
add_action('graphql_register_types', function () {
    // Trip Fields Type
    register_graphql_object_type('TripFields', [
        'fields' => [
            'price' => ['type' => 'String'],
            'city' => ['type' => 'String'],
            'features' => ['type' => 'String'],
            'image' => ['type' => 'String'],
        ]
    ]);

    // Add tripFields to Trip
    register_graphql_field('Trip', 'tripFields', [
        'type' => 'TripFields',
        'resolve' => function ($post) {
            return [
                'price' => get_post_meta($post->ID, 'trip_price', true),
                'city' => get_post_meta($post->ID, 'trip_city', true),
                'features' => get_post_meta($post->ID, 'trip_features', true),
                'image' => get_post_meta($post->ID, 'trip_image_url', true),
            ];
        }
    ]);

    // Itinerary Day Fields
    register_graphql_field('ItineraryDay', 'itineraryDayNumber', [
        'type' => 'Int',
        'resolve' => function ($post) {
            return (int) get_post_meta($post->ID, 'itinerary_day', true);
        }
    ]);

    register_graphql_field('ItineraryDay', 'itineraryLocation', [
        'type' => 'String',
        'resolve' => function ($post) {
            return get_post_meta($post->ID, 'itinerary_location', true);
        }
    ]);

    register_graphql_field('ItineraryDay', 'itineraryHighlights', [
        'type' => 'String',
        'resolve' => function ($post) {
            return get_post_meta($post->ID, 'itinerary_highlights', true);
        }
    ]);

    // Enable excerpts for pages
    add_post_type_support('page', 'excerpt');

    // Page Fields
    register_graphql_field('Page', 'excerpt', [
        'type' => 'String',
        'resolve' => function ($post) {
            $raw_post = get_post($post->databaseId);
            return $raw_post ? $raw_post->post_excerpt : '';
        }
    ]);

    // Site Content Fields
    register_graphql_field('SiteContent', 'heroHeading', [
        'type' => 'String',
        'resolve' => function ($post) {
            return get_post_meta($post->ID, 'hero_heading', true);
        }
    ]);

    register_graphql_field('SiteContent', 'heroTagline', [
        'type' => 'String',
        'resolve' => function ($post) {
            return $post->post_content;
        }
    ]);

    register_graphql_field('SiteContent', 'contentJson', [
        'type' => 'String',
        'resolve' => function ($post) {
            return get_post_meta($post->ID, 'content_json', true);
        }
    ]);
});

// 4. Admin Columns for Visa Leads
add_filter('manage_visa_lead_posts_columns', function ($columns) {
    $new_columns = array();
    foreach ($columns as $key => $title) {
        if ($key == 'date') {
            $new_columns['email'] = 'Email';
            $new_columns['phone'] = 'Phone';
            $new_columns['occupation'] = 'Occupation';
            $new_columns['message'] = 'Requirement'; // Added Message as Requirement
        }
        $new_columns[$key] = $title;
    }
    return $new_columns;
});

add_action('manage_visa_lead_posts_custom_column', function ($column, $post_id) {
    switch ($column) {
        case 'email':
            echo esc_html(get_post_meta($post_id, '_cfi_email', true));
            break;
        case 'phone':
            echo esc_html(get_post_meta($post_id, '_cfi_phone', true));
            break;
        case 'occupation':
            echo esc_html(get_post_meta($post_id, '_cfi_occupation', true));
            break;
        case 'message':
            $msg = get_post_meta($post_id, '_cfi_message', true);
            echo mb_strimwidth(esc_html($msg), 0, 50, '...');
            break;
    }
}, 10, 2);
