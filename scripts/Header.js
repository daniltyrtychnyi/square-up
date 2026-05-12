class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-header-overlay]',
        burgerButton: '[data-js-header-burger-button]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    stateAttributes = {
        ariaExpanded: 'aria-expanded',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
        this.bindEvents()
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
    }

    onBurgerButtonClick = () => {
        this.overlayElement.classList.toggle(this.stateClasses.isActive)
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)

        const isOpen = this.overlayElement.classList.contains(this.stateClasses.isActive)
        this.burgerButtonElement.setAttribute(this.stateAttributes.ariaExpanded, isOpen)
    }
}

export default Header