const {Activity, Country} = require ('../db')

const postActivity = async (req) => {
    try {
        let toPostActivity = {
            name:req.body.name,
            difficulty:req.body.difficulty,
            season:req.body.season,
            duration:req.body.duration?req.body.duration:null
        }

        const DBActivity = await Activity.create (toPostActivity)

        let countryArray = []

        for (const country of req.body.countries) {
            const countryModel = await Country.findOne({where:{name:country}})
            countryArray.push(countryModel)
        }

        await DBActivity.addCountries(countryArray)

    }
    catch (error) {
        console.log (error)
        throw (error)
    }
}

module.exports = postActivity