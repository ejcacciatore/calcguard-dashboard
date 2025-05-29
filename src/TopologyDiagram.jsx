import { useState } from 'react';

function TopologyDiagram() {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: 1, name: 'Bloomberg Terminal', x: 100, y: 100, type: 'data' },
    { id: 2, name: 'Charles River OMS', x: 300, y: 100, type: 'oms' },
    { id: 3, name: 'FlexTrade EMS', x: 500, y: 100, type: 'ems' },
    { id: 4, name: 'Goldman Sachs', x: 200, y: 250, type: 'broker' },
    { id: 5, name: 'NYSE', x: 400, y: 250, type: 'venue' },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  return (
    <div style={{ 
      padding: '2rem',
      background: 'white',
      margin: '2rem',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        marginBottom: '2rem',
        color: '#1f2937',
        fontSize: '24px',
        fontWeight: '700'
      }}>
        Technical System Topology
      </h2>
      
      <svg width="600" height="350" style={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        {/* Render connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#6b7280"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="3"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedNode(node)}
            />
            <text
              x={node.x}
              y={node.y + 40}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#1f2937"
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
      
      {selectedNode && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
            {selectedNode.name}
          </h3>
          <p style={{ margin: 0, color: '#6b7280' }}>
            Type: {selectedNode.type} • Node ID: {selectedNode.id}
          </p>
          <button 
            onClick={() => setSelectedNode(null)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default TopologyDiagram;