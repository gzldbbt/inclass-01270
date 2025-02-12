import './../scss/contact.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    if(form){
        form.addEventListener('submit',  (e) => {
            e.preventDefault();
            alert('success');
        })
    }
})