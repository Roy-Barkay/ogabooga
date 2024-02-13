export default function validationErrors(errors, translation) {
  errors.forEach((err) => {
    switch (err.type) {
      case "any.empty":
        err.message = translation.MANDATORY;
        break;
      case "string.min":
        err.message =
          translation.MIN_BEFORE + err.context.limit + translation.MIN_AFTER;
        break;
      case "string.max":
        err.message =
          translation.MAX_BEFORE + err.context.limit + translation.MAX_AFTER;
        break;
      case "string.alphanum":
        err.message = translation.ALPHA;
        break;
      case "object.regex":
        err.message = translation.REGEX;
        break;
      case "string.regex.base":
        err.message = translation.BASE;
        break;
      case "string.email":
        err.message = translation.EMAIL;
        break;
      default:
        break;
    }
  });
  return errors;
}
