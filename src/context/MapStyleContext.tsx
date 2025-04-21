import React, { useContext } from "react";
import { createContext, useState } from "react";
import { MapStyleContextType, Props } from "../types/globals";

export const MapStyleContext = createContext<MapStyleContextType | undefined>(undefined);

const API_KEY = process.env.REACT_APP_API_KEY;

export const MapStyleProvider = ({children}: Props) => {
  const [currentStyle, setCurrentStyle] = useState(`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`);
  const setStyle = (styleName: string) => {
    setCurrentStyle(`https://api.maptiler.com/maps/${styleName}/style.json?key=${API_KEY}`);
  }
  return (
    <MapStyleContext.Provider 
      value={{ currentStyle, setStyle }}
    >
      {children}
    </MapStyleContext.Provider>
  )
}

export const useMapStyle = (): MapStyleContextType => {
  const context = useContext(MapStyleContext);
  if (!context) {
    throw new Error("useMapStyle must be used within a MapStyleProvider");
  }
  return context;
};