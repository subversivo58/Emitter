/**
 * @license The MIT License (MIT)             - [https://github.com/subversivo58/Emitter/blob/master/LICENSE]
 * @copyright Copyright (c) 2018 Lauro Moraes - [https://github.com/subversivo58]
 * @version 0.1.0 [development stage]         - [https://github.com/subversivo58/Emitter/blob/master/VERSIONING.md]
 */

export class Emitter extends EventTarget {
    constructor() {
        super()
        // store listeners (by callback)
        this.listeners = {
            '*': [] // pre alocate for all (wildcard)
        }
    }
    on(e, cb, once = false) {
        // store one-by-one registered listeners
        !this.listeners[e] ? this.listeners[e] = [cb] : this.listeners[e].push(cb)
        // check `.once()` ... callback `CustomEvent`
        once ? this.addEventListener(e, cb, { once: true }) : this.addEventListener(e, cb)
    }
    off(e, Fn = false) {
        if ( this.listeners[e] ) {
            // remove listener (include ".once()")
            let removeListener = target => {
                this.removeEventListener(e, target)
            }
            // use `.filter()` to remove expecific event(s) associated to this callback
            const filter = () => {
                this.listeners[e] = this.listeners[e].filter(val => {
                    return val === Fn ? removeListener(val) : val
                })
                // check number of listeners for this target ... remove target if empty
                if ( this.listeners[e].length === 0 ) {
                    e !== '*' ? delete this.listeners[e] : null
                }
            }
            // use `.forEach()` to iterate all listeners for this target
            const iterate = () => {
                let len = this.listeners[e].length
                while (len--) {
                    removeListener(this.listeners[e][len])
                }
                // remove all listeners references (callbacks) for this target (by target object)
                e !== '*' ? delete this.listeners[e] : this.listeners[e] = []
            }
            Fn && typeof Fn === 'function' ? filter() : iterate()
        }
    }
    emit(e, d) {
         if ( this.listeners['*'].length > 0 ) {
             this.dispatchEvent(new CustomEvent('*', {detail: d}))
         }
         this.dispatchEvent(new CustomEvent(e, {detail: d}))
    }
    once(e, cb) {
        this.on(e, cb, true)
    }
}
