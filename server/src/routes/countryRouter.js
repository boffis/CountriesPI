const { Router } = require ("express")
const countryRouter = Router()

const getCountries = require ('../controllers/GetCountries')
const getCountriesByName = require ('../controllers/GetCountriesByName')
const getCountryById = require ('../controllers/GetCountryById')

countryRouter.get('/name', async (req,res)=>{
    try{
        const list = await getCountriesByName(req)
        res.status(200).send(list)
    }
    catch (error){
        console.log(error)
        res.status(400).send(error)
    }
})

countryRouter.get('/:id', async (req,res)=>{
    try{
        console.log ("helps")
        const country = await getCountryById(req)


        res.status(200).send(country)
    }
    catch (error){
        res.status(400).send(error)
    }
})

countryRouter.get('/', async (req,res)=>{
    try{
        const list = await getCountries()
        res.status(200).send(list)
    }
    catch (error){
        console.log(error)
        res.status(400).send('error')
    }
})

module.exports = countryRouter