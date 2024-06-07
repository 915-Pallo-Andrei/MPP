import { createContext } from "react";
import { BrandsContextType, BrandProviderType } from "../types/BrandContextTypes.types";

export const BrandsContext = createContext<BrandsContextType | null>(null);

function BrandContextProvider({brandContext, children}: BrandProviderType) {
    return (
        <BrandsContext.Provider value={brandContext}>
            {children}
        </BrandsContext.Provider>
    );
}

export {BrandContextProvider};