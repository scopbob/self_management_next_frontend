import { FiLogOut } from "react-icons/fi";
import NavLinks from "@/components/ui/dashboard/nav-links";
import { handleLogout } from "@/lib/actions";
import { Button } from "@chakra-ui/react";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await handleLogout();
          }}
        >
          <Button colorPalette={"red"} type="submit">
            <FiLogOut />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
