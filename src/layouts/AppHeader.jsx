"use client";

import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/Input";

export function AppHeader() {
  return (
    <header className="grid grid-cols-3 items-center border-b border-border p-4">
      <div className="flex justify-start">
        <Dropdown trigger={<span>Menú</span>}>
          <DropdownItem>Nueva Solución</DropdownItem>
          <DropdownItem>Guardar Solución</DropdownItem>
          <DropdownItem>Abrir Solución</DropdownItem>
        </Dropdown>
      </div>

      <div className="flex justify-center">
        <Input
          defaultValue="Solución algorítmica"
          className="text-center font-bold"
        />
      </div>

      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
