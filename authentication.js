module.exports = {
    type: 'session',
    fields: [
      {
        key: 'email',
        label: 'Email Address',
        type: 'string'       
      },
      {
        key: 'password',
        label: 'Password',
        type: 'password'       
      }
    ],
    sessionConfig: {
        perform: (z, bundle) => {
            // Exchange email and password for an API access token
            return z.request({
                method: 'POST',
                url: 'https://api.10centuries.org/auth/login',
                body: {
                    acctname: bundle.authData.email,
                    acctpass: bundle.authData.password,
                    client_guid: process.env.CLIENT_GUID
                }
            }).then((response) => {
                if (response.status !== 200)
                    throw new Error('The credentials you supplied are not valid.');
                const json = JSON.parse(response.content);
                return {
                    token: json.data.token
                };
            })
        }
    },
    test: (z, bundle) => {
        return z.request({
            method: 'GET',
            url: 'https://api.10centuries.org/users/me'
        }).then((response) => {
            if (response.status !== 200)
                throw new Error('Authorization failed!');
            return true;
        });         
    }
};