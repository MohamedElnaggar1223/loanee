'use server'
import { signUpSchema } from './validations';
import { Resend } from 'resend';
import z from 'zod'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY!)

export const sendMail = (data: z.infer<typeof signUpSchema>) => {
    try
    {
        console.log('entered')
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'hello@loanee.ae',
            // to: 'maelnaggar1223@gmail.com',
            subject: 'New sign up',
            html: `<p><strong>Email:</strong> ${data.email} <strong>First name:</strong> ${data.fistName} <strong>Number:</strong> ${data.countryCode}${data.mobile} <strong>Job title:</strong> ${data.jobTitle}</p>`
        }).then(data => console.log(data.data?.id))
    }
    catch (error)
    {
        console.error(error)
    }
}