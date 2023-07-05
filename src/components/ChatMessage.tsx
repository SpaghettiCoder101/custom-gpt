import { Message } from "ai";
import { useEffect } from "react";
import { useRemark } from "react-remark";
import "highlight.js/styles/atom-one-dark.css"; 
import PreComponent from "@/fragments/PreComponent";
import rehypeHighlight from "rehype-highlight/lib";
import { Pluggable } from "unified";

type Props = {
  message: Message;
  messagesToKeep: string[];
  toggleKeep: (keepId: string) => void;
}

const userMessagesClass = "bg-blue-500 text-white py-2 px-4 rounded";
const aiMessagesClass = "bg-gray-300 text-gray-700 py-2 px-4 rounded";
const keepMessageCalss = "ring-2 ring-red-500";

export default function ChatMessage({ message, toggleKeep, messagesToKeep }: Props) {
    const { id, role, content } = message;
    const [parsedContent, setParsedContent] = useRemark({
        rehypePlugins: [(rehypeHighlight as Pluggable)],
        rehypeReactOptions: {
            components: { pre: PreComponent },
        },
    },
    );

    useEffect(() => {
        setParsedContent(content);
    }, [content, setParsedContent]);


    return (
        <div
            key={id}
            className={`mb-3 relative py-4 overflow-x-auto ${
                role === "user" ? userMessagesClass : aiMessagesClass
            } ${messagesToKeep.includes(id) ? keepMessageCalss : ""}`}
            onClick={() => toggleKeep(id)}
        >
            {parsedContent}
        </div>
    );
}
