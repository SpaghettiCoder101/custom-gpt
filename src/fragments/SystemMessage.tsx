import { Popover } from "@headlessui/react";

type Props = {
  systemMessage: string;
  setSystemMessage: (systemMessage: string) => void;
}

export default function SystemMessage( { systemMessage, setSystemMessage }: Props) {
    return (
        <Popover className="bg-blue-500 p-2 w-fit rounded-lg border-solid border-blue-200 border-2">
            <Popover.Button className="focus-visible:border-none focus-visible:outline-none text-white">System Message</Popover.Button>

            <Popover.Panel className="absolute z-10 bg-white p-5 rounded-lg shadow-xl">
                <textarea 
                    className="w-full h-32 border border-gray-300 rounded p-2 grow"
                    value={systemMessage}
                    onChange={e => setSystemMessage(e.target.value)}
                />

            </Popover.Panel>
        </Popover>
    );
}
