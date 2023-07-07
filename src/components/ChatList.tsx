import { selectedChatAtom } from "@/atoms/selectedChatAtom";
import { useChatContext } from "@/context/ChatContext";
import { useAtom } from "jotai";



export default function ChatList() {
    const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);
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
                        <div className={`${selectedChat.id === item.id ? "bg-orange-500 text-white" : "bg-gray-500"}`}>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
