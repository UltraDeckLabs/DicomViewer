(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx"],{

/***/ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx":
/*!****************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _DicomMicroscopyViewport_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DicomMicroscopyViewport.css */ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");
/* harmony import */ var _DicomMicroscopyViewport_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_DicomMicroscopyViewport_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ViewportOverlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ViewportOverlay */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx");
/* harmony import */ var _utils_dicomWebClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dicomWebClient */ "../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();







function DicomMicroscopyViewport({
  activeViewportId,
  setViewportActive,
  displaySets,
  viewportId,
  dataSource,
  resizeRef
}) {
  _s();
  const {
    servicesManager,
    extensionManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_6__.useSystem)();
  const [isLoaded, setIsLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [viewer, setViewer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [managedViewer, setManagedViewer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const overlayElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const container = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    microscopyService,
    customizationService
  } = servicesManager.services;
  const overlayData = customizationService.getCustomization('microscopyViewport.overlay');

  // install the microscopy renderer into the web page.
  // you should only do this once.
  const installOpenLayersRenderer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (container, displaySet) => {
    const loadViewer = async metadata => {
      const dicomMicroscopyModule = await microscopyService.importDicomMicroscopyViewer();
      const {
        viewer: DicomMicroscopyViewer,
        metadata: metadataUtils
      } = dicomMicroscopyModule;
      const microscopyViewer = DicomMicroscopyViewer.VolumeImageViewer;
      const client = (0,_utils_dicomWebClient__WEBPACK_IMPORTED_MODULE_4__["default"])({
        extensionManager,
        servicesManager
      });

      // Parse, format, and filter metadata
      const volumeImages = [];

      /**
       * This block of code is the original way of loading DICOM into dicom-microscopy-viewer
       * as in their documentation.
       * But we have the metadata already loaded by our loaders.
       * As the metadata for microscopy DIOM files tends to be big and we don't
       * want to double load it, below we have the mechanism to reconstruct the
       * DICOM JSON structure (denaturalized) from naturalized metadata.
       * (NOTE: Our loaders cache only naturalized metadata, not the denaturalized.)
       */
      // {
      //   const retrieveOptions = {
      //     studyInstanceUID: metadata[0].StudyInstanceUID,
      //     seriesInstanceUID: metadata[0].SeriesInstanceUID,
      //   };
      //   metadata = await client.retrieveSeriesMetadata(retrieveOptions);
      //   // Parse, format, and filter metadata
      //   metadata.forEach(m => {
      //     if (
      //       volumeImages.length > 0 &&
      //       m['00200052'].Value[0] != volumeImages[0].FrameOfReferenceUID
      //     ) {
      //       console.warn(
      //         'Expected FrameOfReferenceUID of difference instances within a series to be the same, found multiple different values',
      //         m['00200052'].Value[0]
      //       );
      //       m['00200052'].Value[0] = volumeImages[0].FrameOfReferenceUID;
      //     }
      //     NOTE: depending on different data source, image.ImageType sometimes
      //     is a string, not a string array.
      //     m['00080008'] = transformImageTypeUnnaturalized(m['00080008']);

      //     const image = new metadataUtils.VLWholeSlideMicroscopyImage({
      //       metadata: m,
      //     });
      //     const imageFlavor = image.ImageType[2];
      //     if (imageFlavor === 'VOLUME' || imageFlavor === 'THUMBNAIL') {
      //       volumeImages.push(image);
      //     }
      //   });
      // }

      metadata.forEach(m => {
        // NOTE: depending on different data source, image.ImageType sometimes
        //    is a string, not a string array.
        m.ImageType = typeof m.ImageType === 'string' ? m.ImageType.split('\\') : m.ImageType;
        const inst = (0,_ohif_extension_default__WEBPACK_IMPORTED_MODULE_1__.cleanDenaturalizedDataset)(dcmjs__WEBPACK_IMPORTED_MODULE_5__["default"].data.DicomMetaDictionary.denaturalizeDataset(m), {
          StudyInstanceUID: m.StudyInstanceUID,
          SeriesInstanceUID: m.SeriesInstanceUID,
          dataSourceConfig: dataSource.getConfig()
        });
        if (!inst['00480105']) {
          // Optical Path Sequence, no OpticalPathIdentifier?
          // NOTE: this is actually a not-well formatted DICOM VL Whole Slide Microscopy Image.
          inst['00480105'] = {
            vr: 'SQ',
            Value: [{
              '00480106': {
                vr: 'SH',
                Value: ['1']
              }
            }]
          };
        }
        const image = new metadataUtils.VLWholeSlideMicroscopyImage({
          metadata: inst
        });
        const imageFlavor = image.ImageType[2];
        if (imageFlavor === 'VOLUME' || imageFlavor === 'THUMBNAIL') {
          volumeImages.push(image);
        }
      });

      // format metadata for microscopy-viewer
      const options = {
        client,
        metadata: volumeImages,
        retrieveRendered: false,
        controls: ['overview', 'position']
      };
      const viewer = new microscopyViewer(options);
      if (overlayElement && overlayElement.current && viewer.addViewportOverlay) {
        viewer.addViewportOverlay({
          element: overlayElement.current,
          coordinates: [0, 0],
          // TODO: dicom-microscopy-viewer documentation says this can be false to be automatically, but it is not.
          navigate: true,
          className: 'OpenLayersOverlay'
        });
      }
      viewer.render({
        container
      });
      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = displaySet;
      const managedViewer = microscopyService.addViewer(viewer, viewportId, container, StudyInstanceUID, SeriesInstanceUID);
      managedViewer.addContextMenuCallback(event => {
        // TODO: refactor this after Bill's changes on ContextMenu feature get merged
        // const roiAnnotationNearBy = this.getNearbyROI(event);
      });
      setViewer(viewer);
      setManagedViewer(managedViewer);
    };
    microscopyService.clearAnnotations();
    let smDisplaySet = displaySet;
    if (displaySet.Modality === 'SR') {
      // for SR displaySet, let's load the actual image displaySet
      smDisplaySet = displaySet.getSourceDisplaySet();
    }
    console.log('Loading viewer metadata', smDisplaySet);
    await loadViewer(smDisplaySet.others);
    if (displaySet.Modality === 'SR') {
      displaySet.load(smDisplaySet);
    }
  }, [dataSource, extensionManager, microscopyService, servicesManager, viewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const displaySet = displaySets[0];
    installOpenLayersRenderer(container.current, displaySet).then(() => {
      setIsLoaded(true);
    });
    return () => {
      if (viewer) {
        microscopyService.removeViewer(viewer);
      }
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const displaySet = displaySets[0];
    microscopyService.clearAnnotations();

    // loading SR
    if (displaySet.Modality === 'SR') {
      const referencedDisplaySet = displaySet.getSourceDisplaySet();
      displaySet.load(referencedDisplaySet);
    }
  }, [managedViewer, displaySets, microscopyService]);
  const style = {
    width: '100%',
    height: '100%'
  };
  const displaySet = displaySets[0];
  const firstInstance = displaySet.firstInstance || displaySet.instance;
  const LoadingIndicatorProgress = customizationService.getCustomization('ui.loadingIndicatorProgress');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: 'DicomMicroscopyViewer',
    style: style,
    onClick: () => {
      if (viewportId !== activeViewportId) {
        setViewportActive(viewportId);
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      ...style,
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      ...style
    },
    ref: overlayElement
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      width: '100%'
    }
  }, displaySet && firstInstance.imageId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ViewportOverlay__WEBPACK_IMPORTED_MODULE_3__["default"], {
    overlayData: overlayData,
    displaySet: displaySet,
    instance: displaySet.instance,
    metadata: displaySet.metadata
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: style,
    ref: ref => {
      container.current = ref;
      resizeRef.current = ref;
    }
  }), isLoaded ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LoadingIndicatorProgress, {
    className: 'h-full w-full bg-black'
  }));
}
_s(DicomMicroscopyViewport, "hpxayOJizhXndjS5pWFZaN+is68=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_6__.useSystem];
});
_c = DicomMicroscopyViewport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DicomMicroscopyViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "DicomMicroscopyViewport");

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

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx":
/*!*************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   generateFromConfig: () => (/* binding */ generateFromConfig)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listComponentGenerator */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx");
/* harmony import */ var _ViewportOverlay_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewportOverlay.css */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");
/* harmony import */ var _ViewportOverlay_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ViewportOverlay_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const {
  formatPN
} = _ohif_core__WEBPACK_IMPORTED_MODULE_5__.utils;
/**
 *
 * @param {*} config is a configuration object that defines four lists of elements,
 * one topLeft, topRight, bottomLeft, bottomRight contents.
 * @param {*} extensionManager is used to load the image data.
 * @returns
 */
const generateFromConfig = ({
  config,
  overlayData,
  ...props
}) => {
  const {
    topLeft = [],
    topRight = [],
    bottomLeft = [],
    bottomRight = []
  } = overlayData ?? {};
  const topLeftClass = 'top-viewport left-viewport text-primary-light';
  const topRightClass = 'top-viewport right-viewport-scrollbar text-primary-light';
  const bottomRightClass = 'bottom-viewport right-viewport-scrollbar text-primary-light';
  const bottomLeftClass = 'bottom-viewport left-viewport text-primary-light';
  const overlay = 'absolute pointer-events-none microscopy-viewport-overlay';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, topLeft && topLeft.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": 'viewport-overlay-top-left',
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, topLeftClass)
  }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
    ...props,
    list: topLeft,
    itemGenerator
  })), topRight && topRight.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": 'viewport-overlay-top-right',
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, topRightClass)
  }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
    ...props,
    list: topRight,
    itemGenerator
  })), bottomRight && bottomRight.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": 'viewport-overlay-bottom-right',
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, bottomRightClass)
  }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
    ...props,
    list: bottomRight,
    itemGenerator
  })), bottomLeft && bottomLeft.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": 'viewport-overlay-bottom-left',
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, bottomLeftClass)
  }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
    ...props,
    list: bottomLeft,
    itemGenerator
  })));
};
const itemGenerator = props => {
  const {
    item
  } = props;
  const {
    title,
    value: valueFunc,
    condition,
    contents
  } = item;
  props.image = {
    ...props.image,
    ...props.metadata
  };
  props.formatDate = _utils__WEBPACK_IMPORTED_MODULE_4__.formatDICOMDate;
  props.formatTime = _utils__WEBPACK_IMPORTED_MODULE_4__.formatDICOMTime;
  props.formatPN = formatPN;
  props.formatNumberPrecision = _utils__WEBPACK_IMPORTED_MODULE_4__.formatNumberPrecision;
  if (condition && !condition(props)) {
    return null;
  }
  if (!contents && !valueFunc) {
    return null;
  }
  const value = valueFunc && valueFunc(props);
  const contentsValue = contents && contents(props) || [{
    className: 'mr-1',
    value: title
  }, {
    classname: 'mr-1 font-light',
    value
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: item.id,
    className: "flex flex-row"
  }, contentsValue.map((content, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    key: idx,
    className: content.className
  }, content.value)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateFromConfig);

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

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx":
/*!******************************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx ***!
  \******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const listComponentGenerator = props => {
  const {
    list,
    itemGenerator
  } = props;
  if (!list) {
    return;
  }
  return list.map(item => {
    if (!item) {
      return;
    }
    const generator = item.generator || itemGenerator;
    if (!generator) {
      throw new Error(`No generator for ${item}`);
    }
    return generator({
      ...props,
      item
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listComponentGenerator);

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

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDICOMDate: () => (/* binding */ formatDICOMDate),
/* harmony export */   formatDICOMTime: () => (/* binding */ formatDICOMTime),
/* harmony export */   formatNumberPrecision: () => (/* binding */ formatNumberPrecision),
/* harmony export */   getCompression: () => (/* binding */ getCompression),
/* harmony export */   isValidNumber: () => (/* binding */ isValidNumber)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "../../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Checks if value is valid.
 *
 * @param {number} value
 * @returns {boolean} is valid.
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Formats number precision.
 *
 * @param {number} number
 * @param {number} precision
 * @returns {number} formatted number.
 */
function formatNumberPrecision(number, precision) {
  if (number !== null) {
    return parseFloat(number).toFixed(precision);
  }
}

/**
 * Formats DICOM date.
 *
 * @param {string} date
 * @param {string} strFormat
 * @returns {string} formatted date.
 */
function formatDICOMDate(date, strFormat = 'MMM D, YYYY') {
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date, 'YYYYMMDD').format(strFormat);
}

/**
 *    DICOM Time is stored as HHmmss.SSS, where:
 *      HH 24 hour time:
 *        m mm        0..59   Minutes
 *        s ss        0..59   Seconds
 *        S SS SSS    0..999  Fractional seconds
 *
 *        Goal: '24:12:12'
 *
 * @param {*} time
 * @param {string} strFormat
 * @returns {string} formatted name.
 */
function formatDICOMTime(time, strFormat = 'HH:mm:ss') {
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(time, 'HH:mm:ss').format(strFormat);
}

/**
 * Gets compression type
 *
 * @param {number} imageId
 * @returns {string} compression type.
 */
function getCompression(imageId) {
  const generalImageModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.metaData.get('generalImageModule', imageId) || {};
  const {
    lossyImageCompression,
    lossyImageCompressionRatio,
    lossyImageCompressionMethod
  } = generalImageModule;
  if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
    const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
    const compressionRatio = formatNumberPrecision(lossyImageCompressionRatio, 2);
    return compressionMethod + compressionRatio + ' : 1';
  }
  return 'Lossless / Uncompressed';
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

/***/ "../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDicomWebClient)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * create a DICOMwebClient object to be used by Dicom Microscopy Viewer
 *
 * Referenced the code from `/extensions/default/src/DicomWebDataSource/index.js`
 *
 * @param param0
 * @returns
 */
function getDicomWebClient({
  extensionManager,
  servicesManager
}) {
  const dataSourceConfig = window.config.dataSources.find(ds => ds.sourceName === extensionManager.activeDataSourceName);
  const {
    userAuthenticationService
  } = servicesManager.services;
  const {
    wadoRoot,
    staticWado,
    singlepart
  } = dataSourceConfig.configuration;
  const wadoConfig = {
    url: wadoRoot || '/dicomlocal',
    staticWado,
    singlepart,
    headers: userAuthenticationService.getAuthorizationHeader(),
    errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.errorHandler.getHTTPErrorHandler()
  };
  const client = new _ohif_extension_default__WEBPACK_IMPORTED_MODULE_1__.StaticWadoClient(wadoConfig);
  client.wadoURL = wadoConfig.url;
  if (extensionManager.activeDataSourceName === 'dicomlocal') {
    /**
     * For local data source, override the retrieveInstanceFrames() method of the
     * dicomweb-client to retrieve image data from memory cached metadata.
     * Other methods of the client doesn't matter, as we are feeding the DMV
     * with the series metadata already.
     *
     * @param {Object} options
     * @param {String} options.studyInstanceUID - Study Instance UID
     * @param {String} options.seriesInstanceUID - Series Instance UID
     * @param {String} options.sopInstanceUID - SOP Instance UID
     * @param {String} options.frameNumbers - One-based indices of Frame Items
     * @param {Object} [options.queryParams] - HTTP query parameters
     * @returns {ArrayBuffer[]} Rendered Frame Items as byte arrays
     */
    //
    client.retrieveInstanceFrames = async options => {
      if (!('studyInstanceUID' in options)) {
        throw new Error('Study Instance UID is required for retrieval of instance frames');
      }
      if (!('seriesInstanceUID' in options)) {
        throw new Error('Series Instance UID is required for retrieval of instance frames');
      }
      if (!('sopInstanceUID' in options)) {
        throw new Error('SOP Instance UID is required for retrieval of instance frames');
      }
      if (!('frameNumbers' in options)) {
        throw new Error('frame numbers are required for retrieval of instance frames');
      }
      console.log(`retrieve frames ${options.frameNumbers.toString()} of instance ${options.sopInstanceUID}`);
      const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getInstance(options.studyInstanceUID, options.seriesInstanceUID, options.sopInstanceUID);
      const frameNumbers = Array.isArray(options.frameNumbers) ? options.frameNumbers : options.frameNumbers.split(',');
      return frameNumbers.map(fr => Array.isArray(instance.PixelData) ? instance.PixelData[+fr - 1] : instance.PixelData);
    };
  }
  return client;
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

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.DicomMicroscopyViewer {
  --ol-partial-background-color: rgba(127, 127, 127, 0.7);
  --ol-foreground-color: #000000;
  --ol-subtle-foreground-color: #000;
  --ol-subtle-background-color: rgba(78, 78, 78, 0.5);
  
  /* Prevent text selection on the entire viewer to avoid interference with annotations */
  -webkit-user-select: none;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
}

.DicomMicroscopyViewer .ol-box {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border-radius: 2px;
  border: 1.5px solid var(--ol-background-color);
  background-color: var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-mouse-position {
  top: 8px;
  right: 8px;
  position: absolute;
}

.DicomMicroscopyViewer .ol-scale-line {
  background: var(--ol-partial-background-color);
  border-radius: 4px;
  bottom: 8px;
  left: 8px;
  padding: 2px;
  position: absolute;
}

.DicomMicroscopyViewer .ol-scale-line-inner {
  border: 1px solid var(--ol-subtle-foreground-color);
  border-top: none;
  color: var(--ol-foreground-color);
  font-size: 10px;
  text-align: center;
  margin: 1px;
  will-change: contents, width;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}

.DicomMicroscopyViewer .ol-scale-bar {
  position: absolute;
  bottom: 8px;
  left: 8px;
}

.DicomMicroscopyViewer .ol-scale-bar-inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.DicomMicroscopyViewer .ol-scale-step-marker {
  width: 1px;
  height: 15px;
  background-color: var(--ol-foreground-color);
  float: right;
  z-index: 10;
}

.DicomMicroscopyViewer .ol-scale-step-text {
  position: absolute;
  bottom: -5px;
  font-size: 10px;
  z-index: 11;
  color: var(--ol-foreground-color);
  text-shadow:
    -1.5px 0 var(--ol-partial-background-color),
    0 1.5px var(--ol-partial-background-color),
    1.5px 0 var(--ol-partial-background-color),
    0 -1.5px var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-scale-text {
  position: absolute;
  font-size: 12px;
  text-align: center;
  bottom: 25px;
  color: var(--ol-foreground-color);
  text-shadow:
    -1.5px 0 var(--ol-partial-background-color),
    0 1.5px var(--ol-partial-background-color),
    1.5px 0 var(--ol-partial-background-color),
    0 -1.5px var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-scale-singlebar {
  position: relative;
  height: 10px;
  z-index: 9;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 1px solid var(--ol-foreground-color);
}

.DicomMicroscopyViewer .ol-scale-singlebar-even {
  background-color: var(--ol-subtle-foreground-color);
}

.DicomMicroscopyViewer .ol-scale-singlebar-odd {
  background-color: var(--ol-background-color);
}

.DicomMicroscopyViewer .ol-unsupported {
  display: none;
}

.DicomMicroscopyViewer .ol-viewport,
.DicomMicroscopyViewer .ol-unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.DicomMicroscopyViewer .ol-viewport canvas {
  all: unset;
}

.DicomMicroscopyViewer .ol-selectable {
  -webkit-touch-callout: default;
  -webkit-user-select: text;
  -moz-user-select: text;
   -ms-user-select: text;
       user-select: text;
}

.DicomMicroscopyViewer .ol-grabbing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

.DicomMicroscopyViewer .ol-grab {
  cursor: move;
  cursor: -webkit-grab;
  cursor: grab;
}

.DicomMicroscopyViewer .ol-control {
  position: absolute;
  background-color: var(--ol-subtle-background-color);
  border-radius: 4px;
}

.DicomMicroscopyViewer .ol-zoom {
  top: 0.5em;
  left: 0.5em;
}

.DicomMicroscopyViewer .ol-rotate {
  top: 0.5em;
  right: 0.5em;
  -webkit-transition:
    opacity 0.25s linear,
    visibility 0s linear;
  transition:
    opacity 0.25s linear,
    visibility 0s linear;
}

.DicomMicroscopyViewer .ol-rotate.ol-hidden {
  opacity: 0;
  visibility: hidden;
  -webkit-transition:
    opacity 0.25s linear,
    visibility 0s linear 0.25s;
  transition:
    opacity 0.25s linear,
    visibility 0s linear 0.25s;
}

.DicomMicroscopyViewer .ol-zoom-extent {
  top: 4.643em;
  left: 0.5em;
}

.DicomMicroscopyViewer .ol-full-screen {
  right: 0.5em;
  top: 0.5em;
}

.DicomMicroscopyViewer .ol-control button {
  display: block;
  margin: 1px;
  padding: 0;
  color: var(--ol-subtle-foreground-color);
  font-weight: bold;
  text-decoration: none;
  font-size: inherit;
  text-align: center;
  height: 1.375em;
  width: 1.375em;
  line-height: 0.4em;
  background-color: var(--ol-background-color);
  border: none;
  border-radius: 2px;
}

.DicomMicroscopyViewer .ol-control button::-moz-focus-inner {
  border: none;
  padding: 0;
}

.DicomMicroscopyViewer .ol-zoom-extent button {
  line-height: 1.4em;
}

.DicomMicroscopyViewer .ol-compass {
  display: block;
  font-weight: normal;
  will-change: transform;
}

.DicomMicroscopyViewer .ol-touch .ol-control button {
  font-size: 1.5em;
}

.DicomMicroscopyViewer .ol-touch .ol-zoom-extent {
  top: 5.5em;
}

.DicomMicroscopyViewer .ol-control button:hover,
.DicomMicroscopyViewer .ol-control button:focus {
  text-decoration: none;
  outline: 1px solid var(--ol-subtle-foreground-color);
  color: var(--ol-foreground-color);
}

.DicomMicroscopyViewer .ol-zoom .ol-zoom-in {
  border-radius: 2px 2px 0 0;
}

.DicomMicroscopyViewer .ol-zoom .ol-zoom-out {
  border-radius: 0 0 2px 2px;
}

.DicomMicroscopyViewer .ol-attribution {
  text-align: right;
  bottom: 0.5em;
  right: 0.5em;
  max-width: calc(100% - 1.3em);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
      -ms-flex-flow: row-reverse;
          flex-flow: row-reverse;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.DicomMicroscopyViewer .ol-attribution a {
  color: var(--ol-subtle-foreground-color);
  text-decoration: none;
}

.DicomMicroscopyViewer .ol-attribution ul {
  margin: 0;
  padding: 1px 0.5em;
  color: var(--ol-foreground-color);
  text-shadow: 0 0 2px var(--ol-background-color);
  font-size: 12px;
}

.DicomMicroscopyViewer .ol-attribution li {
  display: inline;
  list-style: none;
}

.DicomMicroscopyViewer .ol-attribution li:not(:last-child):after {
  content: ' ';
}

.DicomMicroscopyViewer .ol-attribution img {
  max-height: 2em;
  max-width: inherit;
  vertical-align: middle;
}

.DicomMicroscopyViewer .ol-attribution button {
  -ms-flex-negative: 0;
      flex-shrink: 0;
}

.DicomMicroscopyViewer .ol-attribution.ol-collapsed ul {
  display: none;
}

.DicomMicroscopyViewer .ol-attribution:not(.ol-collapsed) {
  background: var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible {
  bottom: 0;
  right: 0;
  border-radius: 4px 0 0;
}

.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible img {
  margin-top: -0.2em;
  max-height: 1.6em;
}

.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible button {
  display: none;
}

.DicomMicroscopyViewer .ol-zoomslider {
  top: 4.5em;
  left: 0.5em;
  height: 200px;
}

.DicomMicroscopyViewer .ol-zoomslider button {
  position: relative;
  height: 10px;
}

.DicomMicroscopyViewer .ol-touch .ol-zoomslider {
  top: 5.5em;
}

.DicomMicroscopyViewer .ol-overviewmap {
  left: 0.5em;
  bottom: 0.5em;
}

.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible {
  bottom: 0;
  left: 0;
  border-radius: 0 4px 0 0;
}

.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map,
.DicomMicroscopyViewer .ol-overviewmap button {
  display: block;
}

.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map {
  border: 1px solid var(--ol-subtle-foreground-color);
  height: 150px;
  width: 150px;
}

.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) button {
  bottom: 0;
  left: 0;
  position: absolute;
}

.DicomMicroscopyViewer .ol-overviewmap.ol-collapsed .ol-overviewmap-map,
.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible button {
  display: none;
}

.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) {
  background: var(--ol-subtle-background-color);
}

.DicomMicroscopyViewer .ol-overviewmap-box {
  border: 0.5px dotted var(--ol-subtle-foreground-color);
}

.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-box:hover {
  cursor: move;
}

@layout-header-background: #007ea3;

@primary-color: #007ea3;

@processing-color: #8cb8c6;

@success-color: #3f9c35;

@warning-color: #eeaf30;

@error-color: #96172e;

@font-size-base: 14px;

.DicomMicroscopyViewer .ol-tooltip {
  font-size: 16px !important;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css"],"names":[],"mappings":"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","sourcesContent":[".DicomMicroscopyViewer {\n  --ol-partial-background-color: rgba(127, 127, 127, 0.7);\n  --ol-foreground-color: #000000;\n  --ol-subtle-foreground-color: #000;\n  --ol-subtle-background-color: rgba(78, 78, 78, 0.5);\n  \n  /* Prevent text selection on the entire viewer to avoid interference with annotations */\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.DicomMicroscopyViewer .ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.DicomMicroscopyViewer .ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.DicomMicroscopyViewer .ol-scale-bar-inner {\n  display: flex;\n}\n\n.DicomMicroscopyViewer .ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.DicomMicroscopyViewer .ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow:\n    -1.5px 0 var(--ol-partial-background-color),\n    0 1.5px var(--ol-partial-background-color),\n    1.5px 0 var(--ol-partial-background-color),\n    0 -1.5px var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow:\n    -1.5px 0 var(--ol-partial-background-color),\n    0 1.5px var(--ol-partial-background-color),\n    1.5px 0 var(--ol-partial-background-color),\n    0 -1.5px var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.DicomMicroscopyViewer .ol-unsupported {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-viewport,\n.DicomMicroscopyViewer .ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.DicomMicroscopyViewer .ol-viewport canvas {\n  all: unset;\n}\n\n.DicomMicroscopyViewer .ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.DicomMicroscopyViewer .ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.DicomMicroscopyViewer .ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.DicomMicroscopyViewer .ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.DicomMicroscopyViewer .ol-zoom {\n  top: 0.5em;\n  left: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-rotate {\n  top: 0.5em;\n  right: 0.5em;\n  transition:\n    opacity 0.25s linear,\n    visibility 0s linear;\n}\n\n.DicomMicroscopyViewer .ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition:\n    opacity 0.25s linear,\n    visibility 0s linear 0.25s;\n}\n\n.DicomMicroscopyViewer .ol-zoom-extent {\n  top: 4.643em;\n  left: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-full-screen {\n  right: 0.5em;\n  top: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: 0.4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.DicomMicroscopyViewer .ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.DicomMicroscopyViewer .ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.DicomMicroscopyViewer .ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.DicomMicroscopyViewer .ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.DicomMicroscopyViewer .ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.DicomMicroscopyViewer .ol-control button:hover,\n.DicomMicroscopyViewer .ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.DicomMicroscopyViewer .ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.DicomMicroscopyViewer .ol-attribution {\n  text-align: right;\n  bottom: 0.5em;\n  right: 0.5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.DicomMicroscopyViewer .ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.DicomMicroscopyViewer .ol-attribution ul {\n  margin: 0;\n  padding: 1px 0.5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.DicomMicroscopyViewer .ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.DicomMicroscopyViewer .ol-attribution li:not(:last-child):after {\n  content: ' ';\n}\n\n.DicomMicroscopyViewer .ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.DicomMicroscopyViewer .ol-attribution button {\n  flex-shrink: 0;\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible img {\n  margin-top: -0.2em;\n  max-height: 1.6em;\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-zoomslider {\n  top: 4.5em;\n  left: 0.5em;\n  height: 200px;\n}\n\n.DicomMicroscopyViewer .ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.DicomMicroscopyViewer .ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map,\n.DicomMicroscopyViewer .ol-overviewmap button {\n  display: block;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.DicomMicroscopyViewer .ol-overviewmap-box {\n  border: 0.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n@layout-header-background: #007ea3;\n@primary-color: #007ea3;\n@processing-color: #8cb8c6;\n@success-color: #3f9c35;\n@warning-color: #eeaf30;\n@error-color: #96172e;\n@font-size-base: 14px;\n\n.DicomMicroscopyViewer .ol-tooltip {\n  font-size: 16px !important;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.DicomMicroscopyViewer .OpenLayersOverlay {
  height: 100%;
  width: 100%;
  display: block !important;
  pointer-events: none !important;
}

.DicomMicroscopyViewer .text-primary-light {
  font-size: 14px;
  color: yellow;
  font-weight: normal;
}

.DicomMicroscopyViewer .text-primary-light span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
  /* text-shadow: 0px 1px 1px rgba(225, 225, 225, 0.6),
              0px 1px 1px rgba(225, 225, 225, 0.6),
              1px 1px 3px rgba(225, 225, 225, 0.9),
              1px 1px 3px rgba(225, 225, 225, 0.9),
              1px 1px 3px rgba(225, 225, 225, 0.9),
              1px 1px 3px rgba(225, 225, 225, 0.9); */
}

.DicomMicroscopyViewer .absolute {
  position: absolute;
}

.DicomMicroscopyViewer .flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.DicomMicroscopyViewer .flex-row {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
}

.DicomMicroscopyViewer .flex-col {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}

.DicomMicroscopyViewer .pointer-events-none {
  pointer-events: none;
}

.DicomMicroscopyViewer .left-viewport-scrollbar {
  left: 0.5rem;
}

.DicomMicroscopyViewer .right-viewport-scrollbar {
  right: 1.3rem;
}

.DicomMicroscopyViewer .top-viewport {
  top: 0.5rem;
}

.DicomMicroscopyViewer .bottom-viewport {
  bottom: 0.5rem;
}

.DicomMicroscopyViewer .bottom-viewport.left-viewport {
  bottom: 0.5rem;
  left: calc(0.5rem + 250px);
}

.DicomMicroscopyViewer .right-viewport-scrollbar .flex {
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: end;
}

.DicomMicroscopyViewer .microscopy-viewport-overlay {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.5);
  max-width: 40%;
}

.DicomMicroscopyViewer .microscopy-viewport-overlay .flex {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.DicomMicroscopyViewer .top-viewport .flex span:not(.font-light) {
  -ms-flex-negative: 0;
      flex-shrink: 0;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,WAAW;EACX,yBAAyB;EACzB,+BAA+B;AACjC;;AAEA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;EAChB;;;;;qDAKmD;AACrD;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;AACf;;AAEA;EACE,8BAAmB;EAAnB,6BAAmB;MAAnB,uBAAmB;UAAnB,mBAAmB;AACrB;;AAEA;EACE,4BAAsB;EAAtB,6BAAsB;MAAtB,0BAAsB;UAAtB,sBAAsB;AACxB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,qBAAoB;MAApB,kBAAoB;UAApB,oBAAoB;AACtB;;AAEA;EACE,oBAAoB;EACpB,8BAA8B;EAC9B,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,oBAAc;MAAd,cAAc;AAChB","sourcesContent":[".DicomMicroscopyViewer .OpenLayersOverlay {\n  height: 100%;\n  width: 100%;\n  display: block !important;\n  pointer-events: none !important;\n}\n\n.DicomMicroscopyViewer .text-primary-light {\n  font-size: 14px;\n  color: yellow;\n  font-weight: normal;\n}\n\n.DicomMicroscopyViewer .text-primary-light span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  max-width: 300px;\n  /* text-shadow: 0px 1px 1px rgba(225, 225, 225, 0.6),\n              0px 1px 1px rgba(225, 225, 225, 0.6),\n              1px 1px 3px rgba(225, 225, 225, 0.9),\n              1px 1px 3px rgba(225, 225, 225, 0.9),\n              1px 1px 3px rgba(225, 225, 225, 0.9),\n              1px 1px 3px rgba(225, 225, 225, 0.9); */\n}\n\n.DicomMicroscopyViewer .absolute {\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .flex {\n  display: flex;\n}\n\n.DicomMicroscopyViewer .flex-row {\n  flex-direction: row;\n}\n\n.DicomMicroscopyViewer .flex-col {\n  flex-direction: column;\n}\n\n.DicomMicroscopyViewer .pointer-events-none {\n  pointer-events: none;\n}\n\n.DicomMicroscopyViewer .left-viewport-scrollbar {\n  left: 0.5rem;\n}\n\n.DicomMicroscopyViewer .right-viewport-scrollbar {\n  right: 1.3rem;\n}\n\n.DicomMicroscopyViewer .top-viewport {\n  top: 0.5rem;\n}\n\n.DicomMicroscopyViewer .bottom-viewport {\n  bottom: 0.5rem;\n}\n\n.DicomMicroscopyViewer .bottom-viewport.left-viewport {\n  bottom: 0.5rem;\n  left: calc(0.5rem + 250px);\n}\n\n.DicomMicroscopyViewer .right-viewport-scrollbar .flex {\n  justify-content: end;\n}\n\n.DicomMicroscopyViewer .microscopy-viewport-overlay {\n  padding: 0.5rem 1rem;\n  background: rgba(0, 0, 0, 0.5);\n  max-width: 40%;\n}\n\n.DicomMicroscopyViewer .microscopy-viewport-overlay .flex {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.DicomMicroscopyViewer .top-viewport .flex span:not(.font-light) {\n  flex-shrink: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css":
/*!****************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomMicroscopyViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");

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
      /*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomMicroscopyViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css",
      function () {
        content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomMicroscopyViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");

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

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./ViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");

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
      /*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./ViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css",
      function () {
        content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./ViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");

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
//# sourceMappingURL=extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx.js.map