"use client";

import { useId } from "react";
import { Select } from "@/components/Select";
import {
  Hashtag,
  DotsHorizontalRounded,
  At,
  Checkbox,
  CodeAlt,
  Lock,
  Bracket,
} from "@boxicons/react";

const dataTypeOptions = [
  { value: "integer", label: "Entero" },
  { value: "real", label: "Real" },
  { value: "string", label: "Cadena" },
  { value: "boolean", label: "Booleano" },
];

const dataTypeColorMap = {
  integer: "type-integer",
  real: "type-real",
  string: "type-string",
  boolean: "type-boolean",
};

const dataTypeIcons = {
  integer: Hashtag,
  real: DotsHorizontalRounded,
  string: At,
  boolean: Checkbox,
};

const idTypeOptions = [
  { value: "variable", label: "Variable" },
  { value: "constant", label: "Constante" },
  { value: "array", label: "Arreglo" },
];

const idTypeColorMap = {
  variable: "idtype-variable",
  constant: "idtype-constant",
  array: "idtype-array",
};

const idTypeIcons = {
  variable: CodeAlt,
  constant: Lock,
  array: Bracket,
};

function generateIdentifier(name) {
  return name
    .toLowerCase()
    .replace(/[^a-záéíóúñ0-9\s-]/g, "")
    .replace(/[áéíóú]/g, (c) =>
      ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] || c,
    )
    .replace(/[\s-]+/g, " ")
    .trim()
    .split(" ")
    .map((word, i) =>
      i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}

export function VariableRow({ variable, tab, onUpdate }) {
  const inputId = useId();

  const handleChange = (field, value) => {
    onUpdate(tab, variable.id, field, value);
  };

  const handleNameChange = (event) => {
    handleChange("name", event.target.value);
  };

  const handleIdentifierChange = (event) => {
    handleChange("identifier", event.target.value);
  };

  const handleDataTypeChange = (value) => {
    handleChange("dataType", value);
    if (value !== "boolean" && variable.initialValue === "true") {
      handleChange("initialValue", "");
    } else if (value === "boolean" && variable.initialValue === "") {
      handleChange("initialValue", "false");
    }
  };

  const handleInitialValueChange = (event) => {
    if (variable.dataType === "boolean") {
      handleChange("initialValue", event.target.checked ? "true" : "false");
    } else {
      handleChange("initialValue", event.target.value);
    }
  };

  const identifierPlaceholder = variable.name
    ? generateIdentifier(variable.name)
    : "identificador";

  return (
    <tr className="border-b border-border/50 last:border-b-0 transition-colors hover:bg-muted/20">
      <td className="px-4 py-2.5">
        <input
          type="text"
          value={variable.name}
          onChange={handleNameChange}
          placeholder="Nombre"
          id={`${inputId}-name`}
          className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />
      </td>

      <td className="px-4 py-2.5">
        <input
          type="text"
          value={variable.identifier}
          onChange={handleIdentifierChange}
          placeholder={identifierPlaceholder}
          id={`${inputId}-identifier`}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
        />
      </td>

      <td className="px-4 py-2.5">
        <Select
          value={variable.dataType}
          onChange={handleDataTypeChange}
          options={dataTypeOptions}
          colorMap={dataTypeColorMap}
          icons={dataTypeIcons}
        />
      </td>

      <td className="px-4 py-2.5">
        <Select
          value={variable.idType}
          onChange={(value) => handleChange("idType", value)}
          options={idTypeOptions}
          colorMap={idTypeColorMap}
          icons={idTypeIcons}
        />
      </td>

      <td className="px-4 py-2.5">
        {variable.dataType === "boolean" ? (
          <label className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={variable.initialValue === "true"}
              onChange={handleInitialValueChange}
              className="h-4 w-4 rounded border-border accent-foreground"
            />
            <span className="text-xs text-muted-foreground">
              {variable.initialValue === "true" ? "Verdadero" : "Falso"}
            </span>
          </label>
        ) : (
          <input
            type={variable.dataType === "integer" ? "number" : "text"}
            step={variable.dataType === "real" ? "any" : undefined}
            value={variable.initialValue}
            onChange={handleInitialValueChange}
            placeholder="Valor"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />
        )}
      </td>
    </tr>
  );
}
