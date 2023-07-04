import { useRef, SyntheticEvent, useEffect } from "react";

type Props = {
  disabled: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const baseTextAreaHeight = 40;
export default function ChatInput({ input, handleInputChange, onSubmit, disabled }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onInputHandler = (event: SyntheticEvent<HTMLTextAreaElement>) => {
        console.log("onInputHandler");
        const target = event.target as HTMLTextAreaElement;
        const currentLines = target.value.split("\n").length;
        const textAreaHeight = baseTextAreaHeight - 20 + currentLines * 20;

        if (!textareaRef.current) return;
        textareaRef.current.style.height = textAreaHeight + "px";
    };

    useEffect(() => {
        if (disabled && textareaRef.current) 
            textareaRef.current.style.height = `${baseTextAreaHeight}px`;
    
    }, [disabled]);
    return (
        <form onSubmit={onSubmit} className="fixed w-full max-w-2xl bottom-8 flex flex-nowrap items-end">
        
            <textarea 
                ref={textareaRef}
                className="border border-gray-300 rounded mr-2 shadow-xl p-2 grow h-[40px] resize-none overflow-hidden"
                value={input}
                onChange={handleInputChange}
                onInput={onInputHandler}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
        </form>
    );
}
