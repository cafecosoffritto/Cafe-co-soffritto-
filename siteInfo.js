// 店舗情報・ページ情報はここだけを編集すれば全ページに反映されます
export const PH = '[ここに情報を入力]';
export const site = {
  name: 'Cafe co Soffritto', kana: 'カフェ コッソリ',
  hours: '10:00〜18:00', closed: '月曜日・火曜日', closedShort: '月・火',
  tel: '047-707-2230', email: 'kokorokarada220@gmail.com',
  instagram: 'https://www.instagram.com/cafe_coco220/',
  address: '', mapUrl: '',            // 住所・地図リンク: 空欄の間は非表示。確定後に入力すると表示されます
  formUrl: '',                         // GoogleフォームなどのURL。空欄の間はフォーム部分ごと非表示
  tadameshiUrl: 'https://sites.google.com/view/cafecosoffritto-tadameshi/',
};
export const pages = [
  { path: '', nav: 'HOME', title: 'Cafe co Soffritto｜カフェ コッソリ｜船橋のベジカフェ',
    desc: 'Cafe co Soffritto（カフェ コッソリ）は、心がほどける、身体にも社会にもやさしいカフェ。ベジごはんやおやつ、ラテアートなどを楽しみながら、誰もが心地よく過ごせる場所を目指しています。' },
  { path: 'about', nav: 'ABOUT', h1: 'ABOUT｜コッソリについて', title: 'Cafe co Soffrittoについて｜カフェ コッソリ', desc: 'Cafe co Soffritto（カフェ コッソリ）について。お店に込めた想いとスタッフのご紹介。' },
  { path: 'menu', nav: 'MENU', h1: 'MENU｜メニュー', title: 'Cafe co Soffritto メニュー｜フード・スイーツ・ドリンク', desc: 'Cafe co Soffrittoのフード・スイーツ・ドリンク・季節限定メニューのご案内。' },
  { path: 'tadameshi', nav: '毎日タダ飯', h1: '毎日タダ飯', title: '毎日タダ飯｜Cafe co Soffritto', desc: 'Cafe co Soffrittoの「毎日タダ飯」の取り組みと、応援の方法のご案内。' },
  { path: 'news', nav: 'NEWS / EVENT', h1: 'NEWS / EVENT', title: 'イベント・お知らせ｜Cafe co Soffritto', desc: 'Cafe co Soffrittoのイベント・お知らせ。' },
  { path: 'contact', nav: 'CONTACT', h1: 'CONTACT｜お問い合わせ', title: 'お問い合わせ｜Cafe co Soffritto', desc: 'Cafe co Soffrittoへのお問い合わせ先と営業時間。' },
];
