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

    this.setupView('set')
    if (this.items.length) {
      this.buildComponent()
    } else if (refId !== null) {
      this.cacheManager = new CacheManager()
      this.fetchRef(refId)
    }
  }

  fetchRef(refId) {
    const refData = this.cacheManager.get(`ref-${refId}`)
    if (refData !== null) {
      this.onRefLoad(refData)
      return;
    }

    fetch(refUrl.replace('#refid#', refId))
      .then(response => response.json())
      .then(d => {
        this.onRefLoad(d.data)
        this.cacheManager.set(`ref-${refId}`, d.data, REF_CACHE_TIME)
      })
      .catch(e => {
        this.onDataError()
      })
  }

  onRefLoad(d) {
    const data = d.TrendingSet || d.CuratedSet || d.PersonalizedCuratedSet
    if (data.items && data.items.length) {
      this.items = DataCleaner.getSetItems(data.items)
      this.buildComponent()
    }
  }

  buildComponent() {
    this.appendTitle()
    this.appendItems()
  }

  appendTitle() {
    const h2 = document.createElement('h2');
    h2.textContent = this.title;
    this.view.append(h2)
  }

  appendItems() {
    const setWrap = document.createElement('div')
    setWrap.className = 'set-wrap'
    const setItems = this.items.map(i => {
      new SetItem(i).mount(setWrap)
    })
    this.view.append(setWrap)
  }
}

export default Set