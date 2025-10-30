import db from '../db/knex.js';

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  next();
};

export const validateUser = async (req, res, next) => {
  const { userId } = req.body || {};
  const { id: paramsId } = req.params;
  const id = userId || paramsId;
  const user = await db('users').where({ id }).first();
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  next();
}
