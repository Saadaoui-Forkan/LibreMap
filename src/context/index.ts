import { combineComponents } from './CombineComponents'
import { CurrentPositionProvider } from './CurrentPositionContext';
import { MapStyleProvider } from './MapStyleContext';

export const AppProviders = combineComponents(
  MapStyleProvider,
  CurrentPositionProvider
);