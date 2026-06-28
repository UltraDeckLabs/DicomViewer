"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-video_src_index_tsx"],{

/***/ "../../../extensions/dicom-video/src/getSopClassHandlerModule.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-video/src/getSopClassHandlerModule.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSopClassHandlerModule)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/dicom-video/src/id.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const SOP_CLASS_UIDS = {
  VIDEO_MICROSCOPIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.2.1',
  VIDEO_PHOTOGRAPHIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.4.1',
  VIDEO_ENDOSCOPIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.1.1',
  /** Need to use fallback, could be video or image */
  SECONDARY_CAPTURE_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.7',
  MULTIFRAME_TRUE_COLOR_SECONDARY_CAPTURE_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.7.4'
};
const sopClassUids = Object.values(SOP_CLASS_UIDS);
const secondaryCaptureSopClassUids = [SOP_CLASS_UIDS.SECONDARY_CAPTURE_IMAGE_STORAGE, SOP_CLASS_UIDS.MULTIFRAME_TRUE_COLOR_SECONDARY_CAPTURE_IMAGE_STORAGE];
const SupportedTransferSyntaxes = {
  MPEG4_AVC_264_HIGH_PROFILE: '1.2.840.10008.1.2.4.102',
  MPEG4_AVC_264_BD_COMPATIBLE_HIGH_PROFILE: '1.2.840.10008.1.2.4.103',
  MPEG4_AVC_264_HIGH_PROFILE_FOR_2D_VIDEO: '1.2.840.10008.1.2.4.104',
  MPEG4_AVC_264_HIGH_PROFILE_FOR_3D_VIDEO: '1.2.840.10008.1.2.4.105',
  MPEG4_AVC_264_STEREO_HIGH_PROFILE: '1.2.840.10008.1.2.4.106',
  HEVC_265_MAIN_PROFILE: '1.2.840.10008.1.2.4.107',
  HEVC_265_MAIN_10_PROFILE: '1.2.840.10008.1.2.4.108'
};
const supportedTransferSyntaxUIDs = Object.values(SupportedTransferSyntaxes);
const _getDisplaySetsFromSeries = (instances, servicesManager, extensionManager) => {
  const dataSource = extensionManager.getActiveDataSource()[0];
  const thumbnailSrc = null;
  console.warn('dataSource=', dataSource);
  return instances.filter(metadata => {
    const tsuid = metadata.AvailableTransferSyntaxUID || metadata.TransferSyntaxUID || metadata['00083002'];
    if (supportedTransferSyntaxUIDs.includes(tsuid)) {
      return true;
    }
    if (metadata.SOPClassUID === SOP_CLASS_UIDS.VIDEO_PHOTOGRAPHIC_IMAGE_STORAGE) {
      return true;
    }

    // Assume that an instance with one of the secondary capture SOPClassUIDs and
    // with at least 90 frames (i.e. typically 3 seconds of video) is indeed a video.
    return secondaryCaptureSopClassUids.includes(metadata.SOPClassUID) && metadata.NumberOfFrames >= 90;
  }).map(instance => {
    const {
      Modality,
      SOPInstanceUID,
      SeriesDescription = 'VIDEO',
      imageId
    } = instance;
    const {
      SeriesNumber,
      SeriesDate,
      SeriesInstanceUID,
      StudyInstanceUID,
      NumberOfFrames,
      url
    } = instance;
    const videoUrl = dataSource.retrieve.directURL({
      instance,
      singlepart: 'video',
      tag: 'PixelData',
      url
    });
    const displaySet = {
      //plugin: id,
      Modality,
      displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.guid(),
      SeriesDescription,
      SeriesNumber,
      SeriesDate,
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID,
      SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerId,
      referencedImages: null,
      measurements: null,
      viewportType: _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.ViewportType.VIDEO,
      instances: [instance],
      getThumbnailSrc: dataSource.retrieve.getGetThumbnailSrc?.(instance),
      thumbnailSrc,
      imageIds: [imageId],
      isDerivedDisplaySet: true,
      isLoaded: false,
      sopClassUids,
      numImageFrames: NumberOfFrames,
      instance,
      supportsWindowLevel: true,
      label: SeriesDescription || `${_ohif_i18n__WEBPACK_IMPORTED_MODULE_2__["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__WEBPACK_IMPORTED_MODULE_2__["default"].t(Modality)}`
    };
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.utilities.genericMetadataProvider.add(imageId, {
      type: 'imageUrlModule',
      metadata: {
        rendered: videoUrl
      }
    });
    return displaySet;
  });
};
function getSopClassHandlerModule(params) {
  const {
    servicesManager,
    extensionManager
  } = params;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-video',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}

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

/***/ "../../../extensions/dicom-video/src/id.js":
/*!*************************************************!*\
  !*** ../../../extensions/dicom-video/src/id.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/dicom-video/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerId = `${id}.sopClassHandlerModule.dicom-video`;


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

/***/ "../../../extensions/dicom-video/src/index.tsx":
/*!*****************************************************!*\
  !*** ../../../extensions/dicom-video/src/index.tsx ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/dicom-video/src/getSopClassHandlerModule.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id */ "../../../extensions/dicom-video/src/id.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}



const Component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().lazy(_c = () => {
  return __webpack_require__.e(/*! import() */ "extensions_dicom-video_src_viewports_OHIFCornerstoneVideoViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstoneVideoViewport */ "../../../extensions/dicom-video/src/viewports/OHIFCornerstoneVideoViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstoneVideoViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, props));
};

/**
 *
 */
_c3 = OHIFCornerstoneVideoViewport;
const dicomVideoExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_2__.id,
  /**
   *
   *
   * @param {object} [configuration={}]
   * @param {object|array} [configuration.csToolsConfig] - Passed directly to `initCornerstoneTools`
   */
  getViewportModule({
    servicesManager,
    extensionManager
  }) {
    const ExtendedOHIFCornerstoneVideoViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(OHIFCornerstoneVideoViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-video',
      component: ExtendedOHIFCornerstoneVideoViewport
    }];
  },
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function _getToolAlias(toolName) {
  let toolAlias = toolName;
  switch (toolName) {
    case 'EllipticalRoi':
      toolAlias = 'SREllipticalRoi';
      break;
  }
  return toolAlias;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dicomVideoExtension);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Component$React.lazy");
__webpack_require__.$Refresh$.register(_c2, "Component");
__webpack_require__.$Refresh$.register(_c3, "OHIFCornerstoneVideoViewport");

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

/***/ "../../../extensions/dicom-video/package.json":
/*!****************************************************!*\
  !*** ../../../extensions/dicom-video/package.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-dicom-video","version":"3.11.0-beta.56","description":"OHIF extension for video display","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-dicom-video.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/ui":"3.11.0-beta.56","dcmjs":"*","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^18.3.1"},"dependencies":{"@babel/runtime":"^7.20.13","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-video_src_index_tsx.js.map