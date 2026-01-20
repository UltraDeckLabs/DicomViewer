"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-pmap_src_viewports_OHIFCornerstonePMAPViewport_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-pmap/src/viewports/OHIFCornerstonePMAPViewport.tsx":
/*!************************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-pmap/src/viewports/OHIFCornerstonePMAPViewport.tsx ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
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




function OHIFCornerstonePMAPViewport(props) {
  _s();
  const {
    displaySets,
    children,
    viewportOptions,
    displaySetOptions,
    servicesManager
  } = props;
  const viewportId = viewportOptions.viewportId;
  const {
    displaySetService,
    segmentationService,
    uiNotificationService,
    customizationService
  } = servicesManager.services;

  // PMAP viewport will always have a single display set
  if (displaySets.length !== 1) {
    throw new Error('PMAP viewport must have a single display set');
  }
  const LoadingIndicatorTotalPercent = customizationService.getCustomization('ui.loadingIndicatorTotalPercent');
  const pmapDisplaySet = displaySets[0];
  const [viewportGrid, viewportGridService] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid)();
  const referencedDisplaySetRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    viewports,
    activeViewportId
  } = viewportGrid;
  const referencedDisplaySet = pmapDisplaySet.getReferenceDisplaySet();
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet, pmapDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  const [pmapIsLoading, setPmapIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!pmapDisplaySet.isLoaded);

  // Add effect to listen for loading complete
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.pmapDisplaySet?.displaySetInstanceUID === pmapDisplaySet.displaySetInstanceUID) {
        setPmapIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [pmapDisplaySet]);
  const getCornerstoneViewport = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    const {
      displaySet: referencedDisplaySet
    } = referencedDisplaySetRef.current;
    displaySetOptions.unshift({});
    const [pmapDisplaySetOptions] = displaySetOptions;

    // Make sure `options` exists
    pmapDisplaySetOptions.options = pmapDisplaySetOptions.options ?? {};
    Object.assign(pmapDisplaySetOptions.options, {
      colormap: {
        name: 'rainbow_2',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.25,
          opacity: 0.25
        }, {
          value: 0.5,
          opacity: 0.5
        }, {
          value: 0.75,
          opacity: 0.75
        }, {
          value: 0.9,
          opacity: 0.99
        }]
      },
      voi: {
        windowCenter: 50,
        windowWidth: 100
      }
    });
    uiNotificationService.show({
      title: 'Parametric Map',
      type: 'warning',
      message: 'The values are multiplied by 100 in the viewport for better visibility'
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.OHIFCornerstoneViewport, _extends({}, props, {
      // Referenced + PMAP displaySets must be passed as parameter in this order
      displaySets: [referencedDisplaySet, pmapDisplaySet],
      viewportOptions: {
        viewportType: 'volume',
        orientation: viewportOptions.orientation,
        viewportId: viewportOptions.viewportId,
        presentationIds: viewportOptions.presentationIds
      },
      displaySetOptions: [{}, pmapDisplaySetOptions]
    }));
  }, [displaySetOptions, props, pmapDisplaySet, viewportOptions.orientation, viewportOptions.viewportId, viewportOptions.presentationIds, uiNotificationService]);

  // Cleanup the PMAP viewport when the viewport is destroyed
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
  }, [activeViewportId, displaySetService, viewportGridService, viewports]);
  let childrenWithProps = null;
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
  }, pmapIsLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LoadingIndicatorTotalPercent, {
    className: "h-full w-full",
    totalNumbers: null,
    percentComplete: null,
    loadingText: "Loading Parametric Map..."
  }), getCornerstoneViewport(), childrenWithProps));
}
_s(OHIFCornerstonePMAPViewport, "3whYhi9J5zbOCfBDSPAFkvwXIjE=", false, function () {
  return [_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid];
});
_c = OHIFCornerstonePMAPViewport;
OHIFCornerstonePMAPViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)
};
function _getReferencedDisplaySetMetadata(referencedDisplaySet, pmapDisplaySet) {
  const {
    SharedFunctionalGroupsSequence
  } = pmapDisplaySet.instance;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstonePMAPViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstonePMAPViewport");

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
//# sourceMappingURL=extensions_cornerstone-dicom-pmap_src_viewports_OHIFCornerstonePMAPViewport_tsx.js.map