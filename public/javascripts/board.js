//ダーツボード生成するやつ
const BoadMake = () => {
    const score = ["10","15","2","17","3","19","7","16","8","11","14","9","12","5","20","1","18","4","13","6"]
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

    function onClick(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var imagedata = context.getImageData(x, y, 1, 1);
        const rgb = "rgb(" + imagedata.data[0] + ", " + imagedata.data[1] + ", " + imagedata.data[2] + ", " + Math.round(imagedata.data[3]/255*100)/100  + ")"
        if(s_select[rgb]){
            ScoreCount(s_select[rgb]);
        }

    }

    canvas.addEventListener('click', onClick, false);
}