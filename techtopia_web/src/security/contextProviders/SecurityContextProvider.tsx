import Keycloak from 'keycloak-js'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { isExpired } from 'react-jwt'
import SecurityContext from '../contexts/SecurityContexts'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../../services/Auth'

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID
}
const keycloak: Keycloak = new Keycloak(keycloakConfig);


function logout() {
    const logoutOptions = { redirectUri: import.meta.env.VITE_REACT_APP_URL }
    keycloak.logout(logoutOptions)
}

function getRole() {
    let foundRole = ''
    const roles = keycloak.realmAccess?.roles
    roles?.map(role => {
        keycloak.hasRealmRole(role)
        keycloak.hasResourceRole(role, import.meta.env.VITE_KC_CLIENT_ID)
        if(role === "admin"|| role === "visitor"){
            foundRole =role
        }
    }
    )
    return foundRole as string;
}


export default function SecurityContextProvider({ children }: Readonly<IWithChildren>) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const roles = getRole()

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token);
        else return false;
    }

    const value = useMemo(() => ({
        isAuthenticated: isAuthenticated,
        loggedInUser,
        logout,
        roles,
    }), [loggedInUser, roles]);


    useEffect(() => {
        if (keycloak.authenticated === undefined) {
            keycloak.init({
                onLoad: 'login-required'
                , checkLoginIframe: true
                , flow: 'standard'
                , pkceMethod: 'S256'
            });
        }
    }, [])



    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.name)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.name)
        })
    }


    return (
        <SecurityContext.Provider value={value}>
            {children}
        </SecurityContext.Provider>
    )
}
