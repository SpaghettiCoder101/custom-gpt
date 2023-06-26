"use client";
 
import { useChat } from "ai/react";
 
export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
 
    return (
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
            {messages.map(m => (
                <div key={m.id}>
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content}
                </div>
            ))}
 
            <form onSubmit={handleSubmit} className="fixed w-full max-w-md bottom-0">
                <input
                    className="border border-gray-300 rounded mb-8 mr-2 shadow-xl p-2"
                    value={input}
                    onChange={handleInputChange}
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
            </form>
        </div>
    );
}