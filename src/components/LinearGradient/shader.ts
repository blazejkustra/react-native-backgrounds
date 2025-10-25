export const LINEAR_GRADIENT_SHADER = /* wgsl */ `
struct GradientParams {
  startColor: vec4<f32>,
  endColor: vec4<f32>,
  angle: f32,
  aspect: f32,
};

@group(0) @binding(0) var<uniform> gradientParams: GradientParams;

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let uv = ndc * 0.5 + vec2<f32>(0.5, 0.5);

  let dir = vec2<f32>(cos(gradientParams.angle), sin(gradientParams.angle));

  let fromCenter = uv - vec2<f32>(0.5, 0.5);
  let corrected = vec2<f32>(fromCenter.x * gradientParams.aspect, fromCenter.y);

  let t = clamp(dot(corrected, dir) + 0.5, 0.0, 1.0);
  return mix(gradientParams.startColor, gradientParams.endColor, t);
}
`;
