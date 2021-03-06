// Generated by CoffeeScript 1.6.3
(function() {
  var umd, wrap,
    __hasProp = {}.hasOwnProperty;

  wrap = function(util, umodel, toMatrix) {
    var Tranny, _;
    _ = {
      rad: function(string) {
        var angle, isDegrees;
        if (typeof string === 'string') {
          angle = parseFloat(string, 10);
          isDegrees = string.indexOf('deg' > -1);
          if (isDegrees) {
            angle *= Math.PI / 180;
          }
          string = angle;
        }
        return string;
      },
      copy: function(array) {
        return array.slice();
      },
      extend: function(a, b) {
        var key;
        for (key in b) {
          if (!__hasProp.call(b, key)) continue;
          a[key] = b[key];
        }
        return a;
      },
      fluent: function(fn) {
        return function() {
          fn.apply(this, arguments);
          return this;
        };
      }
    };
    return Tranny = (function() {
      function Tranny(data) {
        this.model = new umodel({
          matrix: new util.Identity,
          transformations: {
            perspective: new util.Identity,
            rotate: new util.Identity,
            scale: new util.Identity,
            skew: new util.Identity,
            translate: new util.Identity
          }
        });
        if (data) {
          this.matrix(data);
        }
      }

      Tranny.prototype.matrix = function(data) {
        var columns, rows;
        rows = data.length;
        columns = rows > 0 ? rows : 0;
        if (rows !== 4 || columns !== 4) {
          throw new Error('expected parameter `data` to be a 4x4 matrix of arrays, but was given a ' + rows + 'x' + columns + ' matrix');
        }
        return this.model.set('matrix', data);
      };

      Tranny.prototype.getMatrix = function() {
        var matrix, t;
        matrix = this.model.get('matrix');
        t = this.model.get('transformations');
        matrix = util.multiply(matrix, t.perspective);
        matrix = util.multiply(matrix, t.translate);
        matrix = util.multiply(matrix, t.rotate);
        matrix = util.multiply(matrix, t.skew);
        matrix = util.multiply(matrix, t.scale);
        return util.flip(matrix);
      };

      Tranny.prototype.getMatrixCSS = function() {
        var css, field, matrix, row, _i, _j, _len, _len1;
        matrix = this.getMatrix();
        css = [];
        for (_i = 0, _len = matrix.length; _i < _len; _i++) {
          row = matrix[_i];
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            field = row[_j];
            css.push(field);
          }
        }
        return 'matrix3d(' + css.join(',') + ')';
      };

      Tranny.prototype.rotate = function(a) {
        return this.rotateZ(a);
      };

      Tranny.prototype.rotateX = function(a) {
        return this.rotate3d(1, 0, 0, a);
      };

      Tranny.prototype.rotateY = function(a) {
        return this.rotate3d(0, 1, 0, a);
      };

      Tranny.prototype.rotateZ = function(a) {
        return this.rotate3d(0, 0, 1, a);
      };

      Tranny.prototype.scale = function(x, y) {
        return this.scale3d(x, y);
      };

      Tranny.prototype.scaleX = function(x) {
        return this.scale3d(x);
      };

      Tranny.prototype.scaleY = function(y) {
        if (y == null) {
          y = 1;
        }
        return this.scale3d(null, y);
      };

      Tranny.prototype.scaleZ = function(z) {
        if (z == null) {
          z = 1;
        }
        return this.scale3d(null, null, z);
      };

      Tranny.prototype.skewX = function(x) {
        return this.skew(x);
      };

      Tranny.prototype.skewY = function(y) {
        return this.skew(null, y);
      };

      Tranny.prototype.translate = function(x, y) {
        return this.translate3d(x, y);
      };

      Tranny.prototype.translateX = function(x) {
        return this.translate3d(x);
      };

      Tranny.prototype.translateY = function(y) {
        if (y == null) {
          y = 0;
        }
        return this.translate3d(null, y);
      };

      Tranny.prototype.translateZ = function(z) {
        if (z == null) {
          z = 0;
        }
        return this.translate3d(null, null, z);
      };

      Tranny.prototype.perspective = _.fluent(function(x) {
        if (x == null) {
          x = 0;
        }
        return this.model.set('transformations/perspective', toMatrix.perspective(x));
      });

      Tranny.prototype.rotate3d = _.fluent(function(x, y, z, a) {
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
        return this.model.set('transformations/rotate', toMatrix.rotate3d(x, y, z, _.rad(a)));
      });

      Tranny.prototype.scale3d = _.fluent(function(x, y, z) {
        if (x == null) {
          x = 1;
        }
        if (y == null) {
          y = 1;
        }
        if (z == null) {
          z = 1;
        }
        return this.model.set('transformations/scale', toMatrix.scale3d(x, y, z));
      });

      Tranny.prototype.skew = _.fluent(function(x, y) {
        if (x == null) {
          x = 0;
        }
        if (y == null) {
          y = 0;
        }
        return this.model.set('transformations/skew', util.to3d(toMatrix.skew(_.rad(x), _.rad(y))));
      });

      Tranny.prototype.translate3d = _.fluent(function(x, y, z) {
        if (x == null) {
          x = 0;
        }
        if (y == null) {
          y = 0;
        }
        if (z == null) {
          z = 0;
        }
        return this.model.set('transformations/translate', toMatrix.translate3d(x, y, z));
      });

      return Tranny;

    })();
  };

  umd = function(name, factory) {
    if (typeof exports === 'object') {
      return module.exports = factory(require('matrix-utilities'), require('umodel'), require('transform-to-matrix'));
    } else if (typeof define === 'function' && define.amd) {
      return define(name, ['matrix-utilities', 'umodel', 'transform-to-matrix'], factory);
    } else {
      return this[name] = factory(this['matrix-utilities'], this['umodel'], this['transform-to-matrix']);
    }
  };

  umd('Tranny', wrap);

}).call(this);
