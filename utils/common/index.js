export const ValidatePassword = (password = "") => {
  // this regex reference has been taken from
  // https://www.geeksforgeeks.org/javascript-program-to-validate-password-using-regular-expressions/
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,12}$/;
  return regex.test(password);
};

export const ValidateEmailAddress = (userEmail = "") => {
  // this regex reference has been taken from
  // https://stackoverflow.com/a/48800/10235939
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(userEmail);
};
