import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Styles from './custom-button.module.css'

const CustomButton = props => {
  const { onClick, positive, fluid, disabled, icon, text, children, success, className } = props

  return (
    <div className={`${className} ${Styles.container}`}>
      <button style={
        {
          backgroundColor: success ? '#4BB543' : positive ? '#246fe0' : '#fff',
          padding: '10px 10px',
          fontWeight: '400',
          fontFamily: "Arial, Helvetica, 'sans-serif'",
          fontSize: '14px',
          color: positive ? '#fff' : '#000',
          border: '1px solid rgba(0, 0, 0, .1)',
          borderRadius: '3px',
          width: fluid ? '100%' : 'auto',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? '0.5' : '1'
        }
      }
        onClick={disabled ? function () { }() : onClick}
      >
        {
          <div className={Styles.buttonContentIcon}>
            <FontAwesomeIcon icon={icon} className={Styles.icon} />
            <div>
              {text || children}
            </div>
            <div></div>
          </div>
        }
      </button>
    </div>
  )
}


export default CustomButton
