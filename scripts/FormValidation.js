class FormValidation {
    selectors = {
        form: '[data-js-contact-form]',
        fieldErrors: '[data-js-contact-form-field-errors]',
        submitButton: '[data-js-contact-form-submit-button]',
    }

    errorMessages = {
        valueMissing: () => 'Please fill in this field',
        patternMismatch: ({ title }) => title || 'The data does not match the format',
        tooShort: ({ minLength }) => `The value is too short, with a minimum of characters - ${minLength}`,
        tooLong: ({ maxLength }) => `The value is too long, the characters are limited - ${maxLength}`,
    }

    delaySubmit = 2000

    submitButtonDefaultText = 'Submit'

    constructor() {
        this.formElement = document.querySelector(this.selectors.form)
        this.submitButtonElement = this.formElement.querySelector(this.selectors.submitButton)
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

    resetForm() {
        this.formElement.reset()
        this.submitButtonElement.textContent = this.submitButtonDefaultText
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
        const isToggleType = ['radio', 'checkbox'].includes(target.type)
        const isRequired = target.required

        if (isRequired && isToggleType) {
            this.validateField(target)
        }
    }

    onSubmit(event) {
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

            return
        }

        event.preventDefault()

        this.submitButtonElement.textContent = 'Message Sent!'

        this.submitTimeout = setTimeout(() => {
            this.resetForm()
        }, this.delaySubmit)
    }

    bindEvents() {
        document.addEventListener('focusout', (event) => this.onFocusOut(event))
        document.addEventListener('change', (event) => this.onChange(event))
        document.addEventListener('submit', (event) => this.onSubmit(event))
    }
}

export default FormValidation