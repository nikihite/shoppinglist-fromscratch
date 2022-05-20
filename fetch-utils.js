const SUPABASE_URL = 'https://zcwghasajjcnjalirtgv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpjd2doYXNhampjbmphbGlydGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTg5MTEsImV4cCI6MTk2Nzg3NDkxMX0.PABjBwN_OcjQPMnybnEw2Gb1TCQAlLw_oz348jM0rSw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('/create/index.html');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });
    return response.user;
}

export async function logout() {
    await client.auth.signOut();
    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }

export async function createListItem(name, qty, price) {
    const response = await client.from('shopping_items').insert({ name, qty, price });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function fetchListItems() {
    const response = await client.from('shopping_items').select('*').order('name');

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function togglePurchased(item) {
    const response = await client
        .from('shopping_items')
        .update({ purchased: !item.purchased })
        .match({ id: item.id });
    return response.data;
}

export async function deleteAll() {
    const response = await client
        .from('shopping_items')
        .delete()
        .match({ user_id: getUser().id });
    return response.data;
}

export async function removeItem(id) {
    const response = await client
        .from('shopping_items')
        .delete()
        .eq('id', id);
    return response.data;
}