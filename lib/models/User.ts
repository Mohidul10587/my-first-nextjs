import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const User = models.User ?? model("User", UserSchema);
