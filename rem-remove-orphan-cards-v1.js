(()=>{'use strict';
function cleanup(){
 const triggers=[...document.querySelectorAll('button,a,div,span')].filter(e=>e.children.length===0&&/guarda il trailer/i.test(e.textContent||''));
 for(const trigger of triggers){
 let node=trigger,card=null;
 for(let i=0;i<9&&node;i++,node=node.parentElement){
 const rect=node.getBoundingClientRect(),t=(node.textContent||'').trim();
 if(node.querySelector('img')||/montecristo/i.test(t))break;
 if(rect.width>125&&rect.height>145&&rect.height<950&&t.length<85){
   card=node;break;
 }
 }
 if(card){
  // Avoid hiding a parent section or all books.
  if(card.querySelectorAll('button,a').length<=2 && !card.querySelector('h2,h1')){
   card.style.setProperty('display','none','important');
   card.setAttribute('data-rem-orphan','true');
  }
 }
 }
 // Eliminate empty book-shaped cards left behind by removed content.
 const nodes=[...document.querySelectorAll('[class*="card"],[class*="book"],article')];
 for(const node of nodes){
 if(node.getAttribute('data-rem-orphan')||node.querySelector('img')||/montecristo|premium|nuove storie/i.test(node.textContent||''))continue;
 const r=node.getBoundingClientRect(),t=(node.textContent||'').trim();
 if(r.width>120&&r.width<440&&r.height>220&&r.height<950&&t.length<65&&/guarda il trailer/i.test(t)){
  node.style.setProperty('display','none','important');node.setAttribute('data-rem-orphan','true');
 }
 }
}
cleanup();setTimeout(cleanup,500);setTimeout(cleanup,1600);
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;setTimeout(()=>{pending=false;cleanup()},180)}).observe(document.body,{childList:true,subtree:true});
})();