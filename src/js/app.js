// const testModules = require('./test-module');
// require('../css/app.css');
import testModule from './test-module'
import '../css/app.css'
//import { select, csv, scaleLinear, scaleBand, max } from 'd3';
import { 
    select, 
    csv, 
    scaleLinear, 
    scaleBand, 
    max,
    axisLeft,
    axisBottom,
    format
} from 'd3';

/********** Paste your code here! ************/
// console.log('Paste your code here!');
// import * as d3 from 'd3'
// console.log(testModule.hello);
// console.log(d3)

const svg = select('svg')
svg.style('border', '1px dotted lightgray')

// const width = parseFloat(svg.attr('width'))
// const height= parseFloat(svg.attr('height'))
const [width, height] = [
    +svg.attr('width'),
    +svg.attr('height')
]
const side = Math.min(width, height)
console.log(`w=${width}, h=${height}`)
console.log(`side=${side}`)

function render(data) {
    const valueOf = {
        x: d => d.population,
        y: d => d.country
    }
    const margin = {
        top: 70, 
        left: 150,
        right: 80,
        bottom: 70
    }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    console.log('data.map(valueOf.x) --> ')
    console.log(data.map(valueOf.y))
    const scaleX = scaleLinear()
        .domain([0, max(data, valueOf.x)])
        .range([0, innerWidth])
    const scaleY = scaleBand()
        .domain(data.map(valueOf.y))
        .range([0, innerHeight])
        .padding(0.2)
    const axis = {
        x: axisBottom(scaleX)
            //.tickFormat(format('.3s'))
            .tickFormat(d => {
                return format('.3s')(d).replace('G', 'B')
            }),
        y: axisLeft(scaleY)
    }
        
    console.log(scaleX)
    const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        ;
    {
        //yAxis(g.append('g'))
        //xAxis(g.append('g'))
        const x = g.append('g')
            .call(axis.x)
            .attr('transform', `translate(0, ${innerHeight})`)
            ;
        const axisProp = {
            x: {
                width: x.attr('width'),
                height: x.attr('height')
            }            
        }
        console.log(axisProp)
        x.selectAll('.domain, .tick line')
            .remove()
            
        x.append('text')
            .attr('class', 'axis-label')
            .attr('fill', 'black')
            .attr('x', innerWidth/2)
            .attr('y', 50)
            .text('Population')
        
        const y = g.append('g')
            .call(axis.y)
            .selectAll('.domain, .tick line')
                .remove()
            ;

        g.append('text')
            .attr('class','title')
            .attr('y', 0)
            .text('Top 10 Population')
        
        let selection = g
            .selectAll('rect')
            .data(data)
            .enter()
                .append('rect')
                    .attr('y', d => scaleY(valueOf.y(d)))
                    .attr('width', d => scaleX(valueOf.x(d)))
                    .attr('height', d => scaleY.bandwidth())
    }
    
}

csv('data.csv')
    .then(data => {
        data.forEach(elem => {
            elem.population = +elem.population * 1000
        })
        render(data)
    })

