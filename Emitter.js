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
     * @param {String}     e - event target name
     * @param {Function}  cb - callback to receive `CustomEvent` object
     * @param {Boolean} once - indicator trigger only once
     */
    on(e, cb, once = false) {
        // store one-by-one registered listeners
        !this.listeners[e] ? this.listeners[e] = [cb] : this.listeners[e].push(cb)
        // check `.once()` ... callback `CustomEvent`
        once ? this.addEventListener(e, cb, { once: true }) : this.addEventListener(e, cb)
    }
    
    /**
     * Disable listener(s)
     * @param {String}    e - event target name
     * @param {Function} Fn - callback function reference (default false)
     */
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
                    delete this.listeners[e]
                }
            }

            // use `.forEach()` to iterate all listeners for this target
            const iterate = () => {
                this.listeners[e].forEach((val, index, array) => {
                    removeListener(val)
                    // on end "loop" remove all listeners references for this target (by target object)
                    if ( index === array.length -1 ) {
                        delete this.listeners[e]
                    }
                })
            }

            Fn && typeof Fn === 'function' ? filter() : iterate()
        }
    }
    
    /**
     * Fire a event - dispatched from `CustomEvent`
     * @param {String}              e - event target name
     * @param {String|Object|Array} d - data
     */
    emit(e, d) {
        this.dispatchEvent(new CustomEvent(e, {detail: d}))
    }
    
    /**
     * Fire a once event - uses `.on()`
     * @param {String}    e - event target name
     * @param {Function} cb - callback to receive `CustomEvent` object
     */
    once(e, cb) {
        this.on(e, cb, true)
    }
}

//
export default Emitter
