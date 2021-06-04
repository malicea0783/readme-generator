const fs = require('fs');
const inquirer = require('inquirer');
const generateMD = (responses) => {
    const license = responses.license === "none" ? "" : responses.license;
    const licenseBadge = responses.license === "none" ? null : `![Github License](https://img.shields.io/badge/License-${license}-yellow.svg)`
    return `# ${responses.title}
${licenseBadge}
## Description
${responses.description}
## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
## Installation
${responses.installation}
## Usage
${responses.usage}
## License
${responses.license}
## Contributing
${responses.contributing}
## Tests
${responses.tests}
## Questions
For additional information please contact me via GitHub at [https://github.com/${responses.github}](https://github.com/${responses.github}) or via email at [${responses.email}](mailto:${responses.email}?subject=[GitHub]%README%Generator).`
};
inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project.',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a short description explaining the what, why, and how of your project.'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use. Include screenshots as needed.'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license.',
            choices: ['MIT', 'WTFPL', 'ISC', 'Unlicense']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'If you would like other developers to contribute to your application or package, include guidelines here.'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Describe how to run the tests on your application.'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub user name.'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address.'
        },
    ])
    .then((responses) => {
        console.log(responses);
        const readmeContent = generateMD(responses)
        fs.writeFile('./utils/generated-README.md', readmeContent, (err) => err ? console.log(err) : console.log('README generated'));
    });