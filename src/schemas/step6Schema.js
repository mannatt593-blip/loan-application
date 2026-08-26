import { z } from 'zod'

export const step6Schema = z.object({
  hasCoApplicant: z.enum(['Yes', 'No'], {
    error: 'Please select whether you have a co-applicant',
  }),

  relationship: z.string().optional(),

  fullName: z.string().trim().optional(),

  mobileNumber: z.string().optional(),

  email: z.string().optional(),

  dateOfBirth: z.string().optional(),

  panNumber: z.string().optional(),

  monthlyIncome: z.string().optional(),

  employmentType: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasCoApplicant === 'Yes') {
    if (!data.relationship) {
      ctx.addIssue({
        code: 'custom',
        path: ['relationship'],
        message: 'Please select relationship',
      })
    }

    if (!data.fullName || data.fullName.trim().length < 2) {
      ctx.addIssue({
        code: 'custom',
        path: ['fullName'],
        message: 'Full name is required',
      })
    }

    if (!data.mobileNumber || !/^\d{10}$/.test(data.mobileNumber)) {
      ctx.addIssue({
        code: 'custom',
        path: ['mobileNumber'],
        message: 'Enter a valid 10-digit mobile number',
      })
    }

    if (
      !data.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Enter a valid email address',
      })
    }

    if (!data.dateOfBirth) {
      ctx.addIssue({
        code: 'custom',
        path: ['dateOfBirth'],
        message: 'Date of birth is required',
      })
    }

    if (!data.panNumber || !/^[A-Z]{5}\d{4}[A-Z]$/.test(data.panNumber)) {
      ctx.addIssue({
        code: 'custom',
        path: ['panNumber'],
        message: 'Enter a valid PAN number',
      })
    }

    if (!data.monthlyIncome || Number(data.monthlyIncome) <= 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['monthlyIncome'],
        message: 'Enter valid monthly income',
      })
    }

    if (!data.employmentType) {
      ctx.addIssue({
        code: 'custom',
        path: ['employmentType'],
        message: 'Please select employment type',
      })
    }
  }
})

export default step6Schema