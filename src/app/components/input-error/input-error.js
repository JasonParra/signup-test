import React from 'react'
import Styles from './input-error.module.css'

const InputError = (props) => {
  return (
    <div className={`${Styles.container} ${props.className}`}>
      <div className={Styles.text}>
        {props.children || props.text}
      </div>
    </div>
  )
}

export default InputError
