import { useChatContext } from "@/context/ChatContext";
import { chatModel } from "@/models/chatModel";

export default function SaveButton({ id, title,systemMessage,tokens, messages, keptMessages }:chatModel) {
    const { saveToStorage } = useChatContext();
    function saveChat() {
        saveToStorage({
            id, title, systemMessage,tokens, messages, keptMessages,
        });
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveChat}
        >
      Save Chat
        </button>
    );
}
