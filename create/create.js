import { checkAuth, fetchListItems, createListItem, logout, togglePurchased } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const form = document.querySelector('.item-form');
const error = document.getElementById('error');
const logoutButton = document.getElementById('logout');
const shoppingListElem = document.getElementById('shopping-list');

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


async function displayListItems() {
    shoppingListElem.textContent = '';
    const data = await fetchListItems();
    if (data) {
        for (let item of data) {
            const listElem = renderItem(item);
            listElem.addEventListener('click', async (e) => {
                e.preventDefault();
                await togglePurchased(item);
                displayListItems();
            });

            shoppingListElem.append(listElem);
        }
    } else {
        error.textContent = 'Something went wrong :(';
    }
}

displayListItems();