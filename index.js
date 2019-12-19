const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const htmlPage = require("./generateHTML.js");
const axios = require('axios');
const convertFactory = require('electron-html-to');

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
    getuser(answers.color, answers.username)
  });
  

  // Make a request for a user with a given ID
  const getuser = (color, username) => {
  axios.get(`https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    .then(function (response) {
      // handle success
      console.log(response);
      return htmlPage({color, username})
    })
    .then (function(htmlPage){
      var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
      });
       
      conversion({ html: htmlPage }, function(err, result) {
        if (err) {
          return console.error(err);
        }
       
        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream(path.join(__dirname, 'nameofPDF.pdf')));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  };

  
    
 

  
// function init() {

// init();
