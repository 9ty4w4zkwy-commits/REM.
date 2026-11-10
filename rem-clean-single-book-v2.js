(()=>{'use strict';
function fix(){
 const free=document.getElementById('homeFree');
 if(free){
  for(const card of free.querySelectorAll('.home-book')){
   if(!/montecristo/i.test((card.textContent||'')+' '+[...card.querySelectorAll('img')].map(x=>x.alt).join(' '))){
    card.remove();
   }
  }
 }
 // Remove orphaned trailer-only elements in Novità su REM.
 const headings=[...document.querySelectorAll('h1,h2,h3')];
 const heading=headings.find(h=>/novità su rem/i.test(h.textContent||''));
 if(heading){
  const section=heading.closest('section')||heading.parentElement;
  if(section){
   for(const card of section.querySelectorAll('.home-book,.book-card,article')){
    if(!/montecristo/i.test(card.textContent||''))card.remove();
   }
   // Trailer-only leftover is a standalone control in some versions.
   const all=[...section.querySelectorAll('button,a')];
   for(const el of all){
    if(!/guarda il trailer/i.test(el.textContent||''))continue;
    let node=el;
    while(node.parentElement&&node.parentElement!==section&&node.parentElement!==document.body){
      const parent=node.parentElement;
      if(parent.querySelector('img')||/montecristo/i.test(parent.textContent||''))break;
      if(parent.getBoundingClientRect().width>300)break;
      node=parent;
    }
    if(!node.querySelector('img'))node.remove();
   }
  }
 }
}
fix();setTimeout(fix,350);setTimeout(fix,1200);
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;setTimeout(()=>{pending=false;fix()},200)}).observe(document.body,{childList:true,subtree:true});
})();