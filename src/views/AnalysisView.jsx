"use client";

import { ProblemStatementCard } from "@/modules/Analysis/components/ProblemStatementCard";

export function AnalysisView() {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <div className="p-6 lg:w-1/2 lg:max-w-xl">
        <ProblemStatementCard />
      </div>
      <div className="p-6 lg:w-1/2" />
    </div>
  );
}
