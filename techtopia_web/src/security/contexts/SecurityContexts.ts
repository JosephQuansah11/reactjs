import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    loggedInUser: string | undefined
    logout: () => void
    roles: string | undefined
    token: string | undefined
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    logout: () => {},
    roles: undefined,
    token: undefined
})
