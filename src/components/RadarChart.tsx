import { RADAR_DIMENSIONS } from "../lib/data";

/**
 * RadarChart — 6 维能力雷达图（纯 SVG，无依赖）
 * 暖色主题：填充用半透明橙，描边用主橙，文字用 text-primary
 */
export function RadarChart() {
  const size = 280;
  const center = size / 2;
  const radius = size / 2 - 40;
  const axes = RADAR_DIMENSIONS.length;
  const angleStep = (Math.PI * 2) / axes;

  // 多边形网格 (5 圈)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // 坐标转换
  const toCoord = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
    };
  };

  // 数据多边形
  const dataPoints = RADAR_DIMENSIONS.map((d, i) => toCoord(d.value, i));
  const dataPath = dataPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="6 维能力雷达图"
    >
      {/* 网格圈 */}
      {gridLevels.map((level, i) => (
        <polygon
          key={i}
          points={RADAR_DIMENSIONS.map((_, j) => {
            const p = toCoord(level * 10, j);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="1"
        />
      ))}

      {/* 轴线 */}
      {RADAR_DIMENSIONS.map((_, i) => {
        const p = toCoord(10, i);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="var(--border-subtle)"
            strokeWidth="1"
          />
        );
      })}

      {/* 数据填充 */}
      <path
        d={dataPath}
        fill="rgba(216, 106, 58, 0.18)"
        stroke="var(--brand-orange)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* 数据点 */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="var(--brand-orange)"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      ))}

      {/* 标签 */}
      {RADAR_DIMENSIONS.map((d, i) => {
        const p = toCoord(12.5, i); // 外推一些
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontWeight="500"
            fill="var(--text-secondary)"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {d.name}
          </text>
        );
      })}

      {/* 数值标签 */}
      {dataPoints.map((p, i) => {
        const d = RADAR_DIMENSIONS[i];
        // 数值放在数据点附近
        const angle = i * angleStep - Math.PI / 2;
        const offsetX = Math.cos(angle) * 12;
        const offsetY = Math.sin(angle) * 12;
        return (
          <text
            key={`v-${i}`}
            x={p.x + offsetX * 0.3}
            y={p.y + offsetY * 0.3}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--brand-orange)"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {d.value}
          </text>
        );
      })}
    </svg>
  );
}
