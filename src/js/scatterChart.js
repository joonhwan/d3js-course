import {
    select,
    csv,
    max,
    axisLeft, axisBottom,
    format,
    scaleLinear, scaleBand, scalePoint
} from 'd3'

function render(svg, data) {
    const [width, height] = [
        +svg.attr('width'),
        +svg.attr('height')
    ]
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = { top: 50, right: 40, bottom: 75, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])
        .nice()
        ;

    const yScale = scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.7);

    const xAxisTickFormat = number =>
        format('.3s')(number)
            .replace('G', 'B');

    const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);
    
    const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)
    const yAxisG = g.append('g').call(yAxis)
        //.selectAll('.domain, .tick line')
        .selectAll('.domain')
        .remove();
    
    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text('Population');

    g.selectAll('circle')
        .data(data)
        .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', 15);

    g.append('text')
        .attr('y', -10)
        .text('Top 10 Most Populoust Countries');
}


export function run(svg) {
    const url = 'https://vizhub.com/curran/datasets/auto-mpg.csv'
    csv('data.csv').then(data => {
        data.forEach(d => {
            d.population = +d.population * 1000
        })
        // console.log(data);
        render(svg, data)
    })
}