'use strict'

// required node modules
const inquirer = require('inquirer');
const fs = require('fs');

// required local modules
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const writeMain = require('./write-page.js');
const writeHTML = writeMain.writeMain;

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
      name: 'mgrId',
      message: 'What is your employee ID? ',
    },
    {
      type: 'input',
      name: 'mgrEmail',
      message: 'What is your email address? ',
    },
    {
      type: 'input',
      name: 'mgrOfficeNum',
      message: 'What is your office number? ',
    }
  ])
    .then((answers) => {
      const manager = new Manager(
        answers.mgrName,
        answers.mgrId,
        answers.mgrEmail,
        answers.mgrOfficeNumber
      );
      roster.push(manager);
      console.log('pushed manager');
      empQuestions();
    })
    .catch(error => console.log('Error manager!'));
};

// employee choice questions function
function empQuestions() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'empChoice',
      message: 'Would you like to add an engineer, add an intern, or build your roster? ',
      choices: ['Engineer', 'Intern', 'Build your Roster'],
    },
    {
      type: 'input',
      name: 'empName',
      message: "What is the employee's name? ",
    },
    {
      type: 'input',
      name: 'empId',
      message: "What is the employee's ID? ",
    },
    {
      type: 'input',
      name: 'empEmail',
      message: "What is the employee's email address? ",
    },
    {
      when: (userInput) => userInput.empChoice === 'Engineer',
      type: 'input',
      name: 'engGitHubUsername',
      message: "What is the engineer's GitHub username? ",
    },
    {
      when: (userInput) => userInput.empChoice === 'Intern',
      type: 'input',
      name: 'internSchool',
      message: "What is the name of the intern's school? ",
    },
    {
      type: 'confirm',
      name: 'addEmployee',
      message: 'Would you like to add another employee? ',
    }
  ])
    .then((answers) => {
      if (answers.empChoice === 'Engineer') {
        roster.push(new Engineer
          (answers.name,
            answers.id,
            answers.email,
            answers.github
          )
        )
      } else if (answers.empChoice === 'Intern') {
        internQuestions();
        roster.push(new Intern
          (answers.name,
            answers.id,
            answers.email,
            answers.school
          )
        )
      }
      {
        if (answers.addEmployee === true) {
          empChoice();
        } else {
          writeHTML;
        }
      }
    })  
    .catch(error => console.log('Error employee!'));
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
      when: (userInput) => userInput.empChoice === 'Engineer',
    }
  ])
    .then((answers) => {
      // const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);

      // roster.push(engineer);

      buildRoster();

    })
    .catch(error => console.log('Error engineer!'));
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
      when: (userInput) => userInput.empChoice === 'Intern',
    }
  ])
    .then((answers) => {
      // const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      // roster.push(intern);
      buildRoster();
    })
    .catch(error => console.log('Error intern!'));
};

// function to build the team roster and print file
function buildRoster() {
  fs.writeFileSync('./dist/index.html', writeMain(roster), 'utf-8');
  console.log('Roster complete! Go to index.html to see the results!');
};

mgrQuestions();
