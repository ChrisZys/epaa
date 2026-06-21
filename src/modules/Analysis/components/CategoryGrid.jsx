"use client";

import { CategoryCard } from "@/modules/Analysis/components/CategoryCard";
import { useAnalysisStore } from "@/modules/Analysis/store";

const categoryDefinitions = [
  { id: "has", name: "¿Qué tenemos?" },
  { id: "seeks", name: "¿Qué buscamos?" },
  { id: "solves", name: "¿Cómo lo resolvemos?" },
  { id: "rules", name: "¿Bajo qué reglas?" },
];

export function CategoryGrid() {
  const tokens = useAnalysisStore((state) => state.tokens);
  const selectedCategoryId = useAnalysisStore((state) => state.selectedCategoryId);
  const selectCategory = useAnalysisStore((state) => state.selectCategory);
  const removeTokenFromCategory = useAnalysisStore(
    (state) => state.removeTokenFromCategory,
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {categoryDefinitions.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          tokens={tokens.filter((t) => t.categoryId === category.id)}
          isSelected={selectedCategoryId === category.id}
          onSelect={() => selectCategory(category.id)}
          onRemoveToken={removeTokenFromCategory}
        />
      ))}
    </div>
  );
}
