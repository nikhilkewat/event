export type Event = {
    id?: string;
    name?: string;
    phone_number?: string;
    date_time?: string | null;
    location?: string;
    cost_per_person?: number;
    description?: string;
    capacity?: number | null;
    photo_gallery?: string[];
    links?:string[];
    background_style?: {
        type: 'gradient' | 'image' | 'color';
        value: string;
    };
    is_published?: boolean;
    slug?: string;
    flyer_style?: {
        type: 'gradient' | 'image' | 'color';
        value: string;
    };
    modules?: []
}
