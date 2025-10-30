import db from "../../db/knex.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [user] = await db('users')
      .where({ id })
      .update(updates)
      .returning(['id', 'name', 'email', 'role', 'created_at', 'updated_at']);

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
