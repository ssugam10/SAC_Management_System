import Guard from "../models/Guard.js";
import Student from "../models/Student.js";
import { getUser, setUser } from "../services/auth.js";

export async function studentAuth(req, res, next) {
    console.log(req.headers);

    const tokenCookie = req.headers["authorization"].split(" ")[1];
    console.log("TOKEN: ", tokenCookie);
    req.user = null;
    if (!tokenCookie) {
        res.status(401).send("Unauthenticated");
    }

    const token = tokenCookie;
    const user = getUser(token);

    console.log("USER: ", user);

    if (user.role !== "student") {
        res.status(403).send("Unauthorized");
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    console.log("STUDNET: ", student);
    req.user = { ...user, studentId: student.id };
    console.log("STUDENT: ", req.user);
    next();
}

export async function guardAuth(req, res, next) {
    console.log(req.headers);
    const tokenCookie = req.headers["authorization"].split(" ")[1];
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
