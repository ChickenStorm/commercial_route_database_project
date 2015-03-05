


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
    HTMLText += "<div style =' position:absolute;display: inline-block; ' id='commRoutesTable' > </div>"
    
    
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
    $("liste1Container").innerHTML = "<input id=input1> <button onclick='searchListe1()'> chercher</button> : <select style=';' id='field1'> <option value='playerName'>nom du joueur</option> <option value='name'>nom</option> </select>   <input type=checkBox id=checkBox1> Regular expression <div id=list1></div>"
    
    $("liste2Container").style.left ="700px"
    $("liste2Container").style.top = "350px"
    //$("liste2Container").style.width = "10px"
    $("liste2Container").innerHTML = "<input id=input2>  <button onclick='searchListe2()'> chercher</button> : <select style=';' id='field2'> <option value='playerName'>nom du joueur</option> <option value='name'>nom</option> </select>  <input type=checkBox id=checkBox2> Regular expression <div id=list2></div>"
    
    
    $("commRoutesTable").style.left ="1400px";
    $("commRoutesTable").style.top = "350px";
    // drawPlanetList($("list1"),planetArray1);
    // drawPlanetList($("list2"),planetArray2);
    
    drawInterface();
}

function drawInterface(){
    drawPlanetList($("list1"),planetArray1);
    drawPlanetList($("list2"),planetArray2);
    
    drawCommRouteTable($("commRoutesTable"),commRoutesArray)
}

function drawPlanetList(listeContainer,array){
    
    
    
    
    var arrayToDraw = [["nom","nom du joeur","pos X","pos Y","sys pos","secteur","faction","id"]];
    var styleArrayToDraw = [["","","","","","","",""]];
    
    
    for (var i in array){
        
        arrayToDraw.push([array[i]["name"],array[i]["playerName"],array[i]["posX"],array[i]["posY"],array[i]["posZ"],array[i]["secteur"],getFactionName(array[i]["faction"]),array[i]["id"]]);
        styleArrayToDraw.push(["","","","","","","background-color :"+getFactionColor(array[i]["faction"]),""]);
        
        
        
        
    }
    
    listeContainer.innerHTML = getHTMLTable(arrayToDraw,styleArrayToDraw);
    
}


function drawCommRouteTable(container,array){
    var arrayToDraw = [["joueur 1","joueur 2","base 1" ,"base 2","distance","revenu","pop total","prix"]];
    var styleArrayToDraw = [["","","","","","","","",""]];
    
    for (var i in array){
        
        arrayToDraw.push([array[i].p1Name,array[i].p2Name,array[i].b1Name,array[i].b2Name,array[i].dist,array[i].income,array[i].pop/1000000,array[i].price]);
        styleArrayToDraw.push(["","","","","","",""]);
        
        
    }
    
    container.innerHTML = "<button onclick='computeCommRoutes()'> calculer </button>"+getHTMLTable(arrayToDraw,styleArrayToDraw)
}