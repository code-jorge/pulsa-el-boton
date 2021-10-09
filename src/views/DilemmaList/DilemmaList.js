import React, { useRef } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import EndOfContent from '../../components/EndOfContent/EndOfContent'
import { Link } from 'react-router-dom'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import PageContent from '../../layout/PageContent/PageContent'
import { getDilemmasList, getTotalDilemmas } from '../../utils/api'
import { PAGE_SIZE } from '../../utils/constants'
import { processDilemmaPages } from '../../utils/dilemmas'
import style from './DilemmaList.module.css'

const DilemmaList = ()=> {

  const loadNextRef = useRef();
  const { isLoading, isError, data: total=0 } = useQuery('dilemmas-total', getTotalDilemmas)

  const {
    data: dilemmaPages = { pages: [] },
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ['dilemmas'],
    ({ pageParam={} })=> {
      const { page=1 } = pageParam
      return getDilemmasList(page).then(({ dilemmas })=> dilemmas)
    },
    {
      getNextPageParam: (lastPage, pages)=> {
        if (lastPage.length < PAGE_SIZE) return undefined
        return { page: pages.length + 1 }
      }
    }
  )

  useIntersectionObserver({
    target: loadNextRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const dilemmas = processDilemmaPages(dilemmaPages)

  return (
    <PageContent loading={[isLoading]} errors={[isError]}>
      <div className={style.main}>
        <p>Total dilemas: {total}</p>
        <div className={style.dilemmas}>
          {dilemmas.map(dilemma=> (
            <div className={style.dilemma} key={dilemma._id}>
              <Link to={`/dilema/${dilemma.slug}`}>
                {dilemma.title}
              </Link>
            </div>
          ))}
        </div>
        <div className={style.end} ref={loadNextRef}>
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