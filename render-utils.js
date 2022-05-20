export function renderItem(item) {
    // <label>
    //    <input type="checkbox" /><span>4 Bananas</span>
    // </label>

    const div = document.createElement('div');
    div.textContent = `${item.qty} ${item.name} ${item.price}`;

    if (item.purchased) {
        div.classList.add('complete');
    }
    return div;
}