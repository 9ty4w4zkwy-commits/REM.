(()=>{'use strict';
const css=document.createElement('style');css.textContent=`
/* Fixed, section-specific slots and rounded artwork */
#homeFree img,#homeFree .home-book img{border-radius:16px!important;clip-path:inset(0 round 16px)!important}
#homeFree .home-book>img{width:calc(100% - 24px)!important;height:220px!important;min-height:220px!important;max-height:220px!important;object-fit:contain!important;object-position:center!important;margin:12px auto 16px!important;padding:0!important;box-sizing:border-box!important}
`;document.head.appendChild(css);
const casa=/la casa oltre il bosco/i;
function eliminate(){
 // Identify the smallest self-contained book card using a title or cover, never a whole carousel.
 const targets=[...document.querySelectorAll('strong,h2,h3,h4,b,p,span,img')].filter(el=>{
 const t=el.tagName==='IMG'?(el.alt||''):(el.textContent||'').trim();
 return casa.test(t)&&t.length<110&&!el.closest('[data-rem-removed]');
 });
 for(const el of targets){
  let node=el,found=null;
  for(let depth=0;node&&depth<7;depth++,node=node.parentElement){
   if(node.id==='home'||node.id==='homeFree'||node.id==='homeRecommendations'||node.id==='homeRecommended'||node.id==='remRecommendations')break;
   const txt=node.textContent||'';
   if(/montecristo/i.test(txt))break;
   const hasCover=!!node.querySelector('img');
   const hasAction=!!node.querySelector('button,a,[role="button"]');
   const isCard=node.matches?.('.home-book,.book-card,.continue-card,.reading-card,article,[class*="book-card"],[class*="recommend-card"]');
   if(isCard || (hasCover&&hasAction&&node.getBoundingClientRect().height>100&&node.getBoundingClientRect().width>100)){found=node;break}
  }
  if(found){found.setAttribute('data-rem-removed','1');found.style.setProperty('display','none','important');}
 }
 // Remove orphaned trailer-only cards from free books and new releases.
 for(const id of ['homeFree','homeNew','homeLatest']){
 const root=document.getElementById(id);if(!root)continue;
 for(const node of root.querySelectorAll('.home-book,.book-card,article')){
  if(!node.querySelector('img') && /guarda il trailer/i.test(node.textContent||'')){node.style.setProperty('display','none','important');node.setAttribute('data-rem-removed','1')}
 }
 }
 document.querySelectorAll('img').forEach(im=>{if(/montecristo/i.test(im.alt||'')||im.closest('#homeFree')){im.style.setProperty('border-radius','16px','important');im.style.setProperty('clip-path','inset(0 round 16px)','important')}});
}
eliminate();setTimeout(eliminate,500);setTimeout(eliminate,1500);
let scheduled=false;new MutationObserver(()=>{if(scheduled)return;scheduled=true;setTimeout(()=>{scheduled=false;eliminate()},150)}).observe(document.body,{childList:true,subtree:true});
})();