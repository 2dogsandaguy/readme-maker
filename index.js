// Import required modules
const inquirer = require("inquirer");
const fs = require("fs");

// Function to prompt the user for input using inquirer
function promptUser() {
  return inquirer.prompt([
    // Prompt for project details
    {
      type: "input",
      name: "projectTitle",
      message: "Enter your project title:",
      validate: function (input) {
        if (!input.trim()) {
          return "Project title cannot be empty. Please enter a valid title.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "description",
      message: "Enter a project description:",
    },
    {
      type: "input",
      name: "installation",
      message: "Enter installation instructions:",
    },
    {
      type: "input",
      name: "usage",
      message: "Enter usage information:",
    },
    {
      type: "list",
      name: "license",
      message: "Choose a license:",
      choices: ["MIT", "Apache-2.0", "GPL-3.0", "ISC"],
    },
    {
      type: "input",
      name: "contributing",
      message: "Enter contributing guidelines:",
    },
    {
      type: "input",
      name: "tests",
      message: "Enter test instructions:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub username:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address:",
    },
    {
      type: "confirm",
      name: "includeScreenshots",
      message: "Do you want to include screenshot section?",
      default: true,
    },
    {
      type: "confirm",
      name: "includeLinks",
      message: "Do you want to include links section?",
      default: true,
    },
  ]);
};

// Function to generate the license section for the readme
function generateLicenseSection(license) {
  const licenseBadge = getLicenseBadge(license);
  const licenseText = getLicenseText(license);

  return `
  ## License
  ${licenseBadge}
  
  ${licenseText}
    `;
};

// Function to generate the complete readme content
function generateReadme(data) {
  const {
    projectTitle,
    description,
    installation,
    usage,
    license,
    contributing,
    tests,
    github,
    email,
    includeScreenshots,
    includeLinks,
  } = data;
  // Generate screenshots section (if selected)
  const screenshotsSection = includeScreenshots
    ? `
## Screenshots

1. ![Screenshot 1](screenshots/screenshot1.png)
   Description of the screenshot.

2. ![Screenshot 2](screenshots/screenshot2.png)
   Description of the screenshot.

3. ![Screenshot 3](screenshots/screenshot3.png)
   Description of the screenshot.
`
    : "";

  // Generate links section (if selected)
  const linksSection = includeLinks
    ? `
## Links

- [Live Demo](https://your-project-demo.com)
- [GitHub Repository](https://github.com/your-username/your-project)
`
    : "";
  // Generate license section
  const licenseSection = generateLicenseSection(license);

  // Helper function to replace empty values with "N/A"
  const noValueWithNA = (value) => (value.trim() === "" ? "N/A" : value);

  // Generate complete readme content
  const readme = `
# ${projectTitle}

${licenseSection}

## Description
${noValueWithNA(description)}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
${includeScreenshots ? '- [Screenshots](#screenshots)' : ''}
${includeLinks ? '- [Links](#links)' : ''}

## Installation
${noValueWithNA(installation)}

## Usage
${noValueWithNA(usage)}

## Contributing
${noValueWithNA(contributing)}

## Tests
${noValueWithNA(tests)}

${screenshotsSection}

${linksSection}

## Questions
If you have any questions about the project, you can reach me via email at [${noValueWithNA(
    email
  )}]
${noValueWithNA(
    email
  )}. Feel free to ask any additional questions or provide feedback.
GitHub: [${noValueWithNA(github)}](https://github.com/${noValueWithNA(github)})
Email: [${noValueWithNA(email)}](mailto:${noValueWithNA(email)})
  `;
  return readme;
};

// Function to get the license badge based on the chosen license
function getLicenseBadge(license) {
  switch (license) {
    case "MIT":
      return "![MIT License](https://img.shields.io/badge/license-MIT-brightgreen)";
    case "Apache-2.0":
      return "![Apache License 2.0](https://img.shields.io/badge/license-Apache%202.0-blue)";
    case "GPL-3.0":
      return "![GPLv3 License](https://img.shields.io/badge/license-GPLv3-blue)";
    case "ISC":
      return "![ISC License](https://img.shields.io/badge/license-ISC-blue)";
    default:
      return "";
  };
};

// Function to get the license text (currently empty)
function getLicenseText(license) {
  return "";
};

// Function to write the generated readme content to a file
function writeReadmeToFile(readme) {
  fs.writeFile("./dist/Sample_README.md", readme, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("README.md file generated.");
    }
  });
};

// Start the user prompt and generate readme
promptUser()
  .then((data) => generateReadme(data))
  .then((readmeContent) => writeReadmeToFile(readmeContent))
  .catch((err) => console.error(err));
