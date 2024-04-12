import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          location: req.body.location,
          lookingFor: req.body.lookingFor,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
    // Retrieve email and name if not provided in req.body
    let email = req.body.email;
    let name = req.body.name;
    if (!email || !name) {
      const user = await User.findById(req.params.userId);
      if (user) {
        email = user.email;
        name = user.name;
      }
    }
     // Send email asynchronously
     if (email && name) {
       try {
         await sendProfileUpdateEmail(email, name);
       } catch (error) {
         console.error("Error sending email:", error);
       }
     }
  } catch (error) {
    next(error);
  }
};

const sendProfileUpdateEmail = async (email, name) => {
  try {
    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email using the transporter
    const mailOptions = {
      from: 'er.pankaj.k4@gmail.com',
      to: email,
      subject: 'Profile update successfully',
      html: `<p>Hello, ${name}</p>
              <p>Your profile has been successfully updated.</p>`,
    };

    // Send the email and wait for the result
    const result = await transporter.sendMail(mailOptions);

    console.log(`Email successfully sent to ${email}`);
    return { success: true, data: result };
  } catch (error) {
    next(error);
    console.error(`Error sending email to ${email}:`, error);
    return { success: false, error };
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
