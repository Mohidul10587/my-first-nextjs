import { model, models, Schema } from "mongoose";

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
});

export const Review = models.Review ?? model("Review", ReviewSchema);
