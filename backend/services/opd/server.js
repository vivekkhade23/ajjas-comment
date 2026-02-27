const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'opd',
  port: process.env.OPD_PORT || 4002,
  routes: [
    {
      method: 'get',
      path: '/api/opd/appointments',
      handler: () => ({
        items: [
          { token: 'OPD-221', patient: 'Raj Malhotra', doctor: 'Dr. Meera Iyer', time: '10:30' },
          { token: 'OPD-222', patient: 'Nisha Das', doctor: 'Dr. Akash Singh', time: '11:00' }
        ]
      })
    }
  ]
});
