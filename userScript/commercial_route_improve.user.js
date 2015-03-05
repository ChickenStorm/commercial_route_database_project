// ==UserScript==
// @name         commercial_route_improve
// @version      0.0.1
// @description  commercial_route_improve.user
// @author       ChickenStorm
// @match        http://game.asylamba.com/beta/bases
// @match        http://game.asylamba.com/beta/bases/view-main
// @grant        none
// ==/UserScript==


// buggy version


var firebaseCallback = function(DataSnapshot){
    alert("");
}

function buttonFunction(){
    try{
        //alert();
        
        var idDiv2;
        var d = document.getElementsByTagName("div"); // l'ensemble des div
        
        
        var data =[]
        
        
        regExp = new RegExp("[0-9]");
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        var idDiv3
        for(var i in d){ // recherche dans les elements
            if (d[i].className == "toolbar") {
                //alert(i)
                idDiv3 = i;
            }
        }
        var text4 = ""
        
        text4 = d[idDiv3].innerHTML
        
        //var posa = text4.search('"');
        
        var posb = text4.search('">')
        
        var j = posb-1;
        
        var text5 = "";
        while(j> 0 && regExp.test(text4[j]) ){
            text5 = text4[j]+text5;
            --j;
        }
        
        //alert(text5)
        
        
        var id = parseInt(text5);
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        for(var i in d){ // recherche dans les elements
            if (d[i].className == "info middle") {
                //alert(i)
                idDiv2 = i;
            }
        }
        //text1 = ""
        var text1 = d[idDiv2].innerHTML;
        
        var pos1 = text1.search("<strong>");
        var pos2 = text1.search("</strong>");
        
        text1 = text1.substring(pos1+9,pos2); // j'enleve la parenthese (
        
        
        text1.replace(" ","")
        regExp = new RegExp("[0-9]");
        
        
        var text2= "";
        for (var i in text1){ 
            if(! regExp.test(text1[i]) &&  text1[i]!=" " ){
                text2 += ":";
            }
            else if (text1[i]!=" "){
                text2 += text1[i];
            }
            
        }
        
        
        
        var array1 = text2.split(":")
        //alert(array1);
        
        data["secteur"] = array1[0]
        data["posX"] = array1[1]
        data["posY"] = array1[2]
        data["posZ"] = array1[3]
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        
        
        var input = document.getElementsByTagName("input");
        var idIn1
        for(var i in input){ // recherche dans les elements
            if (input[i].name == "name") {
                //alert(i)
                idIn1 = i;
            }
        }
        data["name"] = input[idIn1].value
        
        
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        
        body = document.getElementsByTagName("body")[0]
        
        var faction = body.className[5]
        data["faction"] = faction;
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        for(var i in d){ // recherche dans les elements
            if (d[i].className == "info bottom") {
                //alert(i)
                idDiva = i;
            }
        }
        //text1 = ""
        var texta = d[idDiva].innerHTML;
        
        pos1 = texta.search("<strong>");
        pos2 = texta.search("</strong>");
        
        texta = texta.substring(pos1+8,pos2);
        for(var i = 0 ;i<2;++i){
            texta = texta.replace(" ","");
        }
        
        //alert(texta+":"+parseInt(texta));
        data["pop"] = parseInt(texta);
        ////////////////////////////////////////////////////////////////////////////////////////////
        var text3 = document.getElementsByTagName("head")[0].innerHTML;
        //alert(text3)
        pos1 = text3.search("<title>");
        pos2 = text3.search("</title>");
        
        text3 = text3.substring(pos1,pos2);
        
       
        array2 = text3.split("—")
        data["playerName"] = array2[1].substring(1,array2[1].length-1);
        
        
        
        // get all the data in the page
        
        fireBaseRef = firebaseLoadRef();
        
        
        fireBaseRef.child("planetData").child(id).set(data)
    }
    catch(e){
        alert(e)
    }
    
}

function firebaseLoadRef(){
    return new Firebase("https://databaseforasylamba.firebaseio.com/");
}
function init(){
   
    //firebaseLoadRef()
    
    //firebaseRef.once("value",firebaseCallback)
    var idDiv;  // là ou je veux mettre le boutton
    var d = document.getElementsByTagName("div") // l'ensemble des div
    
    
    for(var i in d){ // recherche dans les elements
        if (d[i].className == "build-item base-type") {
            //alert(i)
            idDiv = i;
        }
    }
    
    d[idDiv].innerHTML += "<button onclick='buttonFunction()'>partage</button>";
    
}

function preinit(){
    window.$("head").append("<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>"); // charge firebase
    window.$("head").append("<script>"+buttonFunction+";var firebaseRef;"+firebaseLoadRef+"</script>"); // peti truc mettre la fonction comme donne sont code sous form string
    
    
    setTimeout(init,1000); // il faut laisse le temps à la page de charge
    
}
preinit();
//init();


//


    //<script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>