export const BLUR_SHADER = /* wgsl */ `
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var texSampler: sampler;

struct BlurParams {
  filterSize: f32,
  direction: f32, // 0 = horizontal, 1 = vertical
}
@group(0) @binding(2) var<uniform> params: BlurParams;

@fragment
fn fragmentMain(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let uv = (ndc + 1.0) / 2.0;
  let texSize = vec2<f32>(textureDimensions(inputTexture));
  
  var color = vec4<f32>(0.0);
  let radius = i32(params.filterSize / 2.0);
  
  for (var i = -radius; i <= radius; i++) {
    let offset = mix(
      vec2<f32>(f32(i) / texSize.x, 0.0),  // horizontal
      vec2<f32>(0.0, f32(i) / texSize.y),  // vertical
      params.direction
    );
    color += textureSample(inputTexture, texSampler, uv + offset);
  }
  
  return color / params.filterSize;
}
`;
