import '../css/app.css'
import { select,  range } from 'd3';
import { makeRender } from './fruitBowl'
import { runJobs } from './jobcontext'

export function run(svg) {

    const makeFruit = function () {
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

    runJobs([
        () => {
            console.log('eating apple...')
            props.fruits.pop();
            render()
        },
        () => {
            console.log('replacing lemon...')
            //props.fruits.push(makeFruit('lemon'))
            props.fruits[2].type = 'lemon'
            render()
        },
        () => {
            console.log('eating another apple')
            props.fruits = props.fruits.filter((fruit, index) => index !== 1)
            render()
        }
    ], 2000)
}