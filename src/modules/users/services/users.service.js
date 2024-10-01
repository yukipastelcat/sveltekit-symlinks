import { chunk } from "$lib/core/utils/array";

const entries = [...Array(100)].map((_item, index) => ({
    id: index,
    name: `User ${index + 1}`
}));

function wait(timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

/**
 * @param {number} id
 */
export async function getUser(id) {
    await wait(200);
    return entries.find(item => item.id === id);
}

export async function getUsers(page = 1) {
    await wait(500);
    const chunkedEntries = chunk(entries, 6);
    return chunkedEntries[page - 1];
}
