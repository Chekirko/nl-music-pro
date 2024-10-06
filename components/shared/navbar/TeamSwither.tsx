"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useTeamContext } from "@/context/TeamProvider";

interface Team {
  id: string;
  name: string;
}

interface TeamSwitherProps {
  shortDataTeams: Team[];
}
export function TeamSwither({ shortDataTeams }: TeamSwitherProps) {
  const { selectTeam } = useTeamContext();

  const handleTeamChange = (teamName: string) => {
    const selectedTeam = shortDataTeams.find((team) => team.name === teamName);
    if (selectedTeam) {
      console.log(selectedTeam, "Hello");
      selectTeam(selectedTeam);
    }
  };
  return (
    <BackgroundGradient>
      <Select onValueChange={handleTeamChange}>
        <SelectTrigger className="border-none focus:outline-none sm:w-[180px]">
          <SelectValue
            placeholder="Вибери команду"
            className="border-none focus:outline-none"
          />
        </SelectTrigger>
        <SelectContent className="background-light800_dark400 text-dark500_light500">
          <SelectGroup>
            <SelectLabel>Твої команди</SelectLabel>
            {shortDataTeams && shortDataTeams.length > 0 ? ( // Перевірка наявності команд
              shortDataTeams.map((team) => {
                return (
                  <SelectItem key={team.id} value={team.name}>
                    {team.name}
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem value="none" disabled>
                У тебе ще немає команд
              </SelectItem> // Відображення, якщо немає команд
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </BackgroundGradient>
  );
}
