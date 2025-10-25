export const CIRCULAR_GRADIENT_SHADER = /* wgsl */ `
struct GradientParams {
  centerX: f32,
  centerY: f32,
  sizeX: f32,
  sizeY: f32,
  centerColor: vec3<f32>,
  _padding1: f32,
  edgeColor: vec3<f32>,
  _padding2: f32,
}

@group(0) @binding(0) var<uniform> gradientParams: GradientParams;

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let uv = (ndc * 0.6) + vec2<f32>(0.5, 0.5);
  let center = vec2<f32>(gradientParams.centerX, gradientParams.centerY);
  
  let diff = uv - center;
  let normalizedDiff = vec2<f32>(diff.x / gradientParams.sizeX, diff.y / gradientParams.sizeY);
  let dist = length(normalizedDiff);
  
  let t = smoothstep(0.0, 1.0, dist);
  let color = mix(gradientParams.centerColor, gradientParams.edgeColor, t);
  return vec4<f32>(color, 1.0);
}
`;
