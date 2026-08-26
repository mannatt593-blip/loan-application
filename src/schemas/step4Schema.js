import { z } from 'zod'

export const step4Schema = z.object({
  currentAddressLine1: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be 200 characters or less'),

  currentAddressLine2: z
    .string()
    .trim()
    .max(200, 'Address must be 200 characters or less')
    .optional()
    .or(z.literal('')),

  pinCode: z
    .string()
    .regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),

  city: z
    .string()
    .trim()
    .min(2, 'City is required'),

  state: z
    .string()
    .trim()
    .min(2, 'State is required'),

  residenceType: z.enum(
    ['Owned', 'Rented', 'Company', 'Family'],
    {
      error: 'Please select residence type',
    },
  ),

  rentAmount: z
    .string()
    .optional()
    .or(z.literal('')),

  yearsAtCurrentAddress: z
    .coerce
    .number()
    .min(0, 'Years cannot be negative')
    .max(50, 'Years cannot exceed 50'),

  sameAsPermanent: z.boolean(),

  permanentAddressLine1: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),

  permanentAddressLine2: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),

  permanentPinCode: z
    .string()
    .optional()
    .or(z.literal('')),

  permanentCity: z
    .string()
    .optional()
    .or(z.literal('')),

  permanentState: z
    .string()
    .optional()
    .or(z.literal('')),
})
  .superRefine((data, ctx) => {
    if (data.residenceType === 'Rented' && !data.rentAmount) {
      ctx.addIssue({
        code: 'custom',
        path: ['rentAmount'],
        message: 'Rent amount is required for rented residence',
      })
    }

    if (!data.sameAsPermanent) {
      if (!data.permanentAddressLine1 || data.permanentAddressLine1.length < 5) {
        ctx.addIssue({
          code: 'custom',
          path: ['permanentAddressLine1'],
          message: 'Permanent address is required',
        })
      }

      if (
        !data.permanentPinCode ||
        !/^\d{6}$/.test(data.permanentPinCode)
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['permanentPinCode'],
          message: 'Enter a valid 6-digit PIN code',
        })
      }

      if (!data.permanentCity) {
        ctx.addIssue({
          code: 'custom',
          path: ['permanentCity'],
          message: 'City is required',
        })
      }

      if (!data.permanentState) {
        ctx.addIssue({
          code: 'custom',
          path: ['permanentState'],
          message: 'State is required',
        })
      }
    }
  })