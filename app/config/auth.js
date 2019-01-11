const googleConfig = {
  clientId: '103586939904-gv4s08qapffhkjfoh568jsuveern85u2.apps.googleusercontent.com',
  clientSecret: 'bo4y8hHxESvUcdLVKz8JQTuZ',
  redirect: 'http://localhost:1337/auth/google/callback'
};
const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

module.exports = {
  'googleAuth' : googleConfig,
  'defaultScope':defaultScope
};