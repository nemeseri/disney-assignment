import Component from './Component'
import '../assets/css/set-item.css'

class SetItem extends Component {
  constructor(data) {
    super()
    this.data = data

    this.setupView('set-item')
    this.registerEvents()
    this.buildComponent()
  }

  buildComponent() {
    this.view.tabIndex = 0;
    this.view.setAttribute('data-json', JSON.stringify(this.data))

    const h3 = document.createElement('h3')
    h3.textContent = this.data.title;

    const img = document.createElement('img')
    img.alt = this.data.title
    img.title = this.data.title
    img.src = this.data.imgUrl

    // image is not loading from src
    img.addEventListener('error', function() {
      this.src = 'spacer.png'
    })

    this.view.append(h3)
    this.view.append(img)
  }

  registerEvents() {
    this.view.addEventListener('click', (e) => this.select(e))
    this.view.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.select(e)
      }
    })
  }

  select(e) {
    e.preventDefault()
    this.view.dispatchEvent(new Event('itemSelected', { bubbles: true }))
  }

}

export default SetItem