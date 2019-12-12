const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path");

const questions = [
    {
      type: 'list',
      name: 'color',
      message: 'Which do you prefer?',
      choices: [
        'green',
        'blue',
        'pink',
        'red'
    
      ]
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your GitHub username?',
      
    }
  ]

inquirer
  .prompt(questions)
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });



  


function writeToFile(fileName, data) {
 
}

// function init() {

// init();
