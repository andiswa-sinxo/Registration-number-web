document.addEventListener('DOMContentLoaded', function () {
    let errorMessageElem = document.querySelector('.entry');
    if (errorMessageElem.innerHTML !== '') {
        setTimeout(() => {
            errorMessageElem.innerHTML = '';   
            
        }, 3000);
    }
});