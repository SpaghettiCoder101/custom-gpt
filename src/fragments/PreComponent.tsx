import { useState, useRef } from "react";

//TODO: Add types
export default function PreComponent(props:any){
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLElement>(null);

    function copyToClipboard() {
        if(!preRef.current) return;
        navigator.clipboard.writeText(preRef.current.innerText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    }

    return (
        <>
            <div className="flex items-center relative text-gray-200 bg-gray-700 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                <button className="ml-auto" onClick={copyToClipboard}>Copy</button>
                {copied && <span>Copied!</span>}
            </div>
            <pre ref={preRef} {...props} />
        </>
    );
}