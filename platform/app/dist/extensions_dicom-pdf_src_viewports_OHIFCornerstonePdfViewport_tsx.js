(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx"],{

/***/ "../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _OHIFCornerstonePdfViewport_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OHIFCornerstonePdfViewport.css */ "../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css");
/* harmony import */ var _OHIFCornerstonePdfViewport_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_OHIFCornerstonePdfViewport_css__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




function OHIFCornerstonePdfViewport({
  displaySets,
  viewportId = 'pdf-viewport'
}) {
  _s();
  const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const viewportElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const viewportRef = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useViewportRef)(viewportId);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.addEventListener('drag', makePdfDropTarget);
    return function cleanup() {
      document.body.removeEventListener('drag', makePdfDropTarget);
      viewportRef.unregister();
    };
  }, []);
  const [style, setStyle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('pdf-yes-click');
  const makePdfScrollable = () => {
    setStyle('pdf-yes-click');
  };
  const makePdfDropTarget = () => {
    setStyle('pdf-no-click');
  };
  if (displaySets && displaySets.length > 1) {
    throw new Error('OHIFCornerstonePdfViewport: only one display set is supported for dicom pdf right now');
  }
  const {
    renderedUrl
  } = displaySets[0];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const load = async () => {
      setUrl(await renderedUrl);
    };
    load();
  }, [renderedUrl]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-black h-full w-full text-white",
    onClick: makePdfScrollable,
    ref: el => {
      viewportElementRef.current = el;
      if (el) viewportRef.register(el);
    },
    "data-viewport-id": viewportId
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("object", {
    data: url,
    type: "application/pdf",
    className: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "No online PDF viewer installed")));
}
_s(OHIFCornerstonePdfViewport, "OdpzEKeVU8Go9lzU9zthfLn7mEE=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useViewportRef];
});
_c = OHIFCornerstonePdfViewport;
OHIFCornerstonePdfViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)).isRequired,
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstonePdfViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstonePdfViewport");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.pdf-no-click {
  pointer-events: none;
  height: 100%;
  width: 100%;
}

.pdf-yes-click {
  pointer-events: auto;
  height: 100%;
  width: 100%;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb","sourcesContent":[".pdf-no-click {\n  pointer-events: none;\n  height: 100%;\n  width: 100%;\n}\n\n.pdf-yes-click {\n  pointer-events: auto;\n  height: 100%;\n  width: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css":
/*!**********************************************************************************!*\
  !*** ../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./OHIFCornerstonePdfViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./OHIFCornerstonePdfViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css",
      function () {
        content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./OHIFCornerstonePdfViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx.js.map