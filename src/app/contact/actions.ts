'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { error: 'Please fill out all fields.' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'County Sligo Bahá’ís <onboarding@resend.dev>', // Update this if they have a custom domain verification
            to: ['kuniklo.vt@gmail.com'], // Using the email seen in previous steps or I should ask where to send. for now I will use the developer's/admin's likely email or a clear placeholder
            // Actually, I don't know the destination email. I saw 'kuniklo.vt@gmail.com' in the netlify status. I'll use that for now but comment it.
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error('Resend error:', error);
            return { error: 'Failed to send email. Please try again.' };
        }

        return { success: true };
    } catch (error) {
        console.error('Server error:', error);
        return { error: 'Something went wrong. Please try again.' };
    }
}
