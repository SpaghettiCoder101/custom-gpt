import { useState, useRef } from "react";
import { BsClipboard2Fill, BsCheckLg } from "react-icons/bs";
//TODO: Add types
export default function PreComponent(props:any){
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLElement>(null);

    function copyToClipboard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        if(!preRef.current || copied) return;
        navigator.clipboard.writeText(preRef.current.innerText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    }

    return (
        <div className="rounded-md overflow-hidden my-2">
            <div className="flex items-center relative text-gray-200 bg-gray-700 px-4 py-2 text-xs font-sans justify-between">
                <button className="ml-auto flex gap-2 items-center" onClick={copyToClipboard}>
                    {!copied ? 
                        <>
                            <BsClipboard2Fill /> Copy Code
                        </> 
                        :
                        <>
                            <BsCheckLg /> Copied!
                        </>}
                </button>
            </div>
            <pre ref={preRef} {...props} />
        </div>
    );
}