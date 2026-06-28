"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-sr_src_components_OHIFCornerstoneSRViewport_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRContainer.tsx":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRContainer.tsx ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OHIFCornerstoneSRContainer: () => (/* binding */ OHIFCornerstoneSRContainer)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _OHIFCornerstoneSRContentItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OHIFCornerstoneSRContentItem */ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRContentItem.tsx");
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



function OHIFCornerstoneSRContainer(props) {
  const {
    container,
    nodeIndexesTree = [0],
    containerNumberedTree = [1]
  } = props;
  const {
    ContinuityOfContent,
    ConceptNameCodeSequence
  } = container;
  const {
    CodeMeaning
  } = ConceptNameCodeSequence ?? {};
  let childContainerIndex = 1;
  const contentItems = container.ContentSequence?.map((contentItem, i) => {
    const {
      ValueType
    } = contentItem;
    const childNodeLevel = [...nodeIndexesTree, i];
    const key = childNodeLevel.join('.');
    let Component;
    let componentProps;
    if (ValueType === 'CONTAINER') {
      const childContainerNumberedTree = [...containerNumberedTree, childContainerIndex++];
      Component = OHIFCornerstoneSRContainer;
      componentProps = {
        container: contentItem,
        nodeIndexesTree: childNodeLevel,
        containerNumberedTree: childContainerNumberedTree
      };
    } else {
      Component = _OHIFCornerstoneSRContentItem__WEBPACK_IMPORTED_MODULE_2__.OHIFCornerstoneSRContentItem;
      componentProps = {
        contentItem,
        nodeIndexesTree: childNodeLevel,
        continuityOfContent: ContinuityOfContent
      };
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Component, _extends({
      key: key
    }, componentProps));
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "font-bold"
  }, containerNumberedTree.join('.'), ".\xA0", CodeMeaning), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "ml-4 mb-2"
  }, contentItems));
}
_c = OHIFCornerstoneSRContainer;
OHIFCornerstoneSRContainer.propTypes = {
  /**
   * A tree node that may contain another container or one or more content items
   * (text, code, uidref, pname, etc.)
   */
  container: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  /**
   * A 0-based index list
   */
  nodeIndexesTree: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().number)),
  /**
   * A 1-based index list that represents a container in a multi-level numbered
   * list (tree).
   *
   * Example:
   *  1. History
   *    1.1. Chief Complaint
   *    1.2. Present Illness
   *    1.3. Past History
   *    1.4. Family History
   *  2. Findings
   * */
  containerNumberedTree: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().number))
};
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSRContainer");

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRContentItem.tsx":
/*!************************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRContentItem.tsx ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OHIFCornerstoneSRContentItem: () => (/* binding */ OHIFCornerstoneSRContentItem)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums */ "../../../extensions/cornerstone-dicom-sr/src/enums.ts");
/* harmony import */ var _utils_formatContentItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/formatContentItem */ "../../../extensions/cornerstone-dicom-sr/src/utils/formatContentItem.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const EMPTY_TAG_VALUE = '[empty]';
function OHIFCornerstoneSRContentItem(props) {
  const {
    contentItem,
    nodeIndexesTree,
    continuityOfContent
  } = props;
  const {
    ConceptNameCodeSequence
  } = contentItem;
  const {
    CodeValue,
    CodeMeaning
  } = ConceptNameCodeSequence;
  const isChildFirstNode = nodeIndexesTree[nodeIndexesTree.length - 1] === 0;
  const formattedValue = (0,_utils_formatContentItem__WEBPACK_IMPORTED_MODULE_3__["default"])(contentItem) ?? EMPTY_TAG_VALUE;
  const startWithAlphaNumCharRegEx = /^[a-zA-Z0-9]/;
  const isContinuous = continuityOfContent === 'CONTINUOUS';
  const isFinding = CodeValue === _enums__WEBPACK_IMPORTED_MODULE_2__.CodeNameCodeSequenceValues.Finding;
  const addExtraSpace = isContinuous && !isChildFirstNode && startWithAlphaNumCharRegEx.test(formattedValue?.[0]);

  // Collapse sequences of white space preserving newline characters
  let className = 'whitespace-pre-line';
  if (CodeValue === _enums__WEBPACK_IMPORTED_MODULE_2__.CodeNameCodeSequenceValues.Finding) {
    // Preserve spaces because it is common to see tabular text in a
    // "Findings" ConceptNameCodeSequence
    className = 'whitespace-pre-wrap';
  }
  if (isContinuous) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: className,
      title: CodeMeaning
    }, addExtraSpace ? ' ' : '', formattedValue));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "font-bold"
  }, CodeMeaning, ": "), isFinding ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("pre", null, formattedValue) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: className
  }, formattedValue)));
}
_c = OHIFCornerstoneSRContentItem;
OHIFCornerstoneSRContentItem.propTypes = {
  contentItem: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  nodeIndexesTree: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().number)),
  continuityOfContent: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};

var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSRContentItem");

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRMeasurementViewport.tsx":
/*!********************************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRMeasurementViewport.tsx ***!
  \********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tools_modules_dicomSRModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/modules/dicomSRModule */ "../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
/* harmony import */ var _utils_createReferencedImageDisplaySet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/createReferencedImageDisplaySet */ "../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core_src_contextProviders_SystemProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/core/src/contextProviders/SystemProvider */ "../../core/src/contextProviders/SystemProvider.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}







const SR_TOOLGROUP_BASE_NAME = 'SRToolGroup';
function OHIFCornerstoneSRMeasurementViewport(props) {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core_src_contextProviders_SystemProvider__WEBPACK_IMPORTED_MODULE_6__.useSystem)();
  const {
    children,
    dataSource,
    displaySets,
    viewportOptions
  } = props;
  const {
    displaySetService
  } = servicesManager.services;
  const viewportId = viewportOptions.viewportId;

  // SR viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('SR viewport should only have a single display set');
  }
  const srDisplaySet = displaySets[0];
  const {
    setPositionPresentation
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__.usePositionPresentationStore)();
  const [viewportGrid, viewportGridService] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.useViewportGrid)();
  const [measurementSelected, setMeasurementSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [activeImageDisplaySetData, setActiveImageDisplaySetData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [referencedDisplaySetMetadata, setReferencedDisplaySetMetadata] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [element, setElement] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    viewports,
    activeViewportId
  } = viewportGrid;
  const setTrackingIdentifiers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(measurementSelected => {
    const {
      measurements
    } = srDisplaySet;
    (0,_tools_modules_dicomSRModule__WEBPACK_IMPORTED_MODULE_2__.setTrackingUniqueIdentifiersForElement)(element, measurements.map(measurement => measurement.TrackingUniqueIdentifier), measurementSelected);
  }, [element, measurementSelected, srDisplaySet]);

  /**
   * OnElementEnabled callback which is called after the cornerstoneExtension
   * has enabled the element. Note: we delegate all the image rendering to
   * cornerstoneExtension, so we don't need to do anything here regarding
   * the image rendering, element enabling etc.
   */
  const onElementEnabled = evt => {
    setElement(evt.detail.element);
  };
  const updateViewport = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newMeasurementSelected => {
    const {
      StudyInstanceUID,
      displaySetInstanceUID,
      sopClassUids
    } = srDisplaySet;
    if (!StudyInstanceUID || !displaySetInstanceUID) {
      return;
    }
    if (sopClassUids && sopClassUids.length > 1) {
      // Todo: what happens if there are multiple SOP Classes? Why we are
      // not throwing an error?
      console.warn('More than one SOPClassUID in the same series is not yet supported.');
    }
    _getViewportReferencedDisplaySetData(srDisplaySet, newMeasurementSelected, displaySetService).then(({
      referencedDisplaySet,
      referencedDisplaySetMetadata
    }) => {
      if (!referencedDisplaySet || !referencedDisplaySetMetadata) {
        return;
      }
      setMeasurementSelected(newMeasurementSelected);
      setActiveImageDisplaySetData(referencedDisplaySet);
      setReferencedDisplaySetMetadata(referencedDisplaySetMetadata);
      const {
        presentationIds
      } = viewportOptions;
      const measurement = srDisplaySet.measurements[newMeasurementSelected];
      setPositionPresentation(presentationIds.positionPresentationId, {
        viewReference: {
          referencedImageId: measurement.imageId
        }
      });
    });
  }, [dataSource, srDisplaySet, activeImageDisplaySetData, viewportId]);
  const getCornerstoneViewport = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!activeImageDisplaySetData) {
      return null;
    }
    const {
      measurements
    } = srDisplaySet;
    const measurement = measurements[measurementSelected];
    if (!measurement) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__.OHIFCornerstoneViewport, _extends({}, props, {
      // should be passed second since we don't want SR displaySet to
      // override the activeImageDisplaySetData
      displaySets: [activeImageDisplaySetData]
      // It is possible that there is a hanging protocol applying viewportOptions
      // for the SR, so inherit the viewport options
      // TODO: Ensure the viewport options are set correctly with respect to
      // stack etc, in the incoming viewport options.
      ,

      viewportOptions: {
        ...viewportOptions,
        toolGroupId: `${SR_TOOLGROUP_BASE_NAME}`,
        // viewportType should not be required, as the stack type should be
        // required already in order to view SR, but sometimes segmentation
        // views set the viewport type without fixing the allowed display
        viewportType: 'stack',
        // The positionIds for the viewport aren't meaningful for the child display sets
        positionIds: null
      },
      onElementEnabled: evt => {
        props.onElementEnabled?.(evt);
        onElementEnabled(evt);
      },
      isJumpToMeasurementDisabled: true
    }));
  }, [activeImageDisplaySetData, viewportId, measurementSelected]);

  /**
   Cleanup the SR viewport when the viewport is destroyed
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const onDisplaySetsRemovedSubscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_REMOVED, ({
      displaySetInstanceUIDs
    }) => {
      const activeViewport = viewports.get(activeViewportId);
      if (displaySetInstanceUIDs.includes(activeViewport.displaySetInstanceUID)) {
        viewportGridService.setDisplaySetsForViewport({
          viewportId: activeViewportId,
          displaySetInstanceUIDs: []
        });
      }
    });
    return () => {
      onDisplaySetsRemovedSubscription.unsubscribe();
    };
  }, []);

  /**
   * Loading the measurements from the SR viewport, which goes through the
   * isHydratable check, the outcome for the isHydrated state here is always FALSE
   * since we don't do the hydration here. Todo: can't we just set it as false? why
   * we are changing the state here? isHydrated is always false at this stage, and
   * if it is hydrated we don't even use the SR viewport.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const loadSR = async () => {
      if (!srDisplaySet.isLoaded) {
        await srDisplaySet.load();
      }
      updateViewport(measurementSelected);
    };
    loadSR();
  }, [srDisplaySet]);

  /**
   * Hook to update the tracking identifiers when the selected measurement changes or
   * the element changes
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const updateSR = async () => {
      if (!srDisplaySet.isLoaded) {
        await srDisplaySet.load();
      }
      if (!element || !srDisplaySet.isLoaded) {
        return;
      }
      setTrackingIdentifiers(measurementSelected);
    };
    updateSR();
  }, [measurementSelected, element, setTrackingIdentifiers, srDisplaySet]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let childrenWithProps = null;
  if (!activeImageDisplaySetData || !referencedDisplaySetMetadata) {
    return null;
  }
  if (children && children.length) {
    childrenWithProps = children.map((child, index) => {
      return child && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().cloneElement(child, {
        viewportId,
        key: index
      });
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "relative flex h-full w-full flex-row overflow-hidden"
  }, getCornerstoneViewport(), childrenWithProps));
}
_s(OHIFCornerstoneSRMeasurementViewport, "SSRixUzJStWyj6ZIn2Xxj1l92f8=", false, function () {
  return [_ohif_core_src_contextProviders_SystemProvider__WEBPACK_IMPORTED_MODULE_6__.useSystem, _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__.usePositionPresentationStore, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.useViewportGrid];
});
_c = OHIFCornerstoneSRMeasurementViewport;
OHIFCornerstoneSRMeasurementViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node),
  viewportLabel: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  viewportOptions: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)
};
async function _getViewportReferencedDisplaySetData(displaySet, measurementSelected, displaySetService) {
  const {
    measurements
  } = displaySet;
  const measurement = measurements[measurementSelected];
  const {
    displaySetInstanceUID
  } = measurement;
  if (!displaySet.keyImageDisplaySet) {
    // Create a new display set, and preserve a reference to it here,
    // so that it can be re-displayed and shown inside the SR viewport.
    // This is only for ease of redisplay - the display set is stored in the
    // usual manner in the display set service.
    displaySet.keyImageDisplaySet = (0,_utils_createReferencedImageDisplaySet__WEBPACK_IMPORTED_MODULE_3__["default"])(displaySetService, displaySet);
  }
  if (!displaySetInstanceUID) {
    return {
      referencedDisplaySetMetadata: null,
      referencedDisplaySet: null
    };
  }
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  const image0 = referencedDisplaySet.images[0];
  const referencedDisplaySetMetadata = {
    PatientID: image0.PatientID,
    PatientName: image0.PatientName,
    PatientSex: image0.PatientSex,
    PatientAge: image0.PatientAge,
    SliceThickness: image0.SliceThickness,
    StudyDate: image0.StudyDate,
    SeriesDescription: image0.SeriesDescription,
    SeriesInstanceUID: image0.SeriesInstanceUID,
    SeriesNumber: image0.SeriesNumber,
    ManufacturerModelName: image0.ManufacturerModelName,
    SpacingBetweenSlices: image0.SpacingBetweenSlices
  };
  return {
    referencedDisplaySetMetadata,
    referencedDisplaySet
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneSRMeasurementViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSRMeasurementViewport");

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRTextViewport.tsx":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRTextViewport.tsx ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _OHIFCornerstoneSRContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OHIFCornerstoneSRContainer */ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRContainer.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





function OHIFCornerstoneSRTextViewport(props) {
  const {
    displaySets
  } = props;
  const displaySet = displaySets[0];
  const instance = displaySet.instances[0];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "relative flex h-full w-full flex-col overflow-auto p-4 text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_OHIFCornerstoneSRContainer__WEBPACK_IMPORTED_MODULE_3__.OHIFCornerstoneSRContainer, {
    container: instance
  })));
}
_c = OHIFCornerstoneSRTextViewport;
OHIFCornerstoneSRTextViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node),
  viewportLabel: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  viewportOptions: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object).isRequired,
  extensionManager: prop_types__WEBPACK_IMPORTED_MODULE_0___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.ExtensionManager).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneSRTextViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSRTextViewport");

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRViewport.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRViewport.tsx ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _OHIFCornerstoneSRMeasurementViewport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OHIFCornerstoneSRMeasurementViewport */ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRMeasurementViewport.tsx");
/* harmony import */ var _OHIFCornerstoneSRTextViewport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OHIFCornerstoneSRTextViewport */ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRTextViewport.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






function OHIFCornerstoneSRViewport(props) {
  const {
    displaySets
  } = props;
  const {
    isImagingMeasurementReport
  } = displaySets[0];
  if (isImagingMeasurementReport) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_OHIFCornerstoneSRMeasurementViewport__WEBPACK_IMPORTED_MODULE_3__["default"], props);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_OHIFCornerstoneSRTextViewport__WEBPACK_IMPORTED_MODULE_4__["default"], props);
}
_c = OHIFCornerstoneSRViewport;
OHIFCornerstoneSRViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node),
  viewportLabel: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  viewportOptions: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object).isRequired,
  extensionManager: prop_types__WEBPACK_IMPORTED_MODULE_0___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.ExtensionManager).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneSRViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSRViewport");

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/formatContentItem.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/formatContentItem.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatContentItemValue),
/* harmony export */   formatContentItemValue: () => (/* binding */ formatContentItemValue)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Formatters used to format each of the content items (SR "nodes") which can be
 * text, code, UID ref, number, person name, date, time and date time. Each
 * formatter must be a function with the following signature:
 *
 *    [VALUE_TYPE]: (contentItem) => string
 *
 */
const contentItemFormatters = {
  TEXT: contentItem => contentItem.TextValue,
  CODE: contentItem => contentItem.ConceptCodeSequence?.[0]?.CodeMeaning,
  UIDREF: contentItem => contentItem.UID,
  NUM: contentItem => {
    const measuredValue = contentItem.MeasuredValueSequence?.[0];
    if (!measuredValue) {
      return;
    }
    const {
      NumericValue,
      MeasurementUnitsCodeSequence
    } = measuredValue;
    const {
      CodeValue
    } = MeasurementUnitsCodeSequence;
    return `${NumericValue} ${CodeValue}`;
  },
  PNAME: contentItem => {
    const personName = contentItem.PersonName?.[0];
    return personName ? _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(personName) : undefined;
  },
  DATE: contentItem => {
    const {
      Date
    } = contentItem;
    return Date ? _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatDate(Date) : undefined;
  },
  TIME: contentItem => {
    const {
      Time
    } = contentItem;
    return Time ? _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatTime(Time) : undefined;
  },
  DATETIME: contentItem => {
    const {
      DateTime
    } = contentItem;
    if (typeof DateTime !== 'string') {
      return;
    }

    // 14 characters because it should be something like 20180614113714
    if (DateTime.length < 14) {
      return DateTime;
    }
    const dicomDate = DateTime.substring(0, 8);
    const dicomTime = DateTime.substring(8, 14);
    const formattedDate = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatDate(dicomDate);
    const formattedTime = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatTime(dicomTime);
    return `${formattedDate} ${formattedTime}`;
  }
};
function formatContentItemValue(contentItem) {
  const {
    ValueType
  } = contentItem;
  const fnFormat = contentItemFormatters[ValueType];
  return fnFormat ? fnFormat(contentItem) : `[${ValueType} is not supported]`;
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

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-sr_src_components_OHIFCornerstoneSRViewport_tsx.js.map