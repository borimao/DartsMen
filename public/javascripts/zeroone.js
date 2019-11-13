const p_num = 1
const zero_one = 301;
const max_round = 8;
const myXml = new XMLHttpRequest();

let socket;
let logs = {
    now:{player:0, throw:0, round:1},
    players:[],
    finish:false
};
let back_up_log = {
    nowlog:0,
    logs:[]
};

myXml.onreadystatechange = function() {
    if ((myXml.readyState === 4) && (myXml.status === 200)) {
        for(let i=0; i<p_num; i++){
            document.querySelector(".scores").innerHTML += myXml.responseText;
        }
        for(let i=0; i<p_num; i++){
            document.querySelectorAll(".player")[i].classList.add("p_" + i);
            document.querySelectorAll(".score_num")[i].innerText = zero_one;
            document.querySelectorAll(".name")[i].innerText = "PLAYER_" + (i + 1);
            document.querySelectorAll(".name")[i].num = i;
            document.querySelectorAll(".name")[i].addEventListener('click', (e) => NameChange(e));
            logs.players.push({
                name:"player_" + (i+1),
                score:zero_one,
                log:[
                    [
                        '',
                        '',
                        '',
                        zero_one,
                    ]

                ]
            })
        }
        document.querySelectorAll(".player")[0].classList.add("play");
        BoadMake();
        socket = io();
        let copy_logs = JSON.parse(JSON.stringify(logs))
        back_up_log.logs.push(copy_logs);
        back_up_log.nowlog = back_up_log.logs.length-1;
    }
}

myXml.open("GET", "/htmls/score.html", true);
myXml.send(null);

const NameChange = (e) => {
  const target = e.target;
  user = window.prompt("ユーザー名を入力してください\nユーザー名を入力すればログを貯められる!", "");
  logs.players[target.num].name = user;
  target.innerText = user;
  console.log(logs);
}

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
        sco_num = sco;
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
    player.score -= sco_num;

    if(player.score < 0){ //バーストした時
        console.log(player.log[now.round - 1][3])
        player.log[now.round][3] = player.log[now.round - 1][3]
        player.score = player.log[now.round - 1][3]
        now.throw = 0;
        now.player++
    }
    else if(player.score == 0){ //ゲーム終了した時
        player.log[now.round][3] = 0;
        logs.finish = true;
        GameFinish();
    }
    else {
        player.log[now.round][3] = player.score;
        if(now.throw < 2){
            now.throw++
        }else{
            now.throw = 0
            now.player++
        }
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

const BackLog = () => {
    if(logs.finish){
        document.getElementsByClassName('final_score')[0].classList.add("invisible");
        document.getElementById("ranking").innerHTML = "";
        console.log('yiyiyi')
    }
    back_up_log.nowlog -= 1;
    if(back_up_log.nowlog == 0){
        document.querySelector('.back').classList.add('invisible')
    }
    logs = back_up_log.logs[back_up_log.nowlog];
    
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
        if (a.score > b.score) {
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
    out.addEventListener('click', () => location.href="/", false);
}

//スコアを画面に反映させるやつ
const ScoreChange = ()=> {
    let now = logs.now;
    for(let i=0; i<logs.players.length; i++){
        document.querySelectorAll(".player")[i].classList.remove("play");
        document.querySelectorAll(".score_num")[i].innerText = logs.players[i].score;
        for(let j=0; j<3; j++){
            document.querySelectorAll('.log')[i].children[j].innerText = logs.players[i].log[logs.players[i].log.length - 1][j];
        }
    }
    if(!logs.finish){
        if(now.throw == 0){
            for(let j=0; j<3; j++){
                document.querySelectorAll('.log')[now.player].children[j].innerText = "";
            }
        }
        document.querySelector('.round_count').innerText = now.round;
        document.querySelectorAll(".player")[now.player].classList.add("play");
    }
    
}


