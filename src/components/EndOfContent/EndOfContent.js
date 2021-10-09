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
      <p>Ha habido un error con al recuperar los dilemas!</p>
    );
  }
  if (isLoading) return <Loading />;
  if (isEnd) {
    return (
      <p>Todavía no hay más dilemas!</p>
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
