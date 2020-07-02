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
        footer: this.getFooter(),
        emitter_name: this.emitter().name,
        emitter_street_number: this.emitter().street_number,
        emitter_street_name: this.emitter().street_name,
        emitter_zip_code: this.emitter().zip_code,
        emitter_city: this.emitter().city,
        emitter_country: this.emitter().country,
        emitter_phone: this.emitter().phone,
        emitter_mail: this.emitter().mail,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL2dlbmVyYXRvci5qcyJdLCJuYW1lcyI6WyJHZW5lcmF0b3IiLCJjb25maWciLCJfcmVjaXBpZW50IiwicmVjaXBpZW50IiwiUmVjaXBpZW50IiwiX2VtaXR0ZXIiLCJlbWl0dGVyIiwiRW1pdHRlciIsIl90b3RhbF9leGNfdGF4ZXMiLCJfdG90YWxfdGF4ZXMiLCJfdG90YWxfaW5jX3RheGVzIiwiX2FydGljbGUiLCJfaTE4bkNvbmZpZ3VyZSIsImxhbmd1YWdlIiwiaHlkcmF0ZSIsImdsb2JhbCIsIl9pdGVtc1RvSHlkcmF0ZSIsImFydGljbGUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJFcnJvciIsImlzTnVtZXJpYyIsInRheCIsInByaWNlIiwicXQiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJvYmoiLCJsb2dvIiwiaGVhZGVyX2RhdGUiLCJkYXRlIiwidGFibGVfaW5mb3JtYXRpb24iLCJpMThuIiwiX18iLCJwaHJhc2UiLCJsb2NhbGUiLCJsYW5nIiwidGFibGVfZGVzY3JpcHRpb24iLCJ0YWJsZV90YXgiLCJ0YWJsZV9xdWFudGl0eSIsInRhYmxlX3ByaWNlX3dpdGhvdXRfdGF4ZXMiLCJ0YWJsZV9wcmljZV93aXRob3V0X3RheGVzX3VuaXQiLCJ0YWJsZV9ub3RlIiwidGFibGVfdG90YWxfd2l0aG91dF90YXhlcyIsInRhYmxlX3RvdGFsX3RheGVzIiwidGFibGVfdG90YWxfd2l0aF90YXhlcyIsImZyb210b19waG9uZSIsImZyb210b19tYWlsIiwiZm9vdGVyIiwiZ2V0Rm9vdGVyIiwiZW1pdHRlcl9uYW1lIiwibmFtZSIsImVtaXR0ZXJfc3RyZWV0X251bWJlciIsInN0cmVldF9udW1iZXIiLCJlbWl0dGVyX3N0cmVldF9uYW1lIiwic3RyZWV0X25hbWUiLCJlbWl0dGVyX3ppcF9jb2RlIiwiemlwX2NvZGUiLCJlbWl0dGVyX2NpdHkiLCJjaXR5IiwiZW1pdHRlcl9jb3VudHJ5IiwiY291bnRyeSIsImVtaXR0ZXJfcGhvbmUiLCJwaG9uZSIsImVtaXR0ZXJfbWFpbCIsIm1haWwiLCJyZWNpcGllbnRfY29tcGFueSIsImNvbXBhbnlfbmFtZSIsInJlY2lwaWVudF9maXJzdF9uYW1lIiwiZmlyc3RfbmFtZSIsInJlY2lwaWVudF9sYXN0X25hbWUiLCJsYXN0X25hbWUiLCJyZWNpcGllbnRfc3RyZWV0X251bWJlciIsInJlY2lwaWVudF9zdHJlZXRfbmFtZSIsInJlY2lwaWVudF96aXBfY29kZSIsInJlY2lwaWVudF9jaXR5IiwicmVjaXBpZW50X2NvdW50cnkiLCJyZWNpcGllbnRfcGhvbmUiLCJyZWNpcGllbnRfbWFpbCIsImFydGljbGVzIiwidGFibGVfdG90YWxfd2l0aG91dF90YXhlc192YWx1ZSIsImZvcm1hdE91dHB1dE51bWJlciIsInRvdGFsX2V4Y190YXhlcyIsInRhYmxlX3RvdGFsX3RheGVzX3ZhbHVlIiwidG90YWxfdGF4ZXMiLCJ0YWJsZV90b3RhbF93aXRoX3RheGVzX3ZhbHVlIiwidG90YWxfaW5jX3RheGVzIiwidGVtcGxhdGVfY29uZmlndXJhdGlvbiIsIl90ZW1wbGF0ZUNvbmZpZ3VyYXRpb24iLCJtb21lbnQiLCJrZXlzIiwidGVtcGxhdGUiLCJmaWxlbmFtZSIsIm9yZGVyX3RlbXBsYXRlIiwiaW52b2ljZV90ZW1wbGF0ZSIsImNvbXBpbGVkIiwicHVnIiwiY29tcGlsZUZpbGUiLCJwYXRoIiwicmVzb2x2ZSIsInR5cGUiLCJoZWFkZXJfdGl0bGUiLCJoZWFkZXJfc3ViamVjdCIsImhlYWRlcl9yZWZlcmVuY2UiLCJwYXJhbXMiLCJpbnZvaWNlX2hlYWRlcl90aXRsZSIsImdldFBocmFzZXMiLCJpbnZvaWNlX2hlYWRlcl9zdWJqZWN0IiwiaW52b2ljZV9oZWFkZXJfcmVmZXJlbmNlIiwiaW52b2ljZV9oZWFkZXJfcmVmZXJlbmNlX3ZhbHVlIiwiZ2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4iLCJpbnZvaWNlX2hlYWRlcl9kYXRlIiwidGFibGVfbm90ZV9jb250ZW50IiwiaW52b2ljZV9ub3RlIiwibm90ZSIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZSIsImFzc2lnbiIsInRvSFRNTCIsIl90b0hUTUwiLCJ0b1BERiIsIl90b1BERiIsIl9wcmVDb21waWxlQ29tbW9uVHJhbnNsYXRpb25zIiwib3JkZXJfaGVhZGVyX3RpdGxlIiwib3JkZXJfaGVhZGVyX3N1YmplY3QiLCJvcmRlcl9oZWFkZXJfcmVmZXJlbmNlIiwib3JkZXJfaGVhZGVyX3JlZmVyZW5jZV92YWx1ZSIsIm9yZGVyX2hlYWRlcl9kYXRlIiwib3JkZXJfbm90ZSIsImVuIiwiZnIiLCJpbmNsdWRlcyIsInJlZmVyZW5jZSIsInNldFJlZmVyZW5jZUZyb21QYXR0ZXJuIiwib3JkZXJfcmVmZXJlbmNlX3BhdHRlcm4iLCJpbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuIiwicGF0dGVybiIsInRtcCIsInNwbGl0Iiwic2xpY2UiLCJvdXRwdXQiLCJpdGVtIiwiZW5kc1dpdGgiLCJzdGFydHNXaXRoIiwicmVwbGFjZSIsImZvcm1hdCIsImlkIiwidGVzdCIsIl9pZCIsInBhZCIsImxlbmd0aCIsImh0bWwiLCJfY29tcGlsZSIsImdldE9yZGVyIiwiZ2V0SW52b2ljZSIsInRvRmlsZSIsImZpbGVwYXRoIiwiX3RvRmlsZUZyb21IVE1MIiwicGRmIiwiaHRtbFBERiIsImNyZWF0ZSIsInRpbWVvdXQiLCJfdG9GaWxlRnJvbVBERiIsInRvQnVmZmVyIiwiX3RvQnVmZmVyRnJvbVBERiIsInRvU3RyZWFtIiwiX3RvU3RyZWFtRnJvbVBERiIsImNvbnRlbnQiLCJQcm9taXNlIiwicmVqZWN0IiwiZnMiLCJ3cml0ZUZpbGUiLCJlcnIiLCJyZXMiLCJidWZmZXIiLCJzdHJlYW0iLCJwaXBlIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJ0ZW1wbGF0ZV9yb3dzX3Blcl9wYWdlIiwidGVtcGxhdGVDb25maWciLCJyb3dzX2luX2ZpcnN0X3BhZ2UiLCJyb3dzX3Blcl9wYWdlcyIsInJvd3NfaW5fbGFzdF9wYWdlIiwibmJBcnRpY2xlcyIsImxvb3AiLCJsb29wX3RhYmxlIiwiX2RlZmF1bHRMb2NhbGUiLCJkZWZhdWx0TG9jYWxlIiwiX2F2YWlsYWJsZUxvY2FsZSIsImxvY2FsZXMiLCJjb25maWd1cmUiLCJfdGVtcGxhdGUiLCJfbGFuZyIsInRvTG93ZXJDYXNlIiwiam9pbiIsIl9vcmRlcl9yZWZlcmVuY2VfcGF0dGVybiIsIl9pbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuIiwiX3JlZmVyZW5jZSIsIl9sb2dvIiwiX29yZGVyX3RlbXBsYXRlIiwiX2ludm9pY2VfdGVtcGxhdGUiLCJfb3JkZXJfbm90ZSIsIl9pbnZvaWNlX25vdGUiLCJfZm9vdGVyIiwiX2RhdGVfZm9ybWF0IiwiX2RhdGUiLCJkYXRlX2Zvcm1hdCIsImlzVmFsaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwiX2NoZWNrQXJ0aWNsZSIsInRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyIsInRvdGFsX3Byb2R1Y3RfdGF4ZXMiLCJyb3VuZCIsInRvdGFsX3Byb2R1Y3Rfd2l0aF90YXhlcyIsImNvbmNhdCIsIkNvbW1vbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7QUFDbkIscUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDbEI7QUFDQSxVQUFLQyxVQUFMLEdBQW1CRCxNQUFNLENBQUNFLFNBQVIsR0FBcUIsSUFBSUMscUJBQUosQ0FBY0gsTUFBTSxDQUFDRSxTQUFyQixDQUFyQixHQUF1RCxJQUFJQyxxQkFBSixFQUF6RTtBQUNBLFVBQUtDLFFBQUwsR0FBaUJKLE1BQU0sQ0FBQ0ssT0FBUixHQUFtQixJQUFJQyxtQkFBSixDQUFZTixNQUFNLENBQUNLLE9BQW5CLENBQW5CLEdBQWlELElBQUlDLG1CQUFKLEVBQWpFO0FBQ0EsVUFBS0MsZ0JBQUwsR0FBd0IsQ0FBeEI7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cG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBwdWcgZnJvbSAncHVnJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBodG1sUERGIGZyb20gJ2h0bWwtcGRmJztcbmltcG9ydCBDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IFJlY2lwaWVudCBmcm9tICcuL3JlY2lwaWVudCc7XG5pbXBvcnQgRW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuaW1wb3J0IGkxOG4gZnJvbSAnLi4vbGliL2kxOG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0b3IgZXh0ZW5kcyBDb21tb24ge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3JlY2lwaWVudCA9IChjb25maWcucmVjaXBpZW50KSA/IG5ldyBSZWNpcGllbnQoY29uZmlnLnJlY2lwaWVudCkgOiBuZXcgUmVjaXBpZW50KCk7XG4gICAgdGhpcy5fZW1pdHRlciA9IChjb25maWcuZW1pdHRlcikgPyBuZXcgRW1pdHRlcihjb25maWcuZW1pdHRlcikgOiBuZXcgRW1pdHRlcigpO1xuICAgIHRoaXMuX3RvdGFsX2V4Y190YXhlcyA9IDA7XG4gICAgdGhpcy5fdG90YWxfdGF4ZXMgPSAwO1xuICAgIHRoaXMuX3RvdGFsX2luY190YXhlcyA9IDA7XG4gICAgdGhpcy5fYXJ0aWNsZSA9IFtdO1xuICAgIHRoaXMuX2kxOG5Db25maWd1cmUoY29uZmlnLmxhbmd1YWdlKTtcbiAgICB0aGlzLmh5ZHJhdGUoY29uZmlnLmdsb2JhbCwgdGhpcy5faXRlbXNUb0h5ZHJhdGUoKSk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuICB9XG5cbiAgc2V0IHRlbXBsYXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fdGVtcGxhdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBsYW5nKCkge1xuICAgIHJldHVybiAoIXRoaXMuX2xhbmcpID8gdGhpcy5fZGVmYXVsdExvY2FsZSA6IHRoaXMuX2xhbmc7XG4gIH1cblxuICBzZXQgbGFuZyh2YWx1ZSkge1xuICAgIGNvbnN0IHRtcCA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCF0aGlzLl9hdmFpbGFibGVMb2NhbGUuaW5jbHVkZXModG1wKSkgdGhyb3cgbmV3IEVycm9yKGBXcm9uZyBsYW5nLCBwbGVhc2Ugc2V0IG9uZSBvZiAke3RoaXMuX2F2YWlsYWJsZUxvY2FsZS5qb2luKCcsICcpfWApO1xuICAgIHRoaXMuX2xhbmcgPSB0bXA7XG4gIH1cblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgc2V0IGlkKHZhbHVlKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBvcmRlcl9yZWZlcmVuY2VfcGF0dGVybigpIHtcbiAgICByZXR1cm4gKCF0aGlzLl9vcmRlcl9yZWZlcmVuY2VfcGF0dGVybikgPyAnJHByZWZpeHtPUn0kZGF0ZXtZWU1NfSRzZXBhcmF0b3J7LX0kaWR7MDAwMDB9JyA6IHRoaXMuX29yZGVyX3JlZmVyZW5jZV9wYXR0ZXJuO1xuICB9XG5cbiAgc2V0IG9yZGVyX3JlZmVyZW5jZV9wYXR0ZXJuKHZhbHVlKSB7XG4gICAgdGhpcy5fb3JkZXJfcmVmZXJlbmNlX3BhdHRlcm4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuKCkge1xuICAgIHJldHVybiAoIXRoaXMuX2ludm9pY2VfcmVmZXJlbmNlX3BhdHRlcm4pID8gJyRwcmVmaXh7SU59JGRhdGV7WVlNTX0kc2VwYXJhdG9yey19JGlkezAwMDAwfScgOiB0aGlzLl9pbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuO1xuICB9XG5cbiAgc2V0IGludm9pY2VfcmVmZXJlbmNlX3BhdHRlcm4odmFsdWUpIHtcbiAgICB0aGlzLl9pbnZvaWNlX3JlZmVyZW5jZV9wYXR0ZXJuID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmVmZXJlbmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2U7XG4gIH1cblxuICBzZXQgcmVmZXJlbmNlKHZhbHVlKSB7XG4gICAgdGhpcy5fcmVmZXJlbmNlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbG9nbygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9nbztcbiAgfVxuXG4gIHNldCBsb2dvKHZhbHVlKSB7XG4gICAgdGhpcy5fbG9nbyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG9yZGVyX3RlbXBsYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9vcmRlcl90ZW1wbGF0ZTtcbiAgfVxuXG4gIHNldCBvcmRlcl90ZW1wbGF0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX29yZGVyX3RlbXBsYXRlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaW52b2ljZV90ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2ljZV90ZW1wbGF0ZTtcbiAgfVxuXG4gIHNldCBpbnZvaWNlX3RlbXBsYXRlKHZhbHVlKSB7XG4gICAgdGhpcy5faW52b2ljZV90ZW1wbGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG9yZGVyX25vdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yZGVyX25vdGU7XG4gIH1cblxuICBzZXQgb3JkZXJfbm90ZSh2YWx1ZSkge1xuICAgIHRoaXMuX29yZGVyX25vdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpbnZvaWNlX25vdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9pY2Vfbm90ZTtcbiAgfVxuXG4gIHNldCBpbnZvaWNlX25vdGUodmFsdWUpIHtcbiAgICB0aGlzLl9pbnZvaWNlX25vdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBmb290ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlcjtcbiAgfVxuXG4gIHNldCBmb290ZXIodmFsdWUpIHtcbiAgICB0aGlzLl9mb290ZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBkYXRlX2Zvcm1hdCgpIHtcbiAgICByZXR1cm4gKCF0aGlzLl9kYXRlX2Zvcm1hdCkgPyAnWVlZWS9NTS9ERCcgOiB0aGlzLl9kYXRlX2Zvcm1hdDtcbiAgfVxuXG4gIHNldCBkYXRlX2Zvcm1hdCh2YWx1ZSkge1xuICAgIHRoaXMuX2RhdGVfZm9ybWF0ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgZGF0ZSgpIHtcbiAgICByZXR1cm4gKCF0aGlzLl9kYXRlKSA/IG1vbWVudCgpLmZvcm1hdCh0aGlzLmRhdGVfZm9ybWF0KSA6IHRoaXMuX2RhdGU7XG4gIH1cblxuICBzZXQgZGF0ZSh2YWx1ZSkge1xuICAgIGlmICghbW9tZW50KHZhbHVlKS5pc1ZhbGlkKCkpIHRocm93IG5ldyBFcnJvcignRGF0ZSBub3QgdmFsaWQnKTtcbiAgICB0aGlzLl9kYXRlID0gbW9tZW50KHZhbHVlKS5mb3JtYXQodGhpcy5kYXRlX2Zvcm1hdCk7XG4gIH1cblxuICBnZXQgdG90YWxfZXhjX3RheGVzKCkge1xuICAgIHJldHVybiB0aGlzLl90b3RhbF9leGNfdGF4ZXM7XG4gIH1cblxuICBzZXQgdG90YWxfZXhjX3RheGVzKHZhbHVlKSB7XG4gICAgdGhpcy5fdG90YWxfZXhjX3RheGVzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdG90YWxfdGF4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsX3RheGVzO1xuICB9XG5cbiAgc2V0IHRvdGFsX3RheGVzKHZhbHVlKSB7XG4gICAgdGhpcy5fdG90YWxfdGF4ZXMgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB0b3RhbF9pbmNfdGF4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsX2luY190YXhlcztcbiAgfVxuXG4gIHNldCB0b3RhbF9pbmNfdGF4ZXModmFsdWUpIHtcbiAgICB0aGlzLl90b3RhbF9pbmNfdGF4ZXMgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhcnRpY2xlKCkge1xuICAgIHJldHVybiB0aGlzLl9hcnRpY2xlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEBleGFtcGxlIGFydGljbGUoe2Rlc2NyaXB0aW9uOiAnTGljZW5jZScsIHRheDogMjAsIHByaWNlOiAxMDAsIHF0OiAxfSlcbiAgICogQGV4YW1wbGUgYXJ0aWNsZShbXG4gICAqICB7ZGVzY3JpcHRpb246ICdMaWNlbmNlJywgdGF4OiAyMCwgcHJpY2U6IDEwMCwgcXQ6IDF9LFxuICAgKiAge2Rlc2NyaXB0aW9uOiAnTGljZW5jZScsIHRheDogMjAsIHByaWNlOiAxMDAsIHF0OiAxfVxuICAgKiBdKVxuICAgKi9cbiAgc2V0IGFydGljbGUodmFsdWUpIHtcbiAgICBjb25zdCB0bXAgPSB2YWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0bXApKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRtcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLl9jaGVja0FydGljbGUodG1wW2ldKTtcbiAgICAgICAgdG1wW2ldLnRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRtcFtpXS5wcmljZSAqIHRtcFtpXS5xdCk7XG4gICAgICAgIHRtcFtpXS50b3RhbF9wcm9kdWN0X3RheGVzID0gdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodGhpcy5yb3VuZCh0bXBbaV0udG90YWxfcHJvZHVjdF93aXRob3V0X3RheGVzICogKHRtcFtpXS50YXggLyAxMDApKSk7XG4gICAgICAgIHRtcFtpXS50b3RhbF9wcm9kdWN0X3dpdGhfdGF4ZXMgPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0aGlzLnJvdW5kKE51bWJlcih0bXBbaV0udG90YWxfcHJvZHVjdF93aXRob3V0X3RheGVzKSArIE51bWJlcih0bXBbaV0udG90YWxfcHJvZHVjdF90YXhlcykpKTtcbiAgICAgICAgdG1wW2ldLnByaWNlID0gdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodG1wW2ldLnByaWNlKTtcbiAgICAgICAgdG1wW2ldLnRheCA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRtcFtpXS50YXgpO1xuICAgICAgICB0aGlzLnRvdGFsX2V4Y190YXhlcyArPSBOdW1iZXIodG1wW2ldLnRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyk7XG4gICAgICAgIHRoaXMudG90YWxfaW5jX3RheGVzICs9IE51bWJlcih0bXBbaV0udG90YWxfcHJvZHVjdF93aXRoX3RheGVzKTtcbiAgICAgICAgdGhpcy50b3RhbF90YXhlcyArPSBOdW1iZXIodG1wW2ldLnRvdGFsX3Byb2R1Y3RfdGF4ZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jaGVja0FydGljbGUodG1wKTtcbiAgICAgIHRtcC50b3RhbF9wcm9kdWN0X3dpdGhvdXRfdGF4ZXMgPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0bXAucHJpY2UgKiB0bXAucXQpO1xuICAgICAgdG1wLnRvdGFsX3Byb2R1Y3RfdGF4ZXMgPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0aGlzLnJvdW5kKHRtcC50b3RhbF9wcm9kdWN0X3dpdGhvdXRfdGF4ZXMgKiAodG1wLnRheCAvIDEwMCkpKTtcbiAgICAgIHRtcC50b3RhbF9wcm9kdWN0X3dpdGhfdGF4ZXMgPSB0aGlzLmZvcm1hdE91dHB1dE51bWJlcih0aGlzLnJvdW5kKE51bWJlcih0bXAudG90YWxfcHJvZHVjdF93aXRob3V0X3RheGVzKSArIE51bWJlcih0bXAudG90YWxfcHJvZHVjdF90YXhlcykpKTtcbiAgICAgIHRtcC5wcmljZSA9IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRtcC5wcmljZSk7XG4gICAgICB0bXAudGF4ID0gdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodG1wLnRheCk7XG4gICAgICB0aGlzLnRvdGFsX2V4Y190YXhlcyArPSBOdW1iZXIodG1wLnRvdGFsX3Byb2R1Y3Rfd2l0aG91dF90YXhlcyk7XG4gICAgICB0aGlzLnRvdGFsX2luY190YXhlcyArPSBOdW1iZXIodG1wLnRvdGFsX3Byb2R1Y3Rfd2l0aF90YXhlcyk7XG4gICAgICB0aGlzLnRvdGFsX3RheGVzICs9IE51bWJlcih0bXAudG90YWxfcHJvZHVjdF90YXhlcyk7XG4gICAgfVxuICAgIHRoaXMuX2FydGljbGUgPSAodGhpcy5fYXJ0aWNsZSkgPyB0aGlzLl9hcnRpY2xlLmNvbmNhdCh0bXApIDogW10uY29uY2F0KHRtcCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFJlaW5pdGlhbGl6ZSBhcnRpY2xlIGF0dHJpYnV0ZVxuICAgKi9cbiAgZGVsZXRlQXJ0aWNsZXMoKSB7XG4gICAgdGhpcy5fdG90YWxfaW5jX3RheGVzID0gMDtcbiAgICB0aGlzLl90b3RhbF90YXhlcyA9IDA7XG4gICAgdGhpcy5fdG90YWxfZXhjX3RheGVzID0gMDtcbiAgICB0aGlzLl9hcnRpY2xlID0gW107XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENoZWNrIGFydGljbGUgc3RydWN0dXJlIGFuZCBkYXRhXG4gICAqIEBwYXJhbSBhcnRpY2xlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tBcnRpY2xlKGFydGljbGUpIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcnRpY2xlLCAnZGVzY3JpcHRpb24nKSkgdGhyb3cgbmV3IEVycm9yKCdEZXNjcmlwdGlvbiBhdHRyaWJ1dGUgaXMgbWlzc2luZycpO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFydGljbGUsICd0YXgnKSkgdGhyb3cgbmV3IEVycm9yKCdUYXggYXR0cmlidXRlIGlzIG1pc3NpbmcnKTtcbiAgICBpZiAoIXRoaXMuaXNOdW1lcmljKGFydGljbGUudGF4KSkgdGhyb3cgbmV3IEVycm9yKCdUYXggYXR0cmlidXRlIGhhdmUgdG8gYmUgYSBudW1iZXInKTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcnRpY2xlLCAncHJpY2UnKSkgdGhyb3cgbmV3IEVycm9yKCdQcmljZSBhdHRyaWJ1dGUgaXMgbWlzc2luZycpO1xuICAgIGlmICghdGhpcy5pc051bWVyaWMoYXJ0aWNsZS5wcmljZSkpIHRocm93IG5ldyBFcnJvcignUHJpY2UgYXR0cmlidXRlIGhhdmUgdG8gYmUgYSBudW1iZXInKTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcnRpY2xlLCAncXQnKSkgdGhyb3cgbmV3IEVycm9yKCdRdCBhdHRyaWJ1dGUgaXMgbWlzc2luZycpO1xuICAgIGlmICghdGhpcy5pc051bWVyaWMoYXJ0aWNsZS5xdCkpIHRocm93IG5ldyBFcnJvcignUXQgYXR0cmlidXRlIGhhdmUgdG8gYmUgYW4gaW50ZWdlcicpO1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihhcnRpY2xlLnF0KSkgdGhyb3cgbmV3IEVycm9yKCdRdCBhdHRyaWJ1dGUgaGF2ZSB0byBiZSBhbiBpbnRlZ2VyLCBub3QgYSBmbG9hdCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBIeWRyYXRlIGZyb20gY29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyB7W3N0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZ119XG4gICAqL1xuICBfaXRlbXNUb0h5ZHJhdGUoKSB7XG4gICAgcmV0dXJuIFsnbG9nbycsICdvcmRlcl90ZW1wbGF0ZScsICdpbnZvaWNlX3RlbXBsYXRlJywgJ2RhdGVfZm9ybWF0JywgJ2RhdGUnLCAnb3JkZXJfcmVmZXJlbmNlX3BhdHRlcm4nLCAnaW52b2ljZV9yZWZlcmVuY2VfcGF0dGVybicsICdvcmRlcl9ub3RlJywgJ2ludm9pY2Vfbm90ZScsICdsYW5nJywgJ2Zvb3RlciddO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBIeWRyYXRlIHJlY2lwaWVudCBvYmplY3RcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHJlY2lwaWVudChvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIHRoaXMuX3JlY2lwaWVudDtcbiAgICByZXR1cm4gdGhpcy5fcmVjaXBpZW50Lmh5ZHJhdGUob2JqLCB0aGlzLl9yZWNpcGllbnQuX2l0ZW1zVG9IeWRyYXRlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBIeWRyYXRlIGVtaXR0ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBlbWl0dGVyKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gdGhpcy5fZW1pdHRlcjtcbiAgICByZXR1cm4gdGhpcy5fZW1pdHRlci5oeWRyYXRlKG9iaiwgdGhpcy5fZW1pdHRlci5faXRlbXNUb0h5ZHJhdGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFByZWNvbXBpbGUgdHJhbnNsYXRpb24gdG8gbWVyZ2luZyBnbGFiYWwgd2l0aCBjdXN0b20gdHJhbnNsYXRpb25zXG4gICAqIEByZXR1cm5zIHt7bG9nbzogKiwgaGVhZGVyX2RhdGU6ICosIHRhYmxlX2luZm9ybWF0aW9uLCB0YWJsZV9kZXNjcmlwdGlvbiwgdGFibGVfdGF4LCB0YWJsZV9xdWFudGl0eSxcbiAgICogdGFibGVfcHJpY2Vfd2l0aG91dF90YXhlcywgdGFibGVfcHJpY2Vfd2l0aG91dF90YXhlc191bml0LCB0YWJsZV9ub3RlLCB0YWJsZV90b3RhbF93aXRob3V0X3RheGVzLFxuICAgKiB0YWJsZV90b3RhbF90YXhlcywgdGFibGVfdG90YWxfd2l0aF90YXhlcywgZnJvbXRvX3Bob25lLCBmcm9tdG9fbWFpbCwgZm9vdGVyLCBtb21lbnQ6ICgqfG1vbWVudC5Nb21lbnQpfX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wcmVDb21waWxlQ29tbW9uVHJhbnNsYXRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2dvOiB0aGlzLmxvZ28sXG4gICAgICBoZWFkZXJfZGF0ZTogdGhpcy5kYXRlLFxuICAgICAgdGFibGVfaW5mb3JtYXRpb246IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX2luZm9ybWF0aW9uJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX2Rlc2NyaXB0aW9uOiBpMThuLl9fKHtwaHJhc2U6ICd0YWJsZV9kZXNjcmlwdGlvbicsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICB0YWJsZV90YXg6IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX3RheCcsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICB0YWJsZV9xdWFudGl0eTogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfcXVhbnRpdHknLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgdGFibGVfcHJpY2Vfd2l0aG91dF90YXhlczogaTE4bi5fXyh7cGhyYXNlOiAndGFibGVfcHJpY2Vfd2l0aG91dF90YXhlcycsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICB0YWJsZV9wcmljZV93aXRob3V0X3RheGVzX3VuaXQ6IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX3ByaWNlX3dpdGhvdXRfdGF4ZXNfdW5pdCcsIGxvY2FsZTogdGhpcy5sYW5nfSksXG4gICAgICB0YWJsZV9ub3RlOiBpMThuLl9fKHtwaHJhc2U6ICd0YWJsZV9ub3RlJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX3RvdGFsX3dpdGhvdXRfdGF4ZXM6IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX3RvdGFsX3dpdGhvdXRfdGF4ZXMnLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgdGFibGVfdG90YWxfdGF4ZXM6IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX3RvdGFsX3RheGVzJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIHRhYmxlX3RvdGFsX3dpdGhfdGF4ZXM6IGkxOG4uX18oe3BocmFzZTogJ3RhYmxlX3RvdGFsX3dpdGhfdGF4ZXMnLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgZnJvbXRvX3Bob25lOiBpMThuLl9fKHtwaHJhc2U6ICdmcm9tdG9fcGhvbmUnLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgZnJvbXRvX21haWw6IGkxOG4uX18oe3BocmFzZTogJ2Zyb210b19tYWlsJywgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIGZvb3RlcjogdGhpcy5nZXRGb290ZXIoKSxcbiAgICAgIGVtaXR0ZXJfbmFtZTogdGhpcy5lbWl0dGVyKCkubmFtZSxcbiAgICAgIGVtaXR0ZXJfc3RyZWV0X251bWJlcjogdGhpcy5lbWl0dGVyKCkuc3RyZWV0X251bWJlcixcbiAgICAgIGVtaXR0ZXJfc3RyZWV0X25hbWU6IHRoaXMuZW1pdHRlcigpLnN0cmVldF9uYW1lLFxuICAgICAgZW1pdHRlcl96aXBfY29kZTogdGhpcy5lbWl0dGVyKCkuemlwX2NvZGUsXG4gICAgICBlbWl0dGVyX2NpdHk6IHRoaXMuZW1pdHRlcigpLmNpdHksXG4gICAgICBlbWl0dGVyX2NvdW50cnk6IHRoaXMuZW1pdHRlcigpLmNvdW50cnksXG4gICAgICBlbWl0dGVyX3Bob25lOiB0aGlzLmVtaXR0ZXIoKS5waG9uZSxcbiAgICAgIGVtaXR0ZXJfbWFpbDogdGhpcy5lbWl0dGVyKCkubWFpbCxcbiAgICAgIHJlY2lwaWVudF9jb21wYW55OiB0aGlzLnJlY2lwaWVudCgpLmNvbXBhbnlfbmFtZSxcbiAgICAgIHJlY2lwaWVudF9maXJzdF9uYW1lOiB0aGlzLnJlY2lwaWVudCgpLmZpcnN0X25hbWUsXG4gICAgICByZWNpcGllbnRfbGFzdF9uYW1lOiB0aGlzLnJlY2lwaWVudCgpLmxhc3RfbmFtZSxcbiAgICAgIHJlY2lwaWVudF9zdHJlZXRfbnVtYmVyOiB0aGlzLnJlY2lwaWVudCgpLnN0cmVldF9udW1iZXIsXG4gICAgICByZWNpcGllbnRfc3RyZWV0X25hbWU6IHRoaXMucmVjaXBpZW50KCkuc3RyZWV0X25hbWUsXG4gICAgICByZWNpcGllbnRfemlwX2NvZGU6IHRoaXMucmVjaXBpZW50KCkuemlwX2NvZGUsXG4gICAgICByZWNpcGllbnRfY2l0eTogdGhpcy5yZWNpcGllbnQoKS5jaXR5LFxuICAgICAgcmVjaXBpZW50X2NvdW50cnk6IHRoaXMucmVjaXBpZW50KCkuY291bnRyeSxcbiAgICAgIHJlY2lwaWVudF9waG9uZTogdGhpcy5yZWNpcGllbnQoKS5waG9uZSxcbiAgICAgIHJlY2lwaWVudF9tYWlsOiB0aGlzLnJlY2lwaWVudCgpLm1haWwsXG4gICAgICBhcnRpY2xlczogdGhpcy5hcnRpY2xlLFxuICAgICAgdGFibGVfdG90YWxfd2l0aG91dF90YXhlc192YWx1ZTogdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodGhpcy50b3RhbF9leGNfdGF4ZXMpLFxuICAgICAgdGFibGVfdG90YWxfdGF4ZXNfdmFsdWU6IHRoaXMuZm9ybWF0T3V0cHV0TnVtYmVyKHRoaXMudG90YWxfdGF4ZXMpLFxuICAgICAgdGFibGVfdG90YWxfd2l0aF90YXhlc192YWx1ZTogdGhpcy5mb3JtYXRPdXRwdXROdW1iZXIodGhpcy50b3RhbF9pbmNfdGF4ZXMpLFxuICAgICAgdGVtcGxhdGVfY29uZmlndXJhdGlvbjogdGhpcy5fdGVtcGxhdGVDb25maWd1cmF0aW9uKCksXG4gICAgICBtb21lbnQ6IG1vbWVudCgpLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENvbXBpbGUgcHVnIHRlbXBsYXRlIHRvIEhUTUxcbiAgICogQHBhcmFtIGtleXNcbiAgICogQHJldHVybnMgeyp9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29tcGlsZShrZXlzKSB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBrZXlzLmZpbGVuYW1lID09PSAnb3JkZXInID8gdGhpcy5vcmRlcl90ZW1wbGF0ZSA6IHRoaXMuaW52b2ljZV90ZW1wbGF0ZTtcbiAgICBjb25zdCBjb21waWxlZCA9IHB1Zy5jb21waWxlRmlsZShwYXRoLnJlc29sdmUodGVtcGxhdGUpKTtcbiAgICByZXR1cm4gY29tcGlsZWQoa2V5cyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFByZXBhcmUgcGhyYXNlcyBmcm9tIHRyYW5zbGF0aW9uc1xuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgZ2V0UGhyYXNlcyh0eXBlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlYWRlcl90aXRsZTogaTE4bi5fXyh7cGhyYXNlOiBgJHt0eXBlfV9oZWFkZXJfdGl0bGVgLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgaGVhZGVyX3N1YmplY3Q6IGkxOG4uX18oe3BocmFzZTogYCR7dHlwZX1faGVhZGVyX3N1YmplY3RgLCBsb2NhbGU6IHRoaXMubGFuZ30pLFxuICAgICAgaGVhZGVyX3JlZmVyZW5jZTogaTE4bi5fXyh7cGhyYXNlOiBgJHt0eXBlfV9oZWFkZXJfcmVmZXJlbmNlYCwgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICAgIGhlYWRlcl9kYXRlOiBpMThuLl9fKHtwaHJhc2U6IGAke3R5cGV9X2hlYWRlcl9kYXRlYCwgbG9jYWxlOiB0aGlzLmxhbmd9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gaW52b2ljZSB0cmFuc2xhdGlvbiBrZXlzIG9iamVjdFxuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0SW52b2ljZShwYXJhbXMgPSBbXSkge1xuICAgIGNvbnN0IGtleXMgPSB7XG4gICAgICBpbnZvaWNlX2hlYWRlcl90aXRsZTogdGhpcy5nZXRQaHJhc2VzKCdpbnZvaWNlJykuaGVhZGVyX3RpdGxlLFxuICAgICAgaW52b2ljZV9oZWFkZXJfc3ViamVjdDogdGhpcy5nZXRQaHJhc2VzKCdpbnZvaWNlJykuaGVhZGVyX3N1YmplY3QsXG4gICAgICBpbnZvaWNlX2hlYWRlcl9yZWZlcmVuY2U6IHRoaXMuZ2V0UGhyYXNlcygnaW52b2ljZScpLmhlYWRlcl9yZWZlcmVuY2UsXG4gICAgICBpbnZvaWNlX2hlYWRlcl9yZWZlcmVuY2VfdmFsdWU6IHRoaXMuZ2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4oJ2ludm9pY2UnKSxcbiAgICAgIGludm9pY2VfaGVhZGVyX2RhdGU6IHRoaXMuZ2V0UGhyYXNlcygnaW52b2ljZScpLmhlYWRlcl9kYXRlLFxuICAgICAgdGFibGVfbm90ZV9jb250ZW50OiB0aGlzLmludm9pY2Vfbm90ZSxcbiAgICAgIG5vdGU6IChub3RlKSA9PiAoKG5vdGUpID8gdGhpcy5pbnZvaWNlX25vdGUgPSBub3RlIDogdGhpcy5pbnZvaWNlX25vdGUpLFxuICAgICAgZmlsZW5hbWU6ICdpbnZvaWNlJyxcbiAgICB9O1xuICAgIHBhcmFtcy5mb3JFYWNoKChwaHJhc2UpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBrZXlzW3BocmFzZV0gPSBpMThuLl9fKHsgcGhyYXNlLCBsb2NhbGU6IHRoaXMubGFuZyB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcgJiYgcGhyYXNlLmtleSAmJiBwaHJhc2UudmFsdWUpIHtcbiAgICAgICAga2V5c1twaHJhc2Uua2V5XSA9IHBocmFzZS52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGtleXMsIHtcbiAgICAgIHRvSFRNTDogKCkgPT4gdGhpcy5fdG9IVE1MKGtleXMsIHBhcmFtcyksXG4gICAgICB0b1BERjogKCkgPT4gdGhpcy5fdG9QREYoa2V5cywgcGFyYW1zKSxcbiAgICB9LCB0aGlzLl9wcmVDb21waWxlQ29tbW9uVHJhbnNsYXRpb25zKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gb3JkZXIgdHJhbnNsYXRpb24ga2V5cyBvYmplY3RcbiAgICogQHBhcmFtIHBhcmFtc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldE9yZGVyKHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3Qga2V5cyA9IHtcbiAgICAgIG9yZGVyX2hlYWRlcl90aXRsZTogdGhpcy5nZXRQaHJhc2VzKCdvcmRlcicpLmhlYWRlcl90aXRsZSxcbiAgICAgIG9yZGVyX2hlYWRlcl9zdWJqZWN0OiB0aGlzLmdldFBocmFzZXMoJ29yZGVyJykuaGVhZGVyX3N1YmplY3QsXG4gICAgICBvcmRlcl9oZWFkZXJfcmVmZXJlbmNlOiB0aGlzLmdldFBocmFzZXMoJ29yZGVyJykuaGVhZGVyX3JlZmVyZW5jZSxcbiAgICAgIG9yZGVyX2hlYWRlcl9yZWZlcmVuY2VfdmFsdWU6IHRoaXMuZ2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4oJ29yZGVyJyksXG4gICAgICBvcmRlcl9oZWFkZXJfZGF0ZTogdGhpcy5nZXRQaHJhc2VzKCdvcmRlcicpLmhlYWRlcl9kYXRlLFxuICAgICAgdGFibGVfbm90ZV9jb250ZW50OiB0aGlzLm9yZGVyX25vdGUsXG4gICAgICBub3RlOiAobm90ZSkgPT4gKChub3RlKSA/IHRoaXMub3JkZXJfbm90ZSA9IG5vdGUgOiB0aGlzLm9yZGVyX25vdGUpLFxuICAgICAgZmlsZW5hbWU6ICdvcmRlcicsXG4gICAgfTtcbiAgICBwYXJhbXMuZm9yRWFjaCgocGhyYXNlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAga2V5c1twaHJhc2VdID0gaTE4bi5fXyh7IHBocmFzZSwgbG9jYWxlOiB0aGlzLmxhbmcgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnICYmIHBocmFzZS5rZXkgJiYgcGhyYXNlLnZhbHVlKSB7XG4gICAgICAgIGtleXNbcGhyYXNlLmtleV0gPSBwaHJhc2UudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihrZXlzLCB7XG4gICAgICB0b0hUTUw6ICgpID0+IHRoaXMuX3RvSFRNTChrZXlzLCBwYXJhbXMpLFxuICAgICAgdG9QREY6ICgpID0+IHRoaXMuX3RvUERGKGtleXMsIHBhcmFtcyksXG4gICAgfSwgdGhpcy5fcHJlQ29tcGlsZUNvbW1vblRyYW5zbGF0aW9ucygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIHJpZ2h0IGZvb3RlclxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEZvb3RlcigpIHtcbiAgICBpZiAoIXRoaXMuZm9vdGVyKSByZXR1cm4gaTE4bi5fXyh7cGhyYXNlOiAnZm9vdGVyJywgbG9jYWxlOiB0aGlzLmxhbmd9KTtcblxuICAgIGlmICh0aGlzLmxhbmcgPT09ICdlbicpIHJldHVybiB0aGlzLmZvb3Rlci5lbjtcbiAgICBpZiAodGhpcy5sYW5nID09PSAnZnInKSByZXR1cm4gdGhpcy5mb290ZXIuZnI7XG4gICAgdGhyb3cgRXJyb3IoJ1RoaXMgbGFuZyBkb2VzblxcJ3QgZXhpc3QuJyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiByZWZlcmVuY2UgZnJvbSBwYXR0ZXJuXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuICBnZXRSZWZlcmVuY2VGcm9tUGF0dGVybih0eXBlKSB7XG4gICAgaWYgKCFbJ29yZGVyJywgJ2ludm9pY2UnXS5pbmNsdWRlcyh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKCdUeXBlIGhhdmUgdG8gYmUgXCJvcmRlclwiIG9yIFwiaW52b2ljZVwiJyk7XG4gICAgaWYgKHRoaXMucmVmZXJlbmNlKSByZXR1cm4gdGhpcy5yZWZlcmVuY2U7XG4gICAgcmV0dXJuIHRoaXMuc2V0UmVmZXJlbmNlRnJvbVBhdHRlcm4oKHR5cGUgPT09ICdvcmRlcicpID8gdGhpcy5vcmRlcl9yZWZlcmVuY2VfcGF0dGVybiA6IHRoaXMuaW52b2ljZV9yZWZlcmVuY2VfcGF0dGVybik7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNldCByZWZlcmVuY2VcbiAgICogQHBhcmFtIHBhdHRlcm5cbiAgICogQHJldHVybiB7Kn1cbiAgICogQHByaXZhdGVcbiAgICogQHRvZG8gb3B0aW1pemUgaXRcbiAgICovXG4gIHNldFJlZmVyZW5jZUZyb21QYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBjb25zdCB0bXAgPSBwYXR0ZXJuLnNwbGl0KCckJykuc2xpY2UoMSk7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0bXApIHtcbiAgICAgIGlmICghaXRlbS5lbmRzV2l0aCgnfScpKSB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIHBhdHRlcm4gdHlwZScpO1xuICAgICAgaWYgKGl0ZW0uc3RhcnRzV2l0aCgncHJlZml4eycpKSBvdXRwdXQgKz0gaXRlbS5yZXBsYWNlKCdwcmVmaXh7JywgJycpLnNsaWNlKDAsIC0xKTtcbiAgICAgIGVsc2UgaWYgKGl0ZW0uc3RhcnRzV2l0aCgnc2VwYXJhdG9yeycpKSBvdXRwdXQgKz0gaXRlbS5yZXBsYWNlKCdzZXBhcmF0b3J7JywgJycpLnNsaWNlKDAsIC0xKTtcbiAgICAgIGVsc2UgaWYgKGl0ZW0uc3RhcnRzV2l0aCgnZGF0ZXsnKSkgb3V0cHV0ICs9IG1vbWVudCgpLmZvcm1hdChpdGVtLnJlcGxhY2UoJ2RhdGV7JywgJycpLnNsaWNlKDAsIC0xKSk7XG4gICAgICBlbHNlIGlmIChpdGVtLnN0YXJ0c1dpdGgoJ2lkeycpKSB7XG4gICAgICAgIGNvbnN0IGlkID0gaXRlbS5yZXBsYWNlKCdpZHsnLCAnJykuc2xpY2UoMCwgLTEpO1xuICAgICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoaWQpKSB0aHJvdyBuZXcgRXJyb3IoYElkIG11c3QgYmUgYW4gaW50ZWdlciAoJHtpZH0pYCk7XG4gICAgICAgIG91dHB1dCArPSAodGhpcy5faWQpID8gdGhpcy5wYWQodGhpcy5faWQsIGlkLmxlbmd0aCkgOiB0aGlzLnBhZCgwLCBpZC5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihgJHtpdGVtfSBwYXR0ZXJuIHJlZmVyZW5jZSB1bmtub3duYCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEV4cG9ydCBvYmplY3Qgd2l0aCBodG1sIGNvbnRlbnQgYW5kIGV4cG9ydGF0aW9uIGZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ga2V5c1xuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHt7aHRtbDogKiwgdG9GaWxlOiAoZnVuY3Rpb24oKik6ICopfX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b0hUTUwoa2V5cywgcGFyYW1zID0gW10pIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy5fY29tcGlsZShrZXlzLmZpbGVuYW1lID09PSAnb3JkZXInID8gdGhpcy5nZXRPcmRlcihwYXJhbXMpIDogdGhpcy5nZXRJbnZvaWNlKHBhcmFtcykpO1xuICAgIHJldHVybiB7XG4gICAgICBodG1sLFxuICAgICAgdG9GaWxlOiAoZmlsZXBhdGgpID0+IHRoaXMuX3RvRmlsZUZyb21IVE1MKGh0bWwsIChmaWxlcGF0aCkgfHwgYCR7a2V5cy5maWxlbmFtZX0uaHRtbGApLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNhdmUgY29udGVudCB0byBwZGYgZmlsZVxuICAgKiBAcGFyYW0ga2V5c1xuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3RvUERGKGtleXMsIHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3QgcGRmID0gaHRtbFBERi5jcmVhdGUodGhpcy5fdG9IVE1MKGtleXMsIHBhcmFtcykuaHRtbCwge3RpbWVvdXQ6ICc5MDAwMCd9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcGRmLFxuICAgICAgdG9GaWxlOiAoZmlsZXBhdGgpID0+IHRoaXMuX3RvRmlsZUZyb21QREYocGRmLCAoZmlsZXBhdGgpIHx8IGAke2tleXMuZmlsZW5hbWV9LnBkZmApLFxuICAgICAgdG9CdWZmZXI6ICgpID0+IHRoaXMuX3RvQnVmZmVyRnJvbVBERihwZGYpLFxuICAgICAgdG9TdHJlYW06IChmaWxlcGF0aCkgPT4gdGhpcy5fdG9TdHJlYW1Gcm9tUERGKHBkZiwgKGZpbGVwYXRoKSB8fCBgJHtrZXlzLmZpbGVuYW1lfS5wZGZgKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBTYXZlIGNvbnRlbnQgaW50byBmaWxlIGZyb20gdG9IVE1MKCkgbWV0aG9kXG4gICAqIEBwYXJhbSBjb250ZW50XG4gICAqIEBwYXJhbSBmaWxlcGF0aFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b0ZpbGVGcm9tSFRNTChjb250ZW50LCBmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGNvbnRlbnQsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNhdmUgY29udGVudCBpbnRvIGZpbGUgZnJvbSB0b1BERigpIG1ldGhvZFxuICAgKiBAcGFyYW0gY29udGVudFxuICAgKiBAcGFyYW0gZmlsZXBhdGhcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdG9GaWxlRnJvbVBERihjb250ZW50LCBmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBjb250ZW50LnRvRmlsZShmaWxlcGF0aCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICByZXR1cm4gcmVzb2x2ZShyZXMpO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRXhwb3J0IFBERiB0byBidWZmZXJcbiAgICogQHBhcmFtIGNvbnRlbnRcbiAgICogQHJldHVybnMgeyp9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdG9CdWZmZXJGcm9tUERGKGNvbnRlbnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gY29udGVudC50b0J1ZmZlcigoZXJyLCBidWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIHJldHVybiByZXNvbHZlKGJ1ZmZlcik7XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBFeHBvcnQgUERGIHRvIGZpbGUgdXNpbmcgc3RyZWFtXG4gICAqIEBwYXJhbSBjb250ZW50XG4gICAqIEBwYXJhbSBmaWxlcGF0aFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b1N0cmVhbUZyb21QREYoY29udGVudCwgZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gY29udGVudC50b1N0cmVhbSgoZXJyLCBzdHJlYW0pID0+IHN0cmVhbS5waXBlKGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVwYXRoKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBDYWxjdWxhdGVzIG51bWJlciBvZiBwYWdlcyBhbmQgaXRlbXMgcGVyIHBhZ2VcbiAgICogQHJldHVybiB7e3Jvd3NfaW5fZmlyc3RfcGFnZTogbnVtYmVyLCByb3dzX2luX290aGVyc19wYWdlczogbnVtYmVyLCBsb29wX3RhYmxlOiBudW1iZXJ9fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3RlbXBsYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZV9yb3dzX3Blcl9wYWdlID0gMjk7XG4gICAgY29uc3QgdGVtcGxhdGVDb25maWcgPSB7XG4gICAgICByb3dzX2luX2ZpcnN0X3BhZ2U6ICh0aGlzLmFydGljbGUubGVuZ3RoID4gMTkpID8gdGVtcGxhdGVfcm93c19wZXJfcGFnZSA6IDE5LFxuICAgICAgcm93c19wZXJfcGFnZXM6IDQzLFxuICAgICAgcm93c19pbl9sYXN0X3BhZ2U6IDMzLFxuICAgIH07XG5cbiAgICBsZXQgbmJBcnRpY2xlcyA9IHRoaXMuYXJ0aWNsZS5sZW5ndGg7XG4gICAgbGV0IGxvb3AgPSAxO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAobG9vcCA9PT0gMSkge1xuICAgICAgICBuYkFydGljbGVzIC09IHRlbXBsYXRlQ29uZmlnLnJvd3NfaW5fZmlyc3RfcGFnZTtcbiAgICAgICAgaWYgKG5iQXJ0aWNsZXMgPD0gMCkge1xuICAgICAgICAgIHRlbXBsYXRlQ29uZmlnLmxvb3BfdGFibGUgPSAodGVtcGxhdGVDb25maWcucm93c19pbl9maXJzdF9wYWdlICE9PSB0ZW1wbGF0ZV9yb3dzX3Blcl9wYWdlKSA/IDEgOiAyO1xuICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZUNvbmZpZztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobG9vcCA+PSAyKSB7XG4gICAgICAgIGlmIChuYkFydGljbGVzIDw9IHRlbXBsYXRlQ29uZmlnLnJvd3NfaW5fbGFzdF9wYWdlKSB7XG4gICAgICAgICAgdGVtcGxhdGVDb25maWcubG9vcF90YWJsZSA9IGxvb3A7XG4gICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ29uZmlnO1xuICAgICAgICB9XG4gICAgICAgIG5iQXJ0aWNsZXMgLT0gdGVtcGxhdGVDb25maWcucm93c19wZXJfcGFnZXM7XG4gICAgICAgIGlmIChuYkFydGljbGVzIDw9IDApIHtcbiAgICAgICAgICB0ZW1wbGF0ZUNvbmZpZy5sb29wX3RhYmxlID0gbG9vcDtcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGVDb25maWc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxvb3AgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIE92ZXJyaWRlcyBpMThuIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2kxOG5Db25maWd1cmUoY29uZmlnKSB7XG4gICAgdGhpcy5fZGVmYXVsdExvY2FsZSA9IChjb25maWcgJiYgY29uZmlnLmRlZmF1bHRMb2NhbGUpID8gY29uZmlnLmRlZmF1bHRMb2NhbGUgOiAnZW4nO1xuICAgIHRoaXMuX2F2YWlsYWJsZUxvY2FsZSA9IChjb25maWcgJiYgY29uZmlnLmxvY2FsZXMpID8gY29uZmlnLmxvY2FsZXMgOiBbJ2VuJywgJ2ZyJ107XG4gICAgaWYgKGNvbmZpZykgaTE4bi5jb25maWd1cmUoY29uZmlnKTtcbiAgfVxufVxuIl19