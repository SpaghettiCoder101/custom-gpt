import { useChatContext } from "@/context/ChatContext";
import { chatModel } from "@/models/chatModel";

type ChatListProps = {
    setSelectedChat: (value: chatModel) => void;
};

export default function ChatList( { setSelectedChat }: ChatListProps) {
    const { allItems } = useChatContext();
    return (
        <div className="flex flex-col w-1/4 max-w-sm h-screen bg-gray-100">
            <div className="flex flex-col p-4">
                {allItems.map(item => (
                    <div
                        key={item.id} 
                        className="flex flex-row justify-between" 
                        onClick={() => setSelectedChat(item)}
                    >
                        {item.title} {item.id}
                    </div>
                ))}
            </div>
        </div>
    );
}
