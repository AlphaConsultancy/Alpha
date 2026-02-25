import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const rawBody = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString() : event.body;
        let data;
        if (event.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
            data = Object.fromEntries(new URLSearchParams(rawBody || '').entries());
        } else {
            data = JSON.parse(rawBody || '{}');
        }

        const {
            firstName, lastName, email, phone, ageGroup,
            consultationType, date, time, mode, message
        } = data;

        // Use the provided API key (Preferably from Env Var, but hardcoded here for your immediate test)
        const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_XbK4mcwN_PVApgbTrBV9GwvVjaNsiUU2w';

        const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Alpha Consultancy <onboarding@resend.dev>',
                to: ['alphaconsultancyinc@gmail.com'], // Sent to your test address as requested
                subject: `Strategic Session Request: ${firstName} ${lastName}`,
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #06b6d433; border-radius: 16px; padding: 32px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                        <div style="text-align: center; margin-bottom: 32px;">
                            <h1 style="color: #06b6d4; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.025em;">Alpha Consultancy</h1>
                            <p style="color: #64748b; font-size: 14px; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em;">New Consultation Request</p>
                        </div>
                        
                        <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                            <h2 style="font-size: 14px; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Client Information</h2>
                            <p style="margin: 8px 0;"><strong>Name:</strong> <span style="color: #334155;">${firstName} ${lastName}</span></p>
                            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></p>
                            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #334155; text-decoration: none;">${phone}</a></p>
                            <p style="margin: 8px 0;"><strong>Age Group:</strong> <span style="color: #334155;">${ageGroup}</span></p>
                        </div>

                        <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                            <h2 style="font-size: 14px; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Strategic Details</h2>
                            <p style="margin: 8px 0;"><strong>Pathway:</strong> <span style="color: #334155;">${consultationType}</span></p>
                            <p style="margin: 8px 0;"><strong>Date:</strong> <span style="color: #334155;">${date}</span></p>
                            <p style="margin: 8px 0;"><strong>Timeline:</strong> <span style="color: #334155;">${time}</span></p>
                            <p style="margin: 8px 0;"><strong>Interface:</strong> <span style="color: #334155;">${mode}</span></p>
                        </div>

                        <div style="margin-bottom: 32px;">
                            <h2 style="font-size: 14px; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">Message / Goals</h2>
                            <div style="background-color: #f1f5f9; border-left: 4px solid #06b6d4; padding: 16px; border-radius: 4px; color: #475569; line-height: 1.6; font-style: italic;">
                                "${message}"
                            </div>
                        </div>

                        <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center;">
                            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                                This is an automated secure transmission from the Alpha Consultancy portal.
                            </p>
                        </div>
                    </div>
                `
            })
        });

        if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            console.error('Resend API Error:', errorData);
            throw new Error('Email delivery service failure');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Submission successful' }),
        };
    } catch (error) {
        console.error('Final Processing Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'System processing error. Please use direct email.' }),
        };
    }
};
