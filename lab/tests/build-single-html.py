"""Build one-file REM candidate with all JSON, CSS and JS embedded."""
from pathlib import Path
import json
import re

root=Path(__file__).resolve().parents[2]
html=(root/"rem-candidata.html").read_text()
css=(root/"lab/styles/app.css").read_text()
app=(root/"lab/modules/app-core.js").read_text()
onboarding=(root/"lab/modules/onboarding.js").read_text()
catalog=json.loads((root/"lab/catalog/books-candidate.json").read_text())
chapters=json.loads((root/"lab/catalog/chapters.json").read_text())
embedded={
 "./lab/catalog/books-candidate.json":catalog,
 "./lab/catalog/chapters.json":chapters,
}
for book in catalog["books"]:
 path=book.get("chaptersSource")
 if path:
  p=Path(path)
  if p.is_absolute() or ".." in p.parts or not path.startswith("lab/content/"):
   raise ValueError("Unsafe content source")
  embedded["./"+path]=json.loads((root/p).read_text())
shim="""const REM_EMBEDDED_DATA="""+json.dumps(embedded,ensure_ascii=False,separators=(",",":")).replace("</","<\\/")+""";
const REM_NATIVE_FETCH=window.fetch.bind(window);
window.fetch=(input,options)=>{
 const key=String(input);
 if(Object.prototype.hasOwnProperty.call(REM_EMBEDDED_DATA,key))
  return Promise.resolve(new Response(JSON.stringify(REM_EMBEDDED_DATA[key]),{status:200,headers:{"Content-Type":"application/json"}}));
 return REM_NATIVE_FETCH(input,options);
};
"""
html=html.replace('<link rel="stylesheet" href="./lab/styles/app.css">',"<style>"+css.replace("</style","<\\/style")+"</style>")
html=html.replace('<script src="./lab/modules/app-core.js" defer></script>',"<script>"+shim+"\ndocument.addEventListener(\'DOMContentLoaded\',()=>{\n"+app.replace("</script","<\\/script")+"\n});</script>")
html=html.replace('<script src="./lab/modules/onboarding.js" defer></script>',"<script>document.addEventListener(\'DOMContentLoaded\',()=>{\n"+onboarding.replace("</script","<\\/script")+"\n});</script>")
assert not re.search(r'<(?:script|link)[^>]+(?:src|href)=',html)
dest=root/"lab/dist/rem-candidate-single"
dest.mkdir(parents=True,exist_ok=True)
(dest/"rem-candidata.html").write_text(html)
print("Single HTML candidate generated:",len(html.encode()),"bytes")
