import React from 'react'
import Link from 'gatsby-link'
import LazyLoad from 'react-lazyload'

export default class Index extends React.Component {
  render () {
    const { pathContext } = this.props
    return (
      <Home {...pathContext} />
    )
  }
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSlide: 0
    }
  }
  componentDidMount () {
    const self = this

    const Flickity = require('flickity-imagesloaded')
    const slideshow = document.querySelector('.js_slider')

    const fl = new Flickity(slideshow, {
      contain: true,
      lazyLoad: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true,
      ease:  'cubic-bezier(0.075, 0.82, 0.165, 1)'
    })

    // Lory listeners

    const slideShowJazz = (e) => {
      console.log(fl.selectedIndex)

      self.setState({currentSlide: fl.selectedIndex})
    }

    fl.on('select', () => slideShowJazz())

    let animate = true

    const debounce = (func, wait = 80) => {
      let timeout
      return (...args) => {
        clearTimeout(timeout)
        if (animate) {
          func.apply(this, args)
          animate = false
        }
        timeout = setTimeout(() => {
          animate = true
        }, wait)
      }
    }

    const animateSlide = (e) => {
      if (e.deltaY >= 1) {
        fl.next()
      } else {
        fl.previous()
      }
    }

    const debounced = debounce(animateSlide, 80)
    window.addEventListener('mousewheel', (e) => { debounced(e) })

  }
  render () {
    const {
      studies
    } = this.props
    const {
      currentSlide
    } = this.state
    return (
      <div>
        <div className=''>
          <div className='slide__background' style={{backgroundColor: studies[currentSlide].node.backgroundColor}} />
          <ul className='slides js_slider'>
            {studies.map((study, i) => (
              <li className='slide' key={study.node.id}>
                <div className='slide__inner'>
                  <div className='rel'>
                    <div className='slide__text'>
                      <h1>{study.node.name}</h1>
                    </div>
                    <div className='slide__number'>
                      <h2>0{i + 1}</h2>
                    </div>
                    <div className='slide__position'>
                      <h4>{study.node.role}</h4>
                    </div>
                    <div className='slide__bg' style={{backgroundImage: 'url(' + study.node.image.file.url + ')' }}>
                      <img src={study.node.image.file.url} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}