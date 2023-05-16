// const nodemailer = require("nodemailer");
// const redis = require("redis");
// const bcrypt = require("bcryptjs");
// const { UserInfos } = require("../models");
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });

// require("dotenv").config();

// class RedisRepository {
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: "gmail",

//       auth: {
//         user: process.env.EMAIL_ADDRESS,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     // Initialize the Redis client

//     redisClient.on("error", (error) => {
//       console.error("Error connecting to Redis:", error);
//     });
//   }

//   async generateVerificationCode() {
//     const plainCode = Math.floor(100 + Math.random() * 900).toString();

//     try {
//       return plainCode;
//     } catch (error) {
//       console.error("Error generating verification code:", error);
//       throw error;
//     }
//   }
//   sendEmailVerificationCode = async (email) => {
//     const verificationCode = await this.generateVerificationCode();
//     const mailOptions = {
//       from: process.env.EMAIL_ADDRESS,
//       to: email,
//       subject: "Email Verification",
//       text: `Your verification code is: ${verificationCode}`,
//     };

//     this.transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//       } else {
//         console.log("Email sent successfully:", info.response);
//         console.log(typeof verificationCode);
//         redisClient.set(email, verificationCode.toString(), "EX", 600); // Set expiration time of 10 minutes (600 seconds)
//       }
//     });
//     return "success";
//   };

//   receive_email = async (verified_number, email, user_id) => {
//     const storedCode = await new Promise((resolve, reject) => {
//       redisClient.get(email, (error, value) => {
//         if (error) {
//           reject(error);
//           return;
//         }
//         if (!value) {
//           resolve(false);
//           return;
//         }
//         console.log(verified_number, value);
//         if (verified_number === value) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       });
//     });

//     console.log(storedCode);
//     if (storedCode === true) {
//       await UserInfos.update({ auth: true }, { where: { user_id: user_id } });
//       await redisClient.del(email);
//     }
//     return storedCode;
//   };
// }

// module.exports = RedisRepository;
