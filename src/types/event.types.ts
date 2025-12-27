export type Event = {
    id?: string;
    name?: string;
    phone_number?: string;
    date_time?: string | null;
    location?: string;
    cost_per_person?: number;
    description?: string;
    capacity?: number | null;
    photo_gallery?: LinkItem[];
    links?: LinkItem[];
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
    modules?: EventModule[],
    quicklinks?: QuickLink[];
}

export interface BaseItem {
    id: string;
}
export interface LinkItem extends BaseItem {
    value: string;
}


export type EventModuleType =
    | 'capacity'
    | 'photoGallery'
    | 'links'
    | 'privacy'
    | 'schedule';

export interface CapacityData {
    max: number;
}

export interface LinksData {
    urls: string[];
}

export interface PrivacyData {
    isPrivate: boolean;
}

export type EventModule =
    | { type: 'capacity'; data?: CapacityData }
    | { type: 'photoGallery'; data?: never }
    | { type: 'links'; data?: LinksData }
    | { type: 'privacy'; data?: PrivacyData }
    | { type: 'schedule'; data?: never };

export type QuickLink = {
    label: string;
    type: EventModuleType;
}