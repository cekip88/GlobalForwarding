


let body = document.querySelector('body');
body.addEventListener('click',function (e) {
    let target = e.target;

    while(!(target.hasAttribute('data-click-target')) && target.tagName !== "BODY"){
        target = target.parentElement;
    }
    if((target.getAttribute('data-click-target') === 'dropdown-head') && !target.parentElement.classList.contains('dropdown-disabled')){
        e.preventDefault();
        dropdown['closeAll']();
        dropdown['open'](target)
    } else if(target.getAttribute('data-click-target') === 'dropdown-value'){
        e.preventDefault();
        dropdown['insert'](target);
        dropdown['closeThis'](target);
    }else {
        dropdown['closeAll']()
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

class Dropdown {
    constructor() {
        this.dropdownCashe = {};
        this.inputArr = document.querySelectorAll('.dropdown-head input');
    }

    addHandlers(){
        const _ = this;
        _.inputArr.forEach(function (el) {
            el.addEventListener('input',function (e) {
                let cont = e.target.parentElement.parentElement,
                    list = cont.querySelector('.dropdown-body'),
                    cashe = _.dropdownCashe[cont.getAttribute('data-list')],
                    containsList = [];

                cashe.forEach(function (el,index) {
                    if(el.textContent.search(e.target.value) > -1){
                        containsList.push(index)
                    }
                });

                if(containsList.length) {
                    list.innerHTML = '';
                    containsList.forEach(function (el) {
                        list.append(cashe[el])
                    })
                }

                _.checkDropDown(cont);
                _.open(e.target.parentElement)
            });
        })
    }

    casheFilling(){
        const _ = this;
        let int = 0;
        document.querySelectorAll('.dropdown').forEach(function (el) {
            el.setAttribute('data-list',`list-${int}`);
            _.dropdownCashe[`list-${int}`] = [];
            el.querySelectorAll('.dropdown-body-value').forEach(function (elem) {
                _.dropdownCashe[`list-${int}`].push(elem)
            });
            int++;
        })
    }

    open(clickTarget){
        let dropdown = clickTarget.parentElement;
        if (!dropdown.classList.contains('dropdown-active')) dropdown.classList.add('dropdown-active');
    }

    insert(clickTarget) {
        let inpt = clickTarget.parentElement.previousElementSibling;
        inpt.value = clickTarget.textContent;
        let head = inpt.previousElementSibling;
        head = head.children[head.children.length - 1];
        head.value = inpt.value;
        let parent = head.parentElement;
        if (!parent.classList.contains('dropdown-choosen')) parent.classList.add('dropdown-choosen')
    }

    checkDropDown(cont) {
        let input = cont.querySelector('.dropdown-head input'),
            list = cont.querySelectorAll('.dropdown-body-value');
        let contains = false;
        list.forEach(function (elem) {
            if(input.value === elem.textContent) {
                contains = true;
            }
        });
        if(!contains){
            if(!cont.classList.contains('dropdown-error')) cont.classList.add('dropdown-error');
        } else {
            if(cont.classList.contains('dropdown-error')) cont.classList.remove('dropdown-error')
        }
    }

    closeThis(clickTarget) {
        const _ = this;
        let cont = clickTarget.parentElement.parentElement;
        cont.classList.remove('dropdown-active');
        _.checkDropDown(cont);
    }

    closeAll() {
        const _ = this;
        let dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function (el) {
            if(el.classList.contains('dropdown-active')){
                el.classList.remove('dropdown-active');
                _.checkDropDown(el);
            }
        });
    }
}
let dropdown = new Dropdown();
dropdown.casheFilling();
dropdown.addHandlers();

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