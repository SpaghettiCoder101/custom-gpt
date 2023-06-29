import { Popover } from "@headlessui/react";

type Props = {
  token: number;
  tokenChange: (tokens: number) => void;
}

export default function TokenInput({ token, tokenChange }:Props) {


    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const tokenValue = parseInt(e.target.value);
        tokenChange(tokenValue);
    }

    return (
        <Popover className="bg-blue-500 p-2 w-fit rounded-lg border-solid border-blue-200 border-2">
            <Popover.Button className="focus-visible:border-none focus-visible:outline-none text-white">
              Set Tokens ({token})
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white p-5 rounded-lg shadow-xl">
                <input type="number" className="border p-2" placeholder="Enter something" value={token} onChange={onValueChange} />
            </Popover.Panel>
        </Popover>
    );
}