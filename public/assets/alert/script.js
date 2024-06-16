/* script.js */
function closeAlert() {
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.style.opacity = '0';
    setTimeout(() => {
        alertContainer.style.display = 'none';
    }, 500);
}
