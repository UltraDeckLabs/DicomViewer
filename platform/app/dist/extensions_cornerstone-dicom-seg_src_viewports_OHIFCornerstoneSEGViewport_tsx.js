"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function createSEGToolGroupAndAddTools(ToolGroupService, customizationService, toolGroupId) {
  const tools = customizationService.getCustomization('cornerstone.overlayViewportTools');
  return ToolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSEGToolGroupAndAddTools);

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function promptHydrateSEG({
  servicesManager,
  segDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateCallback
}) {
  return _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_0__.utils.promptHydrationDialog({
    servicesManager,
    viewportId,
    displaySet: segDisplaySet,
    preHydrateCallbacks,
    hydrateCallback,
    type: 'SEG'
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptHydrateSEG);

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _utils_initSEGToolGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/initSEGToolGroup */ "../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts");
/* harmony import */ var _utils_promptHydrateSEG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/promptHydrateSEG */ "../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cornerstonejs/tools/enums */ "../../../node_modules/@cornerstonejs/tools/dist/esm/enums/index.js");
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







const SEG_TOOLGROUP_BASE_NAME = 'SEGToolGroup';
function OHIFCornerstoneSEGViewport(props) {
  _s();
  const {
    servicesManager,
    commandsManager
  } = (0,_ohif_core_src_contextProviders_SystemProvider__WEBPACK_IMPORTED_MODULE_6__.useSystem)();
  const {
    children,
    displaySets,
    viewportOptions
  } = props;
  const viewportId = viewportOptions.viewportId;
  const {
    displaySetService,
    toolGroupService,
    segmentationService,
    customizationService
  } = servicesManager.services;
  const LoadingIndicatorTotalPercent = customizationService.getCustomization('ui.loadingIndicatorTotalPercent');
  const toolGroupId = `${SEG_TOOLGROUP_BASE_NAME}-${viewportId}`;

  // SEG viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('SEG viewport should only have a single display set');
  }
  const segDisplaySet = displaySets[0];
  const [viewportGrid, viewportGridService] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid)();

  // States
  const {
    setPositionPresentation
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__.usePositionPresentationStore)();

  // Hydration means that the SEG is opened and segments are loaded into the
  // segmentation panel, and SEG is also rendered on any viewport that is in the
  // same frameOfReferenceUID as the referencedSeriesUID of the SEG. However,
  // loading basically means SEG loading over network and bit unpacking of the
  // SEG data.
  const [segIsLoading, setSegIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!segDisplaySet.isLoaded);
  const [processingProgress, setProcessingProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    percentComplete: null,
    totalSegments: null
  });

  // refs
  const referencedDisplaySetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    viewports,
    activeViewportId
  } = viewportGrid;
  const referencedDisplaySetInstanceUID = segDisplaySet.referencedDisplaySetInstanceUID;
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetInstanceUID);
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet, segDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  const getCornerstoneViewport = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__.OHIFCornerstoneViewport, _extends({}, props, {
      displaySets: [segDisplaySet],
      viewportOptions: {
        viewportType: viewportOptions.viewportType,
        toolGroupId: toolGroupId,
        orientation: viewportOptions.orientation,
        viewportId: viewportOptions.viewportId,
        presentationIds: viewportOptions.presentationIds
      },
      onElementEnabled: evt => {
        props.onElementEnabled?.(evt);
      }
    }));
  }, [viewportId, segDisplaySet, toolGroupId, props, viewportOptions]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (segIsLoading) {
      return;
    }

    // if not active viewport, return
    if (viewportId !== activeViewportId) {
      return;
    }
    (0,_utils_promptHydrateSEG__WEBPACK_IMPORTED_MODULE_3__["default"])({
      servicesManager,
      viewportId,
      segDisplaySet,
      hydrateCallback: async () => {
        await commandsManager.runCommand('hydrateSecondaryDisplaySet', {
          displaySet: segDisplaySet,
          viewportId
        });
        return true;
      }
    });
  }, [servicesManager, viewportId, segDisplaySet, segIsLoading, commandsManager, activeViewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // on new seg display set, remove all segmentations from all viewports
    segmentationService.clearSegmentationRepresentations(viewportId);
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.segDisplaySet.displaySetInstanceUID === segDisplaySet.displaySetInstanceUID) {
        setSegIsLoading(false);
      }
      if (segDisplaySet?.firstSegmentedSliceImageId && viewportOptions?.presentationIds) {
        const {
          firstSegmentedSliceImageId
        } = segDisplaySet;
        const {
          presentationIds
        } = viewportOptions;
        setPositionPresentation(presentationIds.positionPresentationId, {
          viewReference: {
            referencedImageId: firstSegmentedSliceImageId
          }
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [segDisplaySet]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, ({
      percentComplete,
      numSegments
    }) => {
      setProcessingProgress({
        percentComplete,
        totalSegments: numSegments
      });
    });
    return () => {
      unsubscribe();
    };
  }, [segDisplaySet]);

  /**
   Cleanup the SEG viewport when the viewport is destroyed
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let toolGroup = toolGroupService.getToolGroup(toolGroupId);
    if (toolGroup) {
      return;
    }

    // keep the already stored segmentationPresentation for this viewport in memory
    // so that we can restore it after hydrating the SEG
    commandsManager.runCommand('updateStoredSegmentationPresentation', {
      displaySet: segDisplaySet,
      type: _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_5__.SegmentationRepresentations.Labelmap
    });

    // always start fresh for this viewport since it is special type of viewport
    // that should only show one segmentation at a time.
    segmentationService.clearSegmentationRepresentations(viewportId);

    // This creates a custom tool group which has the lifetime of this view
    // only, and does NOT interfere with currently displayed segmentations.
    toolGroup = (0,_utils_initSEGToolGroup__WEBPACK_IMPORTED_MODULE_2__["default"])(toolGroupService, customizationService, toolGroupId);
    return () => {
      // remove the segmentation representations if seg displayset changed
      // e.g., another seg displayset is dragged into the viewport
      segmentationService.clearSegmentationRepresentations(viewportId);

      // Only destroy the viewport specific implementation
      toolGroupService.destroyToolGroup(toolGroupId);
    };
  }, []);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  }, segIsLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LoadingIndicatorTotalPercent, {
    className: "h-full w-full",
    totalNumbers: processingProgress.totalSegments,
    percentComplete: processingProgress.percentComplete,
    loadingText: "Loading SEG..."
  }), getCornerstoneViewport(), childrenWithProps));
}
_s(OHIFCornerstoneSEGViewport, "/NlgfjCOpqwGHmIeqD+ZM7fk7RM=", false, function () {
  return [_ohif_core_src_contextProviders_SystemProvider__WEBPACK_IMPORTED_MODULE_6__.useSystem, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid, _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_4__.usePositionPresentationStore];
});
_c = OHIFCornerstoneSEGViewport;
function _getReferencedDisplaySetMetadata(referencedDisplaySet, segDisplaySet) {
  const {
    SharedFunctionalGroupsSequence
  } = segDisplaySet.instance;
  const SharedFunctionalGroup = Array.isArray(SharedFunctionalGroupsSequence) ? SharedFunctionalGroupsSequence[0] : SharedFunctionalGroupsSequence;
  const {
    PixelMeasuresSequence
  } = SharedFunctionalGroup;
  const PixelMeasures = Array.isArray(PixelMeasuresSequence) ? PixelMeasuresSequence[0] : PixelMeasuresSequence;
  const {
    SpacingBetweenSlices,
    SliceThickness
  } = PixelMeasures;
  const image0 = referencedDisplaySet.images[0];
  const referencedDisplaySetMetadata = {
    PatientID: image0.PatientID,
    PatientName: image0.PatientName,
    PatientSex: image0.PatientSex,
    PatientAge: image0.PatientAge,
    SliceThickness: image0.SliceThickness || SliceThickness,
    StudyDate: image0.StudyDate,
    SeriesDescription: image0.SeriesDescription,
    SeriesInstanceUID: image0.SeriesInstanceUID,
    SeriesNumber: image0.SeriesNumber,
    ManufacturerModelName: image0.ManufacturerModelName,
    SpacingBetweenSlices: image0.SpacingBetweenSlices || SpacingBetweenSlices
  };
  return referencedDisplaySetMetadata;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneSEGViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSEGViewport");

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
//# sourceMappingURL=extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx.js.map