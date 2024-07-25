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
const inputElementsList = document.querySelectorAll('label > input[id]');
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

    // Validation functions grouped in an object
    const validationCheckers = {
        /**
         * Validates that the name starts with an uppercase letter followed by valid characters.
         * @param {string} value - The value of the name input.
         * @returns {boolean} - True if the name is valid, otherwise false.
         */
        isNameValid: (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),

        /**
         * Checks if the input is blank.
         * @param {string} value - The value of the input.
         * @returns {boolean} - True if the input is blank, otherwise false.
         */
        isInputBlank: (value) => /^\s*$/.test(value),

        /**
         * Validates that the first character of the name is uppercase.
         * @param {string} value - The value of the name input.
         * @returns {boolean} - True if the first character is uppercase, otherwise false.
         */
        isFirstCharacterUppercase: (value) => /^([A-Z]\s*)/.test(value),

        /**
         * Checks if the name input contains only one character.
         * @param {string} value - The value of the name input.
         * @returns {boolean} - True if the name has only one character, otherwise false.
         */
        isOnlyOneCharacter: (value) => value.trim().length === 1,

        /**
         * Validates the email format.
         * @param {string} value - The value of the email input.
         * @returns {boolean} - True if the email is valid, otherwise false.
         */
        isEmailValid: (value) => /^[^@]+@[^@.]+\.[a-z]+$/i.test(value),

        /**
         * Checks if the email input is empty.
         * @param {string} value - The value of the email input.
         * @returns {boolean} - True if the email is empty, otherwise false.
         */
        isEmailEmpty: (value) => /^\s*$/.test(value),

        /**
         * Validates that the card number length is between 13 and 16 digits.
         * @param {string} value - The value of the card number input.
         * @returns {boolean} - True if the card number length is valid, otherwise false.
         */
        isCardNumberLengthValid: (value) => /^\d{13,16}$/.test(value),

        /**
         * Validates that the zip code is exactly 5 digits.
         * @param {string} value - The value of the zip code input.
         * @returns {boolean} - True if the zip code is valid, otherwise false.
         */
        isZipCodeValid: (value) => /^\d{5}$/.test(value),

        /**
         * Validates that the CVV is exactly 3 digits.
         * @param {string} value - The value of the CVV input.
         * @returns {boolean} - True if the CVV is valid, otherwise false.
         */
        isCVVValid: (value) => /^\d{3}$/.test(value),
    };

    /**
     * Validation rules for form fields.
     * Each field has a validate function that checks the value against specific criteria
     * and returns an object indicating whether the value is valid and an appropriate error message.
     */
    const validationRules = {
        'name': {
            validate: (value) => {
                let message = '';
                if (validationCheckers.isInputBlank(value)) {
                    message = 'Please enter your name.';
                } else if (!validationCheckers.isFirstCharacterUppercase(value)) {
                    message = 'The first character of the name must be uppercase.';
                } else if (validationCheckers.isOnlyOneCharacter(value)) {
                    message = 'Name must have at least two characters.';
                }
                return { isValid: validationCheckers.isNameValid(value), message };
            }
        },
        'email': {
            validate: (value) => {
                let message = '';
                if (validationCheckers.isEmailEmpty(value)) {
                    message = 'The email field cannot be empty. Please enter your email address.';
                } else if (!validationCheckers.isEmailValid(value)) {
                    message = 'Email address must be formatted correctly.';
                }
                return { isValid: validationCheckers.isEmailValid(value), message };
            }
        },
        'cc-num': {
            validate: (value) => {
                let message = '';
                if (validationCheckers.isInputBlank(value)) {
                    message = 'Please enter your credit card number.';
                } else if (!validationCheckers.isCardNumberLengthValid(value)) {
                    message = 'Credit card number must be 13 to 16 digits long.';
                }
                return { isValid: validationCheckers.isCardNumberLengthValid(value), message };
            }
        },
        'zip': {
            validate: (value) => {
                let message = '';
                if (validationCheckers.isInputBlank(value)) {
                    message = 'Please enter your zip code.';
                } else if (!validationCheckers.isZipCodeValid(value)) {
                    message = 'Zip code must be 5 digits long.';
                }
                return { isValid: validationCheckers.isZipCodeValid(value), message };
            }
        },
        'cvv': {
            validate: (value) => {
                let message = '';
                if (validationCheckers.isInputBlank(value)) {
                    message = 'Please enter your CVV number.';
                } else if (!validationCheckers.isCVVValid(value)) {
                    message = 'CVV number must be 3 digits long.';
                }
                return { isValid: validationCheckers.isCVVValid(value), message };
            }
        }
    };

    /**
     * Validates an input element based on a provided validation function.
     * Updates the visibility and styling of the input element's parent based on the validation result.
     * 
     * @param {HTMLElement} inputElement - The input element to be validated.
     * @param {Function} validationFunction - A function that performs validation on the input element. The function should return a boolean indicating whether the input is valid.
     * @param {Event} [event] - The event object associated with the form submission or interaction that triggered the validation. If provided, the event's default action may be prevented.
     * @param {string} [message=null] - An optional message to display when the validation fails. If not provided, a default message may be shown.
     */
    const validator = (inputElement, validationFunction, event, message = null) => {
        const parentElement = inputElement.parentElement;

        if (validationFunction()) {
            inputElement.nextElementSibling.style.display = 'none';
            parentElement.classList.add('valid');
            parentElement.classList.remove('not-valid');
            parentElement.lastElementChild.hidden = true;
        } else {
            event ? event.preventDefault() : undefined;
            inputElement.nextElementSibling.innerHTML = message;
            inputElement.nextElementSibling.style.display = 'inherit';
            parentElement.classList.add('not-valid');
            parentElement.classList.remove('valid');
            parentElement.lastElementChild.hidden = false;
        }
    };

    /**
     * Validates an input element based on its ID using defined validation rules.
     * @param {HTMLElement} input - The input element to be validated.
     * @param {Event} event - The event object to prevent form submission if invalid.
     */
    const validateInputById = (input, event) => {
        const rule = validationRules[input.id];
        if (rule) {
            const result = rule.validate(input.value);
            validator(input, () => result.isValid, event, result.message);
        }
    };

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
        // Validate name, email, and payment details if using credit card
        validateInputById(nameInput, event);
        validateInputById(emailInput, event);
        if (paymentSelector.value === 'credit-card') {
            validateInputById(cardNumberInput, event);
            validateInputById(zipCodeInput, event);
            validateInputById(cvvInput, event);
        }
    });

    /**
     * Adds focus and blur event listeners to each checkbox in the activities list.
     * Highlights the checkbox's parent element when focused and removes the highlight when blurred.
     *
     * @param {NodeListOf<HTMLInputElement>} activitiesCheckboxList - The list of checkboxes for activities.
     */
    activitiesCheckboxList.forEach((checkbox) => {
        /**
         * Updates the state of conflicting activities based on the selected activity.
         *
         * @param {HTMLInputElement} selectedActivity - The activity checkbox that was selected.
         * @param {boolean} isChecked - Whether the activity checkbox is checked.
         */
        const updateConflictingActivities = (selectedActivity, isChecked) => {
            const selectedActivityDate = selectedActivity.getAttribute('data-day-and-time');

            activitiesCheckboxList.forEach((checkbox) => {
                const activityDate = checkbox.getAttribute('data-day-and-time');
                const isSameActivity = checkbox !== selectedActivity && activityDate === selectedActivityDate;

                if (isSameActivity) {
                    checkbox.disabled = isChecked;
                    checkbox.parentElement.classList.toggle('disabled', isChecked);
                }
            });
        };

        checkbox.addEventListener('focus', (event) => {
            event.target.parentElement.classList.add('focus');
        });

        checkbox.addEventListener('blur', (event) => {
            event.target.parentElement.classList.remove('focus');
        });

        checkbox.addEventListener('change', (event) => {
            const selectedActivity = event.target;
            updateConflictingActivities(selectedActivity, selectedActivity.checked);
        });
    });

    inputElementsList.forEach((input) => {
        input.addEventListener('keyup', () => {
            validateInputById(input);
        });

        input.addEventListener('blur', () => {
            validateInputById(input);
        });
    });
});
