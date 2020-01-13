console.log('init jobcontext.js')
export function createJobContext(jobs) {
    const self = {
        jobs,
        timer: null,
        jobIndex: 0
    }
    const doNext = () => {
        try {
            if (self.jobIndex < self.jobs.length) {
                self.jobs[self.jobIndex]()                
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

export function runJobs(jobs, interval=1000) {
    const jobContext = createJobContext(jobs)
    jobContext.start(interval)
}