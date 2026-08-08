"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import ModeToggle from "./ModeToggle";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const {user} = useUser();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <ModeToggle/>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" />}
          nativeButton={true}
        >
          <MenuIcon className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="right" className="w-75">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              render={<Link href="/" />}
              nativeButton={false}
              onClick={()=>setShowMobileMenu(false)}
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  render={<Link href="/notifications" />}
                  nativeButton={false}
                  onClick={()=>setShowMobileMenu(false)}
                >
                  <BellIcon className="w-4 h-4" />
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  render={<Link
                href={`/profile/${
                  user?.username ??
                  user?.emailAddresses[0].emailAddress.split("@")[0]
                }`}
              />}
                  onClick={()=>setShowMobileMenu(false)}
                  nativeButton={false}
                >
                  <UserIcon className="w-4 h-4" />
                  Profile
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full"
                    onClick={()=>setShowMobileMenu(false)}
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
