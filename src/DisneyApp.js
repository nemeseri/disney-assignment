import Component from './components/Component'
import Set from './components/Set'
import Dialog from './components/Dialog'
import DataCleaner from './utils/DataCleaner'
import FocusManager from './FocusManager'
import './assets/css/main.css'

class DisneyApp extends Component {
  constructor(homeUrl) {
    super()
    this.homeUrl = homeUrl
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

  onDataLoad(containers) {
    containers.map(cont => {
      let setParams = {
        title: DataCleaner.getSetTitle(cont.set),
      }

      if (cont.set.items && cont.set.items.length) {
        setParams.items = DataCleaner.getSetItems(cont.set.items)
      }
  
      if (cont.set.refId) {
        setParams.refId = cont.set.refId
      }

      new Set(setParams).mount(this.view)
    })

    this.dialog.mount(this.view)
    this.focusManager.focusFirstItem()
  }
}

export default DisneyApp