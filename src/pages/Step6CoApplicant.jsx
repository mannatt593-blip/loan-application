import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import step6Schema from '../schemas/step6Schema'

function Step6CoApplicant({ onValidChange }) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step6Schema),
    mode: 'onChange',
    defaultValues: {
      hasCoApplicant: '',
      relationship: '',
      fullName: '',
      mobileNumber: '',
      email: '',
      dateOfBirth: '',
      panNumber: '',
      monthlyIncome: '',
      employmentType: '',
    },
  })

  const hasCoApplicant = watch('hasCoApplicant')

  useEffect(() => {
    onValidChange?.(isValid)
  }, [isValid, onValidChange])

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100'

  const showError = (error) =>
    error ? (
      <p className="mt-2 text-sm text-[#E74C3C]">
        {error.message}
      </p>
    ) : null

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 6
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Co-Applicant Details
        </h2>

        <p className="mt-2 text-slate-600">
          Add a co-applicant if someone will jointly apply for this loan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Co-applicant selection */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Co-Applicant
          </h3>

          <div>
            <label
              htmlFor="hasCoApplicant"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Do you have a co-applicant?{' '}
              <span className="text-[#E74C3C]">*</span>
            </label>

            <select
              id="hasCoApplicant"
              {...register('hasCoApplicant')}
              className={inputClass}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {showError(errors.hasCoApplicant)}
          </div>
        </div>

        {/* No co-applicant */}
        {hasCoApplicant === 'No' && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <h3 className="font-semibold text-slate-900">
              No co-applicant selected
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              You can continue without adding a co-applicant.
            </p>
          </div>
        )}

        {/* Co-applicant details */}
        {hasCoApplicant === 'Yes' && (
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Applicant Information
            </h3>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="relationship"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Relationship with Applicant{' '}
                  <span className="text-[#E74C3C]">*</span>
                </label>

                <select
                  id="relationship"
                  {...register('relationship')}
                  className={inputClass}
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Other">Other</option>
                </select>

                {showError(errors.relationship)}
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Full Name <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  {...register('fullName')}
                  className={inputClass}
                />

                {showError(errors.fullName)}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Mobile Number{' '}
                    <span className="text-[#E74C3C]">*</span>
                  </label>

                  <input
                    id="mobileNumber"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    {...register('mobileNumber')}
                    className={inputClass}
                  />

                  {showError(errors.mobileNumber)}
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Date of Birth{' '}
                    <span className="text-[#E74C3C]">*</span>
                  </label>

                  <input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                    className={inputClass}
                  />

                  {showError(errors.dateOfBirth)}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="coapplicant@email.com"
                  {...register('email')}
                  className={inputClass}
                />

                {showError(errors.email)}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="panNumber"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    PAN Number{' '}
                    <span className="text-[#E74C3C]">*</span>
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
                    className={inputClass}
                  />

                  {showError(errors.panNumber)}
                </div>

                <div>
                  <label
                    htmlFor="monthlyIncome"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Monthly Income (₹){' '}
                    <span className="text-[#E74C3C]">*</span>
                  </label>

                  <input
                    id="monthlyIncome"
                    type="number"
                    min="1"
                    placeholder="e.g. 50000"
                    {...register('monthlyIncome')}
                    className={inputClass}
                  />

                  {showError(errors.monthlyIncome)}
                </div>
              </div>

              <div>
                <label
                  htmlFor="employmentType"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Employment Type{' '}
                  <span className="text-[#E74C3C]">*</span>
                </label>

                <select
                  id="employmentType"
                  {...register('employmentType')}
                  className={inputClass}
                >
                  <option value="">Select employment type</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business Owner">Business Owner</option>
                </select>

                {showError(errors.employmentType)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step6CoApplicant