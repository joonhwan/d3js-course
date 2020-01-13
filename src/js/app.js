import '../css/app.css'
import { select,  range } from 'd3';
import { makeRender } from './fruitBowl'
import { runJobs } from './jobcontext'

const svg = select('svg')
svg.style('border', '1px dotted lightgray')

// import { run } from './appleLemonTransition'
// run(svg)

import { run } from './scatterChart'
run(svg)