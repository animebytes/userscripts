// ==UserScript==
// @name yenperx
// @description adds yen per day/week/month to your AB profile page
// @include *animebyt.es/user.php?id=*
// ==/UserScript==

function formatInteger(intStr){
    intStr += '';
    fmtStr = '';
    for (i= intStr.length - 1; i >= 0; i--){
        if ((i - intStr.length) % 3 == 0)
            fmtStr = ' ' + intStr[i] + fmtStr;
        else
            fmtStr = intStr[i] + fmtStr;
    }
    return fmtStr
}

function addDefinition(after, definition, value){
    
    dt = document.createElement('dt');
    dt.appendChild(document.createTextNode(definition));
    dd = document.createElement('dd');
    dd.appendChild(document.createTextNode(value));
    after.parentNode.insertBefore(dd, after.nextSibling);
    after.parentNode.insertBefore(dt, after.nextSibling);
}

function addRealStats(){
     //find commented stats
    var hidden = "//li[@style='overflow-x: hidden;']/../comment()"
    var hiddenNode = document.evaluate(hidden, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    //get the stats, matches[1] is download amount [2] is MB/GB/TB [3] is per day
    var ulMatcher = /.*Uploaded:\s+(\d+\.*\d*)\s+([A-Z]+)\s\((.*)\)\.*/i;
    var ulMatches = ulMatcher.exec(hiddenNode.textContent);
    
    var dlMatcher = /.*Downloaded:\s+(\d+\.*\d*)\s+([A-Z]+)\s\((.*)\)\.*/i;
    var dlMatches = dlMatcher.exec(hiddenNode.textContent);
  
    //get the user stats bar
    var statsPath = "//div[@class='userstatsright']/dl/dd[2]";
    var statsNode = document.evaluate(statsPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    //add the definitions to the user stats
    addDefinition(statsNode, "Raw Downloaded:", dlMatches[1] + " " + dlMatches[2] + " (" + dlMatches[3] + ") ");
    addDefinition(statsNode, "Raw Uploaded:", ulMatches[1] + " " + ulMatches[2] + " (" + ulMatches[3] + ") ");

    
}

var href = window.location.href;
var urlMatcher = /.*animebyt\.es\/user.php\?id=\d+$/i;
if (urlMatcher.test(href)){
    //do this first or added stats will change its position...
    var yphPath = "//div[@class='userstatsright']/dl/dd[9]";
    var yphNode = document.evaluate(yphPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    addRealStats();
    
    addDefinition(yphNode, 'Yen per month:', '~' + formatInteger(yphNode.textContent * 24 * 30));
    addDefinition(yphNode, 'Yen per week:', formatInteger(yphNode.textContent * 24 * 7));
    addDefinition(yphNode, 'Yen per day:', formatInteger(yphNode.textContent * 24));


} 
