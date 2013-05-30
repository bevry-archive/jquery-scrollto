module.exports =
	templateData:
		package: packageData = require('./package.json')
		site:
			url: packageData.homepage
			services:
				twitterTweetButton: "balupton"
				twitterFollowButton: "balupton"
				githubFollowButton: "balupton"
				gauges: '51a70cd2f5a1f52bb100000a'
				googleAnalytics: 'UA-4446117-1'
	plugins:
		highlightjs:
			removeIndentation: true
