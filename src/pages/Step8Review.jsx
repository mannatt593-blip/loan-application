import { useEffect, useState } from 'react'

function Step8Review({ onValidChange }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    onValidChange?.(true)
  }, [onValidChange])

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-xl border border-green-200 bg-green-50 p-8">
          <div className="mb-4 text-4xl">✓</div>

          <h2 className="text-2xl font-bold text-slate-900">
            Application Submitted Successfully
          </h2>

          <p className="mt-3 text-slate-600">
            Your loan application has been submitted for verification.
          </p>

          <div className="mt-5 rounded-lg bg-white p-4 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Application ID:</span>{' '}
              LS-{Date.now().toString().slice(-8)}
            </p>

            <p className="mt-2">
              You will receive further updates after the application is
              reviewed.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 8
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Review & Submit
        </h2>

        <p className="mt-2 text-slate-600">
          Review your application before submitting it.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Application Review
          </h3>

          <p className="text-sm leading-6 text-slate-600">
            Please make sure all the information provided in the previous
            steps is accurate and all required documents have been
            uploaded.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Final Checklist
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                Loan information completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                Personal information completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                KYC verification completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                Address information completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                Employment information completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                Co-applicant information completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-slate-700">
                Documents and e-signature completed
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm leading-6 text-slate-600">
            By submitting this application, you confirm that the
            information provided is accurate and authorize LendSwift to
            process your loan application.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-lg bg-[#1F4E79] px-5 py-3 font-semibold text-white transition hover:bg-[#173B5C]"
        >
          Submit Loan Application
        </button>
      </div>
    </div>
  )
}

export default Step8Review