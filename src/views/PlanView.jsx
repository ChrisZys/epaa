"use client";

import { useEffect } from "react";
import { useAnalysisStore } from "@/modules/Analysis/store";
import { usePlanStore } from "@/modules/Plan/store";
import { VariableTable } from "@/modules/Plan/components/VariableTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";

const tabMeta = {
  has: { label: "Entradas y constantes", colorVar: "category-has" },
  seeks: { label: "Salidas", colorVar: "category-seeks" },
  auxiliary: { label: "Auxiliares", colorVar: "category-auxiliary" },
};

export function PlanView() {
  const analysisTokens = useAnalysisStore((state) => state.tokens);
  const variablesByTab = usePlanStore((state) => state.variablesByTab);
  const activeTab = usePlanStore((state) => state.activeTab);
  const initializeFromTokens = usePlanStore(
    (state) => state.initializeFromTokens,
  );
  const setActiveTab = usePlanStore((state) => state.setActiveTab);
  const addVariable = usePlanStore((state) => state.addVariable);
  const removeVariable = usePlanStore((state) => state.removeVariable);
  const updateVariable = usePlanStore((state) => state.updateVariable);

  useEffect(() => {
    initializeFromTokens(analysisTokens);
  }, [analysisTokens, initializeFromTokens]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Planeación</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Define las variables que utilizarás para resolver el problema
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-1 flex-col"
      >
        <TabsList>
          {Object.entries(tabMeta).map(([tabId, meta]) => {
            const count = variablesByTab[tabId]?.length ?? 0;
            return (
              <TabsTrigger key={tabId} value={tabId}>
                {meta.label}
                {count > 0 && (
                  <span
                    className="inline-flex size-5 items-center justify-center rounded-full text-[10px] font-semibold leading-none"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--${meta.colorVar}) 12%, transparent)`,
                      color: `var(--${meta.colorVar})`,
                    }}
                  >
                    {count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="has">
          <VariableTable
            variables={variablesByTab.has}
            tab="has"
            onUpdate={updateVariable}
            onRemove={removeVariable}
            onAdd={() => addVariable("has")}
          />
        </TabsContent>

        <TabsContent value="seeks">
          <VariableTable
            variables={variablesByTab.seeks}
            tab="seeks"
            onUpdate={updateVariable}
            onRemove={removeVariable}
            onAdd={() => addVariable("seeks")}
          />
        </TabsContent>

        <TabsContent value="auxiliary">
          <VariableTable
            variables={variablesByTab.auxiliary}
            tab="auxiliary"
            onUpdate={updateVariable}
            onRemove={removeVariable}
            onAdd={() => addVariable("auxiliary")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
