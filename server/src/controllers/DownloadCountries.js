const axios = require ("axios")
const { Country } =require ("../db")

const downloadCountries = async (res) =>{
    try{

        const allCountries = await axios("http://localhost:5000/countries")
        let toSendCountries = []
        for (const country of allCountries.data) {
                try{

                    const currentCountry ={
                        id:country.cca3,
                        name:country.name.common,
                        flag:country.flags.svg,
                        capital:Array.isArray(country.capital)?country.capital[0]:"N/A",
                        continent:country.continents,
                        population:country.population,
                        subregion:country.subregion ? country.subregion:null,
                        area:country.area ? Math.ceil(country.area):null
                    }
                    await Country.create(currentCountry);
                    toSendCountries.push(currentCountry)
                }
            
                catch (error){
                    console.log (error)
                }
            };
        console.log ("download function ran")
        return (toSendCountries);
    }
    catch(error){
        throw (error)
    }
}

module.exports = downloadCountries