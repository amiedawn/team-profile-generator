"use strict"

// required node modules
const fs = require("fs");

// required local modules
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

let roster = "";

// functions to create new Constructors START
function createManager(name, id, email, officeNumber) {
  const manager = new Manager(name, id, email, officeNumber);
  renderManager(manager);
};

function createEngineer(name, id, email, github) {
  const engineer = new Engineer(name, id, email, github);
  renderEngineer(engineer);
};

function createIntern(name, id, email, school) {
  const intern = new Intern(name, id, email, school);
  renderIntern(intern);
};
// functions to create new Constructors END

// functions to render html for each role START
const renderManager = manager => {
  let template = fs.readFileSync("./templates/manager-template.html", "UTF-8");
  let mgrCard = "";
  mgrCard = mgrCard + template.replace(/{{ name }}/g, manager.getName())
    .replace(/{{ role }}/g, manager.getRole())
    .replace(/{{ email }}/g, manager.getEmail())
    .replace(/{{ id }}/g, manager.getId())
    .replace(/{{ officeNumber }}/g, manager.getOfficeNumber())
  roster = roster + mgrCard;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync("./templates/engineer-template.html", "UTF-8");
  let engCard = "";
  engCard = engCard + template.replace(/{{ name }}/g, engineer.getName())
    .replace(/{{ role }}/g, engineer.getRole())
    .replace(/{{ email }}/g, engineer.getEmail())
    .replace(/{{ id }}/g, engineer.getId())
    .replace(/{{ github }}/g, engineer.getGitHub())
  roster = roster + engCard;
};

const renderIntern = intern => {
  let template = fs.readFileSync("./templates/intern-template.html", "UTF-8");
  let internCard = "";
  internCard = internCard + template.replace(/{{ name }}/g, intern.getName())
    .replace(/{{ role }}/g, intern.getRole())
    .replace(/{{ email }}/g, intern.getEmail())
    .replace(/{{ id }}/g, intern.getId())
    .replace(/{{ school }}/g, intern.getSchool())
  roster = roster + internCard;
};
// functions to render html for each role END

// function to generate the mainTemplate of the roster
function renderMain() {
  let mainTemplate = fs.readFileSync("./templates/page-template.html", "UTF-8");
  let mainHTML = "";
  mainHTML = mainHTML + mainTemplate.replace(/{{ team }}/g, roster);
  
  // write index.html file to display roster
  fs.writeFile("./dist/index.html", mainHTML, function (err) {  
    if (err) {
      console.log(err);
    } else {
      console.log("File created!");
    }  
  });
};

module.exports = {
  createManager,
  createEngineer,
  createIntern,
  renderMain
};
