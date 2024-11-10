class Component {
  setupContainer(className, type = 'div') {
    this.container = document.createElement(type)
    this.container.className = className
  }
  mount(target) {
    target.append(this.container)
  }
}

export default Component