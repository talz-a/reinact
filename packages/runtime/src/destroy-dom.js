import { removeEventListeners } from "./events"
import { DOM_TYPES } from "./h"

export function destroyDOM(vdom) {
    const { type } = vdom;
    switch (type) {
        case DOM_TYPES.TEXT: {
            removeTextNode(vdom);
            break;
        }
        case DOM_TYPES.ELEMENT: {
            removeElementNode(vdom);
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            removeFragmentNode(vdom);
            break;
        }
        default : {
            throw new Error(`Can not destroy DOM of type: ${type}`);
        }
    }
    delete vdom.el;
}

function removeTextNode(vdom) {
    const { el } = vdom;
    el.remove();
}

function removeElementNode(vdom) {
    const { el, children, listeners } = vdom;
    el.remove();
    children.forEach(child => destroyDOM(child));
    if (listeners) {
        removeEventListeners(listeners, el);
        delete vdom.listeners;
    }
}

function removeElementNode(vdom) {
    const { children } = vdom;
    children.forEach(child => destroyDOM(child));
}
