import { NextApiRequest, NextApiResponse } from 'next';
import screenshot from 'util/screenshot';

/**
 * Code based on virtual-event-starter-kit
 * https://github.com/vercel/virtual-event-starter-kit
 *
 * License of the original code: Apache License 2.0
 * https://github.com/vercel/virtual-event-starter-kit/blob/main/LICENSE
 */
export default async function shareImage(
  req: NextApiRequest,
  res: NextApiResponse
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const pageUrl =
    (process.env.NEXT_PUBLIC_PAGE_DOMAIN as string) +
    req.url?.replace('/api', '');
  const dimensions = { width: 700, height: 168 };

  dimensions.height = dimensions.height + req.query['score[]'].length * 58;

  const file = await screenshot(pageUrl as string, dimensions);
  res.setHeader('Content-disposition', 'attachment; filename=result.png');
  res.setHeader('Content-Type', `image/png`);
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.statusCode = 200;
  res.end(file);
}
