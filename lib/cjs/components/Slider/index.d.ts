/// <reference types="react" />
export default function Slider({ name, max, min, step, defaultValue, marks, }: {
    name: string;
    min: number;
    max: number;
    step?: number;
    defaultValue?: number;
    marks?: {
        value: number;
        label: string;
    }[];
}): JSX.Element;
