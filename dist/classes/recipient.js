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

var Recipient = /*#__PURE__*/function (_Common) {
  _inherits(Recipient, _Common);

  var _super = _createSuper(Recipient);

  function Recipient(recipient) {
    var _this;

    _classCallCheck(this, Recipient);

    _this = _super.call(this);

    _this.hydrate(recipient, _this._itemsToHydrate());

    return _this;
  }

  _createClass(Recipient, [{
    key: "_itemsToHydrate",
    value: function _itemsToHydrate() {
      return ['company_name', 'first_name', 'last_name', 'street_number', 'street_name', 'zip_code', 'city', 'country', 'phone', 'mail'];
    }
  }, {
    key: "company_name",
    get: function get() {
      return this._company_name;
    },
    set: function set(value) {
      this._company_name = value;
    }
  }, {
    key: "first_name",
    get: function get() {
      return this._first_name;
    },
    set: function set(value) {
      this._first_name = value;
    }
  }, {
    key: "last_name",
    get: function get() {
      return this._last_name;
    },
    set: function set(value) {
      this._last_name = value;
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
  }]);

  return Recipient;
}(_common["default"]);

exports["default"] = Recipient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL3JlY2lwaWVudC5qcyJdLCJuYW1lcyI6WyJSZWNpcGllbnQiLCJyZWNpcGllbnQiLCJoeWRyYXRlIiwiX2l0ZW1zVG9IeWRyYXRlIiwiX2NvbXBhbnlfbmFtZSIsInZhbHVlIiwiX2ZpcnN0X25hbWUiLCJfbGFzdF9uYW1lIiwiX3N0cmVldF9udW1iZXIiLCJfc3RyZWV0X25hbWUiLCJfemlwX2NvZGUiLCJfY2l0eSIsIl9jb3VudHJ5IiwiX3Bob25lIiwiX21haWwiLCJDb21tb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7O0FBQ25CLHFCQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQUE7O0FBQ3JCOztBQUNBLFVBQUtDLE9BQUwsQ0FBYUQsU0FBYixFQUF3QixNQUFLRSxlQUFMLEVBQXhCOztBQUZxQjtBQUd0Qjs7OztzQ0FrRmlCO0FBQ2hCLGFBQU8sQ0FBQyxjQUFELEVBQWlCLFlBQWpCLEVBQStCLFdBQS9CLEVBQTRDLGVBQTVDLEVBQTZELGFBQTdELEVBQTRFLFVBQTVFLEVBQXdGLE1BQXhGLEVBQWdHLFNBQWhHLEVBQTJHLE9BQTNHLEVBQW9ILE1BQXBILENBQVA7QUFDRDs7O3dCQWxGa0I7QUFDakIsYUFBTyxLQUFLQyxhQUFaO0FBQ0QsSztzQkFFZ0JDLEssRUFBTztBQUN0QixXQUFLRCxhQUFMLEdBQXFCQyxLQUFyQjtBQUNEOzs7d0JBRWdCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0QsSztzQkFFY0QsSyxFQUFPO0FBQ3BCLFdBQUtDLFdBQUwsR0FBbUJELEtBQW5CO0FBQ0Q7Ozt3QkFFZTtBQUNkLGFBQU8sS0FBS0UsVUFBWjtBQUNELEs7c0JBRWFGLEssRUFBTztBQUNuQixXQUFLRSxVQUFMLEdBQWtCRixLQUFsQjtBQUNEOzs7d0JBRW1CO0FBQ2xCLGFBQU8sS0FBS0csY0FBWjtBQUNELEs7c0JBRWlCSCxLLEVBQU87QUFDdkIsV0FBS0csY0FBTCxHQUFzQkgsS0FBdEI7QUFDRDs7O3dCQUVpQjtBQUNoQixhQUFPLEtBQUtJLFlBQVo7QUFDRCxLO3NCQUVlSixLLEVBQU87QUFDckIsV0FBS0ksWUFBTCxHQUFvQkosS0FBcEI7QUFDRDs7O3dCQUVjO0FBQ2IsYUFBTyxLQUFLSyxTQUFaO0FBQ0QsSztzQkFFWUwsSyxFQUFPO0FBQ2xCLFdBQUtLLFNBQUwsR0FBaUJMLEtBQWpCO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU8sS0FBS00sS0FBWjtBQUNELEs7c0JBRVFOLEssRUFBTztBQUNkLFdBQUtNLEtBQUwsR0FBYU4sS0FBYjtBQUNEOzs7d0JBRWE7QUFDWixhQUFPLEtBQUtPLFFBQVo7QUFDRCxLO3NCQUVXUCxLLEVBQU87QUFDakIsV0FBS08sUUFBTCxHQUFnQlAsS0FBaEI7QUFDRDs7O3dCQUVXO0FBQ1YsYUFBTyxLQUFLUSxNQUFaO0FBQ0QsSztzQkFFU1IsSyxFQUFPO0FBQ2YsV0FBS1EsTUFBTCxHQUFjUixLQUFkO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU8sS0FBS1MsS0FBWjtBQUNELEs7c0JBRVFULEssRUFBTztBQUNkLFdBQUtTLEtBQUwsR0FBYVQsS0FBYjtBQUNEOzs7O0VBcEZvQ1Usa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uIGZyb20gJy4vY29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaXBpZW50IGV4dGVuZHMgQ29tbW9uIHtcbiAgY29uc3RydWN0b3IocmVjaXBpZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmh5ZHJhdGUocmVjaXBpZW50LCB0aGlzLl9pdGVtc1RvSHlkcmF0ZSgpKTtcbiAgfVxuXG4gIGdldCBjb21wYW55X25hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlfbmFtZTtcbiAgfVxuXG4gIHNldCBjb21wYW55X25hbWUodmFsdWUpIHtcbiAgICB0aGlzLl9jb21wYW55X25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBmaXJzdF9uYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9maXJzdF9uYW1lO1xuICB9XG5cbiAgc2V0IGZpcnN0X25hbWUodmFsdWUpIHtcbiAgICB0aGlzLl9maXJzdF9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbGFzdF9uYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9sYXN0X25hbWU7XG4gIH1cblxuICBzZXQgbGFzdF9uYW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fbGFzdF9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RyZWV0X251bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyZWV0X251bWJlcjtcbiAgfVxuXG4gIHNldCBzdHJlZXRfbnVtYmVyKHZhbHVlKSB7XG4gICAgdGhpcy5fc3RyZWV0X251bWJlciA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0cmVldF9uYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlZXRfbmFtZTtcbiAgfVxuXG4gIHNldCBzdHJlZXRfbmFtZSh2YWx1ZSkge1xuICAgIHRoaXMuX3N0cmVldF9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBnZXQgemlwX2NvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ppcF9jb2RlO1xuICB9XG5cbiAgc2V0IHppcF9jb2RlKHZhbHVlKSB7XG4gICAgdGhpcy5femlwX2NvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9jaXR5O1xuICB9XG5cbiAgc2V0IGNpdHkodmFsdWUpIHtcbiAgICB0aGlzLl9jaXR5ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY291bnRyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY291bnRyeTtcbiAgfVxuXG4gIHNldCBjb3VudHJ5KHZhbHVlKSB7XG4gICAgdGhpcy5fY291bnRyeSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBob25lKCkge1xuICAgIHJldHVybiB0aGlzLl9waG9uZTtcbiAgfVxuXG4gIHNldCBwaG9uZSh2YWx1ZSkge1xuICAgIHRoaXMuX3Bob25lID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbWFpbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFpbDtcbiAgfVxuXG4gIHNldCBtYWlsKHZhbHVlKSB7XG4gICAgdGhpcy5fbWFpbCA9IHZhbHVlO1xuICB9XG5cbiAgX2l0ZW1zVG9IeWRyYXRlKCkge1xuICAgIHJldHVybiBbJ2NvbXBhbnlfbmFtZScsICdmaXJzdF9uYW1lJywgJ2xhc3RfbmFtZScsICdzdHJlZXRfbnVtYmVyJywgJ3N0cmVldF9uYW1lJywgJ3ppcF9jb2RlJywgJ2NpdHknLCAnY291bnRyeScsICdwaG9uZScsICdtYWlsJ107XG4gIH1cbn1cbiJdfQ==