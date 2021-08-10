import type { NextApiRequest, NextApiResponse } from 'next';

export default (
  req: NextApiRequest,
  res: NextApiResponse
): NextApiResponse | void => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.API_PREVIEW_KEY || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    maxAge: 60 * 60,
    previewKey: process.env.API_PREVIEW_KEY,
  });

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(req.query.slug as string);
};
