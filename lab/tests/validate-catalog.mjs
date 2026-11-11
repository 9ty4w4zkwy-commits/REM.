import fs from 'node:fs';
import assert from 'node:assert/strict';
const books=JSON.parse(fs.readFileSync('lab/catalog/books.json','utf8'));
const chapters=JSON.parse(fs.readFileSync('lab/catalog/chapters.json','utf8'));
assert.equal(books.schemaVersion,1);assert.equal(chapters.schemaVersion,1);
assert.ok(Array.isArray(books.books));assert.ok(Array.isArray(chapters.chapters));
const ids=new Set();
for(const b of books.books){assert.equal(typeof b.id,'string');assert.ok(b.id);assert.equal(typeof b.title,'string');assert.ok(b.title);assert.ok(!ids.has(b.id),'Duplicate book ID');ids.add(b.id)}
const chapterIds=new Set();
for(const c of chapters.chapters){assert.equal(typeof c.id,'string');assert.ok(c.id);assert.ok(!chapterIds.has(c.id),'Duplicate chapter ID');chapterIds.add(c.id);assert.ok(ids.has(c.bookId),'Unknown book ID: '+c.bookId);assert.equal(typeof c.text,'string');assert.equal(typeof c.title,'string')}
console.log('Catalog validation passed:',ids.size,'books,',chapterIds.size,'chapters');
