let aCityList = [];//store array search list
const ulCityList = document.getElementById('historyList');//unordered list city data





document.getElementById('submit').addEventListener("click", function () {
    const sCityName = document.getElementById("search").value;
    validateUserInput(sCityName);

});

//Ensure user input has valid city name and length
function validateUserInput(sCityName) {
    if (sCityName === null || sCityName.length < 4) 
        return; 
    storeUserHistory(sCityName);
}
//Stores user history in list item format 
function storeUserHistory(sCityName){
//console.log(sCityName);
}

