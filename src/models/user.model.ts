import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Define an interface for the User document
export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  cart: mongoose.Types.ObjectId[];
  address: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  isBlocked: boolean;
  refreshToken?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  isCorrectPassword(password: string): Promise<boolean>;
  createPasswordChangedToken(): string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add methods to the User model
userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordChangedToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // Set expiration time to 15 minutes
  return resetToken;
};

// Export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
