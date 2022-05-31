export enum InterfaceOption {
  common = 'common',
  colors = 'colors',
  links = 'links',
  saveButton = 'saveButton',
}

export type CommonSettings = {
  projectName?: string
  logoUrl?: string
  backgroundUrl?: string
  disableSourceCopyright?: boolean
}

export type ColorSettings = {
  primaryColor?: string
  backgroundColorLight?: string
  backgroundColorDark?: string
  textColorLight?: string
  textColorDark?: string
}

export type BaseLinkItem = {
  value: string
}

export type NavigationLinkItem = {
  name?: string
} & BaseLinkItem

export type LinkSettings = {
  navigationLinks?: NavigationLinkItem[]
  socialLinks?: BaseLinkItem[]
  menuLinks?: BaseLinkItem[]
}

export type AllSettings = CommonSettings & ColorSettings & LinkSettings

export type MultiTypeSettings =
  | {}
  | AllSettings
  | CommonSettings
  | ColorSettings
  | LinkSettings

type Color =
  | boolean
  | {
      color?: boolean
      background?: boolean
    }

export type InterfaceOptions = {
  [InterfaceOption.common]?: boolean
  [InterfaceOption.colors]?:
    | boolean
    | {
        light?: Color
        dark?: Color
      }
  [InterfaceOption.links]?:
    | boolean
    | {
        navigation?: boolean
        social?: boolean
        menu?: boolean
      }
  [InterfaceOption.saveButton]?: boolean
}
