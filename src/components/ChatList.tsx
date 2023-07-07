import { useChatContext } from "@/context/ChatContext";
import { Fragment } from "react";
import ChatListElement from "./ChatListElement";

export default function ChatList() {
    const { allItems } = useChatContext();

    return (
        <div className="flex flex-col w-1/4 max-w-sm h-screen bg-gray-100">
            <div className="flex flex-col p-4 gap-3">
                {allItems.map(item => (
                    <Fragment key={item.id}>
                        <ChatListElement item={item} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
