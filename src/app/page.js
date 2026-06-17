import { Dropdown, DropdownItem } from "@/components/Dropdown";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Dropdown trigger={<span>Menú</span>}>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Logout</DropdownItem>
      </Dropdown>
    </div>
  );
}
