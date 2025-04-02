export const emailValidation = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Please enter your email!";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address!";
  }

  return "";
};

export const signInpasswordValidation = (passwordValue: string) => {
  if (!passwordValue) {
    return "Please enter your password!";
  }

  return "";
};
