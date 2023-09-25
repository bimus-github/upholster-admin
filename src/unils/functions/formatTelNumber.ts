export const formatTelNumber = (number: string) => {
  const digits = number
    .toString()
    .replace(/\D/g, "")
    .slice(0, 12); // Remove non-digit characters

  const countryCode = digits.substr(0, 2);
  const firstGroup = digits.substr(2, 3);
  const secondGroup = digits.substr(5, 2);
  const thirdGroup = digits.substr(7, 2);

  return `${countryCode} ${firstGroup} ${secondGroup} ${thirdGroup}`;
};
