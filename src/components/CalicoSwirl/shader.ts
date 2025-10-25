export const CALICO_SWIRL_SHADER = /* wgsl */ `
struct CalicoSwirlParams {
  resolution: vec4<f32>,
  time_vec: vec4<f32>,
  colors: vec4<f32>,
  scalars: vec4<f32>,
}

@group(0) @binding(0) var<uniform> params: CalicoSwirlParams;

// Transformation matrix for noise warping
const m = mat2x2<f32>(0.80, 0.60, -0.60, 0.80);

// Simple noise function
fn noise(p: vec2<f32>) -> f32 {
  return sin(p.x) * sin(p.y);
}

// Fractal Brownian Motion with 4 octaves
fn fbm4(p_in: vec2<f32>) -> f32 {
  var p = p_in;
  var f = 0.0;
  f += 0.5000 * noise(p); 
  p = m * p * 2.02;
  f += 0.2500 * noise(p); 
  p = m * p * 2.03;
  f += 0.1250 * noise(p); 
  p = m * p * 2.01;
  f += 0.0625 * noise(p);
  return f / 0.9375;
}

// Fractal Brownian Motion with 6 octaves
fn fbm6(p_in: vec2<f32>) -> f32 {
  var p = p_in;
  var f = 0.0;
  f += 0.500000 * (0.5 + 0.5 * noise(p)); 
  p = m * p * 2.02;
  f += 0.250000 * (0.5 + 0.5 * noise(p)); 
  p = m * p * 2.03;
  f += 0.125000 * (0.5 + 0.5 * noise(p)); 
  p = m * p * 2.01;
  f += 0.062500 * (0.5 + 0.5 * noise(p)); 
  p = m * p * 2.04;
  f += 0.031250 * (0.5 + 0.5 * noise(p)); 
  p = m * p * 2.01;
  f += 0.015625 * (0.5 + 0.5 * noise(p));
  return f / 0.96875;
}

// 2D vector version of fbm4
fn fbm4_2(p: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(fbm4(p), fbm4(p + vec2<f32>(7.8)));
}

// 2D vector version of fbm6
fn fbm6_2(p: vec2<f32>) -> vec2<f32> {
  return vec2<f32>(fbm6(p + vec2<f32>(16.8)), fbm6(p + vec2<f32>(11.5)));
}

// Main warping function
fn func(q: vec2<f32>, time: f32) -> vec4<f32> {
  var q_mod = q;
  q_mod += 0.03 * sin(vec2<f32>(0.27, 0.23) * time + length(q) * vec2<f32>(4.1, 4.3));

  let o = fbm4_2(0.9 * q_mod);
  
  var o_mod = o;
  o_mod += 0.04 * sin(vec2<f32>(0.12, 0.14) * time + length(o));

  let n = fbm6_2(3.0 * o_mod);

  let f = 0.5 + 0.5 * fbm4(1.8 * q_mod + 6.0 * n);

  let result = mix(f, f * f * f * 3.5, f * abs(n.x));
  
  return vec4<f32>(o, n.x, n.y);
}

@fragment
fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
  let time = params.time_vec.x;
  let speed = params.scalars.x;
  let intensity = params.scalars.y;
  
  let resolution = params.resolution.xy;
  let aspect = params.resolution.z;
  
  // Convert to shader coordinate system (centered, aspect-corrected)
  var p = ndc;
  p.y *= aspect;
  
  let e = 2.0 / resolution.y;

  // Calculate the warped pattern
  let on = func(p, time * speed);
  
  // Extract values
  let o = on.xy;
  let n = on.zw;
  
  // Recompute f for color calculation
  var q = p;
  q += 0.03 * sin(vec2<f32>(0.27, 0.23) * time * speed + length(q) * vec2<f32>(4.1, 4.3));
  let fbm_val = 0.5 + 0.5 * fbm4(1.8 * q + 6.0 * n);
  let f = mix(fbm_val, fbm_val * fbm_val * fbm_val * 3.5, fbm_val * abs(n.x));

  // Build the color
  var col = vec3<f32>(0.0);
  col = mix(vec3<f32>(0.2, 0.1, 0.4), vec3<f32>(0.3, 0.05, 0.05), f);
  col = mix(col, vec3<f32>(0.9, 0.9, 0.9), dot(n, n));
  col = mix(col, vec3<f32>(0.4, 0.3, 0.3), 0.2 + 0.5 * o.y * o.y);
  col = mix(col, vec3<f32>(0.0, 0.2, 0.4), 0.5 * smoothstep(1.2, 1.3, abs(n.x) + abs(n.y)));
  col = clamp(col * f * 2.0, vec3<f32>(0.0), vec3<f32>(1.0));
  
  // Calculate normal for lighting
  let kk1 = func(p + vec2<f32>(e, 0.0), time * speed);
  let kk2 = func(p + vec2<f32>(0.0, e), time * speed);
  
  var q1 = p + vec2<f32>(e, 0.0);
  q1 += 0.03 * sin(vec2<f32>(0.27, 0.23) * time * speed + length(q1) * vec2<f32>(4.1, 4.3));
  let f1 = 0.5 + 0.5 * fbm4(1.8 * q1 + 6.0 * kk1.zw);
  let fx = mix(f1, f1 * f1 * f1 * 3.5, f1 * abs(kk1.z));
  
  var q2 = p + vec2<f32>(0.0, e);
  q2 += 0.03 * sin(vec2<f32>(0.27, 0.23) * time * speed + length(q2) * vec2<f32>(4.1, 4.3));
  let f2 = 0.5 + 0.5 * fbm4(1.8 * q2 + 6.0 * kk2.zw);
  let fy = mix(f2, f2 * f2 * f2 * 3.5, f2 * abs(kk2.z));
  
  let nor = normalize(vec3<f32>(fx - f, 2.0 * e, fy - f));

  // Lighting
  let lig = normalize(vec3<f32>(0.9, 0.2, -0.4));
  let dif = clamp(0.3 + 0.7 * dot(nor, lig), 0.0, 1.0);
  let lin = vec3<f32>(0.70, 0.90, 0.95) * (nor.y * 0.5 + 0.5) + vec3<f32>(0.15, 0.10, 0.05) * dif;
  col *= 1.2 * lin;
  
  // Invert and enhance contrast
  col = 1.0 - col;
  col = 1.1 * col * col;
  
  // Apply intensity and user color
  col = col * intensity;
  col = col * params.colors.rgb;
  
  return vec4<f32>(col, params.colors.a);
}
`;
