export const LIQUID_CHROME_SHADER = /* wgsl */ `
struct LiquidChromeParams {
  resolution: vec4<f32>,
  time_vec: vec4<f32>,
  color: vec4<f32>,
  scalars: vec4<f32>,
}

@group(0) @binding(0) var<uniform> params: LiquidChromeParams;

fn renderImage(uvCoord: vec2<f32>) -> vec4<f32> {
  let resolution2D = params.resolution.xy;
  let time = params.time_vec.x;
  let amplitude = params.scalars.x;
  let frequencyX = params.scalars.y;
  let frequencyY = params.scalars.z;

  let fragCoord = uvCoord * resolution2D;
  var uv = (2.0 * fragCoord - resolution2D) / min(params.resolution.x, params.resolution.y);
  
  for (var i: f32 = 1.0; i < 10.0; i = i + 1.0) {
    uv.x = uv.x + amplitude / i * cos(i * frequencyX * uv.y + time);
    uv.y = uv.y + amplitude / i * cos(i * frequencyY * uv.x + time);
  }
  
  let baseColor = params.color;
  let color = baseColor.rgb / abs(sin(time - uv.y - uv.x));
  return vec4<f32>(color, baseColor.a);
}

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let vUv = ndc * 0.5 + vec2<f32>(0.5, 0.5);
  let resolution2D = params.resolution.xy;
  
  var col = vec4<f32>(0.0);
  var samples = 0;
  
  for (var i: i32 = -1; i <= 1; i = i + 1) {
    for (var j: i32 = -1; j <= 1; j = j + 1) {
      let offset = vec2<f32>(f32(i), f32(j)) * (1.0 / min(resolution2D.x, resolution2D.y));
      col = col + renderImage(vUv + offset);
      samples = samples + 1;
    }
  }
  
  return col / f32(samples);
}
`;
