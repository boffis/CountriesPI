const { Router } = require("express");
const activityRouter = require ('./activityRouter')
const countryRouter = require ('./countryRouter')
const router = Router();


router.use('/countries', countryRouter)

router.use('/activities', activityRouter)


module.exports = router;
