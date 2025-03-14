function generateId(prefix) {
  if (typeof prefix !== "string" || prefix.length !== 1) {
    throw new Error("Prefix must be a single character string");
  }

  const timestamp = Date.now().toString().slice(-4); // Lấy 4 chữ số cuối của timestamp
  const randomNum = Math.floor(Math.random() * 10); // Một chữ số ngẫu nhiên

  return `${prefix}${timestamp}${randomNum}`;
}

module.exports = { generateId };
