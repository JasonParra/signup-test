import React from 'react'
import Styles from './custom-input.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomInput = (props) => {
  const { value, name, onChange, type, placeholder, icon, className, error } = props

  return (
    <div className={`${Styles.container} ${className}`} >
      <FontAwesomeIcon
        icon={icon}
        className={Styles.icon}
        style={{
          position: 'sticky',
        }} />
      <input
        className={Styles.input}
        style={{
          backgroundColor: error ? '#f8d9d8' : '',
          // padding: '10px 10px'
        }}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

export default CustomInput
