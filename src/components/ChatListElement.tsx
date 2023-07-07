import { selectedChatAtom } from "@/atoms/selectedChatAtom";
import { useChatContext } from "@/context/ChatContext";
import { chatModel } from "@/models/chatModel";
import { useAtom } from "jotai";
import { useState } from "react";
import { BsCheckLg, BsPencilFill, BsTrash3Fill } from "react-icons/bs";

type Props = {
  item: chatModel;
};
export default function ChatListElement({ item }:Props){
    const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [chatName, setChatName] = useState<string>(item.title);
    const { updateChatName, deleteChat } = useChatContext();

    function onEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();

        if(editMode) updateChatName(item.id, chatName);

        setEditMode(!editMode);
    }

    function onDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();

        deleteChat(item.id);
    }

    return (
        <div
            className={`${selectedChat.id === item.id ? "bg-orange-500 text-white" : "bg-gray-300"} flex flex-row grow justify-between cursor-pointer p-3 rounded-md shadow-md group`} 
            onClick={() => setSelectedChat(item)}
        >
            {editMode ? 
                <input
                    type="text" value={chatName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatName(e.target.value)} 
                    className={`${selectedChat.id === item.id ? "bg-orange-500 " : "bg-gray-300"} ring-1`}
                />
                :
                <div>
                    {item.title}
                </div> 
            }
            <div className="flex gap-2">
                <button className="hidden group-hover:block" onClick={onEdit}>{editMode ? <BsCheckLg /> : <BsPencilFill />}</button>
                <button className="hidden group-hover:block" onClick={onDelete}><BsTrash3Fill /></button>
            </div>
        </div>
    );
}
