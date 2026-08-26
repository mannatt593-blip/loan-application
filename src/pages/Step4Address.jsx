import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step4Schema } from '../schemas/step4Schema'

const pinData = {
  '110001': {
    city: 'New Delhi',
    state: 'Delhi',
  },
  '400001': {
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  '560001': {
    city: 'Bengaluru',
    state: 'Karnataka',
  },
  '700001': {
    city: 'Kolkata',
    state: 'West Bengal',
  },
}

function Step4Address({ onValidChange }) {
  const [pinMessage, setPinMessage] = useState('')

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step4Schema),
    mode: 'onChange',
    defaultValues: {
      currentAddressLine1: '',
      currentAddressLine2: '',
      pinCode: '',
      city: '',
      state: '',
      residenceType: '',
      rentAmount: '',
      yearsAtCurrentAddress: '',
      sameAsPermanent: true,
      permanentAddressLine1: '',
      permanentAddressLine2: '',
      permanentPinCode: '',
      permanentCity: '',
      permanentState: '',
    },
  })

  const pinCode = watch('pinCode')
  const residenceType = watch('residenceType')
  const sameAsPermanent = watch('sameAsPermanent')

  useEffect(() => {
    onValidChange?.(isValid)
  }, [isValid, onValidChange])

  useEffect(() => {
    if (pinCode?.length !== 6) {
      setPinMessage('')
      return
    }

    const result = pinData[pinCode]

    if (result) {
      setValue('city', result.city, {
        shouldValidate: true,
      })

      setValue('state', result.state, {
        shouldValidate: true,
      })

      setPinMessage('PIN verified and location found.')
    } else {
      setValue('city', '')
      setValue('state', '')
      setPinMessage(
        'PIN not found in demo lookup. You can still enter city and state manually.',
      )
    }
  }, [pinCode, setValue])

  const handleFormSubmit = () => {
    onValidChange?.(true)
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100'

  const errorText = (message) => (
    <p className="mt-2 text-sm text-[#E74C3C]">{message}</p>
  )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 4
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Address Information
        </h2>

        <p className="mt-2 text-slate-600">
          Provide your current residential address and permanent address
          details.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Current Address */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Current Address
          </h3>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="currentAddressLine1"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Address Line 1 <span className="text-[#E74C3C]">*</span>
              </label>

              <input
                id="currentAddressLine1"
                type="text"
                placeholder="House / Flat No., Street"
                {...register('currentAddressLine1')}
                className={inputClass}
              />

              {errors.currentAddressLine1 &&
                errorText(errors.currentAddressLine1.message)}
            </div>

            <div>
              <label
                htmlFor="currentAddressLine2"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Address Line 2
              </label>

              <input
                id="currentAddressLine2"
                type="text"
                placeholder="Area / Landmark"
                {...register('currentAddressLine2')}
                className={inputClass}
              />

              {errors.currentAddressLine2 &&
                errorText(errors.currentAddressLine2.message)}
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="pinCode"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  PIN Code <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="pinCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="110001"
                  {...register('pinCode')}
                  className={inputClass}
                />

                {errors.pinCode && errorText(errors.pinCode.message)}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  City <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  {...register('city')}
                  className={inputClass}
                />

                {errors.city && errorText(errors.city.message)}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  State <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="state"
                  type="text"
                  placeholder="State"
                  {...register('state')}
                  className={inputClass}
                />

                {errors.state && errorText(errors.state.message)}
              </div>
            </div>

            {pinMessage && (
              <p className="text-sm text-slate-600">
                {pinMessage}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="residenceType"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Residence Type <span className="text-[#E74C3C]">*</span>
                </label>

                <select
                  id="residenceType"
                  {...register('residenceType')}
                  className={inputClass}
                >
                  <option value="">Select residence type</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                  <option value="Company">Company Provided</option>
                  <option value="Family">Family Owned</option>
                </select>

                {errors.residenceType &&
                  errorText(errors.residenceType.message)}
              </div>

              <div>
                <label
                  htmlFor="yearsAtCurrentAddress"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Years at Current Address{' '}
                  <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="yearsAtCurrentAddress"
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  placeholder="e.g. 3"
                  {...register('yearsAtCurrentAddress')}
                  className={inputClass}
                />

                {errors.yearsAtCurrentAddress &&
                  errorText(errors.yearsAtCurrentAddress.message)}
              </div>
            </div>

            {residenceType === 'Rented' && (
              <div>
                <label
                  htmlFor="rentAmount"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Monthly Rent <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="rentAmount"
                  type="number"
                  min="0"
                  placeholder="Enter monthly rent"
                  {...register('rentAmount')}
                  className={inputClass}
                />

                {errors.rentAmount &&
                  errorText(errors.rentAmount.message)}
              </div>
            )}
          </div>
        </div>

        {/* Permanent Address */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Permanent Address
          </h3>

          <label className="mb-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('sameAsPermanent')}
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm text-slate-700">
              Permanent address is same as current address
            </span>
          </label>

          {!sameAsPermanent && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="permanentAddressLine1"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Address Line 1 <span className="text-[#E74C3C]">*</span>
                </label>

                <input
                  id="permanentAddressLine1"
                  type="text"
                  placeholder="House / Flat No., Street"
                  {...register('permanentAddressLine1')}
                  className={inputClass}
                />

                {errors.permanentAddressLine1 &&
                  errorText(errors.permanentAddressLine1.message)}
              </div>

              <div>
                <label
                  htmlFor="permanentAddressLine2"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Address Line 2
                </label>

                <input
                  id="permanentAddressLine2"
                  type="text"
                  placeholder="Area / Landmark"
                  {...register('permanentAddressLine2')}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="permanentPinCode"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    PIN Code <span className="text-[#E74C3C]">*</span>
                  </label>

                  <input
                    id="permanentPinCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="PIN Code"
                    {...register('permanentPinCode')}
                    className={inputClass}
                  />

                  {errors.permanentPinCode &&
                    errorText(errors.permanentPinCode.message)}
                </div>

                <div>
                  <label
                    htmlFor="permanentCity"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    City <span className="text-[#E74C3C]">*</span>
                  </label>

                  <input
                    id="permanentCity"
                    type="text"
                    placeholder="City"
                    {...register('permanentCity')}
                    className={inputClass}
                  />

                  {errors.permanentCity &&
                    errorText(errors.permanentCity.message)}
                </div>

                <div>
                  <label
                    htmlFor="permanentState"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    State <span className="text-[#E74C3C]">*</span>
                  </label>

                  <input
                    id="permanentState"
                    type="text"
                    placeholder="State"
                    {...register('permanentState')}
                    className={inputClass}
                  />

                  {errors.permanentState &&
                    errorText(errors.permanentState.message)}
                </div>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="hidden">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Step4Address