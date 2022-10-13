let aCityList = [];//store array search list
const ulCityList = document.getElementById('historyList');
const nMaxHistoryStored=5;
const sApiKey='b770f57e978766f2053f83e0edd11415';
let sUrlApi;
document.getElementById('submit').addEventListener("click", function () {
    const sCityName = document.getElementById("search").value;
    validateUserInput(sCityName);
});

//Ensure user input has valid city name and length
function validateUserInput(sCityName) {
    if (sCityName === null || sCityName.length < 4) 
        return; 
    readCityLocation(sCityName);
}
//Stores user history in list item format 
function storeUserHistory(sCityName){
    if(aCityList.length>=nMaxHistoryStored)//validate history lenght
        removeOldHistory();
    aCityList.push(sCityName);//add to list array
    setLocalStorage();
    cleanList();
    loadHistory();
    //clears and focus search input
    document.getElementById("search").value='';
    document.getElementById("search").focus();
}
//loads city history
function loadHistory() {
    aCityList = localStorage.getItem('CityH') ? localStorage.getItem('CityH').split(',') : [];
    for (let index = aCityList.length-1; index >= 0 ; index--) {//revere loop to create elements
        const sCityNameLoop = aCityList[index];
        createHistoryItem(sCityNameLoop);
    }
}
//creates element for city name
function createHistoryItem(sCityName){
    let liComp = document.createElement('li');//create Li
    liComp.appendChild(document.createTextNode(sCityName))//Add text to LI
    ulCityList.appendChild(liComp);//ADD li to Ul
}
//Cleans Ul element
function cleanList(){
    ulCityList.innerHTML='';
}
//Removes oldest search city
function removeOldHistory(){
    aCityList.shift();
    setLocalStorage();
    loadHistory();
}
//Store information on LS
function setLocalStorage(){
    localStorage.setItem('CityH', aCityList);
}

/** API **/
//read city lat log
function readCityLocation(sCityName) {
    let nLat, nLong;
    sUrlApi='http://api.openweathermap.org/geo/1.0/direct?q='+sCityName+'&limit=1&appid='+sApiKey;
    fetch(sUrlApi)
    .then(function(response){ return response.json()})
    .then(function(aResp){
        if(aResp.length>0){//if the api found the information
            nLat = aResp[0].lat;
            nLong = aResp[0].lon;
            storeUserHistory(sCityName);
            readCityForecast(sCityName, nLat, nLong);
        }
    });
}
//read forecast data
function readCityForecast(sCityName, nLat, nLong) {
    let aListForecast;
    sUrlApi='https://api.openweathermap.org/data/2.5/forecast?lat='+nLat+'&lon='+nLong+'&units=imperial&appid='+sApiKey;
    fetch(sUrlApi)
    .then(function(response){ return response.json()})
    .then(function(oResp){
        aListForecast = oResp.list;
        processForecast(sCityName, aListForecast);
        createForecastCard(aListForecast);
    });
}
//Process data sent by the api
function processForecast(sCityName, aListForecast){
    let oMainData = aListForecast[0],











//Loads history on page ready
loadHistory();

