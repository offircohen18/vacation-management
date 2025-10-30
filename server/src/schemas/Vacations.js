import Joi from 'joi';

export const createVacationSchema = Joi.object({
  userId: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  reason: Joi.string().allow(null, ""),
}).custom((value, helpers) => {
  const { startDate, endDate } = value;
  if (new Date(startDate) > new Date(endDate)) {
    return helpers.error("any.invalid", "start_date must be before end_date");
  }
  return value;
}, "Start date before end date validation");

export const updateVacationStatusSchema = Joi.object({
  status: Joi.string().valid('Pending', 'Approved', 'Rejected'),
  comments: Joi.string().allow(null, '')
});
