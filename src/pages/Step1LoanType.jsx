import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema } from '../schemas/step1Schema'
import { loanTypes } from '../constants/loanTypes'

function Step1LoanType({ onValidChange }) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: {
      loanType: '',
      loanAmount: '',
      loanTenure: '',
      loanPurpose: '',
      referralCode: '',
    },
  })

  const loanType = watch('loanType')
  const selectedLoan = loanTypes[loanType]

  useEffect(() => {
    onValidChange?.(isValid)
  }, [isValid, onValidChange])

  const formatCurrency = (value) => {
    if (!value) return ''

    return new Intl.NumberFormat('en-IN').format(value)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 1
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Choose your loan
        </h2>

        <p className="mt-2 text-slate-600">
          Select a loan type and provide some basic information to get started.
        </p>
      </div>

      <div className="space-y-6">
        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-slate-800">
            Loan Type <span className="text-[#E74C3C]">*</span>
          </legend>

          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(loanTypes).map(([key, loan]) => (
              <label
                key={key}
                className={`cursor-pointer rounded-xl border-2 p-5 transition ${
                  loanType === key
                    ? 'border-[#1F4E79] bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  value={key}
                  {...register('loanType')}
                  className="sr-only"
                />

                <span className="block text-base font-semibold text-slate-900">
                  {loan.label}
                </span>

                <span className="mt-2 block text-sm text-slate-600">
                  {loan.description}
                </span>
              </label>
            ))}
          </div>

          {errors.loanType && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.loanType.message}
            </p>
          )}
        </fieldset>

        <div>
          <label
            htmlFor="loanAmount"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Loan Amount <span className="text-[#E74C3C]">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ₹
            </span>

            <input
              id="loanAmount"
              type="number"
              inputMode="numeric"
              placeholder="Enter loan amount"
              {...register('loanAmount', {
                setValueAs: (value) =>
                  value === '' ? undefined : Number(value),
              })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pl-9 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {selectedLoan && (
            <p className="mt-2 text-xs text-slate-500">
              Available range: ₹50,000 – ₹
              {formatCurrency(selectedLoan.maxAmount)}
            </p>
          )}

          {errors.loanAmount && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.loanAmount.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="loanTenure"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Loan Tenure <span className="text-[#E74C3C]">*</span>
          </label>

          <select
            id="loanTenure"
            disabled={!selectedLoan}
            {...register('loanTenure', {
              setValueAs: (value) =>
                value === '' ? undefined : Number(value),
            })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          >
            <option value="">Select tenure</option>

            {selectedLoan &&
              Array.from(
                {
                  length:
                    (selectedLoan.tenure[1] - selectedLoan.tenure[0]) / 12 + 1,
                },
                (_, index) => selectedLoan.tenure[0] + index * 12,
              ).map((months) => (
                <option key={months} value={months}>
                  {months} months ({months / 12} years)
                </option>
              ))}
          </select>

          {errors.loanTenure && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.loanTenure.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="loanPurpose"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Loan Purpose <span className="text-[#E74C3C]">*</span>
          </label>

          <select
            id="loanPurpose"
            disabled={!selectedLoan}
            {...register('loanPurpose')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          >
            <option value="">Select purpose</option>

            {selectedLoan?.purposes.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>

          {errors.loanPurpose && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.loanPurpose.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="referralCode"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Referral Code{' '}
            <span className="font-normal text-slate-500">(Optional)</span>
          </label>

          <input
            id="referralCode"
            type="text"
            maxLength={10}
            placeholder="Enter referral code"
            {...register('referralCode')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.referralCode && (
            <p className="mt-2 text-sm text-[#E74C3C]">
              {errors.referralCode.message}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-500">
            6–10 alphanumeric characters
          </p>
        </div>
      </div>
    </div>
  )
}

export default Step1LoanType