export const SILK_SHADER = /* wgsl */ `
struct SilkParams {
  resolution: vec4<f32>,
  time_vec: vec4<f32>,
  color: vec4<f32>,
  scalars: vec4<f32>,
}

@group(0) @binding(0) var<uniform> params: SilkParams;

const e = 2.71828182845904523536;

fn noise(texCoord: vec2<f32>) -> f32 {
  let G = e;
  let r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

fn rotateUvs(uv: vec2<f32>, angle: f32) -> vec2<f32> {
  let c = cos(angle);
  let s = sin(angle);
  let rot = mat2x2<f32>(c, -s, s, c);
  return rot * uv;
}

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let time = params.time_vec.x;
  let speed = params.scalars.x;
  let scale = params.scalars.y;
  let rotation = params.scalars.z;
  let noiseIntensity = params.scalars.w;

  let resolution2D = params.resolution.xy;
  let vUv = ndc * 0.5 + vec2<f32>(0.5, 0.5);
  let fragCoord = vUv * resolution2D;
  
  let rnd = noise(fragCoord);
  let uv = rotateUvs(vUv * scale, rotation);
  var tex = uv * scale;
  let tOffset = speed * time;

  tex.y = tex.y + 0.03 * sin(8.0 * tex.x - tOffset);

  let pattern = 0.6 + 
                0.4 * sin(5.0 * (tex.x + tex.y + 
                                 cos(3.0 * tex.x + 5.0 * tex.y) + 
                                 0.02 * tOffset) + 
                         sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  var col = params.color * vec4<f32>(pattern, pattern, pattern, 1.0) - 
            vec4<f32>(rnd / 15.0 * noiseIntensity, rnd / 15.0 * noiseIntensity, 
                     rnd / 15.0 * noiseIntensity, 0.0);
  col.a = params.color.a;
  
  return clamp(col, vec4<f32>(0.0), vec4<f32>(1.0));
}
`;
