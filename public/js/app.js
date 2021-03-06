

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent =''
        if(data.error) {
            messageOne.textContent = data.error
            // console.log(data.error)
        } else {
            messageOne.textContent = data.loc
            weatherDesc = 'It is a '+data.forecast.desc+ ' day. With a temparature around '+ data.forecast.temperature+'C also with humidity feels like '+ data.forecast.feellike+ 'C.'
            messageTwo.textContent = weatherDesc
            console.log(data.loc)
            console.log(data.forecast)
        }
    })
})
})