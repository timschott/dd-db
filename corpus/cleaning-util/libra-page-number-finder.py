import regex as re

f = open('Libra.txt', 'r')

data = f.read()

l = re.split('\n', data)

matches = []

for p in l:

	matchObj = re.search("[0-9]+\s[•'-]\s+D.*N D.*[OQ]", p)

	if matchObj is not None:
		matches.append(matchObj.group(0))

[print (match[:3]) for match in matches]