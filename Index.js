'use strict'

// required node modules
const inquirer = require('inquirer');
const fs = require('fs');

// required local modules
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const writeMain = require('./write-page.js');
//const { renderMain } = require('./write-page.js');

//const generateHTML = writeMain.renderMain;
// const generateManager = writeMain.createManager;
// const generateEngineer = writeMain.createEngineer;
// const generateIntern = writeMain.createIntern;

let roster = [];
let manager;
//const templateFolder = './templates/';


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
        answers.mgrOfficeNum
      );
      roster.push(manager);
      console.log('roster', roster);
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
    }
  ])
    .then(answers => {
      // if new employee is an engineer, add a new engineer card
      if (answers.empChoice === 'Engineer') {
        let employee = new Engineer(
          answers.empName,
          answers.empId,
          answers.empEmail,
          answers.engGitHubUsername
        );
        roster.push(employee);
        console.log('roster', roster);
        console.log('pushed emgineer');
        addEmployee();
      }
      // if new employee is an intern, add a new intern card
      else if (answers.empChoice === 'Intern') {
        let employee = new Intern(
          answers.empName,
          answers.empId,
          answers.empEmail,
          answers.internSchool
        );
        console.log(answers.name, answers.id, answers.email, answers.school);
        roster.push(employee);
        console.log('roster', roster);
        console.log('pushed intern');
        addEmployee();
      }
    })
    .catch(error => console.log('Error engineer or intern!'));
};

function addEmployee() {
  inquirer.prompt({
    type: 'confirm',
    name: 'addEmployee',
    message: 'Would you like to add another employee? ',
  })
  .then(answers => {
    // if they want to add another employee, ask the questions again
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
  .catch(error => console.log('Error add employee!'));

  
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
  roster = roster + managerHTML;
  console.log(managerHTML);
  console.log('roster', roster);
};

const renderEngineer = engineer => {
  let template = fs.readFileSync('./templates/engineer-template.html', 'UTF-8');
  const engineerHTML = '';
  engineerHTML = engineerHTML + template.replace(/{{ name }}/g, engineer.getName())
    .replace(/{{ id }}/g, engineer.getId())
    .replace(/{{ email }}/g, engineer.getEmail())
    .replace(/{{ github }}/g, engineer.getGithub())
    .replace(/{{ role }}/g, engineer.getRole())
  roster = roster + engineerHTML;
  console.log(engineerHTML);
  console.log('roster', roster);
};

const renderIntern = intern => {
  let template = fs.readFileSync('./templates/intern-template.html', 'UTF-8');
  const internHTML = '';
  internHTML = internHTML + template.replace(/{{ name }}/g, intern.getName())
    .replace(/{{ id }}/g, intern.getId())
    .replace(/{{ email }}/g, intern.getEmail())
    .replace(/{{ school }}/g, intern.getSchool())
    .replace(/{{ role }}/g, intern.getRole())
  roster = roster + internHTML;
  console.log(internHTML);
  console.log('roster', roster);
};

function renderEmployee(employee) {
  if (employee.getRole() === 'Intern') {
    const internCard = fs.readFileSync('.templates/intern-template.html', 'UTF-8');
    internCard = internCard.replace('{{name}}', employee.getName());
    internCard = internCard.replace('{{role}}', employee.getRole());
    internCard = internCard.replace('{{id}}', employee.getId());
    internCard = internCard.replace('{{email}}', employee.getEmail());
    internCard = internCard.replace('{{school}}', employee.getSchool());
    console.log('roster', roster);
    return internCard;

  } else if (employee.getRole() === 'Engineer') {
    const engCard = fs.readFileSync('./template/engineer-template.html', 'UTF-8');
    engCard = engCard.replace('{{name}}', employee.getName());
    engCard = engCard.replace('{{role}}', employee.getRole());
    engCard = engCard.replace('{{id}}', employee.getId());
    engCard = engCard.replace('{{email}}', employee.getEmail());
    engCard = engCard.replace('{{github}}', employee.getGithub());
    console.log('roster', roster);
    return engCard;
  }
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

  // first card is always the mgrCard
  const empCards = mgrCard;
  for (let i = 0; i < roster.length; i++) {
    let employee = roster[i];
    empCards = empCards + renderEmployee(employee);
  }

  // add any additional cards for other employees
  mainTemplate = mainTemplate.replace('{{empCards}}', empCards);

  fs.writeFileSync('./dist/index.html', mainTemplate, function (err) {
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


