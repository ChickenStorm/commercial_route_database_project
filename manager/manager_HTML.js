

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
    
    $("body").innerHTML += HTMLText;
    
    
    // position
}



function drawInterface(){
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
    $("liste1Container").innerHTML = "<input id=input1> <button onclick='searchListe1()'> cherch&eacute;</button> : nom du joueur <input type=checkBox id=checkBox1> Regular expression"
    
    $("liste2Container").style.left ="1000px"
    $("liste2Container").style.top = "350px"
    //$("liste2Container").style.width = "10px"
    $("liste2Container").innerHTML = "<input id=input2>  <button onclick='searchListe2()'> cherch&eacute;</button> : nom du joueur <input type=checkBox id=checkBox2> Regular expression"
    
    drawPlanetList($("liste1Container"),planetArray1);
    drawPlanetList($("liste2Container"),planetArray2);
}


function drawPlanetList(listeContainer,array){
    
    
    
    
    var arrayToDraw = [["nom","nom du joeur","pos X","pos Y","sys pos","secteur","faction","id"]];
    var styleArrayToDraw = [["","","","","","","",""]];
    
    
    for (var i in array){
        
        arrayToDraw.push([array[i]["name"],array[i]["playerName"],array[i]["posX"],array[i]["posY"],array[i]["posZ"],array[i]["secteur"],array[i]["faction"],array[i]["id"]]);
        styleArrayToDraw.push(["","","","","","","",""]);
        
        
        
        
    }
    
    listeContainer.innerHTML += getHTMLTable(arrayToDraw,arrayToDraw);
    
}