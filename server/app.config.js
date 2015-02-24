module.exports = {

	db: {
		user: 'admin',
		password: 'admin',
		name: 'jfinder'
	},

	jwt: {
		algorithm: 'HS265',
		secret: 'secret'
	},

	data: {
		jobs: ['Front-end Developer', 'Java Developer', 'Junior UX Designer', 'Senior JavaScript Developer']
	},

	auth: {
		google: {
			url: 'https://accounts.google.com/o/oauth2/token',
			secret: 'hayFeUstKSBVwbGwvd6CmTNN'
		}
	},

	api: {
		google: {
			url: 'https://www.googleapis.com/plus/v1'
		}
	}

};
