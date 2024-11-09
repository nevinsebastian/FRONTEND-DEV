import { div } from "framer-motion/client";
import { SidebarDemo } from "./dashboard/SidebarDemo";

export default function Page() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <SidebarDemo />
    </div>
  );
}
