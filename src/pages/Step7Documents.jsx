import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import step7Schema from '../schemas/step7Schema'

function Step7Documents({ onValidChange }) {
  const [uploadedFiles, setUploadedFiles] = useState({
    identityProof: null,
    addressProof: null,
    incomeProof: null,
  })

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step7Schema),
    mode: 'onChange',
    defaultValues: {
      identityProof: false,
      addressProof: false,
      incomeProof: false,
      consent: false,
      esign: false,
    },
  })

  const consent = watch('consent')
  const esign = watch('esign')

  useEffect(() => {
    onValidChange?.(isValid)
  }, [isValid, onValidChange])

  const handleFileChange = (field, event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setUploadedFiles((previous) => ({
      ...previous,
      [field]: file,
    }))

    setValue(field, true, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100'

  const documentCard = (field, title, description) => (
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(event) => handleFileChange(field, event)}
        className={inputClass}
      />

      {uploadedFiles[field] && (
        <p className="mt-2 text-sm text-green-700">
          Uploaded: {uploadedFiles[field].name}
        </p>
      )}

      {errors[field] && (
        <p className="mt-2 text-sm text-[#E74C3C]">
          {errors[field].message}
        </p>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 7
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Documents & E-Signature
        </h2>

        <p className="mt-2 text-slate-600">
          Upload the required documents and complete the consent process.
        </p>
      </div>

      <div className="space-y-5">
        {documentCard(
          'identityProof',
          'Identity Proof',
          'Upload a valid identity document such as PAN, Aadhaar or Passport.',
        )}

        {documentCard(
          'addressProof',
          'Address Proof',
          'Upload a document that verifies your current address.',
        )}

        {documentCard(
          'incomeProof',
          'Income Proof',
          'Upload salary slip, bank statement or other income proof.',
        )}

        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-4 font-semibold text-slate-900">
            Applicant Consent
          </h3>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('consent')}
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm leading-6 text-slate-700">
              I confirm that the information and documents provided by me
              are true and accurate, and I authorize the lender to verify
              the submitted information.
            </span>
          </label>

          {errors.consent && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.consent.message}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-4 font-semibold text-slate-900">
            E-Signature
          </h3>

          <p className="mb-4 text-sm text-slate-600">
            Please confirm that you agree to electronically sign this loan
            application.
          </p>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('esign')}
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm leading-6 text-slate-700">
              I agree to use my electronic signature for this application.
            </span>
          </label>

          {errors.esign && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.esign.message}
            </p>
          )}

          {consent && esign && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              Consent and e-signature confirmation completed.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step7Documents