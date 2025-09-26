"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-pmap_src_index_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-pmap/src/getSopClassHandlerModule.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-pmap/src/getSopClassHandlerModule.ts ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-pmap/src/id.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const sopClassUids = ['1.2.840.10008.5.1.4.1.1.30'];
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  const instance = instances[0];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID,
    wadoRoot,
    wadoUri,
    wadoUriRoot
  } = instance;
  const displaySet = {
    // Parametric map use to have the same modality as its referenced volume but
    // "PMAP" is used in the viewer even though this is not a valid DICOM modality
    Modality: 'PMAP',
    isReconstructable: true,
    // by default for now
    displaySetInstanceUID: `pmap.${_ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid()}`,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_4__.SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    referencedVolumeURI: null,
    referencedVolumeId: null,
    isDerivedDisplaySet: true,
    loadStatus: {
      loading: false,
      loaded: false
    },
    sopClassUids,
    instance,
    instances: [instance],
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    supportsWindowLevel: true,
    label: SeriesDescription || `${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('PMAP')}`
  };
  const referencedSeriesSequence = instance.ReferencedSeriesSequence;
  if (!referencedSeriesSequence) {
    console.error('ReferencedSeriesSequence is missing for the parametric map');
    return;
  }
  const referencedSeries = referencedSeriesSequence[0] || referencedSeriesSequence;
  displaySet.referencedImages = instance.ReferencedSeriesSequence.ReferencedInstanceSequence;
  displaySet.referencedSeriesInstanceUID = referencedSeries.SeriesInstanceUID;

  // Does not get the referenced displaySet during parametric displaySet creation
  // because it is still not available (getDisplaySetByUID returns `undefined`).
  displaySet.getReferenceDisplaySet = () => {
    const {
      displaySetService
    } = servicesManager.services;
    if (displaySet.referencedDisplaySetInstanceUID) {
      return displaySetService.getDisplaySetByUID(displaySet.referencedDisplaySetInstanceUID);
    }
    const referencedDisplaySets = displaySetService.getDisplaySetsForSeries(displaySet.referencedSeriesInstanceUID);
    if (!referencedDisplaySets || referencedDisplaySets.length === 0) {
      throw new Error('Referenced displaySet is missing for the parametric map');
    }
    const referencedDisplaySet = referencedDisplaySets[0];
    displaySet.referencedDisplaySetInstanceUID = referencedDisplaySet.displaySetInstanceUID;
    return referencedDisplaySet;
  };

  // Does not get the referenced volumeId during parametric displaySet creation because the
  // referenced displaySet is still not available  (getDisplaySetByUID returns `undefined`).
  displaySet.getReferencedVolumeId = () => {
    if (displaySet.referencedVolumeId) {
      return displaySet.referencedVolumeId;
    }
    const referencedDisplaySet = displaySet.getReferenceDisplaySet();
    const referencedVolumeURI = referencedDisplaySet.displaySetInstanceUID;
    const referencedVolumeId = `${_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__.VOLUME_LOADER_SCHEME}:${referencedVolumeURI}`;
    displaySet.referencedVolumeURI = referencedVolumeURI;
    displaySet.referencedVolumeId = referencedVolumeId;
    return referencedVolumeId;
  };
  displaySet.load = async ({
    headers
  }) => await _load(displaySet, servicesManager, extensionManager, headers);
  return [displaySet];
}
const getRangeFromPixelData = pixelData => {
  let lowest = pixelData[0];
  let highest = pixelData[0];
  for (let i = 1; i < pixelData.length; i++) {
    if (pixelData[i] < lowest) {
      lowest = pixelData[i];
    }
    if (pixelData[i] > highest) {
      highest = pixelData[i];
    }
  }
  return [lowest, highest];
};
async function _load(displaySet, servicesManager, extensionManager, headers) {
  const volumeId = `${_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__.VOLUME_LOADER_SCHEME}:${displaySet.displaySetInstanceUID}`;
  const volumeLoadObject = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolumeLoadObject(volumeId);
  if (volumeLoadObject) {
    return volumeLoadObject.promise;
  }
  displaySet.loading = true;
  displaySet.isLoaded = false;

  // We don't want to fire multiple loads, so we'll wait for the first to finish
  // and also return the same promise to any other callers.
  const promise = _loadParametricMap({
    extensionManager,
    displaySet,
    headers
  });
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.putVolumeLoadObject(volumeId, {
    promise
  }).catch(err => {
    throw err;
  });
  promise.then(() => {
    displaySet.loading = false;
    displaySet.isLoaded = true;
    // Broadcast that loading is complete
    servicesManager.services.segmentationService._broadcastEvent(servicesManager.services.segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, {
      pmapDisplaySet: displaySet
    });
  }).catch(err => {
    displaySet.loading = false;
    displaySet.isLoaded = false;
    throw err;
  });
  return promise;
}
async function _loadParametricMap({
  displaySet,
  headers
}) {
  const arrayBuffer = await _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__.dicomLoaderService.findDicomDataPromise(displaySet, null, headers);
  const referencedVolumeId = displaySet.getReferencedVolumeId();
  const cachedReferencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(referencedVolumeId);

  // Parametric map can be loaded only if its referenced volume exists otherwise it will fail
  if (!cachedReferencedVolume) {
    throw new Error('Referenced Volume is missing for the PMAP, and stack viewport PMAP is not supported yet');
  }
  const {
    imageIds
  } = cachedReferencedVolume;
  const results = await _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersPMAP.Cornerstone3D.ParametricMap.generateToolState(imageIds, arrayBuffer, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData);
  const {
    pixelData
  } = results;
  const TypedArrayConstructor = pixelData.constructor;
  const paramMapId = displaySet.displaySetInstanceUID;
  const derivedVolume = await _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.volumeLoader.createAndCacheDerivedVolume(referencedVolumeId, {
    volumeId: paramMapId,
    targetBuffer: {
      type: TypedArrayConstructor.name
    }
  });
  const newPixelData = new TypedArrayConstructor(pixelData.length);
  for (let i = 0; i < pixelData.length; i++) {
    newPixelData[i] = pixelData[i] * 100;
  }
  derivedVolume.voxelManager.setCompleteScalarDataArray(newPixelData);
  const range = getRangeFromPixelData(newPixelData);
  const windowLevel = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.windowLevel.toWindowLevel(range[0], range[1]);
  derivedVolume.metadata.voiLut = [windowLevel];
  derivedVolume.loadStatus = {
    loaded: true
  };
  return derivedVolume;
}
function getSopClassHandlerModule(params) {
  const {
    servicesManager,
    extensionManager
  } = params;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-pmap',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSopClassHandlerModule);

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

/***/ "../../../extensions/cornerstone-dicom-pmap/src/id.js":
/*!************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-pmap/src/id.js ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dicom-pmap/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dicom-pmap';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;


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

/***/ "../../../extensions/cornerstone-dicom-pmap/src/index.tsx":
/*!****************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-pmap/src/index.tsx ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-pmap/src/id.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/cornerstone-dicom-pmap/src/getSopClassHandlerModule.ts");
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



const Component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().lazy(_c = () => {
  return __webpack_require__.e(/*! import() */ "extensions_cornerstone-dicom-pmap_src_viewports_OHIFCornerstonePMAPViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstonePMAPViewport */ "../../../extensions/cornerstone-dicom-pmap/src/viewports/OHIFCornerstonePMAPViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstonePMAPViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Suspense), {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Component, props));
};

/**
 * You can remove any of the following modules if you don't need them.
 */
_c3 = OHIFCornerstonePMAPViewport;
const extension = {
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  getViewportModule({
    servicesManager,
    extensionManager,
    commandsManager
  }) {
    const ExtendedOHIFCornerstonePMAPViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(OHIFCornerstonePMAPViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager,
        commandsManager: commandsManager
      }, props));
    };
    return [{
      name: 'dicom-pmap',
      component: ExtendedOHIFCornerstonePMAPViewport
    }];
  },
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Component$React.lazy");
__webpack_require__.$Refresh$.register(_c2, "Component");
__webpack_require__.$Refresh$.register(_c3, "OHIFCornerstonePMAPViewport");

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

/***/ "../../../extensions/cornerstone-dicom-pmap/package.json":
/*!***************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-pmap/package.json ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-pmap","version":"3.11.0-beta.56","description":"DICOM Parametric Map read workflow","author":"OHIF","license":"MIT","main":"dist/ohif-extension-cornerstone-dicom-pmap.umd.js","module":"src/index.tsx","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pmap":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/extension-cornerstone":"3.11.0-beta.56","@ohif/extension-default":"3.11.0-beta.56","@ohif/i18n":"3.11.0-beta.56","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","react-i18next":"^12.2.2","react-router":"^6.8.1","react-router-dom":"^6.8.1"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/adapters":"^3.15.6","@cornerstonejs/core":"^3.15.6","@kitware/vtk.js":"32.12.0","react-color":"^2.19.3"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-pmap_src_index_tsx.js.map