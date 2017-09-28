#!/usr/bin/env node

const fs = require("fs");

const importPrintFunction = "from __future__ import print_function";

const files = process.argv.slice(2);
for (const fileName of files) {
    const content = fs.readFileSync(fileName, { encoding: "utf-8" });
    if (content.includes(importPrintFunction)) {
        continue;
    }
    console.log(fileName);
    const lines = fs.readFileSync(fileName, { encoding: "utf-8"}).split('\n');
    const firstImport = lines.findIndex(line => line.startsWith("import ") || line.startsWith("from "));
    lines.splice(firstImport === -1 ? 0 : firstImport, 0, importPrintFunction);
    fs.writeFileSync(fileName, lines.join('\n'));
}
