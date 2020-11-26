'use strict'

const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const writeMain = require('./write-page.js');

const roster = [];

// manager questions function
function mgrQuestions() {
  inquirer.prompt([
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
  ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      roster.push(manager);
      employeeQuestions();
    })
    .catch(error => console.log('Error!'));
};

// employee choice questions function
function employeeQuestions() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeChoice',
      message: 'Would you like to add an engineer, add an intern, or build your roster? ',
      choices: ['Engineer', 'Intern', 'Build your Roster'],
    },
  ])
    .then((answers) => {
      if (answers.employeeChoice === 'Engineer') {
        engQuestions();
      } else if
        (answers.employeeChoice === 'Intern') {
        internQuestions();
      } else {
        buildRoster();
      }
    })
    .catch(error => console.log('Error!'));
};    

// engineer questions function  
function engQuestions() {
  inquirer.prompt([
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
  ])
  .then((answers) => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    roster.push(engineer);
    buildRoster();
  })
  .catch(error => console.log('Error!'));
};

// intern questions function  
function internQuestions() {
  inquirer.prompt([
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
  ])
  .then((answers) => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    roster.push(intern);
    buildRoster();
  })
  .catch(error => console.log('Error!'));
};

// function to build the team roster and print file
function buildRoster() {
  fs.writeFileSync('./dist/index.html', writeMain(roster), 'utf-8');
  console.log('Roster complete! Go to index.html to see the results!');
};  

mgrQuestions();
