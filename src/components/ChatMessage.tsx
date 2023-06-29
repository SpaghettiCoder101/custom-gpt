import Toggle from "@/fragments/Toggle";
import { Message } from "ai";
import { Remark } from "react-remark";


type Props = {
  message: Message;
  setKeep: (keepId: string) => void;
  removeKeep: (keepId: string) => void;
}

const userMessagesClass = "bg-blue-500 text-white py-2 px-4 rounded";
const aiMessagesClass = "bg-gray-300 text-gray-700 py-2 px-4 rounded";

export default function ChatMessage({ message, setKeep, removeKeep }: Props) {
    const { id, role, content } = message;

    function onKeep(keep: boolean) {
        if (keep) 
            setKeep(id);
        else 
            removeKeep(id);
    }

    return (
        <div
            key={id}
            className={`mb-3 relative py-4 ${
                role === "user" ? userMessagesClass : aiMessagesClass
            }`}
        >
            <Toggle parentClassName="absolute right-1 top-1" onToggle={onKeep} />
            <Remark>{content}</Remark>
        </div>
    );
}
