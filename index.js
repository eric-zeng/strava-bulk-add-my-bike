const strava = require('strava-v3');

function getBike() {
  return new Promise((resolve, reject) => {
    strava.athlete.get({}, (err, payload, limits) => {
      if (err) {
        reject(err);
      }
      // console.log(payload);
      resolve(payload.bikes[0].id);
    });
  });
}


function listActivities(page) {
  return new Promise((resolve, reject) => {
    strava.athlete.listActivities({page: page}, (err, payload, limits) => {
      if (err) {
        reject(err);
      }
      resolve(payload);
    });
  });
}

function updateActivity(activityId, bikeId) {
  return new Promise((resolve, reject) => {
    strava.activities.update({id: activityId, 'gear_id': bikeId}, (err, payload, limits) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      // console.log(payload);
      resolve(payload);
    });
  });
} 

async function run() {
  let bikeId = await getBike()

  let page = 0;
  let rides = [];
  while(true) {
    let activities = await listActivities(page);
    console.log('Fetched page ' + page + ', got ' + activities.length + ' activities');
    if (activities.length == 0) {
      break;
    }
    let ridesInBatch = activities.filter((activity) => activity.type === 'Ride');
    rides = rides.concat(ridesInBatch);
    page += 1;
    // break;
  }
  console.log('Got ' + rides.length + ' rides');
  console.log('Adding bike ' + bikeId + ' to all rides');
  // console.log(rides);
  for (let i = 0; i < rides.length; i++) {
    let ride = rides[i];
    // console.log(ride);
    // console.log(bikeId);
    await updateActivity(ride.id, bikeId);  
    console.log('Added to ' + ride.id);
  };
}

try {
  run();
} catch(e) {
  console.log(e.stack);
}