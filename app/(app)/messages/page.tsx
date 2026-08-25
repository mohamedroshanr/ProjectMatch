"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Phone, Video, MoreVertical, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_CHATS = [
  {
    id: "c1",
    name: "Alex Chen",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4",
    lastMessage: "I'll push the Python data structures code to GitHub tonight.",
    time: "10:42 AM",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", text: "Hey! How's the computer vision model coming along?", sender: "me", time: "10:30 AM" },
      { id: "m2", text: "It's going well! Just tuning the PyTorch hyperparams.", sender: "them", time: "10:35 AM" },
      { id: "m3", text: "I'll push the Python data structures code to GitHub tonight.", sender: "them", time: "10:42 AM" }
    ]
  },
  {
    id: "c2",
    name: "Hardware/IoT Team",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Team&backgroundColor=ffdfbf",
    lastMessage: "Did you finish routing the PCB in EasyEDA?",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "Are we still meeting tomorrow for the ESP32 integration?", sender: "me", time: "Yesterday 4:00 PM" },
      { id: "m2", text: "Yes! But before that...", sender: "them", time: "Yesterday 4:15 PM" },
      { id: "m3", text: "Did you finish routing the PCB in EasyEDA?", sender: "them", time: "Yesterday 4:16 PM" }
    ]
  },
  {
    id: "c3",
    name: "Sarah Kim",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=c0aede",
    lastMessage: "Let's review the C programming lab questions before the meeting.",
    time: "Tuesday",
    unread: 0,
    online: true,
    messages: [
      { id: "m1", text: "Got the React frontend deployed on Vercel.", sender: "me", time: "Tuesday 1:00 PM" },
      { id: "m2", text: "Awesome! Looks great. Let's review the C programming lab questions before the meeting.", sender: "them", time: "Tuesday 1:30 PM" }
    ]
  }
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    // Optimistic UI update for mock chat
    const updatedChat = { ...activeChat };
    updatedChat.messages.push({
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      time: "Just now"
    });
    
    setActiveChat(updatedChat);
    setNewMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-80px)]">
      <div className="bg-nexa-card-dark border border-white/5 rounded-[24px] shadow-2xl shadow-black/50 overflow-hidden h-full flex flex-col md:flex-row">
        
        {/* Left Sidebar - Chat List */}
        <div className="w-full md:w-80 border-r border-white/5 flex flex-col h-full bg-black/20">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nexa-lavender-3" size={16} />
              <Input placeholder="Search chats..." className="bg-white/5 border-transparent pl-9 text-white rounded-xl focus:border-nexa-blue focus:ring-nexa-blue" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {MOCK_CHATS.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${
                  activeChat.id === chat.id 
                    ? "bg-white/10 border-nexa-blue" 
                    : "border-transparent hover:bg-white/5"
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12 border border-white/10">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-nexa-card-dark"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-white truncate text-sm">{chat.name}</h4>
                    <span className="text-xs text-nexa-lavender-3">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-nexa-lavender truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-nexa-blue text-white text-[10px] flex items-center justify-center font-bold ml-2 shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane - Active Chat */}
        <div className="flex-1 flex flex-col h-full bg-[#0a0a0f]/50">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border border-white/10">
                <AvatarImage src={activeChat.avatar} />
                <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-white text-sm">{activeChat.name}</h3>
                <p className="text-xs text-emerald-400 font-medium">{activeChat.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-nexa-lavender-3">
              <Button variant="ghost" size="icon" className="hover:text-white rounded-full" aria-label="Icon Button"><Phone size={18} /></Button>
              <Button variant="ghost" size="icon" className="hover:text-white rounded-full" aria-label="Icon Button"><Video size={18} /></Button>
              <Button variant="ghost" size="icon" className="hover:text-white rounded-full" aria-label="Icon Button"><MoreVertical size={18} /></Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="text-center">
              <span className="bg-white/5 text-nexa-lavender-3 text-xs px-3 py-1 rounded-full">Today</span>
            </div>
            
            {activeChat.messages.map(msg => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
              >
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                  msg.sender === "me" 
                    ? "nexa-grad-bg text-white rounded-tr-sm" 
                    : "bg-white/10 text-white rounded-tl-sm border border-white/5"
                }`}>
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-nexa-lavender-3 px-1">
                  {msg.time}
                  {msg.sender === "me" && <CheckCircle2 size={12} className="text-nexa-blue" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex items-center gap-2">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..." 
                className="flex-1 bg-white/5 border-transparent text-white rounded-xl focus:border-nexa-blue focus:ring-nexa-blue" 
              />
              <Button onClick={handleSend} className="nexa-grad-bg text-white rounded-xl w-10 h-10 p-0 shrink-0 shadow-lg shadow-nexa-blue/20">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
