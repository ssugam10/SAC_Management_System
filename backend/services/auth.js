const jwt = require("jsonwebtoken");
const secret = "hello123";
function setUser(user) {
  return jwt.sign(
    {
      //payload
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
