## Text Cleaning Changelog

I processed most of these text in Sublime since they mostly came in looking ok. So far, *Libra* had the most things to change. Keeping a running log here as I make edits.

*Americana* (cleaned 4/14)
*	removed headmatter
*	removed `0x0` markup introduced by `rtf.` conversion
*	removed tabs
*	regex removed chapter numbers with: `[0-9]+$`
*	regex removed part numbers with: `PART [A-Z]+`
*	removed opening and closing blank lines
*	removed remaining blank lines `(^\s)`

*Libra* (cleaned 4/15)
*	removed headmatter
*	removed `0x0` markup introduced by `.rtf` conversion
*	removed tabs
*	removed duplicated chunk in original body. 
	* Began shortly after closing sentence (ft. Marina + child).
*	regex replaced `\n{2,}`  with a single `\n`
*	regex removed `\s\n`
*	(used python to do a little investigation re: what numbers i had hit/which to still get)
*	manually removed LIBRA 60 and fixed that para
*	manually removed LIBRA • JOS.
*	manually removed LIBRA • W7.
*	regex removed `LIBRA\s+•\s+[0-9]*$` (223)
*	regex removed `[0-9]+\s[•'-]\s+D.*N D.*[OQ]` (218)
*	regex removed `[0-9]+\s[•'-]\s+DON$` (2)
*	manually removed `[0-9]\s+[\n•’-]\s+D*\n` (4)
*	manually removed `-138 •• DON DELILLO`
*	removed two stray `•`’s
*	manually removed part titles (one and two)
*	manually removed section titles (various, like “In Atsugi”).
*	regex removed loose leading whitespace `^\s`
*	condensed disjoint paragraphs via a python script.

*White Noise* (cleaned 4/14)
*	removed headmatter
*	removed part numbers
*	removed section numbers with [0-9]+$
*	removed part numbers manually (only 3 parts).
*	removed empty lines