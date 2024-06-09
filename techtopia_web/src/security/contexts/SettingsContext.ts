import { createContext } from 'react'

export interface ISettingsContext {
    showNames: boolean
    toggleShowNames: () => void
}

export default createContext<ISettingsContext>({
    showNames: false,
    toggleShowNames: () => {},
})
