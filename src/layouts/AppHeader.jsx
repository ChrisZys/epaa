"use client";

import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

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

      <div className="text-center text-sm font-semibold">
        Solución algorítmica
      </div>

      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
