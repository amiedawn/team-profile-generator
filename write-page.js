'use strict'

const fs = require('fs');
const path = require('path');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const templateFolder = './templates/';
const team = '';

// write sections per job start
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templateFolder, 'manager-template.html'), 'utf8');
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
  let template = fs.readFileSync(path.resolve(templateFolder, 'engineer-template.html'), 'utf8');
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
  let template = fs.readFileSync(path.resolve(templateFolder, 'intern-template.html'), 'utf8');
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

  // generate HTML
  let mainTemplate = fs.readFileSync('./templates/page-template.html', 'utf8');
  const mainHTML = "";
  console.log('before mainhtml');
  mainHTML = mainHTML + mainTemplate.replace(/{{ team }}/g, team);
  console.log('after mainhtml');
  let fileName = path.join(__dirname, 'dist', '/index.html');
  console.log(fileName);
  fs.writeFile(fileName, mainHTML, function (err) {
    if (err) {
      throw new Error(err)
    }
    console.log('File created!');
  });
};



//possibly change path.join to this: path.resolve(templateFolder, 'intern-template.html'


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

module.exports = {
  createManager: createManager,
  createEngineer: createEngineer,
  createIntern: createIntern,
  renderMain: renderMain,
};



