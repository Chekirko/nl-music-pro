import { auth, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import { TeamSwither } from "./TeamSwither";
import { redirect } from "next/navigation";
import { getUserById, getUserTeams } from "@/lib/actions/user.action";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  const userTeams = await getUserTeams({ userId: mongoUser });
  const shortDataTeams = userTeams.map((team) => ({
    id: team._id.toString(),
    name: team.name,
  }));

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/icons/logoi.svg"
          width={23}
          height={23}
          alt="DevFlow"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          NL <span className="text-primary-500">Worship</span>
        </p>
      </Link>
      <SignedIn>
        <TeamSwither shortDataTeams={shortDataTeams} />
      </SignedIn>
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "rgb(30,64,175)" },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
