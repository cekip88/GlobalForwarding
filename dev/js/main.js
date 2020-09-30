let body = document.querySelector('body');
body.addEventListener('click',function (e) {
    let target = e.target;

    while(!(target.hasAttribute('data-click-target')) && target.tagName !== "BODY"){
        target = target.parentElement;
    }
    if((target.getAttribute('data-click-target') === 'dropdown-head') && !target.hasAttribute('disabled')){
        e.preventDefault();
        dropdownClose();
        dropdownOpen(target)
    } else if(target.getAttribute('data-click-target') === 'dropdown-value'){
        e.preventDefault();
        dropdownInsert(target);
        dropdownCloseThis(target);
    }else {
        dropdownClose()
    }

    if((target.getAttribute('data-click-target') === 'tab-btn') && !target.classList.contains('tab-btn-active')){
        e.preventDefault();
        tabClick(target)
    }
});

function dropdownOpen(target) {
    let dropdown = target.parentElement;
    if (!dropdown.classList.contains('dropdown-active'))
    dropdown.classList.add('dropdown-active')
}
function dropdownInsert(target) {
    let inpt = target.parentElement.previousElementSibling;
    inpt.value = target.textContent;
    let head = inpt.previousElementSibling.children[0];
    head.textContent = inpt.value;
}
function dropdownCloseThis(target) {
    target.parentElement.parentElement.classList.remove('dropdown-active')
}
function dropdownClose() {
    let dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function (el) {
        if(el.classList.contains('dropdown-active'))
        el.classList.remove('dropdown-active')
    })
}

function tabClick(target) {
    let cont = target.parentElement;
    for (let i = 0; i < cont.children.length; i++){
        if(cont.children[i].classList.contains('tab-btn-active')) cont.children[i].classList.remove('tab-btn-active');
    }
    target.classList.add('tab-btn-active')
}



