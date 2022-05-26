import { useState, useEffect } from 'react'
import './index.scss'
import validUrl from 'valid-url'
import Typography from '@mui/material/Typography'
import Lock from '../../components/Lock'
import Option from '../../components/Option'
import Input from '../../components/Input'
import Toggle from '../../components/Toggle'
import ColorPicker from '../../components/ColorPicker'
import List from '../../components/List'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Accordion from '../../components/Accordion'
import {
  AllSettings,
  InterfaceOption,
  BaseLinkItem,
  NavigationLinkItem,
  MultiTypeSettings,
  InterfaceOptions,
} from './types'
import { isObject } from '../../utils'

const enabledSettings = (options: InterfaceOptions) => {
  const commonOptions = options[InterfaceOption.common]
  const fullCommonOptions = commonOptions === true
  const colorsOptions = options[InterfaceOption.colors]
  const fullColorsOptions = colorsOptions === true
  const linksOptions = options[InterfaceOption.links]
  const fullLinksOptions = linksOptions === true

  const displayLightBackground =
    fullColorsOptions ||
    colorsOptions?.['light'] === true ||
    colorsOptions?.['light']?.['background']

  const displayDarkBackground =
    fullColorsOptions ||
    colorsOptions?.['dark'] === true ||
    colorsOptions?.['dark']?.['background']

  const displayLightColor =
    fullColorsOptions ||
    colorsOptions?.['light'] === true ||
    colorsOptions?.['light']?.['color']

  const displayDarkColor =
    fullColorsOptions ||
    colorsOptions?.['dark'] === true ||
    colorsOptions?.['dark']?.['color']

  const displayNavLinks = fullLinksOptions || linksOptions?.['navigation']
  const displaySocialLinks = fullLinksOptions || linksOptions?.['social']
  const displayMenuLinks = fullLinksOptions || linksOptions?.['menu']

  return {
    commonOptions,
    fullCommonOptions,
    colorsOptions,
    fullColorsOptions,
    linksOptions,
    fullLinksOptions,
    displayLightBackground,
    displayDarkBackground,
    displayLightColor,
    displayDarkColor,
    displayNavLinks,
    displaySocialLinks,
    displayMenuLinks,
  }
}

export default function Interface({
  onChange,
  onSave,
  disabled,
  settings = {
    [InterfaceOption.common]: true,
    [InterfaceOption.colors]: {
      light: {
        color: false,
        background: false,
      },
      dark: {
        color: false,
        background: false,
      },
    },
    [InterfaceOption.links]: {
      navigation: false,
      social: false,
      menu: false,
    },
    [InterfaceOption.saveButton]: false,
  },
  defaultValues = {
    projectName: '',
    logoUrl: '',
    backgroundUrl: '',
    disableSourceCopyright: false,
    primaryColor: '',
    backgroundColorLight: '',
    backgroundColorDark: '',
    textColorLight: '',
    textColorDark: '',
    navigationLinks: [],
    socialLinks: [],
    menuLinks: [],
  },
}: {
  onChange?: (newSettings: MultiTypeSettings) => void
  onSave?: (currentSettings: MultiTypeSettings) => void
  disabled?: boolean
  settings?: InterfaceOptions
  defaultValues?: AllSettings
}) {
  const [projectName, setProjectName] = useState(
    defaultValues?.projectName || ''
  )
  const [logoUrl, setLogoUrl] = useState(defaultValues?.logoUrl || '')
  const [backgroundUrl, setBackgroundUrl] = useState(
    defaultValues?.backgroundUrl || ''
  )
  const [disableSourceCopyright, setDisableSourceCopyright] = useState(
    defaultValues?.disableSourceCopyright || false
  )

  const toggleDisableSourceCopyright = () =>
    setDisableSourceCopyright((prevValue) => !prevValue)

  const [primaryColor, setPrimaryColor] = useState(
    defaultValues?.primaryColor || ''
  )
  const [backgroundColorLight, setBackroundColorLight] = useState(
    defaultValues?.backgroundColorLight || ''
  )
  const [backgroundColorDark, setBackroundColorDark] = useState(
    defaultValues?.backgroundColorDark || ''
  )
  const [textColorLight, setTextColorLight] = useState(
    defaultValues?.textColorLight || ''
  )
  const [textColorDark, setTextColorDark] = useState(
    defaultValues?.textColorDark || ''
  )

  const [navigationLinks, setNavigationLinks] = useState<NavigationLinkItem[]>(
    defaultValues?.navigationLinks || []
  )
  const [socialLinks, setSocialLinks] = useState<BaseLinkItem[]>(
    defaultValues?.socialLinks || []
  )
  const [menuLinks, setMenuLinks] = useState<BaseLinkItem[]>(
    defaultValues?.menuLinks || []
  )

  const {
    fullCommonOptions,
    colorsOptions,
    fullColorsOptions,
    linksOptions,
    fullLinksOptions,
    displayLightBackground,
    displayDarkBackground,
    displayLightColor,
    displayDarkColor,
    displayNavLinks,
    displaySocialLinks,
    displayMenuLinks,
  } = enabledSettings(settings)

  const returnCurrentState = () => {
    let state = {}

    if (fullCommonOptions) {
      state = {
        ...state,
        projectName,
        logoUrl,
        backgroundUrl,
        disableSourceCopyright,
      }
    }

    if (fullColorsOptions || isObject(colorsOptions)) {
      state = { ...state, primaryColor }

      if (displayLightBackground)
        state['backgroundColorLight'] = backgroundColorLight
      if (displayDarkBackground)
        state['backgroundColorDark'] = backgroundColorDark
      if (displayLightColor) state['textColorLight'] = textColorLight
      if (displayDarkColor) state['textColorDark'] = textColorDark
    }

    if (displayNavLinks) state['navigationLinks'] = navigationLinks
    if (displaySocialLinks) state['socialLinks'] = socialLinks
    if (displayMenuLinks) state['menuLinks'] = menuLinks

    return state
  }

  const [currentSettings, setCurrentSettings] = useState(returnCurrentState())

  // return current settings for the first render
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(currentSettings)
    }
  }, [])

  useEffect(() => {
    const currentState = returnCurrentState()

    setCurrentSettings((prevState) => ({
      ...prevState,
      ...currentState,
    }))

    if (typeof onChange === 'function') {
      onChange(currentState)
    }
  }, [
    projectName,
    logoUrl,
    backgroundUrl,
    disableSourceCopyright,
    primaryColor,
    backgroundColorLight,
    backgroundColorDark,
    textColorLight,
    textColorDark,
    navigationLinks,
    socialLinks,
  ])

  const [displayConfirmation, setDisplayConfirmation] = useState(false)

  const onSaveSettings = () => {
    if (typeof onSave === 'function') {
      onSave(returnCurrentState())
    }
  }

  return (
    <Lock enabled={disabled}>
      {fullCommonOptions ? (
        <Accordion name="Common" expanded>
          <Option>
            <Input
              label="Project name"
              value={projectName}
              onChange={setProjectName}
            />
          </Option>
          <Option>
            <Input label="Logo url" value={logoUrl} onChange={setLogoUrl} />
          </Option>
          <Option>
            <Input
              label="Background url"
              value={backgroundUrl}
              onChange={setBackgroundUrl}
            />
          </Option>
          <Option>
            <Toggle
              name="Disable source copyright"
              value={disableSourceCopyright}
              onChange={toggleDisableSourceCopyright}
              fullWidth
            />
          </Option>
        </Accordion>
      ) : (
        <></>
      )}

      {fullColorsOptions || isObject(colorsOptions) ? (
        <Accordion name="Colors">
          <Option>
            <ColorPicker
              name="Primary color"
              defaultColor={primaryColor}
              onColor={(color) => {
                setPrimaryColor(color)
              }}
            />
          </Option>

          {displayLightBackground ? (
            <Option>
              <ColorPicker
                name="Background light"
                defaultColor={backgroundColorLight}
                onColor={(color) => {
                  setBackroundColorLight(color)
                }}
              />
            </Option>
          ) : (
            <></>
          )}

          {displayDarkBackground ? (
            <Option>
              <ColorPicker
                name="Background dark"
                defaultColor={backgroundColorDark}
                onColor={(color) => {
                  setBackroundColorDark(color)
                }}
              />
            </Option>
          ) : (
            <></>
          )}

          {displayLightColor ? (
            <Option>
              <ColorPicker
                name="Color light"
                defaultColor={textColorLight}
                onColor={(color) => {
                  setTextColorLight(color)
                }}
              />
            </Option>
          ) : (
            <></>
          )}

          {displayDarkColor ? (
            <Option>
              <ColorPicker
                name="Color dark"
                defaultColor={textColorDark}
                onColor={(color) => {
                  setTextColorDark(color)
                }}
              />
            </Option>
          ) : (
            <></>
          )}
        </Accordion>
      ) : (
        <></>
      )}

      {fullLinksOptions || isObject(linksOptions) ? (
        <Accordion name="Links">
          {displayNavLinks ? (
            <Option>
              <List
                title="Navigation links"
                onChange={(newItems) => setNavigationLinks(newItems)}
                isValidItem={(address) => Boolean(validUrl.isUri(address))}
                defaultItems={navigationLinks}
                placeholder="https://example.com"
                withName
              />
            </Option>
          ) : (
            <></>
          )}

          {displaySocialLinks ? (
            <Option>
              <List
                title="Social links"
                onChange={(newItems) => setSocialLinks(newItems)}
                isValidItem={(address) => Boolean(validUrl.isUri(address))}
                defaultItems={socialLinks}
                placeholder="https://example.com"
              />
            </Option>
          ) : (
            <></>
          )}

          {displayMenuLinks ? (
            <Option>
              <List
                title="Menu links"
                onChange={(newItems) => setMenuLinks(newItems)}
                isValidItem={(address) => Boolean(validUrl.isUri(address))}
                defaultItems={menuLinks}
                placeholder="https://example.com"
                withName
              />
            </Option>
          ) : (
            <></>
          )}
        </Accordion>
      ) : (
        <></>
      )}

      {settings[InterfaceOption.saveButton] ? (
        <Option>
          <Button onClick={() => setDisplayConfirmation(true)} fullWidth>
            Save settings
          </Button>
        </Option>
      ) : (
        <></>
      )}

      <Modal
        open={displayConfirmation}
        onClose={() => setDisplayConfirmation(false)}
      >
        <Typography variant="h5" gutterBottom component="div">
          Save changes?
        </Typography>
        <Button onClick={onSaveSettings} fullWidth>
          Save
        </Button>
      </Modal>
    </Lock>
  )
}
