export function validateEmail(email: string): string {
  if (!email) return "Please input your email!";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return "Please input a valid email address!";
  return "";
}

export function validatePassword(password: string): string {
  if (!password) return "Please input your password!";
  if (password.length < 6)
    return "Password must be at least 6 characters long!";
  return "";
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string {
  if (!confirm) return "Please confirm your password!";
  if (password !== confirm) return "Passwords do not match!";
  return "";
}

export function validateName(name: string): string {
  if (!name) return "Please input your name!";
  if (!/^[a-zA-Z\s]+$/.test(name))
    return "Your name can only contain letters and spaces!";
  return "";
}
