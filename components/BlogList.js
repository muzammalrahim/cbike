import React, { useEffect, useState } from 'react'
import Footer from "../components/Footer"
import axios from 'axios'
import ReactReadMoreReadLess from "react-read-more-read-less";
import BikeBlog from './BikeBlog';
import { useRouter } from 'next/router'

const BlogList = () => {

  const [blogs, setBlogs] = useState([])
  const router = useRouter()
  const { blog } = router.query
  console.log("blog", blog);
  useEffect(() => {
    if (blog) {
      fetchBlog()
    }
  }, [blog])

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/getBlogs?categoryId=${blog}`)
      console.log("blog res", res.data.data);

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
            // <BikeBlog image={blogs.image} title={blogs.title} description={blogs.description} />
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BlogList