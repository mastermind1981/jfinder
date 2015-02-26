module.exports = {

    client: {
        url: 'http://localhost:3000'
    },

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
    },

    email: {
        host: {
            user: '', // <--- put an email here
            pass: ''  // <--- put password for this email here
        },

        verify: {
            url: 'http://localhost:' + (process.env.PORT || 3005) + '/register/verification?token=',
            model: {
                title: 'JFinder Account Verification',
                subTitle: 'Verify your account',
                body: 'Please click the button below to activate your account'
            }
        }
    }

};
