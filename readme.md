# Bio-tools

This repo will hold tools I build for my wife to aid in her bioinformatics work. There are an all likelihood (absolute certainty) better programs out there for conducting this work.

## DNA Aligner

The `dnaAlign.js` can be run in the command line as follows:

```
$ npm install
--Installation Info--
$ node dnaAlign.js firstDNAString secondDNAString
```

The `firstDNAString` will be treated as the reference and the `secondDNAString` as the comparison.

The start of the alignment is marked with `<` and the end with `>`.
A red `-` marks a letter that was missing (a deletion) in the comparison string. A `!` before a red letter denotes the letter is an addition to the reference (an insertion).

Example call: (output is colorized in the terminal)

```
$ node dnaAlign.js ATGATCCCATCACCCAGGTATTGAGCATAGTACCCAACAGTTTGTTTTTCAACCCTTGCTCCCCTCCCCCGTCCCCCTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCGCTAAAATGGAGTCC CCGTCCCCCCTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCGC
ATGATCCCATCACCCAGGTATTGAGCATAGTACCCAACAGTTTGTTTTTCAACCCTTGCTCCCCTCCC<CCGTCCCCC!CTCTAGTAGTCTCCAGTGTCTCAGTAGACACTTTATGTCCATGAGTACTTGGGAGGAAATTTATTGGTGTAGTCACACTGCCACCTCCCAAGGGGCCACTCCTGAGGTTATTAAAGGTATACAAACCTCTTCCCTATGAAAGTTTCCGC>TAAAATGGAGTCC
```
