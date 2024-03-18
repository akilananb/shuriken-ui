import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType } from "@/types/auth.types";

interface SessionContextState {
  session: AuthContextType | null;
  setSession: React.Dispatch<React.SetStateAction<AuthContextType | null>>;
  isLoading: boolean;
}

const defaultSessionContextState: SessionContextState = {
  session: null,
  setSession: () => {},
  isLoading: true,
};

const SessionContext = createContext<SessionContextState>(defaultSessionContextState);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<AuthContextType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const validateSession = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/shuriken/api/auth/session');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const sessionData = await response.json();
                if (sessionData) {
                    setSession({...sessionData});
                } else {
                    setSession(null);
                }
            } catch (error) {
                console.error('Session validation failed:', error);
                setSession(null);
            } finally {
                setIsLoading(false);
            }
        };

        validateSession();
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
};

export { SessionContext };

export default SessionProvider;
