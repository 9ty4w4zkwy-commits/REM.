"""Build a self-contained static candidate folder, never modifying the approved site."""
from pathlib import Path
import json
import shutil

root=Path(__file__).resolve().parents[2]
dest=root/"lab"/"dist"/"rem-candidate"
if dest.exists(): shutil.rmtree(dest)
(dest/"lab"/"styles").mkdir(parents=True)
(dest/"lab"/"modules").mkdir(parents=True)
(dest/"lab"/"catalog").mkdir(parents=True)
(dest/"lab"/"content").mkdir(parents=True)
files=[
 "rem-candidata.html",
 "lab/styles/app.css",
 "lab/modules/app-core.js",
 "lab/modules/onboarding.js",
 "lab/catalog/books-candidate.json",
 "lab/catalog/chapters.json",
]
catalog=json.loads((root/"lab/catalog/books-candidate.json").read_text())
for book in catalog["books"]:
 source=book.get("chaptersSource")
 if source:
  path=Path(source)
  if path.is_absolute() or ".." in path.parts or not str(path).startswith("lab/content/"):
   raise ValueError(f"Unsafe chapter source: {source}")
  files.append(source)
for name in files:
 source=root/name
 if not source.is_file():raise FileNotFoundError(source)
 target=dest/name
 target.parent.mkdir(parents=True,exist_ok=True)
 shutil.copy2(source,target)
print(f"Candidate isolated in {dest}, {len(files)} files")
