import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema } from '../schemas/step2Schema'

function Step2PersonalInfo({ onValidChange }) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      fatherName: '',
      motherName: '',
      email: '',
      mobile: '',
      alternateMobile: '',
    },
  })

  useEffect(() => {
    onValidChange?.(isValid)
  }, [isValid, onValidChange])

  const mobile = watch('mobile')

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1F4E79]">
          Step 2
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          Personal Information
        </h2>

        <p className="mt-2 text-slate-600">
          Enter your details exactly as they appear on your official documents.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Full Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Full Name (as per PAN) <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter full name"
            {...register('fullName')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.fullName && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Date of Birth <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.dateOfBirth && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-slate-800">
            Gender <span className="text-[#E74C3C]">*</span>
          </legend>

          <div className="flex gap-5 pt-2">
            {['Male', 'Female', 'Other'].map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="radio"
                  value={option}
                  {...register('gender')}
                />
                {option}
              </label>
            ))}
          </div>

          {errors.gender && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.gender.message}
            </p>
          )}
        </fieldset>

        {/* Marital Status */}
        <div>
          <label
            htmlFor="maritalStatus"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Marital Status <span className="text-[#E74C3C]">*</span>
          </label>

          <select
            id="maritalStatus"
            {...register('maritalStatus')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select marital status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>

          {errors.maritalStatus && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        {/* Father Name */}
        <div>
          <label
            htmlFor="fatherName"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Father&apos;s Name <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="fatherName"
            type="text"
            autoComplete="off"
            placeholder="Enter father's name"
            {...register('fatherName')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.fatherName && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.fatherName.message}
            </p>
          )}
        </div>

        {/* Mother Name */}
        <div>
          <label
            htmlFor="motherName"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Mother&apos;s Name <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="motherName"
            type="text"
            autoComplete="off"
            placeholder="Enter mother's name"
            {...register('motherName')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.motherName && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.motherName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email Address <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            {...register('email')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label
            htmlFor="mobile"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Mobile Number <span className="text-[#E74C3C]">*</span>
          </label>

          <input
            id="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            placeholder="10-digit mobile number"
            {...register('mobile')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.mobile && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.mobile.message}
            </p>
          )}

          {mobile && !errors.mobile && (
            <p className="mt-2 text-xs text-[#27AE60]">
              Mobile number format is valid
            </p>
          )}
        </div>

        {/* Alternate Mobile */}
        <div className="md:col-span-2">
          <label
            htmlFor="alternateMobile"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Alternate Mobile{' '}
            <span className="font-normal text-slate-500">(Optional)</span>
          </label>

          <input
            id="alternateMobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit alternate mobile number"
            {...register('alternateMobile')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-blue-100"
          />

          {errors.alternateMobile && (
            <p className="mt-2 text-sm text-[#E74C3C]" role="alert">
              {errors.alternateMobile.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2PersonalInfo