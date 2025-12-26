import { Pencil } from 'lucide-react';


interface InvitationCardProps {
    backgroundStyle: {
        type: 'gradient' | 'image' | 'color';
        value: string;
    };
    onChangeBackground: () => void;
    onChangeBackgroundImage: () => void;
    type: 'inviationCard' | 'background';
}

export default function InvitationCard({ backgroundStyle, onChangeBackground, onChangeBackgroundImage, type }: InvitationCardProps) {


    const getBackgroundClass = () => {
        console.log("InvitationCard backgroundStyle:", backgroundStyle);
        if (backgroundStyle.type === 'gradient') {
            return `bg-gradient-to-br ${backgroundStyle.value}`;
        } else if (backgroundStyle.type === 'image') {
            return `url(${backgroundStyle.value}) bg-cover bg-center`;
        } else if (backgroundStyle.type === 'color') {
            return backgroundStyle.value;
        }
        return 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400';
    };

    

    return (
        <div className="space-y-4">
            <div className={`relative w-full aspect-square rounded-2xl ${getBackgroundClass()} shadow-2xl overflow-hidden flex items-center justify-center`} >
                <div className="text-white font-bold text-6xl tracking-tighter leading-none text-center px-8">
                    <div>YOU'RE</div>
                    <div className="mt-2">INVITED</div>
                </div>

                <button
                    className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"

                >
                    <Pencil className="w-5 h-5 text-white" />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                    }}
                />
            </div>
            <button

                className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all text-white font-medium flex items-center justify-center gap-2"
            >
                <span className="text-2xl">🖼️</span>
                Change background
            </button>
        </div>
    );
}
