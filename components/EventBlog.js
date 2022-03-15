import React from 'react'

const EventBlog = ({ image, title, description }) => {
    
    const [isReadMore, setIsReadMore] = React.useState(false);
    return (
        <div className='col-md-6 blogList-content'>
            <img className='img-fluid' src={image} alt="nothing"/>
            <br/><br/>
            <span>11 Jul 2018 | John Doe</span>
            <h3>{title}</h3>

            <p>{isReadMore ?description: description.substring(0,120)}</p>
        <span onClick={() => {
        setIsReadMore(!isReadMore)
            }} className='readmore-btn'>
            {isReadMore ? "Read less" : "Read more"}
            </span>
        </div>
 
  )
}

export default EventBlog