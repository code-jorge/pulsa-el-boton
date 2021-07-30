import React from 'react'
import styles from './Button.module.css'
import buttonClosed from './assets/button--closed.svg'
import buttonOpened from './assets/button--opened.svg'
import buttonPressed from './assets/button--pressed.svg'

const noop = ()=> {}

const getSource = state=> {
  if (state === 'closed') return buttonClosed
  if (state === 'opened') return buttonOpened
  if (state === 'pressed') return buttonPressed
}

const Button = ({ 
  state='closed', 
  onClick=noop,
  onMouseEnter=noop,
  onMouseLeave=noop,
  onMouseDown=noop,
  onMouseUp=noop

})=> (
  <div 
    className={styles.main} 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}    
  >
    <img 
      className={styles.button}
      src={getSource(state)} 
      alt='The button to press'
    />
  </div>
)

export default Button