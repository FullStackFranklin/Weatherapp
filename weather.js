let aCityList = [];//store array search list
const ulCityList = document.getElementById('historyList');//unordered list city data
const nMaxHistoryStored=5; //sets the number of stored history items to only 5
const sApiKey='2679b512ffea0aa250ddb289f6418fe6'; //string is an API key being used to fetch data
let sUrlApi; //url api data will be in string format



document.getElementById('submit').addEventListener("click", function () {
    const sCityName = document.getElementById("search").value;
    validateUserInput(sCityName);

});

//Ensure user input has valid city name and length
function validateUserInput(sCityName) {
    if (sCityName === null || sCityName.length < 4) 
        return; //will stop the function based on above params
    readCityLocation(sCityName);
    
}
//Stores user history in list item format 
function storeUserHistory(sCityName){
//console.log(sCityName);
    if(aCityList.length >= nMaxHistoryStored) //validate history length
        removeOldHistory(); 
        aCityList.push(sCityName); //add to list array
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
    for (let index = aCityList.length-1; index >= 0 ; index--) {//for statement to reverse loop to create elements
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