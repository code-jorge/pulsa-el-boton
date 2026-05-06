import React, { useState } from 'react';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';
import styles from './EndOfContent.module.css';

const EndOfContent = ({
  isError, isEnd, isLoading, onClick,
}) => {

  const [buttonState, setButtonState] = useState('opened')

  if (isError) {
    return (
      <p className={styles.message}>
        ¡Ha habido un error al recuperar los dilemas!
        <button 
          type='button' 
          className={styles.retry} 
          onClick={onClick}
        >
          Reintentar
        </button>
      </p>
    );
  }
  if (isLoading) return <Loading />;
  if (isEnd) {
    return (
      <p className={styles.message}>¡Ya está! Estos son todos de momento</p>
    );
  }
  return (
    <Button
      className={styles.button}
      onClick={onClick} 
      type={buttonState}
      onMouseEnter={()=> setButtonState('pressed')}
      onMouseLeave={()=> setButtonState('opened')}
    />
  )
};

export default EndOfContent;
