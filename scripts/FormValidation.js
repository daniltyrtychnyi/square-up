class FormValidation {
    selectors = {
        form: '[data-js-contact-form]',
        fieldErrors: '[data-js-contact-form-field-errors]',
    }

    errorMessages = {
        valueMissing: () => 'Пожалуйста, заполните это поле',
        patternMismatch: ({ title }) => title || 'Данные не соответствуют формату',
        tooShort: ({ minLength }) => `Слишком короткое значение, минимум символов - ${minLength}`,
        tooLong: ({ maxLength }) => `Слишком длинное значение, ограничение символов - ${maxLength}`,
    }

    constructor() {
        this.bindEvents()
    }

    manageErrors(fieldInputElement, errorMessages) {
        const fieldErrorsElement = fieldInputElement.parentElement.querySelector(this.selectors.fieldErrors)

        if (!fieldErrorsElement) {
            return
        }

        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('')
    }

    validateField(fieldInputElement) {
        const errors = fieldInputElement.validity
        const errorMessages = []

        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldInputElement))
            }
        })
        this.manageErrors(fieldInputElement, errorMessages)

        const isValid = errorMessages.length === 0

        fieldInputElement.ariaInvalid = !isValid

        return isValid
    }

    onFocusOut(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.form)
        const isRequired = target.required
    
        if (isFormField && isRequired) {
            this.validateField(target)
        }
    }

    onChange(event) {
        const { target } = event
        const isToggleType = ['radio', 'checkbxo'].includes(target.type)
        const isRequired = target.required

        if (isRequired && isToggleType) {
            this.validateField(target)
        }
    }

    onSubmit(event) {
        event.preventDefault()

        const isFormField = event.target.matches(this.selectors.form)

        if (!isFormField) {
            return
        }

        const requiredControlElements = [...event.target.elements].filter(({ required }) => required)
        let isFormValid = true
        let firstValidFieldControl = null

        requiredControlElements.forEach((element) => {
            const isValid = this.validateField(element)

            if (!isValid) {
                isFormValid = false

                if (!firstValidFieldControl) {
                    firstValidFieldControl = element
                }
            }
        })

        if (!isFormValid) {
            event.preventDefault()
            firstValidFieldControl.focus()
        }
    }

    bindEvents() {
        document.addEventListener('focusout', (event) => this.onFocusOut(event))
        document.addEventListener('change', (event) => this.onChange(event))
        document.addEventListener('submit', (event) => this.onSubmit(event))
    }
}

export default FormValidation