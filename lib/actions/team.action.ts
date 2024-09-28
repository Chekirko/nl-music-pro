"use server";

import Team from "@/database/team.model";
import { connectToDb } from "../mongoose";
import { CreateTeamParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";

export async function createTeam(teamData: CreateTeamParams) {
  const { creator, name, description, church, photo, path } = teamData;

  try {
    connectToDb();
    const newTeam = await Team.create({
      creator,
      name,
      description,
      church,
      photo,
    });

    await User.findByIdAndUpdate(creator, {
      $push: {
        teams: {
          teamId: newTeam._id,
          role: "admin",
        },
      },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTeams() {
  try {
    connectToDb();

    const teams = await Team.find({}).sort({ createdAt: -1 });

    return { teams };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
