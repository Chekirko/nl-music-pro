"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  GetUserTeamsParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Team, { ITeam } from "@/database/team.model";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDb();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDb();
    const { clerkId, name, nickname, email, photo, path } = params;

    await User.findOneAndUpdate(
      { clerkId },
      { name, nickname, email, photo },
      {
        new: true,
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDb();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserTeams(
  params: GetUserTeamsParams
): Promise<ITeam[]> {
  try {
    connectToDb();
    const { userId } = params;

    if (!userId) {
      return [];
    }

    const userWithTeams = await User.findById(userId).populate({
      path: "teams.teamId", // Заповнюємо поле teamId в масиві teams
      model: Team, // Вказуємо модель для наповнення
    });

    if (!userWithTeams) {
      throw new Error("User not found");
    }
    if (!userWithTeams.teams || userWithTeams.teams.length === 0) {
      return [];
    }

    // 2. Повертаємо всі команди користувача
    return userWithTeams.teams.map((teamObj: any) => teamObj.teamId); // Повертаємо самі команди
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve user teams");
  }
}
