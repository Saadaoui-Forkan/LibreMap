import React from 'react';
import { Map } from './components/Map';
import { Styles } from './components/Styles';
import { MyCurrentPosition } from './components/MyCurrentPosition';

function App() {
  return (
    <div>
      <Map/>
      <Styles/>
      <MyCurrentPosition/>
    </div>
  );
}

export default App;