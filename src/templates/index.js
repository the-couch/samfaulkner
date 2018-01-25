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
      currentSlide: 0,
      visible: false
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

    const debounce = (func, wait = 100) => {
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

    const debounced = debounce(animateSlide, 100)
    window.addEventListener('mousewheel', (e) => { debounced(e) })
    window.addEventListener('DOMMouseScroll', (e) => { debounced(e) })

    setTimeout(() => {
      self.setState({
        visible: true
      })
    }, 1000)

  }
  render () {
    const {
      studies
    } = this.props
    const {
      currentSlide,
      visible
    } = this.state
    return (
      <div className='rel'>
        <div className='slide__background' style={{backgroundColor: studies[currentSlide].node.backgroundColor}} />
          <ul className='slides js_slider'>
            {studies.map((study, i) => (
              <li className='slide' key={study.node.id}>
                <div className='slide__inner'>
                  <div className='rel'>
                    <div className='slide__number'>
                      <h2>0{i + 1}</h2>
                    </div>
                    <div className='slide__position'>
                      <h4>{study.node.role}</h4>
                    </div>
                    <div className={`slide__bg rel ${visible ? 'show' : null}`} style={{backgroundImage: 'url(' + study.node.image.file.url + '?fm=jpg&fl=progressive&q=70)' }}>
                      <img src={studies[0].node.image.file.url + '?fm=jpg&fl=progressive&q=70&w=1200'} />
                    </div>
                    <div className='slide__text'>
                      <h1>{study.node.name}</h1>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
      </div>
    )
  }
}