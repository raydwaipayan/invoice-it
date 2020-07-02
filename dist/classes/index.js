"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonOverride = _interopRequireDefault(require("json-override"));

var _generator = _interopRequireDefault(require("./generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configuration;
var _default = {
  /**
   * @description Configure invoiceIt with object config
   * @param config
   */
  configure: function configure(config) {
    return configuration = (0, _jsonOverride["default"])(configuration, config);
  },

  /**
   * @description Generate invoiceIt with configuration
   * @param emitter
   * @param recipient
   * @returns {Generator}
   */
  create: function create(recipient, emitter) {
    var generator = new _generator["default"](configuration);
    generator.recipient(recipient);
    generator.emitter(emitter);
    return generator;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvbmZpZ3VyYXRpb24iLCJjb25maWd1cmUiLCJjb25maWciLCJjcmVhdGUiLCJyZWNpcGllbnQiLCJlbWl0dGVyIiwiZ2VuZXJhdG9yIiwiR2VuZXJhdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxhQUFKO2VBRWU7QUFFYjs7OztBQUlBQyxFQUFBQSxTQUFTLEVBQUUsbUJBQUNDLE1BQUQ7QUFBQSxXQUFZRixhQUFhLEdBQUcsOEJBQWFBLGFBQWIsRUFBNEJFLE1BQTVCLENBQTVCO0FBQUEsR0FORTs7QUFRYjs7Ozs7O0FBTUFDLEVBQUFBLE1BQU0sRUFBRSxnQkFBQ0MsU0FBRCxFQUFZQyxPQUFaLEVBQXdCO0FBQzlCLFFBQU1DLFNBQVMsR0FBRyxJQUFJQyxxQkFBSixDQUFjUCxhQUFkLENBQWxCO0FBQ0FNLElBQUFBLFNBQVMsQ0FBQ0YsU0FBVixDQUFvQkEsU0FBcEI7QUFDQUUsSUFBQUEsU0FBUyxDQUFDRCxPQUFWLENBQWtCQSxPQUFsQjtBQUNBLFdBQU9DLFNBQVA7QUFDRDtBQW5CWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGpzb25PdmVycmlkZSBmcm9tICdqc29uLW92ZXJyaWRlJztcbmltcG9ydCBHZW5lcmF0b3IgZnJvbSAnLi9nZW5lcmF0b3InO1xuXG5sZXQgY29uZmlndXJhdGlvbjtcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQ29uZmlndXJlIGludm9pY2VJdCB3aXRoIG9iamVjdCBjb25maWdcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uZmlndXJlOiAoY29uZmlnKSA9PiBjb25maWd1cmF0aW9uID0ganNvbk92ZXJyaWRlKGNvbmZpZ3VyYXRpb24sIGNvbmZpZyksXG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBpbnZvaWNlSXQgd2l0aCBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSBlbWl0dGVyXG4gICAqIEBwYXJhbSByZWNpcGllbnRcbiAgICogQHJldHVybnMge0dlbmVyYXRvcn1cbiAgICovXG4gIGNyZWF0ZTogKHJlY2lwaWVudCwgZW1pdHRlcikgPT4ge1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3IoY29uZmlndXJhdGlvbik7XG4gICAgZ2VuZXJhdG9yLnJlY2lwaWVudChyZWNpcGllbnQpO1xuICAgIGdlbmVyYXRvci5lbWl0dGVyKGVtaXR0ZXIpO1xuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH0sXG5cbn07XG4iXX0=