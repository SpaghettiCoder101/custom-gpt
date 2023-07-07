"use client";

import ChatContent from "@/components/ChatContent";
import ChatList from "@/components/ChatList";
import { ChatProvider } from "@/context/ChatContext";

export default function Chat() {

    return (
        <ChatProvider>
            <div className="flex">
                <ChatList />
                <div className="grow h-screen bg-gray-200">
                    <ChatContent />
                </div>
            </div>
        </ChatProvider>
    );
}
