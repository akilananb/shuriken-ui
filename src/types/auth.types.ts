export interface AuthContextType{
    commonName: string;
    mail: string;
    token: string;
    env: string;
    roles: string[] | null;
}