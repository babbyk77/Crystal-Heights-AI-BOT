// feesDatabase.js

const feesDatabase = {
  // Pre-School Fees
  preSchool: {
    title: "Pre-School Fees",
    admission: {
      fresh: 5200.00,
      continuing: 2800.00
    },
    firstAid: 60.00,
    optional: [
      { name: "Feeding Fee", amount: 1500.00 },
      { name: "Transportation", amount: 1700.00 },
      { name: "Boarding and Feeding", amount: 4500.00 },
      { name: "Music", amount: 350.00 },
      { name: "Swimming", amount: 350.00 }
    ],
    policy: [
      "Full payment is required upon receiving the admission letter",
      "Paid fees are NON-REFUNDABLE",
      "70% minimum payment before resumption for continuing students",
      "One-time enrollment for bus service, meals and extracurricular activities",
      "Invoices dispatched in final week of every term"
    ],
    banks: [
      "ACCESS BANK - 0340223132691 (SPINTEX BRANCH)",
      "GCB - 1631180000808 (AMASAMAN BRANCH)",
      "MTN MOMO: 0244534274"
    ]
  },

  // Primary 1-6 Fees
  primary: {
    title: "Primary (Grade 1-6) Fees",
    admission: {
      fresh: 6000.00,
      continuing: 2940.00
    },
    firstAid: 60.00,
    optional: [
      { name: "Feeding Fee", amount: 1500.00 },
      { name: "Transportation", amount: 1700.00 },
      { name: "Boarding and Feeding", amount: 4500.00 },
      { name: "Music", amount: 350.00 },
      { name: "Swimming", amount: 350.00 }
    ],
    policy: [
      "Full payment is required upon receiving the admission letter",
      "Paid fees are NON-REFUNDABLE",
      "70% minimum payment before resumption for continuing students",
      "One-time enrollment for bus service, meals and extracurricular activities",
      "Invoices dispatched in final week of every term"
    ],
    banks: [
      "ACCESS BANK - 0340223132691 (SPINTEX BRANCH)",
      "GCB - 1631180000808 (AMASAMAN BRANCH)",
      "MTN MOMO: 0244534274"
    ]
  },

  // JHS 1-3 Fees
  jhs: {
    title: "JHS 1-3 Fees",
    admission: {
      fresh: 5000.00,
      continuing: 2500.00
    },
    firstAid: 60.00,
    optional: [
      { name: "Feeding Fee", amount: 1500.00 },
      { name: "Transportation", amount: 1700.00 },
      { name: "Boarding and Feeding", amount: 4500.00 },
      { name: "Music", amount: 350.00 },
      { name: "Swimming", amount: 350.00 }
    ],
    policy: [
      "Full payment is required upon receiving the admission letter",
      "Paid fees are NON-REFUNDABLE",
      "70% minimum payment before resumption for continuing students",
      "One-time enrollment for bus service, meals and extracurricular activities",
      "Invoices dispatched in final week of every term"
    ],
    banks: [
      "ACCESS BANK - 0340223132691 (SPINTEX BRANCH)",
      "GCB - 1631180000808 (AMASAMAN BRANCH)",
      "MTN MOMO: 0244534274"
    ]
  },

  // ILS 1-3 Fees
  ils: {
    title: "ILS 1-3 Fees",
    admission: {
      fresh: 6210.00,
      continuing: 4000.00
    },
    firstAid: 60.00,
    optional: [
      { name: "Feeding Fee", amount: 1500.00 },
      { name: "Transportation", amount: 1700.00 },
      { name: "Boarding and Feeding", amount: 4500.00 },
      { name: "Music", amount: 350.00 },
      { name: "Swimming", amount: 350.00 }
    ],
    policy: [
      "Full payment is required upon receiving the admission letter",
      "Paid fees are NON-REFUNDABLE",
      "70% minimum payment before resumption for continuing students",
      "One-time enrollment for bus service, meals and extracurricular activities",
      "Invoices dispatched in final week of every term"
    ],
    banks: [
      "ACCESS BANK - 0340223132691 (SPINTEX BRANCH)",
      "GCB - 1631180000808 (AMASAMAN BRANCH)",
      "MTN MOMO: 0244534274"
    ]
  },

  // Query methods
  getAllFeeStructures: function() {
    return [
      this.preSchool,
      this.primary,
      this.jhs,
      this.ils
    ];
  },

  getFeeStructureByLevel: function(level) {
    switch(level.toLowerCase()) {
      case 'pre-school':
      case 'preschool':
        return this.preSchool;
      case 'primary':
      case 'grade 1-6':
        return this.primary;
      case 'jhs':
      case 'junior high':
        return this.jhs;
      case 'ils':
      case 'lower secondary':
        return this.ils;
      default:
        return null;
    }
  }
};