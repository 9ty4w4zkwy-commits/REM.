(()=>{'use strict';
const style=document.createElement('style');style.textContent=`
/* Consistent cover slots; rounded actual artwork, not just its container */
#homeFree .home-book img,#homeFree img,#homeRecommendations img,#homeRecommended img,#remRecommendations img{border-radius:16px!important;clip-path:inset(0 round 16px)!important;box-shadow:none!important}
#homeFree .home-book>img{display:block!important;width:calc(100% - 24px)!important;height:220px!important;max-height:220px!important;min-height:220px!important;object-fit:contain!important;object-position:center!important;margin:12px auto 16px!important;padding:0!important;box-sizing:border-box!important}
#homeFree .home-book{display:flex!important;flex-direction:column!important}
#homeFree .home-book>strong{min-height:2.8em!important}
#homeFree .home-book img[src],#homeFree .home-book picture{overflow:hidden!important;border-radius:16px!important}
#homeFree .home-book img{object-fit:contain!important}
`;document.head.appendChild(style);
const casa=/la casa oltre il bosco/i;
function apply(){
 const free=document.querySelector('#homeFree');
 if(free){
  const cards=[...free.querySelectorAll('.home-book')];
  for(const card of cards){
   const imgs=[...card.querySelectorAll('img')];
   const isCasa=casa.test(card.textContent||'')||imgs.some(im=>casa.test(im.alt||'')||/casa[_-]?oltre|bosco/i.test(im.getAttribute('src')||''));
   const hasMonte=/montecristo/i.test(card.textContent||'');
   if(isCasa&&!hasMonte){card.style.setProperty('display','none','important');card.setAttribute('data-rem-hidden-casa','true');}
   else if(!hasMonte&&!imgs.length&&!card.querySelector('strong,h3,h4')){card.style.setProperty('display','none','important');card.setAttribute('data-rem-hidden-empty','true');}
  }
  // A card can contain an already-hidden Casa inner wrapper and leave its trailer/footer visible.
  for(const card of cards){if(card.getAttribute('data-rem-hidden-casa'))continue;
   const title=card.querySelector('strong,h3,h4');
   if(!title && !card.querySelector('img') && /guarda il trailer/i.test(card.textContent||'')){card.style.setProperty('display','none','important');}
  }
 }
 // Other carousels: hide the entire card, not only its image or text.
 document.querySelectorAll('.home-book,.book-card').forEach(card=>{
  if(card.closest('#homeFree'))return;
  if(casa.test(card.textContent||'')&&!/montecristo/i.test(card.textContent||''))card.style.setProperty('display','none','important');
 });
 // Covers across all home sections: round the image itself.
 document.querySelectorAll('#homeFree img,#homeRecommendations img,#homeRecommended img,#remRecommendations img').forEach(img=>{
  img.style.setProperty('border-radius','16px','important');
  img.style.setProperty('clip-path','inset(0 round 16px)','important');
 });
}
apply();setTimeout(apply,600);setTimeout(apply,1800);
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;setTimeout(()=>{pending=false;apply()},250)}).observe(document.body,{childList:true,subtree:true});
})();