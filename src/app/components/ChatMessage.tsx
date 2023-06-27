import { Message } from "ai";
import { useState } from "react";
import { Remark } from "react-remark";


type Props = {
  message: Message;
}

const userMessagesClass = "bg-blue-500 text-white font-bold py-2 px-4 rounded";
const aiMessagesClass = "bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded";

export default function ChatMessage({ message }: Props) {
    const [keep, setKeep] = useState(false);
    const { id, role, content } = message;

    function onKeep() {
        setKeep(!keep);
    }
    return (
        <div
            key={id}
            className={`mb-3 ${
                role === "user" ? userMessagesClass : aiMessagesClass
            }`}
        >
            <button className={`${keep ? "bg-green-300" : "bg-purple-300"}`} onClick={onKeep}>keep</button>
            {role === "user" ? "User: " : "AI: "}
            <Remark>{content}</Remark>
        </div>
    );
}
