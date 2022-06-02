/// <reference types="react" />
export interface Tab {
    title: string;
    id: number;
}
export default function Tabs({ tabs, onChange, }: {
    tabs: Tab[];
    onChange: (tab: Tab) => void;
}): JSX.Element;
