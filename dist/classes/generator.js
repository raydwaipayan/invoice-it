"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _pug = _interopRequireDefault(require("pug"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _htmlPdf = _interopRequireDefault(require("html-pdf"));

var _common = _interopRequireDefault(require("./common"));

var _recipient = _interopRequireDefault(require("./recipient"));

var _emitter = _interopRequireDefault(require("./emitter"));

var _i18n = _interopRequireDefault(require("../lib/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Generator = /*#__PURE__*/function (_Common) {
  _inherits(Generator, _Common);

  var _super = _createSuper(Generator);

  function Generator(config) {
    var _this;

    _classCallCheck(this, Generator);

    _this = _super.call(this);
    _this._recipient = config.recipient ? new _recipient["default"](config.recipient) : new _recipient["default"]();
    _this._emitter = config.emitter ? new _emitter["default"](config.emitter) : new _emitter["default"]();
    _this._total_exc_taxes = 0;
    _this._total_taxes = 0;
    _this._total_inc_taxes = 0;
    _this._article = [];

    _this._i18nConfigure(config.language);

    _this.hydrate(config.global, _this._itemsToHydrate());

    return _this;
  }

  _createClass(Generator, [{
    key: "deleteArticles",

    /**
     * @description Reinitialize article attribute
     */
    value: function deleteArticles() {
      this._total_inc_taxes = 0;
      this._total_taxes = 0;
      this._total_exc_taxes = 0;
      this._article = [];
    }
    /**
     * @description Check article structure and data
     * @param article
     * @private
     */

  }, {
    key: "_checkArticle",
    value: function _checkArticle(article) {
      if (!Object.prototype.hasOwnProperty.call(article, 'description')) throw new Error('Description attribute is missing');
      if (!Object.prototype.hasOwnProperty.call(article, 'tax')) throw new Error('Tax attribute is missing');
      if (!this.isNumeric(article.tax)) throw new Error('Tax attribute have to be a number');
      if (!Object.prototype.hasOwnProperty.call(article, 'price')) throw new Error('Price attribute is missing');
      if (!this.isNumeric(article.price)) throw new Error('Price attribute have to be a number');
      if (!Object.prototype.hasOwnProperty.call(article, 'qt')) throw new Error('Qt attribute is missing');
      if (!this.isNumeric(article.qt)) throw new Error('Qt attribute have to be an integer');
      if (!Number.isInteger(article.qt)) throw new Error('Qt attribute have to be an integer, not a float');
    }
    /**
     * @description Hydrate from configuration
     * @returns {[string,string,string,string]}
     */

  }, {
    key: "_itemsToHydrate",
    value: function _itemsToHydrate() {
      return ['logo', 'order_template', 'invoice_template', 'date_format', 'date', 'order_reference_pattern', 'invoice_reference_pattern', 'order_note', 'invoice_note', 'lang', 'footer'];
    }
    /**
     * @description Hydrate recipient object
     * @param obj
     * @returns {*}
     */

  }, {
    key: "recipient",
    value: function recipient(obj) {
      if (!obj) return this._recipient;
      return this._recipient.hydrate(obj, this._recipient._itemsToHydrate());
    }
    /**
     * @description Hydrate emitter object
     * @param obj
     * @returns {*}
     */

  }, {
    key: "emitter",
    value: function emitter(obj) {
      if (!obj) return this._emitter;
      return this._emitter.hydrate(obj, this._emitter._itemsToHydrate());
    }
    /**
     * @description Precompile translation to merging glabal with custom translations
     * @returns {{logo: *, header_date: *, table_information, table_description, table_tax, table_quantity,
     * table_price_without_taxes, table_price_without_taxes_unit, table_note, table_total_without_taxes,
     * table_total_taxes, table_total_with_taxes, fromto_phone, fromto_mail, footer, moment: (*|moment.Moment)}}
     * @private
     */

  }, {
    key: "_preCompileCommonTranslations",
    value: function _preCompileCommonTranslations() {
      return {
        logo: this.logo,
        header_date: this.date,
        table_information: _i18n["default"].__({
          phrase: 'table_information',
          locale: this.lang
        }),
        table_description: _i18n["default"].__({
          phrase: 'table_description',
          locale: this.lang
        }),
        table_tax: _i18n["default"].__({
          phrase: 'table_tax',
          locale: this.lang
        }),
        table_quantity: _i18n["default"].__({
          phrase: 'table_quantity',
          locale: this.lang
        }),
        table_price_without_taxes: _i18n["default"].__({
          phrase: 'table_price_without_taxes',
          locale: this.lang
        }),
        table_price_without_taxes_unit: _i18n["default"].__({
          phrase: 'table_price_without_taxes_unit',
          locale: this.lang
        }),
        table_note: _i18n["default"].__({
          phrase: 'table_note',
          locale: this.lang
        }),
        table_total_without_taxes: _i18n["default"].__({
          phrase: 'table_total_without_taxes',
          locale: this.lang
        }),
        table_total_taxes: _i18n["default"].__({
          phrase: 'table_total_taxes',
          locale: this.lang
        }),
        table_total_with_taxes: _i18n["default"].__({
          phrase: 'table_total_with_taxes',
          locale: this.lang
        }),
        fromto_phone: _i18n["default"].__({
          phrase: 'fromto_phone',
          locale: this.lang
        }),
        fromto_mail: _i18n["default"].__({
          phrase: 'fromto_mail',
          locale: this.lang
        }),
        fromto_website: _i18n["default"].__({
          phrase: 'fromto_website',
          locale: this.lang
        }),
        footer: this.getFooter(),
        emitter_name: this.emitter().name,
        emitter_street_number: this.emitter().street_number,
        emitter_street_name: this.emitter().street_name,
        emitter_zip_code: this.emitter().zip_code,
        emitter_city: this.emitter().city,
        emitter_country: this.emitter().country,
        emitter_phone: this.emitter().phone,
        emitter_mail: this.emitter().mail,
        emitter_website: this.emitter().website,
        recipient_company: this.recipient().company_name,
        recipient_first_name: this.recipient().first_name,
        recipient_last_name: this.recipient().last_name,
        recipient_street_number: this.recipient().street_number,
        recipient_street_name: this.recipient().street_name,
        recipient_zip_code: this.recipient().zip_code,
        recipient_city: this.recipient().city,
        recipient_country: this.recipient().country,
        recipient_phone: this.recipient().phone,
        recipient_mail: this.recipient().mail,
        articles: this.article,
        table_total_without_taxes_value: this.formatOutputNumber(this.total_exc_taxes),
        table_total_taxes_value: this.formatOutputNumber(this.total_taxes),
        table_total_with_taxes_value: this.formatOutputNumber(this.total_inc_taxes),
        template_configuration: this._templateConfiguration(),
        moment: (0, _moment["default"])()
      };
    }
    /**
     * @description Compile pug template to HTML
     * @param keys
     * @returns {*}
     * @private
     */

  }, {
    key: "_compile",
    value: function _compile(keys) {
      var template = keys.filename === 'order' ? this.order_template : this.invoice_template;

      var compiled = _pug["default"].compileFile(_path["default"].resolve(template));

      return compiled(keys);
    }
    /**
     * @description Prepare phrases from translations
     * @param type
     */

  }, {
    key: "getPhrases",
    value: function getPhrases(type) {
      return {
        header_title: _i18n["default"].__({
          phrase: "".concat(type, "_header_title"),
          locale: this.lang
        }),
        header_subject: _i18n["default"].__({
          phrase: "".concat(type, "_header_subject"),
          locale: this.lang
        }),
        header_reference: _i18n["default"].__({
          phrase: "".concat(type, "_header_reference"),
          locale: this.lang
        }),
        header_date: _i18n["default"].__({
          phrase: "".concat(type, "_header_date"),
          locale: this.lang
        })
      };
    }
    /**
     * @description Return invoice translation keys object
     * @param params
     * @returns {*}
     */

  }, {
    key: "getInvoice",
    value: function getInvoice() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var keys = {
        invoice_header_title: this.getPhrases('invoice').header_title,
        invoice_header_subject: this.getPhrases('invoice').header_subject,
        invoice_header_reference: this.getPhrases('invoice').header_reference,
        invoice_header_reference_value: this.getReferenceFromPattern('invoice'),
        invoice_header_date: this.getPhrases('invoice').header_date,
        table_note_content: this.invoice_note,
        note: function note(_note) {
          return _note ? _this2.invoice_note = _note : _this2.invoice_note;
        },
        filename: 'invoice'
      };
      params.forEach(function (phrase) {
        if (typeof phrase === 'string') {
          keys[phrase] = _i18n["default"].__({
            phrase: phrase,
            locale: _this2.lang
          });
        } else if (_typeof(phrase) === 'object' && phrase.key && phrase.value) {
          keys[phrase.key] = phrase.value;
        }
      });
      return Object.assign(keys, {
        toHTML: function toHTML() {
          return _this2._toHTML(keys, params);
        },
        toPDF: function toPDF() {
          return _this2._toPDF(keys, params);
        }
      }, this._preCompileCommonTranslations());
    }
    /**
     * @description Return order translation keys object
     * @param params
     * @returns {*}
     */

  }, {
    key: "getOrder",
    value: function getOrder() {
      var _this3 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var keys = {
        order_header_title: this.getPhrases('order').header_title,
        order_header_subject: this.getPhrases('order').header_subject,
        order_header_reference: this.getPhrases('order').header_reference,
        order_header_reference_value: this.getReferenceFromPattern('order'),
        order_header_date: this.getPhrases('order').header_date,
        table_note_content: this.order_note,
        note: function note(_note2) {
          return _note2 ? _this3.order_note = _note2 : _this3.order_note;
        },
        filename: 'order'
      };
      params.forEach(function (phrase) {
        if (typeof phrase === 'string') {
          keys[phrase] = _i18n["default"].__({
            phrase: phrase,
            locale: _this3.lang
          });
        } else if (_typeof(phrase) === 'object' && phrase.key && phrase.value) {
          keys[phrase.key] = phrase.value;
        }
      });
      return Object.assign(keys, {
        toHTML: function toHTML() {
          return _this3._toHTML(keys, params);
        },
        toPDF: function toPDF() {
          return _this3._toPDF(keys, params);
        }
      }, this._preCompileCommonTranslations());
    }
    /**
     * @description Return right footer
     * @returns {*}
     */

  }, {
    key: "getFooter",
    value: function getFooter() {
      if (!this.footer) return _i18n["default"].__({
        phrase: 'footer',
        locale: this.lang
      });
      if (this.lang === 'en') return this.footer.en;
      if (this.lang === 'fr') return this.footer.fr;
      throw Error('This lang doesn\'t exist.');
    }
    /**
     * @description Return reference from pattern
     * @param type
     * @return {*}
     */

  }, {
    key: "getReferenceFromPattern",
    value: function getReferenceFromPattern(type) {
      if (!['order', 'invoice'].includes(type)) throw new Error('Type have to be "order" or "invoice"');
      if (this.reference) return this.reference;
      return this.setReferenceFromPattern(type === 'order' ? this.order_reference_pattern : this.invoice_reference_pattern);
    }
    /**
     * @description Set reference
     * @param pattern
     * @return {*}
     * @private
     * @todo optimize it
     */

  }, {
    key: "setReferenceFromPattern",
    value: function setReferenceFromPattern(pattern) {
      var tmp = pattern.split('$').slice(1);
      var output = ''; // eslint-disable-next-line no-restricted-syntax

      var _iterator = _createForOfIteratorHelper(tmp),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          if (!item.endsWith('}')) throw new Error('Wrong pattern type');
          if (item.startsWith('prefix{')) output += item.replace('prefix{', '').slice(0, -1);else if (item.startsWith('separator{')) output += item.replace('separator{', '').slice(0, -1);else if (item.startsWith('date{')) output += (0, _moment["default"])().format(item.replace('date{', '').slice(0, -1));else if (item.startsWith('id{')) {
            var id = item.replace('id{', '').slice(0, -1);
            if (!/^\d+$/.test(id)) throw new Error("Id must be an integer (".concat(id, ")"));
            output += this._id ? this.pad(this._id, id.length) : this.pad(0, id.length);
          } else throw new Error("".concat(item, " pattern reference unknown"));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return output;
    }
    /**
     * @description Export object with html content and exportation functions
     * @param keys
     * @param params
     * @returns {{html: *, toFile: (function(*): *)}}
     * @private
     */

  }, {
    key: "_toHTML",
    value: function _toHTML(keys) {
      var _this4 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var html = this._compile(keys.filename === 'order' ? this.getOrder(params) : this.getInvoice(params));

      return {
        html: html,
        toFile: function toFile(filepath) {
          return _this4._toFileFromHTML(html, filepath || "".concat(keys.filename, ".html"));
        }
      };
    }
    /**
     * @description Save content to pdf file
     * @param keys
     * @param params
     * @returns {*}
     * @private
     */

  }, {
    key: "_toPDF",
    value: function _toPDF(keys) {
      var _this5 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var pdf = _htmlPdf["default"].create(this._toHTML(keys, params).html, {
        timeout: '90000'
      });

      return {
        pdf: pdf,
        toFile: function toFile(filepath) {
          return _this5._toFileFromPDF(pdf, filepath || "".concat(keys.filename, ".pdf"));
        },
        toBuffer: function toBuffer() {
          return _this5._toBufferFromPDF(pdf);
        },
        toStream: function toStream(filepath) {
          return _this5._toStreamFromPDF(pdf, filepath || "".concat(keys.filename, ".pdf"));
        }
      };
    }
    /**
     * @description Save content into file from toHTML() method
     * @param content
     * @param filepath
     * @returns {Promise}
     * @private
     */

  }, {
    key: "_toFileFromHTML",
    value: function _toFileFromHTML(content, filepath) {
      return new Promise(function (resolve, reject) {
        return _fs["default"].writeFile(filepath, content, function (err) {
          if (err) reject(err);
          return resolve();
        });
      });
    }
    /**
     * @description Save content into file from toPDF() method
     * @param content
     * @param filepath
     * @returns {Promise}
     * @private
     */

  }, {
    key: "_toFileFromPDF",
    value: function _toFileFromPDF(content, filepath) {
      return new Promise(function (resolve, reject) {
        return content.toFile(filepath, function (err, res) {
          if (err) return reject(err);
          return resolve(res);
        });
      });
    }
    /**
     * @description Export PDF to buffer
     * @param content
     * @returns {*}
     * @private
     */

  }, {
    key: "_toBufferFromPDF",
    value: function _toBufferFromPDF(content) {
      return new Promise(function (resolve, reject) {
        return content.toBuffer(function (err, buffer) {
          if (err) return reject(err);
          return resolve(buffer);
        });
      });
    }
    /**
     * @description Export PDF to file using stream
     * @param content
     * @param filepath
     * @returns {*}
     * @private
     */

  }, {
    key: "_toStreamFromPDF",
    value: function _toStreamFromPDF(content, filepath) {
      return content.toStream(function (err, stream) {
        return stream.pipe(_fs["default"].createWriteStream(filepath));
      });
    }
    /**
     * @description Calculates number of pages and items per page
     * @return {{rows_in_first_page: number, rows_in_others_pages: number, loop_table: number}}
     * @private
     */

  }, {
    key: "_templateConfiguration",
    value: function _templateConfiguration() {
      var template_rows_per_page = 29;
      var templateConfig = {
        rows_in_first_page: this.article.length > 19 ? template_rows_per_page : 19,
        rows_per_pages: 43,
        rows_in_last_page: 33
      };
      var nbArticles = this.article.length;
      var loop = 1;

      while (true) {
        if (loop === 1) {
          nbArticles -= templateConfig.rows_in_first_page;

          if (nbArticles <= 0) {
            templateConfig.loop_table = templateConfig.rows_in_first_page !== template_rows_per_page ? 1 : 2;
            return templateConfig;
          }
        }

        if (loop >= 2) {
          if (nbArticles <= templateConfig.rows_in_last_page) {
            templateConfig.loop_table = loop;
            return templateConfig;
          }

          nbArticles -= templateConfig.rows_per_pages;

          if (nbArticles <= 0) {
            templateConfig.loop_table = loop;
            return templateConfig;
          }
        }

        loop += 1;
      }
    }
    /**
     * @description Overrides i18n configuration
     * @param config
     * @private
     */

  }, {
    key: "_i18nConfigure",
    value: function _i18nConfigure(config) {
      this._defaultLocale = config && config.defaultLocale ? config.defaultLocale : 'en';
      this._availableLocale = config && config.locales ? config.locales : ['en', 'fr'];
      if (config) _i18n["default"].configure(config);
    }
  }, {
    key: "template",
    get: function get() {
      return this._template;
    },
    set: function set(value) {
      this._template = value;
    }
  }, {
    key: "lang",
    get: function get() {
      return !this._lang ? this._defaultLocale : this._lang;
    },
    set: function set(value) {
      var tmp = value.toLowerCase();
      if (!this._availableLocale.includes(tmp)) throw new Error("Wrong lang, please set one of ".concat(this._availableLocale.join(', ')));
      this._lang = tmp;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(value) {
      this._id = value;
    }
  }, {
    key: "order_reference_pattern",
    get: function get() {
      return !this._order_reference_pattern ? '$prefix{OR}$date{YYMM}$separator{-}$id{00000}' : this._order_reference_pattern;
    },
    set: function set(value) {
      this._order_reference_pattern = value;
    }
  }, {
    key: "invoice_reference_pattern",
    get: function get() {
      return !this._invoice_reference_pattern ? '$prefix{IN}$date{YYMM}$separator{-}$id{00000}' : this._invoice_reference_pattern;
    },
    set: function set(value) {
      this._invoice_reference_pattern = value;
    }
  }, {
    key: "reference",
    get: function get() {
      return this._reference;
    },
    set: function set(value) {
      this._reference = value;
    }
  }, {
    key: "logo",
    get: function get() {
      return this._logo;
    },
    set: function set(value) {
      this._logo = value;
    }
  }, {
    key: "order_template",
    get: function get() {
      return this._order_template;
    },
    set: function set(value) {
      this._order_template = value;
    }
  }, {
    key: "invoice_template",
    get: function get() {
      return this._invoice_template;
    },
    set: function set(value) {
      this._invoice_template = value;
    }
  }, {
    key: "order_note",
    get: function get() {
      return this._order_note;
    },
    set: function set(value) {
      this._order_note = value;
    }
  }, {
    key: "invoice_note",
    get: function get() {
      return this._invoice_note;
    },
    set: function set(value) {
      this._invoice_note = value;
    }
  }, {
    key: "footer",
    get: function get() {
      return this._footer;
    },
    set: function set(value) {
      this._footer = value;
    }
  }, {
    key: "date_format",
    get: function get() {
      return !this._date_format ? 'YYYY/MM/DD' : this._date_format;
    },
    set: function set(value) {
      this._date_format = value;
    }
  }, {
    key: "date",
    get: function get() {
      return !this._date ? (0, _moment["default"])().format(this.date_format) : this._date;
    },
    set: function set(value) {
      if (!(0, _moment["default"])(value).isValid()) throw new Error('Date not valid');
      this._date = (0, _moment["default"])(value).format(this.date_format);
    }
  }, {
    key: "total_exc_taxes",
    get: function get() {
      return this._total_exc_taxes;
    },
    set: function set(value) {
      this._total_exc_taxes = value;
    }
  }, {
    key: "total_taxes",
    get: function get() {
      return this._total_taxes;
    },
    set: function set(value) {
      this._total_taxes = value;
    }
  }, {
    key: "total_inc_taxes",
    get: function get() {
      return this._total_inc_taxes;
    },
    set: function set(value) {
      this._total_inc_taxes = value;
    }
  }, {
    key: "article",
    get: function get() {
      return this._article;
    }
    /**
     * @description Set
     * @param value
     * @example article({description: 'Licence', tax: 20, price: 100, qt: 1})
     * @example article([
     *  {description: 'Licence', tax: 20, price: 100, qt: 1},
     *  {description: 'Licence', tax: 20, price: 100, qt: 1}
     * ])
     */
    ,
    set: function set(value) {
      var tmp = value;

      if (Array.isArray(tmp)) {
        for (var i = 0; i < tmp.length; i += 1) {
          this._checkArticle(tmp[i]);

          tmp[i].total_product_without_taxes = this.formatOutputNumber(tmp[i].price * tmp[i].qt);
          tmp[i].total_product_taxes = this.formatOutputNumber(this.round(tmp[i].total_product_without_taxes * (tmp[i].tax / 100)));
          tmp[i].total_product_with_taxes = this.formatOutputNumber(this.round(Number(tmp[i].total_product_without_taxes) + Number(tmp[i].total_product_taxes)));
          tmp[i].price = this.formatOutputNumber(tmp[i].price);
          tmp[i].tax = this.formatOutputNumber(tmp[i].tax);
          this.total_exc_taxes += Number(tmp[i].total_product_without_taxes);
          this.total_inc_taxes += Number(tmp[i].total_product_with_taxes);
          this.total_taxes += Number(tmp[i].total_product_taxes);
        }
      } else {
        this._checkArticle(tmp);

        tmp.total_product_without_taxes = this.formatOutputNumber(tmp.price * tmp.qt);
        tmp.total_product_taxes = this.formatOutputNumber(this.round(tmp.total_product_without_taxes * (tmp.tax / 100)));
        tmp.total_product_with_taxes = this.formatOutputNumber(this.round(Number(tmp.total_product_without_taxes) + Number(tmp.total_product_taxes)));
        tmp.price = this.formatOutputNumber(tmp.price);
        tmp.tax = this.formatOutputNumber(tmp.tax);
        this.total_exc_taxes += Number(tmp.total_product_without_taxes);
        this.total_inc_taxes += Number(tmp.total_product_with_taxes);
        this.total_taxes += Number(tmp.total_product_taxes);
      }

      this._article = this._article ? this._article.concat(tmp) : [].concat(tmp);
    }
  }]);

  return Generator;
}(_common["default"]);

exports["default"] = Generator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL2dlbmVyYXRvci5qcyJdLCJuYW1lcyI6WyJHZW5lcmF0b3IiLCJjb25maWciLCJfcmVjaXBpZW50IiwicmVjaXBpZW50IiwiUmVjaXBpZW50IiwiX2VtaXR0ZXIiLCJlbWl0dGVyIiwiRW1pdHRlciIsIl90b3RhbF9leGNfdGF4ZXMiLCJfdG90YWxfdGF4ZXMiLCJfdG90YWxfaW5jX3RheGVzIiwiX2FydGljbGUiLCJfaTE4bkNvbmZpZ3VyZSIsImxhbmd1YWdlIiwiaHlkcmF0ZSIsImdsb2JhbCIsIl9pdGVtc1RvSHlkcmF0ZSIsImFydGljbGUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJFcnJvciIsImlzTnVtZXJpYyIsInRheCIsInByaWNlIiwicXQiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJvYmoiLCJsb2dvIiwiaGVhZGVyX2RhdGUiLCJkYXRlIiwidGFibGVfaW5mb3JtYXRpb24iLCJpMThuIiwiX18iLCJwaHJhc2UiLCJsb2NhbGUiLCJsYW5nIiwidGFibGVfZGVzY3JpcHRpb24iLCJ0YWJsZV90YXgiLCJ0YWJsZV9xdWFudGl0eSIsInRhYmxlX3ByaWNlX3dpdGhvdXRfdGF4ZXMiLCJ0YWJsZV9wcmljZV93aXRob3V0X3RheGVzX3VuaXQiLCJ0YWJsZV9ub3RlIiwidGFibGVfdG90YWxfd2l0aG91dF90YXhlcyIsInRhYmxlX3RvdGFsX3RheGVzIiwidGFibGVfdG90YWxfd2l0aF90YXhlcyIsImZyb210b19waG9uZSIsImZyb210b19tYWlsIiwiZnJvbXRvX3dlYnNpdGUiLCJmb290ZXIiLCJnZXRGb290ZXIiLCJlbWl0dGVyX25hbWUiLCJuYW1lIiwiZW1pdHRlcl9zdHJlZXRfbnVtYmVyIiwic3RyZWV0X251bWJlciIsImVtaXR0ZXJfc3RyZWV0X25hbWUiLCJzdHJlZXRfbmFtZSIsImVtaXR0ZXJfemlwX2NvZGUiLCJ6aXBfY29kZSIsImVtaXR0ZXJfY2l0eSIsImNpdHkiLCJlbWl0dGVyX2NvdW50cnkiLCJjb3VudHJ5IiwiZW1pdHRlcl9waG9uZSIsInBob25lIiwiZW1pdHRlcl9tYWlsIiwibWFpbCIsImVtaXR0ZXJfd2Vic2l0ZSIsIndlYnNpdGUiLCJyZWNpcGllbnRfY29tcGFueSIsImNvbXBhbnlfbmFtZSIsInJlY2lwaWVudF9maXJzdF9uYW1lIiwiZmlyc3RfbmFtZSIsInJlY2lwaWVudF9sYXN0X25hbWUiLCJsYXN0X25hbWUiLCJyZWNpcGllbnRfc3RyZWV0X251bWJlciIsInJlY2lwaWVudF9zdHJlZXRfbmFtZSIsInJlY2lwaWVudF96aXBfY29kZSIsInJlY2lwaWVudF9jaXR5IiwicmVjaXBpZW50X2NvdW50cnkiLCJyZWNpcGllbnRfcGhvbmUiLCJyZWNpcGllbnRfbWFpbCIsImFydGljbGVzIiwidGFibGVfdG90YWxfd2l0aG91dF90YXhlc192YWx1ZSIsImZvcm1hdE91dHB1dE51bWJlciIsInRvdGFsX2V4Y190YXhlcyIsInRhYmxlX3RvdGFsX3RheGVzX3ZhbHVlIiwidG90YWxfdGF4ZXMiLCJ0YWJsZV90b3RhbF93aXRoX3RheGVzX3ZhbHVlIiwidG90YWxfaW5jX3RheGVzIiwidGVtcGxhdGVfY29uZmlndXJhdGlvbiIsIl90ZW1wbGF0ZUNvbmZpZ3VyYXRpb24iLCJtb21lbnQiLCJrZXlzIiwidGVtcGxhdGUiLCJmaWxlbmFtZSIsIm9yZGVyX3RlbXBsYXRlIiwiaW52b2ljZV90ZW1wbGF0ZSIsImNvbXBpbGVkIiwicHVnIiwiY29tcGlsZUZpbGUiLCJwYXRoIiwicmVzb2x2ZSIsInR5cGUiLCJoZWFkZXJfdGl0bGUiLCJoZWFkZXJfc3ViamVjdCIsImhlYWRlcl9yZWZlcmVuY2UiLCJwYXJhbXMiLCJpbnZvaWNlX2hlYWRlcl90aXRsZSIsImdldFBocmFzZXMiLCJpbnZvaWNlX2hlYWRlcl9zdWJqZWN0IiwiaW52b2ljZV9oZWFkZXJfcmVmZXJlbmNlIiwiaW52b2ljZV9oZWFkZXJfcmVmZXJlbmNlX3ZhbHVlIiwiZ2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4iLCJpbnZvaWNlX2hlYWRlcl9kYXRlIiwidGFibGVfbm90ZV9jb250ZW50IiwiaW52b2ljZV9ub3RlIiwibm90ZSIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZSIsImFzc2lnbiIsInRvSFRNTCIsIl90b0hUTUwiLCJ0b1BERiIsIl90b1BERiIsIl9wcmVDb21waWxlQ29tbW9uVHJhbnNsYXRpb25zIiwib3JkZXJfaGVhZGVyX3RpdGxlIiwib3JkZXJfaGVhZGVyX3N1YmplY3QiLCJvcmRlcl9oZWFkZXJfcmVmZXJlbmNlIiwib3JkZXJfaGVhZGVyX3JlZmVyZW5jZV92YWx1ZSIsIm9yZGVyX2hlYWRlcl9kYXRlIiwib3JkZXJfbm90ZSIsImVuIiwiZnIiLCJpbmNsdWRlcyIsInJlZmVyZW5jZSIsInNldFJlZmVyZW5jZUZyb21QYXR0ZXJuIiwib3JkZXJfcmVmZXJlbmNlX3BhdHRlcm4iLCJpbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuIiwicGF0dGVybiIsInRtcCIsInNwbGl0Iiwic2xpY2UiLCJvdXRwdXQiLCJpdGVtIiwiZW5kc1dpdGgiLCJzdGFydHNXaXRoIiwicmVwbGFjZSIsImZvcm1hdCIsImlkIiwidGVzdCIsIl9pZCIsInBhZCIsImxlbmd0aCIsImh0bWwiLCJfY29tcGlsZSIsImdldE9yZGVyIiwiZ2V0SW52b2ljZSIsInRvRmlsZSIsImZpbGVwYXRoIiwiX3RvRmlsZUZyb21IVE1MIiwicGRmIiwiaHRtbFBERiIsImNyZWF0ZSIsInRpbWVvdXQiLCJfdG9GaWxlRnJvbVBERiIsInRvQnVmZmVyIiwiX3RvQnVmZmVyRnJvbVBERiIsInRvU3RyZWFtIiwiX3RvU3RyZWFtRnJvbVBERiIsImNvbnRlbnQiLCJQcm9taXNlIiwicmVqZWN0IiwiZnMiLCJ3cml0ZUZpbGUiLCJlcnIiLCJyZXMiLCJidWZmZXIiLCJzdHJlYW0iLCJwaXBlIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJ0ZW1wbGF0ZV9yb3dzX3Blcl9wYWdlIiwidGVtcGxhdGVDb25maWciLCJyb3dzX2luX2ZpcnN0X3BhZ2UiLCJyb3dzX3Blcl9wYWdlcyIsInJvd3NfaW5fbGFzdF9wYWdlIiwibmJBcnRpY2xlcyIsImxvb3AiLCJsb29wX3RhYmxlIiwiX2RlZmF1bHRMb2NhbGUiLCJkZWZhdWx0TG9jYWxlIiwiX2F2YWlsYWJsZUxvY2FsZSIsImxvY2FsZXMiLCJjb25maWd1cmUiLCJfdGVtcGxhdGUiLCJfbGFuZyIsInRvTG93ZXJDYXNlIiwiam9pbiIsIl9vcmRlcl9yZWZlcmVuY2VfcGF0dGVybiIsIl9pbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuIiwiX3JlZmVyZW5jZSIsIl9sb2dvIiwiX29yZGVyX3RlbXBsYXRlIiwiX2ludm9pY2VfdGVtcGxhdGUiLCJfb3JkZXJfbm90ZSIsIl9pbnZvaWNlX25vdGUiLCJfZm9vdGVyIiwiX2RhdGVfZm9ybWF0IiwiX2RhdGUiLCJkYXRlX2Zvcm1hdCIsImlzVmFsaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwiX2NoZWNrQXJ0aWNsZSIsInRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyIsInRvdGFsX3Byb2R1Y3RfdGF4ZXMiLCJyb3VuZCIsInRvdGFsX3Byb2R1Y3Rfd2l0aF90YXhlcyIsImNvbmNhdCIsIkNvbW1vbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7QUFDbkIscUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDbEI7QUFDQSxVQUFLQyxVQUFMLEdBQW1CRCxNQUFNLENBQUNFLFNBQVIsR0FBcUIsSUFBSUMscUJBQUosQ0FBY0gsTUFBTSxDQUFDRSxTQUFyQixDQUFyQixHQUF1RCxJQUFJQyxxQkFBSixFQUF6RTtBQUNBLFVBQUtDLFFBQUwsR0FBaUJKLE1BQU0sQ0FBQ0ssT0FBUixHQUFtQixJQUFJQyxtQkFBSixDQUFZTixNQUFNLENBQUNLLE9BQW5CLENBQW5CLEdBQWlELElB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LElBQW9COUQsTUFBTSxDQUFDb0gsR0FBRyxDQUFDNEUsbUJBQUwsQ0FBMUI7QUFDRDs7QUFDRCxXQUFLaE4sUUFBTCxHQUFpQixLQUFLQSxRQUFOLEdBQWtCLEtBQUtBLFFBQUwsQ0FBY21OLE1BQWQsQ0FBcUIvRSxHQUFyQixDQUFsQixHQUE4QyxHQUFHK0UsTUFBSCxDQUFVL0UsR0FBVixDQUE5RDtBQUNEOzs7O0VBL0xvQ2dGLGtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHB1ZyBmcm9tICdwdWcnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGh0bWxQREYgZnJvbSAnaHRtbC1wZGYnO1xuaW1wb3J0IENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgUmVjaXBpZW50IGZyb20gJy4vcmVjaXBpZW50JztcbmltcG9ydCBFbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5pbXBvcnQgaTE4biBmcm9tICcuLi9saWIvaTE4bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRvciBleHRlbmRzIENvbW1vbiB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fcmVjaXBpZW50ID0gKGNvbmZpZy5yZWNpcGllbnQpID8gbmV3IFJlY2lwaWVudChjb25maWcucmVjaXBpZW50KSA6IG5ldyBSZWNpcGllbnQoKTtcbiAgICB0aGlzLl9lbWl0dGVyID0gKGNvbmZpZy5lbWl0dGVyKSA/IG5ldyBFbWl0dGVyKGNvbmZpZy5lbWl0dGVyKSA6IG5ldyBFbWl0dGVyKCk7XG4gICAgdGhpcy5fdG90YWxfZXhjX3RheGVzID0gMDtcbiAgICB0aGlzLl90b3RhbF90YXhlcyA9IDA7XG4gICAgdGhpcy5fdG90YWxfaW5jX3RheGVzID0gMDtcbiAgICB0aGlzLl9hcnRpY2xlID0gW107XG4gICAgdGhpcy5faTE4bkNvbmZpZ3VyZShjb25maWcubGFuZ3VhZ2UpO1xuICAgIHRoaXMuaHlkcmF0ZShjb25maWcuZ2xvYmFsLCB0aGlzLl9pdGVtc1RvSHlkcmF0ZSgpKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XG4gIH1cblxuICBzZXQgdGVtcGxhdGUodmFsdWUpIHtcbiAgICB0aGlzLl90ZW1wbGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGxhbmcoKSB7XG4gICAgcmV0dXJuICghdGhpcy5fbGFuZykgPyB0aGlzLl9kZWZhdWx0TG9jYWxlIDogdGhpcy5fbGFuZztcbiAgfVxuXG4gIHNldCBsYW5nKHZhbHVlKSB7XG4gICAgY29uc3QgdG1wID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIXRoaXMuX2F2YWlsYWJsZUxvY2FsZS5pbmNsdWRlcyh0bXApKSB0aHJvdyBuZXcgRXJyb3IoYFdyb25nIGxhbmcsIHBsZWFzZSBzZXQgb25lIG9mICR7dGhpcy5fYXZhaWxhYmxlTG9jYWxlLmpvaW4oJywgJyl9YCk7XG4gICAgdGhpcy5fbGFuZyA9IHRtcDtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBzZXQgaWQodmFsdWUpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG9yZGVyX3JlZmVyZW5jZV9wYXR0ZXJuKCkge1xuICAgIHJldHVybiAoIXRoaXMuX29yZGVyX3JlZmVyZW5jZV9wYXR0ZXJuKSA/ICckcHJlZml4e09SfSRkYXRle1lZTU19JHNlcGFyYXRvcnstfSRpZHswMDAwMH0nIDogdGhpcy5fb3JkZXJfcmVmZXJlbmNlX3BhdHRlcm47XG4gIH1cblxuICBzZXQgb3JkZXJfcmVmZXJlbmNlX3BhdHRlcm4odmFsdWUpIHtcbiAgICB0aGlzLl9vcmRlcl9yZWZlcmVuY2VfcGF0dGVybiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGludm9pY2VfcmVmZXJlbmNlX3BhdHRlcm4oKSB7XG4gICAgcmV0dXJuICghdGhpcy5faW52b2ljZV9yZWZlcmVuY2VfcGF0dGVybikgPyAnJHByZWZpeHtJTn0kZGF0ZXtZWU1NfSRzZXBhcmF0b3J7LX0kaWR7MDAwMDB9JyA6IHRoaXMuX2ludm9pY2VfcmVmZXJlbmNlX3BhdHRlcm47XG4gIH1cblxuICBzZXQgaW52b2ljZV9yZWZlcmVuY2VfcGF0dGVybih2YWx1ZSkge1xuICAgIHRoaXMuX2ludm9pY2VfcmVmZXJlbmNlX3BhdHRlcm4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByZWZlcmVuY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZTtcbiAgfVxuXG4gIHNldCByZWZlcmVuY2UodmFsdWUpIHtcbiAgICB0aGlzLl9yZWZlcmVuY2UgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBsb2dvKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2dvO1xuICB9XG5cbiAgc2V0IGxvZ28odmFsdWUpIHtcbiAgICB0aGlzLl9sb2dvID0gdmFsdWU7XG4gIH1cblxuICBnZXQgb3JkZXJfdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yZGVyX3RlbXBsYXRlO1xuICB9XG5cbiAgc2V0IG9yZGVyX3RlbXBsYXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fb3JkZXJfdGVtcGxhdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpbnZvaWNlX3RlbXBsYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnZvaWNlX3RlbXBsYXRlO1xuICB9XG5cbiAgc2V0IGludm9pY2VfdGVtcGxhdGUodmFsdWUpIHtcbiAgICB0aGlzLl9pbnZvaWNlX3RlbXBsYXRlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgb3JkZXJfbm90ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JkZXJfbm90ZTtcbiAgfVxuXG4gIHNldCBvcmRlcl9ub3RlKHZhbHVlKSB7XG4gICAgdGhpcy5fb3JkZXJfbm90ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGludm9pY2Vfbm90ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2ljZV9ub3RlO1xuICB9XG5cbiAgc2V0IGludm9pY2Vfbm90ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2ludm9pY2Vfbm90ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGZvb3RlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyO1xuICB9XG5cbiAgc2V0IGZvb3Rlcih2YWx1ZSkge1xuICAgIHRoaXMuX2Zvb3RlciA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGRhdGVfZm9ybWF0KCkge1xuICAgIHJldHVybiAoIXRoaXMuX2RhdGVfZm9ybWF0KSA/ICdZWVlZL01NL0REJyA6IHRoaXMuX2RhdGVfZm9ybWF0O1xuICB9XG5cbiAgc2V0IGRhdGVfZm9ybWF0KHZhbHVlKSB7XG4gICAgdGhpcy5fZGF0ZV9mb3JtYXQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBkYXRlKCkge1xuICAgIHJldHVybiAoIXRoaXMuX2RhdGUpID8gbW9tZW50KCkuZm9ybWF0KHRoaXMuZGF0ZV9mb3JtYXQpIDogdGhpcy5fZGF0ZTtcbiAgfVxuXG4gIHNldCBkYXRlKHZhbHVlKSB7XG4gICAgaWYgKCFtb21lbnQodmFsdWUpLmlzVmFsaWQoKSkgdGhyb3cgbmV3IEVycm9yKCdEYXRlIG5vdCB2YWxpZCcpO1xuICAgIHRoaXMuX2RhdGUgPSBtb21lbnQodmFsdWUpLmZvcm1hdCh0aGlzLmRhdGVfZm9ybWF0KTtcbiAgfVxuXG4gIGdldCB0b3RhbF9leGNfdGF4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsX2V4Y190YXhlcztcbiAgfVxuXG4gIHNldCB0b3RhbF9leGNfdGF4ZXModmFsdWUpIHtcbiAgICB0aGlzLl90b3RhbF9leGNfdGF4ZXMgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB0b3RhbF90YXhlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxfdGF4ZXM7XG4gIH1cblxuICBzZXQgdG90YWxfdGF4ZXModmFsdWUpIHtcbiAgICB0aGlzLl90b3RhbF90YXhlcyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHRvdGFsX2luY190YXhlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxfaW5jX3RheGVzO1xuICB9XG5cbiAgc2V0IHRvdGFsX2luY190YXhlcyh2YWx1ZSkge1xuICAgIHRoaXMuX3RvdGFsX2luY190YXhlcyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGFydGljbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FydGljbGU7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNldFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQGV4YW1wbGUgYXJ0aWNsZSh7ZGVzY3JpcHRpb246ICdMaWNlbmNlJywgdGF4OiAyMCwgcHJpY2U6IDEwMCwgcXQ6IDF9KVxuICAgKiBAZXhhbXBsZSBhcnRpY2xlKFtcbiAgICogIHtkZXNjcmlwdGlvbjogJ0xpY2VuY2UnLCB0YXg6IDIwLCBwcmljZTogMTAwLCBxdDogMX0sXG4gICAqICB7ZGVzY3JpcHRpb246ICdMaWNlbmNlJywgdGF4OiAyMCwgcHJpY2U6IDEwMCwgcXQ6IDF9XG4gICAqIF0pXG4gICAqL1xuICBzZXQgYXJ0aWNsZSh2YWx1ZSkge1xuICAgIGNvbnN0IHRtcCA9IHZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRtcCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG1wLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrQXJ0aWNsZSh0bXBbaV0pO1xuICAgICAgICB0bXBbaV0udG90YWxfcHJvZHVjdF93aXRob3V0X3RheGVzID0gdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodG1wW2ldLnByaWNlICogdG1wW2ldLnF0KTtcbiAgICAgICAgdG1wW2ldLnRvdGFsX3Byb2R1Y3RfdGF4ZXMgPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0aGlzLnJvdW5kKHRtcFtpXS50b3RhbF9wcm9kdWN0X3dpdGhvdXRfdGF4ZXMgKiAodG1wW2ldLnRheCAvIDEwMCkpKTtcbiAgICAgICAgdG1wW2ldLnRvdGFsX3Byb2R1Y3Rfd2l0aF90YXhlcyA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRoaXMucm91bmQoTnVtYmVyKHRtcFtpXS50b3RhbF9wcm9kdWN0X3dpdGhvdXRfdGF4ZXMpICsgTnVtYmVyKHRtcFtpXS50b3RhbF9wcm9kdWN0X3RheGVzKSkpO1xuICAgICAgICB0bXBbaV0ucHJpY2UgPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0bXBbaV0ucHJpY2UpO1xuICAgICAgICB0bXBbaV0udGF4ID0gdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodG1wW2ldLnRheCk7XG4gICAgICAgIHRoaXMudG90YWxfZXhjX3RheGVzICs9IE51bWJlcih0bXBbaV0udG90YWxfcHJvZHVjdF93aXRob3V0X3RheGVzKTtcbiAgICAgICAgdGhpcy50b3RhbF9pbmNfdGF4ZXMgKz0gTnVtYmVyKHRtcFtpXS50b3RhbF9wcm9kdWN0X3dpdGhfdGF4ZXMpO1xuICAgICAgICB0aGlzLnRvdGFsX3RheGVzICs9IE51bWJlcih0bXBbaV0udG90YWxfcHJvZHVjdF90YXhlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NoZWNrQXJ0aWNsZSh0bXApO1xuICAgICAgdG1wLnRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRtcC5wcmljZSAqIHRtcC5xdCk7XG4gICAgICB0bXAudG90YWxfcHJvZHVjdF90YXhlcyA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRoaXMucm91bmQodG1wLnRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyAqICh0bXAudGF4IC8gMTAwKSkpO1xuICAgICAgdG1wLnRvdGFsX3Byb2R1Y3Rfd2l0aF90YXhlcyA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRoaXMucm91bmQoTnVtYmVyKHRtcC50b3RhbF9wcm9kdWN0X3dpdGhvdXRfdGF4ZXMpICsgTnVtYmVyKHRtcC50b3RhbF9wcm9kdWN0X3RheGVzKSkpO1xuICAgICAgdG1wLnByaWNlID0gdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodG1wLnByaWNlKTtcbiAgICAgIHRtcC50YXggPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0bXAudGF4KTtcbiAgICAgIHRoaXMudG90YWxfZXhjX3RheGVzICs9IE51bWJlcih0bXAudG90YWxfcHJvZHVjdF93aXRob3V0X3RheGVzKTtcbiAgICAgIHRoaXMudG90YWxfaW5jX3RheGVzICs9IE51bWJlcih0bXAudG90YWxfcHJvZHVjdF93aXRoX3RheGVzKTtcbiAgICAgIHRoaXMudG90YWxfdGF4ZXMgKz0gTnVtYmVyKHRtcC50b3RhbF9wcm9kdWN0X3RheGVzKTtcbiAgICB9XG4gICAgdGhpcy5fYXJ0aWNsZSA9ICh0aGlzLl9hcnRpY2xlKSA/IHRoaXMuX2FydGljbGUuY29uY2F0KHRtcCkgOiBbXS5jb25jYXQodG1wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVpbml0aWFsaXplIGFydGljbGUgYXR0cmlidXRlXG4gICAqL1xuICBkZWxldGVBcnRpY2xlcygpIHtcbiAgICB0aGlzLl90b3RhbF9pbmNfdGF4ZXMgPSAwO1xuICAgIHRoaXMuX3RvdGFsX3RheGVzID0gMDtcbiAgICB0aGlzLl90b3RhbF9leGNfdGF4ZXMgPSAwO1xuICAgIHRoaXMuX2FydGljbGUgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQ2hlY2sgYXJ0aWNsZSBzdHJ1Y3R1cmUgYW5kIGRhdGFcbiAgICogQHBhcmFtIGFydGljbGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja0FydGljbGUoYXJ0aWNsZSkge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFydGljbGUsICdkZXNjcmlwdGlvbicpKSB0aHJvdyBuZXcgRXJyb3IoJ0Rlc2NyaXB0aW9uIGF0dHJpYnV0ZSBpcyBtaXNzaW5nJyk7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJ0aWNsZSwgJ3RheCcpKSB0aHJvdyBuZXcgRXJyb3IoJ1RheCBhdHRyaWJ1dGUgaXMgbWlzc2luZycpO1xuICAgIGlmICghdGhpcy5pc051bWVyaWMoYXJ0aWNsZS50YXgpKSB0aHJvdyBuZXcgRXJyb3IoJ1RheCBhdHRyaWJ1dGUgaGF2ZSB0byBiZSBhIG51bWJlcicpO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFydGljbGUsICdwcmljZScpKSB0aHJvdyBuZXcgRXJyb3IoJ1ByaWNlIGF0dHJpYnV0ZSBpcyBtaXNzaW5nJyk7XG4gICAgaWYgKCF0aGlzLmlzTnVtZXJpYyhhcnRpY2xlLnByaWNlKSkgdGhyb3cgbmV3IEVycm9yKCdQcmljZSBhdHRyaWJ1dGUgaGF2ZSB0byBiZSBhIG51bWJlcicpO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFydGljbGUsICdxdCcpKSB0aHJvdyBuZXcgRXJyb3IoJ1F0IGF0dHJpYnV0ZSBpcyBtaXNzaW5nJyk7XG4gICAgaWYgKCF0aGlzLmlzTnVtZXJpYyhhcnRpY2xlLnF0KSkgdGhyb3cgbmV3IEVycm9yKCdRdCBhdHRyaWJ1dGUgaGF2ZSB0byBiZSBhbiBpbnRlZ2VyJyk7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGFydGljbGUucXQpKSB0aHJvdyBuZXcgRXJyb3IoJ1F0IGF0dHJpYnV0ZSBoYXZlIHRvIGJlIGFuIGludGVnZXIsIG5vdCBhIGZsb2F0Jyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEh5ZHJhdGUgZnJvbSBjb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtbc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nXX1cbiAgICovXG4gIF9pdGVtc1RvSHlkcmF0ZSgpIHtcbiAgICByZXR1cm4gWydsb2dvJywgJ29yZGVyX3RlbXBsYXRlJywgJ2ludm9pY2VfdGVtcGxhdGUnLCAnZGF0ZV9mb3JtYXQnLCAnZGF0ZScsICdvcmRlcl9yZWZlcmVuY2VfcGF0dGVybicsICdpbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuJywgJ29yZGVyX25vdGUnLCAnaW52b2ljZV9ub3RlJywgJ2xhbmcnLCAnZm9vdGVyJ107XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEh5ZHJhdGUgcmVjaXBpZW50IG9iamVjdFxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgcmVjaXBpZW50KG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gdGhpcy5fcmVjaXBpZW50O1xuICAgIHJldHVybiB0aGlzLl9yZWNpcGllbnQuaHlkcmF0ZShvYmosIHRoaXMuX3JlY2lwaWVudC5faXRlbXNUb0h5ZHJhdGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEh5ZHJhdGUgZW1pdHRlciBvYmplY3RcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGVtaXR0ZXIob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiB0aGlzLl9lbWl0dGVyO1xuICAgIHJldHVybiB0aGlzLl9lbWl0dGVyLmh5ZHJhdGUob2JqLCB0aGlzLl9lbWl0dGVyLl9pdGVtc1RvSHlkcmF0ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUHJlY29tcGlsZSB0cmFuc2xhdGlvbiB0byBtZXJnaW5nIGdsYWJhbCB3aXRoIGN1c3RvbSB0cmFuc2xhdGlvbnNcbiAgICogQHJldHVybnMge3tsb2dvOiAqLCBoZWFkZXJfZGF0ZTogKiwgdGFibGVfaW5mb3JtYXRpb24sIHRhYmxlX2Rlc2NyaXB0aW9uLCB0YWJsZV90YXgsIHRhYmxlX3F1YW50aXR5LFxuICAgKiB0YWJsZV9wcmljZV93aXRob3V0X3RheGVzLCB0YWJsZV9wcmljZV93aXRob3V0X3RheGVzX3VuaXQsIHRhYmxlX25vdGUsIHRhYmxlX3RvdGFsX3dpdGhvdXRfdGF4ZXMsXG4gICAqIHRhYmxlX3RvdGFsX3RheGVzLCB0YWJsZV90b3RhbF93aXRoX3RheGVzLCBmcm9tdG9fcGhvbmUsIGZyb210b19tYWlsLCBmb290ZXIsIG1vbWVudDogKCp8bW9tZW50Lk1vbWVudCl9fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3ByZUNvbXBpbGVDb21tb25UcmFuc2xhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvZ286IHRoaXMubG9nbyxcbiAgICAgIGhlYWRlcl9kYXRlOiB0aGlzLmRhdGUsXG4gICAgICB0YWJsZV9pbmZvcm1hdGlvbjogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfaW5mb3JtYXRpb24nLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgdGFibGVfZGVzY3JpcHRpb246IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX2Rlc2NyaXB0aW9uJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX3RheDogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfdGF4JywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX3F1YW50aXR5OiBpMThuLl9fKHtwaHJhc2U6ICd0YWJsZV9xdWFudGl0eScsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICB0YWJsZV9wcmljZV93aXRob3V0X3RheGVzOiBpMThuLl9fKHtwaHJhc2U6ICd0YWJsZV9wcmljZV93aXRob3V0X3RheGVzJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX3ByaWNlX3dpdGhvdXRfdGF4ZXNfdW5pdDogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfcHJpY2Vfd2l0aG91dF90YXhlc191bml0JywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX25vdGU6IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX25vdGUnLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgdGFibGVfdG90YWxfd2l0aG91dF90YXhlczogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfdG90YWxfd2l0aG91dF90YXhlcycsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICB0YWJsZV90b3RhbF90YXhlczogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfdG90YWxfdGF4ZXMnLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgdGFibGVfdG90YWxfd2l0aF90YXhlczogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfdG90YWxfd2l0aF90YXhlcycsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICBmcm9tdG9fcGhvbmU6IGkxOG4uX18oe3BocmFzZTogJ2Zyb210b19waG9uZScsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICBmcm9tdG9fbWFpbDogaTE4bi5fXyh7cGhyYXNlOiAnZnJvbXRvX21haWwnLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgZnJvbXRvX3dlYnNpdGU6IGkxOG4uX18oe3BocmFzZTogJ2Zyb210b193ZWJzaXRlJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIGZvb3RlcjogdGhpcy5nZXRGb290ZXIoKSxcbiAgICAgIGVtaXR0ZXJfbmFtZTogdGhpcy5lbWl0dGVyKCkubmFtZSxcbiAgICAgIGVtaXR0ZXJfc3RyZWV0X251bWJlcjogdGhpcy5lbWl0dGVyKCkuc3RyZWV0X251bWJlcixcbiAgICAgIGVtaXR0ZXJfc3RyZWV0X25hbWU6IHRoaXMuZW1pdHRlcigpLnN0cmVldF9uYW1lLFxuICAgICAgZW1pdHRlcl96aXBfY29kZTogdGhpcy5lbWl0dGVyKCkuemlwX2NvZGUsXG4gICAgICBlbWl0dGVyX2NpdHk6IHRoaXMuZW1pdHRlcigpLmNpdHksXG4gICAgICBlbWl0dGVyX2NvdW50cnk6IHRoaXMuZW1pdHRlcigpLmNvdW50cnksXG4gICAgICBlbWl0dGVyX3Bob25lOiB0aGlzLmVtaXR0ZXIoKS5waG9uZSxcbiAgICAgIGVtaXR0ZXJfbWFpbDogdGhpcy5lbWl0dGVyKCkubWFpbCxcbiAgICAgIGVtaXR0ZXJfd2Vic2l0ZTogdGhpcy5lbWl0dGVyKCkud2Vic2l0ZSxcbiAgICAgIHJlY2lwaWVudF9jb21wYW55OiB0aGlzLnJlY2lwaWVudCgpLmNvbXBhbnlfbmFtZSxcbiAgICAgIHJlY2lwaWVudF9maXJzdF9uYW1lOiB0aGlzLnJlY2lwaWVudCgpLmZpcnN0X25hbWUsXG4gICAgICByZWNpcGllbnRfbGFzdF9uYW1lOiB0aGlzLnJlY2lwaWVudCgpLmxhc3RfbmFtZSxcbiAgICAgIHJlY2lwaWVudF9zdHJlZXRfbnVtYmVyOiB0aGlzLnJlY2lwaWVudCgpLnN0cmVldF9udW1iZXIsXG4gICAgICByZWNpcGllbnRfc3RyZWV0X25hbWU6IHRoaXMucmVjaXBpZW50KCkuc3RyZWV0X25hbWUsXG4gICAgICByZWNpcGllbnRfemlwX2NvZGU6IHRoaXMucmVjaXBpZW50KCkuemlwX2NvZGUsXG4gICAgICByZWNpcGllbnRfY2l0eTogdGhpcy5yZWNpcGllbnQoKS5jaXR5LFxuICAgICAgcmVjaXBpZW50X2NvdW50cnk6IHRoaXMucmVjaXBpZW50KCkuY291bnRyeSxcbiAgICAgIHJlY2lwaWVudF9waG9uZTogdGhpcy5yZWNpcGllbnQoKS5waG9uZSxcbiAgICAgIHJlY2lwaWVudF9tYWlsOiB0aGlzLnJlY2lwaWVudCgpLm1haWwsXG4gICAgICBhcnRpY2xlczogdGhpcy5hcnRpY2xlLFxuICAgICAgdGFibGVfdG90YWxfd2l0aG91dF90YXhlc192YWx1ZTogdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodGhpcy50b3RhbF9leGNfdGF4ZXMpLFxuICAgICAgdGFibGVfdG90YWxfdGF4ZXNfdmFsdWU6IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRoaXMudG90YWxfdGF4ZXMpLFxuICAgICAgdGFibGVfdG90YWxfd2l0aF90YXhlc192YWx1ZTogdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodGhpcy50b3RhbF9pbmNfdGF4ZXMpLFxuICAgICAgdGVtcGxhdGVfY29uZmlndXJhdGlvbjogdGhpcy5fdGVtcGxhdGVDb25maWd1cmF0aW9uKCksXG4gICAgICBtb21lbnQ6IG1vbWVudCgpLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENvbXBpbGUgcHVnIHRlbXBsYXRlIHRvIEhUTUxcbiAgICogQHBhcmFtIGtleXNcbiAgICogQHJldHVybnMgeyp9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29tcGlsZShrZXlzKSB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBrZXlzLmZpbGVuYW1lID09PSAnb3JkZXInID8gdGhpcy5vcmRlcl90ZW1wbGF0ZSA6IHRoaXMuaW52b2ljZV90ZW1wbGF0ZTtcbiAgICBjb25zdCBjb21waWxlZCA9IHB1Zy5jb21waWxlRmlsZShwYXRoLnJlc29sdmUodGVtcGxhdGUpKTtcbiAgICByZXR1cm4gY29tcGlsZWQoa2V5cyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFByZXBhcmUgcGhyYXNlcyBmcm9tIHRyYW5zbGF0aW9uc1xuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgZ2V0UGhyYXNlcyh0eXBlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlYWRlcl90aXRsZTogaTE4bi5fXyh7cGhyYXNlOiBgJHt0eXBlfV9oZWFkZXJfdGl0bGVgLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgaGVhZGVyX3N1YmplY3Q6IGkxOG4uX18oe3BocmFzZTogYCR7dHlwZX1faGVhZGVyX3N1YmplY3RgLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgaGVhZGVyX3JlZmVyZW5jZTogaTE4bi5fXyh7cGhyYXNlOiBgJHt0eXBlfV9oZWFkZXJfcmVmZXJlbmNlYCwgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIGhlYWRlcl9kYXRlOiBpMThuLl9fKHtwaHJhc2U6IGAke3R5cGV9X2hlYWRlcl9kYXRlYCwgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gaW52b2ljZSB0cmFuc2xhdGlvbiBrZXlzIG9iamVjdFxuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0SW52b2ljZShwYXJhbXMgPSBbXSkge1xuICAgIGNvbnN0IGtleXMgPSB7XG4gICAgICBpbnZvaWNlX2hlYWRlcl90aXRsZTogdGhpcy5nZXRQaHJhc2VzKCdpbnZvaWNlJykuaGVhZGVyX3RpdGxlLFxuICAgICAgaW52b2ljZV9oZWFkZXJfc3ViamVjdDogdGhpcy5nZXRQaHJhc2VzKCdpbnZvaWNlJykuaGVhZGVyX3N1YmplY3QsXG4gICAgICBpbnZvaWNlX2hlYWRlcl9yZWZlcmVuY2U6IHRoaXMuZ2V0UGhyYXNlcygnaW52b2ljZScpLmhlYWRlcl9yZWZlcmVuY2UsXG4gICAgICBpbnZvaWNlX2hlYWRlcl9yZWZlcmVuY2VfdmFsdWU6IHRoaXMuZ2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4oJ2ludm9pY2UnKSxcbiAgICAgIGludm9pY2VfaGVhZGVyX2RhdGU6IHRoaXMuZ2V0UGhyYXNlcygnaW52b2ljZScpLmhlYWRlcl9kYXRlLFxuICAgICAgdGFibGVfbm90ZV9jb250ZW50OiB0aGlzLmludm9pY2Vfbm90ZSxcbiAgICAgIG5vdGU6IChub3RlKSA9PiAoKG5vdGUpID8gdGhpcy5pbnZvaWNlX25vdGUgPSBub3RlIDogdGhpcy5pbnZvaWNlX25vdGUpLFxuICAgICAgZmlsZW5hbWU6ICdpbnZvaWNlJyxcbiAgICB9O1xuICAgIHBhcmFtcy5mb3JFYWNoKChwaHJhc2UpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBrZXlzW3BocmFzZV0gPSBpMThuLl9fKHsgcGhyYXNlLCBsb2NhbGU6IHRoaXMubGFuZyB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcgJiYgcGhyYXNlLmtleSAmJiBwaHJhc2UudmFsdWUpIHtcbiAgICAgICAga2V5c1twaHJhc2Uua2V5XSA9IHBocmFzZS52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGtleXMsIHtcbiAgICAgIHRvSFRNTDogKCkgPT4gdGhpcy5fdG9IVE1MKGtleXMsIHBhcmFtcyksXG4gICAgICB0b1BERjogKCkgPT4gdGhpcy5fdG9QREYoa2V5cywgcGFyYW1zKSxcbiAgICB9LCB0aGlzLl9wcmVDb21waWxlQ29tbW9uVHJhbnNsYXRpb25zKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gb3JkZXIgdHJhbnNsYXRpb24ga2V5cyBvYmplY3RcbiAgICogQHBhcmFtIHBhcmFtc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldE9yZGVyKHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3Qga2V5cyA9IHtcbiAgICAgIG9yZGVyX2hlYWRlcl90aXRsZTogdGhpcy5nZXRQaHJhc2VzKCdvcmRlcicpLmhlYWRlcl90aXRsZSxcbiAgICAgIG9yZGVyX2hlYWRlcl9zdWJqZWN0OiB0aGlzLmdldFBocmFzZXMoJ29yZGVyJykuaGVhZGVyX3N1YmplY3QsXG4gICAgICBvcmRlcl9oZWFkZXJfcmVmZXJlbmNlOiB0aGlzLmdldFBocmFzZXMoJ29yZGVyJykuaGVhZGVyX3JlZmVyZW5jZSxcbiAgICAgIG9yZGVyX2hlYWRlcl9yZWZlcmVuY2VfdmFsdWU6IHRoaXMuZ2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4oJ29yZGVyJyksXG4gICAgICBvcmRlcl9oZWFkZXJfZGF0ZTogdGhpcy5nZXRQaHJhc2VzKCdvcmRlcicpLmhlYWRlcl9kYXRlLFxuICAgICAgdGFibGVfbm90ZV9jb250ZW50OiB0aGlzLm9yZGVyX25vdGUsXG4gICAgICBub3RlOiAobm90ZSkgPT4gKChub3RlKSA/IHRoaXMub3JkZXJfbm90ZSA9IG5vdGUgOiB0aGlzLm9yZGVyX25vdGUpLFxuICAgICAgZmlsZW5hbWU6ICdvcmRlcicsXG4gICAgfTtcbiAgICBwYXJhbXMuZm9yRWFjaCgocGhyYXNlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAga2V5c1twaHJhc2VdID0gaTE4bi5fXyh7IHBocmFzZSwgbG9jYWxlOiB0aGlzLmxhbmcgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnICYmIHBocmFzZS5rZXkgJiYgcGhyYXNlLnZhbHVlKSB7XG4gICAgICAgIGtleXNbcGhyYXNlLmtleV0gPSBwaHJhc2UudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihrZXlzLCB7XG4gICAgICB0b0hUTUw6ICgpID0+IHRoaXMuX3RvSFRNTChrZXlzLCBwYXJhbXMpLFxuICAgICAgdG9QREY6ICgpID0+IHRoaXMuX3RvUERGKGtleXMsIHBhcmFtcyksXG4gICAgfSwgdGhpcy5fcHJlQ29tcGlsZUNvbW1vblRyYW5zbGF0aW9ucygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIHJpZ2h0IGZvb3RlclxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEZvb3RlcigpIHtcbiAgICBpZiAoIXRoaXMuZm9vdGVyKSByZXR1cm4gaTE4bi5fXyh7cGhyYXNlOiAnZm9vdGVyJywgbG9jYWxlOiB0aGlzLmxhbmd9KTtcblxuICAgIGlmICh0aGlzLmxhbmcgPT09ICdlbicpIHJldHVybiB0aGlzLmZvb3Rlci5lbjtcbiAgICBpZiAodGhpcy5sYW5nID09PSAnZnInKSByZXR1cm4gdGhpcy5mb290ZXIuZnI7XG4gICAgdGhyb3cgRXJyb3IoJ1RoaXMgbGFuZyBkb2VzblxcJ3QgZXhpc3QuJyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiByZWZlcmVuY2UgZnJvbSBwYXR0ZXJuXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuICBnZXRSZWZlcmVuY2VGcm9tUGF0dGVybih0eXBlKSB7XG4gICAgaWYgKCFbJ29yZGVyJywgJ2ludm9pY2UnXS5pbmNsdWRlcyh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKCdUeXBlIGhhdmUgdG8gYmUgXCJvcmRlclwiIG9yIFwiaW52b2ljZVwiJyk7XG4gICAgaWYgKHRoaXMucmVmZXJlbmNlKSByZXR1cm4gdGhpcy5yZWZlcmVuY2U7XG4gICAgcmV0dXJuIHRoaXMuc2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4oKHR5cGUgPT09ICdvcmRlcicpID8gdGhpcy5vcmRlcl9yZWZlcmVuY2VfcGF0dGVybiA6IHRoaXMuaW52b2ljZV9yZWZlcmVuY2VfcGF0dGVybik7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNldCByZWZlcmVuY2VcbiAgICogQHBhcmFtIHBhdHRlcm5cbiAgICogQHJldHVybiB7Kn1cbiAgICogQHByaXZhdGVcbiAgICogQHRvZG8gb3B0aW1pemUgaXRcbiAgICovXG4gIHNldFJlZmVyZW5jZUZyb21QYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBjb25zdCB0bXAgPSBwYXR0ZXJuLnNwbGl0KCckJykuc2xpY2UoMSk7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0bXApIHtcbiAgICAgIGlmICghaXRlbS5lbmRzV2l0aCgnfScpKSB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIHBhdHRlcm4gdHlwZScpO1xuICAgICAgaWYgKGl0ZW0uc3RhcnRzV2l0aCgncHJlZml4eycpKSBvdXRwdXQgKz0gaXRlbS5yZXBsYWNlKCdwcmVmaXh7JywgJycpLnNsaWNlKDAsIC0xKTtcbiAgICAgIGVsc2UgaWYgKGl0ZW0uc3RhcnRzV2l0aCgnc2VwYXJhdG9yeycpKSBvdXRwdXQgKz0gaXRlbS5yZXBsYWNlKCdzZXBhcmF0b3J7JywgJycpLnNsaWNlKDAsIC0xKTtcbiAgICAgIGVsc2UgaWYgKGl0ZW0uc3RhcnRzV2l0aCgnZGF0ZXsnKSkgb3V0cHV0ICs9IG1vbWVudCgpLmZvcm1hdChpdGVtLnJlcGxhY2UoJ2RhdGV7JywgJycpLnNsaWNlKDAsIC0xKSk7XG4gICAgICBlbHNlIGlmIChpdGVtLnN0YXJ0c1dpdGgoJ2lkeycpKSB7XG4gICAgICAgIGNvbnN0IGlkID0gaXRlbS5yZXBsYWNlKCdpZHsnLCAnJykuc2xpY2UoMCwgLTEpO1xuICAgICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoaWQpKSB0aHJvdyBuZXcgRXJyb3IoYElkIG11c3QgYmUgYW4gaW50ZWdlciAoJHtpZH0pYCk7XG4gICAgICAgIG91dHB1dCArPSAodGhpcy5faWQpID8gdGhpcy5wYWQodGhpcy5faWQsIGlkLmxlbmd0aCkgOiB0aGlzLnBhZCgwLCBpZC5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihgJHtpdGVtfSBwYXR0ZXJuIHJlZmVyZW5jZSB1bmtub3duYCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEV4cG9ydCBvYmplY3Qgd2l0aCBodG1sIGNvbnRlbnQgYW5kIGV4cG9ydGF0aW9uIGZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ga2V5c1xuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHt7aHRtbDogKiwgdG9GaWxlOiAoZnVuY3Rpb24oKik6ICopfX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b0hUTUwoa2V5cywgcGFyYW1zID0gW10pIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy5fY29tcGlsZShrZXlzLmZpbGVuYW1lID09PSAnb3JkZXInID8gdGhpcy5nZXRPcmRlcihwYXJhbXMpIDogdGhpcy5nZXRJbnZvaWNlKHBhcmFtcykpO1xuICAgIHJldHVybiB7XG4gICAgICBodG1sLFxuICAgICAgdG9GaWxlOiAoZmlsZXBhdGgpID0+IHRoaXMuX3RvRmlsZUZyb21IVE1MKGh0bWwsIChmaWxlcGF0aCkgfHwgYCR7a2V5cy5maWxlbmFtZX0uaHRtbGApLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNhdmUgY29udGVudCB0byBwZGYgZmlsZVxuICAgKiBAcGFyYW0ga2V5c1xuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3RvUERGKGtleXMsIHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3QgcGRmID0gaHRtbFBERi5jcmVhdGUodGhpcy5fdG9IVE1MKGtleXMsIHBhcmFtcykuaHRtbCwge3RpbWVvdXQ6ICc5MDAwMCd9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcGRmLFxuICAgICAgdG9GaWxlOiAoZmlsZXBhdGgpID0+IHRoaXMuX3RvRmlsZUZyb21QREYocGRmLCAoZmlsZXBhdGgpIHx8IGAke2tleXMuZmlsZW5hbWV9LnBkZmApLFxuICAgICAgdG9CdWZmZXI6ICgpID0+IHRoaXMuX3RvQnVmZmVyRnJvbVBERihwZGYpLFxuICAgICAgdG9TdHJlYW06IChmaWxlcGF0aCkgPT4gdGhpcy5fdG9TdHJlYW1Gcm9tUERGKHBkZiwgKGZpbGVwYXRoKSB8fCBgJHtrZXlzLmZpbGVuYW1lfS5wZGZgKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBTYXZlIGNvbnRlbnQgaW50byBmaWxlIGZyb20gdG9IVE1MKCkgbWV0aG9kXG4gICAqIEBwYXJhbSBjb250ZW50XG4gICAqIEBwYXJhbSBmaWxlcGF0aFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b0ZpbGVGcm9tSFRNTChjb250ZW50LCBmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGNvbnRlbnQsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNhdmUgY29udGVudCBpbnRvIGZpbGUgZnJvbSB0b1BERigpIG1ldGhvZFxuICAgKiBAcGFyYW0gY29udGVudFxuICAgKiBAcGFyYW0gZmlsZXBhdGhcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdG9GaWxlRnJvbVBERihjb250ZW50LCBmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBjb250ZW50LnRvRmlsZShmaWxlcGF0aCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICByZXR1cm4gcmVzb2x2ZShyZXMpO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRXhwb3J0IFBERiB0byBidWZmZXJcbiAgICogQHBhcmFtIGNvbnRlbnRcbiAgICogQHJldHVybnMgeyp9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdG9CdWZmZXJGcm9tUERGKGNvbnRlbnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gY29udGVudC50b0J1ZmZlcigoZXJyLCBidWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIHJldHVybiByZXNvbHZlKGJ1ZmZlcik7XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBFeHBvcnQgUERGIHRvIGZpbGUgdXNpbmcgc3RyZWFtXG4gICAqIEBwYXJhbSBjb250ZW50XG4gICAqIEBwYXJhbSBmaWxlcGF0aFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b1N0cmVhbUZyb21QREYoY29udGVudCwgZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gY29udGVudC50b1N0cmVhbSgoZXJyLCBzdHJlYW0pID0+IHN0cmVhbS5waXBlKGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVwYXRoKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBDYWxjdWxhdGVzIG51bWJlciBvZiBwYWdlcyBhbmQgaXRlbXMgcGVyIHBhZ2VcbiAgICogQHJldHVybiB7e3Jvd3NfaW5fZmlyc3RfcGFnZTogbnVtYmVyLCByb3dzX2luX290aGVyc19wYWdlczogbnVtYmVyLCBsb29wX3RhYmxlOiBudW1iZXJ9fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3RlbXBsYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZV9yb3dzX3Blcl9wYWdlID0gMjk7XG4gICAgY29uc3QgdGVtcGxhdGVDb25maWcgPSB7XG4gICAgICByb3dzX2luX2ZpcnN0X3BhZ2U6ICh0aGlzLmFydGljbGUubGVuZ3RoID4gMTkpID8gdGVtcGxhdGVfcm93c19wZXJfcGFnZSA6IDE5LFxuICAgICAgcm93c19wZXJfcGFnZXM6IDQzLFxuICAgICAgcm93c19pbl9sYXN0X3BhZ2U6IDMzLFxuICAgIH07XG5cbiAgICBsZXQgbmJBcnRpY2xlcyA9IHRoaXMuYXJ0aWNsZS5sZW5ndGg7XG4gICAgbGV0IGxvb3AgPSAxO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAobG9vcCA9PT0gMSkge1xuICAgICAgICBuYkFydGljbGVzIC09IHRlbXBsYXRlQ29uZmlnLnJvd3NfaW5fZmlyc3RfcGFnZTtcbiAgICAgICAgaWYgKG5iQXJ0aWNsZXMgPD0gMCkge1xuICAgICAgICAgIHRlbXBsYXRlQ29uZmlnLmxvb3BfdGFibGUgPSAodGVtcGxhdGVDb25maWcucm93c19pbl9maXJzdF9wYWdlICE9PSB0ZW1wbGF0ZV9yb3dzX3Blcl9wYWdlKSA/IDEgOiAyO1xuICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZUNvbmZpZztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobG9vcCA+PSAyKSB7XG4gICAgICAgIGlmIChuYkFydGljbGVzIDw9IHRlbXBsYXRlQ29uZmlnLnJvd3NfaW5fbGFzdF9wYWdlKSB7XG4gICAgICAgICAgdGVtcGxhdGVDb25maWcubG9vcF90YWJsZSA9IGxvb3A7XG4gICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ29uZmlnO1xuICAgICAgICB9XG4gICAgICAgIG5iQXJ0aWNsZXMgLT0gdGVtcGxhdGVDb25maWcucm93c19wZXJfcGFnZXM7XG4gICAgICAgIGlmIChuYkFydGljbGVzIDw9IDApIHtcbiAgICAgICAgICB0ZW1wbGF0ZUNvbmZpZy5sb29wX3RhYmxlID0gbG9vcDtcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGVDb25maWc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxvb3AgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIE92ZXJyaWRlcyBpMThuIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2kxOG5Db25maWd1cmUoY29uZmlnKSB7XG4gICAgdGhpcy5fZGVmYXVsdExvY2FsZSA9IChjb25maWcgJiYgY29uZmlnLmRlZmF1bHRMb2NhbGUpID8gY29uZmlnLmRlZmF1bHRMb2NhbGUgOiAnZW4nO1xuICAgIHRoaXMuX2F2YWlsYWJsZUxvY2FsZSA9IChjb25maWcgJiYgY29uZmlnLmxvY2FsZXMpID8gY29uZmlnLmxvY2FsZXMgOiBbJ2VuJywgJ2ZyJ107XG4gICAgaWYgKGNvbmZpZykgaTE4bi5jb25maWd1cmUoY29uZmlnKTtcbiAgfVxufVxuIl19