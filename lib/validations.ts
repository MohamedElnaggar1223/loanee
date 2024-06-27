import { z } from "zod"

export const signUpSchema = z.object({
    fistName: z.string().min(2, {
        message: 'Invalid first name'
    }),
    jobTitle: z.string().min(2, {
        message: 'Invalid job title'
    }),
    email: z.string().email({
        message: 'Invalid email'
    }),
    mobile: z.string().min(6, {
        message: 'Invalid mobile number'
    }).refine(value => {
        return /^\d+$/.test(value)
    }),
    countryCode: z.string()
})