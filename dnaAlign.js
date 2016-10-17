var colors = require('colors');
// Where does the sequence match?
// Where doesn't it?

// Chars can only be C, A, G or T
// comparisons can have one added value? or two?

// Account for added or missed values.
// No need to account for more than two disparate values //

function retrieveStartPoint(ref, comp) {
  var exactMatch = ref.indexOf(comp);

  if (exactMatch !== -1) {
    return exactMatch;
  }

  for (var i = 0; i < comp.length; i += 5) {
    var nearMatch = ref.indexOf(comp.slice(i, i + 5));
    if (nearMatch !== -1) {
      return nearMatch - i;
    }
  }
}

function isMissed(ref, comp) {
  // What if ref.length and comp.length are not equal?
  // returns true if comp has an extra character.
  // var extra = false;
  var offset = 1;
  var matches = 0;

  for (var i = 0; i < ref.length - 2; i++) {
    var r = ref[i];
    var c = comp[i + offset];

    if (r === c) {
      matches += 1;
      // extra = true;
    } else if (offset < 3){
      offset += 1;
      // extra = false;
    }
  }

  return matches > 4; // return extra
}

function displayDifferences(ref, comp) { // "ABCDEF". "CDE"
  var startPoint = retrieveStartPoint(ref, comp); // 2
  var result = [];
  var offset = 0; // source of my problems?

  for (var i = 0; i < ref.length; i++) {
    var refChar = ref[i]; // "A"
    var compIndex = i - startPoint + offset; // -2
    var compChar = comp[compIndex]; // undefined

    if (i === startPoint) {
      result.push("<");
      var started = true;
    }

    if (compChar === undefined) {
      if (started) {
        result.push(">");
        started = false;
      }
      result.push(refChar.yellow);
    } else if (compChar === refChar) {
      result.push(refChar.green);
    } else {
      // returns true is ref is missing value.
      var missing = isMissed(ref.slice(i, i + 10), comp.slice(compIndex, compIndex + 10));

      if (missing) {
        // If the ref is missing this, it is extra, so going forward
        // we should adjust i to compare the appropriate characters.
        i -= 1;
        offset += 1;
        result.push("!" + compChar.red);
      } else {
        // The comp was missing this, so we adjust the offset to compare
        // appropriate characters.
        offset -= 1;
        result.push("-".red);
      }
    }
  }

  return result.join("");
}

var referenceString = "ATGATCCCATCACCCAGGTATTGAGCATAGTACCCAACAGTTTGTTTTTCAACCCTTGCTCCCCTCCCCCGTCCCCCTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCGCTAAAATGGAGTCC";

var cas9 = "ACCCTTGCTCCCCTCCCCCGTCCCCCCTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCC";
var n2D7 = "CCGTCCCCCCTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCGC";
var n2H7 = "CCCTCCCCCGTCCCCCCTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCGC";
var s2G12 = "GTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCG";


// console.log("CAS9".bgGreen, displayDifferences(referenceString, cas9));
// console.log("------");
// console.log("N2D7".bgGreen, displayDifferences(referenceString, n2D7));
// console.log("------");
// console.log("N2H7".bgGreen, displayDifferences(referenceString, n2H7));
// console.log("------");
// console.log("S2G12".bgGreen, displayDifferences(referenceString, s2G12));

var args = process.argv.slice(2);

console.log(displayDifferences(args[0], args[1]));




// Missing characters are VERY unstable.
