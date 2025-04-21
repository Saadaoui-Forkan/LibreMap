import React from 'react'
import currentPositionIcon from '../assets/icons/my-position.png'
import { Error } from './Error'
import { useCurrentPosition } from '../context/CurrentPositionContext';

export const MyCurrentPosition = () => {
  const {handleClick, error} = useCurrentPosition();
  return (
    <div className='current-position'>
      <button onClick={handleClick}>
        <img src={currentPositionIcon} alt="current position" />
      </button>
      {error && <Error message={error} />}
    </div>
  )
}
