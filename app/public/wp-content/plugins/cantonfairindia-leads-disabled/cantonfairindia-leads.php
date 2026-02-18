<?php
/**
 * Plugin Name: CantonFairIndia Visa Leads
 * Description: Captures and manages Visa Assistant leads in the WordPress dashboard.
 * Version: 1.0
 * Author: CantonFairIndia
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Register Custom Post Type
function cfi_register_visa_leads()
{
    $labels = array(
        'name' => 'Visa Leads',
        'singular_name' => 'Visa Lead',
        'menu_name' => 'Visa Leads',
        'add_new' => 'Add New Lead',
        'all_items' => 'All Leads',
        'search_items' => 'Search Leads',
        'not_found' => 'No leads found',
    );

    $args = array(
        'labels' => $labels,
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'supports' => array('title', 'custom-fields'),
        'menu_icon' => 'dashicons-id-alt',
    );

    register_post_type('visa_lead', $args);
}
add_action('init', 'cfi_register_visa_leads');

// 2. Add Custom Columns to Dashboard
function cfi_set_custom_edit_visa_lead_columns($columns)
{
    unset($columns['date']);
    $columns['email'] = 'Email';
    $columns['passport'] = 'Passport';
    $columns['purpose'] = 'Purpose';
    $columns['date'] = 'Date';
    return $columns;
}
add_filter('manage_visa_lead_posts_columns', 'cfi_set_custom_edit_visa_lead_columns');

function cfi_visa_lead_custom_column($column, $post_id)
{
    switch ($column) {
        case 'email':
            echo get_post_meta($post_id, '_cfi_email', true);
            break;
        case 'passport':
            echo get_post_meta($post_id, '_cfi_passport', true);
            break;
        case 'purpose':
            echo get_post_meta($post_id, '_cfi_purpose', true);
            break;
    }
}
add_action('manage_visa_lead_posts_custom_column', 'cfi_visa_lead_custom_column', 10, 2);

// 3. Custom REST API Endpoint for Submissions
add_action('rest_api_init', function () {
    register_rest_route('cfi/v1', '/submit-lead', array(
        'methods' => 'POST',
        'callback' => 'cfi_handle_lead_submission',
        'permission_callback' => '__return_true', // Validation performed inside callback via secret
    ));
});

function cfi_handle_lead_submission($request)
{
    $params = $request->get_json_params();
    $secret = $params['secret'] ?? '';

    // Simple security check
    if ($secret !== 'cfi_secure_submission_2026') {
        return new WP_Error('unauthorized', 'Invalid secret', array('status' => 403));
    }

    $name = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $passport = sanitize_text_field($params['passportNumber']);
    $purpose = sanitize_text_field($params['reason']);

    $post_id = wp_insert_post(array(
        'post_title' => $name,
        'post_type' => 'visa_lead',
        'post_status' => 'publish',
    ));

    if ($post_id) {
        update_post_meta($post_id, '_cfi_email', $email);
        update_post_meta($post_id, '_cfi_passport', $passport);
        update_post_meta($post_id, '_cfi_purpose', $purpose);

        return array('success' => true, 'lead_id' => $post_id);
    }

    return new WP_Error('failed', 'Failed to save lead', array('status' => 500));
}
