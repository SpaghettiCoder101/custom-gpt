import { currentChatAtom } from "@/atoms/currentChatAtoms";
import { useChatContext } from "@/context/ChatContext";
import { chatModel } from "@/models/chatModel";
import { useAtomValue } from "jotai";

type ChatListProps = {
    setSelectedChat: (value: chatModel) => void;
};

export default function ChatList( { setSelectedChat }: ChatListProps) {
    const { allItems } = useChatContext();
    const currentChat = useAtomValue(currentChatAtom);
    return (
        <div className="flex flex-col w-1/4 max-w-sm h-screen bg-gray-100">
            <div className="flex flex-col p-4">
                {allItems.map(item => (
                    <div
                        key={item.id} 
                        className="flex flex-row justify-between" 
                        onClick={() => setSelectedChat(item)}
                    >
                        <div className={`${currentChat === item.id ? "bg-orange-500 text-white" : "bg-gray-500"}`}>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
