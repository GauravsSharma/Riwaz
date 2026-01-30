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

export async function invalidateProductCaches(productId = null) {
    try {
        console.log('🗑️ Starting cache invalidation...');
        if (productId) {
            await redisClient.del(`product:${productId}`);
            console.log(`✅ Deleted: product:${productId}`);
        }

       
        let typeCursor = '0'; 
        let typeDeletedCount = 0;

        do {
            const typeResult = await redisClient.scan(typeCursor, {
                MATCH: 'product-by-type:*',
                COUNT: 100
            });

            typeCursor = typeResult.cursor;

            if (typeResult.keys.length > 0) {
                await redisClient.del(typeResult.keys);
                typeDeletedCount += typeResult.keys.length;
            }

        } while (typeCursor !== '0'); 

        console.log(`✅ Deleted ${typeDeletedCount} product-by-type caches`);

        let cursor = '0'; 
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

        } while (cursor !== '0'); 

        console.log(`✅ Deleted ${deletedCount} product listing caches`);

    } catch (error) {
        console.error('Cache invalidation error:', error);
    }
}