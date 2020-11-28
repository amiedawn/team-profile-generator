'use strict'

// required node modules
const inquirer = require('inquirer');
const fs = require('fs');

// required local modules
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const writeMain = require('./write-page.js');

const generateHTML = writeMain.renderMain;
// const generateManager = writeMain.createManager;
// const generateEngineer = writeMain.createEngineer;
// const generateIntern = writeMain.createIntern;

let roster = [];
const templateFolder = './templates/';


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
      let manager = new Manager(
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
      message: 'Would you like to add an engineer or an intern? ',
      choices: ['Engineer', 'Intern'],
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
      message: "What is the employee's GitHub username? ",
    },
    {
      when: (userInput) => userInput.empChoice === 'Intern',
      type: 'input',
      name: 'internSchool',
      message: "What is the name of the employee's school? ",
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
        roster.push(new Intern
          (answers.name,
            answers.id,
            answers.email,
            answers.school
          )
        )
      }
      if (answers.addEmployee === true) {
        console.log('true');
        empQuestions();
      } else {
        console.log('false');
        //generateHTML;
        renderMain();
      }
    })
  //.catch(error => console.log('Error employee!'));
};

function renderMain() {
  let mainTemplate = fs.readFileSync('./templates/page-template.html', 'utf8');
  let mainHTML = "";
  console.log('before mainhtml');
  mainHTML = mainHTML + mainTemplate.replace(/{{ roster }}/g, roster);
  console.log('after mainhtml');
  fs.writeFileSync('./dist/index.html', mainHTML, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('File created!');
    };
  })  
};

mgrQuestions();
