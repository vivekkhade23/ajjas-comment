const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'radiology',
  port: process.env.RADIOLOGY_PORT || 4008,
  routes: [
    {
      method: 'get',
      path: '/api/radiology/studies',
      handler: () => ({
        items: [
          { studyId: 'RAD-101', modality: 'X-Ray', patient: 'Raj Malhotra', status: 'Reported' },
          { studyId: 'RAD-102', modality: 'MRI', patient: 'Kavita Rao', status: 'Scheduled' }
        ]
      })
    }
  ]
});
