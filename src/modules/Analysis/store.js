import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAnalysisStore = create(
  persist(
    (set) => ({
      problemStatement: "",
      tokens: [],

      setProblemStatement: (text) =>
        set({
          problemStatement: text,
          tokens: text
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((word, index) => ({ id: `token-${index}`, text: word })),
        }),
    }),
    { name: "epaa-analysis" },
  ),
);
