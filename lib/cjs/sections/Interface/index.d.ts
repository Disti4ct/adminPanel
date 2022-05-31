/// <reference types="react" />
import './index.scss';
import { AllSettings, MultiTypeSettings, InterfaceOptions } from './types';
export default function Interface({ onChange, onSave, disabled, settings, defaultValues, }: {
    onChange?: (newSettings: MultiTypeSettings) => void;
    onSave?: (currentSettings: MultiTypeSettings) => void;
    disabled?: boolean;
    settings?: InterfaceOptions;
    defaultValues?: AllSettings;
}): JSX.Element;
