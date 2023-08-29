const { Op } = require('sequelize')
const {Country, Activity} = require ('../db')

const getCountriesByName = async (req) => {
    try {
        const {name} = req.query
        const DBList = await Country.findAll({where:{name:{[Op.iLike]:`%${name}%`}},include:Activity})
        let DBList2 = []
        for (const DBCountry of DBList) {
            const country = DBCountry.toJSON()
            let activityArray = []
            for (const activity of country.activities) {
                activityArray.push(activity.name)
            }
            country.activities = activityArray
            DBList2.push(country)
        }
        return (DBList2)
    }
    catch (error) {

        throw (new Error(error.message))
    }
}

module.exports = getCountriesByName