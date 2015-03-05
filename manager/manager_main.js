


var version = "0.0.1";

var fBRef = null

var hasFBData = false;
var data = null;

var planetArray1 = [];
var planetArray2 = [];

var planetArrayGlobal = [planetArray1,planetArray2] // all is by ref

var getFBDataTimout;

var commRoutesArray = [];

function Planet(factionNumber,name,playerName,posX,posY,posZ,secteur){
    
    this["faction"] = factionNumber;
    this["name"] = name;
    this["playerName"] = playerName;
    this["posX"] = posX;
    this["posY"] = posY;
    this["posZ"] = posZ;
    this["secteur"] = secteur;
}

function CommRoute(name1,name2,name3,name4,dits,income,pop,idf1,idf2,b1id,b2id) {
    this.p1Name = name1;
    this.p2Name = name2;
    this.b1Name = name3;
    this.b2Name = name4;
    this.dist = dist;
    this.income = income
    this.pop = pop
    this.factionId1 = idf1;
    this.factionId2 = idf2;
    this.b1id = b1id;
    this.b2id = b2id;
}

function managerInit(){
    
    
    
    //getDataFormFireBase()
    
    drawHTMLPage();
    drawInterfaceInit();
    
    
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
    
    //alert($("field1").value)
    planetArray1 = searchListe(snapshot.val()["planetData"],[$("field1").value],[$("input1").value],$("checkBox1").checked);
   
    
    drawInterface();
}

function searchListe2(){
    
    //$("liste2Container")
    
    getDataFormFireBase(searchListe2Callback)
    //searchListe($("input2").value,$("checkBox2").checked,planetArray2);
}

function searchListe2Callback(snapshot){
    planetArray2 = searchListe(snapshot.val()["planetData"],[$("field2").value],[$("input2").value],$("checkBox2").checked);
    
    drawInterface();
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
                
                
                if (list[i][fieldNameArray[j]] == undefined || list[i][fieldNameArray[j]].search(searchTextArray[j]) == -1 ) {
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

function computeCommRoutes(){
    commRoutesArray = computeCommRoutesFormArray(planetArray1,planetArray2)
}

function computeCommRoutesFormArray(a1,a2){
    var returnRouteCommArray = []
    for (var i in a1){
        for (var j in a2){
            
            if (a1[i]["id"]!= a2[j]["id"]) {
                returnRouteCommArray.push(new CommRoute(a1[i]["playerName"],a2[j]["playerName"],a1[i]["name"],a1[j]["name"],getDist(a1[i],a2[j]),getIncome(a1[i],a2[j]),getPop(a1[i],a2[j]),a1[i]["faction"],a2[j]["faction"],a1[i]["id"], a2[j]["id"]))
            }
            
        }
    }
    
    return returnRouteCommArray;
    
}

function getDist(pla1,pla2){
    return (pla1["posX"]-pla2["posX"] ) + (pla1["posY"]-pla2["posY"])
}