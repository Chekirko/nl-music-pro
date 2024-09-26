import { Schema, models, model, Document } from "mongoose";

// Інтерфейс для команди користувача з роллю
export interface IUserTeam {
  teamId: Schema.Types.ObjectId; // Айдішник команди
  role: "user" | "admin"; // Роль користувача в команді
}

// Основний інтерфейс для користувача
export interface IUser extends Document {
  clerkId: string; // Унікальний ID від сервісу Clerk

  // Основна інформація про користувача
  name: string;
  nickname?: string; // Необов'язкове поле для унікального нікнейма
  email: string;
  photo?: string; // Необов'язкове поле для аватарки
  joinedAt: Date; // Дата приєднання до сервісу

  // Відносини з командами
  teams?: IUserTeam[]; // Необов'язкове поле, масив команд з ролями
  createdSongs?: Schema.Types.ObjectId[]; // Необов'язкові айдішніки пісень, створених користувачем
  createdEvents?: Schema.Types.ObjectId[]; // Необов'язкові айдішніки івентів, створених користувачем
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },

  // Основна інформація про користувача
  name: { type: String, required: true },
  nickname: { type: String, unique: true }, // Унікальний нікнейм
  email: { type: String, required: true, unique: true },
  photo: { type: String }, // URL до аватарки користувача
  joinedAt: { type: Date, default: Date.now }, // Дата приєднання до сервісу

  // Відносини з іншими моделями
  teams: [
    {
      teamId: { type: Schema.Types.ObjectId, ref: "Team" }, // Айдішник команди
      role: { type: String, enum: ["user", "admin"], default: "user" }, // Роль користувача в команді
    },
  ],
  createdSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }], // Айдішніки пісень, створених користувачем
  createdEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }], // Айдішніки івентів, створених користувачем
});

const User = models.User || model("User", UserSchema);

export default User;
