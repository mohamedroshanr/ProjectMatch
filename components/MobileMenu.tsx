"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut, User } from "lucide-react";
import { NAV_ITEMS } from "./Navbar";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { MOCK_USERS } from "@/lib/mockData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: any;
  logOut: () => void;
}

export default function MobileMenu({ isOpen, onClose, user, profile, logOut }: MobileMenuProps) {
  const pathname = usePathname();

  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;
  const displayName = profile?.displayName || mockUser?.name || "User";
  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[280px] bg-nexa-card-dark border-l border-white/5 z-50 md:hidden flex flex-col shadow-2xl shadow-black"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <span className="font-medium text-white">Menu</span>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-nexa-lavender-3 hover:text-white rounded-full" aria-label="Icon Button">
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "nexa-grad-bg text-white shadow-lg shadow-nexa-accent/20"
                        : "text-nexa-lavender hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="p-5 border-t border-white/5 bg-black/20">
              {user ? (
                <div className="flex items-center justify-between">
                  <Link href={`/profile/${user.uid}`} onClick={onClose} className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1 overflow-hidden">
                    <Avatar className="w-10 h-10 border border-nexa-blue/30">
                      <AvatarImage src={displayAvatar} />
                      <AvatarFallback className="bg-nexa-blue/20 text-nexa-blue">
                        <User size={18} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{displayName}</p>
                      <p className="text-xs text-nexa-lavender-3 truncate">View Profile</p>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() = aria-label="Icon Button"> { logOut(); onClose(); }} className="text-nexa-lavender-3 hover:text-white rounded-full shrink-0">
                    <LogOut size={18} />
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={onClose}>
                  <Button className="w-full nexa-grad-bg text-white rounded-xl h-11 border-0 shadow-lg shadow-nexa-accent/20">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
