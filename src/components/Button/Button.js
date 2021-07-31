import React from 'react'
import styles from './Button.module.css'
import buttonClosed from './assets/button--closed.svg'
import buttonOpened from './assets/button--opened.svg'
import buttonPressed from './assets/button--pressed.svg'
import buttonElement from './assets/button--element.svg'

const noop = ()=> {}

const getSource = type=> {
  if (type === 'closed') return buttonClosed
  if (type === 'opened') return buttonOpened
  if (type === 'pressed') return buttonPressed
  if (type === 'element') return buttonElement
}

const Button = ({ 
  className,
  type='closed', 
  onClick=noop,
  onMouseEnter=noop,
  onMouseLeave=noop,
  onMouseDown=noop,
  onMouseUp=noop

})=> (
  <div 
    className={`${styles.main} ${className || ''}`} 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}    
  >
    <img 
      className={styles.button}
      src={getSource(type)} 
      alt='The button to press'
    />
  </div>
)

export default Button