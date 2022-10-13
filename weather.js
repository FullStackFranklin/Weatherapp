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


