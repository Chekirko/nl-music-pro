export interface GetUserByIdParams {
  userId: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  nickname: string;
  email: string;
  photo: string;
}

export interface UpdateUserParams {
  clerkId: string;
  name: string;
  nickname: string;
  email: string;
  photo: string;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface CreateTeamParams {
  creator: string;
  name: string;
  description: string;
  path: string;
}
