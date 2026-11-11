import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,channel:'chrome'});
await mkdir('lab/visual-review',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/rem-recupero-due-libri-focus.html',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForTimeout(2500);
 await page.screenshot({path:'lab/visual-review/00-approved-REM56-initial.png',fullPage:false,timeout:30000});
 console.log('Captured approved REM 5.6 reference at matching 390x844 viewport; page errors:',errors.length);
}finally{await browser.close()}
