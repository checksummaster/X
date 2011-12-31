/*
 * ${HEADER}
 */

// provides
goog.provide('X.object');

// requires
goog.require('X.base');
goog.require('X.exception');
goog.require('X.triplets');
goog.require('X.texture');
goog.require('X.transform');



/**
 * Create a displayable object. Objects may have points, colors, a texture, or
 * may be loaded from a file in addition to opacity and visibility settings.
 * 
 * @constructor
 * @extends X.base
 */
X.object = function() {

  //
  // call the standard constructor of X.base
  goog.base(this);
  
  //
  // class attributes
  
  /**
   * @inheritDoc
   * @const
   */
  this._className = 'object';
  
  /**
   * The rendering type of this object.
   * 
   * @type {X.object.types}
   * @const
   */
  this._type = X.object.types.TRIANGLES;
  
  /**
   * The transform of this object.
   * 
   * @type {X.transform}
   * @protected
   */
  this._transform = new X.transform();
  
  /**
   * The object color. By default, this is white.
   * 
   * @type {Array}
   * @protected
   */
  this._color = [1, 1, 1];
  
  /**
   * The points of this object.
   * 
   * @type {X.triplets}
   * @protected
   */
  this._points = new X.triplets();
  
  /**
   * The normals of this object.
   * 
   * @type {X.triplets}
   * @protected
   */
  this._normals = new X.triplets();
  
  /**
   * The point colors of this object.
   * 
   * @type {X.triplets}
   * @protected
   */
  this._colors = new X.triplets();
  
  /**
   * The texture of this object.
   * 
   * @type {?X.texture}
   * @protected
   */
  this._texture = null;
  
  /**
   * The mapping between object and texture coordinates.
   * 
   * @type {?Array}
   * @protected
   */
  this._textureCoordinateMap = null;
  
  /**
   * The filename if this object represents an external file.
   * 
   * @type {String}
   * @protected
   */
  this._file = null;
  
  /**
   * The opacity of this object.
   * 
   * @type {Number}
   * @protected
   */
  this._opacity = 1.0;
  
  this._children = null;
  
  /**
   * The visibility of this object.
   * 
   * @type {boolean}
   * @protected
   */
  this._visible = true;
  
  this._lineWidth = 1;
  
};
// inherit from X.base
goog.inherits(X.object, X.base);


/**
 * Different render types for an X.object.
 * 
 * @enum {string}
 */
X.object.types = {
  // the render event
  TRIANGLES: 'TRIANGLES',
  TRIANGLE_STRIPS: 'TRIANGLE_STRIPS',
  LINES: 'LINES',
  POLYGONS: 'POLYGONS'
};


/**
 * Get the rendering type of this object.
 * 
 * @return {X.object.types} The rendering type.
 */
X.object.prototype.type = function() {

  return this._type;
  
};


/**
 * Set the rendering type of this object.
 * 
 * @param {X.object.types} type The rendering type.
 */
X.object.prototype.setType = function(type) {

  this._type = type;
  
};


/**
 * Get the transform of this object.
 * 
 * @return {!X.transform} The transform.
 */
X.object.prototype.transform = function() {

  return this._transform;
  
};


/**
 * Get the points of this object.
 * 
 * @return {X.triplets} The points.
 */
X.object.prototype.points = function() {

  return this._points;
  
};


/**
 * Get the normals of this object.
 * 
 * @return {X.triplets} The normals.
 */
X.object.prototype.normals = function() {

  return this._normals;
  
};


/**
 * Get the point colors of this object.
 * 
 * @return {X.triplets} The point colors.
 */
X.object.prototype.colors = function() {

  return this._colors;
  
};


/**
 * Get the object color.
 * 
 * @return {X.color} The object color.
 */
X.object.prototype.color = function() {

  return this._color;
  
};


/**
 * Get the object texture.
 * 
 * @return {?X.texture} The object texture.
 */
X.object.prototype.texture = function() {

  return this._texture;
  
};


/**
 * Set the object texture. If null is passed, the object will have no texture.
 * 
 * @param {?X.texture} texture The new texture.
 * @throws {X.exception} An exception if the given texture is invalid.
 */
X.object.prototype.setTexture = function(texture) {

  if (goog.isDefAndNotNull(texture) && !(texture instanceof X.texture)) {
    
    throw new X.exception('Fatal: Invalid texture.');
    
  }
  
  this._texture = texture;
  
};


/**
 * Get the mapping between texture and object coordinates.
 * 
 * @return {?Array} The texture coordinate map.
 */
X.object.prototype.textureCoordinateMap = function() {

  return this._textureCoordinateMap;
  
};


/**
 * Set the object color. This overrides any point colors.
 * 
 * @param {!number} r The Red value in the range of 0..1
 * @param {!number} g The Green value in the range of 0..1
 * @param {!number} b The Blue value in the range of 0..1
 * @throws {X.exception} An exception if the given color values are invalid.
 */
X.object.prototype.setColor = function(r, g, b) {

  // we accept only numbers as arguments
  if ((!goog.isNumber(r) && r < 0.0 && r > 1.0) ||
      (!goog.isNumber(g) && g < 0.0 && g > 1.0) ||
      (!goog.isNumber(b) && b < 0.0 && b > 1.0)) {
    
    throw new X.exception('Fatal: Invalid color.');
    
  }
  
  this._color[0] = r;
  this._color[1] = g;
  this._color[2] = b;
  
};


/**
 * Get the opacity of this object. If the object is fully opaque, this returns
 * 1.
 * 
 * @return {Number} The opacity in the range 0..1.
 */
X.object.prototype.opacity = function() {

  return this._opacity;
  
};


/**
 * Set the visibility of this object.
 * 
 * @param {boolean} visible The object's new visibility.
 */
X.object.prototype.setVisible = function(visible) {

  this._visible = visible;
  
};


/**
 * Get the visibility of this object.
 * 
 * @return {boolean} TRUE if the object is visible, FALSE otherwise.
 */
X.object.prototype.visible = function() {

  return this._visible;
  
};


/**
 * Set the opacity of this object.
 * 
 * @param {Number} opacity The opacity value in the range 0..1.
 */
X.object.prototype.setOpacity = function(opacity) {

  // check if the given opacity is in the range 0..1
  if (!goog.isNumber(opacity) || opacity > 1.0 || opacity < 0.0) {
    
    throw new X.exception('Fatal: Invalid opacity.');
    
  }
  
  this._opacity = opacity;
  
};


/**
 * Load this object from a file or reset the associated file.
 * 
 * @param {?String} file The file path/URL to load. If null, reset the
 *          associated file.
 */
X.object.prototype.load = function(file) {

  this._file = file;
  this._dirty = true;
  
};


/**
 * Get the associated file for this object.
 * 
 * @return {?String} The associated file or null if no file is associated.
 */
X.object.prototype.file = function() {

  return this._file;
  
};


/**
 * Fire a modified event for this object.
 */
X.object.prototype.modified = function() {

  var modifiedEvent = new X.event.ModifiedEvent();
  modifiedEvent._object = this;
  this.dispatchEvent(modifiedEvent);
  
};


X.object.prototype.children = function() {

  if (!this._children) {
    
    this._children = new Array();
    
  }
  
  return this._children;
  
};


X.object.prototype.hasChildren = function() {

  if (!this._children) {
    
    return false;
    
  }
  
  return (this._children.length > 0);
  
};


X.object.prototype.setLineWidth = function(width) {

  this._lineWidth = width;
  
};

X.object.prototype.lineWidth = function() {

  return this._lineWidth;
  
};

// export symbols (required for advanced compilation)
goog.exportSymbol('X.object', X.object);
goog.exportSymbol('X.object.prototype.type', X.object.prototype.type);
goog.exportSymbol('X.object.prototype.transform', X.object.prototype.transform);
goog.exportSymbol('X.object.prototype.points', X.object.prototype.points);
goog.exportSymbol('X.object.prototype.normals', X.object.prototype.normals);
goog.exportSymbol('X.object.prototype.texture', X.object.prototype.texture);
goog.exportSymbol('X.object.prototype.setTexture',
    X.object.prototype.setTexture);
goog.exportSymbol('X.object.prototype.colors', X.object.prototype.colors);
goog.exportSymbol('X.object.prototype.color', X.object.prototype.color);
goog.exportSymbol('X.object.prototype.setColor', X.object.prototype.setColor);
goog.exportSymbol('X.object.prototype.opacity', X.object.prototype.opacity);
goog.exportSymbol('X.object.prototype.setOpacity',
    X.object.prototype.setOpacity);
goog.exportSymbol('X.object.prototype.load', X.object.prototype.load);
goog.exportSymbol('X.object.prototype.file', X.object.prototype.file);