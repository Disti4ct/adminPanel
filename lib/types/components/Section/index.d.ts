/// <reference types="react" />
import './index.scss';
export default function Section({ children, name, openByDefault, }: {
    children: JSX.Element | JSX.Element[] | string | null;
    name?: string;
    openByDefault?: boolean;
}): JSX.Element;
