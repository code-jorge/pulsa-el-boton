import React, { useRef } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import EndOfContent from '../../components/EndOfContent/EndOfContent'
import { Link } from 'react-router-dom'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import PageContent from '../../layout/PageContent/PageContent'
import { getDilemmasList, getTotalDilemmas } from '../../utils/api'
import { PAGE_SIZE } from '../../utils/constants'
import { processDilemmaPages } from '../../utils/dilemmas'
import buttonImage from '../../components/Button/assets/button--closed.svg'
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
            <Link to={`/dilema/${dilemma.slug}`} key={dilemma._id}>
              <div className={style.dilemma}>
                <img className={style.image} src={buttonImage} alt={dilemma.title} />
                <p className={style.title}>{dilemma.title}</p>
              </div>
            </Link>
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