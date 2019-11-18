

myXml.onreadystatechange = function() {
    if ((myXml.readyState === 4) && (myXml.status === 200)) {
        for(let i=0; i<p_num; i++){
            document.querySelector(".scores").innerHTML += myXml.responseText;
        }
        for(let i=0; i<p_num; i++){
            document.querySelectorAll(".player")[i].classList.add("p_" + i);
            document.querySelectorAll(".score_num")[i].innerText = 0;
            document.querySelectorAll(".name")[i].innerText = set_name[i];
            document.querySelectorAll(".name")[i].num = i;
            document.querySelectorAll(".name")[i].addEventListener('click', (e) => NameChange(e));
            logs.players.push({
                name:"player_" + (i+1),
                score:0,
                log:[
                    [
                        '',
                        '',
                        '',
                        0,
                    ]

                ]
            })
        }
        document.querySelectorAll(".player")[0].classList.add("play");
        BoardMake();
        socket = io();
        let copy_logs = JSON.parse(JSON.stringify(logs))
        back_up_log.logs.push(copy_logs);
        back_up_log.nowlog = back_up_log.logs.length-1;
    }
}

myXml.open("GET", "/htmls/score.html", true);
myXml.send(null);

const ScoreCount = (sco) => {
    if(back_up_log.nowlog + 1 < back_up_log.logs.length){ //いらないバックアップを消すやつ
        let copy = JSON.parse(JSON.stringify(back_up_log))
        back_up_log.logs = [];
        for(let i=0; i<=copy.nowlog; i++){
            back_up_log.logs.push(copy.logs[i])
        }
    }

    let now = logs.now;
    let player = logs.players[now.player];
    let sco_num;
    if(sco.match(/×/)){
        sco_num = Number(sco.split('×')[0]) * Number(sco.split('×')[1]);
    }
    else if(sco.match(/BULL/)){
        sco_num = 50;
    }
    else if(sco.match(/[+-]?\d+/)){
        sco_num = Number(sco);
    }
    else{
        sco_num = 0;
    }

    if(now.round >= player.log.length){
        player.log.push([
            '',
            '',
            '',
            player.score,
        ])
        ScoreChange();
    }

    player.log[now.round]
    player.log[now.round][now.throw] = sco;
    player.score += sco_num;


    player.log[now.round][3] = player.score;
    if(now.throw < 2){
        now.throw++
    }else{
        now.throw = 0
        now.player++
    }


    if(now.player == p_num){ // ラウンド切り替え
        now.player = 0;
        now.round += 1;
        if(now.round > max_round){
            logs.finish = true;
            GameFinish();
        }
    }
    let copy_logs = JSON.parse(JSON.stringify(logs))
    back_up_log.logs.push(copy_logs);
    back_up_log.nowlog += 1
    if(back_up_log.nowlog > 0){
        document.querySelector('.back').classList.remove("invisible");
    }
    ScoreChange();
}

//ゲーム終了の処理
const GameFinish = () => { 
    const p_ranking = []
    for(let i=0; i<logs.players.length; i++){
        p_ranking.push({
            name:logs.players[i].name,
            score:logs.players[i].score
        })
    }
    p_ranking.sort((a, b) => {
        if (b.score > a.score) {
            return 1;
        } else {
            return -1;
        }
    })
    let rank_num = 1
    for(let i=0; i<p_ranking.length; i++){
        const rank_ul = document.getElementById("ranking")
        const rank = document.createElement('div');
        rank.className = "rank";
        const name = document.createElement('div');
        name.className = "name";
        const first = document.createElement('li');
        if(i != 0){
            if(p_ranking[i].score != p_ranking[i - 1].score){
                rank_num += 1;
            }
        }
        if(rank_num == 1){
            first.id = "first"
            rank.innerText = "1st.";
        }else if(rank_num == 2){
            rank.innerText = "2nd.";
        }
        else if(rank_num == 3){
            rank.innerText = "3rd.";
        }else {
            rank.innerText = i+1 + "th";
        }
        name.innerText = p_ranking[i].name;
        first.appendChild(rank);
        first.appendChild(name);
        rank_ul.appendChild(first);
    }
    socket.emit('data_save', logs.players);
    document.getElementsByClassName('final_score')[0].classList.remove("invisible");
    const out = document.getElementsByClassName('out')[0]
    out.innerText = "HOME"
    out.onclick = "";
    out.addEventListener('click', GoHome, true);
    out.removeEventListener('click', score_out, true);
}



