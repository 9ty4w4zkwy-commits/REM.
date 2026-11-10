n(function(){
const css=document.createElement('style');css.textContent=`
.rem-session-btn{border:1px solid #64DFA9!important;color:#64DFA9!important;background:#163044!important;border-radius:12px!important;padding:10px 15px!important;font-weight:750!important;cursor:pointer}
.rem-session-btn[aria-pressed=true]{background:#64DFA9!important;color:#102236!important}
#remSessionPill{position:fixed;bottom:94px;right:15px;z-index:99990;background:#132a40;color:#64DFA9;border:1px solid #64DFA9;border-radius:24px;padding:11px 16px;font-weight:750;box-shadow:0 5px 22px #0008}
#remSessionOverlay{position:fixed;inset:0;background:#06101cbd;z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px}
#remSessionOverlay[hidden],#remSessionPill[hidden]{display:none!important}
#remSessionDialog{width:min(440px,100%);background:#152b40;color:white;border:1px solid #597a8b;border-radius:22px;padding:26px 22px;text-align:center;box-shadow:0 14px 55px #0009;font-family:system-ui}
#remSessionDialog h2{margin:0 0 8px;font-size:26px}#remSessionDialog p{color:#b9c9d7;line-height:1.45}
#remSessionDialog button{border:1px solid #69879a;border-radius:12px;padding:11px 15px;background:#1d3850;color:white;font-weight:650;margin:4px;cursor:pointer}
#remSessionDialog button.active,#remSessionDialog button.primary{background:#64DFA9;color:#102236;border-color:#64DFA9}
#remSessionDialog input{width:90px;background:#0e2134;color:white;border:1px solid #69879a;border-radius:10px;padding:12px;text-align:center;font-size:18px}
#remSessionDialog .actions{display:flex;justify-content:center;flex-wrap:wrap;margin-top:15px}
`;document.head.append(css);
const overlay=document.createElement('div');overlay.id='remSessionOverlay';overlay.hidden=true;overlay.innerHTML='<div id=\"remSessionDialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"remSessionTitle\"><h2 id=\"remSessionTitle\">Focus</h2><p id=\"remSessionHint\">Quanto tempo vuoi dedicare alla lettura?</p><div id=\"remSessionChoices\"><button data-min=\"5\" class=\"active\">5 minuti</button><button data-min=\"10\">10 minuti</button><button data-min=\"custom\">Personalizza</button></div><div id=\"remCustomWrap\" hidden><label for=\"remCustomMinutes\">Minuti </label><input id=\"remCustomMinutes\" type=\"number\" min=\"1\" max=\"240\" value=\"20\" inputmode=\"numeric\"></div><p id=\"remSessionDnd\">Per silenziare le notifiche, attiva Non disturbare dal Centro di Controllo del telefono. Alla fine, disattivalo manualmente.</p><div class=\"actions\"><button id=\"remSessionStart\" class=\"primary\">Inizia Focus</button><button id=\"remSessionPause\" hidden>Pausa</button><button id=\"remSessionStop\" hidden>Termina</button><button id=\"remSessionClose\">Non ora</button></div></div>';
document.body.append(overlay);
const pill=document.createElement('button');pill.id='remSessionPill';pill.hidden=true;document.body.append(pill);
let chosen=5,end=0,remaining=0,paused=false,active=false,completed=false;
const $=id=>document.getElementById(id);
function clock(){const ms=paused?remaining:Math.max(0,end-Date.now());const sec=Math.ceil(ms/1000);return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')}
function draw(){pill.hidden=!active;pill.textContent='◷ Focus '+clock();$('remSessionStart').hidden=active;$('remSessionPause').hidden=!active;$('remSessionStop').hidden=!active;$('remSessionChoices').hidden=active;$('remCustomWrap').hidden=active||chosen!=='custom';$('remSessionPause').textContent=paused?'Riprendi':'Pausa';$('remSessionHint').textContent=active?'Tempo rimanente: '+clock():'Quanto tempo vuoi dedicare alla lettura?';}
function finish(){active=false;paused=false;pill.hidden=true;draw();overlay.hidden=false;$('remSessionTitle').textContent='Sessione completata';$('remSessionHint').textContent='Il tempo è terminato. Puoi continuare a leggere o ascoltare.';$('remSessionDnd').textContent='Se hai attivato Non disturbare, ora puoi disattivarlo dal telefono.';$('remSessionStart').hidden=true;$('remSessionChoices').hidden=true;$('remCustomWrap').hidden=true;}
setInterval(()=>{if(!active)return;if(!paused&&Date.now()>=end){finish();return}draw()},1000);
function open(){overlay.hidden=false;$('remSessionTitle').textContent=active?'Focus attivo':'Focus';$('remSessionDnd').textContent='Per silenziare le notifiche, attiva Non disturbare dal Centro di Controllo del telefono. Alla fine, disattivalo manualmente.';draw();}
function addButton(target,position){if(!target||target.querySelector('.rem-session-btn'))return;const b=document.createElement('button');b.type='button';b.className='rem-session-btn';b.textContent='◷ Focus';b.addEventListener('click',open);target.insertAdjacentElement(position,b)}
function mount(){addButton(document.querySelector('#ebook .rem-focus-toolbar'),'beforeend');const paper=document.querySelector('#paper');if(paper&&!paper.querySelector('.rem-session-btn')){const b=document.createElement('button');b.type='button';b.className='rem-session-btn';b.textContent='◷ Focus';b.onclick=open;const heading=paper.querySelector('h2');heading?.insertAdjacentElement('afterend',b)}const listen=document.querySelector('#listen');if(listen&&!listen.querySelector('.rem-session-btn')){const b=document.createElement('button');b.type='button';b.className='rem-session-btn';b.textContent='◷ Focus';b.onclick=open;listen.querySelector('h2')?.insertAdjacentElement('afterend',b)}}
mount();pill.onclick=open;
$('remSessionChoices').addEventListener('click',e=>{const b=e.target.closest('[data-min]');if(!b)return;chosen=b.dataset.min;document.querySelectorAll('#remSessionChoices button').forEach(x=>x.classList.toggle('active',x===b));draw()});
$('remSessionStart').onclick=()=>{const mins=chosen==='custom'?Number($('remCustomMinutes').value):Number(chosen);if(!Number.isFinite(mins)||mins<1||mins>240){alert('Scegli una durata tra 1 e 240 minuti');return}remaining=mins*60000;end=Date.now()+remaining;active=true;paused=false;overlay.hidden=true;draw()};
$('remSessionPause').onclick=()=>{if(paused){end=Date.now()+remaining;paused=false}else{remaining=Math.max(0,end-Date.now());paused=true}draw()};
$('remSessionStop').onclick=()=>{active=false;paused=false;overlay.hidden=true;draw()};
$('remSessionClose').onclick=()=>overlay.hidden=true;
})();