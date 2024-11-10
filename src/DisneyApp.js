import Component from './components/Component'
import Set from './components/Set'
import Dialog from './components/Dialog'
import DataCleaner from './utils/DataCleaner'
import FocusManager from './FocusManager'
import './assets/css/main.css'

class DisneyApp extends Component {
  constructor(homeUrl, refUrl) {
    super()
    this.homeUrl = homeUrl
    this.refUrl = refUrl
    this.setupView('app-container')
    this.focusManager = new FocusManager(this.view)
    this.dialog = new Dialog(this.view);

    this.fetchHomeData()
  }

  fetchHomeData() {
    fetch(this.homeUrl)
      .then(response => response.json())
      .then(d => this.onDataLoad(d.data.StandardCollection.containers))
  }

  fetchRef(refId) {
    fetch(this.refUrl.replace('#refid#', refId))
      .then(response => response.json())
      .then(d => this.onRefLoad(d.data))
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
    this.focusManager.focusFirstItem()
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