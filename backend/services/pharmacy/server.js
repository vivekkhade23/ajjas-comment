const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'pharmacy',
  port: process.env.PHARMACY_PORT || 4007,
  routes: [
    {
      method: 'get',
      path: '/api/pharmacy/dispense',
      handler: () => ({
        items: [
          { rxNo: 'RX-9901', patient: 'Nisha Das', medicines: 3, status: 'Dispensed' },
          { rxNo: 'RX-9902', patient: 'Aman Verma', medicines: 2, status: 'Awaiting Approval' }
        ]
      })
    }
  ]
});
