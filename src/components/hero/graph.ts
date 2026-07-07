// Deterministic sparse network graph — shared by the R3F scene and the SVG fallback.

export interface GraphNode {
  x: number;
  y: number;
  z: number;
  big: boolean;
  label: string;
}

export interface GraphEdge {
  a: number;
  b: number;
}

// tiny seeded PRNG (mulberry32) so the graph is stable across renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PORTS = [":443", ":22", ":8080", ":80", ":3389", ":8443", ":21", ":53"];

export function buildGraph(
  nodeCount = 120,
  edgeCount = 180,
  radius = 6,
): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const rand = mulberry32(0xc0ffee);
  const nodes: GraphNode[] = [];

  for (let i = 0; i < nodeCount; i++) {
    // distribute in a rough box, denser near center
    const x = (rand() - 0.5) * radius * 2;
    const y = (rand() - 0.5) * radius * 2.2;
    const z = (rand() - 0.5) * radius * 1.4;
    const octet = Math.floor(rand() * 254) + 1;
    const port = PORTS[Math.floor(rand() * PORTS.length)];
    nodes.push({
      x,
      y,
      z,
      big: rand() > 0.82,
      label: `10.0.${Math.floor(rand() * 8)}.${octet}${port}`,
    });
  }

  // connect each edge to nearest-ish neighbours for a plausible mesh
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  let attempts = 0;
  while (edges.length < edgeCount && attempts < edgeCount * 6) {
    attempts++;
    const a = Math.floor(rand() * nodeCount);
    // pick a nearby node
    let best = -1;
    let bestD = Infinity;
    for (let k = 0; k < 6; k++) {
      const cand = Math.floor(rand() * nodeCount);
      if (cand === a) continue;
      const dx = nodes[a].x - nodes[cand].x;
      const dy = nodes[a].y - nodes[cand].y;
      const dz = nodes[a].z - nodes[cand].z;
      const d = dx * dx + dy * dy + dz * dz;
      if (d < bestD) {
        bestD = d;
        best = cand;
      }
    }
    if (best < 0) continue;
    const key = a < best ? `${a}-${best}` : `${best}-${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ a, b: best });
  }

  return { nodes, edges };
}
