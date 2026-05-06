import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import PageContent from '../../layout/PageContent/PageContent'
import { getLatestDilemma } from '../../utils/api'
import styles from './Home.module.css'

const Home = () => {

  const navigate = useNavigate()
  const { isLoading, isError, data } = useQuery({
    queryKey: ['dilemmas-latest'],
    queryFn: getLatestDilemma,
  })
  const [buttonState, setButtonState] = useState('closed')

  return (
    <PageContent loading={[isLoading]} errors={[isError]}>
      <div className={styles.main}>
        {data ? (
          <>
            <p className={styles.title}>Pulsa el botón para empezar</p>
            <Button
              className={styles.button}
              type={buttonState}
              onMouseEnter={() => setButtonState('opened')}
              onMouseLeave={() => setButtonState('closed')}
              onMouseDown={() => setButtonState('pressed')}
              onMouseUp={() => setButtonState('opened')}
              onClick={() => navigate(`/dilema/${data.slug}`)}
            />
          </>
        ) : (
          <p className={styles.title}>Todavía no hay dilemas, ¡vuelve pronto!</p>
        )}
      </div>
    </PageContent>
  )
}

export default Home
