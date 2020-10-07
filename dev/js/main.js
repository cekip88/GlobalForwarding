


let body = document.querySelector('body');
body.addEventListener('click',function (e) {
    let target = e.target;

    while(!(target.hasAttribute('data-click-target')) && target.tagName !== "BODY"){
        target = target.parentElement;
    }
    if((target.getAttribute('data-click-target') === 'dropdown-head') && !target.parentElement.classList.contains('dropdown-disabled')){
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
        tabClick(target)
    }

    if(target.getAttribute('data-click-target') === 'loader-close'){
        closeLoader(target);
    }
    if(target.getAttribute('data-click-target') === 'showLoader'){
        showLoader();
    }
});

let dropdownCashe = [];
document.querySelectorAll('.dropdown-head input').forEach(function (el) {
    el.addEventListener('input',function (e) {
        let list = e.target.parentElement.parentElement.querySelector('.dropdown-body');
        list.innerHTML = '';
        dropdownCashe.forEach(function (el) {
            if(el.textContent.search(e.target.value) > -1){
                list.append(el);
            }
        });
    });
});


function dropdownOpen(target) {
    let dropdown = target.parentElement;
    if (!dropdown.classList.contains('dropdown-active'))
    dropdown.classList.add('dropdown-active');
    dropdown.querySelectorAll('.dropdown-body-value').forEach(function (el) {
        let appended = false;
        dropdownCashe.forEach(function (elem) {
            if(el === elem) appended = true;
        });
        if(!appended) dropdownCashe.push(el)
    });
}
function dropdownInsert(target) {
    let inpt = target.parentElement.previousElementSibling;
    inpt.value = target.textContent;
    let head = inpt.previousElementSibling;
    head = head.children[head.children.length - 1];
    head.value = inpt.value;
    let parent = head.parentElement;
    if (!parent.classList.contains('dropdown-choosen'))parent.classList.add('dropdown-choosen')
}
function dropdownCloseThis(target) {
    target.parentElement.parentElement.classList.remove('dropdown-active')
}
function dropdownClose() {
    let dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function (el) {
        if(el.classList.contains('dropdown-active'))
        el.classList.remove('dropdown-active')
    });
    dropdownCashe = [];
}

function tabClick(target) {
    let cont = target.parentElement;
    for (let i = 0; i < cont.children.length; i++){
        if(cont.children[i].classList.contains('tab-btn-active')) cont.children[i].classList.remove('tab-btn-active');
    }
    target.classList.add('tab-btn-active')
}

function showLoader() {
    let loader = document.querySelector('.loader-bgc');
    loader.classList.add('loader-active')
}
function closeLoader(target) {
    while(!target.classList.contains('loader-bgc')){
        target = target.parentElement;
    }
    target.classList.remove('loader-active')
}

