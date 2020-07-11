precision mediump float;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

uniform vec2 resolution;
uniform float time;

varying vec2 fragCoord;

vec3 BrightnessSaturationContrast
(
  vec3 color, 
  float brightness, 
  float saturation, 
  float contrast
)
{
	// adjust these values to adjust R, G, B colors separately
	float avgLumR = 0.5;
	float avgLumG = 0.5;
	float avgLumB = 0.5;

	// luminance coefficient for getting luminance from the image
	vec3 luminanceCoeff = vec3(0.2125, 0.7154, 0.0721);
	
  // Brightness calculation
	vec3 avgLum = vec3(avgLumR, avgLumG, avgLumB);
	vec3 brightnessColor = color * brightness;
	float intensityf = dot(brightnessColor, luminanceCoeff);
	vec3 intensity = vec3(intensityf, intensityf, intensityf);
	
  // Saturation calculation
	vec3 saturationColor = mix(intensity, brightnessColor, saturation);
	
  // Contrast calculation
	vec3 contrastColor = mix(avgLum, saturationColor, contrast);
	return contrastColor;
}

// Get the terrain color from the given perlin noise color. This method
// use the iChannel1 sample as the texture color.
vec4 terrainColor(vec3 _perlinColor)
{
  // Set the terrain uv.
  float t_u = clamp(_perlinColor.x, 0.01, 0.99);
  float t_v = clamp(_perlinColor.y, 0.01, 0.99);
  vec2 t_uv = vec2(t_u, t_v);

  // Get the terrain color;
  return texture2D(iChannel1, t_uv, 0.0);
}

void main() 
{
  // get the UV coords of the PerlinNoise map.
  vec2 uv = fragCoord.xy / resolution.xy;
  //uv.y *= -1.0;
  
  // get the color from the PerlinNoixe map
  vec4 perlinColor = texture2D(iChannel0, uv, 0.0);
  vec4 testColor = texture2D(iChannel2, uv, 0.0);

  // Grow the perlin noise contrast.
  vec3 perlinColorSat = BrightnessSaturationContrast(perlinColor.xyz, 1.0, 1.0, 1.5);  

  // draw the terrain color.
  gl_FragColor = terrainColor(perlinColorSat);
  gl_FragColor = testColor;
}