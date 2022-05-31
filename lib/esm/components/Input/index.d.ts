/// <reference types="react" />
import './index.scss';
export default function Input({ label, value, onChange, placeholder, error, errorMessage, }: {
    value: string;
    onChange: (value: any) => void;
    label?: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
}): JSX.Element;
