const googleConfig = {
  clientId: '103586939904-gv4s08qapffhkjfoh568jsuveern85u2.apps.googleusercontent.com',
  clientSecret: 'bo4y8hHxESvUcdLVKz8JQTuZ',
  redirect: 'http://localhost:1337/auth/google/callback'
};
const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

exports.auth = {
  'googleAuth' : googleConfig,
  'defaultScope':defaultScope
};


//mongo db urls
//configuration
exports.db_urls = {
	'url' : 'mongodb://localhost:27017/data',
	'prod_url':'mongodb://test:test@ds145128.mlab.com:45128/myappdatabase12'
};


// "mongodb": {
//     "host": "ds145128.mlab.com",
//     "port": 45128,
//     "url": "",
//     "database": "myappdatabase12",
//     "password": "test",
//     "name": "mongodb",
//     "user": "test",
//     "connector": "mongodb"
//   }