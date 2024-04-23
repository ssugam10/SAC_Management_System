import { getUser, setUser } from "../services/auth.js";

export function studentAuth(req, res, next) {
    const tokenCookie = req.cookies?.token;
    console.log("TOKEN: ", tokenCookie);
    req.user = null;
    if (!tokenCookie) {
        res.status(401).send("Unauthenticated");
    }

    const token = tokenCookie;
    const user = getUser(token);

    if (user.role !== "student") {
        res.status(403).send("Unauthorized");
    }

    req.user = user;
    next();
}

export function guardAuth(req, res, next) {
    const tokenCookie = req.cookies?.token;
    console.log("TOKEN: ", tokenCookie);
    req.user = null;
    if (!tokenCookie) {
        res.status(401).send("Unauthenticated");
    }
    const user = getUser(tokenCookie);
    if (user.role !== "guard") {
        res.status(403).send("Unauthorized");
    }
    req.user = user;
    next();
}
