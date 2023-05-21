import React, { createContext, useMemo, useState } from "react";
import { AppContextState } from "./AppContextState";

interface ICharacter {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

export const AppContext = createContext({} as AppContextState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorite, setFavorite] = useState<ICharacter[] | undefined>();
  const memoizedSetFavorite = useMemo(() => setFavorite, []);
  return (
    <AppContext.Provider
      value={{
        favorite: favorite,
        setFavorite: memoizedSetFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
