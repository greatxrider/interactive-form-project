const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const otherJobRoleInput = document.getElementById('other-job-role');
const jobRoleSelector = document.getElementById('title');
const designSelector = document.getElementById('design');
const shirtColorSelector = document.getElementById('color');
const activitiesFieldset = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
const paymentSelector = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const activitiesCheckboxList = document.querySelectorAll('[type="checkbox"]')
const colorOptions = shirtColorSelector.children;
let totalCost = 0;

document.addEventListener('DOMContentLoaded', (e) => {
    nameInput.focus();
    otherJobRoleInput.hidden = true;
    otherJobRoleInput.disabled = true;
    shirtColorSelector.disabled = true;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
    paymentSelector.children[1].setAttribute("selected", true);

    /**
     * Handles the change event for the job role selector.
     * Shows or hides the "Other job role" input based on the selected value.
     * Enables or disables the "Other job role" input based on the selected value.
     * 
     * @event change
     * @param {Event} event - The event object representing the change event.
     */
    jobRoleSelector.addEventListener('change', () => {
        if (jobRoleSelector.value === 'other') {
            otherJobRoleInput.hidden = false;
            otherJobRoleInput.disabled = false;
        } else {
            otherJobRoleInput.hidden = true;
            otherJobRoleInput.disabled = true;
        };
    });

    /**
     * Handles the change event for the design selector.
     * Enables the shirt color selector and updates the visibility of color options based on the selected design.
     * Shows the color options that match the selected design and hides those that do not.
     * 
     * @event change
     * @param {Event} event - The event object representing the change event.
     */
    designSelector.addEventListener('change', (event) => {
        shirtColorSelector.disabled = false;
        for (let i = 0; i < colorOptions.length; i++) {
            const selectedOptionTheme = event.target.value;
            const dataTheme = colorOptions[i].getAttribute("data-theme");
            if (selectedOptionTheme === dataTheme) {
                colorOptions[i].hidden = false;
                colorOptions[i].setAttribute("selected", true);
            } else {
                colorOptions[i].hidden = true;
                colorOptions[i].removeAttribute("selected", false);
            };
        };
    });

    /**
     * Handles the change event for the activities fieldset.
     * Updates the total cost based on the selected or deselected activities.
     * Adds the cost of the activity if it is checked, or subtracts it if it is unchecked.
     * 
     * @event change
     * @param {Event} event - The event object representing the change event.
     */
    activitiesFieldset.addEventListener('change', (event) => {
        const activityCost = +event.target.getAttribute("data-cost");
        if (event.target.checked) {
            totalCost += activityCost;
        } else {
            totalCost -= activityCost;
        }
        activitiesCost.innerHTML = `Total: $${totalCost}`;
    });

    /**
     * Handles the change event for the payment method selector.
     * Displays the payment method section that matches the selected value and hides the others.
     * 
     * @event change
     * @param {Event} event - The event object representing the change event.
     */
    paymentSelector.addEventListener('change', (event) => {
        const paymentMethodSections = [creditCardDiv, paypalDiv, bitcoinDiv];
        const selectedPaymentMethod = event.target.value;
        paymentMethodSections.forEach((section) => {
            section.hidden = section.id !== selectedPaymentMethod;
        });
    });

    /**
     * Validates the form fields when the form is submitted.
     * Checks each field for validity and updates the UI to reflect validation results.
     * 
     * @param {Event} event - The submit event object.
     */
    form.addEventListener('submit', (event) => {
        const name = nameInput.value;
        const email = emailInput.value;
        const cardNumber = cardNumberInput.value;
        const zipCode = zipCodeInput.value;
        const cvv = cvvInput.value;
        const isNameNotEmpty = () => /^(?!\s*$).+$/i.test(name);
        const isEmailValid = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
        const isCardNumberLengthValid = () => /^\d{13,16}$/.test(cardNumber);
        const isZipCodeValid = () => /^\d{5}$/.test(zipCode);
        const isCVVValid = () => /^\d{3}$/.test(cvv);

        /**
         * Validates an input element based on a provided validation function.
         * Updates the visibility and styling of the input element's parent based on the validation result.
         * 
         * @param {HTMLElement} inputElement - The input element to be validated.
         * @param {Function} validationFunction - A function that performs validation on the input element.
         */
        const validator = (inputElement, validationFunction) => {
            const parentElement = inputElement.parentElement;

            if (validationFunction()) {
                inputElement.nextElementSibling.style.display = 'none';
                parentElement.classList.add('valid');
                parentElement.classList.remove('not-valid');
                parentElement.lastElementChild.hidden = true;
            } else {
                event.preventDefault();
                inputElement.nextElementSibling.style.display = 'inherit';
                parentElement.classList.add('not-valid');
                parentElement.classList.remove('valid');
                parentElement.lastElementChild.hidden = false;
            }
        };

        // Validate name, email, and payment details if using credit card
        validator(nameInput, isNameNotEmpty);
        validator(emailInput, isEmailValid);
        if (paymentSelector.value === 'credit-card') {
            validator(cardNumberInput, isCardNumberLengthValid);
            validator(zipCodeInput, isZipCodeValid);
            validator(cvvInput, isCVVValid);
        }
    });

    /**
     * Adds focus and blur event listeners to each checkbox in the activities list.
     * Highlights the checkbox's parent element when focused and removes the highlight when blurred.
     */
    activitiesCheckboxList.forEach((checkbox) => {
        checkbox.addEventListener('focus', (event) => {
            event.target.parentElement.classList.add('focus');
        })

        checkbox.addEventListener('blur', (event) => {
            event.target.parentElement.classList.remove('focus');
        })
    })
});
