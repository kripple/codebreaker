// TODO

// Since we're using defaultNow() and inserting records with today's date only, we can reliably assume that "tomorrow" is not in the table yet — so the only thing we need to do is calculate time until midnight tonight (i.e., the start of tomorrow).

// MAKE SURE THE DATE IS IN UTC !!!

// const now = new Date();
// const tomorrow = new Date(now);
// tomorrow.setUTCHours(0, 0, 0, 0);
// tomorrow.setUTCDate(now.getUTCDate() + 1);

// const msUntilTomorrow = tomorrow.getTime() - now.getTime();
// const seconds = Math.floor(msUntilTomorrow / 1000);
// const minutes = Math.floor(seconds / 60);
// const hours = Math.floor(minutes / 60);

// console.log(`${hours}h ${minutes % 60}m ${seconds % 60}s until tomorrow`);
