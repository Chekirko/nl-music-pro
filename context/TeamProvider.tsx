"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Тип даних для команди
interface Team {
  id: string;
  name: string;
}

// Тип контексту
interface TeamContextType {
  selectedTeam: Team | null;
  selectTeam: (team: Team | null) => void;
}

// Створюємо контекст з дефолтними значеннями
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Провайдер контексту
export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Підтягуємо команду з локального сховища при ініціалізації
  useEffect(() => {
    const storedTeam = localStorage.getItem("selectedTeam");
    if (storedTeam) {
      setSelectedTeam(JSON.parse(storedTeam));
    }
  }, []);

  // Функція для зміни команди
  const selectTeam = (team: Team | null) => {
    if (team) {
      localStorage.setItem("selectedTeam", JSON.stringify(team));
    } else {
      localStorage.removeItem("selectedTeam");
    }
    setSelectedTeam(team);
  };

  return (
    <TeamContext.Provider value={{ selectedTeam, selectTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

// Хук для використання контексту
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return context;
};
