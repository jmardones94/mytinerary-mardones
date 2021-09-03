const joi = require("joi")

const validator = async (req, res, next) => {
  const schema = joi.object({
    firstName: joi.string().trim().min(2).required().messages({
      "any.required": "First name is required.",
      "string.min": "First name must have at least two characters.",
    }),
    lastName: joi.string().trim().min(2).required().messages({
      "any.required": "Last name is required.",
      "string.min": "Last name must have at least two characters.",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email.",
    }),
    password: joi
      .string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required()
      .messages({
        "any.required": "Password is required.",
        "string.min": "Password must have at least 8 characters.",
        "string.pattern.base":
          "Must have at least one lowercase, one uppercase and one digit.",
      }),
    confirmPassword: joi
      .string()
      .required()
      .valid(joi.ref("password"))
      .messages({
        "any.only": "Passwords doesn't match.",
        "any.required": "You must confirm the password.",
      }),
    photoURL: joi.string().required().trim().messages({
      "any.required": "A photo URL is required.",
    }),
    country: joi.string().required().trim().messages({
      "any.required": "Country is required.",
    }),
    google: joi.boolean().optional(),
  })
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    })
    next()
  } catch (e) {
    res.json({ success: false, errors: e.details })
  }
}

module.exports = validator
