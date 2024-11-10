import Component from './Component'
import '../assets/css/set-item.css'

class SetItem extends Component {
  constructor({ title, imgUrl }) {
    super()
    this.title = title
    this.imgUrl = imgUrl
    this.setupContainer('set-item')
    this.buildComponent()
  }

  buildComponent() {
    this.container.tabIndex = 0;
    const h3 = document.createElement('h3')
    h3.textContent = this.title;

    const img = document.createElement('img')
    img.alt = this.title
    img.src = this.imgUrl

    // image is not loading from src
    img.addEventListener('error', function() {
      this.src = 'spacer.png'
    })

    this.container.append(h3)
    this.container.append(img)
  }

}

export default SetItem