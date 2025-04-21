import React, { createContext, useContext, useState } from "react";
import { CurrentPositionContextType, Props } from "../types/globals";

export const CurrentPositionContext = createContext<CurrentPositionContextType | undefined>(undefined);

export const CurrentPositionProvider = ({children}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  const handleClick = () => {
    if (!navigator.geolocation) {
      setError("Your Position is not supported in this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
      },
      (err) => {
        setError(err.message);
        console.error("Geolocation error:", err);
      }
    );
  }
    return (
        <CurrentPositionContext.Provider value={{handleClick, error, position}}>
            {children}
        </CurrentPositionContext.Provider>
    )
}

export const useCurrentPosition = () => {
  const context = useContext(CurrentPositionContext);
  if (!context) {
    throw new Error("useCurrentPosition must be used within a CurrentPositionProvider");
  }
  return context;
};