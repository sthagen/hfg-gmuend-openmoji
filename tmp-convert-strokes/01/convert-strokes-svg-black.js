const glob = require('glob').sync;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const JSDOM = require('jsdom').JSDOM;

const paper = require('paper');
const ExtendPaperJs = require('paperjs-offset');

ExtendPaperJs(paper);
paper.setup();

console.log(paper.version);

// let emojiPaths = glob('./color/svg/*.svg');
let emojiPaths = glob('../svg-test/*.svg');
const folderOut = './svg-nostrokes';

const writeSvg = (filePath, data) => {
  fs.writeFileSync(filePath, data);
}

const isSet = (attr) => {
  if (attr == undefined || attr == 'none') {
    return false;
  }
  return true;
}

const offsetStroke = (pth, offset, attrStroke, attrFill, attrCap, attrJoin) => {
  let res = pth.offsetStroke(1, { cap: attrCap, join: attrJoin });
  return res.exportSVG({ precision: 4 });
}

const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const generateSvg = (srcFilePath, destFilePath) => {
  const dom = new JSDOM(fs.readFileSync(srcFilePath, 'utf8'));
  const doc = dom.window.document;
  console.log('Converting: ' + srcFilePath);

  doc.querySelectorAll('path, line, polyline, polygon, rect').forEach(el => {
    let offset = el.getAttribute('stroke-width') / 2;
    let attrFill = el.getAttribute('fill');
    let attrStroke = el.getAttribute('stroke');
    let attrCap = el.getAttribute('stroke-linecap');
    let attrJoin = el.getAttribute('stroke-linejoin');

    if (isSet(attrStroke) && !isSet(attrFill)) {

      if (el.tagName == 'path') {
        console.log('Path:')
        console.log('----------------');
        let d = el.getAttribute('d');
        let p = new paper.Path({ pathData: d, strokeWidth: 0.1 });
        let l = p.segments.length;

        if (l > 1) {
          let res = p.offsetStroke(1, { cap: 'round', join: 'round' });
          res = res.exportSVG({ precision: 4 });
          res = res.getAttribute('d');
          el.setAttribute('d', res);
          el.setAttribute('fill', attrStroke);
          el.setAttribute('stroke', attrFill);
          // console.log(res);
        } else {
          el.remove();
        }
      }
    }

  });

  writeSvg(destFilePath, doc.querySelector('svg').outerHTML);
}

console.log('Convert SVG strokes to areas: ' + emojiPaths.length);
emojiPaths.forEach(f => {
  generateSvg(
    f,
    path.join(folderOut, path.basename(f))
  );
});