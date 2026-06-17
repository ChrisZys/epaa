import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Dropdown trigger={<span>Menú</span>}>
        <button className="flex w-full items-center rounded-md px-3 py-1.5 text-sm hover:bg-accent">
          Profile
        </button>
        <button className="flex w-full items-center rounded-md px-3 py-1.5 text-sm hover:bg-accent">
          Settings
        </button>
        <button className="flex w-full items-center rounded-md px-3 py-1.5 text-sm hover:bg-accent">
          Logout
        </button>
      </Dropdown>
    </div>
  );
}
