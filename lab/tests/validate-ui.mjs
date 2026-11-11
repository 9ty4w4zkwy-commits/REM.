import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync('rem-modulare-demo.html','utf8');
const js=fs.readFileSync('lab/modules/app-core.js','utf8');
const css=fs.readFileSync('lab/styles/app.css','utf8');
for(const id of ['status','library','reader','settings','books','chapter','format','chapterText','audio','source','timerStart','timerPause','timerReset','minutes','clock','theme']) {
  assert.match(html,new RegExp('id="'+id+'"'), 'Missing UI element '+id);
}
for(const asset of ['./lab/styles/app.css','./lab/modules/app-core.js']) assert.ok(html.includes(asset),'Missing dependency '+asset);
for(const token of ['--bg','--surface','--text','--accent']) assert.ok(css.includes(token),'Missing design token '+token);
assert.match(js,/lab\/catalog\/books\.json/);
assert.match(js,/lab\/catalog\/books-candidate\.json/);
const candidate=fs.readFileSync('rem-candidata.html','utf8');
assert.match(candidate,/data-catalog="candidate"/);
assert.match(js,/fetch\('\.\/lab\/catalog\/chapters\.json'\)/);
assert.match(js,/bookChapters\(book\.id\)\.length\?'Apri libro':'Contenuto non ancora migrato'/);
console.log('Static UI contracts passed');
