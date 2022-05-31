/// <reference types="react" />
import './index.scss';
export default function ColorPicker({ name, defaultColor, onColor, }: {
    name: string;
    defaultColor: string;
    onColor: (color: string, valid: boolean) => void;
}): JSX.Element;
