import db from "../../db/knex.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await db('users').select('id', 'name', 'email', 'role', 'created_at', 'updated_at');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db('users')
      .select('id', 'name', 'email', 'role', 'created_at', 'updated_at')
      .where({ id })
      .first();

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
