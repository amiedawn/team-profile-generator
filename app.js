"use strict"

// required node modules
const fs = require("fs");
const inquirer = require("inquirer");

// required local modules
let renderFile = require("./render");
const generateManager = renderFile.createManager;
const generateEngineer = renderFile.createEngineer;
const generateIntern = renderFile.createIntern;
const renderHTML = renderFile.renderMain;

// function to ask the user questions
function askQuestions() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the employee's name?",
    },
    {
      type: "number",
      name: "id",
      message: "What is the employee's ID?",
    }, 
    {
      type: "input",
      name: "email",
      message: "What is the employee's email address?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: ["Manager", "Engineer", "Intern"],
    }
    ])
    .then(
      function ({ name, id, email, role }) {
        switch (role) {
          case "Engineer":
            inquirer.prompt(
              {
                type: "input",
                name: "github",
                message: "What is the employee's GitHub username?",
              }
            )
              .then(
                function ({ github }) {
                  generateEngineer(name, id, email, github);
                  addEmployee();
                }
              )
            break;
          case "Intern":
            inquirer.prompt(
              {
                type: "input",
                name: "school",
                message: "What is the name of the employee's school?",
              }
            )
              .then(
                function ({ school }) {
                  generateIntern(name, id, email, school);
                  addEmployee();
                }
              )
            break;
          case "Manager":
            inquirer.prompt(
              {
                type: "input",
                name: "officeNumber",
                message: "What is the employee's office number?",
              }
            )
              .then(
                function ({ officeNumber }) {
                  generateManager(name, id, email, officeNumber);
                  addEmployee();
                }
              )
            break;
        }
      })
};

// function to add an additional employee to the roster
function addEmployee() {
  inquirer.prompt(
    {
    type: "confirm",
    name: "addEmployee",
    message: "Would you like to add another employee?",
    }
  )
  .then(
    function ({ addEmployee }) {
      console.log("add other members", addEmployee);
      if (addEmployee) {
        askQuestions();
      } else {
        renderHTML();
      }
    }
  )
  .catch(error => console.log('Error while adding an employee!'));
};

// start the questions
askQuestions();