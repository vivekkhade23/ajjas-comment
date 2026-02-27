const { createService } = require('../../shared/serviceFactory');

createService({
  serviceName: 'nursing-station',
  port: process.env.NURSING_PORT || 4005,
  routes: [
    {
      method: 'get',
      path: '/api/nursing-station/tasks',
      handler: () => ({
        items: [
          { task: 'Morning medication round', assignee: 'Nurse Priya', ward: 'Ward A' },
          { task: 'Vitals monitoring', assignee: 'Nurse Daniel', ward: 'ICU' }
        ]
      })
    }
  ]
});
