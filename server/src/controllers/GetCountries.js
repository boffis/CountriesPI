const {Country, Activity} = require ('../db')

const getCountries = async () => {
    try{

        const DBList = await Country.findAll({include:Activity})
        let DBList2 = []
        for (const DBCountry of DBList) {
            let country = DBCountry.toJSON()
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
        throw (error)
    }
}

module.exports = getCountries