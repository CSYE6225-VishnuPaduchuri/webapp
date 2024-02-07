export const setHeadersAtGloablLevel = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  // Why we are using Pragma when we are already setting Cache-Control?
  // The reason is Pragma is for http 1.0 implementation and cache-control is for http 1.1
  // older browsers may not support new header cache-control, that's why we need to set pragma for backward compatibility
  res.setHeader("Pragma", "no-cache");

  // Adding this header to follow the response format shown in the assignment example
  res.setHeader("X-Content-Type-Options", "nosniff");

  // The reason we are removing the X-Powered-By header is because when this is present,
  // any attacker can see that we are using express and they may exploit any loopholes
  res.removeHeader("X-Powered-By");

  // removing the following headers to follow the response format shown in the assignment example
  res.removeHeader("Connection");
  res.removeHeader("Keep-Alive");

  next();
};
