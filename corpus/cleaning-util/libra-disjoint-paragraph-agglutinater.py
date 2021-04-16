import regex as re

# python script to fix the issues in Libra. 

f = open('../txts/Libra.txt', 'r')

data = f.read()

libra_list = re.split('\n', data)

libra_condensed = libra_list

index = 0

# non-terminating characters that can occur at the end of a line
punc = [",", "-", ";"]

# bucket for our merge pairs
merge_list = []

# goes from 0:5043 inclusive so yeah it runs 5044 times 
for paragraph in libra_list:
	
	if (index < len(libra_list) - 1):

		if (libra_list[index] is None):
			continue

		## get last word in current block
		current_final_word = libra_list[index].split(' ')[-1]
		## get first word in forthcoming block
		next_first_word = libra_list[index + 1].split(' ')[0]

		if (current_final_word is None or next_first_word is None):
			continue

		## grab their last chars
		trailing_char = current_final_word[-1]
		leading_char = next_first_word[0]

		# join if..... last char is (,;- || a letter) && leading character is a letter
		if ((trailing_char in punc or trailing_char.isalpha()) and leading_char.isalpha()):
			# add pairs that need to be merged
			# add an extra 1 to the right-hand tuple val so slicing is easier later
			merge_list.append(tuple((index, index+2)))

	index += 1

## fancy slice --> [::-1] = all the items in the list, reversed
for pair in merge_list[::-1]:
	# join the two entries with a space (compare to Collectors.joining(' ') in a Stream).
	merged = ' '.join(libra_condensed[pair[0]:pair[1]]) 
	# replace within copy of text
	libra_condensed[pair[0]:pair[1]] = [merged]

## write out libra_condensed to file see what's up.

# open file
with open('libra_condensed.txt', 'w+') as f:
	for paragraph in libra_condensed:
		f.write(paragraph + '\n')

print('wrote to a file :)')
