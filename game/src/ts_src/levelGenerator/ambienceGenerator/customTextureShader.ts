/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Creates a shaders that allows you tu add a custom texture by an array of 
 * unsigned integers to one of the fragment shader's sample2D uniforms. 
 *
 * @file CustomTextureShader.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-10-2020
 */

 /**
  * Creates a shaders that allows you tu add a custom texture by an array of 
  * unsigned integers to one of the fragment shader's sample2D uniforms. 
  */
export class CustomTextureShader extends Phaser.GameObjects.Shader
{

  /**
   * Creates the custom texture from an array of unsigned integers. This texture
   * is send to the fragment shader by the uniform ("iChannel" + id). This method
   * must be called once after the creation of this Shader.
   * 
   * The number of elements in the pixel arrays must be equal to width * height *
   * number of elements per pixe. For example in a texture of RGBA format and 
   * a width and height of 256 pixels, the number of elements should be :
   * 
   * _a_pixels.length == width * height * 4
   * 
   * The width and height of the texture must be power of two.
   * 
   * The _texture_id is used to specify the uniform and texture index used by the
   * fragment shader. If your shader has two textures from the Phaser TextureManager,
   * then the custom texture should have an index of three.
   *  
   * @param _a_pixels array of elements that compound the texture pixel.
   * @param _type the type of pixel (RGB, RGBA).
   * @param _width the width of the custom texture.
   * @param _height the height of the custom texture.
   * @param _texture_id the id of thhe custom texture.
   */
  prepare
  (
    _a_pixels : Uint8Array,
    _type : number,
    _width : number, 
    _height : number,
    _texture_id : number
  ) : void
  {
    
    let gl : WebGLRenderingContext = this.gl;

    this._m_a_pixels = _a_pixels;
    this._m_width = _width;
    this._m_height = _height;
    this._m_textureID = _texture_id;

    ///////////////////////////////////
    // Texture Initialization

    this._m_texture = gl.createTexture();    

    gl.activeTexture(gl.TEXTURE0 + _texture_id);
    gl.bindTexture(gl.TEXTURE_2D, this._m_texture);
    
    gl.texImage2D
    (
      gl.TEXTURE_2D, 
      0, 
      _type, 
      _width, 
      _height, 
      0, 
      _type, 
      gl.UNSIGNED_BYTE,
      this._m_a_pixels
    );
    
    gl.texParameteri
    (
      gl.TEXTURE_2D, 
      gl.TEXTURE_MAG_FILTER,
      gl.LINEAR
    );
    
    gl.texParameteri
    (
      gl.TEXTURE_2D, 
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR
    );
    
    gl.texParameteri
    (
      gl.TEXTURE_2D, 
      gl.TEXTURE_WRAP_S,
      gl.REPEAT
    );
    
    gl.texParameteri
    (
      gl.TEXTURE_2D, 
      gl.TEXTURE_WRAP_T,
      gl.REPEAT
    );

    let renderer : Phaser.Renderer.WebGL.WebGLRenderer 
      = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    
    renderer.setProgram(this.program);

    this._m_uniformLocation 
      = this.gl.getUniformLocation(this.program, 'iChannel' + _texture_id);

    gl.uniform1i(this._m_uniformLocation, _texture_id);
    return;
  }

  syncUniforms()
  : void
  {
    var gl = this.gl;

    var uniforms = this.uniforms;
    var uniform;
    var length;
    var glFunc;
    var location;
    var value;
    var textureCount = 0;
  
    for (var key in uniforms)
    {
      uniform = uniforms[key];

      glFunc = uniform.glFunc;
      length = uniform.glValueLength;
      location = uniform.uniformLocation;
      value = uniform.value;

      if (value === null)
      {
        continue;
      }

      if (length === 1)
      {
        if (uniform.glMatrix)
        {
          glFunc.call(gl, location, uniform.transpose, value);
        }
        else
        {
          glFunc.call(gl, location, value);
        }
      }
      else if (length === 2)
      {
        glFunc.call(gl, location, value.x, value.y);
      }
      else if (length === 3)
      {
        glFunc.call(gl, location, value.x, value.y, value.z);
      }
      else if (length === 4)
      {
        glFunc.call(gl, location, value.x, value.y, value.z, value.w);
      }
      else if (uniform.type === 'sampler2D')
      {
        gl.activeTexture(gl['TEXTURE' + textureCount]);

        gl.bindTexture(gl.TEXTURE_2D, value);

        gl.uniform1i(location, textureCount);

        textureCount++;
      }
    }

    ///////////////////////////////////
    // Custom Texture

    gl.activeTexture(gl.TEXTURE0 + this._m_textureID);
    
    gl.bindTexture(gl.TEXTURE_2D, this._m_texture);    

    gl.uniform1i(this._m_uniformLocation, this._m_textureID);
    return;
  }

  /**
   * Get the width of the custom texture.
   */
  getCustomTextureWidth()
  : number
  {
    return this._m_width;
  }

  /**
   * Get the height of the custom texture.
   */
  getCustomTextureHeight()
  : number
  {
    return this._m_height;
  }

  /**
   * Destroys the custom texture, and set to null the pixel array. Finally it
   * calls the base.preDestroy() method.
   */
  preDestroy()
  : void
  {
    this.gl.deleteTexture(this._m_texture);
    
    this._m_a_pixels = null;

    super.preDestroy();
    return;
  }

  /**
   * Pixels of the custom texture.
   */
  private _m_a_pixels : Uint8Array;

  /**
   * The custom texture.
   */
  private _m_texture : WebGLTexture;

  /**
   * The uniform location of the custom texture.
   */
  private _m_uniformLocation : WebGLUniformLocation;

  /**
   * Width of the custom texture.
   */
  private _m_width : number;

  /**
   * Height of the custom texture.
   */
  private _m_height : number;

  /**
   * Index of the custom texture. This is used to get the texture uniform : 
   * "iChannel" + _m_textureID, 
   * 
   * Also it is used to set the uniform to the texture
   * index : gl.uniform1i(uniform_location, _m_textureID) 
   */
  private _m_textureID : number;
}