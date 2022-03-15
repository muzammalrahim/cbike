import React, { useEffect, useState } from 'react'
import Footer from "../components/Footer"
import axios from 'axios'
import ReactReadMoreReadLess from "react-read-more-read-less";
import BikeBlog from './BikeBlog';

const BlogList = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/getDiscover`)
      console.log("blog res", res.data.data.title);

      setBlogs(res.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='blog__list container'>
        <div className='row'>
          {
            blogs?.map((blog, i) => {
              return (
                <BikeBlog key={i} image={blog.image} title={blog.title} description={blog.description} />
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BlogList