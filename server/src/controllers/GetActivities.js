const {Country, Activity} = require ('../db')

const getActivities = async () => {
    try{
        const DBList = await Activity.findAll({include:Country})
        let DBList2 = []
        for (const DBactivity of DBList) {
            let activity = DBactivity.toJSON()
            let countryArray = []
            for (const country of activity.countries) {
            countryArray.push(country.name)
            }
            activity.countries = countryArray
            DBList2.push (activity)
        }
        
        return (DBList2)
    }
    catch (error) {
        throw (error)
    }
}

module.exports = getActivities