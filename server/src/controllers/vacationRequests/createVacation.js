import db from '../../db/knex.js';

export const createVacation = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;

    const [request] = await db('vacation_requests')
      .insert({ user_id: userId, start_date: startDate, end_date: endDate, reason, status: 'Pending' })
      .returning('*');

    res.status(201).json(request);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};