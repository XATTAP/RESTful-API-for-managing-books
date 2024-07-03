import config from "@/config"
import { genSalt, hash } from "bcrypt"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

export enum Role {
  User = 1 << 0,
  Admin = 1 << 1,
}

export const generateHash = async (str: string, depth = 10) => {
  if (!str) return

  const salt = await genSalt(depth)
  const myHash = await hash(str, salt)

  return myHash
}

export const sendVerifyMail = async (email: string) => {
  const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.adress,
      pass: config.email.password
    }
  });

  const emailToken = jwt.sign({ email }, config.server.tokens.accessJWTSecret, { expiresIn: '1h' });
  const verificationUrl = new URL(`${config.server.host}/api/users/verify?emailToken=${emailToken}`)
  const mailOptions = {
    from: config.email.adress,
    to: email,
    subject: "Verify Your Email",
    text: `Для подтверждения своей почты перейдите по ссылке: ${verificationUrl}`
  };

  await emailTransporter.sendMail(mailOptions);
}