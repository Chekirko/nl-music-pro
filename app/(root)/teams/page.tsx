import { TeamCardWithGradient } from "@/components/cards/TeamCardWithGradient";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllTeams } from "@/lib/actions/team.action";
import { getUserById, getUserTeams } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const TeamsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  const userTeams = await getUserTeams({ userId: mongoUser });
  const { teams } = await getAllTeams();
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Команди</h1>

        <Link
          href="/teams/create-team"
          className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Створити команду
          </Button>
        </Link>
      </div>

      <div className=" mt-7 ">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="mine">Мої команди</TabsTrigger>
            <TabsTrigger value="all">Всі команди</TabsTrigger>
          </TabsList>
          <TabsContent value="mine">
            <div className="flex flex-wrap gap-4">
              {userTeams &&
                userTeams.map((team: any) => (
                  <Link
                    href={`/teams/${team._id}`}
                    key={team._id}
                    className="flex justify-between gap-4 p-4"
                  >
                    <TeamCardWithGradient
                      imgSource={team.photo}
                      name={team.name}
                      church={team.church}
                    />
                  </Link>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="flex flex-wrap gap-4">
              {teams &&
                teams.map((team) => (
                  <Link
                    href={`/teams/${team._id}`}
                    key={team._id}
                    className="flex justify-between gap-4 p-4"
                  >
                    <TeamCardWithGradient
                      imgSource={team.photo}
                      name={team.name}
                      church={team.church}
                    />
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default TeamsPage;
