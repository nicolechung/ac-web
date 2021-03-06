export function scrollPosition(hash) {
    const element = document.querySelector(`a[href="${hash}"]`)

    if (!element) {
        return null
    }

    const { top } = element.parentElement.getBoundingClientRect()
    const { pageYOffset } = window
    const { pathname } = document.location
    let offset = 15

    if (pathname === '/ambassadors') {
        offset = 45
    }

    return [0, Math.floor(top + pageYOffset) - 75 - offset]
}

export function scrollIntoView(element, offset = 90) {
    if (typeof element === 'string') {
        element = document.querySelector(element)
    }

    element.scrollIntoView(true)
    document.body.scrollTop -= offset
}
