const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index:  (req, res) => {
        const profile = Profile.get()
        const jobs = Job.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updateJobs = Job.get().map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            statusCount[status] += 1;

            jobTotalHours = status == 'progress' ?  jobTotalHours + Number(job["daily-hours"] ) : jobTotalHours
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })  
        const freeHours = profile["hours-per-day"] - jobTotalHours;
    
        return res.render("index", {jobs: updateJobs, profile: Profile.get(), statusCount: statusCount, freeHours: freeHours})
    }
}

