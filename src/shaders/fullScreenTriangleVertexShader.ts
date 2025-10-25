export const fullScreenTriangleVertexShader = /* wgsl */ `
  struct VSOut { @builtin(position) pos: vec4<f32>, @location(0) ndc: vec2<f32> };
  @vertex fn main(@builtin(vertex_index) vid: u32) -> VSOut {
    var p = array<vec2<f32>,3>(
      vec2<f32>(-1.0,-3.0), vec2<f32>(-1.0,1.0), vec2<f32>(3.0,1.0)
    );
    var o: VSOut;
    o.pos = vec4<f32>(p[vid], 0, 1.0);
    o.ndc = p[vid];
    return o;
  }
`;
