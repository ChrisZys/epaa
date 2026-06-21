import { create } from "zustand";
import { persist } from "zustand/middleware";

const categoryNames = {
  has: "¿Qué tenemos?",
  seeks: "¿Qué buscamos?",
  solves: "¿Cómo lo resolvemos?",
  rules: "¿Bajo qué reglas?",
};

export const useAnalysisStore = create(
  persist(
    (set) => ({
      problemStatement: "",
      tokens: [],
      selectedCategoryId: "has",

      setProblemStatement: (text) =>
        set({
          problemStatement: text,
          tokens: text
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((word, index) => ({
              id: `token-${index}`,
              text: word,
              categoryId: null,
            })),
        }),

      selectCategory: (id) =>
        set({ selectedCategoryId: id }),

      assignTokenToCategory: (tokenId, categoryId) =>
        set((state) => ({
          tokens: state.tokens.map((token) =>
            token.id === tokenId
              ? {
                  ...token,
                  categoryId:
                    token.categoryId === categoryId ? null : categoryId,
                }
              : token,
          ),
        })),

      removeTokenFromCategory: (tokenId) =>
        set((state) => ({
          tokens: state.tokens.map((token) =>
            token.id === tokenId ? { ...token, categoryId: null } : token,
          ),
        })),

      mergeTokenRange: (startIndex, endIndex, categoryId) =>
        set((state) => {
          const tokens = state.tokens;
          if (startIndex === endIndex) return state;
          const lo = Math.min(startIndex, endIndex);
          const hi = Math.max(startIndex, endIndex);
          const range = tokens.slice(lo, hi + 1);
          const mergedText = range.map((t) => t.text).join(" ");
          const mergedToken = {
            id: `token-merged-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            text: mergedText,
            categoryId: categoryId ?? null,
          };
          return {
            tokens: [
              ...tokens.slice(0, lo),
              mergedToken,
              ...tokens.slice(hi + 1),
            ],
          };
        }),
    }),
    { name: "epaa-analysis" },
  ),
);
