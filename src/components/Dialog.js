import Component from './Component'
import '../assets/css/dialog.css'

class Dialog extends Component {
  constructor(parentContainter) {
    super()
    this.parentContainter = parentContainter
    this.parentContainter.addEventListener('itemSelected', (e) => this.open(e));
    this.parentContainter.addEventListener('keydown', (e) => this.onKeyDown(e));

    this.setupView('details', 'dialog')
  }

  open(e) {
    this.view.textContent = ''
    this.buildComponent(JSON.parse(e.target.getAttribute('data-json')))
    this.view.showModal()
  }

  close() {
    this.view.textContent = ''
    this.view.close()
  }

  onKeyDown(e) {
    if (e.key === 'Backspace') {
      this.view.close()
    }
  }

  buildComponent(data) {
    const bttn = document.createElement('button')
    bttn.textContent = 'Close'
    bttn.className = 'close'
    bttn.addEventListener('click', () => this.close())
    this.view.append(bttn)

    if (data.videoUrl) {
      const video = document.createElement('video')
      video.setAttribute('controls', true)
      video.setAttribute('autoplay', true)
      video.setAttribute('poster', data.imgUrl)
      const source = document.createElement('source')
      source.src = data.videoUrl
      video.append(source)
      this.view.append(video)
    } else {
      const img = document.createElement('img')
      img.src = data.imgUrl
      img.alt = data.title
      this.view.append(img)
    }

    const wrap = document.createElement('div')
    wrap.className = 'dialog-wrap'

    const h4 = document.createElement('h4')
    h4.textContent = data.title
    wrap.append(h4)

    if (data.type !== 'collection') {
      const ul = document.createElement('ul')

      if (data.availability) {
        const region = document.createElement('li');
        region.textContent = 'Region: ' + data.availability.region
        ul.append(region)
      }

      if (data.rating) {
        const rating = document.createElement('li');
        rating.textContent = 'Rating: ' + data.rating
        ul.append(rating)
      }

      if (data.releaseDate) {
        const releaseDate = document.createElement('li');
        releaseDate.textContent = 'Release Date: ' + new Date(data.releaseDate).toLocaleDateString()
        ul.append(releaseDate)
      }

      wrap.append(ul)
    }

    this.view.append(wrap)
  }

  mount(target) {
    target.prepend(this.view)
  }
}

export default Dialog