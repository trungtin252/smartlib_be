function generateId(prefix) {
  const timestamp = Date.now().toString().slice(-4); // Lấy 4 chữ số cuối của timestamp
  const randomNum = Math.floor(100 + Math.random() * 900); // Một chữ số ngẫu nhiên

  return `${prefix}${timestamp}${randomNum}`;
}

module.exports = { generateId };
