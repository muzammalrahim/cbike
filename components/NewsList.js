import React, { useEffect, useState } from 'react'
import Footer from "./Footer"
import axios from 'axios'
import ReactReadMoreReadLess from "react-read-more-read-less";
import NewsBlog from "./NewsBlog"

const NewsList = () => {

  const [news, setNews] = useState([])

  useEffect(() => {
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/getNews`)
      console.log(res);
      setNews(res.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='blog__list container'>
        <div className='row'>
          {
            news?.map((news, i) => {
              return (
                <NewsBlog key={i} image={news.image} title={news.title} description={news.description} />
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NewsList