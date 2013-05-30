module.exports =
	templateData:
		package: packageData = require('./package.json')
		site:
			url: packageData.homepage
			services:
				twitterTweetButton: "balupton"
				twitterFollowButton: "balupton"
				githubFollowButton: "balupton"
				gauges: '5077ae93f5a1f5067b000028'
				googleAnalytics: 'UA-4446117-1'
				reinvigorate: '52uel-236r9p108l'
	plugins:
		highlightjs:
			removeIndentation: true