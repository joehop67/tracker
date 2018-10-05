import React from 'react'

export default (props) => {
  return (
    <footer>
      <style jsx>{`
        footer {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          margin-right: 2rem;
          margin-left: 2rem;
        }
        .heart {
          color: red;
        }
      `}</style>
      <span>Made with <span className='heart'>{String.fromCharCode(9829)}</span> by Joe</span>
      <span>Copyright 2018; <a href='http://websitesbyjoe.info'>Websites By Joe</a></span>
    </footer>
  )
}