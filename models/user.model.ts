import mongoose, { Schema } from "mongoose";
import { IUser } from "@/interface/user.d";

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;