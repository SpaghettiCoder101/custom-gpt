import { chatModel } from "@/models/chatModel";
import React, { createContext, useContext, useState, useEffect } from "react";

type ChatContextType = {
  allItems: chatModel[];
  saveToStorage: (valueToSave: chatModel) => void;
};

const ChatContext = createContext<ChatContextType>({
    allItems: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    saveToStorage: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>>= ({ children }) => {
    const [allItems, setAllItems] = useState<chatModel[]>([]);

    useEffect(() => {
        try {
            const savedValue = window.localStorage.getItem("chats");
            if(!savedValue) return;
            const chats = JSON.parse(savedValue);
            setAllItems(chats);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const saveToStorage = (valueToSave: chatModel) => {
        try {
            const savedValue = window.localStorage.getItem("chats");
            let newSavedValue = savedValue ? JSON.parse(savedValue) : null;
            if(!savedValue){
                window.localStorage.setItem("chats", JSON.stringify([valueToSave]));
                newSavedValue = [valueToSave];
            }
            else{
                const chats = JSON.parse(savedValue);
                const findChat = chats.find((chat:chatModel) => chat.id === valueToSave.id);
                if(findChat){
                    const index = chats.indexOf(findChat);
                    chats[index] = valueToSave;
                }else{
                    chats.push(valueToSave);
                }
                window.localStorage.setItem("chats", JSON.stringify(chats));
                newSavedValue = chats;
            }
            setAllItems(newSavedValue);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ChatContext.Provider value={{ allItems, saveToStorage }}>
            {children}
        </ChatContext.Provider>
    );
};