import Component from './components/Component'
import Set from './components/Set'
import Dialog from './components/Dialog'
import DataCleaner from './utils/DataCleaner'
import FocusManager from './FocusManager'
import CacheManager from './utils/CacheManager'
import './assets/css/main.css'

const HOME_CACHE_TIME = 1000*60*60*24 // 1 day

class DisneyApp extends Component {
  constructor(homeUrl) {
    super()
    this.homeUrl = homeUrl
    this.setupView('app-container')
    this.cacheManager = new CacheManager()
    this.focusManager = new FocusManager(this.view)
    this.dialog = new Dialog(this.view)
    this.dialog.mount(this.view)

    this.addMutationObserver((list, observer) => {
      this.focusManager.focusFirstItem()
      observer.disconnect()
    })

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
      .catch(e => {
        this.onDataError()
      })
  }

  onDataLoad(containers) {
    containers.map(cont => {
      let setParams = {
        title: DataCleaner.getSetTitle(cont.set),
      }

      if (cont.set.items && cont.set.items.length) {
        setParams.items = DataCleaner.getSetItems(cont.set.items)
      } else if (cont.set.refId) {
        setParams.refId = cont.set.refId
      }
      new Set(setParams).mount(this.view)
    })

    /**
     * If the app is comming from the cache, at this point the container is not yet
     * added to the DOM, so we don't have anything to focus on.
     * 
     * This queues the focus event after the already queued MACRO event.
     * 
     */
    // queueMicrotask(() => this.focusManager.focusFirstItem())
  }
}

export default DisneyApp