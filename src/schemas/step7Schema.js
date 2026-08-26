import { z } from 'zod'

export const step7Schema = z.object({
  identityProof: z.boolean().refine((value) => value === true, {
    message: 'Please upload identity proof',
  }),

  addressProof: z.boolean().refine((value) => value === true, {
    message: 'Please upload address proof',
  }),

  incomeProof: z.boolean().refine((value) => value === true, {
    message: 'Please upload income proof',
  }),

  consent: z.boolean().refine((value) => value === true, {
    message: 'Please provide consent',
  }),

  esign: z.boolean().refine((value) => value === true, {
    message: 'Please complete e-signature',
  }),
})

export default step7Schema