import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(402).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").notEmpty().trim().isEmail().withMessage("Email is Required"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long...")
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is Required..."),
  ...loginValidator
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is Required...")
];
