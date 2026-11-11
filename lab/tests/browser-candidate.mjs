import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/rem-candidata.html',{waitUntil:'networkidle'});
 if(await page.locator('#welcome').isVisible())await page.locator('#welcomeStart').click();
 await page.getByRole('button',{name:'Apri libro'}).first().waitFor();
 assert.equal(await page.locator('.book').count(),1,'Candidate must have one book');
 assert.match(await page.locator('#books').innerText(),/Montecristo/);
 assert.doesNotMatch(await page.locator('#books').innerText(),/casa oltre il bosco/i);
 await page.getByRole('button',{name:'Apri libro'}).click();
 assert.equal(await page.locator('#format option[value="audio"]').isDisabled(),true,'Unavailable audio must be disabled');
 assert.equal(await page.locator('#format option[value="paper"]').isDisabled(),true,'Unavailable paper synchronization must be disabled');
 assert.ok((await page.locator('#chapterText').innerText()).length>1000,'Full original Montecristo text must load');
 assert.deepEqual(errors,[],'No browser JavaScript errors');
 console.log('Montecristo-only candidate smoke test passed');
}finally{await browser.close()}
