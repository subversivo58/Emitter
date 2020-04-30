
/**
 * @license The MIT License (MIT)             - [https://github.com/subversivo58/Emitter/blob/master/LICENSE]
 * @copyright Copyright (c) 2020 Lauro Moraes - [https://github.com/subversivo58]
 * @version 0.1.0 [development stage]         - [https://github.com/subversivo58/Emitter/blob/master/VERSIONING.md]
 */

import Emitter from '../Emitter.mjs'

const CustomEmitter = new Emitter()

function A(data) {
    console.log('Fired for "function A(){}" :', data)
}
function B(data) {
    console.log('Fired for "function B(){}" :', data)
}

// multiple targets
CustomEmitter.on('abc', A)
CustomEmitter.on('abc', B)
CustomEmitter.on('abc', data => {
    console.log('Fired for "anonimous function" :', data)
})

// fire
CustomEmitter('abc', 'hello world')

// listener "once" with `.on()` third argument
CustomEmitter.on('xyz', data => {
    console.log('Fired once by `.on()` method third argument')
}, true)

// listener "once" with `.once()` method
CustomEmitter.once('zeta', data => {
    console.log('Fired once by `.once()` method')
})

// fire
CustomEmitter('xyz', 'hello world')
CustomEmitter('zeta', 'hello world')

// stop an or any listener(s) --------------------------------------------

// init listeners
CustomEmitter.on('awesome', A)
CustomEmitter.on('awesome', B)

CustomEmitter.stop('awesome') // stop all listeners by target

CustomEmitter.emit('awesome', 'buuuu') // nothing ?

// init listeners
CustomEmitter.on('magician', A)
CustomEmitter.on('magician', B)

CustomEmitter.stop('magician', A) // stop specific listener by callback reference
CustomEmitter.stop('magician', B) // stop specific listener by callback reference

CustomEmitter.emit('magician', 'hum...') // nothing ?

// listener all events by "wildcard" -------------------------------------

// init listeners
CustomEmitter.on('test1', A)
CustomEmitter.on('test2', B)

// all
CustomEmitter.on('*', data => {
    console.log('Fired for "widcard" listener', data)
})

CustomEmitter.emit('test1', 'walking')  // ?
CustomEmitter.emit('test2', 'stopping') // ?
