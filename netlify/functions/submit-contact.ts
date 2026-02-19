import { neon } from '@netlify/neon';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const sql = neon(process.env.NETLIFY_DATABASE_URL!);

        // Parse the form body
        // Supports both JSON and URL-encoded
        let data;
        if (event.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
            data = Object.fromEntries(new URLSearchParams(event.body || '').entries());
        } else {
            data = JSON.parse(event.body || '{}');
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            ageGroup,
            consultationType,
            date,
            time,
            mode,
            message
        } = data;

        // Create table if it doesn't exist
        await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        age_group TEXT,
        consultation_type TEXT,
        preferred_date TEXT,
        time_slot TEXT,
        meeting_mode TEXT,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

        // Insert the submission
        await sql`
      INSERT INTO contact_submissions (
        first_name, last_name, email, phone, age_group, 
        consultation_type, preferred_date, time_slot, meeting_mode, message
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone}, ${ageGroup}, 
        ${consultationType}, ${date}, ${time}, ${mode}, ${message}
      )
    `;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Submission successful' }),
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to save submission' }),
        };
    }
};
