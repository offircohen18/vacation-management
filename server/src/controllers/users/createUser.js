import db from "../../db/knex.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const existingUser = await db('users').where({ email }).first();
    
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    const [user] = await db('users')
      .insert({ name, email, role })
      .returning(['id', 'name', 'email', 'role', 'created_at', 'updated_at']);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
