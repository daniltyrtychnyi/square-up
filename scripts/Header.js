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

    menuLabels = {
        open: 'Open menu',
        close: 'Close menu',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)

        if (!this.rootElement) {
            return
        }

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

        this.burgerButtonElement.ariaExpanded = isOpen
        this.burgerButtonElement.ariaLabel = isOpen ? this.menuLabels.close : this.menuLabels.open
        this.burgerButtonElement.title = isOpen ? this.menuLabels.close : this.menuLabels.open
    }
}

export default Header