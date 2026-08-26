import { z } from 'zod'

const referralCodeSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]{6,10}$/, 'Referral code must be 6–10 alphanumeric characters')
  .optional()
  .or(z.literal(''))

export const step1Schema = z.object({
  loanType: z.enum(['personal', 'home', 'business'], {
    error: 'Please select a loan type',
  }),

  loanAmount: z
    .number({
      error: 'Loan amount is required',
    })
    .min(50000, 'Minimum loan amount is ₹50,000'),

  loanTenure: z
    .number({
      error: 'Loan tenure is required',
    })
    .int(),

  loanPurpose: z.string().min(1, 'Please select a loan purpose'),

  referralCode: referralCodeSchema,
})