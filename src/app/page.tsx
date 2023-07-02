"use client";

import ChatContent from "@/components/ChatContent";
import ChatList from "@/components/ChatList";
import { ChatProvider } from "@/context/ChatContext";
import { chatModel } from "@/models/chatModel";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Chat() {
    const [selectedChat, setSelectedChat] = useState<chatModel>();

    return (
        <ChatProvider>
            <div className="flex">
                <ChatList setSelectedChat={setSelectedChat} />
                <div className="grow h-screen bg-gray-200">
                    <ChatContent id={selectedChat?.id ?? uuidv4()} initialChat={selectedChat} />
                </div>
            </div>
        </ChatProvider>
    );
}
