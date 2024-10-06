import { Schema, models, model, Document } from "mongoose";

export interface ITeam extends Document {
  _id: string;
  creator: string;
  name: string;
  description: string;
  church: string;
  photo?: string;
  members: {
    user: string;
    role: "admin" | "member";
  }[];
  songs: string[];
  events: string[];
  createdAt: Date;
}

const TeamSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  photo: { type: String, default: "" },
  church: { type: String, required: true },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now },
});

const Team = models.Team || model("Team", TeamSchema);

export default Team;
