import { useState } from 'react';

function EnterpriseArchitectureVisualization() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeFlowType, setActiveFlowType] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

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
        color: '#1e40af',
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
        color: '#dc2626',
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
        color: '#b91c1c',
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
        color: '#6b7280',
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
        color: '#6b7280',
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
    color: '#1f2937',
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
            x1={fromEntity.x}
            y1={fromEntity.y}
            x2={toEntity.x}
            y2={toEntity.y}
            stroke={style.color}
            strokeWidth={isHighlighted ? style.width + 1 : style.width}
            strokeOpacity={isHighlighted ? 1 : style.opacity}
            strokeDasharray={style.dashArray || 'none'}
            markerEnd="url(#arrowhead)"
          />
          {isHighlighted && (
            <text
              x={(fromEntity.x + toEntity.x) / 2}
              y={(fromEntity.y + toEntity.y) / 2 - 8}
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
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '0'
    }}>
      {/* Executive Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        padding: '40px 50px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            margin: '0 0 16px 0',
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            CalcGuard Neural Data Mesh Architecture
          </h1>
          <p style={{
            margin: '0 0 24px 0',
            fontSize: '18px',
            opacity: '0.9',
            fontWeight: '400',
            maxWidth: '800px'
          }}>
            Enterprise-grade distributed transaction intelligence platform providing comprehensive lifecycle visibility across institutional trading ecosystems
          </p>
          
          {/* Interactive Controls */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { key: 'all', label: 'Complete Architecture', color: '#ffffff' },
                { key: 'execution', label: 'Execution Flows', color: '#ef4444' },
                { key: 'data', label: 'Data Visibility', color: '#22c55e' },
                { key: 'neural', label: 'Neural Network', color: '#94a3b8' }
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => setActiveFlowType(key)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: activeFlowType === key ? color : 'rgba(255,255,255,0.1)',
                    color: activeFlowType === key ? '#1e293b' : 'white',
                    border: `2px solid ${activeFlowType === key ? color : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                padding: '10px 20px',
                backgroundColor: showDetails ? '#ffffff' : 'rgba(255,255,255,0.1)',
                color: showDetails ? '#1e293b' : 'white',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div style={{ 
        padding: '50px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Layer Navigation */}
          <div style={{
            minWidth: '200px',
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(226,232,240,0.8)'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              Ecosystem Layers
            </h3>
            
            {[
              { name: 'Asset Management', count: 3, color: '#1e40af' },
              { name: 'Order Management', count: 3, color: '#7c3aed' },
              { name: 'Execution Systems', count: 4, color: '#ea580c' },
              { name: 'Broker Network', count: 4, color: '#1f2937' },
              { name: 'Trading Venues', count: 4, color: '#374151' }
            ].map((layer, index) => (
              <div key={index} style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '8px',
                background: `${layer.color}08`,
                border: `1px solid ${layer.color}20`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  {layer.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  {layer.count} entities
                </div>
              </div>
            ))}
          </div>

          {/* Main Diagram */}
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
            border: '1px solid rgba(226,232,240,0.8)',
            position: 'relative'
          }}>
            
            <svg
              width="900"
              height="750"
              style={{ width: '100%', height: '700px', display: 'block' }}
            >
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="8" 
                        refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill="#64748b" />
                </marker>
                
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <radialGradient id="meshGradient" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" style={{stopColor: '#1e293b', stopOpacity: 1}} />
                  <stop offset="70%" style={{stopColor: '#334155', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#475569', stopOpacity: 0.6}} />
                </radialGradient>
              </defs>

              {/* Render flows */}
              {renderFlows()}

              {/* CalcGuard Neural Hub */}
              <g transform={`translate(${calcguardNode.x},${calcguardNode.y})`}>
                {/* Outer pulse ring */}
                <circle
                  r="80"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                  strokeOpacity="0.15"
                  strokeDasharray="12,8"
                >
                  <animate attributeName="r" values="75;90;75" dur="6s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" />
                </circle>
                
                {/* Middle ring */}
                <circle
                  r="65"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  strokeDasharray="8,12"
                >
                  <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite" />
                </circle>
                
                {/* Core hub */}
                <circle
                  r="40"
                  fill="url(#meshGradient)"
                  stroke="white"
                  strokeWidth="4"
                  filter="url(#glow)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNode(calcguardNode)}
                  onMouseEnter={() => setHoveredNode('calcguard')}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                
                <text textAnchor="middle" dy="-8" fontSize="16" fontWeight="700" fill="white">
                  CG
                </text>
                <text textAnchor="middle" dy="4" fontSize="9" fontWeight="600" fill="white" opacity="0.9">
                  NEURAL
                </text>
                <text textAnchor="middle" dy="14" fontSize="9" fontWeight="600" fill="white" opacity="0.9">
                  MESH
                </text>
              </g>

              {/* Render entities */}
              {Object.values(entities).flat().map(entity => {
                const isHovered = hoveredNode === entity.id;
                const isSelected = selectedNode?.id === entity.id;
                
                return (
                  <g 
                    key={entity.id}
                    transform={`translate(${entity.x},${entity.y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedNode(entity)}
                    onMouseEnter={() => setHoveredNode(entity.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Entity background */}
                    <circle
                      r={isHovered || isSelected ? "35" : "30"}
                      fill={entity.notConnected ? '#fef2f2' : 'white'}
                      stroke={entity.color}
                      strokeWidth={entity.notConnected ? 4 : isHovered || isSelected ? 3 : 2}
                      strokeDasharray={entity.notConnected ? '6,3' : 'none'}
                      filter={isHovered || isSelected ? "url(#glow)" : "none"}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    
                    {/* Entity icon */}
                    <circle
                      r="16"
                      fill={entity.color}
                      opacity={isHovered || isSelected ? "1" : "0.9"}
                    />
                    
                    {/* Entity name - move further down */}
                    <text
                      textAnchor="middle"
                      dy="50"  // was 45
                      fontSize="12"
                      fontWeight="700"
                      fill="#1e293b"
                    >
                      {entity.name}
                    </text>
                    
                    {/* Entity type - move even further */}
                    <text
                      textAnchor="middle"
                      dy="65"  // was 58
                      fontSize="10"
                      fill="#64748b"
                      fontWeight="500"
                    >
                      {entity.tier}
                    </text>
                    
                    {/* Connection indicator */}
                    {entity.notConnected && (
                      <circle
                        r="8"
                        cx="22"
                        cy="-22"
                        fill="#dc2626"
                        stroke="white"
                        strokeWidth="2"
                      />
                    )}
                    
                    {/* Hover details */}
                    {isHovered && showDetails && (
                      <g>
                        <rect
                          x="-80"
                          y="-100"
                          width="160"
                          height="60"
                          fill="#1e293b"
                          rx="8"
                          opacity="0.95"
                        />
                        <text
                          textAnchor="middle"
                          dy="-82"
                          fontSize="11"
                          fontWeight="600"
                          fill="white"
                        >
                          {entity.fullName}
                        </text>
                        <text
                          textAnchor="middle"
                          dy="-68"
                          fontSize="9"
                          fill="#cbd5e1"
                        >
                          {entity.type}
                        </text>
                        {entity.aum && (
                          <text
                            textAnchor="middle"
                            dy="-54"
                            fontSize="9"
                            fontWeight="600"
                            fill="#22c55e"
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
            minWidth: '280px',
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(226,232,240,0.8)',
            height: 'fit-content'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              Flow Classification
            </h3>
            
            {[
              { color: '#dc2626', label: 'Primary Execution', description: 'Core order routing and execution flows' },
              { color: '#1f2937', label: 'Prime Services', description: 'Prime brokerage and institutional services' },
              { color: '#1e40af', label: 'Technology Integration', description: 'System connectivity and data exchange' },
              { color: '#059669', label: 'Data Transparency', description: 'Transaction visibility and reporting' },
              { color: '#9ca3af', label: 'Neural Network', description: 'CalcGuard mesh connectivity' }
            ].map(({ color, label, description }) => (
              <div key={label} style={{
                marginBottom: '16px',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${color}20`,
                background: `${color}05`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <div style={{
                    width: '20px',
                    height: '3px',
                    backgroundColor: color,
                    borderRadius: '2px'
                  }}></div>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                    {label}
                  </span>
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#64748b',
                  lineHeight: '1.4',
                  marginLeft: '32px'
                }}>
                  {description}
                </div>
              </div>
            ))}
            
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                margin: '0 0 8px 0',
                fontSize: '13px',
                fontWeight: '700',
                color: '#1e293b'
              }}>
                Key Insights
              </h4>
              <div style={{
                fontSize: '11px',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                <div style={{ marginBottom: '6px' }}>
                  • <strong style={{ color: '#dc2626' }}>SSGA OMS:</strong> Isolated proprietary system
                </div>
                <div style={{ marginBottom: '6px' }}>
                  • <strong style={{ color: '#1e293b' }}>CalcGuard:</strong> Universal data mesh coverage
                </div>
                <div style={{ marginBottom: '6px' }}>
                  • <strong style={{ color: '#059669' }}>Transparency:</strong> End-to-end transaction visibility
                </div>
                <div>
                  • <strong style={{ color: '#1e40af' }}>Integration:</strong> Neural pathway architecture
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
          width: '450px',
          height: '100vh',
          background: 'white',
          boxShadow: '-10px 0 60px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflowY: 'auto',
          borderLeft: '1px solid #e2e8f0'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
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
                backdropFilter: 'blur(10px)'
              }}
            >
              ×
            </button>
            
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: selectedNode.color || '#1e293b',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '700',
              color: 'white'
            }}>
              {selectedNode.name === 'CalcGuard' ? 'CG' : selectedNode.name?.charAt(0)}
            </div>
            
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              fontWeight: '700'
            }}>
              {selectedNode.fullName}
            </h2>
            
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              backgroundColor: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px'
            }}>
              {selectedNode.category || selectedNode.type}
            </div>
            
            {selectedNode.tier && (
              <div style={{
                fontSize: '14px',
                opacity: '0.9',
                fontWeight: '600'
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
              marginBottom: '32px'
            }}>
              {selectedNode.description}
            </div>
            
            {selectedNode.notConnected && (
              <div style={{
                background: '#fef2f2',
                color: '#b91c1c',
                padding: '16px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '32px',
                border: '2px solid #fecaca'
              }}>
                ⚠️ Not integrated with CalcGuard data mesh platform
              </div>
            )}
            
            {selectedNode.keyMetrics && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1e293b'
                }}>
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
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '4px'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e293b'
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
                color: '#1e293b'
              }}>
                Integration Status
              </h4>
              <div style={{
                padding: '16px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                background: selectedNode.notConnected ? '#fef2f2' : '#f0fdf4',
                color: selectedNode.notConnected ? '#b91c1c' : '#166534',
                border: `2px solid ${selectedNode.notConnected ? '#fecaca' : '#bbf7d0'}`
              }}>
                {selectedNode.notConnected 
                  ? 'Disconnected from neural mesh' 
                  : 'Connected to CalcGuard neural hub'
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnterpriseArchitectureVisualization;