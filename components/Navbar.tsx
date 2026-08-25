"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useProfile } from "@/lib/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X, Bell, Plus, Check, X as XIcon } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { CreateRequirementModal } from "./CreateRequirementModal";
import { MOCK_USERS } from "@/lib/mockData";
import MobileMenu from "./MobileMenu";
import { motion, AnimatePresence } from "framer-motion";

export const NAV_ITEMS = [
  { label: "Feed", href: "/feed" },
  { label: "Teams", href: "/teams" },
  { label: "Hackathons", href: "/events" },
  { label: "AI Matcher", href: "/ai-matcher" },
  { label: "Messages", href: "/messages" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const { profile } = useProfile(user?.uid ?? null);
  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;
  const displayName = profile?.displayName || mockUser?.name || "User";
  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [requirementModalOpen, setRequirementModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-nexa-card-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-nexa-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/feed">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "nexa-grad-bg text-white shadow-md shadow-nexa-accent/20"
                          : "text-nexa-lavender hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            
            {/* Desktop Profile & Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Button onClick={() => setRequirementModalOpen(true)} className="bg-white/10 hover:bg-white/20 text-white rounded-xl h-9 px-4 text-xs font-semibold mr-2 border-0">
                    <Plus size={14} className="mr-1" /> Post Requirement
                  </Button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="relative text-nexa-lavender hover:text-white transition-colors mr-2"
                    >
                      <Bell size={20} />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-nexa-orange rounded-full border-2 border-nexa-card-dark"></span>
                    </button>
                    
                    <AnimatePresence>
                      {notificationsOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-4 w-80 bg-nexa-card-dark border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50"
                        >
                          <div className="p-3 border-b border-white/5 bg-black/20">
                            <h4 className="text-sm font-semibold text-white">Notifications</h4>
                          </div>
                          <div className="p-2 space-y-1">
                            <div className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                              <p className="text-sm text-white mb-2"><span className="font-bold">@alex_c</span> sent you a friend request.</p>
                              <div className="flex gap-2">
                                <Button className="flex-1 h-8 text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-0">
                                  <Check size={14} className="mr-1" /> Accept
                                </Button>
                                <Button className="flex-1 h-8 text-xs bg-white/5 text-nexa-lavender hover:bg-white/10 border-0">
                                  <XIcon size={14} className="mr-1" /> Decline
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href={`/profile/${user.uid}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Avatar className="w-8 h-8 border border-nexa-blue/30">
                      <AvatarImage src={displayAvatar} />
                      <AvatarFallback className="bg-nexa-card-dark text-nexa-lavender text-xs">
                        <User size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white max-w-[100px] truncate">
                      {displayName}
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={logout} className="text-nexa-lavender-3 hover:text-white hover:bg-white/5 rounded-full w-8 h-8" aria-label="Icon Button">
                    <LogOut size={16} />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="nexa-grad-bg text-white rounded-xl h-9 px-6 border-0 shadow-lg shadow-nexa-accent/20">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="text-nexa-lavender hover:text-white hover:bg-white/5 rounded-xl"
              >
                <Menu size={24} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        user={user} 
        profile={profile} 
        logOut={logout} 
      />
      <CreateRequirementModal isOpen={requirementModalOpen} onClose={() => setRequirementModalOpen(false)} />
    </>
  );
}
