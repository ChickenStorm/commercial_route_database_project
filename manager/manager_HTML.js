/*


Copyright 2014-2015 ChickenStorm

This file is part of Commercial route database.

 This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


*/


var factionColorArray;

function getHTMLTable(arrayToDisapay,arrayStyle) { // ceci prend deux array 2-dimentionelle et retourne un tableau en html
    var tempTextTable = "<table style='background-color :white' >";
    
    for (var i in arrayToDisapay) {
        var iS = i;
        tempTextTable = tempTextTable +"<tr>";
        
        for (var j in arrayToDisapay[i]) {
            ///var temp = ""
            
            var jS = j; // because j in in arrayToDisapay[i] and same for i in arrayToDisapay                                                               &eacute; in utf-8
            tempTextTable = tempTextTable +"<td style='border:solid; border-width: thin; "+ arrayStyle[iS][jS]+" ' >" + (arrayToDisapay[i][j]) + "</td>";
            
        }
        
        tempTextTable = tempTextTable +"</tr>";
    }
    
    tempTextTable = tempTextTable + "</table>" ;
    return tempTextTable;
}



function drawHTMLPage(){
    
    var HTMLText = " <div style =' position:relative;text-align: center;display: inline-block; ' id='generalInfos' > Version "+ version +" </div> <div style =' position:absolute;text-align: center;display: inline-block;' id='author' > </div>"
    
    HTMLText += " <div style =' position:absolute;display: inline-block; ' id='liste1Container' > </div> <div style =' position:absolute;display: inline-block; ' id='liste2Container' > </div> "
    HTMLText += "<div id='commRoutesTableCointainer' style ='position:absolute;display: inline-block;' >  </div>"
    
    
    $("body").innerHTML += HTMLText;
    
    
    // position
}

function getFactionName(id){

    if (id==1) { // i don't like switch
        return "Empire"
    }
    else if(id==2){
        return "Kovahk"
    }
    else if(id==3){
        return "N&eacute;gore"
    }
    else if(id==4){
        return "Cardan"
    }
    else if(id==5){
        return "Nerve"
    }
    else if(id==6){
        return "Aph&eacute;ra"
    }
    else if(id==7){
        return "Synelle"
    }
    else if (id==undefined) {
        return "?"
    }
    else{
        return "rebelle";
    }
    
}

function getFactionColor(id){
    if (id==1) { // i don't like switch
        return "red"
    }
    else if(id==2){
        return "blue"
    }
    else if(id==3){
        return "yellow"
    }
    else if(id==4){
        return "purple"
    }
    else if(id==5){
        return "green"
    }
    else if(id==6){
        return "cyan"
    }
    else if(id==7){
        return "orange"
    }
    else{
        return "grey";
    }
}

function drawInterfaceInit(){
   
   
    
    $("generalInfos").style.top = "20px";
    $("generalInfos").style.left = "300px";
    $("generalInfos").innerHTML = "<p style = 'font-size:  20px;' >Routes commercial project. <br>Version "+version +"  <p style='color: black' style='display: block;'> Avertissement : les donn&eacute;e fournies ne sont pas garanties &ecirc;tre juste ni &agrave; jour.</p>";

    $("author").style.left = "800px"
    //$("author").style.top = "900px"
    $("author").style.width = "800px" 
    //$("author").innerHTML = "chicken"
    
    $("author").innerHTML = "made by <div style='font: 7px Courier New'>"+chickenStormTextArrax.join("<br>")+"</div>"
    
    
    $("liste1Container").style.left ="100px"
    $("liste1Container").style.top = "350px"
    //$("liste1Container").style.width = "500px"
    $("liste1Container").innerHTML = "<input id=input1> <button onclick='searchListe1()'> chercher</button> : <select style=';' id='field1'> <option value='playerName'>nom du joueur</option> <option value='name'>nom</option> </select>  <br> <input type=checkBox id=checkBox1> Regular expression <input type=checkBox id=checkBox1CaseS> case sensitive <div id=list1></div>"
    
    $("liste2Container").style.left ="700px"
    $("liste2Container").style.top = "350px"
    //$("liste2Container").style.width = "10px"
    $("liste2Container").innerHTML = "<input id=input2>  <button onclick='searchListe2()'> chercher</button> : <select style=';' id='field2'> <option value='playerName'>nom du joueur</option> <option value='name'>nom</option> </select>  <br><input type=checkBox id=checkBox2> Regular expression <input type=checkBox id=checkBox2CaseS> case sensitive <div id=list2></div>"
    
    
    $("commRoutesTableCointainer").style.left ="1400px";
    $("commRoutesTableCointainer").style.top = "350px";
    $("commRoutesTableCointainer").innerHTML = "<button onclick='computeCommRoutes()'> calculer </button> trier par <select style=';' id='sortBy'> <option value='income'>revenu </option>  </select> <br> <div style =' position:absolute;display: inline-block; ' id='commRoutesTable' > </div>" 
     //
    //commRoutesTableCointainer
    
    // drawPlanetList($("list1"),planetArray1);
    // drawPlanetList($("list2"),planetArray2);
    
    drawInterface();
}

function drawInterface(){
    drawPlanetList($("list1"),planetArray1);
    drawPlanetList($("list2"),planetArray2);
    
    //drawCommRouteTable($("commRoutesTable"),commRoutesArray)
}

function drawPlanetList(listeContainer,array){
    
    
    
    
    var arrayToDraw = [["nom","nom du joeur","pop","secteur","faction","id"]];
    var styleArrayToDraw = [["","","","","","","",""]];
    
    
    for (var i in array){
        
        //http://game.asylamba.com/beta/map/place-13439
        //target="_blank"
        arrayToDraw.push(["<a target='_blank' href='http://game.asylamba.com/beta/map/place-"+array[i]["id"]+"'>"+array[i]["name"]+"</a> ",array[i]["playerName"],array[i]["pop"]/1000000,array[i]["secteur"],getFactionName(array[i]["faction"]),array[i]["id"]]);
        styleArrayToDraw.push(["","","","","background-color :"+getFactionColor(array[i]["faction"]),""]);
        
        
        
        
    }
    
    listeContainer.innerHTML = getHTMLTable(arrayToDraw,styleArrayToDraw);
    
}


function drawCommRouteTable(container,array){
    var arrayToDraw = [["joueur_1","joueur_2","base 1" ,"base 2","distance","revenu","pop_total","prix"]];
    var styleArrayToDraw = [["","","","","","","","",""]];
    
    for (var i in array){
        
        arrayToDraw.push([array[i].p1Name,array[i].p2Name,"<a target='_blank' href='http://game.asylamba.com/beta/map/place-"+array[i].b1id+"'>"+array[i].b1Name+"</a> ","<a target='_blank' href='http://game.asylamba.com/beta/map/place-"+array[i].b2id+"'>"+array[i].b2Name+"</a> ",array[i].dist,array[i].income,array[i].pop/1000000,array[i].price]);
        styleArrayToDraw.push(["background-color :"+getFactionColor(array[i].factionId1),"background-color :"+getFactionColor(array[i].factionId2),"","","","",""]);
        
        
    }
    
    container.innerHTML = getHTMLTable(arrayToDraw,styleArrayToDraw)
    container.style.width="1000px"
}