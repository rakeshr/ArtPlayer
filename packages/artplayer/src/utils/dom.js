export function query(selector, parent = document) {
    return parent.querySelector(selector);
}

export function queryAll(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

export function addClass(target, className) {
    return target.classList.add(className);
}

export function removeClass(target, className) {
    return target.classList.remove(className);
}

export function hasClass(target, className) {
    return target.classList.contains(className);
}

export function append(parent, child) {
    if (child instanceof Element) {
        parent.appendChild(child);
    } else {
        parent.insertAdjacentHTML('beforeend', String(child));
    }
    return parent.lastElementChild || parent.lastChild;
}

export function remove(child) {
    return child.parentNode.removeChild(child);
}

export function setStyle(element, key, value) {
    element.style[key] = value;
    return element;
}

export function setStyles(element, styles) {
    Object.keys(styles).forEach(key => {
        setStyle(element, key, styles[key]);
    });
    return element;
}

export function getStyle(element, key, numberType = true) {
    const value = window.getComputedStyle(element, null).getPropertyValue(key);
    return numberType ? parseFloat(value) : value;
}

export function sublings(target) {
    return Array.from(target.parentElement.children).filter(item => item !== target);
}

export function inverseClass(target, className) {
    sublings(target).forEach(item => removeClass(item, className));
    addClass(target, className);
}

export function tooltip(target, msg, pos = 'up') {
    target.setAttribute('aria-label', msg);
    target.setAttribute('data-balloon-pos', pos);
}
