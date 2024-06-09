import { ReactElement } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import SettingsContext from '../contexts/SettingsContext'

interface WithChildren {
    children: ReactElement | ReactElement[]
}

export default function SettingsContextProvider({ children }: WithChildren) {
    const [showNames, setShowNames] = useLocalStorage('show-names', true)

    const toggleShowNames = () => setShowNames(!showNames)

    return (
        <SettingsContext.Provider value={{ showNames: showNames ?? true, toggleShowNames }}>
            {children}
        </SettingsContext.Provider>
    )
}
