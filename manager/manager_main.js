


var version = "0.0.1.1";

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

function CommRoute(name1,name2,name3,name4,dist,income,pop,idf1,idf2,b1id,b2id,prix) {
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
    this.price = prix;
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
    try{
        commRoutesArray = computeCommRoutesFormArray(planetArray1,planetArray2);
        drawInterface();
    }
    catch(e){
        alert(e);
    }
}

function computeCommRoutesFormArray(a1,a2){
    var returnRouteCommArray = []
    for (var i in a1){
        for (var j in a2){
            
            if (a1[i]["id"]!= a2[j]["id"]) {
                returnRouteCommArray.push(new CommRoute(a1[i]["playerName"],a2[j]["playerName"],a1[i]["name"],a1[j]["name"],getDist(a1[i],a2[j]),getIncome(a1[i],a2[j]),getPop(a1[i],a2[j]),a1[i]["faction"],a2[j]["faction"],a1[i]["id"], a2[j]["id"],getPrice(a1[i],a2[j])))
            }
            
        }
    }
    
    return returnRouteCommArray;
    
}

function getDist(pla1,pla2){
    return Math.floor(Math.max(Math.sqrt(Math.pow( parseInt(pla1["posX"])-parseInt(pla2["posX"]) ,2) + Math.pow(parseInt(pla1["posY"])-parseInt(pla2["posY"]),2) ),1));
}

function getPop(pla1,pla2){
    return parseInt(pla1["pop"]) + parseInt(pla2["pop"]);

}

function getIncome(pla1,pla2){
    /**
     *
      prix = dst * pop * 28,
            revenu = dst * pop * 0.15,
            faction = $("body").attr("class").match(/color\d+(?: |$)/)[0];
        revenu *= ($myBase.data("pos-secteur") != $otherBase.data("pos-secteur")) ? 1.3 : 1;
        revenu *= ($myBase.data("faction") != $otherBase.data("faction")) ? 1.6 : 1;
        if ($("body").hasClass("color3")) {
     */
    
    multCoef = 1;
    
    if (pla1["secteur"]!=pla2["secteur"]) {
        multCoef *= 1.3;
    }
    if (pla1["faction"]!=pla2["faction"]) {
        multCoef *= 1.6;
    }
    //alert(getPop(pla1,pla2))
    return Math.round(getDist(pla1,pla2)*getPop(pla1,pla2) * 0.15 / Math.pow(10,6) * multCoef);
    
}

function getPrice(pla1,pla2) {
    return Math.round(getDist(pla1,pla2)*getPop(pla1,pla2) * 28/Math.pow(10,6));
}