export const validateName = (name) => {
  const regex = /^[A-Za-z\s\'-]+$/;
  return regex.test(name);
};

export const validateAge = (age) => {
  const ageNum = parseInt(age);
  return ageNum >= 0 && ageNum <= 120;
};