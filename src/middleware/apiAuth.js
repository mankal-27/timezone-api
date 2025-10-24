export function apiAuth(req, res, next){
    const { api_key } = req.query;
    const validKeys = process.env.VALID_API_KEYS?.split(",") || [];

    if(!api_key || !validKeys.includes(api_key)){
        return res.status(401).json({ error: "Unauthorized: Invalid or Misssing API key " });
    }
    next();
}