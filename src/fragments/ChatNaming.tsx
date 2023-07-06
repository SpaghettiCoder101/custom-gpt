import { Popover } from "@headlessui/react";

type Props = {
  name: string;
  setName: (name: string) => void;
};
export default function ChatNaming({ name, setName }:Props){
    return (
        <div className="flex items-center gap-2 ml-10">
            <label>Chat Name</label>
            <input 
                className="w-40 h-11 border border-gray-300 rounded p-2"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </ div>

    );
}
