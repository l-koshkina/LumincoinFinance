/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `body {\n  margin: auto;\n}\n\na {\n  text-decoration: none;\n}\n\n.signup {\n  font-size: 12px;\n}\n\n.dropdown-toggle {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.dropdown-toggle svg {\n  fill: #052C65;\n}\n\n.dropdown-toggle.show svg {\n  fill: white;\n  rotate: 90deg;\n  transition: 0.3s;\n}\n\n.dropdown-toggle.show .category-nav {\n  color: white;\n}\n\n.dropdown-toggle::after {\n  display: none;\n}\n\n.nav-pills .nav-link.active svg {\n  fill: white !important;\n}\n\n.nav-link svg {\n  fill: #052C65;\n}\n\ninput {\n  outline: none !important;\n  box-shadow: none !important;\n}\n\n.content {\n  padding: 100px 60px;\n}\n\n.title {\n  color: #052C65;\n}\n\n.offcanvas.offcanvas-start {\n  width: 280px;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://LumincoinFinance/./src/styles/styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://LumincoinFinance/./src/styles/styles.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://LumincoinFinance/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.scss */ \"./src/styles/styles.scss\");\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\n\n\nclass App {\n    constructor() {\n        new _router_js__WEBPACK_IMPORTED_MODULE_1__.Router();\n    }\n}\n\n(new App());\n\n//# sourceURL=webpack://LumincoinFinance/./src/app.js?");

/***/ }),

/***/ "./src/components/auth/login.js":
/*!**************************************!*\
  !*** ./src/components/auth/login.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Login: () => (/* binding */ Login)\n/* harmony export */ });\nclass Login {\n    constructor(openNewRoute) {\n        this.openNewRoute = openNewRoute;\n        this.emailInputElement = document.getElementById('email');\n        this.passwordInputElement = document.getElementById('password');\n        this.formButton = document.getElementById('process-button');\n        this.emailErrorMessageElement = document.getElementById('email-error-message');\n        this.passwordErrorMessageElement = document.getElementById('password-error-message');\n        this.rememberMeElement = document.getElementById('remember-me');\n        this.commonErrorElement = document.getElementById('common-error');\n\n        this.formButton.addEventListener('click', this.login.bind(this));\n    }\n\n    validateForm() {\n        let isValid = true;\n        this.emailInputElement.classList.remove('is-invalid');\n        if (!this.emailInputElement.value) {\n            this.emailInputElement.classList.add('is-invalid');\n            this.emailErrorMessageElement.innerText = 'Укажите адрес электронной почты';\n            isValid = false;\n        } else if (!this.emailInputElement.value.match(/^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/)) {\n            this.emailInputElement.classList.add('is-invalid');\n            this.emailErrorMessageElement.innerText = 'Укажите корректный email';\n            isValid = true;\n        }\n\n        this.passwordInputElement.classList.remove('is-invalid');\n        if (!this.passwordInputElement.value) {\n            this.passwordInputElement.classList.add('is-invalid');\n            this.passwordErrorMessageElement.innerText = 'Введите пароль';\n            isValid = false;\n        } else if (!this.passwordInputElement.value.match(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {\n            this.passwordInputElement.classList.add('is-invalid');\n            this.passwordErrorMessageElement.innerText = 'Пароль должен быть не менее 8 символов, содержать как минимум 1 букву в верхнем регистре и как минимум 1 цифру';\n            isValid = true;\n        }\n\n        return isValid;\n    }\n\n    async login() {\n        this.commonErrorElement.style.display = 'none';\n\n        if (this.validateForm()) {\n            const response = await fetch('http://localhost:3000/api/login', {\n                method: 'POST',\n                headers: {\n                    'Content-type': 'application/json',\n                    'Accept': 'application/json',\n                },\n                body: JSON.stringify({\n                    email: this.emailInputElement.value,\n                    password: this.passwordInputElement.value,\n                    rememberMe: this.rememberMeElement.checked\n\n                })\n            })\n\n            const result = await response.json();\n\n            if (result.error || !result.tokens || !result.user) {\n                this.commonErrorElement.style.display = 'block';\n\n            } else {\n\n                localStorage.setItem('accessToken', result.tokens.accessToken);\n                localStorage.setItem('refreshToken', result.tokens.refreshToken);\n                localStorage.setItem('userInfo', JSON.stringify(result.user));\n\n                this.openNewRoute('/');\n\n            }\n        }\n    }\n}\n\n//# sourceURL=webpack://LumincoinFinance/./src/components/auth/login.js?");

/***/ }),

/***/ "./src/components/auth/signup.js":
/*!***************************************!*\
  !*** ./src/components/auth/signup.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Signup: () => (/* binding */ Signup)\n/* harmony export */ });\nclass Signup {\n    constructor(openNewRoute) {\n        this.openNewRoute = openNewRoute;\n        this.fullNameInputElement = document.getElementById('fullName');\n        this.emailInputElement = document.getElementById('email');\n        this.passwordInputElement = document.getElementById('password');\n        this.passwordRepeatInputElement = document.getElementById('repeat-password');\n        this.formButton = document.getElementById('process-button');\n\n        this.fullNameErrorMessageElement = document.getElementById('fullName-error-message');\n        this.emailErrorMessageElement = document.getElementById('email-error-message');\n        this.passwordErrorMessageElement = document.getElementById('password-error-message');\n        this.passwordRepeatErrorMessageElement = document.getElementById('password-repeat-error-message');\n        this.commonErrorElement = document.getElementById('common-error');\n\n        this.formButton.addEventListener('click', this.signUp.bind(this));\n    }\n\n    validateForm() {\n        let isValid = true;\n        this.fullNameInputElement.classList.remove('is-invalid');\n        if (!this.fullNameInputElement.value) {\n            this.fullNameInputElement.classList.add('is-invalid');\n            this.fullNameErrorMessageElement.innerText = 'Укажите Ваше имя';\n            isValid = false;\n        } else if (!this.fullNameInputElement.value.match(/^[A-ЯЁ][а-яё]+\\s[A-ЯЁ][а-яё]+\\s[A-ЯЁ][а-яё]+$/)) { //Убрать регулярку\n            this.fullNameInputElement.classList.add('is-invalid');\n            this.fullNameErrorMessageElement.innerText = 'Укажите полное имя';\n            isValid = true;\n        }\n\n\n        this.emailInputElement.classList.remove('is-invalid');\n        if (!this.emailInputElement.value) {\n            this.emailInputElement.classList.add('is-invalid');\n            this.emailErrorMessageElement.innerText = 'Укажите адрес электронной почты';\n            isValid = false;\n        } else if (!this.emailInputElement.value.match(/^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/)) {\n            this.emailInputElement.classList.add('is-invalid');\n            this.emailErrorMessageElement.innerText = 'Укажите корректный email';\n            isValid = true;\n        }\n\n        this.passwordInputElement.classList.remove('is-invalid');\n        if (!this.passwordInputElement.value) {\n            this.passwordInputElement.classList.add('is-invalid');\n            this.passwordErrorMessageElement.innerText = 'Введите пароль';\n            isValid = false;\n        } else if (!this.passwordInputElement.value.match(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {\n            this.passwordInputElement.classList.add('is-invalid');\n            this.passwordErrorMessageElement.innerText = 'Пароль должен быть не менее 8 символов, содержать как минимум 1 букву в верхнем регистре и как минимум 1 цифру';\n            isValid = true;\n        }\n\n        this.passwordRepeatInputElement.classList.remove('is-invalid');\n        if (!this.passwordRepeatInputElement.value) {\n            this.passwordRepeatInputElement.classList.add('is-invalid');\n            this.passwordRepeatErrorMessageElement.innerText = 'Подтвердите пароль';\n            isValid = false;\n        } else if (this.passwordRepeatInputElement.value !== this.passwordInputElement.value) {\n            this.passwordRepeatInputElement.classList.add('is-invalid');\n            this.passwordRepeatErrorMessageElement.innerText = 'Пароли должны совпадать';\n\n            isValid = false;\n        }\n        isValid = true;\n\n        return isValid;\n    }\n\n    async signUp() {\n        this.commonErrorElement.style.display = 'none';\n\n        if (this.validateForm()) {\n            const response = await fetch('http://localhost:3000/api/signup', {\n                method: 'POST',\n                headers: {\n                    'Content-type': 'application/json',\n                    'Accept': 'application/json',\n                },\n                body: JSON.stringify({\n                    name: this.fullNameInputElement.value.split(' ')[1],\n                    lastName: this.fullNameInputElement.value.split(' ')[0],\n                    email: this.emailInputElement.value,\n                    password: this.passwordInputElement.value,\n                    passwordRepeat: this.passwordRepeatInputElement.value,\n\n                })\n            })\n\n\n            const result = await response.json();\n            console.log(result);\n\n            if (result.error && result.validation) {\n                this.commonErrorElement.style.display = 'block';\n                this.commonErrorElement.innerText = 'Проверьте правильность заполненных данных';\n            } else if (result.error && !result.validation) {\n                this.commonErrorElement.style.display = 'block';\n                this.commonErrorElement.innerText = 'Пользователь с таким e-mail уже существует';\n            } else {\n                localStorage.setItem('userInfo', JSON.stringify(result.user));\n                this.openNewRoute('/login');\n            }\n\n\n\n        }\n    }\n}\n\n//# sourceURL=webpack://LumincoinFinance/./src/components/auth/signup.js?");

/***/ }),

/***/ "./src/components/main.js":
/*!********************************!*\
  !*** ./src/components/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Main: () => (/* binding */ Main)\n/* harmony export */ });\nclass Main {\n    constructor() {\n        console.log('MAIN');\n    }\n}\n\n//# sourceURL=webpack://LumincoinFinance/./src/components/main.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_auth_login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/auth/login.js */ \"./src/components/auth/login.js\");\n/* harmony import */ var _components_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main.js */ \"./src/components/main.js\");\n/* harmony import */ var _components_auth_signup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/auth/signup.js */ \"./src/components/auth/signup.js\");\n\n\n\n\nclass Router {\n    constructor() {\n        this.titlePageElement = document.getElementById('title');\n        this.contentPageElement = document.getElementById('content');\n\n\n        this.initEvents();\n\n        this.routes = [\n            {\n                route: '/',\n                title: 'Главная',\n                filePathTemplate: '/templates/pages/main.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n                    new _components_main_js__WEBPACK_IMPORTED_MODULE_1__.Main();\n                }\n            },\n            {\n                route: '/404',\n                title: 'Страница не найдена',\n                filePathTemplate: '/templates/pages/404.html',\n                useLayout: false,\n                load: () => {\n\n                }\n            },\n            {\n                route: '/login',\n                title: 'Авторизация',\n                filePathTemplate: '/templates/pages/auth/login.html',\n                useLayout: false,\n                load: () => {\n                    new _components_auth_login_js__WEBPACK_IMPORTED_MODULE_0__.Login(this.openNewRoute.bind(this));\n                }\n            },\n            {\n                route: '/signup',\n                title: 'Регистрация',\n                filePathTemplate: '/templates/pages/auth/signup.html',\n                useLayout: false,\n                load: () => {\n                    new _components_auth_signup_js__WEBPACK_IMPORTED_MODULE_2__.Signup(this.openNewRoute.bind(this));;\n                }\n            },\n            {\n                route: '/income-view',\n                title: 'Доходы',\n                filePathTemplate: '/templates/pages/incomes/income-view.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/income-create',\n                title: 'Создание категории',\n                filePathTemplate: '/templates/pages/incomes/income-create.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/income-edit',\n                title: 'Редактирование категории',\n                filePathTemplate: '/templates/pages/incomes/income-edit.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/expense-view',\n                title: 'Расходы',\n                filePathTemplate: '/templates/pages/expenses/expense-view.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/expense-create',\n                title: 'Создание категории',\n                filePathTemplate: '/templates/pages/expenses/expense-create.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/expense-edit',\n                title: 'Редактирование категории',\n                filePathTemplate: '/templates/pages/expenses/expense-edit.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/incomes-expenses',\n                title: 'Доходы и расходы',\n                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/incomes-expenses-create',\n                title: 'Создание дохода/расхода',\n                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses-create.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n            {\n                route: '/incomes-expenses-edit',\n                title: 'Редактирование дохода/расхода',\n                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses-edit.html',\n                useLayout: '/templates/layout.html',\n                load: () => {\n\n                }\n            },\n\n        ]\n    }\n\n    initEvents() {\n        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));\n        window.addEventListener('popstate', this.activateRoute.bind(this));\n        document.addEventListener('click', this.clickHandler.bind(this));\n    }\n\n    async openNewRoute(url) {\n        const currentRoute = window.location.pathname;\n        history.pushState({}, '', url);\n        await this.activateRoute(null, currentRoute);\n    }\n\n    async clickHandler(e) {\n        let element = null;\n        if (e.target.nodeName === 'A') {\n            element = e.target;\n        } else if (e.target.parentNode.nodeName === 'A') {\n            element = e.target.parentNode;\n        }\n\n\n        if (element) {\n            e.preventDefault();\n\n            const currentRoute = window.location.pathname;\n            const url = element.href.replace(window.location.origin, '');\n            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {\n                return;\n            }\n\n            await this.openNewRoute(url);\n        }\n    }\n\n    async activateRoute() {\n        const urlRoute = window.location.pathname;\n        const newRoute = this.routes.find(item => item.route === urlRoute);\n\n        if (newRoute) {\n            if (newRoute.title) {\n                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';\n            }\n\n            if (newRoute.filePathTemplate) {\n\n                if (newRoute.useLayout) {\n                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());\n                    const contentLayoutPageElement = document.getElementById('content-layout');\n                    contentLayoutPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());\n                    if (document.body.clientWidth <= 768) {\n                        document.getElementById('offcanvasExample').classList.add('offcanvas', 'offcanvas-start');\n                        document.getElementById('offcanvas-btn').classList.remove('d-none');\n                        document.getElementById('offcanvas-btn-close').classList.remove('d-none');\n                    }\n                } else {\n                    this.contentPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());\n                }\n            }\n\n            if (newRoute.load && typeof newRoute.load === 'function') {\n                newRoute.load();\n            }\n        } else {\n            history.pushState({}, '', '/404');\n            await this.activateRoute();\n        }\n    }\n\n}\n\n//# sourceURL=webpack://LumincoinFinance/./src/router.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;