import { z } from 'zod'

export const step5Schema = z
  .object({
    employmentType: z.enum(
      ['Salaried', 'Self-Employed', 'Business Owner'],
      {
        error: 'Please select employment type',
      },
    ),

    employerName: z
      .string()
      .trim()
      .min(2, 'Employer or business name is required'),

    designation: z
      .string()
      .trim()
      .min(2, 'Designation is required'),

    workExperience: z.coerce
      .number()
      .min(0, 'Experience cannot be negative')
      .max(50, 'Experience cannot exceed 50 years'),

    monthlyIncome: z.coerce
      .number()
      .positive('Monthly income must be greater than 0'),

    otherIncome: z
      .string()
      .optional()
      .or(z.literal('')),

    officeAddress: z
      .string()
      .trim()
      .min(5, 'Office address is required'),

    officePinCode: z
      .string()
      .regex(/^\d{6}$/, 'Office PIN code must be exactly 6 digits'),

    officeCity: z
      .string()
      .trim()
      .min(2, 'Office city is required'),

    officeState: z
      .string()
      .trim()
      .min(2, 'Office state is required'),

    companyEmail: z
      .string()
      .email('Enter a valid company email'),

    noticePeriod: z.coerce
      .number()
      .min(0, 'Notice period cannot be negative')
      .max(24, 'Notice period cannot exceed 24 months'),
  })

export default step5Schema