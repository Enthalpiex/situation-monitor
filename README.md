# Situation Monitor

A real-time intelligence dashboard for monitoring global events, market movements, and geopolitical developments. Built with SvelteKit 5 and designed for analysts, traders, and anyone who needs to stay informed about rapidly evolving situations.

![Situation Monitor Dashboard](https://img.shields.io/badge/SvelteKit-2.0-FF3E00?style=flat-square&logo=svelte)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## 🌟 Features

### Real-Time Intelligence
- **News Aggregation**: 30+ RSS feeds across politics, tech, finance, government, AI, and intelligence
- **Correlation Detection**: Automatically identifies patterns across disparate news items
- **Narrative Tracking**: Tracks topics as they move from fringe to mainstream
- **Main Character Analysis**: Identifies entities with sudden prominence spikes

### Market Intelligence
- **Stock Indices**: Dow Jones, S&P 500, NASDAQ, Russell 2000
- **Sector Heatmap**: Real-time performance of 12 major market sectors
- **Commodities & VIX**: Gold, Oil, Natural Gas, Silver, Copper with fear index monitoring
- **Cryptocurrency**: Bitcoin, Ethereum, Solana tracking

### Geopolitical Monitoring
- **Interactive World Map**: Hotspots, conflict zones, strategic locations
- **World Leaders Panel**: Track major political figures and developments
- **GDELT Integration**: Global news events in near real-time

### Advanced Features
- **Federal Reserve Monitor**: Tracks economic indicators and Fed policy
- **Polymarket Integration**: Real-time prediction markets
- **Whale Alerts**: Large cryptocurrency transactions
- **Tech Layoffs Tracker**: Recent tech industry workforce changes
- **Custom Monitors**: Create personalized keyword alerts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Finnhub API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Enthalpiex/situation-monitor.git
   cd situation-monitor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   # Required for market data (indices, sectors, commodities)
   VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
   
   # Optional: For Federal Reserve economic data
   VITE_FRED_API_KEY=your_fred_api_key_here
   ```

   **Get your API keys:**
   - **Finnhub** (required): https://finnhub.io/ - Free tier: 60 calls/minute
   - **FRED** (optional): https://fred.stlouisfed.org/docs/api/api_key.html - Free tier: Unlimited

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser

## 📦 Build & Deployment

### Development
```bash
npm run dev          # Start dev server (localhost:5173)
npm run check        # TypeScript type checking
npm run check:watch  # Type checking in watch mode
npm run lint         # ESLint + Prettier check
npm run format       # Auto-format with Prettier
```

### Testing
```bash
npm run test         # Run Vitest in watch mode
npm run test:unit    # Run unit tests once
npm run test:e2e     # Run Playwright E2E tests (requires preview server)
```

### Production Build
```bash
npm run build        # Build to /build directory
npm run preview      # Preview production build (localhost:4173)
```

### Deployment

The application is configured for static deployment to GitHub Pages:

1. Builds automatically on push to `main` branch via GitHub Actions
2. Deploys to `https://your-username.github.io/situation-monitor/`
3. Uses SvelteKit's static adapter for pure static site generation

To deploy to other platforms (Vercel, Netlify, etc.), the static build works out of the box.

## 🏗️ Technology Stack

- **SvelteKit 2.0** with Svelte 5 reactivity (`$state`, `$derived`, `$effect` runes)
- **TypeScript** (strict mode enabled)
- **Tailwind CSS** with custom dark theme
- **Vitest** (unit) + **Playwright** (E2E) for testing
- **D3.js** for interactive map visualization
- **Static adapter** - deploys as pure static site

## 📁 Project Structure

```
situation-monitor/
├── src/
│   ├── lib/
│   │   ├── analysis/       # Pattern correlation, narrative tracking
│   │   ├── api/            # Data fetching (GDELT, RSS, markets, CoinGecko)
│   │   ├── components/     # Svelte components
│   │   │   ├── common/     # Reusable components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── modals/     # Modal dialogs
│   │   │   └── panels/     # Dashboard panels
│   │   ├── config/         # Configuration files
│   │   ├── services/       # Resilience layer (cache, circuit breaker)
│   │   ├── stores/         # Svelte stores for state management
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   ├── routes/             # SvelteKit routes
│   └── app.html            # HTML template
├── static/                 # Static assets
├── tests/                  # E2E tests
└── package.json            # Dependencies
```

### Key Architecture Patterns

#### Service Layer (`src/lib/services/`)
All HTTP requests go through `ServiceClient` which integrates:
- **CacheManager**: Per-service caching with TTL
- **CircuitBreaker**: Prevents cascading failures
- **RequestDeduplicator**: Prevents concurrent duplicate requests

#### Multi-Stage Refresh (`src/lib/stores/refresh.ts`)
Data fetches happen in 3 stages with staggered delays:
1. **Critical** (0ms): News, markets, alerts
2. **Secondary** (2s): Crypto, commodities, intel
3. **Tertiary** (4s): Contracts, whales, layoffs, polymarket

#### Analysis Engine (`src/lib/analysis/`)
Unique business logic for intelligence analysis:
- Correlation detection across disparate news items
- Narrative tracking (fringe → mainstream progression)
- Entity prominence calculation ("main character" analysis)

#### Configuration-Driven Design (`src/lib/config/`)
- `feeds.ts`: 30+ RSS sources across 6 categories
- `keywords.ts`: Alert keywords, region detection, topic detection
- `analysis.ts`: Correlation topics and narrative patterns
- `panels.ts`: Panel registry with display order
- `map.ts`: Geopolitical hotspots, conflict zones

## 🔧 Configuration

### Adding RSS Feeds
Edit `src/lib/config/feeds.ts`:
```typescript
export const FEEDS = [
  { 
    name: 'Your Source',
    url: 'https://example.com/feed.xml',
    category: 'politics'
  }
];
```

### Customizing Panels
Edit `src/lib/config/panels.ts` to add, remove, or reorder dashboard panels.

### Modifying Alert Keywords
Edit `src/lib/config/keywords.ts` to customize alert triggers and monitoring keywords.

## 🎯 Use Cases

- **Financial Analysts**: Real-time market monitoring with sector heatmaps
- **Security Analysts**: Geopolitical event tracking and correlation
- **Crypto Traders**: Cryptocurrency prices and whale alert monitoring
- **Researchers**: Narrative tracking and main character analysis
- **Anyone**: Stay informed about breaking news and global developments

## 🐛 Troubleshooting

### Market data shows "—" or "NaN%"
- Ensure `VITE_FINNHUB_API_KEY` is set in your `.env` file
- Check that you haven't exceeded the Finnhub rate limit (60 calls/minute on free tier)
- Verify the API key is valid at https://finnhub.io/

### CORS errors when fetching feeds
- The app uses a CORS proxy (Cloudflare Worker) for RSS feeds
- If the primary proxy is down, it falls back to corsproxy.io
- These are configured in `src/lib/config/api.ts`

### Build errors
- Make sure you're using Node.js 18 or higher
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Run `npm run check` to identify TypeScript errors

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Market data provided by [Finnhub](https://finnhub.io/)
- Economic data from [FRED](https://fred.stlouisfed.org/)
- Cryptocurrency data from [CoinGecko](https://www.coingecko.com/)
- Global events from [GDELT Project](https://www.gdeltproject.org/)
- Prediction markets from [Polymarket](https://polymarket.com/)
- Built with [SvelteKit](https://kit.svelte.dev/)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Note**: This is an intelligence monitoring tool for informational purposes only. Always verify critical information through multiple sources. Not financial advice.
