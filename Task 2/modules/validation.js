export const validateTaskInput = (input) => input.trim().length > 0 && input.trim().length <= 100;

export const escapeHTML = (str) => { 
    const div = document.createElement('div'); 
    div.innerText = str; 
    return div.innerHTML; 
};