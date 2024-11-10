import Component from './Component'
import '../assets/css/dialog.css'

class Dialog extends Component {
  constructor(parentContainter) {
    super()
    this.parentContainter = parentContainter
    this.parentContainter.addEventListener('itemSelected', (e) => this.open(e));

    this.setupView('details', 'dialog')
  }

  open(e) {
    this.view.textContent = ''
    this.buildComponent(JSON.parse(e.target.getAttribute('data-json')))
    this.view.setAttribute('open', true)
  }

  buildComponent(data) {
    if (data.videoUrl) {
      const video = document.createElement('video')
      video.setAttribute('controls', true)
      video.setAttribute('poster', data.imgUrl)
      const source = document.createElement('source')
      source.src = data.videoUrl
      video.append(source)
      this.view.append(video)
    } else if (data.posterImgUrl) {
      const img = document.createElement('img')
      img.src = data.posterImgUrl
      img.alt = data.title
      this.view.append(img)
    }

    const h4 = document.createElement('h4')
    h4.textContent = data.title
    this.view.append(h4)

    if (data.type !== 'collection') {
      const ul = document.createElement('ul')

      if (data.availability) {
        const kids = document.createElement('li');
        kids.textContent = 'Kid friendly: ' + (data.availability.kidsMode ? 'yes' : 'no')
        ul.append(kids)

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

      this.view.append(ul)
    }
  }
}

export default Dialog