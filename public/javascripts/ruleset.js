const socket = io();
const urlParams = location.search.substring(1);
const gametipe = urlParams.split('=')[1];
const rule = {
    p:{
        now:1,
        set:[1, 2, 3, 4]
    },
    s:{
        now:0,
        set:[301, 401, 501, 601, 701, 801, 901]
    },
    r:{
        now:7,
        set:[]
    }
}
for(let i=1; i<=20; i++){
    rule.r.set.push(i);
}
const player = [
    "PLAYER_1",
    "PLAYER_2",
    "PLAYER_3",
    "PLAYER_4",
]
let users;
let set_user = 0;


const Up = (tipe) => {
    rule[tipe].now += 1;
    if(rule[tipe].now === rule[tipe].set.length){
        rule[tipe].now = 0;
    }
    document.getElementById("set-" + tipe).innerText = rule[tipe].set[rule[tipe].now]
    if(tipe === 'p'){
        SetPlayer();
    }
}

const Down = (tipe) => {
    rule[tipe].now -= 1;
    if(rule[tipe].now < 0){
        rule[tipe].now = rule[tipe].set.length - 1;
    }
    document.getElementById("set-" + tipe).innerText = rule[tipe].set[rule[tipe].now]
    if(tipe === 'p'){
        SetPlayer();
    }
}

const SetPlayer = () => {
    const users = document.getElementsByClassName('name')
    for(let i=0; i<4; i++){
        if(rule.p.now >= i){
            users[i].classList.remove('bye')
        }
        else if(rule.p.now < i){
            users[i].classList.add('bye')
        }
    }
}



window.onload = () => {
    document.getElementById('start').addEventListener('click', () => {
        const player_param = player.join(',');
        if(gametipe === "zero-one"){
            location.href = "zero-one?p=" + rule.p.set[rule.p.now] + "&s=" + rule.s.set[rule.s.now] + "&r=" + rule.r.set[rule.r.now] + "&player=" + player_param; 
        }else {
            location.href = gametipe + "?p=" + rule.p.set[rule.p.now] + "&r=" + rule.r.set[rule.r.now] + "&player=" + player_param;
        }
    })

    const names = document.getElementsByClassName('name');
    for(let i=0; i<names.length; i++){
        names[i].addEventListener('click', () => {
            document.getElementsByClassName('user-select-shadow')[0].classList.remove('invisible');
            set_user = i;
            socket.emit('user_save');
        })
    }

    document.getElementById('cancel').addEventListener('click', () => {
        document.getElementsByClassName('user-select-shadow')[0].classList.add('invisible');
    })

    document.getElementById('add-user').addEventListener('click', () => UserSet())
}

socket.on('user_list', (data) => {
    console.log(data)
    users = data;
    document.getElementById('user-list').innerHTML = ""
    for(let i=0; i<data.length; i++){
        const user = document.createElement('div');
        user.className = "user-name"
        user.innerText = data[i].name;
        user.addEventListener('click', () => SetName(i))
        document.getElementById('user-list').appendChild(user);
    }
})

const SetName = (num) => {
    document.getElementsByClassName('user-select-shadow')[0].classList.add('invisible');
    document.getElementsByClassName('name')[set_user].innerText = users[num].name;
    player[set_user] = users[num].name
}

const UserSet = () => {
    user = window.prompt("ユーザー名を入力してください\nユーザー名を入力すればログを貯められる!", "");
    socket.emit('user_save', user);
}

