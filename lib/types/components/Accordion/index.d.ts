/// <reference types="react" />
export default function Accordion({ name, children, expanded: expandedDefault, }: {
    name?: string;
    children: JSX.Element | JSX.Element[] | null;
    expanded?: boolean;
}): JSX.Element;
