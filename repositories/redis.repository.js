// const nodemailer = require("nodemailer");
// const redis = require("redis");
// const bcrypt = require("bcryptjs");
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
//     const saltRounds = 10;
//     try {
//       const hash = await bcrypt.hash(plainCode, saltRounds);
//       return hash;
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
//         // Store the verification code in Redis
//         redisClient.set(email, verificationCode.toString(), "EX", 600); // Set expiration time of 10 minutes (600 seconds)
//       }
//     });
//     return "success";
//   };

//   receive_email = async (verified_number, email) => {
//     const storedCode = await redisClient.get(email);
//     console.log(typeof storedCode);
//     if (!storedCode) {
//       // Verification code has expired or does not exist
//       return false;
//     }
//     console.log(verified_number, storedCode);
//     // /const isCodeValid = await bcrypt.compare(verified_number, storedCode);
//     if (verified_number === storedCode) {
//       // update currentStatus of Post
//       // Remove the verification code from Redis
//       await redisClient.del(email);
//     }
//     return isCodeValid;
//   };
// }

// module.exports = RedisRepository;
