const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'ipd',
  port: process.env.IPD_PORT || 4003,
  routes: [
    {
      method: 'get',
      path: '/api/ipd/admissions',
      handler: () => ({
        items: [
          { admissionId: 'IPD-788', patient: 'Aman Verma', ward: 'Ward A', bed: 'A-09' },
          { admissionId: 'IPD-789', patient: 'Kavita Rao', ward: 'Ward C', bed: 'C-14' }
        ]
      })
    }
  ]
});
