import db from "../../db/knex.js";

export const updateVacationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;

    const [updated] = await db('vacation_requests')
      .where({ id })
      .update({ status, comments: comments || null })
      .returning('*');

    if (!updated) return res.status(404).json({ error: 'Request not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
