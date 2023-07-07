import { resetSelectedChatAtom } from "@/atoms/selectedChatAtom";
import { useSetAtom } from "jotai";

export default function NewChatButton() {
    const resetSelectedChat = useSetAtom(resetSelectedChatAtom);
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetSelectedChat}
        >
        New Chat
        </button>
    );
}
