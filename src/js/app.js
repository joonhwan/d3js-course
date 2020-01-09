// const testModules = require('./test-module');
// require('../css/app.css');
import testModule from './test-module'
import '../css/app.css'
import * as d3 from 'd3'

/********** Paste your code here! ************/

console.log('Paste your code here!');
console.log(testModule.hello);
console.log(d3)

const svg = d3.select('svg')
svg.style('background-color', 'green')