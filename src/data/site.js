const btn=document.querySelector('.menu-btn'),nav=document.getElementById('gnav');
btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.textContent=o?'閉じる':'MENU'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');btn.setAttribute('aria-expanded',false);btn.textContent='MENU';btn.focus()}});
const dlg=document.getElementById('zoom'),zi=dlg.querySelector('img');
const openZoom=t=>{zi.src=t.src;zi.alt=t.alt;dlg.showModal()};
document.querySelectorAll('img[data-zoom]').forEach(i=>{i.tabIndex=0;i.setAttribute('role','button');i.setAttribute('aria-label',(i.alt||'画像')+'を拡大して見る');
 i.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openZoom(i)}})});
document.addEventListener('click',e=>{const t=e.target.closest('img[data-zoom]');if(t)openZoom(t);else if(e.target===dlg)dlg.close()});
