import DisneyApp from './src/DisneyApp'

const homeUrl = 'https://cd-static.bamgrid.com/dp-117731241344/home.json'

const app = new DisneyApp(homeUrl)
app.mount(document.getElementById('app'))