"use client";

import { VariableRow } from "@/modules/Plan/components/VariableRow";
import { Button } from "@/components/Button";
import { Plus, Edit, Code, Server, Key, PlayCircle } from "@boxicons/react";

const columns = [
  { icon: Edit, label: "Nombre" },
  { icon: Code, label: "Identificador" },
  { icon: Server, label: "Tipo de dato" },
  { icon: Key, label: "Tipo de ID" },
  { icon: PlayCircle, label: "Valor inicial" },
];

export function VariableTable({ variables, tab, onUpdate, onRemove, onAdd }) {
  if (variables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 px-6 py-12 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {tab === "auxiliary"
            ? "No hay variables auxiliares"
            : "No hay tokens en esta categoría"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/50">
          {tab === "auxiliary"
            ? "Agrega una variable auxiliar para comenzar"
            : "Asigna tokens en la fase de Análisis"}
        </p>
        {tab === "auxiliary" && (
          <Button variant="outline" size="sm" onClick={onAdd} className="mt-4">
            <Plus className="h-4 w-4" />
            Agregar variable
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-visible rounded-xl border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.label}
                className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground"
              >
                <span className="inline-flex items-center gap-1.5">
                  <col.icon className="h-3.5 w-3.5" />
                  {col.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <VariableRow
              key={variable.id}
              variable={variable}
              tab={tab}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>

      {tab === "auxiliary" && (
        <div className="border-t border-border/50 px-4 py-2.5">
          <Button variant="ghost" size="sm" onClick={onAdd}>
            <Plus className="h-4 w-4" />
            Agregar variable
          </Button>
        </div>
      )}
    </div>
  );
}
