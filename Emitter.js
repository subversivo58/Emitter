/**
 * @license The MIT License (MIT)             - [https://github.com/subversivo58/Emitter/blob/master/LICENSE]
 * @copyright Copyright (c) 2017 Lauro Moraes - [https://github.com/subversivo58]
 * @version 0.1.0 [development stage]         - [https://github.com/subversivo58/Emitter/blob/master/VERSIONING.md]
 */
 
 class Emitter extends EventTarget {
    constructor() {
        super()
        // store listeners
        this.listeners = {}
    }
    
    /**
     * Initialize listener(s)
     * @param {String}    e  - event target name
     * @param {Function} cb  - callback to receive `CustomEvent` object
     * @param {Boolean} once - indicator trigger only once
     */
    on(e, cb, once = false) {
        // store one-by-one registered listeners
        !this.listeners[e] ? this.listeners[e] = [cb] : this.listeners[e].push(cb)
        // check `.once()` ... callback `CustomEvent`
        once ? this.addEventListener(e, cb, { once: once }) : this.addEventListener(e, cb)
    }
    
    /**
     * Disable listener(s)
     * @param {String} e - event target name
     */
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
    
    /**
     * Fire a event - dispatched from `CustomEvent`
     * @param {String} e              - event target name
     * @param {String|Object|Array} d - data
     */
    emit(e, d) {
        this.dispatchEvent(new CustomEvent(e, {detail: d}))
    }
    
    /**
     * Fire a once event - uses `.on()`
     * @param {String} e    - event target name
     * @param {Function} cb - callback to receive `CustomEvent` object
     */
    once(e, cb) {
        this.on(e, cb, true)
    }
}

//
export default Emitter
