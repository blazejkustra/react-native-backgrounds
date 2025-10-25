export const IRIDESCENCE_SHADER = /* wgsl */ `
struct IridescenceParams {
  resolution: vec4<f32>,
  time_vec: vec4<f32>,
  color: vec4<f32>,
  scalars: vec4<f32>,
}

@group(0) @binding(0) var<uniform> params: IridescenceParams;

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let time = params.time_vec.x;
  let speed = params.scalars.y;

  let vUv = ndc * 0.5 + vec2<f32>(0.5, 0.5);
  let mr = min(params.resolution.x, params.resolution.y);
  var uv = (vUv * 2.0 - vec2<f32>(1.0, 1.0)) * (params.resolution.xy / mr);

  var d = -time * 0.5 * speed;
  var a = 0.0;
  for (var i: f32 = 0.0; i < 8.0; i = i + 1.0) {
    a = a + cos(i - d - a * uv.x);
    d = d + sin(uv.y * i + a);
  }
  d = d + time * 0.5 * speed;

  let c1 = cos(uv * vec2<f32>(d, a)) * 0.6 + 0.4;
  let c2 = cos(a + d) * 0.5 + 0.5;
  let col = vec3<f32>(c1.x, c1.y, c2);

  let finalCol = cos(col * cos(vec3<f32>(d, a, 2.5)) * 0.5 + 0.5);
  let coloredCol = finalCol * params.color.rgb;
  return vec4<f32>(clamp(coloredCol, vec3<f32>(0.0), vec3<f32>(1.0)), params.color.a);
}
`;
