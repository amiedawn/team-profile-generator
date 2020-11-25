const fs = require('fs');

const generatePage = (name, github) => {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};

// 3 arguments are: output file, data being written, and callback function for error handling and success message
fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;
  console.log('Portfolio complete! See index.html for output!');
});