import { Pencil } from "lucide-react";
import { useRef } from "react";
import { useEventService } from "../services/event.services";

export default function UploadButton() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { uploadFlyer } = useEventService();

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        uploadFlyer(file);

    };

    return (
        <>
            <button
                className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
                onClick={openFileDialog}
            >
                <Pencil className="w-5 h-5 text-white" />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onFileChange}
            />
        </>
    );
}
