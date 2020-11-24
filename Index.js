'use strict'


const inquirer = require('inquirer');
// const fs = require('fs');
const util = require('util');
//const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for a manager
const mgrQuestions = () => {},
  return inquirer.prompt([
    {
      type: 'input',
      name: 'mgrName',
      message: 'Hello Manager! What is your name? ',
    },
    {
      type: 'input',
      name: 'empId',
      message: 'What is your employee ID? ',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address? ',
    },
    {
      type: 'input',
      name: 'officeNum',
      message: 'What is your office number? ',
    }
  ]);

// questions for building team
const buildTeam = () => {},
  return inquirer.prompt([
    {
      type: 'choices',
      name: 'memberChoice',
      message: 'Would you like to add an engineer, add an intern, or finish building your team? ',
      choices: ['Engineer', 'Intern', 'Build your Team'],
    },
  ]);

// array of questions about an engineer  
const engQuestions = () => {},
  return inquirer.prompt([
    {
      type: 'input',
      name: 'engName',
      message: "What is the engineer's name? ",
    },
    {
      type: 'input',
      name: 'engId',
      message: "What is the engineer's ID? ",
    },
    {
      type: 'input',
      name: 'engEmail',
      message: "What is the engineer's email address? ",
    },
    {
      type: 'input',
      name: 'engGitHubUsername',
      message: "What is the engineer's GitHub username? ",
    }
  ]);

// array of questions about an intern  
const internQuestions = () => { },
return inquirer.prompt([
  {
    type: 'input',
    name: 'internName',
    message: "What is the intern's name? ",
  },
  {
    type: 'input',
    name: 'internId',
    message: "What is the intern's ID? ",
  },
  {
    type: 'input',
    name: 'internEmail',
    message: "What is the intern's email address? ",
  },
  {
    type: 'input',
    name: 'internSchool',
    message: "What is the intern's school? ",
  }
]);
