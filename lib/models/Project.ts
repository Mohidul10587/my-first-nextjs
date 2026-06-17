import { model, models, Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String, required: true },
});

export const Project = models.Project ?? model("Project", ProjectSchema);
