const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      content: Joi.string().min(3).max(512).required(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      next(new ValidationError(validateData.error.details));
    }
    next();
  },
};
