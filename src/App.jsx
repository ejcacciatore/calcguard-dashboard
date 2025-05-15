import { useState } from 'react'
import TopologyDiagram from './TopologyDiagram'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const stages = [
    { 
      id: 'market-data', 
      name: 'Market Data', 
      color: '#6B7280', 
      icon: '📊',
      metrics: '15M ticks/sec',
      systems: ['Bloomberg Terminal', 'Refinitiv Elektron', 'ICE Data', 'LSEG Datascope', 'MayStreet'],
      description: 'Real-time market data feeds and historical data access'
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio Management', 
      color: '#3B82F6',
      icon: '💼',
      metrics: '1.2M orders/day',
      systems: ['BlackRock Aladdin', 'State Street PORT', 'SimCorp Dimension', 'Charles River IMS'],
      description: 'Portfolio modeling, risk analytics, and compliance'
    },
    { 
      id: 'risk', 
      name: 'Risk & Compliance', 
      color: '#F59E0B',
      icon: '🛡️',
      metrics: '99.9% pass rate',
      systems: ['Bloomberg MARS', 'Fidessa Sentinel', 'SS&C Compliance', 'Axioma Risk'],
      description: 'Pre-trade risk checks and regulatory compliance'
    },
    { 
      id: 'order', 
      name: 'Order Management', 
      color: '#8B5CF6',
      icon: '📋',
      metrics: '847K active',
      systems: ['Charles River OMS', 'Bloomberg AIM', 'SS&C Eze OMS', 'Fidessa Minerva'],
      description: 'Order creation, routing, and lifecycle management'
    },
    { 
      id: 'execution', 
      name: 'Execution Management', 
      color: '#F97316',
      icon: '⚡',
      metrics: '67 algorithms',
      systems: ['FlexTrade', 'Bloomberg EMSX', 'Virtu Triton', 'Instinet Newport'],
      description: 'Smart order routing and execution algorithms'
    },
    { 
      id: 'broker', 
      name: 'Broker/Dealers', 
      color: '#EF4444',
      icon: '🏦',
      metrics: '142 connections',
      systems: ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan', 'Instinet', 'Loop Capital', 'CastleOak'],
      description: 'Broker network for order execution'
    },
    { 
      id: 'venue', 
      name: 'Execution Venues', 
      color: '#6B7280',
      icon: '🏛️',
      metrics: '47 venues',
      systems: ['NYSE', 'NASDAQ', 'IEX', 'CBOE', 'Dark Pools (35)', 'ATS Networks'],
      description: 'Exchanges, dark pools, and alternative trading systems'
    },
    { 
      id: 'settlement', 
      name: 'Settlement & Clearing', 
      color: '#06B6D4',
      icon: '✅',
      metrics: 'T+1 99.8%',
      systems: ['DTCC/NSCC', 'BNY Mellon', 'State Street', 'Northern Trust', 'JPM Custody'],
      description: 'Trade confirmation, clearing, and settlement'
    }
  ]

  const marketDataProviders = [
    { name: 'Bloomberg', status: 'active', latency: '< 5ms' },
    { name: 'Refinitiv', status: 'active', latency: '< 3ms' },
    { name: 'LSEG', status: 'active', latency: '< 4ms' },
    { name: 'ICE', status: 'active', latency: '< 6ms' },
    { name: 'MayStreet', status: 'active', latency: '< 1ms' }
  ]

  const calcguardFeatures = [
    { icon: '📊', name: 'Real-time TCA', metric: '< 50μs latency' },
    { icon: '🤖', name: 'ML Analytics', metric: '23 models active' },
    { icon: '✔️', name: 'Best Execution', metric: '99.2% compliance' },
    { icon: '📉', name: 'Market Impact', metric: '-12bps avg' },
    { icon: '🔐', name: 'Zero-Trust Security', metric: 'SOC 2' },
    { icon: '📝', name: 'Regulatory Reports', metric: 'MiFID II, CAT' },
    { icon: '⚙️', name: 'API Integration', metric: 'REST, FIX, WS' },
    { icon: '🖥️', name: 'FDC3 Desktop', metric: 'v2.0 Compatible' }
  ]

   return (
    <div className="app">
      {/* Navigation */}
      <nav className="navigation">
        <button 
          className={currentView === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentView('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={currentView === 'topology' ? 'active' : ''}
          onClick={() => setCurrentView('topology')}
        >
          Interactive Topology
        </button>
      </nav>

      {/* Metrics Dashboard */}
      <div className="metrics-dashboard">
        <div className="metric-card">
          <div className="metric-title">Orders/Second</div>
          <div className="metric-value">12,847</div>
          <div className="metric-trend positive">↑ 15%</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Average Latency</div>
          <div className="metric-value">1.2ms</div>
          <div className="metric-trend positive">↓ 8%</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Fill Rate</div>
          <div className="metric-value">98.7%</div>
          <div className="metric-trend positive">↑ 0.3%</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Active Venues</div>
          <div className="metric-value">47</div>
          <div className="metric-trend neutral">→ 0%</div>
        </div>
      </div>
      
      {/* Market Data Section */}
      <div className="market-data-section">
        <h3>Market Data Providers</h3>
        <div className="providers-grid">
          {marketDataProviders.map(provider => (
            <div key={provider.name} className="provider-card">
              <div className="provider-header">
                <span className="provider-name">{provider.name}</span>
                <span className="status-indicator active"></span>
              </div>
              <div className="provider-metric">{provider.latency}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Flow */}
      <div className="flow-container">
        {stages.map((stage, index) => (
          <div key={stage.id} className="stage-wrapper">
            <div 
              className="stage"
              style={{ 
                borderColor: stage.color,
                backgroundColor: stage.color + '10'
              }}
              onClick={() => setSelectedStage(stage)}
            >
              <div className="stage-header">
                <span className="stage-icon">{stage.icon}</span>
                <span className="stage-metric">{stage.metrics}</span>
              </div>
              <h4>{stage.name}</h4>
              <div className="systems-preview">
                {stage.systems.slice(0, 3).map(sys => (
                  <span key={sys} className="system-tag">{sys}</span>
                ))}
                {stage.systems.length > 3 && 
                  <span className="more">+{stage.systems.length - 3} more</span>
                }
              </div>
            </div>
            {index < stages.length - 1 && <span className="arrow">→</span>}
          </div>
        ))}
      </div>

      {/* CalcGuard Section */}
      <div className="calcguard-section">
        <div className="calcguard-header">
          <span className="calcguard-logo">CG</span>
          <h2>CalcGuard Analytics Platform</h2>
          <span className="status-badge">LIVE</span>
        </div>
        
        <div className="features-grid">
          {calcguardFeatures.map(feature => (
            <div key={feature.name} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <div className="feature-name">{feature.name}</div>
                <div className="feature-metric">{feature.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedStage && (
        <div className="detail-panel">
          <button className="close-btn" onClick={() => setSelectedStage(null)}>×</button>
          <div className="detail-header" style={{backgroundColor: selectedStage.color + '20'}}>
            <span className="detail-icon">{selectedStage.icon}</span>
            <h3 style={{color: selectedStage.color}}>{selectedStage.name}</h3>
          </div>
          
          <div className="detail-content">
            <p className="detail-description">{selectedStage.description}</p>
            
            <div className="detail-section">
              <h4>Key Metrics</h4>
              <div className="detail-metric">{selectedStage.metrics}</div>
            </div>
            
            <div className="detail-section">
              <h4>Systems & Platforms</h4>
              <div className="systems-list">
                {selectedStage.systems.map(system => (
                  <div key={system} className="system-item">
                    <span className="status-dot"></span>
                    <span>{system}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="detail-section">
              <h4>Performance</h4>
              <div className="performance-metrics">
                <div className="perf-item">
                  <span>Throughput:</span>
                  <span>{Math.floor(Math.random() * 10000 + 5000)}/sec</span>
                </div>
                <div className="perf-item">
                  <span>Latency:</span>
                  <span>{(Math.random() * 2 + 0.5).toFixed(1)}ms</span>
                </div>
                <div className="perf-item">
                  <span>Uptime:</span>
                  <span>99.{Math.floor(Math.random() * 9 + 90)}%</span>
                </div>
              </div>
            </div>
          </div>
</div>
      ) : (
        <TopologyDiagram />
      )}
    </div>
  );
}

export default App;