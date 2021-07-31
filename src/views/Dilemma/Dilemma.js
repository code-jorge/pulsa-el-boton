import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import PageContent from '../../layout/PageContent/PageContent'
import { addVote, getDilemma } from '../../utils/api'
import styles from './Dilemma'

const Dilemma = ()=> {

  const { slug } = useParams()
  const history = useHistory()
 
  const { isLoading, isError, data } = useQuery([ 'dilemma', slug ], ()=> getDilemma(slug))
 
  const [buttonState, setButtonState] = useState('opened')

  const submitVote = useMutation(choice=> addVote({ choice, dilemma: data._id }))

  const clickHandler = choice=> ()=> {
    submitVote.mutate(choice, {
      onSuccess: ()=> history.push(`/estadisticas/${slug}`)
    })
  }

  return (
    <PageContent 
      loading={[isLoading, submitVote.isLoading]} 
      errors={[isError, submitVote.isError]}
    >
      <p>{data.positive}</p>
      <p>pero</p>
      <p>{data.negative}</p>
      <Button 
        className={styles.button}
        type={buttonState}
        onMouseEnter={()=> setButtonState('pressed')}
        onMouseLeave={()=> setButtonState('opened')}
        onClick={clickHandler('YES')}
      />
      <button
        onMouseEnter={()=> setButtonState('closed')}
        onMouseLeave={()=> setButtonState('opened')}
        onClick={clickHandler('NO')}
      >
        No me interesa
      </button>
    </PageContent>
  )
}

export default Dilemma