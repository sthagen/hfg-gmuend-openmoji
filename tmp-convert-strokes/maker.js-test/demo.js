var d, res;

// var spo = require('svg-path-outline');


var makerjs = require("makerjs");

function outline(svgData, distance, opts) {
  var defaultOptions = {
    bezierAccuracy: 0.25,
    joints: 0,
    outside: true,
    tagName: 'path'
  };
  var o = makerjs.extendObject(defaultOptions, opts);
  var closed = true;
  var input;
  switch (o.tagName) {
    case 'polyline':
      closed = false;
      //fall through
    case 'polygon':
      //use points. 
      //Need to mirror them on y axis because they are expected to be in MakerJs coordinate space
      input = makerjs.model.mirror(new makerjs.models.ConnectTheDots(closed, svgData), false, true);
      break;
    default:
      input = makerjs.importer.fromSVGPathData(svgData, { bezierAccuracy: o.bezierAccuracy });
      break;
  }
  var result;
  if (o.inside && o.outside) {
    result = makerjs.model.expandPaths(input, distance, o.joints);
  } else {
    result = makerjs.model.outline(input, distance, o.joints, o.inside);
    // console.log(result)
  }
  makerjs.model.simplify(result);
  console.log(result);
  return makerjs.exporter.toSVGPathData(result, false, [0, 0]);
}


// star
d = "M 95 35 L 59 35 L 48 0 L 36 35 L 0 35 L 29 56 L 18 90 L 48 69 L 77 90 L 66 56 Z";
res = outline(d, 4, {inside: true, outside: true});
createNode("path", { d: d, transform: "translate(100, 100)", stroke: "rgba(226, 54, 193, 0.5)", fill: "none" });
createNode("path", { d: res, transform: "translate(100, 100)", fill: "rgba(226, 54, 193, 0.5)", stroke: "black" });

// line
d = "M 0,0 H 70";
res = outline(d, 10);
createNode("path", { d: d, transform: "translate(300, 150)", stroke: "rgba(106, 204, 193, 0.5)", fill: "none" });
createNode("path", { d: res, transform: "translate(300, 150)", fill: "rgba(106, 204, 193, 0.5)", stroke: "black" });

// line
d = "M 0,0 l 60,30";
res = outline(d, 10);
createNode("path", { d: d, transform: "translate(400, 130)", stroke: "rgba(106, 204, 193, 0.5)", fill: "none" });
createNode("path", { d: res, transform: "translate(400, 130)", fill: "rgba(106, 204, 193, 0.5)", stroke: "black" });

// curve and line
d = "M0,0c50,0 80,0 100,50l-50,10";
res = outline(d, 10);
createNode("path", { d: d, transform: "translate(500, 100)", stroke: "rgba(156, 104, 193, 0.5)", fill: "none" });
createNode("path", { d: res, transform: "translate(500, 100)", fill: "rgba(156, 104, 193, 0.5)", stroke: "black" });

// strange "curve" and line
d = "M0,0c0,0 100,50 100,50l-50,10";
res = outline(d, 10);
createNode("path", { d: d, transform: "translate(700, 100)", stroke: "rgba(116, 104, 253, 0.5)", fill: "none" });
createNode("path", { d: res, transform: "translate(700, 100)", fill: "rgba(116, 104, 253, 0.5)", stroke: "black" });

// more complex path
d = "M28,48.4065v-25h9.6785c3.4915,0,6.3215,2.7879,6.3215,6.2268l0,0c0,3.4389-2.8301,6.2264-6.3215,6.2264H28";
res = outline(d, 1);
createNode("path", { d: d, transform: "translate(0, 200) scale(5)", stroke: "rgba(236, 184, 13, 0.5)", fill: "none", 'stroke-width': 0.2 });
createNode("path", { d: res, transform: "translate(0, 200) scale(5)", fill: "rgba(236, 184, 13, 0.5)", stroke: "black", 'stroke-width': 0.2 });



// let canvas = document.querySelector('canvas')
// paper.setup(canvas)
// paper.view.center = [0, 0]


// // line
// let path1 = new paper.Path.Line({ from: [0, 0], to: [0, 100], strokeColor: 'rgba(226, 54, 193, 0.5)', strokeWidth: 1 })
// path1.translate(-400, -300);
// path1.offsetStroke(10, { cap: 'round' })
// path1.bringToFront()
// console.log(path1);
// console.log('----------------');

// // curve 
// let path2 = new paper.Path({ pathData: 'M0,0c50,0 80,0 100,50', strokeColor: 'rgba(106, 204, 193, 0.5)', strokeWidth: 1 })
// path2.translate(-300, -300);
// path2.offsetStroke(10, { cap: 'round', join: 'round' })

// // curve and line
// let path3 = new paper.Path({ pathData: 'M0,0c50,0 80,0 100,50l-50,10', strokeColor: 'rgba(156, 104, 193, 0.5)', strokeWidth: 1 })
// path3.translate(-100, -300);
// path3.offsetStroke(10, { cap: 'round', join: 'round' })

// // strange "curve" and line
// let path4 = new paper.Path({ pathData: 'M0,0c0,0 100,50 100,50l-50,10', strokeColor: 'rgba(116, 104, 253, 0.5)', strokeWidth: 1 })
// path4.translate(100, -300);
// path4.offsetStroke(10, { cap: 'round', join: 'round' })


// // try to take a small part of a path (two segments)
// let path5 = new paper.Path({ pathData: 'M28,48.4065v-25h9.6785c3.4915,0,6.3215,2.7879,6.3215,6.2268l0,0c0,3.4389-2.8301,6.2264-6.3215,6.2264H28', strokeColor: 'rgba(236, 184, 13, 0.5)', strokeWidth: 1 })
// path5.scale(10)
// path5.translate(300, -200)
// //if (path5.firstSegment.handleOut.x == 0 && path5.firstSegment.handleOut.y == 0) {
//   path5.firstSegment.handleOut.x = 0.5;
//   path5.firstSegment.handleOut.y = 2.5;
// //}
// path5.offsetStroke(10, { cap: 'round', join: 'round' })
// console.log(path5)

// // try to take a small part of a path (two segments)
// let path6 = new paper.Path({ pathData: 'M28,48.4065v-25h9.6785c3.4915,0,6.3215,2.7879,6.3215,6.2268l0,0c0,3.4389-2.8301,6.2264-6.3215,6.2264H28', strokeColor: 'rgba(156, 204, 193, 0.5)', strokeWidth: 1 })
// path6.scale(10)
// path6.translate(300, -200)
// path6.removeSegments(5, 7);
// path6.removeSegments(0, 2);
// if (path6.segments.length > 1) {
//   let res = path6.offsetStroke(10, { cap: 'round', join: 'round' })
//   // res = res.exportSVG({ precision: 4 })
//   // console.log(res)
// }

// // split up path in parts
// let path7 = new paper.Path({ pathData: 'M28,48.4065v-25h9.6785c3.4915,0,6.3215,2.7879,6.3215,6.2268l0,0c0,3.4389-2.8301,6.2264-6.3215,6.2264H28', strokeColor: 'rgba(156, 204, 93, 0.5)', strokeWidth: 1 })
// path7.scale(10)
// path7.translate(-300, 100)

// console.log(path7);
// let l = path7.segments.length;
// if (l > 1) {
//   for (var i = 0; i < l - 1; i++) {
//     let p = path7.clone();
//     if (i < l - 2) p.removeSegments(i + 2);
//     if (i > 0) p.removeSegments(0, i);
//     p.closed = false;
//     console.log(p);
//     try {
//       if (p.length > 0) {
//         let res = p.offsetStroke(10, { cap: 'round' });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }