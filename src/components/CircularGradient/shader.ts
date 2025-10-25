export const CIRCULAR_GRADIENT_SHADER = /* wgsl */ `
struct GradientParams {
  center: vec2<f32>,
  size: vec2<f32>,
  centerColor: vec4<f32>,
  edgeColor: vec4<f32>,
}

@group(0) @binding(0) var<uniform> gradientParams: GradientParams;

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let uv = (ndc * 0.5) + vec2<f32>(0.5, 0.5);
  
  let diff = uv - gradientParams.center;
  let normalizedDiff = diff / gradientParams.size;
  let dist = length(normalizedDiff);
  
  let t = smoothstep(0.0, 1.0, dist);
  let color = mix(gradientParams.centerColor, gradientParams.edgeColor, t);
  return color;
}
`;
