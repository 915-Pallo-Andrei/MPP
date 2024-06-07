import {createContext} from 'react';
import {
    DevicesContextType,
    ProviderType,
} from '../types/DevicesContextTypes.types';

export const DevicesContext = createContext<DevicesContextType | null>(null);

function DevicesContextProvider({deviceContext, children}: ProviderType) {
    return (
        <DevicesContext.Provider value={deviceContext}>
            {children}
        </DevicesContext.Provider>
    );
}

export {DevicesContextProvider};
