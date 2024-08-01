import Keycloak from 'keycloak-js'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { isExpired } from 'react-jwt'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../../services/Auth'
import { AddGuest } from '../../services/ticket/TicketService'
import SecurityContext from '../contexts/SecurityContexts'
interface IWithChildren {
    children: ReactNode
}


const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID
}
const keycloak: Keycloak = new Keycloak(keycloakConfig);

console.log(keycloak.authenticated)

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
            foundRole = role
        }
    }
    )
    return foundRole as string | undefined;
}

function getToken(){
    let token = ''
    if(keycloak?.token !== undefined){
        const tokenFound = keycloak?.token
        token =  ''+tokenFound;
    }
    return token as string | undefined
}


export default function SecurityContextProvider({ children }: Readonly<IWithChildren>) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const roles = getRole()
    const token = getToken()

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token);
        else return false;
    }

    const value = useMemo(() => ({
        isAuthenticated: isAuthenticated,
        loggedInUser,
        logout,
        roles,
        token,
    }), [loggedInUser, roles, token]);


    useEffect(() => {
        if (keycloak.authenticated === undefined) {
            keycloak.init({
                onLoad: 'login-required'
                , checkLoginIframe: true
                , flow: 'standard'
                , pkceMethod: 'S256'
            });
        }
    }, [token])



    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.name)
        AddGuest(token);
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
