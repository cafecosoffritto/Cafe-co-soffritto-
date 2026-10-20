// 使い方: node build.mjs → dist/ に静的HTMLを出力（外部ライブラリ不要）
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { site, pages, PH } from './src/data/siteInfo.js';
import { menu, findItem, notices, latteArt } from './src/data/menu.js';
import { seasonal } from './src/data/seasonalMenu.js';
import { parfait } from './src/data/parfait.js';
import { events } from './src/data/events.js';
import { staff, staffGroup } from './src/data/staff.js';
import { tadameshi as T } from './src/data/tadameshi.js';
import { media } from './src/data/media.js';

const yen = (n) => `¥${n.toLocaleString('ja-JP')}`;
const img = (b, f, alt, cls = '') => `<img class="${cls}" src="${b}images/${f}" alt="${alt}" loading="lazy" data-zoom>`;
const ph = (label) => `<div class="ph" role="img" aria-label="画像差し替え用">${label}<br><small>写真は準備中です</small></div>`;
const insta = `<a class="btn btn-line" href="${site.instagram}" target="_blank" rel="noopener">Instagramを見る</a>`;

function layout(p, body) {
  const b = p.path ? '../' : '';
  const nav = pages.map((x) => `<a href="${b}${x.path ? x.path + '/' : ''}"${x.path === p.path ? ' aria-current="page"' : ''}>${x.nav}</a>`).join('');
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title}</title><meta name="description" content="${p.desc}">
<meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Noto+Sans+JP:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${b}assets/style.css"></head><body>
<a class="skip" href="#main">本文へ移動</a>
<header class="hd"><a class="brand" href="${b}"><img src="${b}images/logo-cafe-co-soffritto.png" alt="" width="40" height="40"><span>Cafe co Soffritto</span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="gnav">MENU</button>
<nav id="gnav" class="gnav" aria-label="メインメニュー">${nav}</nav></header>
<main id="main">${body(b)}</main>
<footer class="ft"><div class="wrap"><p class="brand-en">Cafe co Soffritto</p>
<p>営業時間：${site.hours}<br>定休日：${site.closed}<br>電話：<a href="tel:${site.tel.replace(/-/g, '')}">${site.tel}</a><br>メール：<a href="mailto:${site.email}">${site.email}</a></p>
<p>${insta}</p><nav class="fnav" aria-label="フッターメニュー">${nav}</nav>
<p class="copy">© ${new Date().getFullYear()} Cafe co Soffritto</p></div></footer>
<dialog id="zoom"><form method="dialog"><button aria-label="閉じる">×</button></form><img alt=""></dialog>
<script src="${b}assets/site.js"></script></body></html>`;
}

const fmtDate = (d) => { const [y, m, dd] = d.split('-').map(Number); return `${y}年${m}月${dd}日`; };
const evId = (e, i) => e.id || `event-${i}`;
const ev = events.map((e, i) => ({ ...e, _id: evId(e, i) }));
const upcoming = ev.filter((e) => !e.past).sort((a, b) => a.date.localeCompare(b.date));
const pastEv = ev.filter((e) => e.past).sort((a, b) => b.date.localeCompare(a.date));
const evCard = (b, e) => `<li class="event${e.past ? ' is-past' : ''}" id="${e._id}">${e.image ? img(b, e.image, e.alt || e.title) : ''}<div class="ev-body"><time datetime="${e.date}">${fmtDate(e.date)}</time><h3>${e.title}</h3>${e.summary ? `<p>${e.summary}</p>` : ''}
${(e.info && e.info.length) || (e.body && e.body.length) ? `<details><summary>詳細を見る</summary>${e.info && e.info.length ? `<dl class="info">${e.info.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}${(e.body || []).map((t) => `<p>${t}</p>`).join('')}</details>` : ''}</div></li>`;
const newsPg = (b) => `
<section class="sec wrap"><p class="en">News</p><h1>NEWS / EVENT</h1>
${upcoming.length ? `<h2>お知らせ・開催予定</h2><ul class="events">${upcoming.map((e) => evCard(b, e)).join('')}</ul>` : ''}
${pastEv.length ? `<h2 class="past-h">過去のイベント</h2><ul class="events">${pastEv.map((e) => evCard(b, e)).join('')}</ul>` : ''}
${ev.length ? '' : `<p>現在、掲載中のお知らせ・イベントはありません。最新の情報はInstagramでご案内しています。</p><p>${insta}</p>`}</section>`;

const alternate = (html) => { let i = 0; return html.replace(/<section class="sec( alt| wrap)?( wrap)?( parfait)?">(<div class="wrap">)?([\s\S]*?)(<\/div>)?<\/section>/g, (m, a, w2, pf, d, inner, close) => { const body = d ? inner : inner + (close || ''); return `<section class="sec${i++ % 2 ? ' alt' : ''}${pf || ''}"><div class="wrap">${d ? inner : body}</div></section>`; }); };
const home = (b) => alternate(homeRaw(b));
const homeRaw = (b) => {
  const pick = (id) => findItem(id);
  const cards = [
    { n: pick('keema').name, d: '辛くないので、どなたでも。大豆ミートのやさしいカレー。', p: yen(pick('keema').price), i: null },
    ...['aerocano', 'ginger-cafe-latte'].map((id) => { const s = seasonal.items.find((x) => x.id === id); return { n: s.name, d: s.desc, p: yen(s.price) + '（秋冬限定）', i: s }; }),
    { n: '3Dラテアート', d: '一杯一杯、丁寧に。ネコ・クマのかわいい立体ラテアート。', p: '+¥200', i: { image: 'latte-art-3d-cat-matcha.jpg', alt: '抹茶ラテの上に立体のネコのラテアート' } },
  ].map((c) => `<li class="card">${c.i ? img(b, c.i.image, c.i.alt) : ph(c.n)}<h3>${c.n}</h3><p>${c.d}</p><p class="price">${c.p}</p></li>`).join('');
  const news = upcoming.slice(0, 3).map((e) => `<li><time datetime="${e.date}">${fmtDate(e.date)}</time> <a href="${b}news/#${e._id}">${e.title}</a></li>`).join('');
  return `
<section class="hero"><picture><img src="${b}images/hero-cafe-interior-wide.jpg" alt="木のテーブルと革張りの椅子が並ぶ、ミントグリーンの壁の店内" fetchpriority="high"></picture>
<div class="hero-card"><h1>Cafe co Soffritto</h1><p class="lead">心がほどける、<br>身体にも社会にもやさしいカフェ。</p>
<p class="btns"><a class="btn" href="${b}about/">お店について</a><a class="btn btn-line" href="${b}menu/">メニューを見る</a></p>
<p class="small">${site.hours}　定休日：${site.closedShort}</p></div></section>
<section class="sec wrap"><p class="en">About</p><h2>Cafe co Soffrittoとは</h2>
<p>誰もが心地よく、誰もが自由に挑戦できる場を目指しているカフェです。ごはんやスイーツ、ラテアートなどを楽しみながら、それぞれの人がそれぞれのペースで過ごせる場所をつくっています。</p>
<p>植物性素材を中心にした「ベジごはんとおやつ」をご用意しています。</p><p><a class="more" href="${b}about/">コッソリについて →</a></p></section>
<section class="sec alt"><div class="wrap"><p class="en">Recommend</p><h2>おすすめメニュー</h2><ul class="cards">${cards}</ul>
<p><a class="more" href="${b}menu/">メニューをすべて見る →</a></p></div></section>
<section class="sec wrap parfait"><p class="en">Parfait</p><h2>コッソリパフェ</h2><p class="big">${parfait.catch}</p>
${img(b, parfait.image, 'ごはんのアイスにいちごとかりんとうをのせたコッソリパフェ')}
<p>${parfait.lead}</p><p class="price">${yen(parfait.price)}</p><ul class="chips">${parfait.ingredients.map((x) => `<li>${x}</li>`).join('')}</ul>
<dl class="nutri">${parfait.nutrition.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><p class="small">${parfait.nutritionNote}</p></section>
<section class="sec alt"><div class="wrap"><p class="en">Tadameshi</p><h2>毎日タダ飯</h2>
<p>当店の売り上げの一部は、毎日タダ飯の活動に充てさせていただいております。</p>
<p>${T.teaser}</p><p><a class="btn" href="${b}tadameshi/">毎日タダ飯について</a></p></div></section>
${upcoming.length ? `<section class="sec wrap"><p class="en">News</p><h2>NEWS / EVENT</h2><ul class="news">${news}</ul><p><a class="more" href="${b}news/">一覧を見る →</a></p></section>` : ''}
<section class="sec alt"><div class="wrap"><h2>Instagram</h2><p>日々のメニューやお知らせはInstagramで。</p><p>${insta}</p></div></section>
<section class="sec wrap"><p class="en">Information</p><h2>店舗情報</h2>
<dl class="info"><div><dt>営業時間</dt><dd>${site.hours}</dd></div><div><dt>定休日</dt><dd>${site.closed}</dd></div><div><dt>電話</dt><dd><a href="tel:${site.tel.replace(/-/g, '')}">${site.tel}</a></dd></div>${site.address ? `<div><dt>住所</dt><dd>${site.address}</dd></div>` : ''}</dl>
${notices.map((n) => `<p class="small">※${n}</p>`).join('')}</section>
<section class="sec alt"><div class="wrap"><p class="en">Contact</p><h2>CONTACT</h2><p>ご質問・ご相談はお気軽にどうぞ。</p><p><a class="btn" href="${b}contact/">お問い合わせ</a></p></div></section>`;
};


const about = (b) => `
<section class="sec wrap"><p class="en">About</p><h1>ABOUT <span class="sub">コッソリについて</span></h1>
<h2>Cafe co Soffrittoについて</h2>
<p>Cafe co Soffrittoは、誰もが心地よく、誰もが自由に挑戦できる場を目指しているカフェです。</p>
<p>ごはんやスイーツ、ラテアートなどを楽しみながら、それぞれの人がそれぞれのペースで過ごせる場所をつくっています。</p>
${img(b, 'hero-cafe-interior.jpg', '木の天井とミントグリーンの壁にチョークアートが描かれた店内', 'photo-wide')}</section>
<section class="sec alt"><div class="wrap"><p class="en">Our thoughts</p><h2>お店に込めた想い</h2>
<p>スタッフ自身の経験も、ここで働くことや誰かと関わることにつながる大切な価値として捉えています。</p>
<blockquote class="quote">ひきこもりや障がいを経験に。<br>経験を価値に。</blockquote>
<p>Soffritto（ソフリット）＝料理のベースとなる香味野菜<br>co＝共に</p>
<p>お店の売り上げの一部は、「毎日タダ飯」の活動に充てさせていただいています。<a class="more" href="${b}tadameshi/">毎日タダ飯について →</a></p></div></section>
<section class="sec wrap"><p class="en">Staff</p><h2>スタッフ</h2>
${img(b, staffGroup.image, staffGroup.alt, 'rounded')}
<ul class="staff">${staff.map((s) => `<li>${s.image ? img(b, s.image, s.alt, 'avatar') : ''}<h3>${s.name}<span>${s.role}</span></h3>${s.text ? `<p>${s.text}</p>` : ''}</li>`).join('')}</ul></section>
${media.length ? `<section class="sec alt"><div class="wrap"><p class="en">Media</p><h2>メディア掲載</h2>
<ul class="news">${media.map((m) => `<li><time>${m.date}</time> <a href="${m.url}" target="_blank" rel="noopener">${m.name}｜${m.title}</a></li>`).join('')}</ul></div></section>` : ''}`;

const row = (it, plus) => `<li class="${it.name === 'ハーフサイズ' ? 'half' : ''}"><span class="nm">${it.name}${it.note ? `<small>${it.note}</small>` : ''}</span><span class="pr">${plus ? '+' : ''}${yen(it.price)}</span></li>`;
const menuPg = (b) => `
<section class="sec wrap"><p class="en">Menu</p><h1>MENU <span class="sub">メニュー</span></h1>
<nav class="jump" aria-label="メニューの種類"><a href="#seasonal">季節限定</a>${menu.map((m) => `<a href="#${m.key}">${m.title}</a>`).join('')}<a href="#latte-art">ラテアート</a></nav>
<div class="notice">${notices.map((n) => `<p>${n}</p>`).join('')}</div></section>
<section class="sec alt" id="seasonal"><div class="wrap"><p class="en">Seasonal</p><h2>${seasonal.label}メニュー</h2>
<ul class="cards">${seasonal.items.map((c) => `<li class="card">${c.image ? img(b, c.image, c.alt) : ph(c.name)}<h3>${c.name}</h3><p>${c.desc}</p><p class="price">${yen(c.price)}</p></li>`).join('')}</ul></div></section>
${menu.map((m, i) => `<section class="sec ${i % 2 ? 'alt' : 'wrap'}" id="${m.key}">${i % 2 ? '<div class="wrap">' : ''}<h2>${m.title}</h2>${m.note ? `<p class="small">${m.note}</p>` : ''}<ul class="list">${m.items.map((it) => row(it, m.plus)).join('')}</ul>${i % 2 ? '</div>' : ''}</section>`).join('')}
<section class="sec wrap" id="latte-art"><p class="en">Latte Art</p><h2>なびのラテアート</h2><p class="big">${latteArt.title}</p>
${img(b, 'latte-art-3d-cat-matcha.jpg', '抹茶ラテの上に立体のネコのラテアート', 'rounded art')}
<p class="small">${latteArt.hotIce}</p><ul class="list">${latteArt.options.map(([n, p]) => `<li><span class="nm">${n}</span><span class="pr">+${yen(p)}</span></li>`).join('')}</ul>
<p><b>2Dアート</b>：${latteArt.designs['2D'].join('・')}<br><b>3D立体ラテアート</b>：${latteArt.designs['3D'].join('・')}</p><p class="small">※${latteArt.note}</p></section>`;

const btns = (arr) => `<p class="btns">${arr.map(([l, u]) => `<a class="btn" href="${u}" target="_blank" rel="noopener">${l}</a>`).join('')}</p>`;
const paras = (a) => a.map((t) => `<p>${t}</p>`).join('');
const tadaPg = (b) => `
<section class="sec wrap"><p class="en">Tadameshi</p><h1>毎日タダ飯</h1><p class="big">${T.lead}</p>${paras(T.about)}<p><a class="btn" href="#support">応援する方法を見る</a></p></section>
${T.why.length ? `<section class="sec alt"><div class="wrap"><h2>なぜ始めたのか</h2>${paras(T.why)}</div></section>` : ''}
<section class="sec alt"><div class="wrap"><h2>${T.situation.title}</h2>${paras(T.situation.paragraphs)}<p class="small source">${T.situation.sourceLabel}${T.situation.sources.map((x) => `<a href="${x.url}" target="_blank" rel="noopener">${x.label}</a>`).join('／')}</p></div></section>
<section class="sec wrap"><p class="en">Activity</p><h2>これまでの活動</h2><p>${T.statsLead}</p>
<dl class="nutri">${T.stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><ul class="list">${T.activities.map((x) => `<li><span class="nm">${x}</span></li>`).join('')}</ul></section>
${T.ticket.length ? `<section class="sec alt"><div class="wrap"><h2>無料お食事券について</h2>${paras(T.ticket)}</div></section>` : ''}
<section class="sec ${T.ticket.length ? 'wrap' : 'alt'}"><div class="wrap"><h2>ご寄付（毎日タダ飯サポーター）でできること</h2><p>${T.usesLead}</p><ul class="chips">${T.uses.map((x) => `<li>${x}</li>`).join('')}</ul><p>${T.usesAfter}</p></div></section>
<section class="sec wrap" id="support"><p class="en">Support</p><h2>応援する方法</h2>
<h3>毎月の支援で応援する</h3>${btns(T.monthly)}<h3>1回だけ応援する</h3>${btns(T.once)}<h3>法人・企業として応援する</h3>${paras(T.corporateLead)}${btns(T.corporate)}
<p class="small">お支払いはStripeの決済ページ（外部サイト）に移動します。</p><p class="small"><a href="${T.legal.url}" target="_blank" rel="noopener">${T.legal.label}</a></p></section>
<section class="sec alt"><div class="wrap">${paras(T.outro)}<h2 class="mt">お問い合わせ</h2><p>メール：<a href="mailto:${site.email}">${site.email}</a></p><p>${insta}</p></div></section>`;

const tel = site.tel.replace(/-/g, '');
const contactPg = (b) => `
<section class="sec wrap"><p class="en">Contact</p><h1>CONTACT <span class="sub">お問い合わせ</span></h1>
<p>ご質問・ご相談はお気軽にどうぞ。</p>
<ul class="contact">
<li><span class="k">電話</span><a class="btn" href="tel:${tel}">${site.tel}</a></li>
<li><span class="k">メール</span><a class="btn btn-line" href="mailto:${site.email}">${site.email}</a></li>
<li><span class="k">Instagram</span>${insta}</li></ul>
${site.formUrl ? `<h2>お問い合わせフォーム</h2><p><a class="btn" href="${site.formUrl}" target="_blank" rel="noopener">フォームから問い合わせる</a></p>` : ''}
<h2 class="mt">営業時間</h2><dl class="info"><div><dt>営業時間</dt><dd>${site.hours}</dd></div><div><dt>定休日</dt><dd>${site.closed}</dd></div>
${site.address ? `<div><dt>住所</dt><dd>${site.address}</dd></div>` : ''}</dl>
${site.address && site.mapUrl ? `<p><a class="btn btn-line" href="${site.mapUrl}" target="_blank" rel="noopener">地図を見る</a></p>` : ''}</section>`;

const stub = (p) => (b) => `<section class="sec wrap"><h1>${p.h1}</h1></section>`;

rmSync('dist', { recursive: true, force: true });
for (const p of pages) {
  const dir = p.path ? `dist/${p.path}` : 'dist';
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, layout(p, p.path === 'about' ? about : p.path === 'menu' ? menuPg : p.path === 'tadameshi' ? tadaPg : p.path === 'news' ? newsPg : p.path === 'contact' ? contactPg : p.path ? stub(p) : home));
}
cpSync('src/images', 'dist/images', { recursive: true });
cpSync('src/assets', 'dist/assets', { recursive: true });
import { readdirSync, readFileSync, statSync } from 'node:fs';
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(`${d}/${f}`).isDirectory() ? walk(`${d}/${f}`) : [`${d}/${f}`]));
for (const f of walk('dist').filter((x) => x.endsWith('.html'))) if (readFileSync(f, 'utf8').includes('[ここに')) throw new Error('未入力プレースホルダーが公開ページに残っています: ' + f);
console.log('built', pages.length, 'pages');
