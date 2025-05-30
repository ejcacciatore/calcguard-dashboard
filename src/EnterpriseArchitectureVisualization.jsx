import { useState, useEffect } from 'react';

function EnterpriseArchitectureVisualization() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeFlowType, setActiveFlowType] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [viewportSize, setViewportSize] = useState({ width: 1800, height: 1200 });
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: Math.max(1600, window.innerWidth - (sidebarCollapsed ? 120 : 620)),
        height: Math.max(1000, window.innerHeight - 180)
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  // Professional coordinate scaling with much larger spacing
  const scaleX = (x) => (x / 800) * Math.min(viewportSize.width - 200, 1600);
  const scaleY = (y) => (y / 600) * Math.min(viewportSize.height - 200, 1000);

  // Zoom functions
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  const handleResetZoom = () => {
    setZoomLevel(0.8);
    setPanOffset({ x: 0, y: 0 });
  };

  // Pan functionality
  const handleMouseDown = (e) => {
    if (e.button === 0 && !e.target.closest('circle[data-entity]')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  // Professional entity definitions with accurate industry data
  const entities = {
    assetManagers: [
      {
        id: 'ssga',
        name: 'SSGA',
        fullName: 'State Street Global Advisors',
        category: 'Asset Management',
        tier: 'Global Tier 1',
        aum: '$4.14T',
        type: 'Institutional Asset Manager',
        layer: 1,
        color: '#1e40af',
        x: 150,
        y: 120,
        description: 'World\'s third-largest asset manager providing institutional investment management, research, and advisory services.',
        keyMetrics: { aum: '$4.14T', clients: '1,200+', strategies: '300+', employees: '40,000+' }
      },
      {
        id: 'imrf',
        name: 'IMRF',
        fullName: 'Illinois Municipal Retirement Fund',
        category: 'Asset Management',
        tier: 'Public Pension',
        aum: '$65.2B',
        type: 'Municipal Pension Fund',
        layer: 1,
        color: '#dc2626',
        x: 450,
        y: 120,
        description: 'Largest municipal retirement system in Illinois serving public employees across 650+ participating employers.',
        keyMetrics: { aum: '$65.2B', members: '185K+', employers: '650+', founded: '1939' }
      },
      {
        id: 'brandes',
        name: 'Brandes',
        fullName: 'Brandes Investment Partners',
        category: 'Asset Management',
        tier: 'Boutique Specialist',
        aum: '$8.4B',
        type: 'Value Investment Manager',
        layer: 1,
        color: '#059669',
        x: 750,
        y: 120,
        description: 'Specialized global value equity manager serving as subadvisor with 47+ years of disciplined investment approach.',
        keyMetrics: { aum: '$8.4B', experience: '47+ years', focus: 'Value Equity', clients: '200+' }
      }
    ],

    infrastructure: [
      {
        id: 'ssga-oms',
        name: 'SSGA OMS',
        fullName: 'State Street Proprietary Order Management',
        category: 'Order Management',
        tier: 'Proprietary System',
        type: 'Internal OMS Platform',
        layer: 2,
        color: '#b91c1c',
        x: 150,
        y: 320,
        notConnected: true,
        description: 'Proprietary order management system with integrated portfolio management, risk controls, and regulatory compliance.',
        keyMetrics: { orders: '2.5M+ daily', latency: '<85ms', uptime: '99.96%', integration: 'Limited'  }
      },
      {
        id: 'bloomberg-aim',
        name: 'Bloomberg AIM',
        fullName: 'Bloomberg Asset & Investment Manager',
        category: 'Order Management',
        tier: 'Enterprise Platform',
        type: 'Multi-Asset OMS',
        layer: 2,
        color: '#0891b2',
        x: 450,
        y: 320,
        description: 'Comprehensive multi-asset order and portfolio management system with integrated market data and analytics.',
        keyMetrics: { assets: 'Multi-Asset', clients: '300+', coverage: 'Global', integration: 'Full API' }
      },
      {
        id: 'charles-river',
        name: 'Charles River',
        fullName: 'Charles River Development',
        category: 'Order Management',
        tier: 'Enterprise Platform',
        type: 'Investment Management System',
        layer: 2,
        color: '#7c3aed',
        x: 750,
        y: 320,
        description: 'Leading front-to-back investment management technology platform serving 500+ firms managing $45T+ globally.',
        keyMetrics: { firms: '500+', aum: '$45T+', coverage: 'Global', uptime: '99.97%' }
      }
    ],

    execution: [
      {
        id: 'newport-ems-ssga',
        name: 'Newport EMS (SSGA)',
        fullName: 'Instinet Newport EMS - SSGA Configuration',
        category: 'Execution Management',
        tier: 'Institutional EMS',
        type: 'Agency Execution Platform',
        layer: 3,
        color: '#1e40af',
        x: 200,
        y: 520,
        description: 'Leading institutional execution management system configured for SSGA with advanced algorithms and multi-broker access.',
        keyMetrics: { algorithms: '60+', venues: '200+', latency: '<0.8ms', model: 'Agency' }
      },
      {
        id: 'northern-trust-flextrade',
        name: 'Northern Trust ITS',
        fullName: 'Northern Trust Investment Technology Services (FlexTrade EMS)',
        category: 'Execution Management',
        tier: 'Outsourced EMS',
        type: 'Technology Services EMS',
        layer: 3,
        color: '#0891b2',
        x: 450,
        y: 520,
        description: 'Comprehensive outsourced trading and execution management services powered by FlexTrade technology platform.',
        keyMetrics: { custody: '$13.8T', clients: '22K+', coverage: 'Multi-Asset', algorithms: '45+' }
      },
      {
        id: 'loop-newport',
        name: 'Loop (Newport EMS)',
        fullName: 'Loop Capital Sell-Side Newport EMS',
        category: 'Execution Management',
        tier: 'Sell-Side EMS',
        type: 'Broker EMS Platform',
        layer: 3,
        color: '#be185d',
        x: 700,
        y: 520,
        description: 'Loop Capital\'s sell-side version of Instinet Newport EMS providing institutional execution services.',
        keyMetrics: { focus: 'Institutional', specialty: 'Diverse Strategies', model: 'Sell-Side', founded: '1997' }
      }
    ],

    technology: [
      {
        id: 'fsb-tech-platform',
        name: 'FSB Tech Platform',
        fullName: 'FSB Technology Vendor Platform',
        category: 'Trading Technology',
        tier: 'Technology Vendor',
        type: 'Direct Algo & Venue Access',
        layer: 4,
        color: '#7c3aed',
        x: 150,
        y: 620,
        description: 'Technology vendor providing direct access to algorithms and trading venues with customizable execution solutions.',
        keyMetrics: { algorithms: 'Direct Access', venues: 'Multi-Venue', routing: 'Intelligent', clients: '150+' }
      },
      {
        id: 'pragma-platform',
        name: 'Pragma Platform',
        fullName: 'Pragma AI-Powered Trading Intelligence',
        category: 'Trading Technology',
        tier: 'AI Technology',
        type: 'Machine Learning Algo Platform',
        layer: 4,
        color: '#be185d',
        x: 750,
        y: 620,
        description: 'AI-powered algorithmic trading platform providing machine learning optimization and intelligent execution strategies.',
        keyMetrics: { ai: 'Advanced ML', optimization: 'Real-time', performance: 'Superior', clients: '80+' }
      }
    ],

    brokers: [
      {
        id: 'instinet-broker',
        name: 'Instinet',
        fullName: 'Instinet Incorporated',
        category: 'Broker Network',
        tier: 'Agency Model',
        type: 'Electronic Trading Specialist',
        layer: 5,
        color: '#475569',
        x: 50,
        y: 820,
        description: 'Leading electronic trading specialist providing agency execution services and market structure innovation.',
        keyMetrics: { model: 'Agency', innovation: 'Electronic', focus: 'Institutional', founded: '1969' }
      },
      {
        id: 'morgan-stanley',
        name: 'Morgan Stanley',
        fullName: 'Morgan Stanley Securities',
        category: 'Broker Network',
        tier: 'Bulge Bracket',
        type: 'Global Investment Bank',
        layer: 5,
        color: '#0066cc',
        x: 200,
        y: 820,
        description: 'Premier global investment bank providing comprehensive execution services, algorithmic trading, and institutional solutions.',
        keyMetrics: { revenue: '$48B+', countries: '40+', services: 'Full Service', employees: '75,000+' }
      },
      {
        id: 'goldman-sachs',
        name: 'Goldman Sachs',
        fullName: 'Goldman Sachs Securities',
        category: 'Broker Network',
        tier: 'Bulge Bracket',
        type: 'Global Investment Bank',
        layer: 5,
        color: '#1f2937',
        x: 350,
        y: 820,
        description: 'Premier global investment bank providing comprehensive execution, prime brokerage, and capital markets services.',
        keyMetrics: { revenue: '$51B+', countries: '40+', services: 'Full Service', employees: '49,000+' }
      },
      {
        id: 'castle-oak',
        name: 'Castle Oak',
        fullName: 'Castle Oak Securities LP',
        category: 'Broker Network',
        tier: 'Minority Broker',
        type: 'Specialized Execution Broker',
        layer: 5,
        color: '#dc2626',
        x: 500,
        y: 820,
        description: 'Minority-owned institutional broker dealer providing specialized execution services and utilizing advanced trading technology.',
        keyMetrics: { certification: 'Minority-Owned', focus: 'Execution', innovation: 'Tech-Driven', clients: '120+' }
      },
      {
        id: 'loop-capital',
        name: 'Loop Capital',
        fullName: 'Loop Capital Markets LLC',
        category: 'Broker Network',
        tier: 'Minority Broker',
        type: 'Institutional Broker Dealer',
        layer: 5,
        color: '#be185d',
        x: 650,
        y: 820,
        description: 'Minority-owned institutional broker dealer focusing on diverse investment strategies and comprehensive client solutions.',
        keyMetrics: { certification: 'Minority-Owned', specialty: 'Diverse Strategies', scale: 'Mid-Size', founded: '1997' }
      },
      {
        id: 'all-brokers-access',
        name: 'All Brokers',
        fullName: 'Universal Broker Access Hub',
        category: 'Broker Network',
        tier: 'Multi-Broker Access',
        type: 'Broker Aggregation',
        layer: 5,
        color: '#374151',
        x: 800,
        y: 820,
        description: 'Charles River provides access to all major brokers including Goldman, Instinet, Castle Oak, and Loop Capital.',
        keyMetrics: { brokers: 'All Major', access: 'Universal', routing: 'Multi-Path', coverage: 'Global' }
      }
    ],

    venues: [
      {
        id: 'ats',
        name: 'ATS',
        fullName: 'Alternative Trading Systems',
        category: 'Trading Venues',
        tier: 'Electronic Venues',
        type: 'Alternative Trading Systems',
        layer: 6,
        color: '#7c3aed',
        x: 100,
        y: 1020,
        description: 'Electronic trading systems that match buy and sell orders outside traditional exchanges.'
      },
      {
        id: 'exchanges',
        name: 'Exchanges',
        fullName: 'Public Exchanges',
        category: 'Trading Venues',
        tier: 'Primary Markets',
        type: 'NYSE | NASDAQ | Regional',
        layer: 6,
        color: '#1f2937',
        x: 250,
        y: 1020,
        description: 'Primary public exchanges including NYSE, NASDAQ, and regional exchanges.'
      },
      {
        id: 'dark-pools',
        name: 'Dark Pools',
        fullName: 'Institutional Dark Pools',
        category: 'Trading Venues',
        tier: 'Dark Liquidity',
        type: 'Private Liquidity Pools',
        layer: 6,
        color: '#374151',
        x: 400,
        y: 1020,
        description: 'Private institutional dark pools for anonymous large block trading.'
      },
      {
        id: 'algo-venues',
        name: 'Algo Venues',
        fullName: 'Algorithmic Trading Venues',
        category: 'Trading Venues',
        tier: 'Smart Routing',
        type: 'Algorithmic Venues',
        layer: 6,
        color: '#0891b2',
        x: 550,
        y: 1020,
        description: 'Specialized venues optimized for algorithmic trading and smart order routing.'
      },
      {
        id: 'crossing-networks',
        name: 'Crossing Networks',
        fullName: 'Electronic Crossing Networks',
        category: 'Trading Venues',
        tier: 'ECN Networks',
        type: 'ECNs | Crossing Systems',
        layer: 6,
        color: '#be185d',
        x: 700,
        y: 1020,
        description: 'Electronic crossing networks and matching systems for institutional order crossing.'
      }
    ]
  };

  const calcguardNode = {
    id: 'calcguard',
    name: 'CalcGuard',
    fullName: 'CalcGuard Neural Data Mesh Platform',
    x: 450,
    y: 520,
    color: '#0f172a',
    description: 'Enterprise-grade distributed data mesh providing real-time transaction lifecycle visibility and neural pathway intelligence across the complete trading ecosystem.'
  };

  // Updated flow definitions reflecting accurate trade lifecycle paths
  const flows = {
    execution: [
      // SSGA Trade Lifecycle: SSGA -> SSGA OMS -> Newport EMS -> Multiple Brokers/Tech Platforms
      { from: 'ssga', to: 'ssga-oms', type: 'internal', label: 'Internal Orders', weight: 4 },
      { from: 'ssga-oms', to: 'newport-ems-ssga', type: 'execution', label: 'Newport EMS', weight: 4 },
      
      // SSGA Newport EMS to Brokers/Platforms
      { from: 'newport-ems-ssga', to: 'fsb-tech-platform', type: 'execution', label: 'FSB Tech Access', weight: 3 },
      { from: 'newport-ems-ssga', to: 'instinet-broker', type: 'execution', label: 'Instinet Broker', weight: 3 },
      { from: 'newport-ems-ssga', to: 'morgan-stanley', type: 'execution', label: 'Morgan Stanley Algos', weight: 3 },
      { from: 'newport-ems-ssga', to: 'castle-oak', type: 'execution', label: 'Castle Oak Access', weight: 3 },
      
      // Castle Oak to Pragma Platform
      { from: 'castle-oak', to: 'pragma-platform', type: 'technology', label: 'Pragma AI Platform', weight: 3 },
      
      // IMRF Trade Lifecycle: IMRF -> Bloomberg AIM -> Northern Trust ITS (FlexTrade) -> Loop -> Brokers
      { from: 'imrf', to: 'bloomberg-aim', type: 'oms', label: 'Order Management', weight: 4 },
      { from: 'bloomberg-aim', to: 'northern-trust-flextrade', type: 'execution', label: 'Northern Trust ITS', weight: 4 },
      { from: 'northern-trust-flextrade', to: 'loop-newport', type: 'execution', label: 'Loop EMS', weight: 3 },
      
      // IMRF via Northern Trust FlexTrade to Brokers
      { from: 'northern-trust-flextrade', to: 'goldman-sachs', type: 'execution', label: 'Goldman Sachs Algos', weight: 3 },
      { from: 'northern-trust-flextrade', to: 'instinet-broker', type: 'execution', label: 'Instinet Algos', weight: 3 },
      { from: 'northern-trust-flextrade', to: 'castle-oak', type: 'execution', label: 'Castle Oak Access', weight: 3 },
      { from: 'northern-trust-flextrade', to: 'loop-capital', type: 'execution', label: 'Loop Capital', weight: 3 },
      
      // Brandes Trade Lifecycle: Brandes -> Charles River -> All Brokers
      { from: 'brandes', to: 'charles-river', type: 'oms', label: 'Portfolio Orders', weight: 4 },
      { from: 'charles-river', to: 'all-brokers-access', type: 'execution', label: 'All Brokers Access', weight: 4 },
      
      // Broker to Venue connections
      { from: 'instinet-broker', to: 'exchanges', type: 'venue', label: 'Exchange Access', weight: 3 },
      { from: 'morgan-stanley', to: 'algo-venues', type: 'venue', label: 'Algo Venues', weight: 3 },
      { from: 'goldman-sachs', to: 'dark-pools', type: 'venue', label: 'Dark Pools', weight: 4 },
      { from: 'castle-oak', to: 'crossing-networks', type: 'venue', label: 'ECN Access', weight: 3 },
      { from: 'loop-capital', to: 'ats', type: 'venue', label: 'Alternative Venues', weight: 3 },
      { from: 'all-brokers-access', to: 'exchanges', type: 'venue', label: 'Universal Access', weight: 3 }
    ],
    
    data: [
      { from: 'exchanges', to: 'goldman-sachs', type: 'data', label: 'Market Data', weight: 2 },
      { from: 'goldman-sachs', to: 'northern-trust-flextrade', type: 'data', label: 'Execution Data', weight: 2 },
      { from: 'northern-trust-flextrade', to: 'bloomberg-aim', type: 'data', label: 'Fill Information', weight: 2 },
      { from: 'bloomberg-aim', to: 'imrf', type: 'visibility', label: 'Portfolio Visibility', weight: 2 },
      { from: 'dark-pools', to: 'morgan-stanley', type: 'data', label: 'Trade Confirmation', weight: 2 },
      { from: 'morgan-stanley', to: 'newport-ems-ssga', type: 'data', label: 'Settlement Data', weight: 2 },
      { from: 'crossing-networks', to: 'castle-oak', type: 'data', label: 'Execution Reports', weight: 2 },
      { from: 'pragma-platform', to: 'castle-oak', type: 'data', label: 'AI Analytics', weight: 2 }
    ],

    neural: [
      ...Object.values(entities).flat()
        .filter(entity => entity.id !== 'ssga-oms')
        .map(entity => ({
          from: 'calcguard',
          to: entity.id,
          type: 'neural',
          label: 'Data Mesh Connection',
          weight: 1
        }))
    ]
  };

  const allEntities = [...Object.values(entities).flat(), calcguardNode];

  // Layer management
  const layerConfig = [
    { id: 'assetManagers', name: 'Asset Management', count: 3, color: '#1e40af', icon: '💼' },
    { id: 'infrastructure', name: 'Order Management', count: 3, color: '#7c3aed', icon: '⚙️' },
    { id: 'execution', name: 'Execution Systems', count: 3, color: '#ea580c', icon: '⚡' },
    { id: 'technology', name: 'Trading Technology', count: 2, color: '#be185d', icon: '🔧' },
    { id: 'brokers', name: 'Broker Network', count: 6, color: '#1f2937', icon: '🏛️' },
    { id: 'venues', name: 'Trading Venues', count: 5, color: '#374151', icon: '🏢' }
  ];

  const handleLayerClick = (layerId) => {
    setSelectedLayer(selectedLayer === layerId ? null : layerId);
  };

  const isEntityHighlighted = (entity) => {
    if (!selectedLayer) return true;
    return entities[selectedLayer]?.some(e => e.id === entity.id);
  };

  const getFlowStyle = (type, weight = 2) => {
    const baseStyles = {
      execution: { color: '#dc2626', opacity: 0.95 },
      prime: { color: '#1f2937', opacity: 0.95 },
      routing: { color: '#0891b2', opacity: 0.9 },
      advisory: { color: '#059669', opacity: 0.9 },
      outsourcing: { color: '#1e40af', opacity: 0.9 },
      oms: { color: '#7c3aed', opacity: 0.9 },
      technology: { color: '#be185d', opacity: 0.9 },
      venue: { color: '#374151', opacity: 0.8 },
      data: { color: '#059669', opacity: 0.7, dashArray: '8,4' },
      visibility: { color: '#10b981', opacity: 0.8, dashArray: '8,4' },
      neural: { color: '#9ca3af', opacity: 0.3, dashArray: '4,8' },
      internal: { color: '#6b7280', opacity: 0.8 }
    };
    
    const style = baseStyles[type] || baseStyles.execution;
    return { ...style, width: Math.max(2, weight) };
  };

  const renderFlows = () => {
    const activeFlows = activeFlowType === 'all' 
      ? [...flows.execution, ...flows.data, ...flows.neural]
      : activeFlowType === 'execution' 
        ? flows.execution
        : activeFlowType === 'data'
          ? flows.data
          : flows.neural;

    return activeFlows.map((flow, index) => {
      const fromEntity = allEntities.find(e => e.id === flow.from);
      const toEntity = allEntities.find(e => e.id === flow.to);
      
      if (!fromEntity || !toEntity) return null;

      const style = getFlowStyle(flow.type, flow.weight);
      const isHighlighted = hoveredNode && (flow.from === hoveredNode || flow.to === hoveredNode);
      const isFlowVisible = activeFlowType === 'all' || 
                           (activeFlowType === 'execution' && flows.execution.includes(flow)) ||
                           (activeFlowType === 'data' && flows.data.includes(flow)) ||
                           (activeFlowType === 'neural' && flows.neural.includes(flow));

      return (
        <g key={`flow-${index}`} opacity={isFlowVisible ? 1 : 0.3}>
          <line
            x1={scaleX(fromEntity.x)}
            y1={scaleY(fromEntity.y)}
            x2={scaleX(toEntity.x)}
            y2={scaleY(toEntity.y)}
            stroke={style.color}
            strokeWidth={isHighlighted ? style.width + 2 : style.width}
            strokeOpacity={isHighlighted ? 1 : style.opacity}
            strokeDasharray={style.dashArray || 'none'}
            markerEnd="url(#arrowhead)"
          />
          {isHighlighted && (
            <text
              x={(scaleX(fromEntity.x) + scaleX(toEntity.x)) / 2}
              y={(scaleY(fromEntity.y) + scaleY(toEntity.y)) / 2 - 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={style.color}
              style={{ pointerEvents: 'none' }}
            >
              {flow.label}
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '0',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Professional Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: 'white',
        padding: '24px 32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Professional Logo */}
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                boxShadow: '0 8px 32px rgba(59,130,246,0.3)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h1 style={{
                  margin: '0',
                  fontSize: '28px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  CalcGuard Trade Lifecycle Architecture
                </h1>
                <div style={{
                  fontSize: '14px',
                  opacity: '0.8',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '4px'
                }}>
                  Enterprise Trading Infrastructure with Accurate Flow Paths
                </div>
              </div>
            </div>

            {/* Professional Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleZoomOut}
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                🔍−
              </button>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                minWidth: '80px', 
                textAlign: 'center',
                color: 'white',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                🔍+
              </button>
              <button
                onClick={handleResetZoom}
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Reset View
              </button>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {sidebarCollapsed ? '◀ Expand' : 'Collapse ▶'}
              </button>
            </div>
          </div>
          
          {/* Interactive Controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'Complete Architecture', color: '#ffffff', icon: '◉' },
                { key: 'execution', label: 'Execution Flows', color: '#ef4444', icon: '→' },
                { key: 'data', label: 'Data Visibility', color: '#22c55e', icon: '◈' },
                { key: 'neural', label: 'CalcGuard Mesh', color: '#94a3b8', icon: '◊' }
              ].map(({ key, label, color, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveFlowType(key)}
                  style={{
                    padding: '12px 18px',
                    backgroundColor: activeFlowType === key ? color : 'rgba(255,255,255,0.1)',
                    color: activeFlowType === key ? '#0f172a' : 'white',
                    border: `2px solid ${activeFlowType === key ? color : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: activeFlowType === key ? `0 4px 16px ${color}40` : 'none'
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                padding: '12px 18px',
                backgroundColor: showDetails ? '#ffffff' : 'rgba(255,255,255,0.1)',
                color: showDetails ? '#0f172a' : 'white',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{showDetails ? '◉' : '○'}</span>
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div style={{ 
        padding: '0',
        width: '100%',
        height: 'calc(100vh - 160px)',
        display: 'flex',
        overflow: 'hidden'
      }}>
        
        {/* Interactive Layer Sidebar */}
        {!sidebarCollapsed && (
          <div style={{
            width: '300px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '0 24px 24px 0',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            borderRight: '1px solid rgba(226,232,240,0.8)',
            height: '100%',
            overflowY: 'auto'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '10px', height: '10px', background: 'white', borderRadius: '2px' }}></div>
              </div>
              Trade Lifecycle Layers
            </h3>
            
            {layerConfig.map((layer) => (
              <div 
                key={layer.id} 
                onClick={() => handleLayerClick(layer.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  background: selectedLayer === layer.id 
                    ? `linear-gradient(135deg, ${layer.color}15, ${layer.color}10)`
                    : `linear-gradient(135deg, ${layer.color}08, ${layer.color}05)`,
                  border: `2px solid ${selectedLayer === layer.id ? layer.color : layer.color + '20'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedLayer === layer.id ? 'translateY(-2px)' : 'none',
                  boxShadow: selectedLayer === layer.id ? `0 8px 32px ${layer.color}25` : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{layer.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '2px'
                    }}>
                      {layer.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      {layer.count} entities
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    background: selectedLayer === layer.id ? layer.color : layer.color + '20',
                    color: selectedLayer === layer.id ? 'white' : layer.color,
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {selectedLayer === layer.id ? 'Active' : 'Click'}
                  </div>
                </div>
                {selectedLayer === layer.id && (
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                    Highlighting {layer.count} entities in this layer. Other components are dimmed.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Professional Main Diagram */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: sidebarCollapsed ? '24px' : '0 0 0 24px',
          margin: '24px',
          marginLeft: sidebarCollapsed ? '24px' : '0',
          boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
          border: '1px solid rgba(226,232,240,0.8)',
          position: 'relative',
          overflow: 'hidden',
          cursor: isPanning ? 'grabbing' : 'grab'
        }}>
          <svg
            width="100%"
            height="100%"
            style={{ width: '100%', height: '100%', display: 'block' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <marker id="arrowhead" markerWidth="14" markerHeight="12" 
                      refX="13" refY="6" orient="auto">
                <polygon points="0 0, 14 6, 0 12" fill="#64748b" />
              </marker>
              
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0f172a" floodOpacity="0.15"/>
              </filter>

              <radialGradient id="meshGradient" cx="50%" cy="50%" r="60%">
                <stop offset="0%" style={{stopColor: '#0f172a', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#1e293b', stopOpacity: 0.95}} />
                <stop offset="100%" style={{stopColor: '#334155', stopOpacity: 0.8}} />
              </radialGradient>

              <linearGradient id="entityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#f1f5f9', stopOpacity: 1}} />
              </linearGradient>
            </defs>

            <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
              {/* Render flows */}
              {renderFlows()}

              {/* CalcGuard Neural Hub - Enhanced */}
              <g transform={`translate(${scaleX(calcguardNode.x)},${scaleY(calcguardNode.y)})`}>
                {/* Outer pulse ring */}
                <circle
                  r="120"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeOpacity="0.2"
                  strokeDasharray="24,12"
                >
                  <animate attributeName="r" values="110;130;110" dur="12s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="12s" repeatCount="indefinite" />
                </circle>
                
                {/* Middle ring */}
                <circle
                  r="90"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                  strokeDasharray="18,24"
                >
                  <animate attributeName="r" values="85;95;85" dur="10s" repeatCount="indefinite" />
                </circle>
                
                {/* Core hub */}
                <circle
                  r="60"
                  fill="url(#meshGradient)"
                  stroke="white"
                  strokeWidth="6"
                  filter="url(#shadow)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNode(calcguardNode)}
                  onMouseEnter={() => setHoveredNode('calcguard')}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                
                {/* Professional center icon */}
                <g transform="scale(2)">
                  <svg x="-12" y="-12" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
                  </svg>
                </g>
                
                <text textAnchor="middle" dy="90" fontSize="18" fontWeight="700" fill="#0f172a">
                  CalcGuard Neural Data Mesh
                </text>
                <text textAnchor="middle" dy="110" fontSize="14" fontWeight="500" fill="#64748b">
                  Real-time Transaction Intelligence
                </text>
              </g>

              {/* Render entities with professional styling */}
              {Object.values(entities).flat().map((entity, index) => {
                const isHovered = hoveredNode === entity.id;
                const isSelected = selectedNode?.id === entity.id;
                const isHighlighted = isEntityHighlighted(entity);
                const opacity = isHighlighted ? 1 : 0.3;
                
                return (
                  <g 
                    key={entity.id}
                    transform={`translate(${scaleX(entity.x)},${scaleY(entity.y)})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedNode(entity)}
                    onMouseEnter={() => setHoveredNode(entity.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    opacity={opacity}
                  >
                    {/* Entity background */}
                    <circle
                      r={isHovered || isSelected ? "50" : "45"}
                      fill={entity.notConnected ? '#fef2f2' : 'url(#entityGradient)'}
                      stroke={entity.color}
                      strokeWidth={entity.notConnected ? 4 : isHovered || isSelected ? 4 : 3}
                      strokeDasharray={entity.notConnected ? '12,6' : 'none'}
                      filter={isHovered || isSelected ? "url(#shadow)" : "none"}
                      style={{ 
                        transition: 'all 0.3s ease',
                        opacity: entity.notConnected ? 0.9 : 1
                      }}
                      data-entity={entity.id}
                    />
                    
                    {/* Entity icon background */}
                    <circle
                      r="28"
                      fill={entity.color}
                      opacity={isHovered || isSelected ? "1" : "0.95"}
                      filter="url(#shadow)"
                    />
                    
                    {/* Professional icons based on category */}
                    <g transform="scale(1.5)">
                      {entity.category === 'Asset Management' && (
                        <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                        </svg>
                      )}
                      {entity.category === 'Order Management' && (
                        <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      )}
                      {entity.category === 'Execution Management' && (
                        <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                      {entity.category === 'Trading Technology' && (
                        <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                        </svg>
                      )}
                      {entity.category === 'Broker Network' && (
                        <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )}
                      {entity.category === 'Trading Venues' && (
                        <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M22 9 12 2 2 9h3v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9h3zM12 17.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
                          <circle cx="12" cy="13" r="1.5" fill="white"/>
                        </svg>
                      )}
                    </g>
                    
                    {/* Entity name */}
                    <text
                      textAnchor="middle"
                      dy="70"
                      fontSize="16"
                      fontWeight="700"
                      fill="#0f172a"
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {entity.name}
                    </text>
                    
                    {/* Entity tier */}
                    <text
                      textAnchor="middle"
                      dy="90"
                      fontSize="12"
                      fill="#64748b"
                      fontWeight="500"
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {entity.tier}
                    </text>
                    
                    {/* Connection indicator */}
                    {entity.notConnected && (
                      <g>
                        <circle
                          r="12"
                          cx="35"
                          cy="-35"
                          fill="#dc2626"
                          stroke="white"
                          strokeWidth="3"
                          filter="url(#shadow)"
                        />
                        <text
                          x="35"
                          y="-30"
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="700"
                          fill="white"
                        >
                          !
                        </text>
                      </g>
                    )}
                    
                    {/* Professional hover details */}
                    {isHovered && showDetails && (
                      <g>
                        <rect
                          x="-120"
                          y="-150"
                          width="240"
                          height="100"
                          fill="#0f172a"
                          rx="16"
                          opacity="0.96"
                          filter="url(#shadow)"
                        />
                        <rect
                          x="-118"
                          y="-148"
                          width="236"
                          height="96"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="2"
                          rx="15"
                        />
                        <text
                          textAnchor="middle"
                          dy="-120"
                          fontSize="14"
                          fontWeight="700"
                          fill="white"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {entity.fullName}
                        </text>
                        <text
                          textAnchor="middle"
                          dy="-100"
                          fontSize="11"
                          fill="#cbd5e1"
                          fontWeight="500"
                          style={{ 
                            fontFamily: '"Inter", sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {entity.type}
                        </text>
                        {entity.aum && (
                          <text
                            textAnchor="middle"
                            dy="-80"
                            fontSize="13"
                            fontWeight="600"
                            fill="#22c55e"
                            style={{ fontFamily: '"Inter", sans-serif' }}
                          >
                            AUM: {entity.aum}
                          </text>
                        )}
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Professional Legend */}
        {!sidebarCollapsed && (
          <div style={{
            width: '320px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '24px 0 0 24px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            borderLeft: '1px solid rgba(226,232,240,0.8)',
            height: '100%',
            overflowY: 'auto'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '10px', height: '10px', background: 'white', borderRadius: '2px' }}></div>
              </div>
              Flow Classification
            </h3>
            
            {[
              { color: '#dc2626', label: 'Trade Execution', description: 'Core order routing and execution flows', icon: '→', active: activeFlowType === 'execution' || activeFlowType === 'all' },
              { color: '#1f2937', label: 'Institutional Services', description: 'Prime brokerage and multi-broker access', icon: '⚡', active: activeFlowType === 'execution' || activeFlowType === 'all' },
              { color: '#be185d', label: 'Technology Platforms', description: 'Algo platforms and tech vendor access', icon: '🔧', active: activeFlowType === 'execution' || activeFlowType === 'all' },
              { color: '#1e40af', label: 'System Integration', description: 'EMS platforms and system connectivity', icon: '⚙️', active: activeFlowType === 'execution' || activeFlowType === 'all' },
              { color: '#059669', label: 'Data & Reporting', description: 'Transaction visibility and compliance', icon: '◈', active: activeFlowType === 'data' || activeFlowType === 'all' },
              { color: '#9ca3af', label: 'CalcGuard Mesh', description: 'Neural network data connectivity', icon: '◊', active: activeFlowType === 'neural' || activeFlowType === 'all' }
            ].map(({ color, label, description, icon, active }) => (
              <div key={label} style={{
                marginBottom: '16px',
                padding: '16px',
                borderRadius: '12px',
                border: `2px solid ${active ? color : color + '20'}`,
                background: `linear-gradient(135deg, ${color}${active ? '15' : '08'}, ${color}${active ? '10' : '05'})`,
                transition: 'all 0.3s ease',
                opacity: active ? 1 : 0.6
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px'
                  }}>
                    {icon}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0f172a',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {label}
                  </span>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  lineHeight: '1.5',
                  marginLeft: '40px',
                  fontFamily: '"Inter", sans-serif'
                }}>
                  {description}
                </div>
              </div>
            ))}
            
            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                fontWeight: '700',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>💡</span>
                Architecture Insights
              </h4>
              <div style={{
                fontSize: '12px',
                color: '#475569',
                lineHeight: '1.6',
                fontFamily: '"Inter", sans-serif'
              }}>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#dc2626', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#dc2626' }}>SSGA OMS:</strong> Proprietary system with limited integration
                </div>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#0f172a', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#0f172a' }}>CalcGuard:</strong> Universal data mesh providing full visibility
                </div>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#059669', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#059669' }}>Coverage:</strong> 21 entities across 6 architectural layers
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#1e40af', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#1e40af' }}>Integration:</strong> Neural pathway architecture enables real-time monitoring
                </div>
              </div>
            </div>
            
            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                fontWeight: '700',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>📊</span>
                CalcGuard Connectivity
              </h4>
              <div style={{
                fontSize: '12px',
                color: '#475569',
                lineHeight: '1.6',
                fontFamily: '"Inter", sans-serif'
              }}>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#7c3aed', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#7c3aed' }}>FSB:</strong> PGP FTP daily file
                </div>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#ea580c', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#ea580c' }}>FlexTrade:</strong> FIX drop copy
                </div>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#1e40af', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#1e40af' }}>Newport:</strong> Daily FTP extract
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#dc2626', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#dc2626' }}>Pragma Platform:</strong> Daily FTP file via Castle Oak
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Professional Details Panel */}
      {selectedNode && (
        <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '480px',
          height: '100vh',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '-20px 0 80px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflowY: 'auto',
          borderLeft: '1px solid rgba(226,232,240,0.8)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            color: 'white',
            padding: '32px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedNode(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                fontSize: '22px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              ×
            </button>
            
            <div style={{
              width: '72px',
              height: '72px',
              background: `linear-gradient(135deg, ${selectedNode.color || '#0f172a'}, ${selectedNode.color || '#0f172a'}dd)`,
              borderRadius: '18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '700',
              color: 'white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}>
              {selectedNode.name === 'CalcGuard' ? '🛡️' : selectedNode.name?.charAt(0)}
            </div>
            
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              fontWeight: '700',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              {selectedNode.fullName}
            </h2>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ fontSize: '10px' }}>●</span>
              {selectedNode.category || selectedNode.type}
            </div>
            
            {selectedNode.tier && (
              <div style={{
                fontSize: '16px',
                opacity: '0.9',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif'
              }}>
                {selectedNode.tier}
                {selectedNode.aum && ` • ${selectedNode.aum} AUM`}
              </div>
            )}
          </div>
          
          <div style={{ padding: '32px' }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#475569',
              marginBottom: '32px',
              fontFamily: '"Inter", sans-serif'
            }}>
              {selectedNode.description}
            </div>
            
            {selectedNode.notConnected && (
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                color: '#b91c1c',
                padding: '20px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '32px',
                border: '2px solid #fecaca',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <span>Limited integration with CalcGuard data mesh platform</span>
              </div>
            )}
            
            {selectedNode.keyMetrics && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  margin: '0 0 20px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0f172a',
                  fontFamily: '"Inter", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>📊</span>
                  Key Performance Metrics
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  {Object.entries(selectedNode.keyMetrics).map(([key, value]) => (
                    <div key={key} style={{
                      padding: '18px',
                      background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#64748b',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '8px',
                        fontFamily: '"Inter", sans-serif'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#0f172a',
                        fontFamily: '"Inter", sans-serif'
                      }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 style={{
                margin: '0 0 16px 0',
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                fontFamily: '"Inter", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '18px' }}>🔗</span>
                Integration Status
              </h4>
              <div style={{
                padding: '20px 24px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                background: selectedNode.notConnected 
                  ? 'linear-gradient(135deg, #fef2f2, #fee2e2)' 
                  : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                color: selectedNode.notConnected ? '#b91c1c' : '#166534',
                border: `2px solid ${selectedNode.notConnected ? '#fecaca' : '#bbf7d0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: '"Inter", sans-serif'
              }}>
                <span style={{ fontSize: '20px' }}>
                  {selectedNode.notConnected ? '🔴' : '🟢'}
                </span>
                <span>
                  {selectedNode.notConnected 
                    ? 'Partial connectivity to neural mesh' 
                    : 'Fully connected to CalcGuard neural hub'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnterpriseArchitectureVisualization;