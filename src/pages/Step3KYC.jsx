import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step3Schema } from '../schemas/step3Schema'

function Step3KYC({ onValidChange }) {
  const [verificationStatus, setVerificationStatus] = useState('pending')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step3Schema),
    mode: 'onChange',
    defaultValues: {
      panNumber: '',
      panName: '',
      aadhaarNumber: '',
      aadhaarName: '',
      aadhaarConsent: false,
      voterId: '',
    },
  })

  useEffect(() => {
    onValidChange?.(
      isValid && verificationStatus === 'verified',
    )
  }, [isValid, verificationStatus, onValidChange])

  const handleVerify = () => {
    if (!isValid) return

    setVerificationStatus('verifying')

    setTimeout(() => {
      setVerificationStatus('verified')
    }, 1500)
  }

  const getStatusMessage = () => {
    if (verificationStatus === 'verifying') {
      return 'Verifying your KYC details...'
    }

    if (verificationStatus === 'verified') {
      return 'KYC verified successfully'
    }

    return 'Complete your details and provide Aadhaar consent.'
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 3
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Identity Verification
        </h2>

        <p className="mt-2 text-slate-600">
          Verify your identity using your PAN and Aadhaar details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleVerify)}
        className="space-y-6"
      >
        {/* PAN */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            PAN Details
          </h3>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="panNumber"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                PAN Number <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="panNumber"
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                {...register('panNumber')}
                onInput={(event) => {
                  event.currentTarget.value =
                    event.currentTarget.value.toUpperCase()
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 uppercase tracking-wider outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
              />

              {errors.panNumber && (
                <p className="mt-2 text-sm text-[#E74C3C]">
                  {errors.panNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="panName"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Name as per PAN <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="panName"
                type="text"
                placeholder="Enter name as per PAN"
                {...register('panName')}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
              />

              {errors.panName && (
                <p className="mt-2 text-sm text-[#E74C3C]">
                  {errors.panName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Aadhaar */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Aadhaar Details
          </h3>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="aadhaarNumber"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Aadhaar Number <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="aadhaarNumber"
                type="password"
                inputMode="numeric"
                maxLength={12}
                placeholder="Enter 12-digit Aadhaar number"
                {...register('aadhaarNumber')}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 tracking-wider outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
              />

              {errors.aadhaarNumber && (
                <p className="mt-2 text-sm text-[#E74C3C]">
                  {errors.aadhaarNumber.message}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-500">
                Your Aadhaar number is masked for privacy.
              </p>
            </div>

            <div>
              <label
                htmlFor="aadhaarName"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Name as per Aadhaar{' '}
                <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="aadhaarName"
                type="text"
                placeholder="Enter name as per Aadhaar"
                {...register('aadhaarName')}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
              />

              {errors.aadhaarName && (
                <p className="mt-2 text-sm text-[#E74C3C]">
                  {errors.aadhaarName.message}
                </p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <input
                type="checkbox"
                {...register('aadhaarConsent')}
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm text-slate-700">
                I consent to Aadhaar verification for this loan
                application.
                <span className="ml-1 text-[#E74C3C]">*</span>
              </span>
            </label>

            {errors.aadhaarConsent && (
              <p className="-mt-3 text-sm text-[#E74C3C]">
                {errors.aadhaarConsent.message}
              </p>
            )}
          </div>
        </div>

        {/* Voter ID */}
        <div>
          <label
            htmlFor="voterId"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Voter ID{' '}
            <span className="font-normal text-slate-500">
              (Optional)
            </span>
          </label>

          <input
            id="voterId"
            type="text"
            maxLength={10}
            placeholder="ABC1234567"
            {...register('voterId')}
            onInput={(event) => {
              event.currentTarget.value =
                event.currentTarget.value.toUpperCase()
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 uppercase tracking-wider outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.voterId && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.voterId.message}
            </p>
          )}
        </div>

        {/* Verification */}
        <div
          className={`rounded-xl border p-5 ${
            verificationStatus === 'verified'
              ? 'border-green-200 bg-green-50'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                KYC Verification Status
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                {getStatusMessage()}
              </p>
            </div>

            <button
              type="submit"
              disabled={
                !isValid ||
                verificationStatus === 'verifying' ||
                verificationStatus === 'verified'
              }
              className="rounded-lg bg-[#1F4E79] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {verificationStatus === 'verifying'
                ? 'Verifying...'
                : verificationStatus === 'verified'
                  ? 'Verified'
                  : 'Verify KYC'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Step3KYC