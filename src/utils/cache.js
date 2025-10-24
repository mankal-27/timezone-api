const cache = {};

export function getCache(key) {
    return cache[key];
}

export function setCache(key, data, ttl = 86400000) {
    cache[key] = data;
    setTimeout(() => delete cache[key], ttl);
}

export function clearCache() {
    Object.keys(cache).forEach(key => delete cache[key]);
}
