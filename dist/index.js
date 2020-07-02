"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classes = _interopRequireDefault(require("./classes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_classes["default"].configure({
  emitter: {
    name: 'Your company',
    street_number: '10',
    street_name: 'wall street',
    zip_code: '77340',
    city: 'New York',
    phone: '01 00 00 00 00',
    mail: 'contact@website.com',
    website: 'www.website.com'
  },
  global: {
    logo: 'http://placehold.it/230x70&text=logo',
    order_reference_pattern: '$prefix{OR}$date{YYMM}$separator{-}$id{00000}',
    invoice_reference_pattern: '$prefix{IN}$date{YYMM}$separator{-}$id{00000}',
    order_template: "".concat(__dirname, "/../static/order.pug"),
    order_note: '',
    invoice_template: "".concat(__dirname, "/../static/invoice.pug"),
    invoice_note: '',
    date: new Date(),
    date_format: 'DD/MM/YYYY',
    lang: 'en'
  }
});

var _default = _classes["default"];
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0b3IiLCJjb25maWd1cmUiLCJlbWl0dGVyIiwibmFtZSIsInN0cmVldF9udW1iZXIiLCJzdHJlZXRfbmFtZSIsInppcF9jb2RlIiwiY2l0eSIsInBob25lIiwibWFpbCIsIndlYnNpdGUiLCJnbG9iYWwiLCJsb2dvIiwib3JkZXJfcmVmZXJlbmNlX3BhdHRlcm4iLCJpbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuIiwib3JkZXJfdGVtcGxhdGUiLCJfX2Rpcm5hbWUiLCJvcmRlcl9ub3RlIiwiaW52b2ljZV90ZW1wbGF0ZSIsImludm9pY2Vfbm90ZSIsImRhdGUiLCJEYXRlIiwiZGF0ZV9mb3JtYXQiLCJsYW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQUEsb0JBQVVDLFNBQVYsQ0FBb0I7QUFDbEJDLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxJQUFJLEVBQUUsY0FEQztBQUVQQyxJQUFBQSxhQUFhLEVBQUUsSUFGUjtBQUdQQyxJQUFBQSxXQUFXLEVBQUUsYUFITjtBQUlQQyxJQUFBQSxRQUFRLEVBQUUsT0FKSDtBQUtQQyxJQUFBQSxJQUFJLEVBQUUsVUFMQztBQU1QQyxJQUFBQSxLQUFLLEVBQUUsZ0JBTkE7QUFPUEMsSUFBQUEsSUFBSSxFQUFFLHFCQVBDO0FBUVBDLElBQUFBLE9BQU8sRUFBRTtBQVJGLEdBRFM7QUFXbEJDLEVBQUFBLE1BQU0sRUFBRTtBQUNOQyxJQUFBQSxJQUFJLEVBQUUsc0NBREE7QUFFTkMsSUFBQUEsdUJBQXVCLEVBQUUsK0NBRm5CO0FBR05DLElBQUFBLHlCQUF5QixFQUFFLCtDQUhyQjtBQUlOQyxJQUFBQSxjQUFjLFlBQUtDLFNBQUwseUJBSlI7QUFLTkMsSUFBQUEsVUFBVSxFQUFFLEVBTE47QUFNTkMsSUFBQUEsZ0JBQWdCLFlBQUtGLFNBQUwsMkJBTlY7QUFPTkcsSUFBQUEsWUFBWSxFQUFFLEVBUFI7QUFRTkMsSUFBQUEsSUFBSSxFQUFFLElBQUlDLElBQUosRUFSQTtBQVNOQyxJQUFBQSxXQUFXLEVBQUUsWUFUUDtBQVVOQyxJQUFBQSxJQUFJLEVBQUU7QUFWQTtBQVhVLENBQXBCOztlQXlCZXZCLG1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdlbmVyYXRvciBmcm9tICcuL2NsYXNzZXMnO1xuXG5nZW5lcmF0b3IuY29uZmlndXJlKHtcbiAgZW1pdHRlcjoge1xuICAgIG5hbWU6ICdZb3VyIGNvbXBhbnknLFxuICAgIHN0cmVldF9udW1iZXI6ICcxMCcsXG4gICAgc3RyZWV0X25hbWU6ICd3YWxsIHN0cmVldCcsXG4gICAgemlwX2NvZGU6ICc3NzM0MCcsXG4gICAgY2l0eTogJ05ldyBZb3JrJyxcbiAgICBwaG9uZTogJzAxIDAwIDAwIDAwIDAwJyxcbiAgICBtYWlsOiAnY29udGFjdEB3ZWJzaXRlLmNvbScsXG4gICAgd2Vic2l0ZTogJ3d3dy53ZWJzaXRlLmNvbScsXG4gIH0sXG4gIGdsb2JhbDoge1xuICAgIGxvZ286ICdodHRwOi8vcGxhY2Vob2xkLml0LzIzMHg3MCZ0ZXh0PWxvZ28nLFxuICAgIG9yZGVyX3JlZmVyZW5jZV9wYXR0ZXJuOiAnJHByZWZpeHtPUn0kZGF0ZXtZWU1NfSRzZXBhcmF0b3J7LX0kaWR7MDAwMDB9JyxcbiAgICBpbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuOiAnJHByZWZpeHtJTn0kZGF0ZXtZWU1NfSRzZXBhcmF0b3J7LX0kaWR7MDAwMDB9JyxcbiAgICBvcmRlcl90ZW1wbGF0ZTogYCR7X19kaXJuYW1lfS8uLi9zdGF0aWMvb3JkZXIucHVnYCxcbiAgICBvcmRlcl9ub3RlOiAnJyxcbiAgICBpbnZvaWNlX3RlbXBsYXRlOiBgJHtfX2Rpcm5hbWV9Ly4uL3N0YXRpYy9pbnZvaWNlLnB1Z2AsXG4gICAgaW52b2ljZV9ub3RlOiAnJyxcbiAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgIGRhdGVfZm9ybWF0OiAnREQvTU0vWVlZWScsXG4gICAgbGFuZzogJ2VuJyxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0b3I7XG4iXX0=