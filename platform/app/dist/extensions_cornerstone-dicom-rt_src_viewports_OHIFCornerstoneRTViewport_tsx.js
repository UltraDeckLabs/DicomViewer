"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function createRTToolGroupAndAddTools(ToolGroupService, customizationService, toolGroupId) {
  const tools = customizationService.getCustomization('cornerstone.overlayViewportTools');
  return ToolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRTToolGroupAndAddTools);

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

/***/ "../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function promptHydrateRT({
  servicesManager,
  rtDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateRTDisplaySet
}) {
  return _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_0__.utils.promptHydrationDialog({
    servicesManager,
    viewportId,
    displaySet: rtDisplaySet,
    preHydrateCallbacks,
    hydrateCallback: hydrateRTDisplaySet,
    type: 'RTSTRUCT'
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptHydrateRT);

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

/***/ "../../../extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _utils_promptHydrateRT__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/promptHydrateRT */ "../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
/* harmony import */ var _utils_initRTToolGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/initRTToolGroup */ "../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts");
/* harmony import */ var _ohif_core_src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/core/src */ "../../core/src/index.ts");
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







const RT_TOOLGROUP_BASE_NAME = 'RTToolGroup';
function OHIFCornerstoneRTViewport(props) {
  _s();
  const {
    servicesManager,
    commandsManager
  } = (0,_ohif_core_src__WEBPACK_IMPORTED_MODULE_6__.useSystem)();
  const {
    children,
    displaySets,
    viewportOptions
  } = props;
  const {
    displaySetService,
    toolGroupService,
    segmentationService,
    customizationService
  } = servicesManager.services;
  const viewportId = viewportOptions.viewportId;
  const toolGroupId = `${RT_TOOLGROUP_BASE_NAME}-${viewportId}`;

  // RT viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('RT viewport should only have a single display set');
  }
  const LoadingIndicatorTotalPercent = customizationService.getCustomization('ui.loadingIndicatorTotalPercent');
  const rtDisplaySet = displaySets[0];
  const [{
    viewports,
    activeViewportId
  }, viewportGridService] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid)();

  // States
  const selectedSegmentObjectIndex = 0;
  const {
    setPositionPresentation
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.usePositionPresentationStore)();
  const [rtIsLoading, setRtIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!rtDisplaySet.isLoaded);
  const [processingProgress, setProcessingProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    percentComplete: null,
    totalSegments: null
  });
  const referencedDisplaySetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const referencedDisplaySetInstanceUID = rtDisplaySet.referencedDisplaySetInstanceUID;
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetInstanceUID);
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (rtIsLoading) {
      return;
    }

    // if not active viewport, return
    if (viewportId !== activeViewportId) {
      return;
    }
    (0,_utils_promptHydrateRT__WEBPACK_IMPORTED_MODULE_4__["default"])({
      servicesManager,
      viewportId,
      rtDisplaySet,
      hydrateRTDisplaySet: async () => {
        return commandsManager.runCommand('hydrateSecondaryDisplaySet', {
          displaySet: rtDisplaySet,
          viewportId
        });
      }
    });
  }, [servicesManager, viewportId, rtDisplaySet, rtIsLoading, commandsManager, activeViewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.rtDisplaySet.displaySetInstanceUID === rtDisplaySet.displaySetInstanceUID) {
        setRtIsLoading(false);
      }
      if (rtDisplaySet?.firstSegmentedSliceImageId && viewportOptions?.presentationIds) {
        const {
          firstSegmentedSliceImageId
        } = rtDisplaySet;
        const {
          presentationIds
        } = viewportOptions;
        setPositionPresentation(presentationIds.positionPresentationId, {
          viewportType: 'stack',
          viewReference: {
            referencedImageId: firstSegmentedSliceImageId
          },
          viewPresentation: {}
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [rtDisplaySet]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const segmentLoadingSubscription = segmentationService.subscribe(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, ({
      percentComplete,
      numSegments
    }) => {
      setProcessingProgress({
        percentComplete,
        totalSegments: numSegments
      });
    });
    const displaySetsRemovedSubscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_REMOVED, ({
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
      segmentLoadingSubscription.unsubscribe();
      displaySetsRemovedSubscription.unsubscribe();
    };
  }, [rtDisplaySet, displaySetService, viewports, activeViewportId, viewportGridService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let toolGroup = toolGroupService.getToolGroup(toolGroupId);
    if (toolGroup) {
      return;
    }
    toolGroup = (0,_utils_initRTToolGroup__WEBPACK_IMPORTED_MODULE_5__["default"])(toolGroupService, customizationService, toolGroupId);
    return () => {
      // remove the segmentation representations if seg displayset changed
      segmentationService.removeSegmentationRepresentations(viewportId);
      referencedDisplaySetRef.current = null;
      toolGroupService.destroyToolGroup(toolGroupId);
    };
  }, []);
  const getCornerstoneViewport = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const {
      displaySet: referencedDisplaySet
    } = referencedDisplaySetRef.current;

    // Todo: jump to the center of the first segment
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.OHIFCornerstoneViewport, _extends({}, props, {
      displaySets: [referencedDisplaySet, rtDisplaySet],
      viewportOptions: {
        viewportType: 'stack',
        toolGroupId: toolGroupId,
        orientation: viewportOptions.orientation,
        viewportId: viewportOptions.viewportId,
        presentationIds: viewportOptions.presentationIds
      },
      onElementEnabled: evt => {
        props.onElementEnabled?.(evt);
      }
    }));
  }, [viewportId, rtDisplaySet, toolGroupId]);
  let childrenWithProps = null;
  if (!referencedDisplaySetRef.current || referencedDisplaySet.displaySetInstanceUID !== referencedDisplaySetRef.current.displaySet.displaySetInstanceUID) {
    return null;
  }
  if (children && children.length) {
    childrenWithProps = children.map((child, index) => {
      return child && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().cloneElement(child, {
        viewportId,
        key: index
      });
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex h-full w-full flex-row overflow-hidden"
  }, rtIsLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LoadingIndicatorTotalPercent, {
    className: "h-full w-full",
    totalNumbers: processingProgress.totalSegments,
    percentComplete: processingProgress.percentComplete,
    loadingText: "Loading RTSTRUCT..."
  }), getCornerstoneViewport(), childrenWithProps));
}
_s(OHIFCornerstoneRTViewport, "zYhF9akmAgdDMmRtsKloRVlJLug=", false, function () {
  return [_ohif_core_src__WEBPACK_IMPORTED_MODULE_6__.useSystem, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid, _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.usePositionPresentationStore];
});
_c = OHIFCornerstoneRTViewport;
OHIFCornerstoneRTViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)),
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};
function _getReferencedDisplaySetMetadata(referencedDisplaySet) {
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
  return referencedDisplaySetMetadata;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneRTViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneRTViewport");

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
//# sourceMappingURL=extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx.js.map