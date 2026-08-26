import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import step5Schema from '../schemas/step5Schema'

function Step5Employment({ onValidChange }) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step5Schema),
    mode: 'onChange',
    defaultValues: {
      employmentType: '',
      employerName: '',
      designation: '',
      workExperience: '',
      monthlyIncome: '',
      otherIncome: '',
      officeAddress: '',
      officePinCode: '',
      officeCity: '',
      officeState: '',
      companyEmail: '',
      noticePeriod: '',
    },
  })

  const employmentType = watch('employmentType')

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
          Step 5
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Employment Information
        </h2>

        <p className="mt-2 text-slate-600">
          Tell us about your current employment and income.
        </p>
      </div>

      <form className="space-y-6">
        {/* Employment */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Employment Details
          </h3>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="employmentType"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Employment Type <span className="text-[#E74C3C]">*</span>
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

            <div>
              <label
                htmlFor="employerName"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                {employmentType === 'Business Owner'
                  ? 'Business Name'
                  : 'Employer Name'}{' '}
                <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="employerName"
                type="text"
                placeholder={
                  employmentType === 'Business Owner'
                    ? 'Enter business name'
                    : 'Enter employer name'
                }
                {...register('employerName')}
                className={inputClass}
              />

              {showError(errors.employerName)}
            </div>

            <div>
              <label
                htmlFor="designation"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Designation / Role{' '}
                <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="designation"
                type="text"
                placeholder="e.g. Software Engineer"
                {...register('designation')}
                className={inputClass}
              />

              {showError(errors.designation)}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="workExperience"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Total Work Experience (Years){' '}
                  <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="workExperience"
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  placeholder="e.g. 3"
                  {...register('workExperience')}
                  className={inputClass}
                />

                {showError(errors.workExperience)}
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
                htmlFor="otherIncome"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Other Monthly Income
              </label>

              <input
                id="otherIncome"
                type="number"
                min="0"
                placeholder="Optional"
                {...register('otherIncome')}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Office */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Work Address
          </h3>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="officeAddress"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Office / Business Address{' '}
                <span className="text-[#E74C3C]">*</span>
              </label>

              <textarea
                id="officeAddress"
                rows={3}
                placeholder="Enter complete office or business address"
                {...register('officeAddress')}
                className={inputClass}
              />

              {showError(errors.officeAddress)}
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="officePinCode"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  PIN Code <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="officePinCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="110001"
                  {...register('officePinCode')}
                  className={inputClass}
                />

                {showError(errors.officePinCode)}
              </div>

              <div>
                <label
                  htmlFor="officeCity"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  City <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="officeCity"
                  type="text"
                  placeholder="City"
                  {...register('officeCity')}
                  className={inputClass}
                />

                {showError(errors.officeCity)}
              </div>

              <div>
                <label
                  htmlFor="officeState"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  State <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="officeState"
                  type="text"
                  placeholder="State"
                  {...register('officeState')}
                  className={inputClass}
                />

                {showError(errors.officeState)}
              </div>
            </div>

            <div>
              <label
                htmlFor="companyEmail"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Company / Business Email{' '}
                <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="companyEmail"
                type="email"
                placeholder="name@company.com"
                {...register('companyEmail')}
                className={inputClass}
              />

              {showError(errors.companyEmail)}
            </div>
          </div>
        </div>

        {/* Notice Period */}
        <div>
          <label
            htmlFor="noticePeriod"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Notice Period (Months){' '}
            <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="noticePeriod"
            type="number"
            min="0"
            max="24"
            placeholder="e.g. 2"
            {...register('noticePeriod')}
            className={inputClass}
          />

          {showError(errors.noticePeriod)}
        </div>
      </form>
    </div>
  )
}

export default Step5Employment