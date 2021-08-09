import React from 'react'
import { useSelector } from 'react-redux'
import Layout from './Layout'

const Home = () => {
  const state = useSelector(state => state)
  return (
    <Layout title='商城' subTitle='买买买'>
      Home { JSON.stringify(state)}
    </Layout>
  )
}

export default Home
