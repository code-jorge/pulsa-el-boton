import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'
import Button from '../../components/Button/Button'
import PageContent from '../../layout/PageContent/PageContent'
import { getLatestDilemma } from '../../utils/api'
import styles from './Home.module.css'

const Home = ()=> {

  const { isLoading, isError, data } = useQuery('dilemmas-latest', getLatestDilemma)
  const history = useHistory()
  const [buttonState, setButtonState] = useState('closed')

  return (
    <PageContent loading={[isLoading]} errors={[isError]}>
      <p>Pulsa el botón para empezar</p>
      <Button 
        className={styles.button}
        type={buttonState}
        onMouseEnter={()=> setButtonState('opened')}
        onMouseLeave={()=> setButtonState('closed')}
        onMouseDown={()=> setButtonState('pressed')}
        onMouseUp={()=> setButtonState('opened')}
        onClick={()=> history.push(`/dilema/${data.slug}`)}
      />
    </PageContent>
  )
}

export default Home