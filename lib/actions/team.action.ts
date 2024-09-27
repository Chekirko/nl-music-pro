"use server";

import Team from "@/database/team.model";
import { connectToDb } from "../mongoose";
import { CreateTeamParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createTeam(teamData: CreateTeamParams) {
  const { creator, name, description, path } = teamData;

  try {
    connectToDb();
    await Team.create({ creator, name, description });

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
