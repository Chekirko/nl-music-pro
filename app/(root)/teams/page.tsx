import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TeamsPage = () => {
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
    </>
  );
};

export default TeamsPage;
