import db from "../../db/knex.js";

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db('users').where({ id }).del();
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};