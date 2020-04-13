const limitedCalls= require('./limited-calls.min.js');

const show = (...text) => console.log('showing:', ...text);

// wrap the show function, allowing only calling once a second
const limitedShow = limitedCalls(show, 1000);

limitedShow('hello', 'world!');
limitedShow('ignored', 'not showing..');
limitedShow('ignored', 'not showing..');
limitedShow('last pending call only shows', 'if 3d argument is not given');
// showing: hello world!
// showing: last pending call only shows if 3d argument is not given

// when calls to the function are made during the delay time,
// the last call is saved and called directly after the delay expires.
// if you want to also ignore this last pending call then you can
// pass true as a third parameter to set "ignorePending"
const limitedShowPending = limitedCalls(show, 1000, true);