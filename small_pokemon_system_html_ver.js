/*Twitterでポケモン出現botを作りたい。「キャッチ」とリプすると捕まえる事が出来る。
捕まえると、捕まえたポケモンのjsonファイルを生成し、ダウンロード出来る*/

/*
そのための試験的作品&OOPの練習作品
とりあえず、Chrome devtools 上で快適にプレイ出来るものを作って、
あとからフォークしてHTML上で操作できるものも作ってみたい。

今後は戦闘システムなども。

*/

/*                      ポケモンボックス                  */

//クラス PokeBox:ポケモンボックスのクラス。捕まえたポケモンを保存する。
//セーブデータからロード機能も付けたい(Playの方か)
class PokeBox{
  constructor(){
    this.contents = [];
  }

  save(){//ボックスにいるポケモンのデータをダウンロード(jsonファイル)
    const data = JSON.stringify(this.contents);
    // 利用例
    if (storageAvailable('localStorage')) {
      localStorage.setItem("pokebox",data);
      //本当はここにもう一つ、ちゃんとセーブできたか確認する判定を入れたい。
      this.createText(`ボックスデータのセーブが完了しました。`);

    } else {
      this.createText(`残念ながら、データをセーブ出来ません。`);
      this.createText(`何らかの理由で、データのセーブに必要なlocalStorageが使用できません。
                  以下を試してみてください。
                  ・ブラウザをシークレットモードで見ている場合は通常モードに切り替える
                  ・別のブラウザを使う

                  `);
        // 残念ながら localStorage は使用できません
    }


    /*
    const blob =  new Blob([data], {type: 'application\/json'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `PokeBox.json`;
    link.click();
    */
  }

  load(){
    const data = localStorage.getItem("pokebox");
    this.contents = JSON.parse(data);
  }
}

//データのセーブに必要なlocalstorageをサポートしているか判定する関数
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch(e) {
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




/*                     ポケモン                             */

//個体値をランダムに生成する関数
const create_indivisual_stats = () => {
    let arr = [];
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    for(let i = 0;i<6;i++){
      arr.push(getRandomInt(0,31));
    }
    return {hp:arr[0], atk:arr[1], def:arr[2], sp_atk:arr[3], sp_def:arr[4], speed:arr[5]};
}

//クラスPokemon:不要？
class Pokemon{//ポケモンの種族によらず、先に定義しておくべき普遍的なプロパティやメソッドは何かあるか？
  constructor(){
  }
}
//クラスPikachu:ピカチュウのクラス
class Pikachu extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "ピカチュウ";
    this.type = {first:"電気",second:""};
    this.base_stats = {//種族値
        hp:35,
        atk:55,
        def:40,
        sp_atk:50,
        sp_def:50,
        speed:90
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}
//クラスCaterpie:キャタピーのクラス
class Caterpie extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "キャタピー";
    this.type = {first:"虫",second:""};
    this.base_stats = {//種族値
        hp:1,
        atk:1,
        def:1,
        sp_atk:1,
        sp_def:1,
        speed:1
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}
//クラスMetapod:トランセルのクラス
class Metapod extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "トランセル";
    this.type = {first:"虫",second:""};
    this.base_stats = {//種族値
        hp:1,
        atk:1,
        def:100,
        sp_atk:1,
        sp_def:50,
        speed:1
    }

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}
//クラスWeedle:ビードルのクラス
class Weedle extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "ビードル";
    this.type = {first:"虫",second:"毒"};
    this.base_stats = {//種族値
        hp:1,
        atk:1,
        def:1,
        sp_atk:1,
        sp_def:1,
        speed:1
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}
//クラスKakuna:コクーンのクラス
class Kakuna extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "コクーン";
    this.type = {first:"虫",second:"毒"};
    this.base_stats = {//種族値
        hp:1,
        atk:1,
        def:100,
        sp_atk:1,
        sp_def:50,
        speed:1
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}
//クラスMew:ミュウのクラス
class Mew extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "ミュウ";
    this.type = {first:"エスパー",second:""};
    this.base_stats = {//種族値
        hp:100,
        atk:100,
        def:100,
        sp_atk:100,
        sp_def:100,
        speed:100
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}
//クラスShuckle:ツボツボのクラス
class Shuckle extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "ツボツボ";
    this.type = {first:"虫",second:"岩"};
    this.base_stats = {//種族値
        hp:20,
        atk:10,
        def:230,
        sp_atk:10,
        sp_def:230,
        speed:5
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}

class Shaymin extends Pokemon{
  constructor(_nickname, _habitat){
    super();

    //種族固有の値
    this.name = "シェイミ";
    this.type = {first:"草",second:""};
    this.base_stats = {//種族値
        hp:100,
        atk:100,
        def:100,
        sp_atk:100,
        sp_def:100,
        speed:100
    };

    //個体特有の値
    this.indivisual_stats = create_indivisual_stats();//個体値
    this.nickname = (_nickname) ? _nickname: this.name;
    this.habitat = _habitat;//出現した場所(=つかまえた場所)
  }
}



/*                      エンカウントデータ                     */
const encount_list_set = {
  tokiwanomori:{
    //ポケモン名:{出現率:整数値,レベル:[出現するポケモンのレベル]}
      Pikachu:{class:Pikachu,encount_rate:0.04,level:[3,5]},
      Caterpie:{class:Caterpie,encount_rate:0.3,level:[3,4,5]},
      Metapod:{class:Metapod,encount_rate:0.18,level:[4,5,6]},
      Weedle:{class:Weedle,encount_rate:0.3,level:[3,4,5]},
      Kakuna:{class:Kakuna,encount_rate:0.18,level:[4,5,6]}
  },
  CeladonDepartmentStore:{
    Mew:{class:Mew,encount_rate:1,level:[3,67]}// "event"はイベント戦。
  },
  nazonobasho:{
    Shaymin:{class:Shaymin,encount_rate:0.5,level:[4,5,6]},
    Shuckle:{class:Shuckle,encount_rate:0.5,level:[4,5,6]}// "event"はイベント戦。
  }
}

/*                                                             */
//ヘルプメッセージ
const help_message = `
  遊び方:
  以下のコマンドのどれかを入力してエンターを押してください

  [コマンド集]

  encount(): ポケモンが出現
  run(): 逃げる
  capture(): 戦闘中のポケモンを捕まえる
  rankaku(2以上の数値): ()の中に入力された数値の数だけポケモンを乱獲できます。
  move(): 場所を移動する
  box(): ポケモンボックスを見る(捕まえたポケモンを見れます)
  save(): ポケモンボックスの中身(捕まえたポケモン)のデータのJSONファイルで保存できます
  load(): ボックスのセーブデータをロードする。
  help(): ヘルプを表示
  
  ※セーブ・ロード機能を使う場合は、毎回同じURLのページでプレイしてください。(データの保存にlocalStorageを使っているため)
  `;

/*                      プレイ                              */


//Playクラス:ここにゲームの機能やプレイメモリが全て詰まっている。ゲームマスター的な。
class Play{
  constructor(){
    this.pokebox = new PokeBox();

    this.current_place = Object.keys(encount_list_set)[0];//現在の場所の名前.初期値はトキワの森:"tokiwanomori"
    this.encount_list = encount_list_set[this.current_place];//エンカウントリストオブジェクト.初期値はトキワの森のencount_list_tokiwa。

    this.isOnBattle = false;//いまバトル中か
    this.current_pokemon = undefined;//最後に出現したポケモンのインスタンス
    this.previous_pokemon = undefined;//前回出現したポケモン
    
    this.screen_area = document.getElementById("screen_area");
    this.message_area = document.getElementById("message_area");
    this.console_area = document.getElementById("console_area");
    
    //初期動作
    //this.createText(this.message_area);
    this.createText(`ゲームスタート！`);
    this.createText(`ここは${this.current_place}`);

    return;
  }
  
  createText(txt){
    const newdiv = document.createElement("div");
    newdiv.innerText = txt;
    this.message_area.appendChild(newdiv);  
  }

  //ヘルプ
  help(){
  }

  //ポケモンボックスのデータをロード
  load_pokebox(){
        this.pokebox.load();
  }

  //encountメソッド:乱数を生成し、ランダムにポケモンを出現させる
  encount(){
    if(this.isOnBattle){
      throw new Error(`戦闘中です。まずは目の前のポケモンに集中して、捕まえるなり逃げるなりしてください(一度に一匹しか出ません)`);
    }

    const rand = Math.random();//0~1の乱数を生成
    let newAcc = 0,oldAcc = 0;
    let flg_no_encount = true;//出現フラグ(エラーハンドリング用): true:ポケモンが出現しない、false:ポケモンが出現する

    //出た乱数(rand)に相当するエンカウントリストのメンバー(出現するポケモン)を選び出すためのfor文。
    for(let member of Object.keys(this.encount_list)){
      const tmp = this.encount_list[member];
      newAcc += tmp.encount_rate;

      if(rand >= oldAcc && rand < newAcc){
        this.current_pokemon = new tmp.class();//出現するポケモンのインスタンスを生成
        this.createText(`野生の${this.current_pokemon.name}が飛び出して来たぞ！`);
        this.isOnBattle = true;
        flg_no_encount = false;
        return;
      }
      oldAcc = newAcc;
    }
    if(flg_no_encount) this.createText(`何も現れなかった`);
    return;
  }

  catch(){
    if(!this.isOnBattle){
      throw new Error(`いや、ポケモン居らんし…`);
    }

    const pokemon_caught = this.current_pokemon;

    //プレイヤーのポケモンボックスにポケモンを収納
    this.pokebox.contents.push(pokemon_caught);

    /*くどいので消すかも
    //捕まえたポケモンのオブジェクトをjsonファイルにしてダウンロード
    const blob =  new Blob([JSON.stringify(pokemon_caught)], {type: 'application\/json'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${pokemon_caught.name}.json`;
    link.click();
    */

    this.createText(`やったー！${pokemon_caught.name}を捕まえたぞ！`);
    this.createText(`捕まえたポケモン:%o`,pokemon_caught);
    this.createText(`現在のボックスの状況:%o`,this.pokebox.contents);
    this.isOnBattle = false;
    this.previous_pokemon = this.current_pokemon;
    this.current_pokemon = undefined;//クリア

    return;
  }

  run(){
    if(!this.isOnBattle){
      throw new Error(`いや、ポケモン居らんし…`);
    }
    this.isOnBattle = false;
    this.previous_pokemon = this.current_pokemon;
    this.current_pokemon = undefined;//クリア
    this.createText(`上手く逃げ切れた！`);

    return;
  }

  move(){
    if(this.isOnBattle){
      throw new Error(`戦闘中です。捕まえるなり逃げるなりしてください。`);
    }

    const places = Object.keys(encount_list_set);//名前リスト

    for(let key of Object.keys(places)){
      let i = Number(key);
      //this.createText(`places[${i}]:${places[i]}`);
      if(places[i] === this.current_place){
        this.current_place =(places[i+1]) ? places[i+1]:places[0];
        this.encount_list = encount_list_set[this.current_place];
        this.createText(`ここは${this.current_place}`);

        return;
      }
    }

  }

}

//Yesクラス:ここに
class Yes{
  constructor(){
  }
}

//Noクラス:ここに
class No{
  constructor(){
  }
}


/*             プレイヤーのコンソール       */
class Console{
  constructor(){
  }
  
}




/*                       ゲームスタート                      */

const myPlay = new Play();



/*        デバッグエリア         */
