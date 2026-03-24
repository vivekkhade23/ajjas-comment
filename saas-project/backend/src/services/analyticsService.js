import { Appointment } from '../models/Appointment.js';

export async function fetchAnalytics(tenantId) {
  const now = new Date();
  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const [summary] = await Appointment.aggregate([
    { $match: { tenantId, date: { $gte: monthAgo, $lte: now } } },
    {
      $group: {
        _id: null,
        totalAppointments: { $sum: 1 },
        revenue: { $sum: '$amount' }
      }
    }
  ]);

  const dailyStats = await Appointment.aggregate([
    { $match: { tenantId, date: { $gte: monthAgo, $lte: now } } },
    {
      $group: {
        _id: {
          y: { $year: '$date' },
          m: { $month: '$date' },
          d: { $dayOfMonth: '$date' }
        },
        count: { $sum: 1 },
        revenue: { $sum: '$amount' }
      }
    },
    { $sort: { '_id.y': 1, '_id.m': 1, '_id.d': 1 } }
  ]);

  return {
    totalAppointments: summary?.totalAppointments || 0,
    revenue: summary?.revenue || 0,
    dailyStats
  };
}
