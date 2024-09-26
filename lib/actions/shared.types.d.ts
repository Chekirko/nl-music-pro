import IUser from "@/database/user.model";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  nickname: string;
  email: string;
  photo: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}
