import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate=useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      //https://stackoverflow.com/questions/71191091/what-is-the-best-way-to-render-a-search-bar-component-that-takes-in-a-props-in-a
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <div className='flex-container'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
      </div>
    </Form>
  )
}

export default SearchBox