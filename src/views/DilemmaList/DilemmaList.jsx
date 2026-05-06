import { useRef } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import EndOfContent from '../../components/EndOfContent/EndOfContent'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import PageContent from '../../layout/PageContent/PageContent'
import { getDilemmasList, getTotalDilemmas } from '../../utils/api'
import { PAGE_SIZE } from '../../utils/constants'
import { processDilemmaPages } from '../../utils/dilemmas'
import styles from './DilemmaList.module.css'
import Button from '../../components/Button/Button'

const DilemmaList = () => {

  const loadNextRef = useRef()
  const { isLoading, isError, data: total = 0 } = useQuery({
    queryKey: ['dilemmas-total'],
    queryFn: getTotalDilemmas,
  })

  const {
    data: dilemmaPages = { pages: [] },
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['dilemmas'],
    queryFn: ({ pageParam }) =>
      getDilemmasList(pageParam).then(({ dilemmas }) => dilemmas),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return undefined
      return pages.length + 1
    },
  })

  useIntersectionObserver({
    target: loadNextRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  const dilemmas = processDilemmaPages(dilemmaPages)

  return (
    <PageContent loading={[isLoading]} errors={[isError]}>
      <div className={styles.main}>
        <p className={styles.title}>Hay {total} dilemas</p>
        <div className={styles.dilemmas}>
          {dilemmas.map(dilemma => (
            <Link className={styles.link} to={`/dilema/${dilemma.slug}`} key={dilemma.slug}>
              <div className={styles.dilemma}>
                <Button className={styles.image} type='element' />
                <p className={styles.dilemmaTitle}>{dilemma.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.end} ref={loadNextRef}>
          <EndOfContent
            isError={false}
            isLoading={isFetching || isFetchingNextPage}
            isEnd={!hasNextPage}
            onClick={fetchNextPage}
          />
        </div>
      </div>
    </PageContent>
  )

}

export default DilemmaList
