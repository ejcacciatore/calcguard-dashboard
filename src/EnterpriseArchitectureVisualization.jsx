import { useState, useEffect } from 'react';

function EnterpriseArchitectureVisualization() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeFlowType, setActiveFlowType] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 1200, height: 800 });

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: Math.max(1000, window.innerWidth - 100),
        height: Math.max(600, window.innerHeight - 400)
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scale coordinates based on viewport
  const scaleX = (x) => (x / 800) * Math.min(viewportSize.width - 200, 1000);
  const scaleY = (y) => (y / 700) * Math.min(viewportSize.height - 100, 600);

  // Professional fintech icon components
  const renderIcon = (entity, isHovered, isSelected) => {
    const iconSize = isHovered || isSelected ? 20 : 16;
    const iconColor = '#ffffff';
    
    // Icon definitions based on entity type/category
    const getIconPath = (category, type) => {
      switch(category) {
        case 'Asset Management':
          return (
            <g>
              {/* Portfolio/Asset Management Icon */}
              <rect x="-8" y="-6" width="16" height="12" rx="2" fill={iconColor} opacity="0.9"/>
              <rect x="-6" y="-4" width="3" height="8" rx="1" fill={entity.color} opacity="0.3"/>
              <rect x="-1" y="-2" width="3" height="6" rx="1" fill={entity.color} opacity="0.5"/>
              <rect x="4" y="-3" width="3" height="7" rx="1" fill={entity.color} opacity="0.7"/>
              <circle cx="0" cy="8" r="1.5" fill={iconColor} opacity="0.8"/>
            </g>
          );
        
        case 'Order Management':
        case 'Outsourced Trading':
          return (
            <g>
              {/* Order Management System Icon */}
              <rect x="-9" y="-7" width="18" height="14" rx="3" fill={iconColor} opacity="0.9"/>
              <rect x="-7" y="-5" width="14" height="2" rx="1" fill={entity.color} opacity="0.6"/>
              <rect x="-7" y="-1" width="10" height="2" rx="1" fill={entity.color} opacity="0.4"/>
              <rect x="-7" y="3" width="12" height="2" rx="1" fill={entity.color} opacity="0.5"/>
              <circle cx="6" cy="4" r="2" fill={entity.color} opacity="0.7"/>
            </g>
          );
        
        case 'Execution Management':
        case 'Technology Provider':
        case 'Algorithm Provider':
          return (
            <g>
              {/* Execution/Technology Icon */}
              <polygon points="-8,-6 8,-6 10,-3 10,3 8,6 -8,6 -10,3 -10,-3" fill={iconColor} opacity="0.9"/>
              <rect x="-6" y="-4" width="12" height="8" rx="2" fill={entity.color} opacity="0.1"/>
              <circle cx="-3" cy="-1" r="2" fill={entity.color} opacity="0.6"/>
              <circle cx="3" cy="-1" r="2" fill={entity.color} opacity="0.6"/>
              <rect x="-1" y="2" width="2" height="3" rx="1" fill={entity.color} opacity="0.8"/>
            </g>
          );
        
        case 'Broker Dealer':
        case 'Prime Broker':
        case 'Electronic Broker':
          return (
            <g>
              {/* Broker/Trading Icon */}
              <circle cx="0" cy="0" r="9" fill={iconColor} opacity="0.9"/>
              <path d="M-6,-3 L-2,-3 L0,-6 L2,-3 L6,-3 L6,0 L2,0 L0,3 L-2,0 L-6,0 Z" fill={entity.color} opacity="0.7"/>
              <circle cx="0" cy="0" r="2" fill={entity.color} opacity="0.9"/>
              <circle cx="0" cy="6" r="1" fill={iconColor} opacity="0.8"/>
            </g>
          );
        
        case 'Execution Venues':
          return (
            <g>
              {/* Venues/Exchange Icon */}
              <rect x="-8" y="-8" width="16" height="16" rx="4" fill={iconColor} opacity="0.9"/>
              <rect x="-6" y="-6" width="12" height="12" rx="2" fill={entity.color} opacity="0.1"/>
              <circle cx="-3" cy="-3" r="1.5" fill={entity.color} opacity="0.7"/>
              <circle cx="3" cy="-3" r="1.5" fill={entity.color} opacity="0.7"/>
              <circle cx="-3" cy="3" r="1.5" fill={entity.color} opacity="0.7"/>
              <circle cx="3" cy="3" r="1.5" fill={entity.color} opacity="0.7"/>
              <rect x="-1" y="-1" width="2" height="2" rx="1" fill={entity.color} opacity="0.9"/>
            </g>
          );
        
        default:
          return (
            <g>
              <circle cx="0" cy="0" r="8" fill={iconColor} opacity="0.9"/>
              <circle cx="0" cy="0" r="5" fill={entity.color} opacity="0.6"/>
            </g>
          );
      }
    };

    return (
      <g transform={`scale(${iconSize/16})`}>
        {getIconPath(entity.category, entity.type)}
      </g>
    );
  };

  // Professional entity definitions with enhanced metadata
  const entities = {
    assetManagers: [
      {
        id: 'ssga',
        name: 'SSGA',
        fullName: 'State Street Global Advisors',
        category: 'Asset Management',
        tier: 'Tier 1',
        aum: '$4.1T',
        type: 'Institutional Asset Manager',
        layer: 1,
        color: '#0f172a',
        x: 100,
        y: 80,
        connections: ['ssga-oms'],
        description: 'Global institutional asset manager with proprietary technology stack and comprehensive investment solutions.',
        keyMetrics: { aum: '$4.1T', clients: '1,200+', strategies: '300+' }
      },
      {
        id: 'imrf',
        name: 'IMRF',
        fullName: 'Illinois Municipal Retirement Fund',
        category: 'Asset Management',
        tier: 'Public Fund',
        aum: '$65B',
        type: 'Municipal Pension Fund',
        layer: 1,
        color: '#b91c1c',
        x: 350,
        y: 80,
        connections: ['northern-trust'],
        description: 'Large municipal retirement system serving Illinois public employees with diversified investment mandate.',
        keyMetrics: { aum: '$65B', members: '180K', plans: '650+' }
      },
      {
        id: 'brandes',
        name: 'Brandes',
        fullName: 'Brandes Investment Partners',
        category: 'Asset Management',
        tier: 'Boutique',
        aum: '$8.2B',
        type: 'Value Investment Manager',
        layer: 1,
        color: '#059669',
        x: 600,
        y: 80,
        connections: ['charles-river'],
        description: 'Specialized value investment manager serving as subadvisor with disciplined investment approach.',
        keyMetrics: { aum: '$8.2B', experience: '45+ years', focus: 'Value Equity' }
      }
    ],

    infrastructure: [
      {
        id: 'ssga-oms',
        name: 'SSGA OMS',
        fullName: 'SSGA Proprietary Order Management',
        category: 'Order Management',
        tier: 'Proprietary',
        type: 'Internal OMS Platform',
        layer: 2,
        color: '#dc2626',
        x: 100,
        y: 200,
        connections: ['newport-ssga'],
        notConnected: true,
        description: 'Proprietary order management system with integrated portfolio management and risk controls.',
        keyMetrics: { orders: '2M+ daily', latency: '<100ms', uptime: '99.95%' }
      },
      {
        id: 'charles-river',
        name: 'Charles River',
        fullName: 'Charles River Development',
        category: 'Order Management',
        tier: 'Enterprise',
        type: 'Investment Management Platform',
        layer: 2,
        color: '#7c3aed',
        x: 600,
        y: 200,
        connections: ['castle-oak', 'goldman', 'instinet'],
        description: 'Leading investment management technology platform with comprehensive order and portfolio management.',
        keyMetrics: { firms: '500+', aum: '$45T+', coverage: 'Global' }
      },
      {
        id: 'northern-trust',
        name: 'Northern Trust ITS',
        fullName: 'Northern Trust Investment Technology Services',
        category: 'Outsourced Trading',
        tier: 'Global Custodian',
        type: 'Technology Services Provider',
        layer: 2,
        color: '#0891b2',
        x: 350,
        y: 200,
        connections: ['flextrade'],
        description: 'Comprehensive investment technology and outsourced trading services for institutional clients.',
        keyMetrics: { custody: '$13.4T', clients: '20K+', countries: '100+' }
      }
    ],

    execution: [
      {
        id: 'newport-ssga',
        name: 'Newport EMS',
        fullName: 'Newport Execution Management (SSGA Config)',
        category: 'Execution Management',
        tier: 'Institutional EMS',
        type: 'Algorithmic Execution Platform',
        layer: 3,
        color: '#1e40af',
        x: 100,
        y: 320,
        connections: ['fidelity-sb', 'instinet'],
        description: 'Sophisticated execution management with custom algorithm wheels: POV, Lit Storm, Auto Route, Waterfall.',
        keyMetrics: { algorithms: '50+', venues: '200+', latency: '<1ms' }
      },
      {
        id: 'flextrade',
        name: 'FlexTrade',
        fullName: 'FlexTrade Execution Management System',
        category: 'Execution Management',
        tier: 'Multi-Asset EMS',
        type: 'Cross-Asset Execution Platform',
        layer: 3,
        color: '#ea580c',
        x: 350,
        y: 320,
        connections: ['loop', 'goldman'],
        description: 'Multi-asset execution management system supporting equities, fixed income, FX, and derivatives.',
        keyMetrics: { assets: 'Multi-Asset', coverage: 'Global', clients: '500+' }
      },
      {
        id: 'newport-loop',
        name: 'Newport EMS',
        fullName: 'Newport Execution Management (Loop Config)',
        category: 'Execution Management',
        tier: 'Broker EMS',
        type: 'Specialized Execution Platform',
        layer: 3,
        color: '#be185d',
        x: 220,
        y: 420,
        connections: ['goldman'],
        description: 'Loop Capital configured Newport EMS instance for specialized execution strategies.',
        keyMetrics: { focus: 'Specialized', routing: 'Smart', integration: 'Seamless' }
      }
    ],

    technology: [
      {
        id: 'fidelity-sb',
        name: 'Fidelity SB',
        fullName: 'Fidelity Service Bureau',
        category: 'Technology Provider',
        tier: 'Fintech Platform',
        type: 'Execution Technology Stack',
        layer: 3.5,
        color: '#7c3aed',
        x: 100,
        y: 420,
        connections: ['fsb-venues'],
        description: 'Advanced execution technology with SDP, Private Rooms, POV algorithms, and customizable dark/lit routing.',
        keyMetrics: { algorithms: 'Custom', rooms: 'Private', routing: 'Intelligent' }
      },
      {
        id: 'pragma',
        name: 'Pragma',
        fullName: 'Pragma Trading Intelligence',
        category: 'Algorithm Provider',
        tier: 'AI Technology',
        type: 'Machine Learning Platform',
        layer: 3.5,
        color: '#1e40af',
        x: 600,
        y: 420,
        connections: ['castle-oak'],
        description: 'AI-powered execution algorithms and trading intelligence platform with machine learning optimization.',
        keyMetrics: { ai: 'Advanced ML', optimization: 'Real-time', performance: 'Superior' }
      }
    ],

    brokers: [
      {
        id: 'loop',
        name: 'Loop Capital',
        fullName: 'Loop Capital Markets LLC',
        category: 'Broker Dealer',
        tier: 'Specialty Finance',
        type: 'Institutional Broker Dealer',
        layer: 4,
        color: '#be185d',
        x: 150,
        y: 520,
        connections: ['newport-loop'],
        description: 'Specialized institutional broker dealer focusing on diverse investment strategies and client solutions.',
        keyMetrics: { focus: 'Institutional', specialty: 'Diverse Strategies', scale: 'Mid-Size' }
      },
      {
        id: 'goldman',
        name: 'Goldman Sachs',
        fullName: 'Goldman Sachs Securities',
        category: 'Prime Broker',
        tier: 'Bulge Bracket',
        type: 'Global Investment Bank',
        layer: 4,
        color: '#1f2937',
        x: 300,
        y: 520,
        connections: ['goldman-venues'],
        description: 'Premier global investment bank providing comprehensive execution, prime brokerage, and capital markets services.',
        keyMetrics: { revenue: '$47B+', global: '40+ countries', services: 'Full Service' }
      },
      {
        id: 'castle-oak',
        name: 'Castle Oak',
        fullName: 'Castle Oak Securities LP',
        category: 'Broker Dealer',
        tier: 'Specialty Execution',
        type: 'Technology-Driven Broker',
        layer: 4,
        color: '#dc2626',
        x: 600,
        y: 520,
        connections: ['castle-venues'],
        description: 'Technology-focused broker dealer with proprietary Pragma-powered execution algorithms and specialized routing.',
        keyMetrics: { technology: 'Proprietary', focus: 'Execution', innovation: 'AI-Driven' }
      },
      {
        id: 'instinet',
        name: 'Instinet',
        fullName: 'Instinet Incorporated',
        category: 'Electronic Broker',
        tier: 'Agency Model',
        type: 'Electronic Trading Specialist',
        layer: 4,
        color: '#475569',
        x: 450,
        y: 520,
        connections: ['instinet-venues'],
        description: 'Leading electronic trading specialist providing agency execution services and market structure innovation.',
        keyMetrics: { model: 'Agency', innovation: 'Electronic', focus: 'Institutional' }
      }
    ],

    venues: [
      {
        id: 'fsb-venues',
        name: 'FSB Venues',
        fullName: 'Fidelity Service Bureau Trading Venues',
        category: 'Execution Venues',
        tier: 'Technology Venues',
        type: 'ATS | Exchanges | SDP | Private Rooms',
        layer: 5,
        color: '#7c3aed',
        x: 100,
        y: 620,
        description: 'Comprehensive venue access including alternative trading systems, exchanges, and private execution rooms.'
      },
      {
        id: 'goldman-venues',
        name: 'Goldman Venues',
        fullName: 'Goldman Sachs Execution Venues',
        category: 'Execution Venues',
        tier: 'Prime Venues',
        type: 'Global Venues | Dark Pools | Exchanges',
        layer: 5,
        color: '#1f2937',
        x: 300,
        y: 620,
        description: 'Extensive global venue network including proprietary dark pools and comprehensive exchange connectivity.'
      },
      {
        id: 'instinet-venues',
        name: 'Instinet Venues',
        fullName: 'Instinet Electronic Trading Venues',
        category: 'Execution Venues',
        tier: 'Electronic Venues',
        type: 'Crossing Networks | Dark Pools | ECNs',
        layer: 5,
        color: '#475569',
        x: 450,
        y: 620,
        description: 'Specialized electronic venues including crossing networks, dark pools, and electronic communication networks.'
      },
      {
        id: 'castle-venues',
        name: 'Castle Oak Venues',
        fullName: 'Castle Oak Execution Venues',
        category: 'Execution Venues',
        tier: 'Specialized Venues',
        type: 'Smart Routing | Alternative Venues',
        layer: 5,
        color: '#dc2626',
        x: 600,
        y: 620,
        description: 'Specialized execution venues with intelligent routing and access to alternative liquidity sources.'
      }
    ]
  };

  const calcguardNode = {
    id: 'calcguard',
    name: 'CalcGuard',
    fullName: 'CalcGuard Neural Data Mesh Platform',
    x: 350,
    y: 350,
    color: '#0f172a',
    size: 50,
    description: 'Enterprise-grade distributed data mesh providing real-time transaction lifecycle visibility and neural pathway intelligence across the complete trading ecosystem.'
  };

  // Enhanced flow definitions
  const flows = {
    execution: [
      { from: 'ssga', to: 'ssga-oms', type: 'internal', label: 'Internal Orders', weight: 3 },
      { from: 'ssga-oms', to: 'newport-ssga', type: 'execution', label: 'Order Flow', weight: 4 },
      { from: 'newport-ssga', to: 'fidelity-sb', type: 'routing', label: 'Algorithm Routing', weight: 3 },
      { from: 'newport-ssga', to: 'instinet', type: 'execution', label: 'Direct Execution', weight: 3 },
      { from: 'fidelity-sb', to: 'fsb-venues', type: 'venue', label: 'Venue Access', weight: 2 },
      
      { from: 'brandes', to: 'imrf', type: 'advisory', label: 'Subadvisor Relationship', weight: 2 },
      { from: 'brandes', to: 'charles-river', type: 'oms', label: 'Order Management', weight: 4 },
      { from: 'charles-river', to: 'castle-oak', type: 'execution', label: 'Direct Execution', weight: 3 },
      { from: 'charles-river', to: 'goldman', type: 'execution', label: 'Prime Execution', weight: 4 },
      { from: 'charles-river', to: 'instinet', type: 'execution', label: 'Electronic Execution', weight: 3 },
      
      { from: 'imrf', to: 'northern-trust', type: 'outsourcing', label: 'Outsourced Trading', weight: 5 },
      { from: 'northern-trust', to: 'flextrade', type: 'ems', label: 'EMS Integration', weight: 4 },
      { from: 'flextrade', to: 'loop', type: 'execution', label: 'Broker Execution', weight: 3 },
      { from: 'flextrade', to: 'goldman', type: 'execution', label: 'Prime Services', weight: 4 },
      
      { from: 'loop', to: 'newport-loop', type: 'ems', label: 'Internal EMS', weight: 2 },
      { from: 'newport-loop', to: 'goldman', type: 'prime', label: 'Prime Brokerage', weight: 5 },
      
      { from: 'pragma', to: 'castle-oak', type: 'technology', label: 'AI Technology Stack', weight: 3 },
      
      { from: 'goldman', to: 'goldman-venues', type: 'venue', label: 'Venue Network', weight: 4 },
      { from: 'castle-oak', to: 'castle-venues', type: 'venue', label: 'Smart Routing', weight: 3 },
      { from: 'instinet', to: 'instinet-venues', type: 'venue', label: 'Electronic Venues', weight: 3 },
    ],
    
    data: [
      { from: 'goldman-venues', to: 'goldman', type: 'data', label: 'Execution Data', weight: 1 },
      { from: 'goldman', to: 'newport-loop', type: 'data', label: 'Trade Confirmation', weight: 1 },
      { from: 'newport-loop', to: 'loop', type: 'data', label: 'Order Status', weight: 1 },
      { from: 'loop', to: 'flextrade', type: 'data', label: 'Fill Information', weight: 1 },
      { from: 'flextrade', to: 'northern-trust', type: 'data', label: 'Settlement Data', weight: 1 },
      { from: 'northern-trust', to: 'imrf', type: 'visibility', label: 'Portfolio Visibility', weight: 2 },
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

  const getFlowStyle = (type, weight = 2) => {
    const baseStyles = {
      execution: { color: '#dc2626', opacity: 0.9 },
      prime: { color: '#1f2937', opacity: 0.95 },
      routing: { color: '#0891b2', opacity: 0.8 },
      advisory: { color: '#059669', opacity: 0.8 },
      outsourcing: { color: '#1e40af', opacity: 0.85 },
      oms: { color: '#7c3aed', opacity: 0.85 },
      ems: { color: '#ea580c', opacity: 0.8 },
      technology: { color: '#1e40af', opacity: 0.8 },
      venue: { color: '#374151', opacity: 0.7 },
      data: { color: '#059669', opacity: 0.6, dashArray: '6,3' },
      visibility: { color: '#10b981', opacity: 0.8, dashArray: '6,3' },
      neural: { color: '#9ca3af', opacity: 0.25, dashArray: '3,6' },
      internal: { color: '#6b7280', opacity: 0.7 }
    };
    
    const style = baseStyles[type] || baseStyles.execution;
    return { ...style, width: Math.max(1, weight) };
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

      return (
        <g key={`flow-${index}`}>
          <line
            x1={scaleX(fromEntity.x)}
            y1={scaleY(fromEntity.y)}
            x2={scaleX(toEntity.x)}
            y2={scaleY(toEntity.y)}
            stroke={style.color}
            strokeWidth={isHighlighted ? style.width + 1 : style.width}
            strokeOpacity={isHighlighted ? 1 : style.opacity}
            strokeDasharray={style.dashArray || 'none'}
            markerEnd="url(#arrowhead)"
          />
          {isHighlighted && (
            <text
              x={(scaleX(fromEntity.x) + scaleX(toEntity.x)) / 2}
              y={(scaleY(fromEntity.y) + scaleY(toEntity.y)) / 2 - 8}
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
      overflow: 'auto'
    }}>
      {/* Executive Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: 'white',
        padding: '30px 20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
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
              <div style={{
                width: '24px',
                height: '24px',
                background: 'white',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                  borderRadius: '2px'
                }}></div>
              </div>
            </div>
            <div>
              <h1 style={{
                margin: '0',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CalcGuard Neural Data Mesh
              </h1>
              <div style={{
                fontSize: 'clamp(12px, 2vw, 14px)',
                opacity: '0.7',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Enterprise Trading Architecture
              </div>
            </div>
          </div>
          
          <p style={{
            margin: '0 0 24px 0',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            opacity: '0.9',
            fontWeight: '400',
            maxWidth: '800px',
            lineHeight: '1.6'
          }}>
            Enterprise-grade distributed transaction intelligence platform providing comprehensive lifecycle visibility across institutional trading ecosystems
          </p>
          
          {/* Interactive Controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'Complete Architecture', color: '#ffffff', icon: '◉' },
                { key: 'execution', label: 'Execution Flows', color: '#ef4444', icon: '→' },
                { key: 'data', label: 'Data Visibility', color: '#22c55e', icon: '◈' },
                { key: 'neural', label: 'Neural Network', color: '#94a3b8', icon: '◊' }
              ].map(({ key, label, color, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveFlowType(key)}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: activeFlowType === key ? color : 'rgba(255,255,255,0.1)',
                    color: activeFlowType === key ? '#0f172a' : 'white',
                    border: `2px solid ${activeFlowType === key ? color : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '12px',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
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
                padding: '10px 16px',
                backgroundColor: showDetails ? '#ffffff' : 'rgba(255,255,255,0.1)',
                color: showDetails ? '#0f172a' : 'white',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                fontSize: 'clamp(12px, 1.5vw, 14px)',
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
        padding: '20px',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: selectedNode ? '200px 1fr 300px' : '200px 1fr 280px',
          gap: '20px', 
          alignItems: 'flex-start',
          minHeight: '600px'
        }}>
          
          {/* Layer Navigation */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(226,232,240,0.8)',
            height: 'fit-content'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '1px' }}></div>
              </div>
              Ecosystem Layers
            </h3>
            
            {[
              { name: 'Asset Management', count: 3, color: '#0f172a', icon: '📊' },
              { name: 'Order Management', count: 3, color: '#7c3aed', icon: '⚙️' },
              { name: 'Execution Systems', count: 4, color: '#ea580c', icon: '⚡' },
              { name: 'Broker Network', count: 4, color: '#1f2937', icon: '🏛️' },
              { name: 'Trading Venues', count: 4, color: '#374151', icon: '🏢' }
            ].map((layer, index) => (
              <div key={index} style={{
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '8px',
                background: `linear-gradient(135deg, ${layer.color}08, ${layer.color}05)`,
                border: `1px solid ${layer.color}20`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '16px' }}>{layer.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0f172a',
                    marginBottom: '2px'
                  }}>
                    {layer.name}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {layer.count} entities
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Diagram */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
            border: '1px solid rgba(226,232,240,0.8)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <svg
              width={viewportSize.width - 540}
              height={viewportSize.height}
              style={{ width: '100%', height: '100%', display: 'block' }}
              viewBox={`0 0 ${viewportSize.width - 540} ${viewportSize.height}`}
            >
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="8" 
                        refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill="#64748b" />
                </marker>
                
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.1"/>
                </filter>

                <radialGradient id="meshGradient" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" style={{stopColor: '#0f172a', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#1e293b', stopOpacity: 0.9}} />
                  <stop offset="100%" style={{stopColor: '#334155', stopOpacity: 0.7}} />
                </radialGradient>

                <linearGradient id="entityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#f1f5f9', stopOpacity: 1}} />
                </linearGradient>
              </defs>

              {/* Render flows */}
              {renderFlows()}

              {/* CalcGuard Neural Hub */}
              <g transform={`translate(${scaleX(calcguardNode.x)},${scaleY(calcguardNode.y)})`}>
                {/* Outer pulse ring */}
                <circle
                  r="70"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeOpacity="0.15"
                  strokeDasharray="16,8"
                >
                  <animate attributeName="r" values="65;80;65" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="8s" repeatCount="indefinite" />
                </circle>
                
                {/* Middle ring */}
                <circle
                  r="50"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  strokeDasharray="12,16"
                >
                  <animate attributeName="r" values="45;55;45" dur="6s" repeatCount="indefinite" />
                </circle>
                
                {/* Core hub */}
                <circle
                  r="35"
                  fill="url(#meshGradient)"
                  stroke="white"
                  strokeWidth="4"
                  filter="url(#shadow)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNode(calcguardNode)}
                  onMouseEnter={() => setHoveredNode('calcguard')}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                
                {/* Professional center icon */}
                <g transform="scale(1.2)">
                  <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" opacity="0.9"/>
                  <rect x="-10" y="-10" width="20" height="20" rx="4" fill="none" stroke="#0f172a" strokeWidth="2"/>
                  <circle cx="-5" cy="-5" r="2" fill="#3b82f6"/>
                  <circle cx="5" cy="-5" r="2" fill="#3b82f6"/>
                  <circle cx="-5" cy="5" r="2" fill="#3b82f6"/>
                  <circle cx="5" cy="5" r="2" fill="#3b82f6"/>
                  <rect x="-2" y="-2" width="4" height="4" rx="2" fill="#0f172a"/>
                </g>
                
                <text textAnchor="middle" dy="52" fontSize="14" fontWeight="700" fill="#0f172a">
                  CalcGuard Neural Mesh
                </text>
              </g>

              {/* Render entities */}
              {Object.values(entities).flat().map(entity => {
                const isHovered = hoveredNode === entity.id;
                const isSelected = selectedNode?.id === entity.id;
                
                return (
                  <g 
                    key={entity.id}
                    transform={`translate(${scaleX(entity.x)},${scaleY(entity.y)})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedNode(entity)}
                    onMouseEnter={() => setHoveredNode(entity.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Entity background with gradient */}
                    <circle
                      r={isHovered || isSelected ? "32" : "28"}
                      fill={entity.notConnected ? '#fef2f2' : 'url(#entityGradient)'}
                      stroke={entity.color}
                      strokeWidth={entity.notConnected ? 3 : isHovered || isSelected ? 3 : 2}
                      strokeDasharray={entity.notConnected ? '8,4' : 'none'}
                      filter={isHovered || isSelected ? "url(#shadow)" : "none"}
                      style={{ 
                        transition: 'all 0.3s ease',
                        opacity: entity.notConnected ? 0.9 : 1
                      }}
                    />
                    
                    {/* Entity professional icon */}
                    <g transform="scale(1)">
                      <circle
                        r="18"
                        fill={entity.color}
                        opacity={isHovered || isSelected ? "1" : "0.95"}
                        filter="url(#shadow)"
                      />
                      {renderIcon(entity, isHovered, isSelected)}
                    </g>
                    
                    {/* Entity name with better typography */}
                    <text
                      textAnchor="middle"
                      dy="48"
                      fontSize="12"
                      fontWeight="700"
                      fill="#0f172a"
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {entity.name}
                    </text>
                    
                    {/* Entity type with professional styling */}
                    <text
                      textAnchor="middle"
                      dy="62"
                      fontSize="10"
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
                    
                    {/* Connection indicator with professional styling */}
                    {entity.notConnected && (
                      <g>
                        <circle
                          r="8"
                          cx="22"
                          cy="-22"
                          fill="#dc2626"
                          stroke="white"
                          strokeWidth="2"
                          filter="url(#shadow)"
                        />
                        <text
                          x="22"
                          y="-18"
                          textAnchor="middle"
                          fontSize="10"
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
                          x="-85"
                          y="-105"
                          width="170"
                          height="70"
                          fill="#0f172a"
                          rx="12"
                          opacity="0.96"
                          filter="url(#shadow)"
                        />
                        <rect
                          x="-83"
                          y="-103"
                          width="166"
                          height="66"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1"
                          rx="11"
                        />
                        <text
                          textAnchor="middle"
                          dy="-82"
                          fontSize="11"
                          fontWeight="700"
                          fill="white"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {entity.fullName}
                        </text>
                        <text
                          textAnchor="middle"
                          dy="-68"
                          fontSize="9"
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
                            dy="-52"
                            fontSize="10"
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
            </svg>
          </div>

          {/* Professional Legend */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(226,232,240,0.8)',
            height: 'fit-content'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '1px' }}></div>
              </div>
              Flow Classification
            </h3>
            
            {[
              { color: '#dc2626', label: 'Primary Execution', description: 'Core order routing and execution flows', icon: '→' },
              { color: '#1f2937', label: 'Prime Services', description: 'Prime brokerage and institutional services', icon: '⚡' },
              { color: '#1e40af', label: 'Technology Integration', description: 'System connectivity and data exchange', icon: '⚙️' },
              { color: '#059669', label: 'Data Transparency', description: 'Transaction visibility and reporting', icon: '◈' },
              { color: '#9ca3af', label: 'Neural Network', description: 'CalcGuard mesh connectivity', icon: '◊' }
            ].map(({ color, label, description, icon }) => (
              <div key={label} style={{
                marginBottom: '14px',
                padding: '14px',
                borderRadius: '12px',
                border: `1px solid ${color}20`,
                background: `linear-gradient(135deg, ${color}08, ${color}05)`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {icon}
                  </div>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#0f172a',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {label}
                  </span>
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#64748b',
                  lineHeight: '1.5',
                  marginLeft: '36px',
                  fontFamily: '"Inter", sans-serif'
                }}>
                  {description}
                </div>
              </div>
            ))}
            
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                fontWeight: '700',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '14px' }}>💡</span>
                Key Insights
              </h4>
              <div style={{
                fontSize: '11px',
                color: '#475569',
                lineHeight: '1.6',
                fontFamily: '"Inter", sans-serif'
              }}>
                <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', background: '#dc2626', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#dc2626' }}>SSGA OMS:</strong> Isolated proprietary system
                </div>
                <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', background: '#0f172a', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#0f172a' }}>CalcGuard:</strong> Universal data mesh coverage
                </div>
                <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', background: '#059669', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#059669' }}>Transparency:</strong> End-to-end transaction visibility
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', background: '#1e40af', borderRadius: '50%' }}></div>
                  <strong style={{ color: '#1e40af' }}>Integration:</strong> Neural pathway architecture
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Details Panel */}
      {selectedNode && (
        <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '420px',
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
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '20px',
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
              width: '64px',
              height: '64px',
              background: `linear-gradient(135deg, ${selectedNode.color || '#0f172a'}, ${selectedNode.color || '#0f172a'}dd)`,
              borderRadius: '16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}>
              {selectedNode.name === 'CalcGuard' ? '⚡' : selectedNode.name?.charAt(0)}
            </div>
            
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '22px',
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
              padding: '6px 16px',
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
                fontSize: '14px',
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
              fontSize: '15px',
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
                padding: '16px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '32px',
                border: '2px solid #fecaca',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '18px' }}>⚠️</span>
                <span>Not integrated with CalcGuard data mesh platform</span>
              </div>
            )}
            
            {selectedNode.keyMetrics && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#0f172a',
                  fontFamily: '"Inter", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>📊</span>
                  Key Metrics
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  {Object.entries(selectedNode.keyMetrics).map(([key, value]) => (
                    <div key={key} style={{
                      padding: '16px',
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
                        marginBottom: '6px',
                        fontFamily: '"Inter", sans-serif'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div style={{
                        fontSize: '16px',
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
                margin: '0 0 12px 0',
                fontSize: '16px',
                fontWeight: '700',
                color: '#0f172a',
                fontFamily: '"Inter", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>🔗</span>
                Integration Status
              </h4>
              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                fontSize: '14px',
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
                <span style={{ fontSize: '18px' }}>
                  {selectedNode.notConnected ? '🔴' : '🟢'}
                </span>
                <span>
                  {selectedNode.notConnected 
                    ? 'Disconnected from neural mesh' 
                    : 'Connected to CalcGuard neural hub'
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