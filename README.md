# Emitter
Browser EventEmitter from EventTarget (constructor)


## Motivation:

Since I know Node I use events, the search for libraries for the front end has always been a terrible saga.

When I "stumbled" on this issue in [StackOverflow](https://stackoverflow.com/questions/22186467/how-to-use-javascript-eventtarget) I decided to try to create something useful myself ... whether or not it is "useful" (for you) you can draw your own conclusions.



## API:

**Instance**:

```javascript
// import module ... yep, ES6 module sintax
import Emitter from './your-path-to/Emitter.mjs'

/**
 * or global for non-module support ... property of `window`
 * <script src="./your-path-to/Emitter.js"></script>
 * <script>
 *     const CustomEmitter = new Emitter() // const CustomEmitter = new window.Emitter()
 * </script>
 */

const CustomEmitter = new Emitter()
```
--------------

**Listener**:

**.on(event, Fn [,once])**

```javascript
CustomEmitter.on('xyz', data => {
    // yep, data is a `CustomEvent` object, so use the "detail" property for get data
    console.log(data.detail)
})
```

Listener to an or more event(s) ... properties of `.on()`:

* **event**: `String` event target name
* **Fn**: `Function` callback for get data
* **once**: `Boolean` optional alias to `.once()` method ... default: **false**


**.once(event, Fn)**

```javascript
CustomEmitter.once('abc', data => {
    // yep, data is a `CustomEvent` object, so use the "detail" property for get data
    console.log(data.detail)
})
```

Watch an event only once  ... properties of `.once()`:

* **event**: `String` event target name
* **Fn**: `Function` callback for get data

--------------

**Fire**:

**.emit(event, data)**

```javascript
CustomEmitter.emit('abc', 'hello world')
```

* **event**: `String` event target name
* **data**: `Object|Array|String` arbitrary data to pass an event

--------------

**Stop**:

**.off(event [,Fn])**

```javascript
CustomEmitter.off('xyz')
```

* **event**: `String` event target name
* **Fn**: `Function` optional ... reference to remove especific callback

--------------

**Wildcard**:

**.on('*', Fn)**

```javascript
CustomEmitter.on('*', data => {
    // yep, data is a `CustomEvent` object, so use the "detail" property for get data
    console.log(data.detail)
})
```

Propeties of `.on('*')`:

* **'*'**: `String` wildacard for all events
* **Fn**: `Function` callback for get data

Use **'*'** for listener all events ... see [#3](https://github.com/subversivo58/Emitter/issues/3) for more details


## Examples:

See [exemple](exemple/) directory

## To do:

- [ ] allow multiple "callbacks" references to `.off()` method
- [ ] return the content without having to go through the `CustomEvent.detail` property. See [#6](https://github.com/subversivo58/Emitter/issues/6)
- [x] add **"wildcard"** (*) to listen all events. See [#3](https://github.com/subversivo58/Emitter/issues/3)


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

```license
MIT License

Copyright (c) 2018 - 2020 Lauro Moraes https://github.com/subversivo58

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
```