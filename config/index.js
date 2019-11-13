const env = process.env.NODE_ENV
let BASE_URL,
    API_URL
if (env == 'production') {
    BASE_URL = 'http://presexvideo.com'
    API_URL = 'http://presexvideo.com/backend/'
}  else {
    BASE_URL = 'http://localhost:3000'
    API_URL = 'http://presexvideo.com/backend/'
}
module.exports = {
    BASE_URL,
    API_URL
}