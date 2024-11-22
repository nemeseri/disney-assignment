import Component from './Component'
import CacheManager from '../utils/CacheManager'
import SetItem from './SetItem'
import DataCleaner from '../utils/DataCleaner'
import '../assets/css/set.css'

const refUrl = 'https://cd-static.bamgrid.com/dp-117731241344/sets/#refid#.json'
const REF_CACHE_TIME = 1000*60*60*24 // 1 day

class Set extends Component {
  constructor({ title, items = [], refId = null }) {
    super()
    this.title = title
    this.items = items
    this.refId = refId
    this.cacheManager = new CacheManager()

    this.setupView('set')
    if (this.refId !== null) {
      this.view.classList.add('loading')
      this.addIntersectionObserver()
    }
    this.buildComponent()
  }

  buildComponent() {
    this.appendTitle()
    const setWrap = document.createElement('div')
    setWrap.className = 'set-wrap'
    this.view.append(setWrap)
    this.appendItems()
  }

  appendTitle() {
    const h2 = document.createElement('h2');
    h2.textContent = this.title
    this.view.append(h2)
  }

  appendItems() {
    const setItems = this.items.map(i => {
      new SetItem(i).mount(this.view.querySelector('.set-wrap'))
    })
    // this.view.append(setWrap)
  }

  fetchSet() {
    const refData = this.cacheManager.get(`ref-${this.refId}`)
    if (refData !== null) {
      this.onSetLoad(refData)
      return;
    }

    fetch(refUrl.replace('#refid#', this.refId), { priority: 'high' })
      .then(response => response.json())
      .then(d => {
        this.onSetLoad(d.data)
        this.cacheManager.set(`ref-${this.refId}`, d.data, REF_CACHE_TIME)
      })
      .catch(e => {
        this.onDataError()
      })
  }

  onSetLoad(d) {
    const data = d.TrendingSet || d.CuratedSet || d.PersonalizedCuratedSet
    if (data.items && data.items.length) {
      this.items = DataCleaner.getSetItems(data.items)
      this.appendItems()
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
    this.view.classList.remove('loading')
  }

  addIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.target && ent.isIntersecting) {
          this.fetchSet()
        }
      })
    })
    this.intersectionObserver.observe(this.view)
  }
}

export default Set