export default function (newActivity) {
    let errors = {}
    const {name, difficulty, duration, season, countries} = {newActivity}
    if (name.length === 0) {
        errors.name = "please add a name"
    } 

    if (difficulty> 5 || difficulty< 0) {
        errors.difficulty = "difficulty must be between 1 and 5"
    }

    if (!isNumeric(duration)) {
        errors.duration = "duration must be a number"
    }

    if (season.length === 0) {
        errors.season = "please add at least one season"
    }

    if (countries.length === 0) {
        errors.countries = "please add at least one country"
    }
}