class RangeSlider {
    minGap = 0

    selectors = {
        root: '[data-js-range-slider]',
        track: '[data-js-range-slider-track]',
        minValue: '[data-js-range-slider-min-value]',
        maxValue: '[data-js-range-slider-max-value]',
        minTooltip: '[data-js-range-slider-tooltip-min]',
        maxTooltip: '[data-js-range-slider-tooltip-max]',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.trackElement = this.rootElement.querySelector(this.selectors.track)
        this.minValueElement = this.rootElement.querySelector(this.selectors.minValue)
        this.maxValueElement = this.rootElement.querySelector(this.selectors.maxValue)
        this.minTooltipElement = this.rootElement.querySelector(this.selectors.minTooltip)
        this.maxTooltipElement = this.rootElement.querySelector(this.selectors.maxTooltip)
        this.minLimit = Number(this.minValueElement.min)
        this.maxLimit = Number(this.maxValueElement.max)
        this.bindEvents()
        this.updateUI()
    }

    onClickMinSlide = () => {
        let gap = Number(this.maxValueElement.value) - Number(this.minValueElement.value)

        if (gap <= this.minGap) {
            this.minValueElement.value = Number(this.maxValueElement.value) - this.minGap
        }
        this.updateUI()
    }

    onClickMaxSlide = () => {
        let gap = Number(this.maxValueElement.value) - Number(this.minValueElement.value)

        if (gap <= this.minGap) {
            this.maxValueElement.value = Number(this.minValueElement.value) + this.minGap
        }
        this.updateUI()
    }

    updateUI() {
        this.minTooltipElement.textContent = `$${this.minValueElement.value}`
        this.maxTooltipElement.textContent = `$${this.maxValueElement.value}`

        const minPercent = (this.minValueElement.value - this.minLimit) / (this.maxLimit - this.minLimit) * 100
        const maxPercent = (this.maxValueElement.value - this.minLimit) / (this.maxLimit - this.minLimit) * 100

        this.trackElement.style.left = `${minPercent}%`
        this.trackElement.style.width = `${maxPercent - minPercent}%`

        this.minTooltipElement.style.left = `${minPercent}%`
        this.maxTooltipElement.style.left = `${maxPercent}%`
    }

    bindEvents() {
        this.minValueElement.addEventListener('input', this.onClickMinSlide)
        this.maxValueElement.addEventListener('input', this.onClickMaxSlide)
    }
}

export default RangeSlider