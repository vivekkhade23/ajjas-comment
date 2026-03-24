import { Appointment } from '../models/Appointment.js';

function movingAverage(values, windowSize = 7) {
  if (!values.length) return 0;
  const slice = values.slice(-windowSize);
  return Number((slice.reduce((acc, item) => acc + item, 0) / slice.length).toFixed(2));
}

export async function generateBookingInsights(tenantId) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 28);

  const stats = await Appointment.aggregate([
    { $match: { tenantId, date: { $gte: start, $lte: now } } },
    {
      $group: {
        _id: { dayOfWeek: { $dayOfWeek: '$date' }, date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
        bookings: { $sum: 1 }
      }
    },
    { $sort: { '_id.date': 1 } }
  ]);

  const dayCounts = new Map();
  const series = [];

  for (const item of stats) {
    series.push(item.bookings);
    const key = item._id.dayOfWeek;
    const prev = dayCounts.get(key) || { total: 0, days: 0 };
    dayCounts.set(key, { total: prev.total + item.bookings, days: prev.days + 1 });
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let lowPerformanceDay = 'N/A';
  let minAverage = Number.POSITIVE_INFINITY;

  for (const [weekday, values] of dayCounts.entries()) {
    const average = values.total / values.days;
    if (average < minAverage) {
      minAverage = average;
      lowPerformanceDay = dayNames[weekday - 1];
    }
  }

  const baseline = movingAverage(series, 7);
  const predictedBookings = Array.from({ length: 7 }).map((_, index) => ({
    day: dayNames[(now.getDay() + index + 1) % 7],
    value: Math.max(0, Math.round(baseline + (index % 2 === 0 ? 1 : -1)))
  }));

  const suggestion =
    lowPerformanceDay === 'N/A'
      ? 'Collect more data for at least 2 weeks to improve recommendations.'
      : `Offer targeted promotions on ${lowPerformanceDay} to increase conversion.`;

  return { predictedBookings, lowPerformanceDay, suggestion };
}
