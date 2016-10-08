const packageData = require('./package.json')
module.exports = {
	templateData: {
		package: packageData,
		site: {
			url: packageData.homepage,
			services: {
				twitterTweetButton: 'balupton',
				twitterFollowButton: 'balupton',
				githubFollowButton: 'balupton'
			}
		}
	},

	plugins: {
		highlightjs: {
			removeIndentation: true
		}
	}
}
