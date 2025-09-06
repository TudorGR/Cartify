import UserModel from "../models/user.js";
import { hashPassword, comparePasswords } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is required",
      });
    }
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    const match = await comparePasswords(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
              maxAge: 7 * 24 * 60 * 60 * 1000,
              domain: process.env.COOKIE_DOMAIN || undefined,
            })
            .json(user);
        }
      );
    } else {
      return res.json({
        error: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) throw err;

      const user = await UserModel.findById(decoded.id).select("-password");

      if (!user) {
        return res.json({ error: "User not found" });
      }

      res.json(user);
    });
  } else {
    res.json(null);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) {
        return res.json({ error: "Invalid token" });
      }

      const { name, phone, street, city, country, zip } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (phone) updateData.phone = phone;
      if (street) updateData.street = street;
      if (city) updateData.city = city;
      if (country) updateData.country = country;
      if (zip) updateData.zip = zip;

      const updatedUser = await UserModel.findByIdAndUpdate(
        decoded.id,
        updateData,
        { new: true, runValidators: true }
      ).select("-password");

      if (!updatedUser) {
        return res.json({ error: "User not found" });
      }

      res.json(updatedUser);
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain: process.env.COOKIE_DOMAIN || undefined,
    })
    .json({ message: "Logged out" });
};
