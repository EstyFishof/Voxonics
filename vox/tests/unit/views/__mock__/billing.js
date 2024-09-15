export default {
    statement: {
        company: {
            name: '',
            billing: {
                balance: 400
            }
        },
        lastMonthSpend: '',
        nextDaysCharges: '',
        avarageUsagePerDay: '',
        users: '',
        externalNumbers: ''
    },
    getLastPayments: [
        {
            invoiceNumber: '',
            dateCreated: '',
            status: 'success',
            billAmount: '',
            invoiceCurrency: '',
            paidDate: '',
            amount: '',
            currency: '',
            TAX: '',
            paymentDescription: '',
            paidDate: '',
            invoiceNumber: ''
        }
    ],
    getLastCharges: [
        {
            date: '',
            connectedService: {
                service: {
                    purpose: ''
                },
                country: '',
                description: '',
                service: {
                    chargeType: ''
                }
            },
            chargeAmount: ''
        }
    ]
};