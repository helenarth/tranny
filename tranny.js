// Generated by CoffeeScript 1.6.3
(function() {
  var Matrix, copy, extend, fluent, umd;

  umd = function(factory) {
    if (typeof exports === 'object') {
      return module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else {
      return this.Tranny = factory;
    }
  };

  copy = function(array) {
    return array.slice();
  };

  extend = function(a, b) {
    var key;
    for (key in b) {
      a[key] = b[key];
    }
    return a;
  };

  fluent = function(fn) {
    return function() {
      fn.apply(this, arguments);
      return this;
    };
  };

  Matrix = function(data) {
    if (data) {
      return this.setData(data);
    }
  };

  extend(Matrix.prototype, {
    _data: {
      matrix: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
      transformations: {
        perspective: 0,
        rotate: {
          x: 0,
          y: 0,
          z: 0,
          a: 0
        },
        scale: {
          x: 1,
          y: 1,
          z: 1
        },
        skew: {
          x: 0,
          y: 0
        },
        translate: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    },
    setData: function(data) {
      return this._data.matrix = data;
    },
    matrix: function(data) {
      var columns, rows;
      if (data.length === void 0) {
        throw new TypeError('expected parameter `data` to be an Array, passed ' + typeof data);
      }
      rows = data.length;
      columns = rows[0] ? rows[0].length : 0;
      if (rows !== 4 || columns !== 4) {
        throw new Error('expected parameter `data` to be a 4x4 matrix of arrays, passed ' + rows + 'x' + columns + ' matrix');
      }
      return this.setData(data);
    },
    getMatrix: function() {
      return this.apply();
    },
    getMatrixCSS: function() {
      var css, field, matrix, row, _i, _j, _len, _len1;
      matrix = this.apply();
      css = [];
      for (_i = 0, _len = matrix.length; _i < _len; _i++) {
        row = matrix[_i];
        for (_j = 0, _len1 = matrix.length; _j < _len1; _j++) {
          field = matrix[_j];
          css.push(field);
        }
      }
      return 'matrix3d(' + css.join(',') + ')';
    },
    apply: function() {
      var a, c, data, i, matrix, perspective, rotate, rs, s, scale, skew, sx, sy, transformations, translate, u, v, w;
      data = this._data;
      matrix = data.matrix;
      transformations = data.transformations;
      perspective = transformations.perspective;
      matrix[2][3] = perspective ? -1 / perspective : 0;
      translate = transformations.translate;
      matrix[3][0] = translate.x;
      matrix[3][1] = translate.y;
      matrix[3][2] = translate.z;
      rotate = transformations.rotate;
      u = rotate.x;
      v = rotate.y;
      w = rotate.z;
      a = rotate.a;
      s = u * u + v * v + w * w;
      c = Math.cos(a);
      i = 1 - c;
      rs = Math.sqrt(s) * Math.sin(a);
      matrix[0][0] = (u * u + (v * v + w * w) * c) / s;
      matrix[1][0] = (u * v * i - w * rs) / s;
      matrix[2][0] = (u * w * i + v * rs) / s;
      matrix[0][1] = (u * v * i + w * rs) / s;
      matrix[1][1] = (v * v + (u * u + w * w) * c) / s;
      matrix[2][1] = (v * w * i - u * rs) / s;
      matrix[0][2] = (u * w * i - v * rs) / s;
      matrix[1][2] = (v * w * i + u * rs) / s;
      matrix[2][2] = (w * w + (u * u + v * v) * c) / s;
      skew = transformations.skew;
      sx = Math.tan(skew.x);
      sy = Math.tan(skew.y);
      matrix[0][1] *= sy;
      matrix[3][0] += translate.y * sx;
      matrix[3][1] += translate.x * sy;
      scale = transformations.scale;
      matrix[0][0] *= scale.x;
      matrix[1][1] *= scale.y;
      matrix[2][2] *= scale.z;
      return matrix;
    },
    rotate: function(a) {
      return this.rotateZ(a);
    },
    rotateX: function(a) {
      return this.rotate3d(1, 0, 0, a);
    },
    rotateY: function(a) {
      return this.rotate3d(0, 1, 0, a);
    },
    rotateZ: function(a) {
      return this.rotate3d(0, 0, 1, a);
    },
    scale: function(x, y) {
      return this.scale3d(x, y);
    },
    scaleX: function(x) {
      return this.scale3d(x);
    },
    scaleY: fluent(function(y) {
      if (y == null) {
        y = 1;
      }
      return this._data.transformations.scale.y = y;
    }),
    scaleZ: fluent(function(z) {
      if (z == null) {
        z = 1;
      }
      return this._data.transformations.scale.z = z;
    }),
    skewX: function(x) {
      return this.skew(x);
    },
    skewY: fluent(function(y) {
      if (y == null) {
        y = 0;
      }
      return this._data.transformations.skew.y = y;
    }),
    translate: function(x, y) {
      return this.translate3d(x, y);
    },
    translateX: function(x) {
      return this.translate3d(x);
    },
    translateY: fluent(function(y) {
      if (y == null) {
        y = 0;
      }
      return this._data.transformations.translate.y = y;
    }),
    translateZ: fluent(function(z) {
      if (z == null) {
        z = 0;
      }
      return this._data.transformations.translate.z = z;
    }),
    perspective: fluent(function(x) {
      if (x == null) {
        x = 0;
      }
      if (!(x < Infinity)) {
        throw new TypeError('expected parameter `x` to be a Number, passed ' + typeof x);
      }
      return this._data.transformations.perspective = x;
    }),
    rotate3d: fluent(function(x, y, z, a) {
      var _a;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (z == null) {
        z = 0;
      }
      if (a == null) {
        a = 0;
      }
      if (!(x < Infinity)) {
        throw new TypeError('expected parameter `x` to be a Number, passed ' + typeof x);
      }
      if (!(y < Infinity)) {
        throw new TypeError('expected parameter `y` to be a Number, passed ' + typeof y);
      }
      if (!(z < Infinity)) {
        throw new TypeError('expected parameter `z` to be a Number, passed ' + typeof z);
      }
      if (!(a < Infinity)) {
        _a = parseFloat(a, 10);
        if (a.indexOf('deg' > -1)) {
          _a *= Math.PI / 180;
        }
        a = _a;
      }
      return this._data.transformations.rotate = {
        x: x,
        y: y,
        z: z,
        a: a
      };
    }),
    scale3d: fluent(function(x, y, z) {
      if (x == null) {
        x = 1;
      }
      if (y == null) {
        y = 1;
      }
      if (z == null) {
        z = 1;
      }
      if (!(x < Infinity)) {
        throw new TypeError('expected parameter `x` to be a Number, passed ' + typeof x);
      }
      if (!(y < Infinity)) {
        throw new TypeError('expected parameter `y` to be a Number, passed ' + typeof y);
      }
      if (!(z < Infinity)) {
        throw new TypeError('expected parameter `z` to be a Number, passed ' + typeof z);
      }
      return this._data.transformations.scale = {
        x: x,
        y: y,
        z: z
      };
    }),
    skew: fluent(function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (!(x < Infinity)) {
        throw new TypeError('expected parameter `x` to be a Number, passed ' + typeof x);
      }
      if (!(y < Infinity)) {
        throw new TypeError('expected parameter `y` to be a Number, passed ' + typeof y);
      }
      return this._data.transformations.skew = {
        x: x,
        y: y
      };
    }),
    translate3d: fluent(function(x, y, z) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (z == null) {
        z = 0;
      }
      if (!(x < Infinity)) {
        throw new TypeError('expected parameter `x` to be a Number, passed ' + typeof x);
      }
      if (!(y < Infinity)) {
        throw new TypeError('expected parameter `y` to be a Number, passed ' + typeof y);
      }
      if (!(z < Infinity)) {
        throw new TypeError('expected parameter `z` to be a Number, passed ' + typeof z);
      }
      return this._data.transformations.translate = {
        x: x,
        y: y,
        z: z
      };
    })
  });

  umd(Matrix);

}).call(this);