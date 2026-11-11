import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
 for(const width of [320,375,390,430]){
  const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/rem-candidata.html',{waitUntil:'networkidle'});
  async function inspect(screen,selector){
   const metrics=await page.evaluate(()=>{
    const d=document.documentElement;
    return {viewport:d.clientWidth,content:d.scrollWidth,overflowing:[...document.querySelectorAll('body *')].filter(el=>{const b=el.getBoundingClientRect();return b.width>0&&(b.right>d.clientWidth+2||b.left< -2)}).slice(0,8).map(el=>({tag:el.tagName,id:el.id,cls:String(el.className).slice(0,60),right:Math.round(el.getBoundingClientRect().right)}))};
   });
   assert.ok(metrics.content<=metrics.viewport+2,`${width}px ${screen}: horizontal overflow ${JSON.stringify(metrics)}`);
   const button=page.locator(selector);
   await button.waitFor({state:'visible'});
   const box=await button.boundingBox();
   assert.ok(box&&box.width>=44&&box.height>=44,`${width}px ${screen}: primary action below 44px touch target`);
   assert.ok(box.x>=-2&&box.x+box.width<=width+2,`${width}px ${screen}: primary action clipped`);
  }
  await inspect('onboarding','#profileSkip');
  await page.getByRole('button',{name:'Iniziamo'}).click();
  for(let question=1;question<=4;question++){
   await inspect('onboarding question '+question,'#profileSkip');
   const options=page.locator('.profile-choice');
   assert.ok(await options.count()>=4,`${width}px question ${question}: answer choices missing`);
   await options.first().click();
   const next=page.locator('.profile-actions .primary');
   assert.ok(await next.isEnabled(),`${width}px question ${question}: next disabled after answer`);
   await inspect('onboarding question '+question+' next','.profile-actions .primary');
   if(question<4)await next.click();
  }
  await page.locator('#profileSkip').click();
  await inspect('home','#homeExplore');
  await page.locator('#homeLibrary').click();
  await inspect('library','#libraryHome');
  await page.getByRole('button',{name:'Apri libro'}).first().click();
  await inspect('book detail','#detailRead');
  await page.locator('#detailRead').click();
  await inspect('reader','#goLibrary');
  assert.deepEqual(errors,[],`${width}px: browser errors`);
  await page.close();
  console.log(`Candidate mobile layout verified: ${width}px, five screens plus all four onboarding questions`);
 }
}finally{await browser.close()}
