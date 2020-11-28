'use strict'

// required node modules
const inquirer = require('inquirer');
const fs = require('fs');

// required local modules
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const writeMain = require('./write-page.js');

//const generateHTML = writeMain.renderMain;
// const generateManager = writeMain.createManager;
// const generateEngineer = writeMain.createEngineer;
// const generateIntern = writeMain.createIntern;

let roster = [];
let manager;
const team = '';
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
    .then(answers => {
      // if new employee is an engineer, add a new engineer card
      if (answers.empChoice === 'Engineer') {
        roster.push(new Engineer
          (answers.name,
            answers.id,
            answers.email,
            answers.github
          )
        )
      // if new employee is an intern, add a new intern card
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
      // if they don't want to add another employee, render the roster
      } else {
        console.log('false');
        //generateHTML;
        renderMain();
      }
    })
  //.catch(error => console.log('Error employee!'));
};



// write sections per job start
const renderManager = manager => {
  let template = fs.readFileSync('./templates/manager-template.html', 'UTF-8');
  const managerHTML = '';
  // name placeholder, g means replace all matching values
  managerHTML = managerHTML + template.replace(/{{ name }}/g, manager.getName())
    .replace(/{{ id }}/g, manager.getId())
    .replace(/{{ email }}/g, manager.getEmail())
    .replace(/{{ officeNumber }}/g, manager.getOfficeNumber())
    .replace(/{{ role }}/g, manager.getRole());
  team = team + managerHTML;
  console.log(managerHTML);
};

const renderEngineer = engineer => {
  let template = fs.readFileSync('./templates/engineer-template.html', 'UTF-8');
  const engineerHTML = '';
  engineerHTML = engineerHTML + template.replace(/{{ name }}/g, engineer.getName())
    .replace(/{{ id }}/g, engineer.getId())
    .replace(/{{ email }}/g, engineer.getEmail())
    .replace(/{{ github }}/g, engineer.getGithub())
    .replace(/{{ role }}/g, engineer.getRole())
  team = team + engineerHTML;
  console.log(engineerHTML);
};

const renderIntern = intern => {
  let template = fs.readFileSync('./templates/intern-template.html', 'UTF-8');
  const internHTML = '';
  internHTML = internHTML + template.replace(/{{ name }}/g, intern.getName())
    .replace(/{{ id }}/g, intern.getId())
    .replace(/{{ email }}/g, intern.getEmail())
    .replace(/{{ school }}/g, intern.getSchool())
    .replace(/{{ role }}/g, intern.getRole())
  team = team + internHTML;
  console.log(internHTML);
};

function renderMain() {
  let mainTemplate = fs.readFileSync('./templates/page-template.html', 'UTF-8');
  mainTemplate = mainTemplate.replace(/{{ roster }}/g, roster);
  // let mainHTML = "";
  // console.log('before mainhtml');
  
  // console.log('after mainhtml');

  // loop through each employee and render each card, adding to the previous roster
  let mgrCard = fs.readFileSync('./templates/manager-template.html', 'UTF-8');
  mgrCard = mgrCard.replace('{{name}}', manager.getName());
  mgrCard = mgrCard.replace('{{role}}', manager.getRole());
  mgrCard = mgrCard.replace('{{id}}', manager.getId());
  mgrCard = mgrCard.replace('{{email}}', manager.getEmail());
  mgrCard = mgrCard.replace('{{officeNumber}}', manager.getOfficeNumber());


  fs.writeFileSync('./dist/index.html', mainHTML, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('File created!');
    };
  })  
};

// write sections per job end

// create new constructor functions start
function createManager(name, id, email, officeNumber) {
  const manager = new Manager(name, id, email, officeNumber);
  renderManager(manager);
};

function createEngineer(name, id, email, github) {
  const engineer = new Engineer(name, id, email, github);
  console.log('before renderEngineer');
  renderEngineer(engineer);
  console.log('after renderEngineer');
};

function createIntern(name, id, email, school) {
  const intern = new Intern(name, id, email, school)
  renderIntern(intern)
};
// create new constructor functions end

mgrQuestions();
