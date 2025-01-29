import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./zustandPersist";
import { JokeType } from "@/types/Joke";

type JokeActions = {
  addJoke: (joke: JokeType) => void;
  removeJoke: (jokeId: string) => void;
};

type JokeData = {
  favoriteJokes: JokeType[];
};

const initialData: JokeData = {
  favoriteJokes: [],
};

const useJokeStore = create<JokeActions & JokeData>()(
  persist(
    (set, get) => ({
      ...initialData,
      addJoke: (joke: JokeType) => {
        set((state) => ({
          favoriteJokes: [...state.favoriteJokes, joke]
        }));
      },
      removeJoke: (jokeId: string) => {
        set((state) => ({
          favoriteJokes: state.favoriteJokes.filter((joke) => joke.id !== jokeId),
        }));
      },
    }),
    {
      name: "joke-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useJokeStore;