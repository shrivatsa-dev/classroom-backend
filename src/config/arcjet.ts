import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

if (!process.env.ARCJET_KEY && process.env.NODE_ENV !== 'test') {
  throw new Error('ARCJET_KEY is required')
}
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:PREVIEW", // Link previews such as Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE",
      interval: '2s', 
      max: 5, 
    }),
  ],
});

export default aj