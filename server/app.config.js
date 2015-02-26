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
        },

        github: {
            url: 'https://github.com/login/oauth/access_token',
            secret: '248cafbe2ce81ae3e3fe85b3ca4a1bd8635cdf91'
        }
    },

    api: {
        google: {
            url: 'https://www.googleapis.com/plus/v1'
        },

        github: {
            url: 'https://api.github.com/user'
        }
    }

};
