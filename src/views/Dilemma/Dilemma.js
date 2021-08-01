import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import PageContent from '../../layout/PageContent/PageContent'
import { addVote, getDilemma } from '../../utils/api'
import styles from './Dilemma.module.css'

const CancelIcon = ({ className })=> (
  <svg className={className} viewBox="0 0 512 512">
		<path d="M436.994,74.943c-99.834-99.833-262.285-99.833-362.119,0c-99.834,99.834-99.834,262.275,0,362.109
			c49.917,49.917,115.493,74.881,181.059,74.881c65.566,0,131.142-24.964,181.059-74.881C485.359,388.692,512,324.393,512,255.997
			C512,187.603,485.359,123.302,436.994,74.943z M421.908,421.966c-91.52,91.513-240.426,91.524-331.946,0
			c-91.509-91.516-91.509-240.422,0-331.935c45.76-45.761,105.866-68.64,165.973-68.64c60.106,0,120.213,22.879,165.973,68.64
			c44.332,44.331,68.754,103.271,68.754,165.966C490.662,318.693,466.24,377.632,421.908,421.966z"/>
		<polygon points="271.024,255.996 376.648,150.375 361.561,135.289 255.937,240.908 150.318,135.289 135.232,150.375 
			240.851,255.994 142.775,354.065 157.862,369.153 255.937,271.081 361.686,376.83 376.773,361.743 		"/>
  </svg>
)

const ArrowIcon = ({ className })=> (
  <svg className={className} viewBox="0 0 50 50">
    <path d="M35.71,10.71a1,1,0,0,1-1.41,0L28,4.41V17.69A8.94,8.94,0,0,1,25.36,24l-7.31,7.31A7,7,0,0,0,16,36.31V48a1,1,0,0,1-2,0V36.31A8.94,8.94,0,0,1,16.64,30l7.31-7.31A7,7,0,0,0,26,17.69V4.41l-6.29,6.29a1,1,0,0,1-1.41-1.41l8-8a1,1,0,0,1,1.41,0l8,8A1,1,0,0,1,35.71,10.71Z"></path>
  </svg>
)

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
      <div className={styles.main}>
        <Button 
          className={styles.button}
          type={buttonState}
          onMouseEnter={()=> setButtonState('pressed')}
          onMouseLeave={()=> setButtonState('opened')}
          onClick={clickHandler('YES')}
        />
        <div className={styles.choice}>
          <p className={styles.positive}>{data && data.positive}</p>
          <p className={styles.separator}>pero</p>
          <p className={styles.negative}>{data && data.negative}</p>
        </div>
        <div className={styles.avoid}>
          No me interesa
          <ArrowIcon className={styles.arrow} />
          <button
            className={styles.cancelButton}
            onMouseEnter={()=> setButtonState('closed')}
            onMouseLeave={()=> setButtonState('opened')}
            onClick={clickHandler('NO')}
          >
            <CancelIcon className={styles.cancel} />
          </button>
        </div>
      </div>
    </PageContent>
  )
}

export default Dilemma