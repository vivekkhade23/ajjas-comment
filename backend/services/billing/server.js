const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'billing',
  port: process.env.BILLING_PORT || 4004,
  routes: [
    {
      method: 'get',
      path: '/api/billing/invoices',
      handler: () => ({
        items: [
          { invoiceNo: 'INV-5001', patient: 'Aman Verma', amount: 18500, status: 'Pending' },
          { invoiceNo: 'INV-5002', patient: 'Nisha Das', amount: 1450, status: 'Paid' }
        ]
      })
    }
  ]
});
