import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export type MapStyleContextType = {
  currentStyle: string;
  setStyle: (styleName: string) => void;
};

export type CurrentPositionContextType = {
  handleClick: () => void;
  error: string | null;
  position: GeolocationPosition | null;
};

export type ErrorProps = {
  message: string;
};