/// <reference types="react" />
import './index.scss';
export default function Lock({ children, enabled, reason, }: {
    children: JSX.Element | JSX.Element[] | string;
    enabled?: boolean;
    reason?: string;
}): JSX.Element;
