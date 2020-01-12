import '../css/app.css'
import { select,  range } from 'd3';
import {makeRender} from './fruitBowl'

const svg = select('svg')
svg.style('border', '1px dotted lightgray')

const makeFruit = function() {
    let nextId = 0
    return function (type) {
        nextId += 1
        return {
            type,
            id: nextId
        }
    }
}()

const props = {
    fruits: range(5).map(() => makeFruit('apple'))
};

const render = makeRender(svg, props)

render()

/*
[
            () => {
                console.log('eating apple...')
                props.fruits.pop();
            },
            () => {
                console.log('replacing lemon...')
                //props.fruits.push(makeFruit('lemon'))
                props.fruits[2].type = 'lemon'
            }
        ]
        */
const createJobContext = (jobs) => {
    const self = {
        jobs,
        timer: null,
        jobIndex: 0
    }
    const doNext = () => {
        try {
            if (self.jobIndex < self.jobs.length) {
                self.jobs[self.jobIndex]()
                render()
                self.jobIndex += 1;
            }
            if (self.jobIndex >= self.jobs.length) {
                clearInterval(self.timer)
            }    
        } catch (error) {
            console.log(error)
            clearInterval(self.timer)
        }
    }
    const start = (interval) => {
        console.log('start')
        console.log(self)
        self.timer = setInterval(() => doNext.call(self), interval)
    }
    return { ...self, doNext, start }
}
const jobContext = createJobContext([
    () => {
        console.log('eating apple...')
        props.fruits.pop();
    },
    () => {
        console.log('replacing lemon...')
        //props.fruits.push(makeFruit('lemon'))
        props.fruits[2].type = 'lemon'
    },
    () => {
        console.log('eating another apple')
        props.fruits = props.fruits.filter((fruit, index) => index !== 1)
    }
])
console.log(jobContext)
jobContext.start(2000)


// setTimeout(() => {
//     console.log('replacing lemon...')
//     //props.fruits.push(makeFruit('lemon'))
//     props.fruits[2].type = 'lemon'

//      render()
// }, 2000)



