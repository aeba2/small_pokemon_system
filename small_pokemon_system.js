//hello world 2 3
/*Twitterでポケモン出現botを作りたい。「キャッチ」とリプすると捕まえる事が出来る。
捕まえると、捕まえたポケモンのjsonファイルを生成し、ダウンロード出来る*/


/*                     ポケモン関連                             */

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

//クラス PokeBox:ポケモンボックスのクラス。捕まえたポケモンを保存する。
class PokeBox{
  constructor(){
    this.contents = [];
  }

  download(){//ボックスにいるポケモンのデータをダウンロード(jsonファイル)
    const data = this.contents;
    const blob =  new Blob([JSON.stringify(data)], {type: 'application\/json'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `PokeBox.json`;
    link.click();
  }
}

//const my_PokeBox = new PokeBox();

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


/*                      場所                                 */
//場所クラス


/*                     エンカウント関連                      */
/*エンカウントデータリスト*/
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
  hoge:{
    Shuckle:{class:Shuckle,encount_rate:1,level:[4,5,6]}// "event"はイベント戦。
  }
}

/*
//encount_list_tokiwaオブジェクト: トキワの森のポケモン出現情報(Viridian Forest encount) [Pikachu,Caterpie,Metapod,Weedle,Kakuna]
const encount_list_tokiwa = {
  //ポケモン名:{出現率:整数値,レベル:[出現するポケモンのレベル]}
    Pikachu:{class:Pikachu,encount_rate:0.04,level:[3,5]},
    Caterpie:{class:Caterpie,encount_rate:0.3,level:[3,4,5]},
    Metapod:{class:Metapod,encount_rate:0.18,level:[4,5,6]},
    Weedle:{class:Weedle,encount_rate:0.3,level:[3,4,5]},
    Kakuna:{class:Kakuna,encount_rate:0.18,level:[4,5,6]}
}
//encount_list_CeladonDepartmentStoreオブジェクト: タマムシデパートのポケモン出現情報
const encount_list_CeladonDepartmentStore = {
  //ポケモン名:{出現率:整数値,レベル:[出現するポケモンのレベル]}
    Mew:{encount_rate:"event",level:[3,67]}// "event"はイベント戦。
}
*/

//クラスEncount:ポケモンのエンカウントに関するクラス。インスタンス生成時にマップのエンカウント情報リストのオブジェクトを引数に指定。
//マップを移動するたびにインスタンスを生成。
/*
class Encount{
  constructor(_encount_list){
    if(!_encount_list) {
        throw new Error("エンカウント情報リストを引数に入力してください");//throw new Errorについて勉強
    }

    this.encount_list = _encount_list;//エンカウントリストオブジェクト
    this.current_pokemon;//最後に出現したポケモンのインスタンス
  }

  //encountメソッド:乱数を生成し、ランダムにポケモンを出現させる
  encount(){
    const rand = Math.random();//0~1の乱数を生成
    let newAcc = 0,oldAcc = 0;
    let flg_no_encount = true;//出現フラグ(エラーハンドリング用): true:ポケモンが出現しない、false:ポケモンが出現する

    //出た乱数(rand)に相当するエンカウントリストのメンバー(出現するポケモン)を選び出すためのfor文。
    for(let member of Object.keys(this.encount_list)){
      const tmp = this.encount_list[member];
      newAcc += tmp.encount_rate;

      if(rand >= oldAcc && rand < newAcc){
        this.current_pokemon = new tmp.class();//出現するポケモンのインスタンスを生成
        console.log(`野生の${this.current_pokemon.name}が飛び出して来たぞ！`);
        flg_no_encount = false;
        break;
      }
      oldAcc = newAcc;
    }
    if(flg_no_encount) console.log(`何も現れなかった`);
    return;
  }

  catch(){
    const pokemon_caught = this.current_pokemon;

    //プレイヤーのポケモンボックスにポケモンを収納
    myPlay.myPokeBox.contents.push(pokemon_caught);

/* //捕まえたポケモンのオブジェクトをjsonファイルにしてダウンロード
    const blob =  new Blob([JSON.stringify(pokemon_caught)], {type: 'application\/json'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${pokemon_caught.name}.json`;
    link.click();


    console.log(`やったー！${pokemon_caught.name}を捕まえたぞ！`);
  }

}

*/




/*                      包括的                              */

//Playクラス
class Play{
  constructor(){
    this.pokebox = new PokeBox();

    this.current_place = Object.keys(encount_list_set)[0];//現在の場所の名前.初期値はトキワの森:"tokiwanomori"
    this.encount_list = encount_list_set[this.current_place];//エンカウントリストオブジェクト.初期値はトキワの森のencount_list_tokiwa。

    this.isOnBattle = false;//いまバトル中か
    this.current_pokemon = undefined;//最後に出現したポケモンのインスタンス
    this.previous_pokemon = undefined;//前回出現したポケモン

    console.log(`ゲームスタート！`);
    console.log(`ここは${this.current_place}`);

    return;
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
        console.log(`野生の${this.current_pokemon.name}が飛び出して来たぞ！`);
        this.isOnBattle = true;
        flg_no_encount = false;
        return;
      }
      oldAcc = newAcc;
    }
    if(flg_no_encount) console.log(`何も現れなかった`);
    return;
  }

  catch(){
    if(!this.isOnBattle){
      throw new Error(`いや、ポケモン居らんし…`);
    }

    const pokemon_caught = this.current_pokemon;

    //プレイヤーのポケモンボックスにポケモンを収納
    this.pokebox.contents.push(pokemon_caught);

 //捕まえたポケモンのオブジェクトをjsonファイルにしてダウンロード
    const blob =  new Blob([JSON.stringify(pokemon_caught)], {type: 'application\/json'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${pokemon_caught.name}.json`;
    link.click();


    console.log(`やったー！${pokemon_caught.name}を捕まえたぞ！`);

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
    console.log(`上手く逃げ切れた！`);

    return;
  }

  move(){
    if(this.isOnBattle){
      throw new Error(`戦闘中です。捕まえるなり逃げるなりしてください。`);
    }

    const places = Object.keys(encount_list_set);//名前リスト
    /*
    console.log(`moveに入った`);
    console.log(`places:${places}`);
    console.log(`places[0]:${places[0]},places[1]:${places[1]}`);
    console.log(`tokiwaでforは止まるはず`);
    */
    for(let key of Object.keys(places)){
      let i = Number(key);
      //console.log(`places[${i}]:${places[i]}`);
      if(places[i] === this.current_place){
        /*
        console.log(`ifの中に入った`);
        console.log(`i=${i}でi+1は${i+1},places[i+1]は${places[i+1]}`);
        console.log(`places[0]は${places[0]}`);
        */
        this.current_place =(places[i+1]) ? places[i+1]:places[0];
        this.encount_list = encount_list_set[this.current_place];
        console.log(`ここは${this.current_place}`);

        return;
      }
    }

  }

}






/*                       ゲームスタート                      */

const myPlay = new Play();


/*        デバッグエリア         */


/*草稿
Q1.
In your words In English, please describe how you plan to use Twitter data and/or APIs. The more detailed the response, the easier it is to review and approve.
A1.
I'm requesting Twitter Developer Account for exhibiting a game product I'm developing.
By using Twitter API’s tweet function, I’ll create a Twitter bot which provides the Twitter users with a kind of a text-based game.
I'm planning to make this game bot have the function to respond to the reply which the player gives to it, and I need the functions of Twitter API to acheive this.
The main goal for this game bot is to provide the users with entertainment.

Q2.
Are you planning to analyze Twitter data?
Please describe how you will analyze Twitter data including any analysis of Tweets or Twitter users.

A2.
Yes, I’m planning to use Twitter data for analysis.
Since this game bot progresses by responding to the reply from the users, analyzing Twitter data is a necessity.

Q3.
Will your app use Tweet, Retweet, like, follow, or Direct Message functionality?
Please describe your planned use of these features.

A3.
Yes, I’m planning to use Tweet functionality for the Twitter bot.
As I described above, the concept of the bot I'm going to make is text-based game.
Tweet functionality is needed to realize it.

Q4.
Do you plan to display Tweets or aggregate data about Twitter content outside of Twitter?
Please describe how and where Tweets and/or data about Twitter content will be displayed outside of Twitter.

A4.
No.
Q5.
Will your product, service or analysis make Twitter content or derived information available to a government entity?

A5.
No

*/
