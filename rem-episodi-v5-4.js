(()=>{'use strict';
const css=document.createElement('style');css.textContent=`
/* Align the recommendation subtitles even when titles wrap to different line counts */
#homeRecommendations .home-book, #homeRecommended .home-book, #remRecommendations .home-book{display:flex;flex-direction:column}
#homeRecommendations .home-book > strong, #homeRecommended .home-book > strong, #remRecommendations .home-book > strong{min-height:2.8em}

#rem53Modal{position:fixed;inset:0;z-index:2147483600;background:#06111de8;display:flex;align-items:center;justify-content:center;padding:14px}#rem53Modal[hidden]{display:none!important}
#rem53Panel{background:#142b42;color:white;border:1px solid #56758c;border-radius:22px;width:min(480px,100%);max-height:88dvh;overflow:auto;padding:20px;font:16px system-ui}
#rem53Panel h2{margin:8px 0}#rem53Panel p{font-size:14px;line-height:1.5;color:#bdcfdb}
#rem53Panel button{cursor:pointer;font:inherit;border-radius:11px;padding:12px;background:#1d3b52;color:white;border:1px solid #63859a}
#rem53Panel button.mint{background:#64dfa9;color:#102236;border:0;font-weight:800}
#rem53Panel .options{display:flex;gap:9px;margin:18px 0}#rem53Panel .options button{flex:1}
#rem53Panel .ep{display:block;width:100%;text-align:left;margin:9px 0}
#rem53Panel .ep small{display:block;color:#c2d3dd;line-height:1.5;margin-top:5px}
#rem53Panel .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}
`;document.head.append(css);
const modal=document.createElement('div');modal.id='rem53Modal';modal.hidden=true;modal.innerHTML='<div id="rem53Panel" role="dialog" aria-modal="true"><div style="color:#64dfa9;font-size:12px;letter-spacing:1px">REM · LA TUA STORIA</div><h2 id="rem53Title"></h2><div id="rem53Content"></div><div class="actions"><button id="rem53Back">Indietro</button><button id="rem53Close">Chiudi</button></div></div>';document.body.append(modal);
let book='',originalAction=null,stage='choice',episodes=[],currentIndex=0,showAll=false;
const $=id=>document.getElementById(id);const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const key=()=> 'rem-reading-mode-53-'+book.toLowerCase().replace(/[^a-z0-9]/g,'');
function titleFor(el){const card=el.closest('.home-book,article,.book-card,.card')||el.parentElement?.parentElement;const text=card?.textContent||'';return /montecristo/i.test(text)?'Il conte di Montecristo':/casa oltre il bosco/i.test(text)?'La casa oltre il bosco':(card?.querySelector('h3,strong')?.textContent||'Il tuo libro').trim()}
function showChoice(t,action){book=t;originalAction=action;stage='choice';modal.hidden=false;render()}
function openBook(){modal.hidden=true;const action=originalAction;originalAction=null;if(action){window.__rem53Bypass=true;try{action()}finally{window.__rem53Bypass=false}}}
function readingNodes(){const root=document.querySelector('#ebook')||document.querySelector('#reader')||document.body;const paragraphs=[...root.querySelectorAll('p')].filter(p=>p.textContent.trim().length>90&&!p.closest('#rem53Modal')&&!p.closest('nav,header,footer'));return paragraphs.length>=5?paragraphs:[]}
function buildEpisodes(){const ps=readingNodes();if(!ps.length)return[];const monte=/montecristo/i.test(book);const names=['L’arrivo del Faraone','Il giovane Edmond Dantès','Incontri e tensioni a Marsiglia'];const previews=['Il Faraone entra nel porto di Marsiglia, attirando l’attenzione di chi lo aspetta.','Il giovane marinaio racconta il viaggio e le responsabilità che ha assunto a bordo.','Tra gli uomini della nave emergono rapporti, ambizioni e i primi contrasti.'];const count=monte?Math.min(3,Math.floor(ps.length/3)):Math.min(8,Math.ceil(ps.length/7));if(!count)return[];const size=Math.ceil(ps.length/count);const result=[];for(let i=0;i<ps.length;i+=size){const group=ps.slice(i,i+size);const words=group.reduce((a,p)=>a+p.textContent.trim().split(/\s+/).length,0);const index=result.length;result.push({el:group[0],title:monte?names[index]||('Episodio '+(index+1)):'Episodio '+(index+1),minutes:Math.max(1,Math.ceil(words/210)),intro:monte?previews[index]||'Continua la storia di Edmond Dantès.':group[0].textContent.trim().replace(/\s+/g,' ').slice(0,115)})}return result}
function showEpisodes(){stage='episodes';openBook();setTimeout(()=>{episodes=buildEpisodes();modal.hidden=false;render()},500)}
function render(){ $('rem53Title').textContent=book;const body=$('rem53Content');$('rem53Back').hidden=stage==='choice';
if(stage==='choice'){body.innerHTML='<p>Come vuoi vivere questa storia?</p><div class="options"><button id="rem53Full">Libro completo</button><button class="mint" id="rem53Eps">A episodi</button></div><p>Potrai cambiare modalità in seguito senza perdere la tua lettura.</p>';$('rem53Full').onclick=()=>{try{localStorage.setItem(key(),'full')}catch(e){}openBook()};$('rem53Eps').onclick=()=>{try{localStorage.setItem(key(),'episodes')}catch(e){}showEpisodes()};return}
body.innerHTML='<p>Stagione 1 · '+episodes.length+' episodi nel testo caricato. I titoli e le anteprime sono editoriali; i punti di interruzione sono ancora provvisori.</p>'+(!episodes.length?'<p>Non riesco ancora a individuare il testo di questo libro: non invento episodi. Puoi continuare la lettura tradizionale.</p>':'<div id="rem53List"></div><button id="rem53All">Tutti gli episodi</button>');if(!episodes.length)return;
const list=$('rem53List');const items=showAll?episodes:[episodes[Math.min(currentIndex,episodes.length-1)]];
list.innerHTML=items.map((ep,j)=>{const i=showAll?j:currentIndex;return '<button class="ep" data-ep="'+i+'"><strong>Episodio '+(i+1)+'</strong><small>Circa '+ep.minutes+' min · '+esc(ep.intro)+'…</small><small>Apri l’episodio nell’Ebook</small></button>'}).join('');
list.querySelectorAll('[data-ep]').forEach(b=>b.onclick=()=>{currentIndex=Number(b.dataset.ep);try{localStorage.setItem(key()+'-episode',String(currentIndex))}catch(e){}modal.hidden=true;episodes[currentIndex].el.scrollIntoView({block:'start',behavior:'smooth'})});
$('rem53All').onclick=()=>{showAll=!showAll;render()};
}
$('rem53Close').onclick=()=>modal.hidden=true;$('rem53Back').onclick=()=>{stage='choice';render()};
function alignRecommendationCards(){const heading=[...document.querySelectorAll('h1,h2,h3,h4')].find(x=>/scelti per te/i.test(x.textContent));if(!heading)return;let section=heading.parentElement;for(let i=0;i<4&&section;i++,section=section.parentElement){const buttons=[...section.querySelectorAll('button')].filter(b=>/scopri il libro/i.test(b.textContent));if(buttons.length<2)continue;const titles=buttons.map(b=>{let p=b.parentElement;for(let j=0;j<5&&p;j++,p=p.parentElement){const t=[...p.querySelectorAll('strong,h3,h4')].find(x=>/montecristo|casa oltre il bosco/i.test(x.textContent));if(t)return t}return null}).filter(Boolean);if(titles.length<2)return;const max=Math.max(...titles.map(t=>t.getBoundingClientRect().height));titles.forEach(t=>{t.style.minHeight=Math.ceil(max)+'px';t.style.display='block'});return}}
setTimeout(alignRecommendationCards,1000);setTimeout(alignRecommendationCards,2500);
document.addEventListener('click',e=>{if(window.__rem53Bypass||!modal.hidden)return;const btn=e.target.closest('button,a');if(!btn||btn.closest('#rem53Modal'))return;const label=(btn.textContent||'').trim();if(!/scopri il libro|nuova lettura|inizia a leggere/i.test(label))return;const t=titleFor(btn);if(!/montecristo|casa oltre il bosco/i.test(t))return;e.preventDefault();e.stopImmediatePropagation();showChoice(t,()=>btn.click())},true);
})();