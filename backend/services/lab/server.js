const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'lab',
  port: process.env.LAB_PORT || 4006,
  routes: [
    {
      method: 'get',
      path: '/api/lab/orders',
      handler: () => ({
        items: [
          { orderId: 'LAB-340', test: 'CBC', patient: 'Raj Malhotra', status: 'In Progress' },
          { orderId: 'LAB-341', test: 'LFT', patient: 'Aman Verma', status: 'Completed' }
        ]
      })
    }
  ]
});
