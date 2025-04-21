import React, { FC, ReactNode } from 'react';

type ComponentWithChildren = FC<{ children: ReactNode }>;

export const combineComponents = (...components: ComponentWithChildren[]): ComponentWithChildren => {
  return components.reduce((AccumulatedComponents, CurrentComponent) => {
    return ({ children }) => (
      <AccumulatedComponents>
        <CurrentComponent>{children}</CurrentComponent>
      </AccumulatedComponents>
    );
  }, ({ children }) => <>{children}</>);
};