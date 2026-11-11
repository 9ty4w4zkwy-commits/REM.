#!/usr/bin/env python3
"""Extract original REM embedded book JSON, without rewriting the approved HTML."""
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "REM_Iterazione3_Focus_Mode.html"
DEST = ROOT / "lab" / "content"
IDS = {"switch-libro-montecristo": "book_montecristo.json", "switch-libro-casa": "book_casa-oltre-bosco.json"}

class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.current = None
        self.parts = []
        self.found = {}
    def handle_starttag(self, tag, attrs):
        if tag == "script":
            attributes = dict(attrs)
            self.current = attributes.get("id") if attributes.get("id") in IDS else None
            self.parts = []
    def handle_data(self, data):
        if self.current:
            self.parts.append(data)
    def handle_endtag(self, tag):
        if tag == "script" and self.current:
            if self.current in self.found:
                raise ValueError("Duplicate embedded book: " + self.current)
            self.found[self.current] = "".join(self.parts)
            self.current = None
            self.parts = []

def main():
    parser = Scripts()
    parser.feed(SOURCE.read_text(encoding="utf-8"))
    if set(parser.found) != set(IDS):
        raise ValueError("Expected both original book scripts; found " + repr(list(parser.found)))
    DEST.mkdir(parents=True, exist_ok=True)
    for source_id, filename in IDS.items():
        book = json.loads(parser.found[source_id])
        segments = book.get("segmenti")
        if not isinstance(segments, list) or not segments or not all(isinstance(s.get("text"), str) for s in segments):
            raise ValueError("Invalid segments: " + source_id)
        target = DEST / filename
        target.write_text(json.dumps(book, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{target.relative_to(ROOT)}: {len(segments)} segments")
if __name__ == "__main__":
    main()
