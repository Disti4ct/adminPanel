/// <reference types="react" />
export default function Modal({ children, open, onClose, }: {
    children: JSX.Element | JSX.Element[] | string | null;
    open?: boolean;
    onClose?: () => void;
}): JSX.Element;
