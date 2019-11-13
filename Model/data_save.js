const fs = require('fs');

const Zero_Padding = (num) => {
  return ("00000000" + num).slice(-2);
}

const data_save = (data) => {
  for(let value of data){
    if(value.name.match(/^player_[1-4]$/))continue;
    let content = [];
    const current_time = new Date();
    try{
      const msg = fs.readFileSync(`./data_log/${value.name}.txt`, {encoding: "utf-8"});
      let target_list = msg.split('\n');
      target_list.pop();
      let row_num = 0;
      for(let row of target_list){
        const data = row.split(',');
        data.pop();
        if(data.length < 6)continue;
        for(let column in data){
          if(content.length < Math.floor(column / 6) + 1)content.push([]);
          if(content[Math.floor(column / 6)].length < row_num + 1)content[Math.floor(column / 6)].push([]);
          content[Math.floor(column / 6)][row_num].push(data[column]);
        }
        row_num++;
      }
    }catch(e){}
    console.log(content);
    content.push([[content.length + 1, `${Zero_Padding(current_time.getHours())}:${Zero_Padding(current_time.getMinutes())}:${Zero_Padding(current_time.getSeconds())}`, "", "", ]]);
    value.log.shift();
    content[content.length - 1] = content[content.length - 1].concat(value.log);

    fs.writeFileSync(`./data_log/${value.name}.txt`, '');

    let content_finish_count = 0;
    let row = 0;
    let text = '';
    while(content_finish_count != content.length){
      content_finish_count = 0;
      fs.appendFileSync(`./data_log/${value.name}.txt`, text + '\n');
      text = '';
      for(let total of content){
        if(total[row] == undefined){
          content_finish_count++;
          text += ',,,,,,';
          continue;
        }
        if(total[row].length >= 6){
          text += `${total[row][0]},${total[row][1]},${total[row][2]},${total[row][3]},${total[row][4]},,`;
        }else{
          text += `${row ? row + ',' : ',' }${total[row][0]},${total[row][1]},${total[row][2]},${total[row][3]},,`;
        }
      }
      row++;
    }
  }
}

module.exports = data_save;
