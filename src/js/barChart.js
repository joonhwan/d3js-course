import {
    select,
    csv,
    max,
    axisLeft, axisBottom,
    format,
    scaleLinear, scaleBand
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
        .range([0, innerWidth]);

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);

    const xAxisTickFormat = number =>
        format('.3s')(number)
            .replace('G', 'B');

    const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);
    const yAxis = axisLeft(yScale)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)
    const yAxisG = g.append('g').call(yAxis)
        .selectAll('.domain, .tick line')
        .remove();
    
    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text('Population');

    g.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());

    g.append('text')
        .attr('y', -10)
        .text('Top 10 Most Populoust Countries');
}


export function run(svg) {
    // csv('data.csv').then((data) => {
    //     data.forEach(d => {
    //         d.population = +d.population * 1000
    //     });
    //     render(svg, data);
    // });
    csv('data.csv').then(data => {
        data.forEach(d => {
            d.population = +d.population * 1000
        })
        // console.log(data);
        render(svg, data)
    })
}