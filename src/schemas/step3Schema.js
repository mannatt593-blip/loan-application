import { z } from 'zod'

export const step3Schema = z.object({
  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      'Enter a valid PAN number',
    ),

  panName: z
    .string()
    .trim()
    .min(2, 'PAN name is required')
    .regex(
      /^[A-Za-z .]+$/,
      'Only letters, spaces and periods are allowed',
    ),

  aadhaarNumber: z
    .string()
    .regex(
      /^\d{12}$/,
      'Aadhaar number must be exactly 12 digits',
    ),

  aadhaarName: z
    .string()
    .trim()
    .min(2, 'Aadhaar name is required')
    .regex(
      /^[A-Za-z .]+$/,
      'Only letters, spaces and periods are allowed',
    ),

  aadhaarConsent: z
    .boolean()
    .refine(
      (value) => value === true,
      'Aadhaar consent is required',
    ),

  voterId: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]{3}\d{7}$/,
      'Voter ID must contain 3 letters followed by 7 digits',
    )
    .optional()
    .or(z.literal('')),
})