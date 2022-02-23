import React, {useState} from 'react'
import logo from '../assets/logo.png'

export default function About() {
const [test, setTest] = useState(10)

  return (
    <section>
        <p>about</p>
        <p>{test}</p>
        <div><img src={logo} alt='' /><h3>我是图片</h3></div>
    </section>
  )
}
