const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const { getCiphers } = require('crypto')

const port = 3000
const app = express()


//Define paths for express config
//publicServepage is deprecated here as we moved the system to the bew file structs
const publicServePage = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine adn views location
hbs.registerPartials(partialsPath)

app.set('views', viewsPath)
app.set('view engine','hbs')




//Setup static directory to charge
//this app.use is not used after we change it
app.use(express.static(publicServePage))

app.get('', (req, res) =>{
    //not use res.send
    res.render('index', {
        title: 'Weather App',
        name: 'Android Dev'
    })
})
.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help Page',
        desc: 'Man page for help',
        name: 'Ahambarish Saikia'
    })
})
.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        desc: 'This page is for introducing the team and developers',
        name: 'Ahambarish Saikia'
    })
})
.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'No address provided'
        })
    }
 
    geocode(req.query.address, (error, {lat, long, loc} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(lat, long, (error, weatherData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast : weatherData,
                loc,
                address: req.query.address
            })
        })
    })



    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.body.address
    // })

    // res.render('weather', {
    //     forecast : 'It is snowing a bit',
    //     location: 'Philadelphia',
    //     name: 'Ahambarish Saikia'
    // })
})
.get('/prod', (req, res) => {
    if(!req.query.search) {}
})
.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahambarish Saikia',
        errorMessage: 'Help article not found'
    })
})
.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahambarish Saikia',
        errorMessage: 'Page not found'
    })
})



app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})

