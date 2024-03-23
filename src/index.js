const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description explaining the what, why, and how of your project.',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the steps required to install your project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions and examples for use.',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to your project?',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide examples on how to run tests for your application.',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'GPLv2', 'Apache 2.0', 'None'],
  },
];

function writeToFile(fileName, data) {
  fs.writeFileSync(path.join(__dirname, fileName), data, 'utf8');
}

function generateMarkdown(data) {
  return `
# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
For questions, you can reach me at ${data.email}.
GitHub: [${data.github}](https://github.com/${data.github})

## License
This project is licensed under the ${data.license} license.
    `;
}

inquirer.prompt(questions).then((answers) => {
  const readmeContent = generateMarkdown(answers);
  writeToFile('README.md', readmeContent);
  console.log('Successfully created README.md');
});
