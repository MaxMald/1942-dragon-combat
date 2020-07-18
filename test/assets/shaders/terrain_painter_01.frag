precision mediump float;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

uniform vec2 resolution;
uniform float time;
uniform float d;

varying vec2 fragCoord;

//////////////////////////////////
// Mask

const float maskThr = 0.5;
const float maskMax = 0.6;

//////////////////////////////////
// SunLight

const vec3 sunColor = vec3(0.5255, 0.4627, 0.1804);
const vec3 lightColor = vec3(0.7451, 0.6039, 0.3373);
const float lightPower = 150.0;

//////////////////////////////////
// Specular 

const vec3 specColor = vec3(1.0, 1.0, 1.0);

const vec3 specLightDir = vec3(-0.577, 0.577, -0.577);
const vec3 specEyeDir = vec3(0.0,0.0,-1.0);

const float shininess = 30.0;
const float specPower = 75.0;

//////////////////////////////////
// Ocean Volumen 

const vec3 depthBaseColor = vec3(0.0118, 0.0863, 0.102);

const float depthPower = 40.0;
const float depthMinDist = 900.0;
const float detphDistMult = 9000.0;

/**
* Get the height from the texture.
*
* @param _uv the UV coordinates.
* @param _d the delta distance of the 
* 
* @returns the height value (0.0,1.0)
*/
float getHeight(vec2 _uv, float _d)
{
  _uv.y = _uv.y + _d;

  float layer = floor(_uv.y);
  _uv.y = _uv.y - layer;

  vec4 color = texture2D(iChannel2, _uv, 0.0);

  if(layer == 0.0) {
    return color.x;
  }
  else if(layer == 1.0) {
    return color.y;
  }
  else {
    return color.z;
  }
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

  //////////////////////////////////
  // Diffuse Color

  float heightValue = getHeight(uv, d);

  // Get the terrain color from the height value.
  vec3 diffuse = getTerrainColor(heightValue).xyz;

  //////////////////////////////////
  // Water normal vector

  // Normal vector of the point.
  vec3 cellPosition = vec3(fragCoord.xy, 1.0);

  vec2 normalSize = vec2(256.0, 256.0);
  vec2 normalScaleFactor = vec2(5.0, 5.0);

  vec2 waterNormalUV = uv;
  waterNormalUV.y = waterNormalUV.y * ratio;  

  waterNormalUV = uv * normalScaleFactor * normalSize;

  vec2 defase;
  defase.x = sin( (uv.y * 16.0) + time) * 0.2;
  defase.y = d * 4.5 + (time * 0.05);

  waterNormalUV = waterNormalUV + (defase * normalSize);
  waterNormalUV = mod(waterNormalUV, normalSize) / normalSize;

  vec3 normal 
    = normalToModelSpace(texture2D(iChannel1, waterNormalUV, 0.0).xyz);  
  
  //////////////////////////////////
  // Light source

  vec3 lightPosition;

  lightPosition.x = resolution.x * 0.3;
  lightPosition.y = resolution.y * 0.8;
  lightPosition.z = -50.0;
  
  vec3 lightDirection = lightPosition - cellPosition;

  float lightDistance = length(lightDirection);

  lightDirection = normalize(lightDirection);

  //////////////////////////////////
  // Eye
  
  vec3 eyePosition = vec3(resolution.xy * 0.5, -10.0);
  
  vec3 eyeDirection = normalize(eyePosition - cellPosition);
  
  //////////////////////////////////
  // Mask

  float hMask = 1.0;
  if(heightValue > maskThr){    
    hMask =  clamp(1.0 - ((heightValue - maskThr) / (maskMax - maskThr)), 0.0, 1.0);
  }

  //////////////////////////////////
  // Blinn Phong  

  float lambertian = max(dot(lightDirection, normal), 0.0);

  float specValue = 0.0;
  
  if(lambertian > 0.0) {

    vec3 h = normalize(specLightDir + specEyeDir);
    
    float specAngle = max(dot(h, normal), 0.0);

    specValue = pow(specAngle, shininess);
  }

  //////////////////////////////////
  // Ocean Volumen  

  float depthValue = 0.0;  

  if(lightDistance > depthMinDist) {
    depthValue = ((lightDistance - depthMinDist) / detphDistMult);
  }     

  //////////////////////////////////
  // Diffuse Color  

  vec3 diffuseColor =  sunColor * lambertian * lightColor * lightPower / lightDistance;

  //////////////////////////////////
  // Specular Color  

  vec3 specular = specColor * specValue * lightColor * specPower / lightDistance;

  //////////////////////////////////
  // Depth Color
  
  vec3 depthColor = depthBaseColor * depthValue * depthPower * hMask;

  //////////////////////////////////
  // Final Color

  vec3 finalColor = diffuse + (diffuseColor + specular - depthColor ) * hMask;

  gl_FragColor = vec4(finalColor, 1.0);
}