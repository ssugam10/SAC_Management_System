import jwt from "jsonwebtoken";

const secret = "nfodansfio43b28b8gb32193b789b8vb";
export function setUser(user) {
    return jwt.sign(user, secret);
}

export function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}
