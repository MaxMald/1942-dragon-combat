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

/**
* Get the specular value in the given cell position.
*
* This method use the Blinn-Phong model to calculate the specular value.
*
* @param _lightDirection The direction of the light source.
* @param _power The power of the light source.
* @param _cellPosition The position vector of point in the surface.
* @param _cellNormal The normal vector of the point in the surface.
* @param _eyeDirection The direction of the light source.
*
* @returns The specular valua at that cell position.
*/
float getSpecular
(
  vec3 _lightDirection,
  float _distance,
  float _power,
  vec3 _cellPosition,
  vec3 _cellNormal,
  vec3 _eyeDirection
)
{
  if(_power > 0.0) {
    vec3 h = normalize(_eyeDirection + _lightDirection);
    return pow(max(0.0, dot(_cellNormal, h)), 0.5) * _power / _distance;
  }

  return 0.0;
}

/**
* Get the diffuse illuminatio intensity in a range of (0.0, 1.0).
*
* @param _lightDirection : light source direction.
* @param _distance : The distance between the source of ligth and the position * in the surface.
* @param _power : The intensity of the source light.
* @param _cellNormal : The normal vector of the surface point.
*
* @returns The intensity of the reflection of light in the surface.
*/
float getDiffuseIllumination
(
  vec3 _lightDirection,
  float _distance,
  float _power,
  vec3 _cellNormal
)
{
  float value = dot(_lightDirection, _cellNormal) / _distance * _power; 
  return clamp(value, 0.0, 1.0);
}

/**
* Get the terrain color corresponding to the height value.
*
* This method use the texture with gradient colors store in the Sampler2D (0)
* to get the terrain color.
*
* @param _height the height value in the range of (0.0, 1.0).
*
* @returns The color of the terrai according to the height value.
*/
vec4 getTerrainColor(float _height)
{
  // Set the terrain uv.
  float t_u = clamp(_height, 0.01, 0.99);
  float t_v = clamp(_height, 0.01, 0.99);
  vec2 t_uv = vec2(t_u, t_v);

  // Get the terrain color;
  return texture2D(iChannel0, t_uv, 0.0);
}

/**
* This method transform a normal vector to the model space coordinates.
*
* @param _normal the normal vector of the normal map.
*
* @returns The normal vector transformed to the model space.
*/
vec3 normalToModelSpace(vec3 _normal)
{
  mat3 tbn;

  tbn[0][0] = 1.0;
  tbn[1][0] = 0.0;
  tbn[2][0] = 0.0;

  tbn[0][1] = 0.0;
  tbn[1][1] = 1.0;
  tbn[2][1] = 0.0;

  tbn[0][2] = 0.0;
  tbn[1][2] = 0.0;
  tbn[2][2] = -1.0;

  _normal = normalize(_normal * 2.0 - 1.0);
  _normal = tbn * _normal;

  return _normal;
}
void main() 
{
  // get the UV coords of the PerlinNoise map.
  vec2 uv = fragCoord.xy / resolution.xy;

  float ratio = resolution.y / resolution.x;

  // Get the height value.
  vec3 heightMap = texture2D(iChannel2, uv, 0.0).xyz;  
  //heightMap = BrightnessSaturationContrast(heightMap, 1.0, 1.0, 2.0); 

  float heightValue = heightMap.x; 

  // Get the terrain color from the height value.
  vec4 baseTerrain = getTerrainColor(heightValue);

  //////////////////////////////////
  // Illumination

  // Normal vector of the point.
  vec3 cellPosition = vec3(fragCoord.xy, 1.0);

  vec2 normalSize = vec2(256.0, 256.0);
  vec2 normalScaleFactor = vec2(4.0, 4.0);

  vec2 waterNormalUV = uv;
  waterNormalUV.y = waterNormalUV.y * ratio;

  waterNormalUV = uv * normalScaleFactor * normalSize;
  
  vec2 defase;
  defase.x = sin(time) * 0.05;

  waterNormalUV = waterNormalUV + (defase * normalSize);
  waterNormalUV = mod(waterNormalUV, normalSize) / normalSize;

  //waterNormalUV = clamp(waterNormalUV, 0.01, 0.99);

  vec3 normal 
    = normalToModelSpace(texture2D(iChannel1, waterNormalUV, 0.0).xyz);  
  
  // Light source.
  vec3 lightPosition;
  lightPosition.x = resolution.x * 0.3;
  lightPosition.y = resolution.y * 0.8;
  lightPosition.z = -40.0;
  
  vec3 lightDirection = lightPosition - cellPosition;
  float lightDistance = length(lightDirection);
  lightDirection = lightDirection / lightDistance;

  vec4 lightColor = vec4(0.6588, 0.4392, 0.0314, 1.0);

  // Eye.
  vec3 eyePosition = vec3(resolution.xy * 0.5, -10.0);
  vec3 eyeDirection = normalize(eyePosition - cellPosition);
  
  // Ilumination mask.
  float hMask = 1.0;
  float mark = 0.4;
  if(heightValue > mark){    
    hMask =  clamp(1.0 - ((heightValue - mark) / (0.6 - mark)), 0.0, 1.0);
  }

  // Diffuse
  float diffuseValue = getDiffuseIllumination(lightDirection, lightDistance, 75.0, normal);
  vec4 diffuseColor = diffuseValue  * lightColor * hMask;

  // Specular
  float specular = getSpecular
  (
    eyePosition,
    lightDistance,
    100.0, 
    cellPosition, 
    normal, 
    eyeDirection
  ); 
  vec4 specularColor = lightColor * specular * hMask * diffuseValue;
  
  gl_FragColor = baseTerrain + specularColor + diffuseColor;
}