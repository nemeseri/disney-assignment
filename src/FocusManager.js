/**
 * This Class is limited to the current layout and it's not a generic solution
 * to handle keyboard navigation in a 'grid like' environment.
 * 
 * Generic solution can be easily added by adding HTML traversing libs 
 * focusing on the focusClassName property.
 */
class FocusManager {
  constructor(container, focusClassName = 'set-item', verticalContainerClass = 'set') {
    this.container = container
    this.focusClassName = focusClassName
    this.verticalContainerClass = verticalContainerClass

    // register event handlers in container
    this.container.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.up(e)
          break
        case 'ArrowDown': 
          this.down(e)
          break
        case 'ArrowRight': 
          this.right(e)
          break
        case 'ArrowLeft': 
          this.left(e)
          break
        case 'Backspace':
          this.back(e)
          break
        case 'Enter':
          this.enter(e)
          break
      }
    });
  }
  
  //set the focus on first focusable element
  focusFirstItem() {
    this.container
      .querySelector(`.${this.focusClassName}`)
      .focus()
  }

  up(e) {
    e.preventDefault()
    document.activeElement
      .closest(`.${this.verticalContainerClass}`)
      .previousElementSibling
      .querySelector(`.${this.focusClassName}`).focus()
  }

  down(e) {
    e.preventDefault()
    document.activeElement
      .closest(`.${this.verticalContainerClass}`)
      .nextElementSibling
      .querySelector(`.${this.focusClassName}`).focus()
  }

  left(e) {
    e.preventDefault()
    document.activeElement.previousElementSibling.focus()
  }

  right(e) {
    e.preventDefault()
    document.activeElement.nextElementSibling.focus()
  }

  enter(e) {
    e.preventDefault()
    console.log(e);
  }

  back(e) {
    e.preventDefault()
    console.log(e);
  }
}

export default FocusManager