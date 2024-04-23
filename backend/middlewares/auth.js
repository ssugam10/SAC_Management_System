import Guard from "../models/Guard.js";
import Student from "../models/Student.js";
import { getUser, setUser } from "../services/auth.js";

export async function studentAuth(req, res, next) {
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
    const student = await Student.findOne({ where: { userId: user.id } });
    req.user = { ...user, studentId: student.id };
    console.log("STUDENT: ", req.user);
    next();
}

export async function guardAuth(req, res, next) {
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
    const guard = Guard.findOne({ where: { userId: user.id } });
    req.user = { ...user, guardId: guard.id };
    next();
}
