import DisneyApp from './src/DisneyApp'

const homeUrl = 'https://cd-static.bamgrid.com/dp-117731241344/home.json'
const refUrl = 'https://cd-static.bamgrid.com/dp-117731241344/sets/#refid#.json'

const app = new DisneyApp(homeUrl, refUrl)
app.mount(document.getElementById('app'))