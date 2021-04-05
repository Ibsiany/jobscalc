module.exports = {
    remainingDays(job) {
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)
        const timeDiffInMs = dueDate - Date.now()
        const dayInMS = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs/dayInMS)
        
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}