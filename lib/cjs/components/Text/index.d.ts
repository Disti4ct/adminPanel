/// <reference types="react" />
export declare enum TextType {
    notice = "text.secondary",
    warning = "warning.main",
    positive = "success.main",
    error = "error.main"
}
export default function Text({ children, textType, }: {
    children: JSX.Element | JSX.Element[] | string | null;
    textType?: TextType;
}): JSX.Element;
