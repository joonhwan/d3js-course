import { scaleOrdinal } from 'd3'

const colorScale = scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range(['#e0372b', 'yellow'])

const radiusScale = scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range([50, 30])

export function makeRender(svg, props) {
    const [width, height] = [
        +svg.attr('width'),
        +svg.attr('height')
    ]
    return function (selection, fruits) {
        selection = selection || svg
        //console.log(`props.fruits = ${props.fruits.length} ea`)
        fruits = fruits || props.fruits
        
        const circles = selection.selectAll('circle').data(fruits);
        // circles.enter()
        //     .append('circle') 
        //     .attr('cx', (d, i) => {
        //         //console.log(d)
        //         return i * 120 + 60;
        //     })
        //     .attr('cy', height / 2)
        //     .attr('fill', d => colorScale(d.type))
        //     .attr('r', d => radiusScale(d.type))
        // circles
        //     .attr('fill', d => colorScale(d.type))
        //     .attr('r', d => radiusScale(d.type))    
        // circles.exit()
        //     .remove()
        circles.enter()
            .append('circle')
            .attr('cx', (d, i) => {
                //console.log(d)
                return i * 120 + 60;
            })
            .attr('cy', height / 2)
            .attr('r', 0)
            .merge(circles)
            .attr('fill', d => colorScale(d.type))            
            .transition().duration(1000)
            .attr('r', d => radiusScale(d.type))
            
        circles.exit()
            .transition().duration(1000)
                .attr('r', 0)
            .remove()
    }

}