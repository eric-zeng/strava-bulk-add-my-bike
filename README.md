## Add my bikes to my activity

I made this script because I had 100+ bike rides on Strava, and I wanted to
add my old bike to them. But Strava has no bulk gear edit option. So I wrote
this myself.

If you want to do more than add the first bike in your profile to all of the
rides in your profile, you'll have to change some stuff, but feel free to fork
this as a starting point.

### How-to:
Prerequisites: node.js

1. Clone the repository
2. `$ npm install`
3. Create a new app on [Strava](http://developers.strava.com/)
4. Follow the instructions [here](https://www.npmjs.com/package/strava-v3#running-the-tests) to get an OAuth token with write permissions
5. `$ node index.js`