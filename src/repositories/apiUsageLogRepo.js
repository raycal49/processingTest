import { toApiUsageLogDto, toApiUsageSummaryDto } from '../dtos/apiUsageDto.js';

export const createApiUsageLogRepository = (sql) => ({
  // periodStart is the current cycle boundary derived from the active
  // subscription's started_at anniversary — computed by the caller, since
  // the quota resets at the same boundary the billing does.
  countForUserSince: async (userId, apiProductId, periodStart) => {
    const rows = await sql`
      SELECT count(*) AS usage_count
      FROM api_usage_log
      WHERE user_id = ${userId}
        AND api_product_id = ${apiProductId}
        AND used_at >= ${periodStart}`;
    return Number(rows[0].usage_count);
  },

  // Per-product usage for the cycle, joined against the plan's limits so a
  // caller can see count vs. monthly_limit in one round trip.
  usageSummaryForUserSince: async (userId, planId, periodStart) => {
    const rows = await sql`
      SELECT p.id AS api_product_id,
             p.api_name,
             count(u.id) AS usage_count,
             l.monthly_limit
      FROM api_products p
      LEFT JOIN plan_api_limits l
        ON l.api_product_id = p.id AND l.plan_id = ${planId}
      LEFT JOIN api_usage_log u
        ON u.api_product_id = p.id
       AND u.user_id = ${userId}
       AND u.used_at >= ${periodStart}
      GROUP BY p.id, p.api_name, l.monthly_limit
      ORDER BY p.api_name`;
    return rows.map(toApiUsageSummaryDto);
  },

  listForUserBetween: async (userId, from, to) => {
    const rows = await sql`
      SELECT id, user_id, api_product_id, used_at
      FROM api_usage_log
      WHERE user_id = ${userId}
        AND used_at >= ${from}
        AND used_at < ${to}
      ORDER BY used_at DESC`;
    return rows.map(toApiUsageLogDto);
  },
});
