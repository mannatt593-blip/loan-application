export const loanTypes = {
  personal: {
    label: 'Personal Loan',
    description: 'For personal expenses and financial needs',
    maxAmount: 1000000,
    tenure: [12, 60],
    purposes: [
      'Medical Expenses',
      'Education',
      'Wedding',
      'Travel',
      'Debt Consolidation',
      'Other',
    ],
  },

  home: {
    label: 'Home Loan',
    description: 'For purchasing or constructing a home',
    maxAmount: 10000000,
    tenure: [60, 360],
    purposes: [
      'Home Purchase',
      'Home Construction',
      'Home Renovation',
      'Home Extension',
    ],
  },

  business: {
    label: 'Business Loan',
    description: 'For business growth and working capital',
    maxAmount: 5000000,
    tenure: [12, 120],
    purposes: [
      'Working Capital',
      'Business Expansion',
      'Equipment Purchase',
      'Business Setup',
    ],
  },
}