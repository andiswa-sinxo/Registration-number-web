document.addEventListener('DOMContentLoaded', function () {
    let errorMessageElem = document.querySelector('.rs');
    if (errorMessageElem.innerHTML !== '') {
        setTimeout(() => {
            errorMessageElem.innerHTML = '';   
            
        }, 3000);
    }
});