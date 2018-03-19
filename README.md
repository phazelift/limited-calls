<h1>limited-calls</h1>

Wraps a function so it will only be called once during a set delay time.

--

I wrote this to limit the amount of calls to my event handler to a maximum of 1 call every 100 milliseconds.


**Usage**:


>Install with npm: `npm install --save limited-calls`


```coffeescript
limitedCalls= require 'limited-calls'

show= ( text... ) -> console.log 'showing:', text...

# wrap the show function, allowing only calling once a second
myShow= limitedCalls show, 1000

myShow 'hello', 'world!'
myShow 'ignored', 'not showing..'
myShow 'ignored', 'not showing..'
myShow 'last pending call only shows', 'if 3d argument is not given'
# showing: hello world!

# when calls to the function are made during the delay time,
# the last call is saved and called directly after the delay expires.
# if you want to also ignore this last pending call then you can
# pass true as a third parameter to set "ignorePending"
myShow= limitedCalls show, 1000, true
```

<h3>license</h3>

MIT