class Component {
  setupView(className, type = 'div') {
    this.view = document.createElement(type)
    this.view.className = className
  }

  addMutationObserver(cb) {
    if (this.observerCallBacks === undefined) {
      console.warning("Mutation observers can't be added before mounting the element!")
      return
    }

    this.observerCallBacks.push(cb)

    if (this.observer === null) {
      this.initObserver()
    }
  }

  removeMutationObserver(cb) {
    // TODO
  }

  initObserver() {
    this.observer = new MutationObserver((list, observer) => {
      this.notifyObservers(list, observer)
    })
    this.observer.observe(this.view, { childList: true })
  }

  notifyObservers(list, observer) {
    this.observerCallBacks.map(cb => {
      cb(list, observer)
    })
  }

  mount(target) {
    target.append(this.view)

    this.observer = null
    this.observerCallBacks = []
  }
}

export default Component