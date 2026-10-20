// 季節限定メニュー（価格変更は各 price を書き換えるだけ）
export const seasonal = { label: '秋冬限定', items: [
  { id: 'ginger-cafe-latte', name: 'ジンジャーカフェラテ', price: 700, desc: '自家製ジンジャーシロップを使用し、シナモンパウダーを最後に振りかけたカフェラテ。', image: 'ginger-cafe-latte.jpg', alt: '月のラテアートが描かれたジンジャーカフェラテ' },
  { id: 'ginger-latte', name: 'ジンジャーラテ', price: 650, desc: '自家製ジンジャーシロップにスチームミルクを注ぎ、シナモンパウダーを振りかけたラテ。', image: 'ginger-latte.jpg', alt: 'シナモンをかけたジンジャーラテ' },
  { id: 'aerocano', name: 'エアロカーノ', price: 600, desc: 'エスプレッソをスチームし、口当たりなめらかなコーヒー。夏に登場以来、人気によりアイス以外にホットも選べるように。', image: 'aerocano.jpg', alt: 'グラスに入ったエアロカーノ' },
  { id: 'pumpkin-latte', name: 'パンプキンラテ', price: 700, desc: 'カボチャをマッシュして作った自家製パンプキンベースにスチームミルクを合わせた、やさしい甘さのラテ。', image: null, alt: 'パンプキンラテ' },
], poster: 'seasonal-drinks-poster.jpg' };
