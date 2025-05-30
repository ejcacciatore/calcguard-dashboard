/**
 * CalcGuard Enterprise Trading Infrastructure Platform
 * 
 * A professional-grade React application providing comprehensive trading lifecycle
 * visualization and analytics for institutional financial markets.
 * 
 * @author CalcGuard Engineering Team
 * @version 2.0.0
 * @since 2024
 */

import React, { 
  useState, 
  useCallback, 
  useMemo, 
  useEffect, 
  lazy, 
  Suspense,
  createContext,
  useContext,
  useReducer
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

/**
 * Application views configuration
 */
const VIEWS = Object.freeze({
  ENTERPRISE: 'enterprise',
  DASHBOARD: 'dashboard',
  TOPOLOGY: 'topology'
});

/**
 * Navigation configuration for enterprise trading platform
 */
const NAVIGATION_CONFIG = Object.freeze([
  {
    id: VIEWS.ENTERPRISE,
    label: 'Mesh Architecture',
    icon: '🧠',
    description: 'Siteless trading infrastructure topology',
    analyticsEvent: 'nav_enterprise_clicked'
  },
  {
    id: VIEWS.DASHBOARD,
    label: 'Operations Dashboard',
    icon: '📊',
    description: 'Real-time trading operations monitoring',
    analyticsEvent: 'nav_dashboard_clicked'
  },
  {
    id: VIEWS.TOPOLOGY,
    label: 'Technical Topology',
    icon: '🔧',
    description: 'System architecture and connectivity',
    analyticsEvent: 'nav_topology_clicked'
  }
]);

/**
 * Trading lifecycle stages with enterprise-grade metadata
 */
const TRADING_STAGES = Object.freeze([
  {
    id: 'market-data',
    name: 'Market Data',
    category: 'Infrastructure',
    priority: 'critical',
    color: '#6B7280',
    icon: '📊',
    metrics: {
      throughput: '15M ticks/sec',
      latency: '< 50μs',
      availability: '99.99%'
    },
    systems: [
      'Bloomberg Terminal',
      'Refinitiv Elektron',
      'ICE Data',
      'LSEG Datascope',
      'MayStreet'
    ],
    description: 'Real-time market data feeds and historical data access with ultra-low latency distribution',
    compliance: ['MiFID II', 'CAT', 'FINRA'],
    riskLevel: 'high'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Management',
    category: 'Investment',
    priority: 'critical',
    color: '#3B82F6',
    icon: '💼',
    metrics: {
      throughput: '1.2M orders/day',
      assets: '$45T+ AUM',
      calculations: '500K/sec'
    },
    systems: [
      'BlackRock Aladdin',
      'State Street PORT',
      'SimCorp Dimension',
      'Charles River IMS'
    ],
    description: 'Portfolio modeling, risk analytics, and compliance with institutional-grade performance',
    compliance: ['SOX', 'GDPR', 'PCI DSS'],
    riskLevel: 'high'
  },
  {
    id: 'risk',
    name: 'Risk & Compliance',
    category: 'Governance',
    priority: 'critical',
    color: '#F59E0B',
    icon: '🛡️',
    metrics: {
      passRate: '99.9%',
      checksPerSecond: '25K',
      falsePositives: '< 0.1%'
    },
    systems: [
      'Bloomberg MARS',
      'Fidessa Sentinel',
      'SS&C Compliance',
      'Axioma Risk'
    ],
    description: 'Pre-trade risk checks and regulatory compliance with real-time monitoring',
    compliance: ['Basel III', 'Dodd-Frank', 'EMIR'],
    riskLevel: 'critical'
  },
  {
    id: 'order',
    name: 'Order Management',
    category: 'Execution',
    priority: 'critical',
    color: '#8B5CF6',
    icon: '📋',
    metrics: {
      active: '847K orders',
      throughput: '50K orders/sec',
      accuracy: '99.97%'
    },
    systems: [
      'Charles River OMS',
      'Bloomberg AIM',
      'SS&C Eze OMS',
      'Fidessa Minerva'
    ],
    description: 'Order creation, routing, and lifecycle management with institutional-grade controls',
    compliance: ['FIX Protocol', 'ISO 20022'],
    riskLevel: 'high'
  },
  {
    id: 'execution',
    name: 'Execution Management',
    category: 'Execution',
    priority: 'critical',
    color: '#F97316',
    icon: '⚡',
    metrics: {
      algorithms: '67 active',
      latency: '< 100μs',
      fillRate: '98.7%'
    },
    systems: [
      'FlexTrade',
      'Bloomberg EMSX',
      'Virtu Triton',
      'Instinet Newport'
    ],
    description: 'Smart order routing and execution algorithms with machine learning optimization',
    compliance: ['Best Execution', 'Market Access'],
    riskLevel: 'high'
  },
  {
    id: 'broker',
    name: 'Broker/Dealers',
    category: 'Network',
    priority: 'high',
    color: '#EF4444',
    icon: '🏦',
    metrics: {
      connections: '142 active',
      coverage: '47 venues',
      diversity: '85% tier-1'
    },
    systems: [
      'Goldman Sachs',
      'Morgan Stanley',
      'JP Morgan',
      'Instinet',
      'Loop Capital',
      'Castle Oak'
    ],
    description: 'Broker network for order execution with comprehensive venue access',
    compliance: ['Prime Brokerage', 'FINRA'],
    riskLevel: 'medium'
  },
  {
    id: 'venue',
    name: 'Execution Venues',
    category: 'Infrastructure',
    priority: 'high',
    color: '#6B7280',
    icon: '🏛️',
    metrics: {
      venues: '47 connected',
      darkPools: '35 active',
      coverage: '99.8% liquidity'
    },
    systems: [
      'NYSE',
      'NASDAQ',
      'IEX',
      'CBOE',
      'Dark Pools (35)',
      'ATS Networks'
    ],
    description: 'Exchanges, dark pools, and alternative trading systems with comprehensive market access',
    compliance: ['Reg NMS', 'MiFID II'],
    riskLevel: 'medium'
  },
  {
    id: 'settlement',
    name: 'Settlement & Clearing',
    category: 'Post-Trade',
    priority: 'critical',
    color: '#06B6D4',
    icon: '✅',
    metrics: {
      settlementRate: 'T+1 99.8%',
      volume: '$2.5T daily',
      stp: '97.3%'
    },
    systems: [
      'DTCC/NSCC',
      'BNY Mellon',
      'State Street',
      'Northern Trust',
      'JPM Custody'
    ],
    description: 'Trade confirmation, clearing, and settlement with institutional custody services',
    compliance: ['CSDR', 'T+1 Settlement'],
    riskLevel: 'high'
  }
]);

/**
 * Market data providers with enterprise SLA metrics
 */
const MARKET_DATA_PROVIDERS = Object.freeze([
  { 
    name: 'Bloomberg', 
    status: 'active', 
    latency: '< 5ms',
    uptime: '99.99%',
    feedType: 'Level 2',
    protocol: 'B-PIPE'
  },
  { 
    name: 'Refinitiv', 
    status: 'active', 
    latency: '< 3ms',
    uptime: '99.98%',
    feedType: 'Ultra Low Latency',
    protocol: 'RFA'
  },
  { 
    name: 'LSEG', 
    status: 'active', 
    latency: '< 4ms',
    uptime: '99.97%',
    feedType: 'Real-time',
    protocol: 'UPA'
  },
  { 
    name: 'ICE', 
    status: 'active', 
    latency: '< 6ms',
    uptime: '99.95%',
    feedType: 'Market Data',
    protocol: 'FAST'
  },
  { 
    name: 'MayStreet', 
    status: 'active', 
    latency: '< 1ms',
    uptime: '99.99%',
    feedType: 'Co-located',
    protocol: 'ITCH'
  }
]);

/**
 * CalcGuard platform features with enterprise metrics
 */
const CALCGUARD_FEATURES = Object.freeze([
  { 
    id: 'tca',
    icon: '📊', 
    name: 'Real-time TCA', 
    metric: '< 50μs latency',
    category: 'Analytics',
    description: 'Transaction Cost Analysis with microsecond precision'
  },
  { 
    id: 'ml',
    icon: '🤖', 
    name: 'ML Analytics', 
    metric: '23 models active',
    category: 'Intelligence',
    description: 'Machine Learning models for predictive analytics'
  },
  { 
    id: 'execution',
    icon: '✔️', 
    name: 'Best Execution', 
    metric: '99.2% compliance',
    category: 'Compliance',
    description: 'Regulatory best execution monitoring and reporting'
  },
  { 
    id: 'impact',
    icon: '📉', 
    name: 'Market Impact', 
    metric: '-12bps avg',
    category: 'Performance',
    description: 'Market impact measurement and optimization'
  },
  { 
    id: 'security',
    icon: '🔐', 
    name: 'Zero-Trust Security', 
    metric: 'SOC 2 Type II',
    category: 'Security',
    description: 'Enterprise-grade security with zero-trust architecture'
  },
  { 
    id: 'reports',
    icon: '📝', 
    name: 'Regulatory Reports', 
    metric: 'MiFID II, CAT',
    category: 'Compliance',
    description: 'Automated regulatory reporting and compliance'
  },
  { 
    id: 'api',
    icon: '⚙️', 
    name: 'API Integration', 
    metric: 'REST, FIX, WS',
    category: 'Integration',
    description: 'Comprehensive API suite for system integration'
  },
  { 
    id: 'desktop',
    icon: '🖥️', 
    name: 'FDC3 Desktop', 
    metric: 'v2.0 Compatible',
    category: 'Interoperability',
    description: 'Financial Desktop Connectivity and Collaboration'
  }
]);

// ===========================================
// CONTEXT & STATE MANAGEMENT
// ===========================================

/**
 * Application state management using useReducer for complex state
 */
const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload,
        lastViewChange: Date.now()
      };
    case 'SET_SELECTED_STAGE':
      return {
        ...state,
        selectedStage: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

/**
 * Initial application state
 */
const initialState = {
  currentView: VIEWS.ENTERPRISE,
  selectedStage: null,
  isLoading: false,
  error: null,
  lastViewChange: Date.now()
};

/**
 * Application Context for global state management
 */
const AppContext = createContext(null);

/**
 * Custom hook for accessing application context
 */
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ===========================================
// UTILITY FUNCTIONS & HOOKS
// ===========================================

/**
 * Custom hook for analytics tracking
 */
const useAnalytics = () => {
  const trackEvent = useCallback((eventName, properties = {}) => {
    // In production, this would integrate with analytics services
    console.info('Analytics Event:', eventName, properties);
    
    // Example integration points:
    // - Google Analytics 4
    // - Adobe Analytics
    // - Custom enterprise analytics
  }, []);

  return { trackEvent };
};

/**
 * Custom hook for performance monitoring
 */
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          console.info('Navigation Performance:', {
            loadTime: entry.loadEventEnd - entry.loadEventStart,
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
          });
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'measure'] });

    return () => observer?.disconnect();
  }, []);
};

/**
 * Utility function for generating random performance metrics
 * In production, this would come from real-time data feeds
 */
function generateRealtimeMetrics() {
  return {
    throughput: Math.floor(Math.random() * 10000 + 5000),
    latency: +(Math.random() * 2 + 0.5).toFixed(1),
    uptime: +(99 + Math.random()).toFixed(2)
  };
}

// ===========================================
// COMPONENT DEFINITIONS
// ===========================================

/**
 * Error Fallback Component for Error Boundaries
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-boundary-container">
    <div className="error-content">
      <h2 className="error-title">⚠️ System Error Detected</h2>
      <p className="error-message">
        An unexpected error occurred in the CalcGuard trading platform.
      </p>
      <details className="error-details">
        <summary>Technical Details</summary>
        <pre className="error-stack">{error.message}</pre>
      </details>
      <div className="error-actions">
        <button 
          onClick={resetErrorBoundary}
          className="control-button active"
        >
          🔄 Restart Application
        </button>
      </div>
    </div>
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired
};

/**
 * Loading Spinner Component with enterprise branding
 */
const LoadingSpinner = ({ message = 'Loading CalcGuard Platform...' }) => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p className="loading-message">{message}</p>
  </div>
);

LoadingSpinner.propTypes = {
  message: PropTypes.string
};

/**
 * Professional Navigation Component
 */
const Navigation = React.memo(() => {
  const { state, dispatch } = useAppContext();
  const { trackEvent } = useAnalytics();

  const handleViewChange = useCallback((viewId) => {
    const navItem = NAVIGATION_CONFIG.find(item => item.id === viewId);
    
    // Track analytics
    trackEvent(navItem?.analyticsEvent || 'nav_clicked', {
      view: viewId,
      timestamp: Date.now()
    });

    // Update state
    dispatch({ type: 'SET_VIEW', payload: viewId });
  }, [dispatch, trackEvent]);

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navigation-inner">
        {NAVIGATION_CONFIG.map((navItem) => (
          <button
            key={navItem.id}
            className={state.currentView === navItem.id ? 'active' : ''}
            onClick={() => handleViewChange(navItem.id)}
            aria-current={state.currentView === navItem.id ? 'page' : undefined}
            title={navItem.description}
          >
            <span className="nav-icon" aria-hidden="true">{navItem.icon}</span>
            <span className="nav-label">{navItem.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

/**
 * Enterprise Dashboard Header Component
 */
const DashboardHeader = React.memo(() => {
  const currentTime = useMemo(() => new Date().toLocaleString(), []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" aria-label="CalcGuard Logo">CG</div>
        <div className="header-info">
          <h1>CalcGuard Order Routing Topology</h1>
          <p className="subtitle">Real-time Trade Flow Visualization & Analytics</p>
        </div>
      </div>
      <div className="timestamp">
        <time dateTime={new Date().toISOString()}>
          Last Updated: {currentTime}
        </time>
      </div>
    </header>
  );
});

DashboardHeader.displayName = 'DashboardHeader';

/**
 * Real-time Metrics Dashboard Component
 */
const MetricsDashboard = React.memo(() => {
  const [metrics, setMetrics] = useState({
    ordersPerSecond: 12847,
    averageLatency: 1.2,
    fillRate: 98.7,
    activeVenues: 47
  });

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ordersPerSecond: prev.ordersPerSecond + Math.floor(Math.random() * 200 - 100),
        averageLatency: +(prev.averageLatency + (Math.random() * 0.2 - 0.1)).toFixed(1),
        fillRate: +(prev.fillRate + (Math.random() * 0.2 - 0.1)).toFixed(1),
        activeVenues: prev.activeVenues + Math.floor(Math.random() * 3 - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metricsConfig = useMemo(() => [
    {
      title: 'Orders/Second',
      value: metrics.ordersPerSecond.toLocaleString(),
      trend: 'positive',
      change: '↑ 15%'
    },
    {
      title: 'Average Latency',
      value: `${metrics.averageLatency}ms`,
      trend: 'positive',
      change: '↓ 8%'
    },
    {
      title: 'Fill Rate',
      value: `${metrics.fillRate}%`,
      trend: 'positive',
      change: '↑ 0.3%'
    },
    {
      title: 'Active Venues',
      value: metrics.activeVenues.toString(),
      trend: 'neutral',
      change: '→ 0%'
    }
  ], [metrics]);

  return (
    <section className="metrics-dashboard" aria-label="Key Performance Metrics">
      {metricsConfig.map((metric) => (
        <div key={metric.title} className="metric-card">
          <div className="metric-title">{metric.title}</div>
          <div className="metric-value">{metric.value}</div>
          <div className={`metric-trend ${metric.trend}`}>
            {metric.change}
          </div>
        </div>
      ))}
    </section>
  );
});

MetricsDashboard.displayName = 'MetricsDashboard';

/**
 * Market Data Providers Component
 */
const MarketDataSection = React.memo(() => (
  <section className="market-data-section" aria-label="Market Data Providers">
    <h3>Market Data Providers</h3>
    <div className="providers-grid">
      {MARKET_DATA_PROVIDERS.map(provider => (
        <article key={provider.name} className="provider-card">
          <div className="provider-header">
            <span className="provider-name">{provider.name}</span>
            <span 
              className={`status-indicator ${provider.status}`}
              aria-label={`Status: ${provider.status}`}
            ></span>
          </div>
          <div className="provider-metrics">
            <div className="provider-metric">Latency: {provider.latency}</div>
            <div className="provider-metric">Uptime: {provider.uptime}</div>
            <div className="provider-metric">Protocol: {provider.protocol}</div>
          </div>
        </article>
      ))}
    </div>
  </section>
));

MarketDataSection.displayName = 'MarketDataSection';

/**
 * Trading Stages Flow Component
 */
const TradingStagesFlow = React.memo(() => {
  const { state, dispatch } = useAppContext();
  const { trackEvent } = useAnalytics();

  const handleStageClick = useCallback((stage) => {
    trackEvent('stage_selected', {
      stageId: stage.id,
      stageName: stage.name,
      category: stage.category
    });
    
    dispatch({ type: 'SET_SELECTED_STAGE', payload: stage });
  }, [dispatch, trackEvent]);

  return (
    <section className="flow-container" aria-label="Trading Lifecycle Stages">
      {TRADING_STAGES.map((stage, index) => (
        <div key={stage.id} className="stage-wrapper">
          <article
            className="stage"
            style={{
              borderColor: stage.color,
              backgroundColor: `${stage.color}10`
            }}
            onClick={() => handleStageClick(stage)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageClick(stage);
              }
            }}
            aria-label={`${stage.name} - ${stage.description}`}
          >
            <div className="stage-header">
              <span className="stage-icon" aria-hidden="true">{stage.icon}</span>
              <span className="stage-metric">{stage.metrics.throughput || Object.values(stage.metrics)[0]}</span>
            </div>
            <h4>{stage.name}</h4>
            <div className="systems-preview">
              {stage.systems.slice(0, 3).map(system => (
                <span key={system} className="system-tag">{system}</span>
              ))}
              {stage.systems.length > 3 && (
                <span className="more">+{stage.systems.length - 3} more</span>
              )}
            </div>
          </article>
          {index < TRADING_STAGES.length - 1 && (
            <span className="arrow" aria-hidden="true">→</span>
          )}
        </div>
      ))}
    </section>
  );
});

TradingStagesFlow.displayName = 'TradingStagesFlow';

/**
 * CalcGuard Features Section Component
 */
const CalcGuardSection = React.memo(() => (
  <section className="calcguard-section" aria-label="CalcGuard Analytics Platform">
    <header className="calcguard-header">
      <span className="calcguard-logo" aria-label="CalcGuard Logo">CG</span>
      <h2>CalcGuard Analytics Platform</h2>
      <span className="status-badge" aria-label="Platform Status">LIVE</span>
    </header>

    <div className="features-grid">
      {CALCGUARD_FEATURES.map(feature => (
        <article key={feature.id} className="feature-card">
          <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
          <div className="feature-content">
            <div className="feature-name">{feature.name}</div>
            <div className="feature-metric">{feature.metric}</div>
            <div className="feature-description">{feature.description}</div>
          </div>
        </article>
      ))}
    </div>
  </section>
));

CalcGuardSection.displayName = 'CalcGuardSection';

/**
 * Stage Detail Panel Component
 */
const StageDetailPanel = React.memo(() => {
  const { state, dispatch } = useAppContext();
  const { selectedStage } = state;
  const realtimeMetrics = generateRealtimeMetrics();

  const handleClose = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_STAGE', payload: null });
  }, [dispatch]);

  if (!selectedStage) return null;

  return (
    <aside 
      className="detail-panel" 
      role="dialog" 
      aria-labelledby="detail-panel-title"
      aria-modal="true"
    >
      <button 
        className="close-btn" 
        onClick={handleClose}
        aria-label="Close detail panel"
      >
        ×
      </button>
      
      <header 
        className="detail-header" 
        style={{ backgroundColor: `${selectedStage.color}20` }}
      >
        <span className="detail-icon" aria-hidden="true">{selectedStage.icon}</span>
        <h3 id="detail-panel-title" style={{ color: selectedStage.color }}>
          {selectedStage.name}
        </h3>
      </header>

      <div className="detail-content">
        <p className="detail-description">{selectedStage.description}</p>

        <section className="detail-section">
          <h4>Key Metrics</h4>
          <div className="metrics-grid">
            {Object.entries(selectedStage.metrics).map(([key, value]) => (
              <div key={key} className="metric-item">
                <div className="metric-item-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="metric-item-value">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h4>Systems & Platforms</h4>
          <div className="systems-list">
            {selectedStage.systems.map(system => (
              <div key={system} className="system-item">
                <span className="status-dot" aria-hidden="true"></span>
                <span>{system}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h4>Real-time Performance</h4>
          <div className="performance-metrics">
            <div className="perf-item">
              <span>Throughput:</span>
              <span>{realtimeMetrics.throughput}/sec</span>
            </div>
            <div className="perf-item">
              <span>Latency:</span>
              <span>{realtimeMetrics.latency}ms</span>
            </div>
            <div className="perf-item">
              <span>Uptime:</span>
              <span>{realtimeMetrics.uptime}%</span>
            </div>
          </div>
        </section>

        <section className="detail-section">
          <h4>Compliance & Risk</h4>
          <div className="compliance-info">
            <div className="compliance-item">
              <span>Risk Level:</span>
              <span className={`risk-badge ${selectedStage.riskLevel}`}>
                {selectedStage.riskLevel.toUpperCase()}
              </span>
            </div>
            <div className="compliance-standards">
              {selectedStage.compliance?.map(standard => (
                <span key={standard} className="compliance-tag">{standard}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
});

StageDetailPanel.displayName = 'StageDetailPanel';

/**
 * Main Application Component with Enterprise Architecture
 */
function CalcGuardApp() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  const { trackEvent } = useAnalytics();

  // Performance monitoring
  usePerformanceMonitoring();

  // Context value for global state
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  /**
   * Render appropriate view content based on current state
   */
  const renderViewContent = useCallback(() => {
    const commonProps = {
      onError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
      onLoadingChange: (loading) => dispatch({ type: 'SET_LOADING', payload: loading })
    };

    switch (state.currentView) {
      case VIEWS.ENTERPRISE:
        return (
          <div className="enterprise-architecture-view">
            <Suspense fallback={<LoadingSpinner message="Loading Neural Architecture..." />}>
              <EnterpriseArchitectureVisualization {...commonProps} />
            </Suspense>
          </div>
        );

      case VIEWS.DASHBOARD:
        return (
          <div className="dashboard-view">
            <DashboardHeader />
            <MetricsDashboard />
            <MarketDataSection />
            <TradingStagesFlow />
            <CalcGuardSection />
            <StageDetailPanel />
          </div>
        );

      case VIEWS.TOPOLOGY:
        return (
          <div className="dashboard-view">
            <Suspense fallback={<LoadingSpinner message="Loading Technical Topology..." />}>
              <TopologyDiagram {...commonProps} />
            </Suspense>
          </div>
        );

      default:
        return (
          <div className="error-view">
            <h2>View Not Found</h2>
            <p>The requested view "{state.currentView}" could not be found.</p>
            <button 
              onClick={() => dispatch({ type: 'SET_VIEW', payload: VIEWS.ENTERPRISE })}
              className="control-button active"
            >
              Return to Mesh Architecture
            </button>
          </div>
        );
    }
  }, [state.currentView]);

  // Track initial app load
  useEffect(() => {
    trackEvent('app_loaded', {
      timestamp: Date.now(),
      initialView: state.currentView
    });
  }, [trackEvent, state.currentView]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app" role="application" aria-label="CalcGuard Trading Platform">
        <Navigation />
        
        <main className="main-content" role="main">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
              console.error('Application Error:', error, errorInfo);
              trackEvent('error_boundary_triggered', {
                error: error.message,
                componentStack: errorInfo.componentStack
              });
            }}
            onReset={() => {
              dispatch({ type: 'CLEAR_ERROR' });
              trackEvent('error_boundary_reset');
            }}
          >
            {state.isLoading ? (
              <LoadingSpinner />
            ) : (
              renderViewContent()
            )}
          </ErrorBoundary>
        </main>

        {/* Global Error Display */}
        {state.error && (
          <div className="global-error-toast" role="alert">
            <span>⚠️ {state.error.message}</span>
            <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })}>
              ×
            </button>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default CalcGuardApp;