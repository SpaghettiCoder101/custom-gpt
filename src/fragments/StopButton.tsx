import { Transition } from "@headlessui/react";

type Props = {
  isLoading: boolean;
  stop: () => void;
}

export default function StopButton( { isLoading, stop }: Props) {
    return (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <Transition
                show={isLoading}
                enter="transition-all duration-300"
                enterFrom="opacity-0 translate-y-1/2"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1/2"
            >
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={stop}
                >
                    Stop
                </button>
            </Transition>
        </div>
    );
}
