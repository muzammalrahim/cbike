import React, { useEffect, useState } from 'react'
import Footer from "./Footer"
import axios from 'axios'
import ReactReadMoreReadLess from "react-read-more-read-less";
import EventBlog from './EventBlog';

const EventList = () => {

  const [event, setEvent] = useState([])

  useEffect(() => {
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/getEvent`)
      console.log(res);
      setEvent(res.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='blog__list container'>
        <div className='row'>
          {
            event?.map((event, i) => {
              return (
                <EventBlog key={i} image={event.image} title={event.title} description={event.description} />
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EventList