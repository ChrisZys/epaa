import { create } from "zustand";
import { persist } from "zustand/middleware";

let variableCounter = 0;

function generateId() {
  variableCounter += 1;
  return `var-${Date.now()}-${variableCounter}`;
}

function generateIdentifier(name) {
  return name
    .toLowerCase()
    .replace(/[^a-záéíóúñ0-9\s-]/g, "")
    .replace(/[áéíóú]/g, (c) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] || c)
    .replace(/[\s-]+/g, " ")
    .trim()
    .split(" ")
    .map((word, i) =>
      i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}

export const usePlanStore = create(
  persist(
    (set, get) => ({
      variablesByTab: {
        has: [],
        seeks: [],
        auxiliary: [],
      },
      activeTab: "has",

      setActiveTab: (tab) => set({ activeTab: tab }),

      initializeFromTokens: (tokens) =>
        set((state) => {
          const newVars = { ...state.variablesByTab };

          for (const tabId of ["has", "seeks"]) {
            const tabTokens = tokens.filter((t) => t.categoryId === tabId);
            const existing = newVars[tabId];
            const existingTokenIds = new Set(
              existing.map((v) => v.tokenId).filter(Boolean),
            );
            const currentTokenIds = new Set(tabTokens.map((t) => t.id));

            const preserved = existing.filter(
              (v) => !v.tokenId || currentTokenIds.has(v.tokenId),
            );

            const preservedTokenIds = new Set(
              preserved.map((v) => v.tokenId).filter(Boolean),
            );

            const newEntries = tabTokens
              .filter((t) => !preservedTokenIds.has(t.id))
              .map((token) => ({
                id: generateId(),
                tokenId: token.id,
                name: token.text,
                identifier: "",
                dataType: "integer",
                idType: "variable",
                initialValue: "",
              }));

            newVars[tabId] = [...preserved, ...newEntries];
          }

          return { variablesByTab: newVars };
        }),

      addVariable: (tab) =>
        set((state) => ({
          variablesByTab: {
            ...state.variablesByTab,
            [tab]: [
              ...state.variablesByTab[tab],
              {
                id: generateId(),
                tokenId: null,
                name: "",
                identifier: "",
                dataType: "integer",
                idType: "variable",
                initialValue: "",
              },
            ],
          },
        })),

      removeVariable: (tab, variableId) =>
        set((state) => ({
          variablesByTab: {
            ...state.variablesByTab,
            [tab]: state.variablesByTab[tab].filter(
              (v) => v.id !== variableId,
            ),
          },
        })),

      updateVariable: (tab, variableId, field, value) =>
        set((state) => ({
          variablesByTab: {
            ...state.variablesByTab,
            [tab]: state.variablesByTab[tab].map((v) =>
              v.id === variableId ? { ...v, [field]: value } : v,
            ),
          },
        })),
    }),
    { name: "epaa-plan" },
  ),
);
