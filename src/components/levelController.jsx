import { createContext, useContext, useState } from "react";

const LevelContext = createContext();

export const LevelProvider = ({ children }) => 
{
    const [currentLevel, setCurrentLevel] = useState(0);
    return (
        <LevelContext.Provider value={ [currentLevel, setCurrentLevel] }>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevel = () => 
{
    const context = useContext(LevelContext);
    if (!context) 
    {
        throw new Error("useLevel must be used within a LevelProvider");
    }
    return context; // Returns [currentLevel, setCurrentLevel]
};