import './style.css'
import Icon from './img_test.png'

function component() {
    const element = document.createElement('div')

    element.innerHTML = 'Hello Webpack!!3'
    element.classList.add('hello')

    const myIcon = new Image()
    myIcon.src = Icon

    element.appendChild(myIcon)

    return element
}

document.body.appendChild(component())
