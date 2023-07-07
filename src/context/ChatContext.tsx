import { chatModel } from "@/models/chatModel";
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type ChatContextType = {
  allItems: chatModel[];
  saveToStorage: (valueToSave: chatModel) => void;
  updateChatName: (id: string, newName: string) => void;
  deleteChat: (id: string) => void;
};

const ChatContext = createContext<ChatContextType>({
    allItems: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    saveToStorage: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateChatName: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deleteChat: () => {},
});

export const useChatContext = () => useContext(ChatContext);

function tryFindChatWithID(id: string): { chat: chatModel | null; savedChats: chatModel[] | null }{
    const savedValue = window.localStorage.getItem("chats");
    if(!savedValue) return { chat: null, savedChats: null };
    try {
        const chats = JSON.parse(savedValue);
        const findChat = chats.find((chat:chatModel) => chat.id === id);
        if(!findChat) return { chat: null, savedChats: chats };
        return { chat: findChat, savedChats: chats };
    }
    catch (error) {
        console.error(error);
        return { chat: null, savedChats: null };
    }
}

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

    function saveToStorage(valueToSave: chatModel){
        if(valueToSave.id === "1") valueToSave.id = uuidv4();
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
    }

    function updateChatName(id: string, newName: string){
        const { chat, savedChats } = tryFindChatWithID(id);
        if(!chat || !savedChats) return;
        const index = savedChats.indexOf(chat);
        savedChats[index].title = newName;
        window.localStorage.setItem("chats", JSON.stringify(savedChats));
        setAllItems(savedChats);

    }

    function deleteChat(id: string){
        const { chat, savedChats } = tryFindChatWithID(id);
        if(!chat || !savedChats) return;
        const index = savedChats.indexOf(chat);
        savedChats.splice(index, 1);
        window.localStorage.setItem("chats", JSON.stringify(savedChats));
        setAllItems(savedChats);
    }
            

    return (
        <ChatContext.Provider
            value={{
                allItems, saveToStorage, updateChatName, deleteChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};