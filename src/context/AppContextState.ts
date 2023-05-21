import { Dispatch, SetStateAction } from "react";

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

  export type AppContextState = {
    favorite: ICharacter[] | undefined,
    setFavorite: Dispatch<SetStateAction<ICharacter[] | undefined >>
  }