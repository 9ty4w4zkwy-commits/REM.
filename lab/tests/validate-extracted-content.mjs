import fs from 'node:fs';
import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('lab/catalog/books.json','utf8'));
const expected=new Map([['montecristo',452],['casa',278]]);
for(const book of catalog.books){
 if(book.contentStatus!=='integrated')continue;
 assert.match(book.chaptersSource,/^lab\/content\/[a-z0-9_-]+\.json$/,'Unsafe or missing content path');
 assert.ok(fs.existsSync(book.chaptersSource),'Missing extracted content: '+book.id);
 const source=JSON.parse(fs.readFileSync(book.chaptersSource,'utf8'));
 assert.equal(source.id,book.legacyContentId||book.id,'Book ID mismatch');
 assert.ok(Array.isArray(source.segmenti),'Missing segments');
 if(expected.has(book.id))assert.equal(source.segmenti.length,expected.get(book.id),'Unexpected segment count');
 assert.ok(source.segmenti.every(s=>typeof s.text==='string'&&s.text.trim()&&Number.isInteger(s.chapter)),'Invalid segment');
 const chapterNumbers=[...new Set(source.segmenti.map(s=>s.chapter))];
 assert.ok(chapterNumbers.length>0,'No chapters');
 console.log(book.id+': '+source.segmenti.length+' segments, '+chapterNumbers.length+' chapters');
}
assert.equal(catalog.books.filter(b=>b.contentStatus==='integrated').length,2,'Expected two integrated books');
console.log('Extracted book content contracts passed');
