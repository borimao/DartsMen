const p_num = 4
const zero_one = 301;
const myXml = new XMLHttpRequest();
const player = [];
let now = {player:0, throw:0, round:1};
myXml.onreadystatechange = function() {
    if ((myXml.readyState === 4) && (myXml.status === 200)) {
        for(let i=0; i<p_num; i++){
            document.querySelector(".scores").innerHTML += myXml.responseText;
            console.log(myXml.responseText)
        }
        for(let i=0; i<p_num; i++){
            document.querySelectorAll(".player")[i].classList.add("p_" + i);
            document.querySelectorAll(".score_num")[i].innerText = zero_one;
            player.push([
                '/',
                '/',
                '/',
                zero_one,
                zero_one
            ])
        }
        document.querySelectorAll(".player")[0].classList.add("play_" + 0);
        BoadMake();
    }
    
}

myXml.open("GET", "/htmls/score.html", true);
myXml.send(null);
    
// 点をカウントするやつ
const ScoreCount = (sco) => {
    player[now.player][now.throw] = sco;
    if(sco.match(/×/)){
        player[now.player][3] -= Number(sco.split('×')[0]) * Number(sco.split('×')[1])
    }
    else if(sco.match(/BULL/)){
        player[now.player][3] -= 50
    }
    else if(sco.match(/[+-]?\d+/)){
        player[now.player][3] -= sco;
    }
    else{
        player[now.player][3] -= 0
    }
    
    document.querySelectorAll('.log')[now.player].children[now.throw].innerText = sco;

    if(player[now.player][3] < 0){ 　　　//バーストした時
        player[now.player][3] = player[now.player][4]
        document.querySelectorAll(".score_num")[now.player].innerText = player[now.player][3]
        document.querySelectorAll(".player")[now.player].classList.remove("play_" + now.player);
        now.player++
        if(now.player != p_num){
            document.querySelectorAll('.log')[now.player].children[0].innerText = "";
            document.querySelectorAll('.log')[now.player].children[1].innerText = "";
            document.querySelectorAll('.log')[now.player].children[2].innerText = "";
        }
        now.throw = 0
        if(now.player == p_num){
            now.player = 0;
            now.throw = 0;
            now.round += 1;
            document.querySelector('.round_count').innerText = now.round;
            document.querySelectorAll('.log')[now.player].children[0].innerText = "";
            document.querySelectorAll('.log')[now.player].children[1].innerText = "";
            document.querySelectorAll('.log')[now.player].children[2].innerText = "";
        }
        document.querySelectorAll(".player")[now.player].classList.add("play_" + now.player);
    }else{　
        document.querySelectorAll(".score_num")[now.player].innerText = player[now.player][3]
        document.querySelectorAll(".player")[now.player].classList.remove("play_" + now.player);
        if(now.throw < 2){
            now.throw++
        }else{
            player[now.player][4] = player[now.player][3]
            now.player++
            if(now.player != p_num){
                document.querySelectorAll('.log')[now.player].children[0].innerText = "";
                document.querySelectorAll('.log')[now.player].children[1].innerText = "";
                document.querySelectorAll('.log')[now.player].children[2].innerText = "";
            }
            now.throw = 0
        }
        if(now.player == p_num){
            now.player = 0;
            now.throw = 0;
            now.round += 1;
            document.querySelector('.round_count').innerText = now.round;
            document.querySelectorAll('.log')[now.player].children[0].innerText = "";
            document.querySelectorAll('.log')[now.player].children[1].innerText = "";
            document.querySelectorAll('.log')[now.player].children[2].innerText = "";
        }
        document.querySelectorAll(".player")[now.player].classList.add("play_" + now.player);
    }
    


    

}

const BoadMake = () => {
    const score = ["10","15","2","17","3","19","7","16","8","11","14","9","12","5","20","1","18","4","13","6"]
    //const score = [10,15,2,17,3,19,7,16,8,11,14,9,12,5,20,1,18,4,13,6]
    let s_select = {};
    const canvas = document.getElementById("canvas");
    canvas.width = document.body.clientHeight;
    canvas.height = document.body.clientHeight;
    var context = canvas.getContext( "2d" ) ;

    for(i=0; i<20; i++){
        var startAngle = 9 + i*18;
        var endAngle = startAngle + 18;

        context.beginPath ();
        context.arc( 365, 365, 75, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false );
        let rgb
        if(i%2 == 0){
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(0, 0, 0, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(1, 0, 0, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(0, 1, 0, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(0, 0, 1, " +  num + ")";
            }
            
        }
        else{
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(255, 255, 255, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(254, 255, 255, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(255, 254, 255, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(255, 255, 254, " +  num + ")";
            }
        }
        context.strokeStyle = rgb
        context.lineWidth = 90 ;
        context.stroke();
        s_select[rgb] = score[i];




        context.beginPath ();
        context.arc( 365, 365, 222.5, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false );
        if(i%2 == 0){
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(0, 0, 0, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(1, 0, 0, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(0, 1, 0, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(0, 0, 1, " +  num + ")";
            }
            
        }
        else{
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(255, 255, 255, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(254, 255, 255, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(255, 254, 255, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(255, 255, 254, " +  num + ")";
            }
        }
        context.strokeStyle = rgb
        context.lineWidth = 85;
        context.stroke();


        context.beginPath ();
        context.arc( 365, 365, 150, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false );
        if(i%2 == 0){
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(255, 0, 0, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(254, 0, 0, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(255, 1, 0, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(255, 0, 1, " +  num + ")";
            }
        }
        else{
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(0, 0, 255, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(1, 0, 255, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(0, 1, 255, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(0, 0, 254, " +  num + ")";
            }
        }
        context.strokeStyle = rgb
        context.lineWidth = 60;
        context.stroke();
        s_select[rgb] = score[i] + "×3";


        context.beginPath ();
        context.arc( 365, 365, 290, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false );
        if(i%2 == 0){
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(253, 0, 0, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(252, 0, 0, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(253, 1, 0, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(253, 0, 1, " +  num + ")";
            }
        }
        else{
            if(i < 5){
                let num = 1 - i/100
                rgb = "rgb(0, 0, 253, " +  num + ")";
            }
            else if(i >= 5 && i < 10){
                let num = 1 - (i-5)/100
                rgb = "rgb(1, 0, 253, " +  num + ")";
            }
            else if(i >= 10 && i < 15){
                let num = 1 - (i-10)/100
                rgb = "rgb(0, 1, 253, " +  num + ")";
            }
            else if(i >= 15 && i < 20){
                let num = 1 - (i-15)/100
                rgb = "rgb(0, 0, 252, " +  num + ")";
            }
        }
        context.strokeStyle = rgb
        context.lineWidth = 50;
        context.stroke();
        s_select[rgb] = score[i] + "×2";
    }




    var startAngle = 0;
    var endAngle = startAngle + 360;
    context.beginPath () ;
    context.arc( 365, 365, 15, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false ) ;
    rgb = "rgb(254, 1, 1, 1)" ;
    context.strokeStyle = rgb
    context.lineWidth = 30 ;
    context.stroke();
    s_select[rgb] = "BULL";


    var startAngle = 0;
    var endAngle = startAngle + 360;
    context.beginPath () ;
    context.arc( 365, 365, 480, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false ) ;
    rgb = "rgb(1, 1, 1, 1)";
    context.strokeStyle = rgb
    context.lineWidth = 330 ;
    context.stroke();
    s_select[rgb] = "OUT";

    context.beginPath () ;
    context.fillStyle = "#fff";
    context.font = "48px Helvetica";
    context.fillText("20", 338, 45);
    context.fillText("3", 350, 720);
    context.fillText("1", 450, 60);
    context.fillText("5", 250, 60);
    context.fillText("17", 435, 710);
    context.fillText("19", 235, 710);
    context.fillText("18", 530, 100);
    context.fillText("12", 140, 100);
    context.fillText("2", 540, 660);
    context.fillText("7", 160, 660);
    context.fillText("4", 620, 180);
    context.fillText("9", 80, 180);
    context.fillText("15", 615, 585);
    context.fillText("16", 55, 585);
    context.fillText("13", 665, 280);
    context.fillText("14", 5, 280);
    context.fillText("10", 665, 490);
    context.fillText("8", 30, 490);
    context.fillText("6", 690, 380);
    context.fillText("11", -5, 380);
    context.stroke();
    rgb = "rgb(255, 255, 255, 1)";
    s_select[rgb] = "OUT";

    function onClick(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var imagedata = context.getImageData(x, y, 1, 1);
        const rgb = "rgb(" + imagedata.data[0] + ", " + imagedata.data[1] + ", " + imagedata.data[2] + ", " + Math.round(imagedata.data[3]/255*100)/100  + ")"
        ScoreCount(s_select[rgb]);
    }

    canvas.addEventListener('click', onClick, false);
}