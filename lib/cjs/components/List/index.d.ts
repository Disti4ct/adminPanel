/// <reference types="react" />
import './index.scss';
interface FullItem {
    value: string;
    name?: string;
}
export default function List({ title, withName, defaultItems, onChange, isValidItem, placeholder, }: {
    title: string;
    withName?: boolean;
    defaultItems?: FullItem[];
    isValidItem?: (item: string) => boolean;
    onChange: (items: FullItem[]) => void;
    placeholder?: string;
}): JSX.Element;
export {};
