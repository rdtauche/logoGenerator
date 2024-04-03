const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let logoDetails = {
  text: '',
  textColor: '',
  shape: '',
  shapeColor: ''
};

const questions = [
  {
    query: 'Enter text (up to three characters): ',
    handler: (answer) => {
      logoDetails.text = answer.substring(0, 3); // Limit to 3 characters
    }
  },
  {
    query: 'Enter text color (keyword or hex): ',
    handler: (answer) => {
      logoDetails.textColor = answer;
    }
  },
  {
    query: 'Choose a shape (circle, triangle, square): ',
    handler: (answer) => {
      logoDetails.shape = ['circle', 'triangle', 'square'].includes(answer.toLowerCase()) ? answer.toLowerCase() : 'circle';
    }
  },
  {
    query: 'Enter shape color (keyword or hex): ',
    handler: (answer) => {
      logoDetails.shapeColor = answer;
    }
  }
];

function askQuestion(index = 0) {
  if (index === questions.length) {
    generateSVG();
    return;
  }

  rl.question(questions[index].query, (answer) => {
    questions[index].handler(answer);
    askQuestion(index + 1);
  });
}

function generateSVG() {
  const { text, textColor, shape, shapeColor } = logoDetails;
  const svgHeader = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  let shapeSVG = '';

  switch (shape) {
    case 'circle':
      shapeSVG = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeSVG = `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeSVG = `<rect x="100" y="50" width="100" height="100" fill="${shapeColor}" />`;
      break;
  }

  const textSVG = `<text x="150" y="125" font-family="Arial" font-size="20" fill="${textColor}" text-anchor="middle">${text}</text>`;
  const svgFooter = `</svg>`;

  const svgContent = `${svgHeader}${shapeSVG}${textSVG}${svgFooter}`;

  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) throw err;
    console.log('Generated logo.svg');
    rl.close();
  });
}

askQuestion();
