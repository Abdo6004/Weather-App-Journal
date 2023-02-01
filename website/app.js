// Personal API Key for OpenWeatherMap API
const apiKey = '07df29db816fbb87d133f78cad509793&units=imperial';
// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate').addEventListener('click',generateData)

/* Global Variables */
let myUrl;
let myTemp;
let feelings;
let zipCode;
let myData = {};

/* Function called by event listener */
async function generateData(){
    // Getting the Zip Code
    zipCode=document.getElementById('zip').value;
        // Getting Feelling
    feelings=document.getElementById('feelings').value;
    // Assigning the url to a variable with the zipcode value enterd from user
    myUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=` 
    // Calling function to fetch my url using the zip value taken from above
    await gettingData(myUrl,apiKey);
    // Assinging the temp, feeling and data to variable
    myData ={
        Temp: myTemp,
        Feel: feelings,
        Data: newDate
    }
    // Sending Data to My Local Server
    await postData ('/Post',myData)
    // retrive Data Local Server
    await retrieveData()
};

/* Function to GET Web API Data*/
async function gettingData (myUrl,apiKey){
    const fetchingUrl = await fetch(myUrl+apiKey)
    try{
        // Transform into object
        myObject = await fetchingUrl.json();
        // Getting the temp Value
        myTemp = myObject.main.temp
        // Returning the value of temp to use it in another function
        return myTemp;
        } 
        catch(error){
            console.log('error')
            // appropriately handle the error
        }
    }

/* Function to POST data */
async function postData(route,data){
    const res = await fetch (route, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        // Transform data into String
        body: JSON.stringify(data),
    })
    .then((response) => {response.json()})
    // .then((response) =>{
    //     console.log('Success:', response); // remove Success
    //     })
}

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/Get');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.Temp)+'°';
    document.getElementById('content').innerHTML = allData.Feel;
    document.getElementById("date").innerHTML =allData.Data;
    }
    catch(error) {
    console.log("error");
      // appropriately handle the error
    }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();