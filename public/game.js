var dice = document.getElementById("dice");
var chalArray = ["green", "yellow", "blue", "red"];
var currentPlayer = 0;
var chalPlayer = chalArray[currentPlayer];

var globalChalCount;
var audio = new Audio("crack.ogg");
var chalProcess = false;
var nativePosition = {
    g1:"g-1-home",
    g2:"g-2-home",
    g3:"g-3-home",
    g4:"g-4-home",
    b1:"b-1-home",
    b2:"b-2-home",
    b3:"b-3-home",
    b4:"b-4-home",
    r1:"r-1-home",
    r2:"r-2-home",
    r3:"r-3-home",
    r4:"r-4-home",
    y1:"y-1-home",
    y2:"y-2-home",
    y3:"y-3-home",
    y4:"y-4-home"
}
var gotiPosition = {
    g1:["55-g-cell", false],
    g2:["54-g-cell", true],
    g3:["55-g-cell", true],
    g4:["54-g-cell", true],
    b1:["28-b-cell", true],
    b2:["29-b-cell", false],
    b3:["27-b-cell", true],
    b4:["28-b-cell", true],
    r1:["40-r-cell", true],
    r2:["39-r-cell", true],
    r3:["40-r-cell", true],
    r4:["39-r-cell", true],
    y1:["15-y-cell", true],
    y2:["14-y-cell", true],
    y3:["14-y-cell", true],
    y4:["13-y-cell", true]
}

isSafe = (gotiBlock)=>{
    let classList = gotiBlock.classList;
    for(let i=0;i<classList.length;i++){
        let temp = classList[i];
        if(temp=="safe")return true;
        if(temp=="r-start")return true;
        if(temp=="g-start")return true;
        if(temp=="b-start")return true;
        if(temp=="y-start")return true;
    }
    return false;
}

makeBlanks =()=>{
    for(let i=0;i<=51;i++){
        let pos = i+"-cell";
        document.getElementById(pos).innerHTML = "";
    }
    for(let i=52;i<=56;i++){
        let pos = i+"-g-cell";
        document.getElementById(pos).innerHTML = "";
    }
    for(let i=13;i<=17;i++){
        let pos = i+"-y-cell";
        document.getElementById(pos).innerHTML = "";
    }
    for(let i=26;i<=30;i++){
        let pos = i+"-b-cell";
        document.getElementById(pos).innerHTML = "";
    }
    for(let i=39;i<=43;i++){
        let pos = i+"-r-cell";
        document.getElementById(pos).innerHTML = "";
    }
    Object.keys(gotiPosition).forEach((goti)=>{
        gotiPosition[goti][0] = nativePosition[goti];
        gotiPosition[goti][1] = false;
    })
}

updateGoti = (goti)=>{
    let gotiPiece;
    if(gotiPosition[goti][0] != "donegotis"){
        if(goti[0]=='g')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkgreen"></div>'
        if(goti[0]=='b')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkblue"></div>'
        if(goti[0]=='r')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkred"></div>'
        if(goti[0]=='y')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkyellow"></div>'
    }else{
        if(goti[0]=='g')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkgreen"></div>'
        if(goti[0]=='b')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkblue"></div>'
        if(goti[0]=='r')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkred"></div>'
        if(goti[0]=='y')document.getElementById(gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkyellow"></div>'       
    }
    document.getElementById("turnInfo").innerHTML = chalPlayer + " 's turn";
    document.getElementById("diceInfo").innerHTML = chalPlayer+" got: " ;
}
updateGotis=()=>{
    Object.keys(gotiPosition).forEach((goti)=>{
        updateGoti(goti);
    })
}

kaatDaalo = (gotiBlock, goti)=>{
    let katta = false;
    let parts = gotiBlock.innerHTML.split("goti ");
    let keyparts = gotiBlock.innerHTML.split("dhol");
    for(let i=parts.length-1;i>0;i--){
        let gotiColor = parts[i][4];
        let gotiNum = keyparts[i][0];
        if(gotiColor!=goti[0]){
            katta = true;
            gotiPosition[gotiColor+gotiNum][0] = gotiColor+"-"+gotiNum+"-home";
            gotiPosition[gotiColor+gotiNum][1] = false;
            gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
            updateGoti(gotiColor+gotiNum);
        }
    }
    return katta;
}

doesExist = (gotiBlock, goti)=>{
    let parts = gotiBlock.innerHTML.split("goti ");
    for(let i=1;i<parts.length;i++){
        if(parts[i][4]==goti[0]){
            return true;
        }
    }
    return false;
}

findAndDelete = (gotiBlock, goti)=>{
    let parts = gotiBlock.innerHTML.split("goti ");

    if(goti[0] == 'g'){
        for(let i=1;i<parts.length;i++){
            if(parts[i][4]=='g'){
                gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                return;
            }
        }
    }else if(goti[0] == 'r'){
        for(let i=1;i<parts.length;i++){
            if(parts[i][4]=='r'){
                gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                return;
            }
        }
    }else if(goti[0] == 'b'){
        for(let i=1;i<parts.length;i++){
            if(parts[i][4]=='b'){
                gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                return;
            }
        }
    }else if(goti[0] == 'y'){
        
        for(let i=1;i<parts.length;i++){
            if(parts[i][4]=='y'){
                console.log("find delete")
                gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                return;
            }
        }
    }
}
makeBlanks();
updateGotis();

turnChal=()=>{
    let players = chalArray.length;
    if(currentPlayer>=players-1)currentPlayer=0;
    else currentPlayer++;
    chalPlayer = chalArray[currentPlayer];
    console.log(chalPlayer);
}

allBlock = (player)=>{
    for(let i=1;i<=4;i++){
        if(gotiPosition[player[0]+i][1])return false;
    }
    return true;
}

allDone = (player)=>{
    let allDone = true;
    for(let i=1;i<=4;i++){
        if(gotiPosition[player + i][0] != "donegotis"){
            allDone = false;
            break;
        }
    }
    if(allDone){
        for(let i=0;i<4;i++){
            if(chalArray[i][0]==player){
                chalArray.splice(i, 1);
                break;
            }
        }
        currentPlayer--;
        turnChal();
    }
    
}

rollProcess = (chalCount)=>{
    audio.play();
    globalChalCount = chalCount;
    document.getElementById("diceInfo").innerHTML = chalPlayer+" got " + chalCount;
    chalProcess = true;
    if(chalCount<6 && allBlock(chalPlayer)){
        chalProcess = false;
        turnChal();
        document.getElementById("turnInfo").innerText = chalPlayer + " 's turn";
    }
    if(chalPlayer=="green")chalGreen(chalCount);
    if(chalPlayer=="yellow")chalYellow(chalCount);
    if(chalPlayer=="blue")chalBlue(chalCount);
    if(chalPlayer=="red")chalRed(chalCount);
}

dice.onclick = function(){
    sock.emit("test", "roll is clicked");
    if(chalProcess)return;
    let chalCount = (parseInt(10000*Math.random()))%6+1;
    sock.emit('roll', chalCount);
}

gchalfProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiPosition[goti][0]);
    let katta = false;
    let ghar = false;
    if(!gotiBlock || !chalProcess || chalPlayer !="green")return;
    console.log(gotiBlock);
    if(!doesExist(gotiBlock, goti))return;
    let prev = gotiPosition[goti][0].split('-');
    if(prev.length == 2){
        if(parseInt(prev[0])+chalCount <= 51){
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-cell";
            if(isSafe(document.getElementById(newPos+"-cell"))){
                console.log("safe hai ye to");
            }else{
                console.log("katega");
                katta = kaatDaalo(document.getElementById(newPos+"-cell"), goti);
            }
        }else{
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-g-cell";                      
        }
    }else{
        if(parseInt(prev[0])+chalCount <= 56){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-g-cell";
        }else if(parseInt(prev[0])+chalCount >= 57){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = "donegotis";
            gotiPosition[goti][1] = false;
            console.log("green home"); 
            ghar = true;
            allDone(goti[0]);                 
        } 
    }
    if(chalCount!=6 && !katta && !ghar)turnChal();
    chalProcess = false;
    updateGoti(goti);
    return;
}
gchalsProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    if(gotiBlock == null || globalChalCount<6 || chalPlayer!="green" || !chalProcess)return;
    if(!doesExist(gotiBlock, goti))return;
    gotiBlock = findAndDelete(gotiBlock, goti);
    gotiPosition[goti][0] = "1-cell";
    gotiPosition[goti][1] = true;
    
    chalProcess = false;
    updateGoti(goti);
    return;
}

ychalfProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    let katta = false;
    let ghar = false;
    if(!chalProcess || chalPlayer!="yellow")return;
    if(!doesExist(gotiBlock, goti))return;
    let prev = gotiPosition[goti][0].split('-');
    if(prev.length == 2){
        if(parseInt(prev[0])<=12 && parseInt(prev[0])+chalCount>12){
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-y-cell";                      
        }else{
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            if(newPos<=51){
                gotiPosition[goti][0] = newPos+"-cell";
            }
            else{
                gotiPosition[goti][0] = newPos-52+"-cell";
                newPos = newPos-52;
            }
            if(isSafe(document.getElementById(newPos+"-cell"))){
                console.log("safe hai ye to");
            }else{
                console.log("katega");
                katta = kaatDaalo(document.getElementById(newPos+"-cell"), goti);
            }
        }
    }else{
        if(parseInt(prev[0])+chalCount <= 17){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-y-cell";
        }else if(parseInt(prev[0])+chalCount >= 18){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = "donegotis";
            gotiPosition[goti][1] = false;
            console.log("yellow home");  
            ghar = true;
            allDone(goti[0])                
        } 
    }
    if(chalCount!=6 && !katta && !ghar)turnChal();
    chalProcess = false;
    updateGoti(goti);
    return;
}
ychalsProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    if(gotiBlock == null || globalChalCount<6 ||chalPlayer!="yellow" || !chalProcess)return;
    if(!doesExist(gotiBlock, goti))return;
    gotiBlock = findAndDelete(gotiBlock, goti);
    gotiPosition[goti][0] = "14-cell";
    gotiPosition[goti][1] = true;
    chalProcess = false;
    updateGoti(goti);
    return;
}
bchalfProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    let katta = false;
    let ghar = false;
    if(!chalProcess || chalPlayer!="blue")return;
    if(!doesExist(gotiBlock, goti))return;
    let prev = gotiPosition[goti][0].split('-');
    if(prev.length == 2){
        if(parseInt(prev[0])<=25 && parseInt(prev[0])+chalCount>25){
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-b-cell";                      
        }else{
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            if(newPos<=51){
                gotiPosition[goti][0] = newPos+"-cell";
            }
            else{
                gotiPosition[goti][0] = newPos-52+"-cell";
                newPos = newPos-52;
            }
            if(isSafe(document.getElementById(newPos+"-cell"))){
                console.log("safe hai ye to");
            }else{
                console.log("katega");
                katta = kaatDaalo(document.getElementById(newPos+"-cell"), goti);
            }
        }
    }else{
        if(parseInt(prev[0])+chalCount <= 30){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-b-cell";
        }else if(parseInt(prev[0])+chalCount >= 30){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = "donegotis";
            gotiPosition[goti][1] = false;
            console.log("blue home");        
            ghar = true;
            allDone(goti[0]);          
        } 
    }
    if(chalCount!=6 && !katta && !ghar)turnChal();
    chalProcess = false;
    updateGoti(goti);
    return;
}
bchalsProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    if(gotiBlock == null || globalChalCount<6 ||chalPlayer!="blue" || !chalProcess)return;
    if(!doesExist(gotiBlock, goti))return;
    gotiBlock = findAndDelete(gotiBlock, goti);
    gotiPosition[goti][0] = "27-cell";
    gotiPosition[goti][1] = true;
    chalProcess = false;
    updateGoti(goti);
    return;
}
rchalfProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    let katta = false;
    let ghar = false;
    if(!chalProcess || chalPlayer!="red")return;
    if(!doesExist(gotiBlock, goti))return;
    let prev = gotiPosition[goti][0].split('-');
    if(prev.length == 2){
        if(parseInt(prev[0])<=38 && parseInt(prev[0])+chalCount>38){
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-r-cell";                      
        }else{
            findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            if(newPos<=51){
                gotiPosition[goti][0] = newPos+"-cell";
            }
            else{
                gotiPosition[goti][0] = newPos-52+"-cell";
                newPos = newPos-52;
            }
            if(isSafe(document.getElementById(newPos+"-cell"))){
                console.log("safe hai ye to");
            }else{
                console.log("katega");
                katta = kaatDaalo(document.getElementById(newPos+"-cell"), goti);
            }
        }
    }else{
        if(parseInt(prev[0])+chalCount <= 43){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = newPos+"-r-cell";
        }else if(parseInt(prev[0])+chalCount >= 43){
            gotiBlock = findAndDelete(gotiBlock, goti);
            let newPos = parseInt(prev[0])+chalCount;
            gotiPosition[goti][0] = "donegotis";
            gotiPosition[goti][1] = false;
            console.log("red home");       
            ghar = true;
            allDone(goti[0]);           
        } 
    }
    if(chalCount!=6 && !katta && !ghar)turnChal();
    chalProcess = false;
    updateGoti(goti);
    return;
}
rchalsProcess = (gotiBlockid, goti, chalCount)=>{
    let gotiBlock = document.getElementById(gotiBlockid);
    if(gotiBlock == null || globalChalCount<6 || chalPlayer!="red" || !chalProcess)return;
    if(!doesExist(gotiBlock, goti))return;
    gotiBlock = findAndDelete(gotiBlock, goti);
    gotiPosition[goti][0] = "40-cell";
    gotiPosition[goti][1] = true;
    chalProcess = false;
    updateGoti(goti);
    return;  
}
chalGreen = (chalCount)=>{
    Object.keys(gotiPosition).forEach((goti)=>{
        
        if(goti[0]=='g' && gotiPosition[goti][1]){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('gchalf', [gotiPosition[goti][0], goti, chalCount]);
            }
        }else if(goti[0]=='g' && !gotiPosition[goti][1] && chalCount==6){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('gchals', [gotiPosition[goti][0], goti, chalCount]);
            }
            return;
        }
    })   
}

chalYellow = (chalCount)=>{
    Object.keys(gotiPosition).forEach((goti)=>{
        if(goti[0]=='y' && gotiPosition[goti][1]){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('ychalf', [gotiPosition[goti][0], goti, chalCount]);   
            }
        }else if(goti[0]=='y' && !gotiPosition[goti][1] && chalCount==6){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('ychals', [gotiPosition[goti][0], goti, chalCount]);
            }
        }
    })   
}

chalBlue = (chalCount)=>{
    Object.keys(gotiPosition).forEach((goti)=>{
        if(goti[0]=='b' && gotiPosition[goti][1]){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('bchalf', [gotiPosition[goti][0], goti, chalCount]);
            }
        }else if(goti[0]=='b' && !gotiPosition[goti][1] && chalCount==6){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('bchals', [gotiPosition[goti][0], goti, chalCount]);
            }
        }
    })   
}

chalRed = (chalCount)=>{
    Object.keys(gotiPosition).forEach((goti)=>{
        if(goti[0]=='r' && gotiPosition[goti][1]){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('rchalf', [gotiPosition[goti][0], goti, chalCount]);
            }
        }else if(goti[0]=='r' && !gotiPosition[goti][1] && chalCount==6){
            let gotiBlock = document.getElementById(gotiPosition[goti][0]);
            gotiBlock.onclick = function(){
                sock.emit('rchals', [gotiPosition[goti][0], goti, chalCount]);
            }
        }
    })   
}
