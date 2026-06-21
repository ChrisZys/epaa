"use client";

import { ProblemStatementCard } from "@/modules/Analysis/components/ProblemStatementCard";
import { CategoryGrid } from "@/modules/Analysis/components/CategoryGrid";

export function AnalysisView() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-6 lg:flex-row">
      <div className="flex flex-col gap-6 lg:w-1/2">
        <ProblemStatementCard />
      </div>
      <div className="lg:w-1/2">
        <CategoryGrid />
      </div>
    </div>
  );
}
