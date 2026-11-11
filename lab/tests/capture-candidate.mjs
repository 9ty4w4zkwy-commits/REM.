import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const folder='lab/visual-review';
await mkdir(folder,{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 await page.goto('http://127.0.0.1:8765/rem-candidata.html',{waitUntil:'networkidle'});
 await page.screenshot({path:folder+'/01-onboarding.png',fullPage:true});
 await page.locator('#profileSkip').click();
 await page.screenshot({path:folder+'/02-home.png',fullPage:true});
 await page.locator('#homeLibrary').click();
 await page.screenshot({path:folder+'/03-library.png',fullPage:true});
 await page.getByRole('button',{name:'Apri libro'}).first().click();
 await page.screenshot({path:folder+'/04-book-detail.png',fullPage:true});
 await page.locator('#detailRead').click();
 await page.screenshot({path:folder+'/05-reader.png',fullPage:false});
 console.log('Captured five candidate screens at iPhone-sized viewport');
}finally{await browser.close()}
