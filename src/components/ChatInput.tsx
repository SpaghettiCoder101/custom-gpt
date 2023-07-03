
type Props = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ChatInput({ input, handleInputChange, onSubmit }: Props) {
    return (
        <form onSubmit={onSubmit} className="fixed w-full max-w-2xl bottom-8 flex flex-nowrap items-end">
            <input
                className="border border-gray-300 rounded mr-2 shadow-xl p-2 grow"
                value={input}
                onChange={handleInputChange}
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
