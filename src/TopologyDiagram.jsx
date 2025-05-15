import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  // Market Data Layer
  { id: 'md-1', position: { x: 100, y: 50 }, data: { label: 'Bloomberg\nTerminal' }, type: 'input', style: { background: '#e8f5e9', border: '2px solid #4caf50' } },
  { id: 'md-2', position: { x: 250, y: 50 }, data: { label: 'Refinitiv\nEikon' }, type: 'input', style: { background: '#e8f5e9', border: '2px solid #4caf50' } },
  { id: 'md-3', position: { x: 400, y: 50 }, data: { label: 'LSEG\nDatascope' }, type: 'input', style: { background: '#e8f5e9', border: '2px solid #4caf50' } },
  { id: 'md-4', position: { x: 550, y: 50 }, data: { label: 'ICE Data\nServices' }, type: 'input', style: { background: '#e8f5e9', border: '2px solid #4caf50' } },
  
  // Portfolio Management
  { id: 'pm-1', position: { x: 100, y: 200 }, data: { label: 'BlackRock\nAladdin' }, style: { background: '#e3f2fd', border: '2px solid #1976d2' } },
  { id: 'pm-2', position: { x: 250, y: 200 }, data: { label: 'State Street\nPORT' }, style: { background: '#e3f2fd', border: '2px solid #1976d2' } },
  { id: 'pm-3', position: { x: 400, y: 200 }, data: { label: 'SimCorp\nDimension' }, style: { background: '#e3f2fd', border: '2px solid #1976d2' } },
  
  // Risk & Compliance
  { id: 'risk-1', position: { x: 550, y: 200 }, data: { label: 'Bloomberg\nMARS' }, style: { background: '#fff3e0', border: '2px solid #ff6f00' } },
  { id: 'risk-2', position: { x: 700, y: 200 }, data: { label: 'Fidessa\nSentinel' }, style: { background: '#fff3e0', border: '2px solid #ff6f00' } },
  
  // Order Management
  { id: 'oms-1', position: { x: 175, y: 350 }, data: { label: 'Charles River\nOMS' }, style: { background: '#f3e5f5', border: '2px solid #9c27b0' } },
  { id: 'oms-2', position: { x: 325, y: 350 }, data: { label: 'Bloomberg\nAIM' }, style: { background: '#f3e5f5', border: '2px solid #9c27b0' } },
  { id: 'oms-3', position: { x: 475, y: 350 }, data: { label: 'SS&C\nEze OMS' }, style: { background: '#f3e5f5', border: '2px solid #9c27b0' } },
  
  // Execution Management
  { id: 'ems-1', position: { x: 175, y: 500 }, data: { label: 'FlexTrade' }, style: { background: '#fff8e1', border: '2px solid #ffc107' } },
  { id: 'ems-2', position: { x: 325, y: 500 }, data: { label: 'Bloomberg\nEMSX' }, style: { background: '#fff8e1', border: '2px solid #ffc107' } },
  { id: 'ems-3', position: { x: 475, y: 500 }, data: { label: 'Virtu\nTriton' }, style: { background: '#fff8e1', border: '2px solid #ffc107' } },
  
  // Brokers - FIXED: Removed extra quote in border style
  { id: 'broker-1', position: { x: 100, y: 650 }, data: { label: 'Goldman\nSachs' }, style: { background: '#ffebee', border: '2px solid #f44336' } },
  { id: 'broker-2', position: { x: 250, y: 650 }, data: { label: 'Morgan\nStanley' }, style: { background: '#ffebee', border: '2px solid #f44336' } },
  { id: 'broker-3', position: { x: 400, y: 650 }, data: { label: 'Instinet' }, style: { background: '#ffebee', border: '2px solid #f44336' } },
  { id: 'broker-4', position: { x: 550, y: 650 }, data: { label: 'Loop\nCapital' }, style: { background: '#ffebee', border: '2px solid #f44336' } },
  
  // Venues
  { id: 'venue-1', position: { x: 175, y: 800 }, data: { label: 'NYSE' }, style: { background: '#eceff1', border: '2px solid #607d8b' } },
  { id: 'venue-2', position: { x: 325, y: 800 }, data: { label: 'NASDAQ' }, style: { background: '#eceff1', border: '2px solid #607d8b' } },
  { id: 'venue-3', position: { x: 475, y: 800 }, data: { label: 'Dark Pools' }, style: { background: '#eceff1', border: '2px solid #607d8b' } },
  
  // Settlement
  { id: 'settle-1', position: { x: 250, y: 950 }, data: { label: 'DTCC' }, style: { background: '#e1f5fe', border: '2px solid #03a9f4' } },
  { id: 'settle-2', position: { x: 400, y: 950 }, data: { label: 'BNY Mellon' }, style: { background: '#e1f5fe', border: '2px solid #03a9f4' } },
  
  // CalcGuard
  { id: 'calcguard', position: { x: 650, y: 500 }, 
    data: { 
      label: 'CalcGuard\nAnalytics\nPlatform' 
    }, 
    style: { 
      background: 'linear-gradient(135deg, #d1fae5, #86efac)', 
      border: '3px solid #22c55e',
      width: 150,
      height: 100,
      fontSize: 16,
      fontWeight: 'bold'
    } 
  },
];

const initialEdges = [
  // Market Data connections
  { id: 'md1-pm1', source: 'md-1', target: 'pm-1', animated: true },
  { id: 'md2-pm2', source: 'md-2', target: 'pm-2', animated: true },
  { id: 'md3-pm3', source: 'md-3', target: 'pm-3', animated: true },
  { id: 'md4-risk1', source: 'md-4', target: 'risk-1', animated: true },
  
  // Portfolio to OMS
  { id: 'pm1-oms1', source: 'pm-1', target: 'oms-1' },
  { id: 'pm2-oms2', source: 'pm-2', target: 'oms-2' },
  { id: 'pm3-oms3', source: 'pm-3', target: 'oms-3' },
  
  // Risk to OMS
  { id: 'risk1-oms2', source: 'risk-1', target: 'oms-2' },
  { id: 'risk2-oms3', source: 'risk-2', target: 'oms-3' },
  
  // OMS to EMS
  { id: 'oms1-ems1', source: 'oms-1', target: 'ems-1' },
  { id: 'oms2-ems2', source: 'oms-2', target: 'ems-2' },
  { id: 'oms3-ems3', source: 'oms-3', target: 'ems-3' },
  
  // EMS to Brokers
  { id: 'ems1-broker1', source: 'ems-1', target: 'broker-1' },
  { id: 'ems2-broker2', source: 'ems-2', target: 'broker-2' },
  { id: 'ems3-broker3', source: 'ems-3', target: 'broker-3' },
  { id: 'ems3-broker4', source: 'ems-3', target: 'broker-4' },
  
  // Brokers to Venues
  { id: 'broker1-venue1', source: 'broker-1', target: 'venue-1' },
  { id: 'broker2-venue2', source: 'broker-2', target: 'venue-2' },
  { id: 'broker3-venue3', source: 'broker-3', target: 'venue-3' },
  
  // Venues to Settlement
  { id: 'venue1-settle1', source: 'venue-1', target: 'settle-1' },
  { id: 'venue2-settle2', source: 'venue-2', target: 'settle-2' },
  
  // CalcGuard connections (dashed)
  { id: 'oms1-cg', source: 'oms-1', target: 'calcguard', type: 'step', style: { stroke: '#22c55e', strokeDasharray: '5,5' } },
  { id: 'ems2-cg', source: 'ems-2', target: 'calcguard', type: 'step', style: { stroke: '#22c55e', strokeDasharray: '5,5' } },
  { id: 'broker1-cg', source: 'broker-1', target: 'calcguard', type: 'step', style: { stroke: '#22c55e', strokeDasharray: '5,5' } },
  { id: 'venue1-cg', source: 'venue-1', target: 'calcguard', type: 'step', style: { stroke: '#22c55e', strokeDasharray: '5,5' } },
  { id: 'settle1-cg', source: 'settle-1', target: 'calcguard', type: 'step', style: { stroke: '#22c55e', strokeDasharray: '5,5' } },
  { id: 'cg-pm1', source: 'calcguard', target: 'pm-1', type: 'step', style: { stroke: '#22c55e', strokeDasharray: '5,5' } },
];

function TopologyDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            if (node.id.includes('md')) return '#4caf50';
            if (node.id.includes('pm')) return '#1976d2';
            if (node.id.includes('risk')) return '#ff6f00';
            if (node.id.includes('oms')) return '#9c27b0';
            if (node.id.includes('ems')) return '#ffc107';
            if (node.id.includes('broker')) return '#f44336';
            if (node.id.includes('venue')) return '#607d8b';
            if (node.id.includes('settle')) return '#03a9f4';
            if (node.id === 'calcguard') return '#22c55e';
            return '#ccc';
          }}
        />
        <Background variant="dots" gap={12} size={1} />
        
        <Panel position="top-left">
          <div style={{ background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3>CalcGuard Order Routing Topology</h3>
            <p>Click nodes to see details • Drag to rearrange • Scroll to zoom</p>
          </div>
        </Panel>

        {selectedNode && (
          <Panel position="top-right">
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              width: '300px'
            }}>
              <h4>{selectedNode.data.label}</h4>
              <p>Node ID: {selectedNode.id}</p>
              <p>Position: {Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)}</p>
              <button onClick={() => setSelectedNode(null)}>Close</button>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}

export default TopologyDiagram;