import StopButton from "@/fragments/StopButton";
import { useChat } from"ai/react";
import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import TokenInput from "./TokenInput";
import { chatModel } from "@/models/chatModel";
import SaveButton from "@/fragments/SaveButton";
import ChatInput from "./ChatInput";
import SystemMessage from "@/fragments/SystemMessage";
import { useHotkeys } from "react-hotkeys-hook";
import ChatNaming from "@/fragments/ChatNaming";
import { currentChatAtom } from "@/atoms/currentChatAtoms";
import { useSetAtom } from "jotai";

type Props = {
    id: string;
  initialChat?: chatModel;
}

const initialChatValue:chatModel = {
    id: "1",
    title: "Rondo The assistant",
    systemMessage: "You are Rondo a heplful AI",
    tokens: 1500,
    messages: [],
};

export default function ChatContent( { initialChat, id }: Props ) {
    const [messagesToKeep, setMessagesToKeep] = useState<string[]>([]);
    const [tokenToUse, setTokenToUse] = useState<number>(1500);
    const [chatName, setChatName] = useState<string>(initialChatValue.title);
    const [systemMessage, setSystemMessage] = useState<string>("You are Rondo a heplful AI");
    const setCurrentChat = useSetAtom(currentChatAtom);
    const { messages, input, handleInputChange, setMessages, append, setInput, isLoading, stop } = useChat({
        body: {
            systemMessage: systemMessage,
            maxTokens: tokenToUse,
        },
    });
    useHotkeys("ctrl+enter", () => onSubmit(), { enableOnFormTags: true });

    useEffect(() => {
        if (initialChat) {
            setSystemMessage(initialChat.systemMessage);
            setTokenToUse(initialChat.tokens);
            setMessages(initialChat.messages);
        }
        if(id)
            setCurrentChat(id);
    }, [initialChat, id]);

    function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
        e?.preventDefault();
        const newMessages = messages.filter(m => messagesToKeep.includes(m.id));
        setMessages(newMessages);
        append({
            role: "user",
            content: input,
        });
        setInput("");
    }

    function keepToggleMessage(id: string) {
        if(messagesToKeep.includes(id)) 
            setMessagesToKeep(messagesToKeep.filter(m => m !== id));
        else
            setMessagesToKeep([...messagesToKeep, id]);
    }
    return (
        <>
            <div className="flex flex-col max-h-screen">
                <div className="w-full p-4 gap-2 flex border-b-2">
                    <SystemMessage systemMessage={systemMessage} setSystemMessage={setSystemMessage} />
                    <TokenInput token={tokenToUse} tokenChange={setTokenToUse} />
                    <SaveButton id={id} title={chatName} systemMessage={systemMessage} tokens={tokenToUse} messages={messages} />
                    <ChatNaming name={chatName} setName={setChatName} />
                </div>
                <div className="mx-auto w-full grow overflow-auto max-w-2xl py-24 flex flex-col stretch mb-8 px-4">
                    {messages.map(m => (
                        <ChatMessage key={m.id} message={m} toggleKeep={keepToggleMessage} messagesToKeep={messagesToKeep} />
                    ))}
                    <ChatInput onSubmit={onSubmit} input={input} handleInputChange={handleInputChange} disabled={isLoading} stop={stop} />
                </div>
            </div>
        </>
    );
}
