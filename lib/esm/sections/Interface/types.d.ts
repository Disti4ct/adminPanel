export declare enum InterfaceOption {
    common = "common",
    colors = "colors",
    links = "links",
    saveButton = "saveButton"
}
export declare type CommonSettings = {
    projectName?: string;
    logoUrl?: string;
    backgroundUrl?: string;
    disableSourceCopyright?: boolean;
};
export declare type ColorSettings = {
    primaryColor?: string;
    backgroundColorLight?: string;
    backgroundColorDark?: string;
    textColorLight?: string;
    textColorDark?: string;
};
export declare type BaseLinkItem = {
    value: string;
};
export declare type NavigationLinkItem = {
    name?: string;
} & BaseLinkItem;
export declare type LinkSettings = {
    navigationLinks?: NavigationLinkItem[];
    socialLinks?: BaseLinkItem[];
    menuLinks?: BaseLinkItem[];
};
export declare type AllSettings = CommonSettings & ColorSettings & LinkSettings;
export declare type MultiTypeSettings = {} | AllSettings | CommonSettings | ColorSettings | LinkSettings;
declare type Color = boolean | {
    color?: boolean;
    background?: boolean;
};
export declare type InterfaceOptions = {
    [InterfaceOption.common]?: boolean;
    [InterfaceOption.colors]?: boolean | {
        light?: Color;
        dark?: Color;
    };
    [InterfaceOption.links]?: boolean | {
        navigation?: boolean;
        social?: boolean;
        menu?: boolean;
    };
    [InterfaceOption.saveButton]?: boolean;
};
export {};
