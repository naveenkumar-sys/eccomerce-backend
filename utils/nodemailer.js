import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.PASS_EMAIL,
    pass: process.env.PASS_KEY,
  },
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.PASS_EMAIL,
    to,
    subject,
    html,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error in sending mail", error.message);
    throw error;
  }
};
   
export default sendMail;
