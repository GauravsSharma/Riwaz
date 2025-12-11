import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const sendOTP = async (phone, otp) => {
  console.log(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN,process.env.TWILIO_PHONE);  
  try {
    const mssg = client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
    return mssg.sid;
  } catch (error) {
    throw new Error('Failed to send OTP: ' + error.message);
  }
};