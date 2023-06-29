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
        <Popover>
            <Popover.Button className="border p-2">
              Set Tokens ({token})
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white p-5 rounded-lg shadow-xl">
                <input type="number" className="border p-2" placeholder="Enter something" value={token} onChange={onValueChange} />
            </Popover.Panel>
        </Popover>
    );
}