import { z } from 'zod'

const calculateAge = (date) => {
  const today = new Date()
  const birthDate = new Date(`${date}T00:00:00`)

  let age = today.getFullYear() - birthDate.getFullYear()

  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Must be at least 2 characters')
  .max(100, 'Must be 100 characters or less')
  .regex(
    /^[A-Za-z .]+$/,
    'Only letters, spaces and periods are allowed',
  )

export const step2Schema = z
  .object({
    fullName: nameSchema,

    dateOfBirth: z
      .string()
      .min(1, 'Date of birth is required')
      .refine(
        (value) => {
          const age = calculateAge(value)
          return age >= 21 && age <= 65
        },
        {
          message: 'Applicant age must be between 21 and 65 years',
        },
      ),

    gender: z.enum(['Male', 'Female', 'Other'], {
      error: 'Please select gender',
    }),

    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed'], {
      error: 'Please select marital status',
    }),

    fatherName: nameSchema,

    motherName: nameSchema,

    email: z
      .string()
      .trim()
      .email('Enter a valid email address'),

    mobile: z
      .string()
      .regex(
        /^[6-9]\d{9}$/,
        'Mobile number must be 10 digits starting with 6–9',
      ),

    alternateMobile: z
      .string()
      .regex(
        /^[6-9]\d{9}$/,
        'Alternate mobile must be 10 digits starting with 6–9',
      )
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) =>
      !data.alternateMobile ||
      data.alternateMobile !== data.mobile,
    {
      path: ['alternateMobile'],
      message: 'Alternate mobile must be different from primary mobile',
    },
  )