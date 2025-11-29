# Geo Visualizer - Satellite Imagery Application

A modern, professional satellite imagery application built with React, TypeScript, and Leaflet. Features interactive map controls, drawing tools, and WMS layer integration.

## 🚀 Features

- **Interactive Map**: Powered by Leaflet with WMS satellite imagery
- **Drawing Tools**: Add points, polygons, and shapes to the map
- **Layer Management**: Toggle satellite and feature layers
- **Geocoding Search**: Find locations using Nominatim
- **Persistence**: Features saved in localStorage
- **Responsive Design**: Works on desktop and mobile
- **Custom Controls**: Beautiful, custom map controls

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Map Library**: Leaflet + React-Leaflet
- **State Management**: Zustand
- **Testing**: Playwright
- **Build Tool**: Vite

## 📦 Installation

1. **Clone and setup**:
   \`\`\`bash
   cd geo-visualizer-app
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open browser**: Navigate to `http://localhost:5173`

## 🧪 Testing

Run Playwright tests:
\`\`\`bash
npm run test
\`\`\`

Run tests with UI:
\`\`\`bash
npm run test:ui
\`\`\`

## 🗺 Map Library Choice: Leaflet

### Why Leaflet?
- **Lightweight**: ~39KB gzipped, fast loading
- **WMS Support**: Built-in WMS layer support
- **Great Documentation**: Extensive examples and API docs
- **Large Community**: Active development and support
- **Easy Extensibility**: Plugin ecosystem for additional features

### Alternatives Considered:
- **MapLibre GL JS**: More modern but heavier (~200KB)
- **OpenLayers**: Powerful but complex API
- **react-map-gl**: Mapbox-based, requires API key

**Decision**: Leaflet was chosen for its simplicity, small bundle size, and excellent WMS support perfect for this satellite imagery application.

## 🏗 Architecture Decisions

### Component Structure
\`\`\`
src/
├── components/
│   ├── map/          # Map-related components
│   └── ui/           # UI components
├── hooks/            # Custom React hooks
├── store/            # Zustand state management
├── types/            # TypeScript definitions
└── utils/            # Utility functions
\`\`\`

### State Management: Zustand
- **Lightweight**: Minimal boilerplate
- **TypeScript Support**: Excellent type safety
- **Persistence**: Built-in localStorage support
- **DevTools**: Easy debugging

### Separation of Concerns
- **Map Logic**: Isolated in map components
- **UI State**: Managed separately from map state
- **Business Logic**: Extracted to hooks and utils

## ⚡ Performance Considerations

### Current Optimizations:
- **Lazy Loading**: Components loaded on demand
- **Efficient Rendering**: React.memo for expensive components
- **Debounced Search**: Prevents excessive API calls
- **Local Storage**: Client-side persistence

### For 1000+ Points/Polygons:
1. **Virtual Scrolling**: Only render visible features
2. **Clustering**: Group nearby points using Leaflet.markercluster
3. **Simplified Geometries**: Reduce point density for polygons
4. **Web Workers**: Offload heavy computations
5. **Level of Detail**: Show simplified versions at lower zoom levels

### Implementation Plan:
\`\`\`typescript
// Example clustering implementation
import MarkerCluster from '@changey/react-leaflet-markercluster';

<MarkerCluster>
  {points.map(point => (
    <Marker key={point.id} position={point.coordinates} />
  ))}
</MarkerCluster>
\`\`\`

## 🧪 Testing Strategy

### Current Tests (Playwright):
1. **App Loading**: Basic functionality and UI elements
2. **Layer Toggling**: Satellite and feature layer controls
3. **Search & Drawing**: User interaction workflows
4. **Persistence**: Feature storage across reloads

### With More Time:
- **Unit Tests**: React Testing Library for components
- **Integration Tests**: Map interaction scenarios
- **Performance Tests**: Load testing with many features
- **Visual Regression Tests**: UI consistency

### Test Priorities:
1. **Critical Paths**: Map loading, basic interactions
2. **User Flows**: Complete drawing and saving workflows
3. **Edge Cases**: Error handling, empty states

## 🤝 Tradeoffs Made

### 1. Feature Depth vs. Development Time
- **Chose**: Core drawing tools (points)
- **Deferred**: Advanced polygon editing, measurement tools
- **Reason**: Meet deadline while delivering working product

### 2. Bundle Size vs. Functionality
- **Chose**: Leaflet (smaller)
- **Considered**: MapLibre (more features but larger)
- **Reason**: Performance and faster loading

### 3. UI Polish vs. Core Features
- **Chose**: Professional, clean UI with core functionality
- **Deferred**: Advanced animations, complex interactions
- **Reason**: Deliver excellent user experience within timeframe

## 🚀 Production Readiness

### Immediate Additions:
1. **Error Boundaries**: Graceful error handling
2. **Loading States**: Better user feedback
3. **API Rate Limiting**: For geocoding service
4. **PWA Features**: Offline capability

### Security:
1. **Environment Variables**: API keys and configuration
2. **Input Sanitization**: Search query validation
3. **CSP Headers**: Content Security Policy

### Monitoring:
1. **Analytics**: User interaction tracking
2. **Error Reporting**: Sentry or similar service
3. **Performance Monitoring**: Core Web Vitals

### Deployment:
https://geo-visualizer-app.vercel.app

## ⏱ Time Spent Breakdown

- **Setup & Configuration**: 2 hours
  - Vite, TypeScript, Tailwind setup
  - Project structure and tooling

- **Core Map Implementation**: 3 hours
  - Leaflet integration
  - WMS layer setup
  - Basic interactions

- **UI Components**: 3 hours
  - Sidebar, toolbar, search
  - Responsive design
  - Custom controls

- **State & Features**: 2 hours
  - Zustand store
  - Drawing tools
  - Local storage

- **Testing & Documentation**: 2 hours
  - Playwright tests
  - README and documentation

**Total**: ~12 hours

## 📝 API Documentation

### WMS Service
- **Endpoint**: `https://www.wms.nrw.de/geobasis/wms_nw_dop`
- **Layer**: `nw_dop` (Digital Orthophotos)
- **Format**: `image/png`

### Geocoding Service
- **Provider**: Nominatim (OpenStreetMap)
- **Endpoint**: `https://nominatim.openstreetmap.org/search`
- **Parameters**: `format=json&q={query}&limit=5`

### Example Response:
\`\`\`json
{
  "display_name": "Berlin, Germany",
  "lat": "52.5170365",
  "lon": "13.3888599",
  "boundingbox": ["52.338", "52.675", "13.088", "13.761"]
}
\`\`\`

## 👥 Development

### Scripts:
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run test\` - Run Playwright tests

### Environment Variables:
Create \`.env.local\`:
\`\`\`
VITE_APP_TITLE=Geo Visualizer
VITE_MAP_DEFAULT_LAT=51.1657
VITE_MAP_DEFAULT_LON=10.4515
\`\`\`
