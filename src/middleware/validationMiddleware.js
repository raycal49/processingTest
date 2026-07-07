export const listValidationErrors = (issues) => {
  const validationErrors = {};
  for (const issue of issues) {
    const field = issue.path.join('.') || 'root';
    (validationErrors[field] ??= []).push(issue.message);
  }
  return validationErrors;
}

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});

  // 
  // upon faliure, we return an object that looks like so
  /* response.body.errors.username or response.body.errors.email or response.body.errors.password
  {
    "status": "fail",
    "message": "Validation failed",
    "errors": {
      "username": ["Invalid uername"]
      "email": ["Invalid email address"],
      "password": ["Must be at least 8 characters", "Must contain a number"]
    }
  }
  */

  if (!result.success) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: listValidationErrors(result.error.issues),
    });
  }

  req.body = result.data;
  next();
};
