const prod = process.env.NODE_ENV === 'production';

module.exports = {
  API_URL: prod ? 'https://pos.pages.fm/api' : 'http://localhost:5000/api',
};
