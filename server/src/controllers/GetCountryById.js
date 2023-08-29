const {Country, Activity} = require ('../db')



const getCountryById = async (req) =>{
    try {
        const {id} = req.params
        let country = await Country.findOne ({where:{id:id.toUpperCase()}, include:Activity})
        
        let JSONCountry = country.toJSON()

        let activityArray = []
        for (const activity of JSONCountry.activities) {
            activityArray.push(activity.name)
        }
        country.activities = activityArray
        
        return (JSONCountry)
    }
    catch{
        throw (error)
    }
}


module.exports = getCountryById