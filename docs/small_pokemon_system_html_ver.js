/*Twitterでポケモン出現botを作りたい。「キャッチ」とリプすると捕まえる事が出来る。
捕まえると、捕まえたポケモンのjsonファイルを生成し、ダウンロード出来る*/

/*
そのための試験的作品&OOPの練習作品
とりあえず、Chrome devtools 上で快適にプレイ出来るものを作って、
あとからフォークしてHTML上で操作できるものも作ってみたい。

今後は戦闘システムなども。

*/


//データのセーブに必要なlocalstorageをサポートしているか判定する関数
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}


const soundtrack = {
//  "field":"https://maoudamashii.jokersounds.com/music/game/mp3/game_maoudamashii_4_field09.mp3",
  "field":"soundtrack/field.mp3",//"https://drive.google.com/uc?id=1XdDHyX9Sc3jA0QElwfJL3QJiC6KBNa0A",
  "yasei":"soundtrack/yasei_ss.mid.mp3",//"https://drive.google.com/uc?id=16yT2gxAkKihEL3PeY0mbpbSDW42wzmU5",
  "Lugia":"soundtrack/Lugia.mp3",//"https://drive.google.com/uc?id=1STprKvzU_7g-Lm3hWT60g3GZpRpY0wFv",
  "Houou":"soundtrack/houou.mid.mp3"//"https://drive.google.com/uc?id=1n7T-CpyAL1_rEfbBlJVA6Jr1PMDYO7Ou"
}

/*                     ポケモン                             */
//種族のmasterデータ
const shuzoku_master = {
  Mew:{
    no:151,
    name:"ミュウ",
    type:{ first: "エスパー", second: "" },
    base_stats:{//種族値
      hp: 100,
      atk: 100,
      def: 100,
      sp_atk: 100,
      sp_def: 100,
      speed: 100
    },
    img:"https://i.imgur.com/0fanZUd.jpg"
  },

  Shuckle:{
    no:220,
    name:"ツボツボ",
    type:{ first: "虫", second: "岩" },
    base_stats:{//種族値
      hp: 100,
      atk: 20,
      def: 230,
      sp_atk: 20,
      sp_def: 230,
      speed: 5
    },
    img:"https://sp3.raky.net/poke/icon96/n213.gif"
  },

  Shaymin:{
    no:351,
    name:"シェイミ",
    type:{ first: "草", second: "" },
    base_stats:{//種族値
      hp: 100,
      atk: 100,
      def: 100,
      sp_atk: 100,
      sp_def: 100,
      speed: 100
    },
    img:"https://drive.google.com/uc?id=1R5BIpqjR-ErOzcdWrZHylR1l5opEn39t" //"https://sp3.raky.net/poke/icon96/n492.gif"
  },

  Lugia:{
    no:249,
    name:"ルギア",
    type:{ first: "エスパー", second: "飛行" },
    base_stats:{//種族値
      hp: 100,
      atk: 100,
      def: 100,
      sp_atk: 100,
      sp_def: 100,
      speed: 100
    },
    img:"https://sp3.raky.net/poke/icon96/n249.gif" //"https://sp3.raky.net/poke/icon96/n492.gif"
  },
  Houou:{
    no:250,
    name:"ホウオウ",
    type:{ first: "炎", second: "飛行" },
    base_stats:{//種族値
      hp: 100,
      atk: 100,
      def: 100,
      sp_atk: 100,
      sp_def: 100,
      speed: 100
    },
    img:"https://sp3.raky.net/poke/icon96/n250.gif" //"https://sp3.raky.net/poke/icon96/n492.gif"
  }
}

//クラスPokemon
class Pokemon{
  constructor(_name, _level, _nickname, _habitat){
    //種族固有の値
    this.no = shuzoku_master[_name].no;
    this.name = shuzoku_master[_name].name;
    this.type = shuzoku_master[_name].type;
    this.base_stats = shuzoku_master[_name].base_stats;
    this.img = shuzoku_master[_name].img;

    //個体特有の値
    this.indivisual_stats = this.create_indivisual_stats();//個体値
    this.level = _level;//レベル
    this.status = {};

    this.nickname = (_nickname) ? _nickname : this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }

  create_indivisual_stats(){
     let arr = [];
     function getRandomInt(min, max) {
       min = Math.ceil(min);
       max = Math.floor(max);
       return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
     }
     for (let i = 0; i < 6; i++) {
       arr.push(getRandomInt(0, 31));
     }
     return { hp: arr[0], atk: arr[1], def: arr[2], sp_atk: arr[3], sp_def: arr[4], speed: arr[5] };
   }

}


/*                      エンカウントデータ                     */
const encount_list_set = {
  /*
  tokiwanomori: {
    //ポケモン名:{出現率:整数値,レベル:[出現するポケモンのレベル]}
    Pikachu: {encount_rate: 0.04, level: [3, 5] },
    Caterpie: {encount_rate: 0.3, level: [3, 4, 5] },
    Metapod: {encount_rate: 0.18, level: [4, 5, 6] },
    Weedle: {encount_rate: 0.3, level: [3, 4, 5] },
    Kakuna: {encount_rate: 0.18, level: [4, 5, 6] }
  },
  */
  CeladonDepartmentStore: {
    Mew: {encount_rate: 0.8, level: [3, 67] },// "event"はイベント戦。
    Lugia: {encount_rate: 0.1, level: [3, 67] },
    Houou: {encount_rate: 0.1, level: [3, 67] }
  },
  nazonobasho: {
    Shaymin: {encount_rate: 0.5, level: [4, 5, 6] },
    Shuckle: {encount_rate: 0.5, level: [4, 5, 6] }// "event"はイベント戦。
  }
}

/*                                                             */
//ヘルプメッセージ
const help_message = `
  遊び方:
  以下のコマンドのどれかを選択して押してください。

  [コマンド集]

  encount: ポケモンが出現
  run: 逃げる
  capture: 戦闘中のポケモンを捕まえる
  move: 場所を移動する
  see box: ポケモンボックスを見る(捕まえたポケモンを見れます)
  save: ポケモンボックスの中身をlocalStorageに保存する
  load: ボックスのセーブデータをロードする
  help: ヘルプを表示

  ※セーブ・ロード機能を使う場合は、毎回同じURLのページでプレイしてください。(データの保存にlocalStorageを使っているため)
  `;

/*                      プレイ                              */
//Playクラス:ここにゲームの機能やプレイメモリが全て詰まっている。ゲームマスター的な。
class Play {
  constructor() {
    this.pokebox = [];

    this.current_place = Object.keys(encount_list_set)[0];//現在の場所の名前.初期値はトキワの森:"tokiwanomori"
    this.encount_list = encount_list_set[this.current_place];//エンカウントリストオブジェクト.初期値はトキワの森のencount_list_tokiwa。

    this.isOnBattle = false;//いまバトル中か
    this.play_mode = "normal";//"normal":何もしていない,"battle":戦闘状態
    //this.music = new Audio("https://maoudamashii.jokersounds.com/music/game/mp3/game_maoudamashii_4_field09.mp3");
    /*
      Google drive上のファイルへの直リンクの書き方:
      -> https://drive.google.com/uc?id=ファイルID
    */
    //this.music = new Audio("https://maoudamashii.jokersounds.com/music/game/mp3/game_maoudamashii_4_field09.mp3");
    this.music = new Audio("https://drive.google.com/uc?id=1XdDHyX9Sc3jA0QElwfJL3QJiC6KBNa0A");
    this.current_pokemon = undefined;//最後に出現したポケモンのインスタンス
    this.previous_pokemon = undefined;//前回出現したポケモン

    this.screen_area = document.getElementById("screen_area");
    this.message_area = document.getElementById("message_area");
    this.console_area = document.getElementById("console_area");

    //初期動作
    this.start();

    return;
  }

  start(){
    const startBtn = document.createElement("div");
    startBtn.innerText = "click to start!";
    startBtn.id = "startBtn";
    startBtn.addEventListener('click', () => {

        this.createText(`ゲームスタート！`);
        this.createText(`ここは${this.current_place}`);
        this.help();
        this.createButton();
        this.music.play();
        this.add_audio_console();



        document.getElementById("startBtn").remove();
    });
    document.body.appendChild(startBtn);

  }

  add_audio_console(){
    //音声制御ボタンがなければ作成
    if(!document.getElementById("audioBtn")){
      const audioBtn = document.createElement("button");
      audioBtn.innerText = (!this.music.paused) ? "音楽を停止":"音楽を再生";
      audioBtn.id = "audioBtn";
      //console.log(this)
      audioBtn.addEventListener("click",this.play_pause.bind(this));
      document.getElementById("console_area").appendChild(audioBtn);
      //this.music.play();
    }

  }

  play_pause(){
    //再生の停止・再開
    if(this.music.paused){
      this.music.play();
      document.getElementById("audioBtn").innerText = "音楽を停止";
    }else{
      this.music.pause();
      document.getElementById("audioBtn").innerText = "音楽を再生";
    }

  }

  music_change(_track){
    let track = _track;
    if(_track === "yasei" && this.current_pokemon.name === "ルギア") track = "Lugia";
    if(_track === "yasei" && this.current_pokemon.name === "ホウオウ") track = "Houou";
    //console.log(this.current_pokemon)
    //console.log(track);

    this.music.src = soundtrack[track];
    this.music.play();
  }

  //コマンドを実行するボタンを作成する
  createButton() {

    //コンソールエリアの内部を初期化
    this.console_area.innerHTML = "";

    //"normal"モードの場合
    if (this.play_mode === "normal") {
      //必要なコマンドの関数を取ってきてオブジェクトに詰め込む
      const commands = { "encount": this.encount, "move": this.move, "see box": this.see_pokebox, "save": this.save, "help": this.help, "load":this.load_pokebox };
      for (let key of Object.keys(commands)) {

        // commands[key]だけだと、ただ各コマンドの関数そのものが渡されるだけなので、
        //各コマンドの関数内部に書かれているthisが行き場を失ってしまう
        //だから、bindをつかって、指定してやる必要がある
        const method = commands[key].bind(this);

        //HTMLのbuttonエレメントを作って、イベントハンドラを定義し、コンソールエリアに追加
        const newBtn = document.createElement("button");
        newBtn.innerText = key;
        newBtn.addEventListener("click", () => {
          method();
        });
        this.console_area.appendChild(newBtn);
      }
    }

    if (this.play_mode === "battle") {

      const commands = { "capture": this.capture, "run": this.run, "help": this.help };
      for (let key of Object.keys(commands)) {
        const method = commands[key].bind(this);
        const newBtn = document.createElement("button");
        newBtn.innerText = key;
        newBtn.addEventListener("click", () => {
          method();
        });
        this.console_area.appendChild(newBtn);
      }

    }


    //this.add_audio_console();

  }

  //1st引数:メッセージのテキスト、2nd引数:特別長いメッセージの時はtrueを渡す
  createText(_txt,_special_message) {
    const wrapper = this.message_area;//メッセージエリアを取得

    //特別長いメッセージのとき(helpなど)
    if(_special_message){
      wrapper.innerHTML = "";
      //メッセージボックスを追加
      const newMsg = document.createElement("div");
      newMsg.innerText = _txt;
      wrapper.appendChild(newMsg);

      while(!(wrapper.childNodes.length === 10)){
        //console.log("i'm in while");
        const empty = document.createElement("div");
        wrapper.appendChild(empty);
      }
      return;
    }

    //普段は高さを固定
    wrapper.style.height = "400";
    //メッセージの数は10個まで。それ以上増えたら古い順に削除。
    if(wrapper.childNodes.length >= 10){
      while(!(wrapper.childNodes.length === 10)){
        wrapper.removeChild(wrapper.firstChild);
      }
    }

    //メッセージボックスを追加
    const newMsg = document.createElement("div");
    newMsg.innerText = _txt;
    wrapper.appendChild(newMsg);
  }

  //ヘルプ
  help() {
    this.message_area.style.height = "auto";
    this.createText(help_message,true);
  }

  see_pokebox() {
    /*
    ボックス内の全部のポケモンが表示され、クリックすると各情報(種族、ニックネーム、個体値)が出てくる
    */
    const message_area = this.message_area;
    message_area.style.height = "auto";
    message_area.innerHTML = "名前をクリックすると詳細表示";

    for(let i=0;i<this.pokebox.length;i++){
        const pokemon = this.pokebox[i];
        const info_list = document.createElement("div");
        info_list.innerText = pokemon.nickname;//innerTextも子ノードであることに注意
        message_area.appendChild(info_list);

        let flg = true;

        //名前をクリックするとポケモンの情報が表示
        info_list.addEventListener("click",()=>{
          if(flg){
            flg = false;
            for(let key of Object.keys(pokemon)){
                const info_item = document.createElement("div");

                const txt = key + ":" + JSON.stringify(pokemon[key]);
                info_item.innerText = txt;

                //インフォリストに追加
                info_list.appendChild(info_item);
            }
          }else{
            flg = true;
            info_list.innerHTML = "";
            info_list.innerText = pokemon.nickname;
          }
        });//クリックすると情報を表示
    }


  }
  //ポケモンボックスのデータをロード
  load_pokebox() {


    if (storageAvailable('localStorage')) {

      if(localStorage.getItem("pokebox")){
        const data = localStorage.getItem("pokebox");
        this.pokebox = JSON.parse(data);
        this.createText(`ボックスデータのロードが完了しました。`);
        this.see_pokebox();

      }else{
        createText(`ボックスデータが存在しません。`);
        createText(`前回のセーブデータをロードするには以下の条件が必要です:
          ・前回セーブした時と同じブラウザを使っていること
          ・ブラウザのURLが前回セーブしたURLと一致していること
          `);
      }

    } else {
      this.createText(`残念ながら、localStorageを読み込めません。`);
    }
  }

  //
  save() {
    const data = JSON.stringify(this.pokebox);
    // 利用例
    if (storageAvailable('localStorage')) {
      localStorage.setItem("pokebox", data);
      //本当はここにもう一つ、ちゃんとセーブできたか確認する判定を入れたい。
      this.createText(`ボックスデータのセーブが完了しました。`);

    } else {
      this.createText(`残念ながら、データをセーブ出来ません。`);
      this.createText(`何らかの理由で、データのセーブに必要なlocalStorageが使用できません。
                  以下を試してみてください。
                  ・ブラウザをシークレットモードで見ている場合は通常モードに切り替える
                  ・別のブラウザを使う

                  `);
    }
  }

  //encountメソッド:乱数を生成し、ランダムにポケモンを出現させる
  encount() {
    if (this.isOnBattle) {
      throw new Error(`戦闘中です。まずは目の前のポケモンに集中して、捕まえるなり逃げるなりしてください(一度に一匹しか出ません)`);
    }

    console.log(this.music.paused);

    const rand = Math.random();//0~1の乱数を生成
    let newAcc = 0, oldAcc = 0;
    let flg_no_encount = true;//出現フラグ(エラーハンドリング用): true:ポケモンが出現しない、false:ポケモンが出現する

    //出た乱数(rand)に相当するエンカウントリストのメンバー(出現するポケモン)を選び出すためのfor文。
    for (let member of Object.keys(this.encount_list)) {
      const tmp = this.encount_list[member];
      newAcc += tmp.encount_rate;

      if (rand >= oldAcc && rand < newAcc) {
        this.isOnBattle = true;
        this.play_mode = "battle";
        this.createButton();
        console.log(this.music.paused);
        this.current_pokemon = new Pokemon(member);//出現するポケモンのインスタンスを生成
        this.createText(`野生の${this.current_pokemon.name}が飛び出して来たぞ！`);
        this.set_img_encount(this.current_pokemon.img);
        this.music_change("yasei");
        this.add_audio_console();
        console.log(this.music.paused);

        flg_no_encount = false;
        return;
      }
      oldAcc = newAcc;
    }
    if (flg_no_encount) this.createText(`何も現れなかった`);
    return;
  }

  set_img_encount(_src){
    if(!_src) return;

    const img = document.createElement("img");
    img.src = _src;
    img.alt = this.current_pokemon.name;
    this.screen_area.appendChild(img);
  }

  clear_img_encount(){
    this.screen_area.innerHTML = "";
  }



  capture() {
    if (!this.isOnBattle) {
      throw new Error(`いや、ポケモン居らんし…`);
    }

    const pokemon_caught = this.current_pokemon;

    //プレイヤーのポケモンボックスにポケモンを収納
    this.pokebox.push(pokemon_caught);

    /*くどいので消すかも
    //捕まえたポケモンのオブジェクトをjsonファイルにしてダウンロード
    const blob =  new Blob([JSON.stringify(pokemon_caught)], {type: 'application\/json'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${pokemon_caught.name}.json`;
    link.click();
    */

    this.createText(`やったー！${pokemon_caught.name}を捕まえたぞ！`);
    let msg = `捕まえたポケモンの個体値:`;
    for(let key of Object.keys(pokemon_caught.indivisual_stats)){
      msg += `${key}:${pokemon_caught.indivisual_stats[key]} `;
    }
    this.createText(msg);
  //  this.createText(`現在のボックスの状況:${this.pokebox}`);


    this.previous_pokemon = this.current_pokemon;
    this.current_pokemon = undefined;
    this.clear_img_encount();
    this.isOnBattle = false;
    this.play_mode = "normal";
    this.createButton();
    this.music_change("field");
    this.add_audio_console();

    return;
  }

  run() {
    if (!this.isOnBattle) {
      throw new Error(`いや、ポケモン居らんし…`);
    }

    this.createText(`上手く逃げ切れた！`);

    this.previous_pokemon = this.current_pokemon;
    this.current_pokemon = undefined;//クリア
    this.clear_img_encount();
    this.isOnBattle = false;
    this.play_mode = "normal";
    this.createButton();
    this.music_change("field");
    this.add_audio_console();

    return;
  }

  move() {
    if (this.isOnBattle) {
      throw new Error(`戦闘中です。捕まえるなり逃げるなりしてください。`);
    }

    const places = Object.keys(encount_list_set);//名前リスト

    for (let key of Object.keys(places)) {
      let i = Number(key);
      //this.createText(`places[${i}]:${places[i]}`);
      if (places[i] === this.current_place) {
        this.current_place = (places[i + 1]) ? places[i + 1] : places[0];
        this.encount_list = encount_list_set[this.current_place];
        this.createText(`ここは${this.current_place}`);

        return;
      }
    }

  }

}


/*                       ゲームスタート                      */

const myPlay = new Play();

//const myEncount;

//const myBattle;


/*        デバッグエリア         */
