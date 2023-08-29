const { Router } = require ("express")
const activityRouter = Router()

const getActivities = require ('../controllers/GetActivities')
const postActivity = require ('../controllers/PostActivity')

activityRouter.get('/', async (req, res)=>{
    try{
        
        const activityArray = await getActivities()

        res.status(200).send(activityArray)
    }
    catch (error) {
        console.log (error)
        res.status(400).send(error)
    }
})

activityRouter.post('/', async (req, res)=>{
    try{
        await postActivity(req)
        res.status(200).send("OK")

    }
    catch (error) {
        console.log (error)
        res.status(400).send(error)
    }
})

module.exports = activityRouter;