import { chatModel } from "@/models/chatModel";
import { atom } from "jotai";

const initialChatValue:chatModel = {
    id: "1",
    title: "Rondo The assistant",
    systemMessage: "You are Rondo a heplful AI",
    tokens: 1500,
    messages: [],
};

export const selectedChatAtom = atom<chatModel>(initialChatValue);

