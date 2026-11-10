(()=>{'use strict';
const css=document.createElement('style');css.textContent=`
/* REM cover design system: one source cover, standardized section-specific slots */
#homeFree .home-book>img{display:block!important;box-sizing:border-box!important;width:calc(100% - 24px)!important;height:220px!important;min-height:220px!important;max-height:220px!important;object-fit:contain!important;object-position:center!important;border-radius:16px!important;margin:12px auto 16px!important;align-self:center!important}
#homeFree .home-book{display:flex!important;flex-direction:column!important}
#homeFree .home-book>strong{min-height:2.8em!important}
#homeRecommendations .home-book>img,#homeRecommended .home-book>img,#remRecommendations .home-book>img{height:190px!important;max-height:190px!important;object-fit:contain!important;border-radius:16px!important}
.rem-cover-slot{display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
.rem-cover-slot img{object-fit:contain!important;max-height:100%!important;border-radius:12px!important}
`;document.head.append(css);
function hideCasa(){const selectors=['#homeFree .home-book','#homeRecommendations .home-book','#homeRecommended .home-book','#remRecommendations .home-book','.book-card','article'];for(const sel of selectors){document.querySelectorAll(sel).forEach(el=>{if(/casa oltre il bosco/i.test(el.textContent||'')&&!/montecristo/i.test(el.textContent||''))el.style.setProperty('display','none','important')})}
document.querySelectorAll('img').forEach(img=>{const alt=(img.alt||'').toLowerCase();if(!alt.includes('casa oltre il bosco'))return;let el=img;for(let i=0;i<5&&el;i++,el=el.parentElement){if(el.matches?.('.home-book,.book-card,article,.card')){el.style.setProperty('display','none','important');break}}});
}
hideCasa();setTimeout(hideCasa,800);setTimeout(hideCasa,2400);
const observer=new MutationObserver(()=>{clearTimeout(window.__remCasaTimer);window.__remCasaTimer=setTimeout(hideCasa,180)});observer.observe(document.body,{childList:true,subtree:true});
})();