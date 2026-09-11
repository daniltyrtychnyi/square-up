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

    onBurgerButtonClick = () => {
        this.overlayElement.classList.toggle(this.stateClasses.isActive)
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)

        const isOpen = this.overlayElement.classList.contains(this.stateClasses.isActive)

        this.burgerButtonElement.ariaExpanded = isOpen
        this.burgerButtonElement.ariaLabel = isOpen ? this.menuLabels.close : this.menuLabels.open
        this.burgerButtonElement.title = isOpen ? this.menuLabels.close : this.menuLabels.open
    }

    onMatchMediaChange = (event) => {
        if (!event.matches) {
            this.overlayElement.classList.remove(this.stateClasses.isActive)
            this.burgerButtonElement.classList.remove(this.stateClasses.isActive)
            document.documentElement.classList.remove(this.stateClasses.isLock)

            this.burgerButtonElement.ariaExpanded = false
            this.burgerButtonElement.ariaLabel = this.menuLabels.open
            this.burgerButtonElement.title = this.menuLabels.open
        }
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
        window.matchMedia('(width <= 767.98px)').addEventListener('change', this.onMatchMediaChange)
    }
}

export default Header