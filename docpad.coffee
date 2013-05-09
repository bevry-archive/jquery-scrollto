module.exports =
	plugins:
		highlightjs:
			transforms: [
				# Remove extra indentation from the code block
				# Requires: http://balupton.com/project/bal-util
				(source, language) ->
					require('bal-util').removeIndentation(source)
			]