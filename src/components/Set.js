import Component from './Component'
import SetItem from './SetItem'
import '../assets/css/set.css'

class Set extends Component {
  constructor({ title, items = [] }) {
    super()
    this.title = title
    this.items = items

    this.setupView('set')
    if (this.items.length) {
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