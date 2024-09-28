"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";

interface Props {
  imgSource: string;
  name: string;
  church: string;
}
export function TeamCardWithGradient({ imgSource, name, church }: Props) {
  return (
    <div>
      <BackgroundGradient className="flex w-56 flex-col items-center justify-center rounded-[22px] bg-white p-4 dark:bg-zinc-900 sm:p-10">
        <Image
          src={imgSource}
          alt=""
          height="200"
          width="200"
          className="size-32 rounded-full object-cover"
        />
        <p className="mb-2 mt-4 text-center text-base text-black dark:text-neutral-200 sm:text-xl">
          {name}
        </p>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          {church}
        </p>
      </BackgroundGradient>
    </div>
  );
}
