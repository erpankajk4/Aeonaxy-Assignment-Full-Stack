import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return v.length >= 6;
        }
      }
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8WsqN89vkADd9UfX9QassowEJp9QVU4cEFtJdt1OfAvSMX1R_ubIDxKKI5F1YLja0rzA&usqp=CAU"
    },
    agreedToTerms: {
      type: Boolean,
      default: false,
      required: true
    },
    location: {
      type: String,
      default: "India"
    },
    lookingFor: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
