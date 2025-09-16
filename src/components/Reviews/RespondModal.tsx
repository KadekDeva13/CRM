import * as React from "react";
import Button from "../UI/button";


export default function RespondModal({
    open,
    onClose,
    onSend,
}: {
    open: boolean;
    onClose: () => void;
    onSend: (message: string) => void;
}) {
    const [msg, setMsg] = React.useState("");
    React.useEffect(() => {
        if (open) setMsg("");
    }, [open]);


    if (!open) return null;


    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-[#121214] border border-white/10 p-4 sm:p-5">
                <div className="text-white font-semibold text-lg">Respond to Review</div>
                <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Write your response..."
                    className="mt-3 w-full h-36 rounded-xl bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <div className="mt-4 flex items-center justify-end gap-2">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSend(msg)} disabled={!msg.trim()}>Send</Button>
                </div>
            </div>
        </div>
    );
}