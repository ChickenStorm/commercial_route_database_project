


var version = "0.0.1";

var fBRef = null

var hasFBData = false;
var data = null;

var planetArray1 = [];
var planetArray2 = [];

var planetArrayGlobal = [planetArray1,planetArray2] // all is by ref

var getFBDataTimout;

function Planet(factionNumber,name,playerName,posX,posY,posZ,secteur){
    
    this["faction"] = factionNumber;
    this["name"] = name;
    this["playerName"] = playerName;
    this["posX"] = posX;
    this["posY"] = posY;
    this["posZ"] = posZ;
    this["secteur"] = secteur;
}

function managerInit(){
    
    
    
    //getDataFormFireBase()
    
    drawHTMLPage();
    drawInterface();
    
}



function firebaseLoadRef(){
    return new Firebase("https://databaseforasylamba.firebaseio.com/");
}

function getDataFormFireBase(callBack){
    //hasFBData = false;
    if (fBRef != null) {
        fBRef.off()
    }
    
    fBRef = firebaseLoadRef();

    fBRef.once("value",function(snapshot){clearTimeout(getFBDataTimout);callBack(snapshot)});
    getFBDataTimout = setTimeout(getDataFormFireBaseTimeout,10000);
}

/*function setData(snapshot){
    data = snapshot.val();
    hasFBData = true;
}*/

function getDataFormFireBaseTimeout(){
    fBRef.off();
    alert("request timeout");
}

//--------------------------------------------------




//--------------------------------------------------




function searchListe1(){
    //$("liste1Container")
    
    getDataFormFireBase(searchListe1Callback);
    
    //searchListe($("input1").value,$("checkBox1").checked,planetArray1);
}

function searchListe1Callback(snapshot){
    
    
    planetArray1 = searchListe(snapshot.val()["planetData"],["playerName"],[$("input1").value],$("checkBox1").checked);
   
    
    drawInterface()
}

function searchListe2(){
    
    //$("liste2Container")
    
    getDataFormFireBase(searchListe2Callback)
    //searchListe($("input2").value,$("checkBox2").checked,planetArray2);
}

function searchListe2Callback(snapshot){
    planetArray2 = searchListe(snapshot.val()["planetData"],["playerName"],[$("input2").value],$("checkBox2").checked);
    
    drawInterface()
}

function searchListe(list,fieldNameArray,searchTextArray,doRegExpInput,arrayToSave){ 
    var regExpArray = [];
    
    arrayToSave  = null;
    arrayToSave = [];
    
    if (searchTextArray.length != fieldNameArray.length) {
        throw "maivaise entree pour searchListe(...) ";
    }
    
    if (doRegExpInput) {
        for(var i =0;i< searchTextArray.length;++i){
            regExpArray[i] = new RegExp(searchTextArray[i]);
        }
    }
    
    
    for (var i in list){
        var matchSearch = true;
        
        if (doRegExpInput) {
            for (var j=0;j < regExpArray.length ; ++j) {
                if (! regExpArray[j].test(list[i][fieldNameArray[j]])) {
                    matchSearch = false;
                }
            }
        }
        else{
            for (var j=0;j < searchTextArray.length ; ++j) {
                if (list[i][fieldNameArray[j]].search(searchTextArray[j]) == -1 ) {
                    matchSearch = false;
                }
            }
        }
        
        
        if (matchSearch) {
            list[i]["id"] = i;
            arrayToSave.push(list[i]);
        }
        
    }
    
    return arrayToSave;
    
}