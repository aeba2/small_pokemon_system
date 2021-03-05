//hello world
/*Twitterでポケモン出現botを作りたい。「キャッチ」とリプすると捕まえる事が出来る。
捕まえると、捕まえたポケモンのjsonファイルを生成し、ダウンロード出来る*/

/*ポケモンそのもの*/
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


/*エンカウント関連*/
//クラスEncount:ポケモンのエンカウントに関するクラス。インスタンス生成時にマップのエンカウント情報リストのオブジェクトを引数に指定。
class Encount{
  constructor(_encount_list){
    if(!_encount_list) {
        throw new Error("エンカウント情報リストを引数に入力してください");//throw new Errorについて勉強
    }
    this.encount_list = _encount_list;
    this.current_pokemon;
  }

  encount(){
    const rand = Math.random();
    let newAcc = 0,oldAcc = 0;
    let flg_no_encount = true;

    for(let pokemon of Object.keys(this.encount_list)){
      newAcc += this.encount_list[pokemon].encount_rate;
      if(rand >= oldAcc && rand < newAcc){
        this.current_pokemon = pokemon;//今は名前だけ。そのうちインスタンスを作成してちゃんとした実体を入れたい。
        console.log(`野生の${pokemon}が飛び出して来たぞ！`);
        flg_no_encount = false;
        break;
      }
      oldAcc = newAcc;
    }

    if(flg_no_encount) console.log(`何も現れなかった`);
    return;
  }

}
//encount_list_tokiwaオブジェクト: トキワの森のポケモン出現情報(Viridian Forest encount) [Pikachu,Caterpie,Metapod,Weedle,Kakuna]
const encount_list_tokiwa = {
  //ポケモン名:{出現率:整数値,レベル:[出現するポケモンのレベル]}
    Pikachu:{encount_rate:0.04,level:[3,5]},
    Caterpie:{encount_rate:0.3,level:[3,4,5]},
    Metapod:{encount_rate:0.18,level:[4,5,6]},
    Weedle:{encount_rate:0.3,level:[3,4,5]},
    Kakuna:{encount_rate:0.18,level:[4,5,6]}
}
//encount_list_CeladonDepartmentStoreオブジェクト: タマムシデパートのポケモン出現情報
const encount_list_CeladonDepartmentStore = {
  //ポケモン名:{出現率:整数値,レベル:[出現するポケモンのレベル]}
    Mew:{encount_rate:"event",level:[3,67]}// "event"はイベント戦。
}

/*捕まえ関連*/
//クラス Catch:捕まえる
class Catch{
  throw_ball(){
  }
}

//クラス PokeBox:ポケモンボックスのクラス。捕まえたポケモンを保存する。
class PokeBox{

  download(){//ボックスにいるポケモンのデータをダウンロード(jsonファイル)

  }
}


/*実験広場*/



//実験:ピカチュウのインスタンス作成
//const pika = new Pikachu();
//実験:トキワの森のエンカウントオブジェクト(class Encountのインスタンス)
/*
const encount_tokiwa = new Encount(encount_list_tokiwa);
encount_tokiwa.encount();
*/







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
