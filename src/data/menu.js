// 価格・品名の変更はこのファイルだけ。 [id, 品名, 価格, 補足]
// ハーブティーの名称（正式名称）。変更が必要になったらここだけ書き換え
const HERB = { red: 'refresh', yellow: 'relieve', blue: 'relax' };
const row = ([id, name, price, note, image = '') => ({
  id,
  name,
  price,
  note,
  image
});
export const menu = [
  { key: 'food', title: 'FOOD', note: '日替わりメニューは店頭でご確認ください', items: [
    ['keema', '大豆ミートのキーマカレー', 1000, '辛くないので、どなたでも召し上がれます（当店おすすめ）'],
    ['plate', '気まぐれプレート', 950, '日替わり'],
    ['soup', 'お野菜たっぷり気まぐれスープ', 700, '日替わり'],
    ['soup-half', 'ハーフサイズ', 400], ['salad', '自家製ドレッシングのサラダ', 500],
    ['salad-half', 'ハーフサイズ', 300], ['toast', 'ミニ豆乳フレンチトースト', 600],
    ['bread', 'ミニフランスパン 1個', 200]].map(row) },
  { key: 'sweets', title: 'SWEETS', items: [
    ['gateau', 'かぼちゃのガトーショコラ', 450], ['canele', 'お豆腐のカヌレ', 300],
    ['muffin', '米粉のバナナマフィン', 350], ['blancmange', 'ブランマンジェ', 400],
    ['galette', 'ガレットブルトンヌ', 300]].map(row) },
  { key: 'coffee', title: 'COFFEE', note: '当店のコーヒーは、オランダのブランド「ダウエグバーツ」の豆を使用しています。', items: [
    ['espresso', 'エスプレッソ（HOT）', 400], ['coffee', 'コーヒー（HOT / ICE）', 400],
    ['c-soda', 'コーヒーソーダ（ICE）', 500], ['c-lemonade', 'コーヒーレモネード（ICE）', 500],
    ['c-lemonade-soda', 'コーヒーレモネードソーダ（ICE）', 600]].map(row) },
  { key: 'latte', title: 'LATTE', items: [
    ['cafe-latte', 'カフェラテ（HOT / ICE）', 600], ['mocha', 'カフェモカ（HOT / ICE）', 650],
    ['choco-latte', 'チョコラテ（HOT / ICE）', 600], ['matcha-latte', '抹茶ラテ（HOT / ICE）', 650]].map(row) },
  { key: 'custom', title: 'CUSTOM', plus: true, items: [
    ['soy', '豆乳変更', 50], ['agave', 'アガベシロップ追加', 50], ['milk', 'ミルク追加', 50],
    ['lemon-syrup', '自家製レモンシロップ追加', 100], ['ginger-syrup', '自家製ジンジャーシロップ追加', 100]].map(row) },
  { key: 'tea', title: 'TEA', items: [
    ['herb-refresh', `オリジナルハーブティー ${HERB.red}`, 500, '気分転換｜ハイビスカス・リンデン・ローズヒップ・オレンジピール'],
    ['herb-relive', `オリジナルハーブティー ${HERB.yellow}`, 500, '安心｜カモミール・リンデン・レモンバーベナ・オレンジピール'],
    ['herb-relax', `オリジナルハーブティー ${HERB.blue}`, 500, '落ち着き｜バタフライピー・リンデン・レモンバーベナ'],
    ['cordial', 'オリジナルハーブコーディアルソーダ（赤・黄・青）', 600, 'ハーブを煮出したシロップのソーダ'],
    ['lockhart', 'Premium Tea ロックハート（HOT）', 500, '南インド・ケララ州の茶園のシングルオリジン紅茶。ティーポットで提供']].map(row) },
  { key: 'smoothie', title: 'SMOOTHIE', items: [
    ['s-banana', '豆乳バナナ', 600], ['s-berry', '豆乳ベリー', 600], ['s-komatsuna', '小松菜豆乳バナナ', 650]].map(row) },
  { key: 'other', title: 'OTHER', items: [
    ['apple', 'りんごジュース', 400], ['milk-d', '牛乳', 400], ['soy-d', '豆乳', 400],
    ['hot-ginger', 'ホットジンジャー', 500, '自家製ジンジャーシロップ'], ['ginger-soda', 'ジンジャーソーダ', 500, '自家製ジンジャーシロップ'],
    ['lemonade', 'レモネード', 500, '自家製レモンシロップ'], ['lemonade-soda', 'レモネードソーダ', 500, '自家製レモンシロップ']].map(row) },
];
// メニュー内のご案内（MENUページ・TOPの店舗情報に表示）
export const notices = [
  'お食事、スイーツメニューをご注文のお客様は、ドリンク全品100円引き',
  'テイクアウトにも対応しています。お気軽にお声がけください。',
];
// なびのラテアート
export const latteArt = { hotIce: 'HOTでもICEでもOK！',
  designs: { '2D': ['ネコ', 'クマ', 'ウサギ', 'カエル', 'ペンギン', '太陽', '月と太陽', '女の子と花', '新郎新婦'], '3D': ['ネコ', 'クマ'] }, title: 'とくべつなラテアートにしませんか？', note: 'ラテアートは一杯一杯丁寧にお作りするため、提供までお時間をいただく場合があります。',
  options: [['2Dアート', 100], ['文字入れ', 50], ['その他リクエスト', 100], ['3D立体ラテアート', 200]] };
export const findItem = (id) =>
  menu.flatMap((s) => s.items).find((i) => i.id === id);
