/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Configuration for the AmbienceGenerator.
 *
 * @file ambienceGeneratorConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-16-2020
 */

 /**
  * Configuration for the AmbienceGenerator.
  */
export class AmbienceGeneratorConfig
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Height map noise width.
   */
  noise_width : number;

  /**
   * Height map noise height.
   */
  noise_height : number;

  /**
   * Height map amplitude.
   */
  noise_amplitude : number;

  /**
   * Height of the Data Texture.
   */
  dataTexture_height : number;

  /**
   * Width of the Data Texture.
   */
  dataTexture_width : number;

  /**
   * The key of the color texture.
   */
  colorTextureKey : string;

  /**
   * The key of the map texture.
   */
  mapsTextureKey : string;

  /**
   * The keyof the surface painter shader.
   */
  terrainShaderKey : string;
}