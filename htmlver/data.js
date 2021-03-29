/*
今後は戦闘システムなども。
*/

const soundtrack = {
//  "field":"https://maoudamashii.jokersounds.com/music/game/mp3/game_maoudamashii_4_field09.mp3",
  "field":"https://drive.google.com/uc?id=1XdDHyX9Sc3jA0QElwfJL3QJiC6KBNa0A",
  "yasei":"https://drive.google.com/uc?id=16yT2gxAkKihEL3PeY0mbpbSDW42wzmU5",
  "Lugia":"https://drive.google.com/uc?id=1STprKvzU_7g-Lm3hWT60g3GZpRpY0wFv",
  "Houou":"https://drive.google.com/uc?id=1n7T-CpyAL1_rEfbBlJVA6Jr1PMDYO7Ou"
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
