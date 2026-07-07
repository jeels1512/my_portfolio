import { buildGraph } from "./graph";

// Pre-rendered SVG of the same graph — reduced-motion / mobile / loading fallback.
export function StaticGraph({ className }: { className?: string }) {
  const { nodes, edges } = buildGraph(120, 180, 6);
  const scale = 34;
  const cx = 300;
  const cy = 300;
  const px = (x: number) => cx + x * scale;
  const py = (y: number) => cy - y * scale;

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity={0.4} stroke="#232a31" strokeWidth={0.6}>
        {edges.map((e, i) => (
          <line
            key={i}
            x1={px(nodes[e.a].x)}
            y1={py(nodes[e.a].y)}
            x2={px(nodes[e.b].x)}
            y2={py(nodes[e.b].y)}
          />
        ))}
      </g>
      <g fill="#ffb454">
        {nodes.map((n, i) => (
          <circle key={i} cx={px(n.x)} cy={py(n.y)} r={n.big ? 2.6 : 1.4} opacity={0.9} />
        ))}
      </g>
      {/* one static scan band */}
      <rect x={0} y={cy - 8} width={600} height={16} fill="#ffb454" opacity={0.06} />
    </svg>
  );
}
