import Component from './components/Component'
import Set from './components/Set'
import Dialog from './components/Dialog'
import DataCleaner from './utils/DataCleaner'
import FocusManager from './FocusManager'
import CacheManager from './utils/CacheManager'
import './assets/css/main.css'

const HOME_CACHE_TIME = 1000*60*60*24 // 1 day
const REF_CACHE_TIME = 1000*60*60*24 // 1 day

class DisneyApp extends Component {
  constructor(homeUrl, refUrl) {
    super()
    this.homeUrl = homeUrl
    this.refUrl = refUrl
    this.setupView('app-container')
    this.cacheManager = new CacheManager()
    this.focusManager = new FocusManager(this.view)
    this.dialog = new Dialog(this.view)

    this.fetchHomeData()
  }

  fetchHomeData() {
    const homeData = this.cacheManager.get('home')
    if (homeData !== null) {
      this.onDataLoad(homeData)
      return;
    }

    fetch(this.homeUrl)
      .then(response => response.json())
      .then(d => {
        const containers = d.data.StandardCollection.containers
        this.onDataLoad(containers)
        this.cacheManager.set('home', containers, HOME_CACHE_TIME)
      })
  }

  fetchRef(refId) {
    const refData = this.cacheManager.get(`ref-${refId}`)
    if (refData !== null) {
      this.onRefLoad(refData)
      return;
    }

    fetch(this.refUrl.replace('#refid#', refId))
      .then(response => response.json())
      .then(d => {
        this.onRefLoad(d.data)
        this.cacheManager.set(`ref-${refId}`, d.data, REF_CACHE_TIME)
      })
  }

  onDataLoad(containers) {
    containers.map(cont => {
      let setParams = {
        title: DataCleaner.getSetTitle(cont.set),
      }

      if (cont.set.items && cont.set.items.length) {
        setParams.items = DataCleaner.getSetItems(cont.set.items)
        new Set(setParams).mount(this.view)
      }
  
      if (cont.set.refId) {
        this.fetchRef(cont.set.refId)
      }
    })

    this.dialog.mount(this.view)

    /**
     * At this point we are still inserting a large amount 
     * of HTML element into the DOM. The creation of some of these elements 
     * is still queued as a microtask.
     * 
     * this.focusManager.focusFirstItem() runs as a MACRO task.
     * To ensure that the DOM in the container is ready, we can queue 
     * this task as a MICRO Task putting it at the end of the MICRO Task
     * queue. This is essentially nicer than wrapping it in a setTimeout()
     * 
     * A more robust solution is to implement the MutationObserver API
     * and observ mutations to the this.container DOM element.
     * This could be added as a generic feature to Component.js
     * and implemented as an onLoaded() method.
     */
    queueMicrotask(() => this.focusManager.focusFirstItem())
  }

  onRefLoad(d) {
    const data = d.TrendingSet || d.CuratedSet || d.PersonalizedCuratedSet
    let setParams = {
      title: DataCleaner.getSetTitle(data),
    }

    if (data.items && data.items.length) {
      setParams.items = DataCleaner.getSetItems(data.items)
      new Set(setParams).mount(this.view)
    }
  }
}

export default DisneyApp