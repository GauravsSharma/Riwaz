// utils/cacheKeyGenerator.js

import redisClient from "../config/redis.js";

export function generateProductCacheKey(queryParams) {
    const {
        search = '',
        priceMin = '',
        priceMax = '',
        color = '',
        type = '',
        fabric = '',
        work = '',
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = queryParams;

    // Create a deterministic key from all parameters
    // Important: Parameters should be in consistent order
    const keyParts = [
        'products',
        search ? `search:${search.toLowerCase()}` : 'nosearch',
        type ? `type:${type}` : 'notype',
        fabric ? `fabric:${fabric}` : 'nofabric',
        work ? `work:${work}` : 'nowork',
        color ? `color:${color.toLowerCase()}` : 'nocolor',
        priceMin ? `min:${priceMin}` : 'nomin',
        priceMax ? `max:${priceMax}` : 'nomax',
        `sort:${sortBy}:${sortOrder}`,
        `page:${page}`,
        `limit:${limit}`
    ];

    return keyParts.join(':');
}

// Example outputs:
// "products:nosearch:type:Banarasi:fabric:Silk:nowork:nocolor:nomin:nomax:sort:createdAt:desc:page:1:limit:10"
// "products:search:red saree:notype:nofabric:nowork:color:red:min:1000:max:5000:sort:price:asc:page:1:limit:10"

export async function invalidateProductCaches(productId = null) {
    try {
        console.log('🗑️ Starting cache invalidation...');

        // ✅ STEP 1: Delete specific product cache (if productId provided)
        if (productId) {
            await redisClient.del(`product:${productId}`);
            console.log(`✅ Deleted: product:${productId}`);
        }

        // for type 
        await redisClient.del('product-by-type:*')
        console.log("Type keys deleted");
        

        // ✅ STEP 2: Delete all product listing caches
        // Use SCAN instead of KEYS for production (better performance)
        let cursor = 0;
        let deletedCount = 0;

        do {
            const result = await redisClient.scan(cursor, {
                MATCH: 'products:*',
                COUNT: 100
            });

            cursor = result.cursor;

            if (result.keys.length > 0) {
                await redisClient.del(result.keys);
                deletedCount += result.keys.length;

            }

        } while (cursor !== 0);

        console.log(`✅ Deleted ${deletedCount} product listing caches`);

    } catch (error) {
        console.error('❌ Cache invalidation error:', error);
        // Don't throw - cache errors shouldn't break the API
    }
}

