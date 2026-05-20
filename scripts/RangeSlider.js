class RangeSlider {
    minGap = 0

    selectors = {
        root: '[data-js-range-slider]',
        track: '[data-js-range-slider-track]',
        minInput: '[data-js-range-slider-min-value]',
        maxInput: '[data-js-range-slider-max-value]',
        minTooltip: '[data-js-range-slider-tooltip-min]',
        maxTooltip: '[data-js-range-slider-tooltip-max]',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)

        if (!this.rootElement) {
            return
        }

        this.trackElement = this.rootElement.querySelector(this.selectors.track)
        this.minInputElement = this.rootElement.querySelector(this.selectors.minInput)
        this.maxInputElement = this.rootElement.querySelector(this.selectors.maxInput)
        this.minTooltipElement = this.rootElement.querySelector(this.selectors.minTooltip)
        this.maxTooltipElement = this.rootElement.querySelector(this.selectors.maxTooltip)
        this.minLimitElement = Number(this.minInputElement.min)
        this.maxLimitElement = Number(this.maxInputElement.max)
        this.bindEvents()
        this.updateUI()
    }

    onMinSlide = () => {
        let gap = Number(this.maxInputElement.value) - Number(this.minInputElement.value)

        if (gap <= this.minGap) {
            this.minInputElement.value = Number(this.maxInputElement.value) - this.minGap            
        }
        this.updateUI()
    }

    onMaxSlide = () => {
        let gap = Number(this.maxInputElement.value) - Number(this.minInputElement.value)

        if (gap <= this.minGap) {
            this.maxInputElement.value = Number(this.minInputElement.value) + this.minGap
        }
        this.updateUI()
    }

    updateUI() {
        this.minTooltipElement.textContent = `$${this.minInputElement.value}`
        this.maxTooltipElement.textContent = `$${this.maxInputElement.value}`
 
        const minPercent = (this.minInputElement.value - this.minLimitElement) / (this.maxLimitElement - this.minLimitElement) * 100
        const maxPercent = (this.maxInputElement.value - this.minLimitElement) / (this.maxLimitElement - this.minLimitElement) * 100

        this.trackElement.style.left = `${minPercent}%`
        this.trackElement.style.width = `${maxPercent - minPercent}%`

        this.minTooltipElement.style.left = `${minPercent}%`
        this.maxTooltipElement.style.left = `${maxPercent}%`
    }

    bindEvents() {
        this.minInputElement.addEventListener('input', this.onMinSlide)
        this.maxInputElement.addEventListener('input', this.onMaxSlide)
    }
}

export default RangeSlider