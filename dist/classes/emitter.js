"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("./common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Emitter = /*#__PURE__*/function (_Common) {
  _inherits(Emitter, _Common);

  var _super = _createSuper(Emitter);

  function Emitter(emitter) {
    var _this;

    _classCallCheck(this, Emitter);

    _this = _super.call(this);
    _this.name = emitter ? emitter.name : '';
    _this.street_number = emitter ? emitter.street_number : '';
    _this.street_name = emitter ? emitter.street_name : '';
    _this.zip_code = emitter ? emitter.zip_code : '';
    _this.city = emitter ? emitter.city : '';
    _this.phone = emitter ? emitter.phone : '';
    _this.mail = emitter ? emitter.mail : '';
    _this.website = emitter ? emitter.website : '';

    _this.hydrate(emitter, _this._itemsToHydrate());

    return _this;
  }

  _createClass(Emitter, [{
    key: "_itemsToHydrate",
    value: function _itemsToHydrate() {
      return ['name', 'street_number', 'street_name', 'zip_code', 'city', 'country', 'phone', 'mail', 'website'];
    }
  }, {
    key: "name",
    get: function get() {
      return this._company_name;
    },
    set: function set(value) {
      this._company_name = value;
    }
  }, {
    key: "street_number",
    get: function get() {
      return this._street_number;
    },
    set: function set(value) {
      this._street_number = value;
    }
  }, {
    key: "street_name",
    get: function get() {
      return this._street_name;
    },
    set: function set(value) {
      this._street_name = value;
    }
  }, {
    key: "zip_code",
    get: function get() {
      return this._zip_code;
    },
    set: function set(value) {
      this._zip_code = value;
    }
  }, {
    key: "city",
    get: function get() {
      return this._city;
    },
    set: function set(value) {
      this._city = value;
    }
  }, {
    key: "country",
    get: function get() {
      return this._country;
    },
    set: function set(value) {
      this._country = value;
    }
  }, {
    key: "phone",
    get: function get() {
      return this._phone;
    },
    set: function set(value) {
      this._phone = value;
    }
  }, {
    key: "mail",
    get: function get() {
      return this._mail;
    },
    set: function set(value) {
      this._mail = value;
    }
  }, {
    key: "website",
    get: function get() {
      return this._website;
    },
    set: function set(value) {
      this._website = value;
    }
  }]);

  return Emitter;
}(_common["default"]);

exports["default"] = Emitter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL2VtaXR0ZXIuanMiXSwibmFtZXMiOlsiRW1pdHRlciIsImVtaXR0ZXIiLCJuYW1lIiwic3RyZWV0X251bWJlciIsInN0cmVldF9uYW1lIiwiemlwX2NvZGUiLCJjaXR5IiwicGhvbmUiLCJtYWlsIiwid2Vic2l0ZSIsImh5ZHJhdGUiLCJfaXRlbXNUb0h5ZHJhdGUiLCJfY29tcGFueV9uYW1lIiwidmFsdWUiLCJfc3RyZWV0X251bWJlciIsIl9zdHJlZXRfbmFtZSIsIl96aXBfY29kZSIsIl9jaXR5IiwiX2NvdW50cnkiLCJfcGhvbmUiLCJfbWFpbCIsIl93ZWJzaXRlIiwiQ29tbW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7OztBQUNuQixtQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUNuQjtBQUNBLFVBQUtDLElBQUwsR0FBYUQsT0FBRCxHQUFZQSxPQUFPLENBQUNDLElBQXBCLEdBQTJCLEVBQXZDO0FBQ0EsVUFBS0MsYUFBTCxHQUFzQkYsT0FBRCxHQUFZQSxPQUFPLENBQUNFLGFBQXBCLEdBQW9DLEVBQXpEO0FBQ0EsVUFBS0MsV0FBTCxHQUFvQkgsT0FBRCxHQUFZQSxPQUFPLENBQUNHLFdBQXBCLEdBQWtDLEVBQXJEO0FBQ0EsVUFBS0MsUUFBTCxHQUFpQkosT0FBRCxHQUFZQSxPQUFPLENBQUNJLFFBQXBCLEdBQStCLEVBQS9DO0FBQ0EsVUFBS0MsSUFBTCxHQUFhTCxPQUFELEdBQVlBLE9BQU8sQ0FBQ0ssSUFBcEIsR0FBMkIsRUFBdkM7QUFDQSxVQUFLQyxLQUFMLEdBQWNOLE9BQUQsR0FBWUEsT0FBTyxDQUFDTSxLQUFwQixHQUE0QixFQUF6QztBQUNBLFVBQUtDLElBQUwsR0FBYVAsT0FBRCxHQUFZQSxPQUFPLENBQUNPLElBQXBCLEdBQTJCLEVBQXZDO0FBQ0EsVUFBS0MsT0FBTCxHQUFnQlIsT0FBRCxHQUFZQSxPQUFPLENBQUNRLE9BQXBCLEdBQThCLEVBQTdDOztBQUNBLFVBQUtDLE9BQUwsQ0FBYVQsT0FBYixFQUFzQixNQUFLVSxlQUFMLEVBQXRCOztBQVZtQjtBQVdwQjs7OztzQ0EwRWlCO0FBQ2hCLGFBQU8sQ0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixhQUExQixFQUF5QyxVQUF6QyxFQUFxRCxNQUFyRCxFQUE2RCxTQUE3RCxFQUF3RSxPQUF4RSxFQUFpRixNQUFqRixFQUF5RixTQUF6RixDQUFQO0FBQ0Q7Ozt3QkExRVU7QUFDVCxhQUFPLEtBQUtDLGFBQVo7QUFDRCxLO3NCQUVRQyxLLEVBQU87QUFDZCxXQUFLRCxhQUFMLEdBQXFCQyxLQUFyQjtBQUNEOzs7d0JBRW1CO0FBQ2xCLGFBQU8sS0FBS0MsY0FBWjtBQUNELEs7c0JBRWlCRCxLLEVBQU87QUFDdkIsV0FBS0MsY0FBTCxHQUFzQkQsS0FBdEI7QUFDRDs7O3dCQUVpQjtBQUNoQixhQUFPLEtBQUtFLFlBQVo7QUFDRCxLO3NCQUVlRixLLEVBQU87QUFDckIsV0FBS0UsWUFBTCxHQUFvQkYsS0FBcEI7QUFDRDs7O3dCQUVjO0FBQ2IsYUFBTyxLQUFLRyxTQUFaO0FBQ0QsSztzQkFFWUgsSyxFQUFPO0FBQ2xCLFdBQUtHLFNBQUwsR0FBaUJILEtBQWpCO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU8sS0FBS0ksS0FBWjtBQUNELEs7c0JBRVFKLEssRUFBTztBQUNkLFdBQUtJLEtBQUwsR0FBYUosS0FBYjtBQUNEOzs7d0JBRWE7QUFDWixhQUFPLEtBQUtLLFFBQVo7QUFDRCxLO3NCQUVXTCxLLEVBQU87QUFDakIsV0FBS0ssUUFBTCxHQUFnQkwsS0FBaEI7QUFDRDs7O3dCQUVXO0FBQ1YsYUFBTyxLQUFLTSxNQUFaO0FBQ0QsSztzQkFFU04sSyxFQUFPO0FBQ2YsV0FBS00sTUFBTCxHQUFjTixLQUFkO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU8sS0FBS08sS0FBWjtBQUNELEs7c0JBRVFQLEssRUFBTztBQUNkLFdBQUtPLEtBQUwsR0FBYVAsS0FBYjtBQUNEOzs7d0JBRWE7QUFDWixhQUFPLEtBQUtRLFFBQVo7QUFDRCxLO3NCQUVXUixLLEVBQU87QUFDakIsV0FBS1EsUUFBTCxHQUFnQlIsS0FBaEI7QUFDRDs7OztFQXBGa0NTLGtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIgZXh0ZW5kcyBDb21tb24ge1xuICBjb25zdHJ1Y3RvcihlbWl0dGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSAoZW1pdHRlcikgPyBlbWl0dGVyLm5hbWUgOiAnJztcbiAgICB0aGlzLnN0cmVldF9udW1iZXIgPSAoZW1pdHRlcikgPyBlbWl0dGVyLnN0cmVldF9udW1iZXIgOiAnJztcbiAgICB0aGlzLnN0cmVldF9uYW1lID0gKGVtaXR0ZXIpID8gZW1pdHRlci5zdHJlZXRfbmFtZSA6ICcnO1xuICAgIHRoaXMuemlwX2NvZGUgPSAoZW1pdHRlcikgPyBlbWl0dGVyLnppcF9jb2RlIDogJyc7XG4gICAgdGhpcy5jaXR5ID0gKGVtaXR0ZXIpID8gZW1pdHRlci5jaXR5IDogJyc7XG4gICAgdGhpcy5waG9uZSA9IChlbWl0dGVyKSA/IGVtaXR0ZXIucGhvbmUgOiAnJztcbiAgICB0aGlzLm1haWwgPSAoZW1pdHRlcikgPyBlbWl0dGVyLm1haWwgOiAnJztcbiAgICB0aGlzLndlYnNpdGUgPSAoZW1pdHRlcikgPyBlbWl0dGVyLndlYnNpdGUgOiAnJztcbiAgICB0aGlzLmh5ZHJhdGUoZW1pdHRlciwgdGhpcy5faXRlbXNUb0h5ZHJhdGUoKSk7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFueV9uYW1lO1xuICB9XG5cbiAgc2V0IG5hbWUodmFsdWUpIHtcbiAgICB0aGlzLl9jb21wYW55X25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBzdHJlZXRfbnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlZXRfbnVtYmVyO1xuICB9XG5cbiAgc2V0IHN0cmVldF9udW1iZXIodmFsdWUpIHtcbiAgICB0aGlzLl9zdHJlZXRfbnVtYmVyID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RyZWV0X25hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmVldF9uYW1lO1xuICB9XG5cbiAgc2V0IHN0cmVldF9uYW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fc3RyZWV0X25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB6aXBfY29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5femlwX2NvZGU7XG4gIH1cblxuICBzZXQgemlwX2NvZGUodmFsdWUpIHtcbiAgICB0aGlzLl96aXBfY29kZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NpdHk7XG4gIH1cblxuICBzZXQgY2l0eSh2YWx1ZSkge1xuICAgIHRoaXMuX2NpdHkgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjb3VudHJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudHJ5O1xuICB9XG5cbiAgc2V0IGNvdW50cnkodmFsdWUpIHtcbiAgICB0aGlzLl9jb3VudHJ5ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGhvbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bob25lO1xuICB9XG5cbiAgc2V0IHBob25lKHZhbHVlKSB7XG4gICAgdGhpcy5fcGhvbmUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBtYWlsKCkge1xuICAgIHJldHVybiB0aGlzLl9tYWlsO1xuICB9XG5cbiAgc2V0IG1haWwodmFsdWUpIHtcbiAgICB0aGlzLl9tYWlsID0gdmFsdWU7XG4gIH1cblxuICBnZXQgd2Vic2l0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2Vic2l0ZTtcbiAgfVxuXG4gIHNldCB3ZWJzaXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fd2Vic2l0ZSA9IHZhbHVlO1xuICB9XG5cbiAgX2l0ZW1zVG9IeWRyYXRlKCkge1xuICAgIHJldHVybiBbJ25hbWUnLCAnc3RyZWV0X251bWJlcicsICdzdHJlZXRfbmFtZScsICd6aXBfY29kZScsICdjaXR5JywgJ2NvdW50cnknLCAncGhvbmUnLCAnbWFpbCcsICd3ZWJzaXRlJ107XG4gIH1cbn1cbiJdfQ==