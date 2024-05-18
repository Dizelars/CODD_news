import { useState, useEffect } from "react"
import modifyContent from "../utils/modifyContent"
import Filter from "./Filter"
import dayjs from "dayjs"

const Feed = ({ news }) => {
  const [textFilter, settextFilter] = useState(null)
  const [startTime, setstartTime] = useState(
    dayjs(new Date(news[news.length - 1].pubDate).toISOString())
  )
  const [endTime, setendTime] = useState(
    news[12]
      ? dayjs(new Date(news[12].pubDate).toISOString())
      : dayjs(new Date(news[0].pubDate).toISOString())
  )
  const [startMils, setstartMils] = useState(
    +new Date(news[news.length - 1].pubDate)
  )
  const [endMils, setEndMils] = useState(
    news[12] ? +new Date(news[12].pubDate) : +new Date(news[0].pubDate)
  )

  const [selectedNews, setselectedNews] = useState([])

  const [counter, setcounter] = useState(10)

  const filterNews = (el) => {
    const mils = Date.parse(el.pubDate)

    if (mils > endMils || mils < startMils) return false
    return true
  }

  const setTextFilterOnResize = () => {
    if (window.innerWidth >= 840)
      return settextFilter("Показывать  новости вышедшие с")

    if (window.innerWidth < 840 && window.innerWidth > 540)
      return settextFilter("Показывать  новости с")

    return settextFilter("Новости с")
  }

  useEffect(() => {
    setTextFilterOnResize()
    setselectedNews(news.filter(filterNews))

    window.addEventListener("resize", setTextFilterOnResize)

    return function () {
      window.removeEventListener("resize", setTextFilterOnResize)
    }
  }, [])

  useEffect(() => {
    setselectedNews(news.filter(filterNews))
    setcounter(10)
  }, [startTime, endTime])

  return (
    <div className='wrapper'>
      <nav>
        <a className='linkToNews' href='https://gucodd.ru/auto_news'>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14.625L5.625 9L11.25 3.375" stroke="#62A744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>К новостям</p>
        </a>
      </nav>
      <Filter
        {...{
          setendTime,
          setEndMils,
          setstartMils,
          setstartTime,
          textFilter,
          startTime,
          endTime,
        }}
      />
      {selectedNews
        .slice(0, counter)
        .map(modifyContent)
        .map((item) => (
          <div
            className='feed'
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
            key={item.pubDate}></div>
        ))}
      {counter < selectedNews.length && (
        <button
          onClick={() => setcounter((c) => c + 10)}
          className='showMoreButton'>
          Больше новостей
        </button>
      )}
    </div>
  )
}

export default Feed
