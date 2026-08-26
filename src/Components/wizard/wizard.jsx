 import { useState } from 'react'
import Step1LoanType from '../../pages/Step1LoanType'
import Step2PersonalInfo from '../../pages/Step2PersonalInfo'
import Step3KYC from '../../pages/Step3KYC'
  import Step4Address from '../../pages/Step4Address'
  import Step5Employment from '../../pages/Step5Employment'
  import Step6CoApplicant from '../../pages/Step6CoApplicant'
  import Step7Documents from '../../pages/Step7Documents'
  import Step8Review from '../../pages/Step8Review'
const steps = [
  'Loan Type',
  'Personal Information',
  'KYC Verification',
  'Address',
  'Employment',
  'Co-Applicant',
  'Documents & E-Signature',
  'Review & Submit',
]

 function Wizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isStepValid, setIsStepValid] = useState(false)

  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

   
 const handleNext = () => {
  if (!isStepValid) return

  setCurrentStep((step) => Math.min(step + 1, totalSteps - 1))
}
   const handlePrevious = () => {
  setIsStepValid(false)

  setCurrentStep((step) => Math.max(step - 1, 0))
}

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          LendSwift Loan Application
        </h1>

        <p className="mb-8 text-slate-600">
          Complete your application in a few simple steps.
        </p>

        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-medium text-slate-600">
            Step {currentStep + 1} of {totalSteps}
          </p>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
            aria-label={`Application progress: ${Math.round(progress)}%`}
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-[#1F4E79] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          
        </div>

         <div className="rounded-lg bg-white p-6 shadow-sm">
        {currentStep === 0 && (
  <Step1LoanType onValidChange={setIsStepValid} />
)}
{currentStep === 1 && (
  <Step2PersonalInfo onValidChange={setIsStepValid} />
)}
{currentStep === 2 && (
  <Step3KYC onValidChange={setIsStepValid} />
)}
 {currentStep === 3 && (
  <Step4Address onValidChange={setIsStepValid} />
)}
{currentStep === 4 && (
  <Step5Employment onValidChange={setIsStepValid} />
)}
{currentStep === 5 && (
  <Step6CoApplicant onValidChange={setIsStepValid} />
)}
{currentStep === 6 && (
  <Step7Documents onValidChange={setIsStepValid} />
)}
{currentStep === 7 && (
  <Step8Review onValidChange={setIsStepValid} />
)}
</div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
              disabled={
  currentStep === totalSteps - 1 ||
  !isStepValid
}
            className="rounded-md bg-[#1F4E79] px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Wizard