# Emitter
Browser EventEmitter from EventTarget (constructor)


## Motivation:

Since I know Node I use events, the search for libraries for the front end has always been a terrible saga.

When I "stumbled" on this issue in [StackOverflow](https://stackoverflow.com/questions/22186467/how-to-use-javascript-eventtarget) I decided to try to create something useful myself ... whether or not it is "useful" (for you) you can draw your own conclusions.



## The code:

```javascript
class Emitter extends EventTarget {
    constructor() {
        super()
        // store listeners
        this.listeners = {}
    }
    on(e, cb, once = false) {
        // store one-by-one registered listeners
        !this.listeners[e] ? this.listeners[e] = [cb] : this.listeners[e].push(cb)
        // callback `CustomEvent`
        this.addEventListener(e, cb, { once: once })
    }
    off(e) {
        if ( this.listeners[e] ) {
            // iterate all listeners for this target
            this.listeners[e].forEach((target, i, arr) => {
                this.removeEventListener(e, target)
                // on end "loop" ... remove all listeners of this target (by reference)
                if ( i === arr.length -1 ) {
                    delete this.listeners[e]
                }
            })
        }
    }
    emit(e, d) {
        this.dispatchEvent(new CustomEvent(e, {detail: d}))
    }
    once(e, cb) {
        this.on(e, cb, true)
    }
}
```

## How to use:

```javascript
const MyEmmiter = new Emitter()

// one or more listeners for same target ...
MyEmitter.on('xyz', data => {
    // yep, date is a `CustomEvent` object so use the "detail" property for get data
    console.log('first listener: ', data.detail)
}
MyEmitter.on('xyz', data => {
    // yep, date is a `CustomEvent` object so use the "detail" property for get data
    console.log('second listener: ', data.detail)
}

// fire event for this target
MyEmitter.emit('xyz', 'zzzzzzzzzz...') // see listeners show

// stop all listeners for this target
MyEmitter.off('xyz')

// try new "emit" listener event ?
MyEmitter.emit('xyz', 'bu bu bu') // nothing ;)


// fire a "once" ? Yes, fire
MyEmitter.once('abc', data => {
    console.log(data.detail)
}

// run
MyEmitter('abc', 'Hello World') // its show listener only once
```


## To do:

A listing will be created later


## Supported Browsers:

In this date (October 7, 2018) Chrome, Firefox, Opera and WebView (Android) according to the documentation in [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

* **desktop**: 
  * Chrome 64
  * Firefox 59
  * Opera 51
* **mobile**: 
  * WebView 64
  * Chrome Android 64
  * Firefox Android 59
  * Opera Android 51
  

## License

MIT License

Copyright (c) 2018 Lauro Moraes [[AKA Subversivo58]](https://github.com/subversivo58)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.