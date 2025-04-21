import { Alert } from 'antd'
import React from 'react'
import { ErrorProps } from '../types/globals'

export const Error = ({message}: ErrorProps) => {
  return (
    <div className='error'>
      <Alert message={message} type="error" showIcon />
    </div>
  )
}
