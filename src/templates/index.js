import React from 'react'
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

    // const draggable = detectmob()

    const fl = new Flickity(slideshow, {
      contain: true,
      lazyLoad: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true,
      draggable: false,
      freeScroll: false,
      freeScrollFriction: 0.05,
      friction: 0.35,
      ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
    })

    // Lory listeners

    const slideShowJazz = (e) => {
      self.setState({currentSlide: fl.selectedIndex})
    }

    fl.on('select', () => slideShowJazz())

    let animate = true
    let moving = false

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

    const detectmob = () => {
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
    }

    const animateSlide = (e) => {
      if (e.deltaY >= 1 || (e.detlaY === undefined && e.detail === 1)) {
        fl.next()
      } else {
        fl.previous()
      }
    }

    fl.on('scroll', (progress) => {
      moving = true
    })

    fl.on('settle', () => {
      moving = false
    })

    const debounced = debounce(animateSlide, 80)
    window.addEventListener('mousewheel', (e) => {
      if (!moving) { debounced(e) }
    })
    window.addEventListener('DOMMouseScroll', (e) => {
      if (!moving) { debounced(e) }
    })

    setTimeout(() => {
      self.setState({
        visible: true
      })
    }, 1000)

    const shadow = document.querySelector('.slide__bg')
    document.onmousemove = (e) => {
      // const x = e.clientX
      // const y = e.clientY
      const newX = (e.clientX / 30) + 50
      const newY = (e.clientY / 30) + 50
      shadow.style.boxShadow = '0 ' + newX + 'px ' + newY + 'px -30px rgba(0,0,0,0.50)'
    }
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
                  <div className={`slide__bg rel ${visible ? 'show' : null}`}>
                    <div className='slide__full' style={{ backgroundImage: 'url(' + study.node.image.file.url + '?fm=jpg&fl=progressive&q=70)' }} />
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
