function generateSecretCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const allCharacters = letters + digits;

  let secretCode = "";

  // Chọn ít nhất 1 chữ cái và 1 số
  secretCode += letters[Math.floor(Math.random() * letters.length)];
  secretCode += digits[Math.floor(Math.random() * digits.length)];

  // Chọn 4 ký tự còn lại từ tất cả các ký tự
  for (let i = 0; i < 4; i++) {
    secretCode +=
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  // Xáo trộn chuỗi để tránh chữ và số luôn ở vị trí cố định
  secretCode = secretCode
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return secretCode;
}

module.exports = { generateSecretCode };
