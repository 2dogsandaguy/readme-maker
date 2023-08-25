/* // TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init(); */
const inquirer = require('inquirer');
const fs = require('fs');

function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectTitle',
      message: 'Enter your project title:'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a project description:'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'ISC']
      },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contributing guidelines:'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter test instructions:'
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:'
    }
  ]);
}

promptUser()
  .then((data) => generateReadme(data))
  .then((readmeContent) => writeReadmeToFile(readmeContent))
  .catch((err) => console.error(err));
  
function generateLicenseSection(license) {
    const licenseBadge = getLicenseBadge(license);
    const licenseText = getLicenseText(license);
  
    return `
  ## License
  ${licenseBadge}
  
  ${licenseText}
    `;
  }
  
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
      email
    } = data;
  
    const licenseSection = generateLicenseSection(license);
  
    const noValueWithNA = (value) => (value.trim() === '' ? 'N/A' : value);

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

## Installation
${noValueWithNA(installation)}

## Usage
${noValueWithNA(usage)}

## Contributing
${noValueWithNA(contributing)}

## Tests
${noValueWithNA(tests)}

## Questions
GitHub: [${noValueWithNA(github)}](https://github.com/${noValueWithNA(github)})
Email: [${noValueWithNA(email)}](mailto:${noValueWithNA(email)})
  `;
  return readme;
}

 function getLicenseBadge(license) {
    switch (license) {
      case 'MIT':
        return '![MIT License](https://img.shields.io/badge/license-MIT-brightgreen)';
      case 'Apache-2.0':
        return '![Apache License 2.0](https://img.shields.io/badge/license-Apache%202.0-blue)';
      case 'GPL-3.0':
        return '![GPLv3 License](https://img.shields.io/badge/license-GPLv3-blue)';
      case 'ISC':
        return '![ISC License](https://img.shields.io/badge/license-ISC-blue)';
      default:
        return '';
    }
  }
   
  function getLicenseText(license) {

    return '';
  }

function writeReadmeToFile(readme) {
  fs.writeFile('README.md', readme, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('README.md file generated.');
    }
  });
}
