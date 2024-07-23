# Interactive Form Project

## Overview
This project enhances an interactive form with various JavaScript functionalities, such as dynamic display of form fields, real-time validation, and updating the UI based on user input.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Project Structure](#project-structure)
6. [Additional Notes](#additional-notes)
7. [License](#license)

## Features
- **Focus State:** Automatically focuses on the "Name" field when the page loads.
- **Job Role Section:** Displays an additional text field when "Other" is selected in the job role dropdown.
- **T-Shirt Info Section:** Filters available color options based on the selected t-shirt design.
- **Activities Section:** Updates the total cost of selected activities in real-time.
- **Payment Info Section:** Dynamically displays payment sections based on the selected payment method.
- **Form Validation:** Custom validation for required fields, providing visual feedback for errors and successes.
- **Accessibility Enhancements:** Adds visual focus states for activity checkboxes.
- **Real-Time Error Messages:** Provides immediate feedback for form validation errors.

## Installation
1. Download the project's starter files and unzip them.
2. Add the unzipped files to the root of your project folder.
3. At the root of the project folder, create a folder named `js` and add a `script.js` file to it.
4. Ensure the `src` attribute of the script tag in `index.html` matches the path to your `script.js` file.

## Usage
1. Open the project folder in your text editor.
2. Open and view the `script.js` file that you created.
3. Load the `index.html` file in Chrome, and open the Chrome DevTools Console.
4. To test the setup, add `console.log('Test');` to the `script.js` file, save it, and refresh the page in the browser. You should see "Test" printed in the console.

## Technologies Used
- HTML
- CSS
- JavaScript

## Project Structure
interactive-form-project/
│
├── css/
│   └── styles.css
│
├── img/
│   └── various images used in the project
│
├── js/
│   └── script.js
│
├── index.html
└── README.md

## Additional Notes
- **Code Comments**: Ensure your code is well-commented to describe functionality.
- **Code Readability**: Maintain consistent spacing and indentation for better readability.
- **Quality Assurance Testing**: Test all aspects of functionality and monitor the console for bugs.

## Extra Credit Features
- **Conflicting Activity Times**: Disable conflicting activities if they occur at the same time.
- **Real-Time Error Messages**: Provide validation error messages as users fill out the form.
- **Conditional Error Messages**: Display specific error messages based on the type of validation error.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
