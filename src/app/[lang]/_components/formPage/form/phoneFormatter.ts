export const formatPhoneNumber = (country: string, number: string) => {
  const trimmed = number.replace(/\D/g, "");

  switch (country) {
    case "us":
      return `+1 ${trimmed.substring(0, 3)} ${trimmed.substring(3, 6)} ${trimmed.substring(6)}`;

    case "fr":
      return `+33 ${trimmed.substring(1, 2)} ${trimmed.substring(2, 4)} ${trimmed.substring(
        4,
        6
      )} ${trimmed.substring(6, 8)} ${trimmed.substring(8)}`;

    case "th":
      return `+66 ${trimmed.substring(1, 2)} ${trimmed.substring(2, 6)} ${trimmed.substring(6)}`;

    default:
      return number;
  }
};
