"use client";

import ChatMessage from "@/components/ChatMessage";
import { useChat } from "ai/react";
import { useState } from "react";

export default function Chat() {
    const [messagesToKeep, setMessagesToKeep] = useState<string[]>([]);
    const { messages, input, handleInputChange, setMessages, append, setInput } = useChat();

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessages(messages.filter(m => messagesToKeep.includes(m.id)));
        append({
            role: "user",
            content: input,
        });
        setInput("");
    }

    function keepAddMessage(id: string) {
        setMessagesToKeep([...messagesToKeep, id]);
    }

    function keepRemoveMessage(id: string) {
        setMessagesToKeep(messagesToKeep.filter(m => m !== id));
    }

    return (
        <div className="mx-auto w-full max-w-2xl py-24 flex flex-col stretch">
            {messages.map(m => (
                <ChatMessage key={m.id} message={m} setKeep={keepAddMessage} removeKeep={keepRemoveMessage} />
            ))}

            <form onSubmit={onSubmit} className="fixed w-full max-w-2xl bottom-8 flex flex-nowrap items-end">
                <input
                    className="border border-gray-300 rounded mr-2 shadow-xl p-2 grow"
                    value={input}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send
                </button>
            </form>
        </div>
    );
}
