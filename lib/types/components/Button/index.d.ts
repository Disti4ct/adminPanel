/// <reference types="react" />
import './index.scss';
export default function Button({ children, onClick, disabled, fullWidth, }: {
    children: JSX.Element | JSX.Element[] | string | null;
    onClick: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
}): JSX.Element;
