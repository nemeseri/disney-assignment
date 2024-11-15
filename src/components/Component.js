class Component {
  setupView(className, type = 'div') {
    this.view = document.createElement(type)
    this.view.className = className

    this.observer = null
    this.observerCallBacks = []
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

  onDataError() {
    const h2 = document.createElement('h2')
    h2.textContent = 'Error occured during fetching API Data.'
    const h3 = document.createElement('h3')
    h3.textContent = 'Please try again later.'
    this.view.append(h2)
    this.view.append(h3)
  }

  mount(target) {
    target.append(this.view)
  }
}

export default Component