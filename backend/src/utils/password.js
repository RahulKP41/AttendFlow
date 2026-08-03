import bcrypt from "bcrypt";
import config from "../config/environment.js";

export async function hashPassword(password) {
    return bcrypt.hash(password, config.bcrypt.saltRounds);
}

export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}