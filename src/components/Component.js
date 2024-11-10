class Component {
  setupView(className, type = 'div') {
    this.view = document.createElement(type)
    this.view.className = className
  }
  mount(target) {
    target.append(this.view)
  }
}

export default Component