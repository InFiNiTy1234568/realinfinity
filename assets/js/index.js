document.addEventListener('DOMContentLoaded', () => {
    
    // Get all navbar items 
    document.querySelectorAll('.navbar-item').forEach((e, k) => {
        e.setAttribute('style', `--index: ${k}`)
        setTimeout(() => {
            e.removeAttribute('style')
        }, 2000)
    })
    document.querySelectorAll('.box').forEach((e, k) => {
        e.setAttribute('style', `--box-index: ${k}`)
        setTimeout(() => {
            e.removeAttribute('style')
        }, 2000)
    })
    document.querySelectorAll('.tag').forEach((e, k) => {
        e.setAttribute('style', `--tag-index: ${k}`)
        setTimeout(() => {
            e.removeAttribute('style')
        }, 2000)
    })
    document.querySelectorAll('.brands-container').forEach((e, k) => {
        e.setAttribute('style', `--brand-index: ${k}`)
        setTimeout(() => {
            e.removeAttribute('style')
        }, 2000)
    })
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
            
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
            
        });
    })
})

window.addEventListener('scroll', () => {
    const header = document.getElementById('nav')
    const sticky = 132

    if(window.scrollY > sticky) {
        header.classList.add('sticky')
        header.classList.remove('exit')
    } else {
        header.classList.add('exit')
        header.classList.remove('sticky')
    }
})