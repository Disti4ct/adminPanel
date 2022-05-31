/// <reference types="react" />
import './index.scss';
export default function Toggle({ value, onChange, name, fullWidth, }: {
    value: boolean;
    onChange: () => void;
    name?: string;
    fullWidth?: boolean;
}): JSX.Element;
