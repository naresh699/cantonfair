import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();

        // Prepare payload for WP MU-Plugin Endpoint
        const payload = {
            ...body,
            secret: 'cfi_secure_submission_2026'
        };

        const wpUrl = process.env.WORDPRESS_API_URL
            ? process.env.WORDPRESS_API_URL.replace('/graphql', '/wp-json/cfi/v1/submit-lead')
            : 'http://cantonfairindiacom.local/wp-json/cfi/v1/submit-lead';

        const res = await fetch(wpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to submit to WordPress');
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Visa Submission Error:', error);
        return NextResponse.json(
            { success: false, message: 'Submission failed. Please try again.' },
            { status: 500 }
        );
    }
}
