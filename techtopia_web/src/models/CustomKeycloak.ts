export type GetKeyCloakToken = {
    content_type: string;
    authorization: string;
    accept: string;
};


export function getKeycloakToken(token :string|undefined) {
    return {
        content_type: "application/json",
        authorization: `Bearer ${token}`,
        accept: "application/json",
    };
}