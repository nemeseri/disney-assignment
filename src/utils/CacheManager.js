class CacheManager {
  constructor(prefix = 'disney-cache-') {
    this.prefix = prefix
  }

  get(cacheKey) {
    cacheKey = this.prefix + cacheKey;
    let entry = localStorage.getItem(cacheKey)
    const now = new Date().getTime()
    if (entry === null) {
      return null
    }

    entry = JSON.parse(entry)
    if (entry && entry.expiration <= now) {
      return null
    }

    return entry.data
  }

  set(cacheKey, data, expiration) {
    cacheKey = this.prefix + cacheKey;
    const now = new Date().getTime()
    const entry = {
      expiration: now + expiration,
      data: data
    }
    try {
      localStorage.setItem(cacheKey, JSON.stringify(entry))
    } catch(e) {
      console.error(e)
    }
  }

  remove(cacheKey) {
    localStorage.removeItem(cacheKey)
  }
}

export default CacheManager