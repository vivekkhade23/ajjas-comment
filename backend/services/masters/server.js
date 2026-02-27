const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'masters',
  port: process.env.MASTERS_PORT || 4001,
  routes: [
    {
      method: 'get',
      path: '/api/masters/departments',
      handler: () => ({
        items: ['General Medicine', 'Cardiology', 'Orthopedics', 'Pediatrics']
      })
    },
    {
      method: 'get',
      path: '/api/masters/doctors',
      handler: () => ({
        items: [
          { id: 'DOC-101', name: 'Dr. Meera Iyer', specialty: 'Cardiology' },
          { id: 'DOC-102', name: 'Dr. Akash Singh', specialty: 'Orthopedics' }
        ]
      })
    }
  ]
});
