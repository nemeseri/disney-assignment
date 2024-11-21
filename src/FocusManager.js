/**
 * This Class is limited to the current layout and it's not a generic solution
 * to handle keyboard navigation in a 'grid like' environment.
 * 
 * Generic solution can be added by HTML traversing libs 
 * focusing on the focusClassName property.
 */
class FocusManager {
  constructor(
    container, 
    focusClassName = 'set-item', 
    verticalContainerClass = 'set'
  ) {
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
      }
    });
  }
  
  //set the focus on first focusable element
  focusFirstItem() {
    this.container
      .querySelector(`.${this.focusClassName}`)
      .focus()
  }

  focusItem(el) {
    el.focus()
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  verticalMove(direction) {
    let dir;
    if (direction === 1) {
      dir = 'nextElementSibling'
    } else {
      dir = 'previousElementSibling'
    }

    const activeEl = document.activeElement
    const verticalBoundary = activeEl.closest(`.${this.verticalContainerClass}`)

    if (!verticalBoundary[dir] 
      || !verticalBoundary[dir].classList.contains('set')) {
      return
    }

    const el = verticalBoundary[dir].querySelector(`.${this.focusClassName}`)
    if (el) {
      this.focusItem(el)
      activeEl.parentElement.scrollLeft = 0
    }
  }

  up(e) {
    e.preventDefault()
    this.verticalMove(-1)
  }

  down(e) {
    e.preventDefault()
    this.verticalMove(1)
  }

  left(e) {
    e.preventDefault()
    const el = document.activeElement.previousElementSibling
    if (el) this.focusItem(el)
  }

  right(e) {
    e.preventDefault()
    const el = document.activeElement.nextElementSibling
    if (el) this.focusItem(el)
  }
}

export default FocusManager