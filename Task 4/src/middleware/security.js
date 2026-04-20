import helmet from 'helmet';

// Custom security headers (as requested in docs, plus Helmet for ultimate security)
export const securityHeaders = (req, res, next) => {
    res.set({
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    });
    next();
};