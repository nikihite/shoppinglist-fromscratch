import { createListItem } from '../fetch-utils.js';
import { logout } from '../fetch-utils.js';

const form = document.querySelector('.item-form');
const error = document.getElementById('error');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemData = new FormData(form);
    const data = await createListItem(itemData.get('name'), itemData.get('qty'), itemData.get('price'));
    if (data) {
        window.location.href = '/create';
    } else {
        error.textContent = 'Something went wrong :(';
    }
});

logoutButton.addEventListener('click', () => {
    logout();
});
