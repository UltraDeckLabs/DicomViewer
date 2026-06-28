"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_measurement-tracking_src_index_tsx"],{

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx":
/*!***********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx ***!
  \***********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsContext: () => (/* binding */ TrackedMeasurementsContext),
/* harmony export */   TrackedMeasurementsContextProvider: () => (/* binding */ TrackedMeasurementsContextProvider),
/* harmony export */   useTrackedMeasurements: () => (/* binding */ useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xstate */ "../../../node_modules/xstate/es/index.js");
/* harmony import */ var _xstate_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @xstate/react */ "../../../node_modules/@xstate/react/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./measurementTrackingMachine */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js");
/* harmony import */ var _promptBeginTracking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* harmony import */ var _hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hydrateStructuredReport */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./promptWrapperFunctions */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptWrapperFunctions.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();










const TrackedMeasurementsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext();
TrackedMeasurementsContext.displayName = 'TrackedMeasurementsContext';
const useTrackedMeasurements = () => {
  _s();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TrackedMeasurementsContext);
};
_s(useTrackedMeasurements, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const SR_SOPCLASSHANDLERID = '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr';

/**
 *
 * @param {*} param0
 */
function TrackedMeasurementsContextProvider({
  servicesManager,
  commandsManager,
  extensionManager
},
// Bound by consumer
{
  children
} // Component props
) {
  _s2();
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_8__.useAppConfig)();
  const [viewportGrid, viewportGridService] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.useViewportGrid)();
  const {
    activeViewportId,
    viewports
  } = viewportGrid;
  const {
    measurementService,
    displaySetService,
    customizationService,
    trackedMeasurementsService
  } = servicesManager.services;
  const machineOptions = Object.assign({}, _measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__.defaultOptions);
  machineOptions.actions = Object.assign({}, machineOptions.actions, {
    jumpToFirstMeasurementInActiveViewport: (ctx, evt) => {
      const {
        trackedStudy,
        trackedSeries
      } = ctx;
      const {
        viewportId: activeViewportId
      } = evt.data;
      const measurements = measurementService.getMeasurements();
      const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID));
      console.log('jumping to measurement reset viewport', activeViewportId, trackedMeasurements[0]);
      const referencedDisplaySetUID = trackedMeasurements[0].displaySetInstanceUID;
      const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetUID);
      const referencedImages = referencedDisplaySet.images;
      const isVolumeIdReferenced = referencedImages[0].imageId.startsWith('volumeId');
      const measurementData = trackedMeasurements[0].data;
      let imageIndex = 0;
      if (!isVolumeIdReferenced && measurementData) {
        // if it is imageId referenced find the index of the imageId, we don't have
        // support for volumeId referenced images yet
        imageIndex = referencedImages.findIndex(image => {
          const imageIdToUse = Object.keys(measurementData)[0].substring(8);
          return image.imageId === imageIdToUse;
        });
        if (imageIndex === -1) {
          console.warn('Could not find image index for tracked measurement, using 0');
          imageIndex = 0;
        }
      }
      viewportGridService.setDisplaySetsForViewport({
        viewportId: activeViewportId,
        displaySetInstanceUIDs: [referencedDisplaySetUID],
        viewportOptions: {
          initialImageOptions: {
            index: imageIndex
          }
        }
      });
    },
    jumpToSameImageInActiveViewport: (ctx, evt) => {
      const {
        trackedStudy,
        trackedSeries
      } = ctx;
      const {
        viewportId: activeViewportId
      } = evt.data;
      const measurements = measurementService.getMeasurements();
      const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID));

      // Jump to the last tracked measurement - most recent
      if (!trackedMeasurements?.length) {
        console.warn("Didn't find any tracked measurements", measurements, trackedStudy, trackedSeries);
        return;
      }
      const trackedMeasurement = trackedMeasurements[trackedMeasurements.length - 1];
      const referencedDisplaySetUID = trackedMeasurement.displaySetInstanceUID;

      // update the previously stored positionPresentation with the new viewportId
      // presentation so that when we put the referencedDisplaySet back in the viewport
      // it will be in the correct position zoom and pan
      commandsManager.runCommand('updateStoredPositionPresentation', {
        viewportId: activeViewportId,
        displaySetInstanceUIDs: [referencedDisplaySetUID],
        referencedImageId: trackedMeasurement.referencedImageId
      });
      viewportGridService.setDisplaySetsForViewport({
        viewportId: activeViewportId,
        displaySetInstanceUIDs: [referencedDisplaySetUID]
      });
    },
    showStructuredReportDisplaySetInActiveViewport: (ctx, evt) => {
      if (evt.data.createdDisplaySetInstanceUIDs.length > 0) {
        const StructuredReportDisplaySetInstanceUID = evt.data.createdDisplaySetInstanceUIDs[0];
        viewportGridService.setDisplaySetsForViewport({
          viewportId: evt.data.viewportId,
          displaySetInstanceUIDs: [StructuredReportDisplaySetInstanceUID]
        });
      }
    },
    discardPreviouslyTrackedMeasurements: (ctx, evt) => {
      const measurements = measurementService.getMeasurements();
      const filteredMeasurements = measurements.filter(ms => ctx.prevTrackedSeries.includes(ms.referenceSeriesUID));
      const measurementIds = filteredMeasurements.map(fm => fm.id);
      for (let i = 0; i < measurementIds.length; i++) {
        measurementService.remove(measurementIds[i]);
      }
    },
    clearAllMeasurements: (ctx, evt) => {
      const measurements = measurementService.getMeasurements();
      const measurementIds = measurements.map(fm => fm.uid);
      for (let i = 0; i < measurementIds.length; i++) {
        measurementService.remove(measurementIds[i]);
      }
      measurementService.setIsMeasurementDeletedIndividually(false);
    },
    clearDisplaySetHydratedState: (ctx, evt) => {
      const {
        displaySetInstanceUID
      } = evt.data ?? evt;
      const displaysets = displaySetService.getActiveDisplaySets();
      displaysets?.forEach(displayset => {
        if (displayset.Modality === 'SR' && displayset.displaySetInstanceUID !== displaySetInstanceUID && displayset.isHydrated) {
          displayset.isHydrated = false;
          displayset.isLoaded = false;
        }
      });
    },
    updatedViewports: (ctx, evt) => {
      const {
        hangingProtocolService
      } = servicesManager.services;
      const {
        displaySetInstanceUID,
        viewportId
      } = evt.data ?? evt;
      const updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID);
      viewportGridService.setDisplaySetsForViewports(updatedViewports);
    }
  });
  machineOptions.services = Object.assign({}, machineOptions.services, {
    promptBeginTracking: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptBeginTrackingWrapper.bind(null, {
      servicesManager,
      extensionManager,
      appConfig
    }),
    promptTrackNewSeries: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptTrackNewSeriesWrapper.bind(null, {
      servicesManager,
      extensionManager,
      appConfig
    }),
    promptTrackNewStudy: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptTrackNewStudyWrapper.bind(null, {
      servicesManager,
      extensionManager,
      appConfig
    }),
    promptSaveReport: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptSaveReportWrapper.bind(null, {
      servicesManager,
      commandsManager,
      extensionManager,
      appConfig
    }),
    promptHydrateStructuredReport: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptHydrateStructuredReportWrapper.bind(null, {
      servicesManager,
      extensionManager,
      commandsManager,
      appConfig
    }),
    promptHasDirtyAnnotations: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptHasDirtyAnnotationsWrapper.bind(null, {
      servicesManager,
      extensionManager,
      commandsManager,
      appConfig
    }),
    hydrateStructuredReport: _hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_7__["default"].bind(null, {
      servicesManager,
      extensionManager,
      commandsManager,
      appConfig
    }),
    promptLabelAnnotation: _promptWrapperFunctions__WEBPACK_IMPORTED_MODULE_9__.promptLabelAnnotationWrapper.bind(null, {
      servicesManager,
      extensionManager,
      commandsManager
    })
  });
  machineOptions.guards = Object.assign({}, machineOptions.guards, {
    isLabelOnMeasure: (ctx, evt, condMeta) => {
      const labelConfig = customizationService.getCustomization('measurementLabels');
      return labelConfig?.labelOnMeasure;
    },
    isLabelOnMeasureAndShouldKillMachine: (ctx, evt, condMeta) => {
      const labelConfig = customizationService.getCustomization('measurementLabels');
      return evt.data && evt.data.userResponse === _measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__.RESPONSE.NO_NEVER && labelConfig?.labelOnMeasure;
    },
    isSimplifiedConfig: (ctx, evt, condMeta) => {
      return appConfig?.measurementTrackingMode === _promptBeginTracking__WEBPACK_IMPORTED_MODULE_6__.measurementTrackingMode.SIMPLIFIED;
    },
    simplifiedAndLoadSR: (ctx, evt, condMeta) => {
      return appConfig?.measurementTrackingMode === _promptBeginTracking__WEBPACK_IMPORTED_MODULE_6__.measurementTrackingMode.SIMPLIFIED && evt.data.isBackupSave === false;
    },
    hasDirtyAndSimplified: (ctx, evt, condMeta) => {
      const measurements = measurementService.getMeasurements();
      const hasDirtyMeasurements = measurements.some(measurement => measurement.isDirty) || measurements.length && measurementService.getIsMeasurementDeletedIndividually();
      return appConfig?.measurementTrackingMode === _promptBeginTracking__WEBPACK_IMPORTED_MODULE_6__.measurementTrackingMode.SIMPLIFIED && hasDirtyMeasurements;
    }
  });

  // TODO: IMPROVE
  // - Add measurement_updated to cornerstone; debounced? (ext side, or consumption?)
  // - Friendlier transition/api in front of measurementTracking machine?
  // - Blocked: viewport overlay shouldn't clip when resized
  // TODO: PRIORITY
  // - Fix "ellipses" series description dynamic truncate length
  // - Fix viewport border resize
  // - created/destroyed hooks for extensions (cornerstone measurement subscriptions in it's `init`)

  const measurementTrackingMachine = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return (0,xstate__WEBPACK_IMPORTED_MODULE_2__.Machine)(_measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__.machineConfiguration, machineOptions);
  }, []); // Empty dependency array ensures this is only created once

  const [trackedMeasurements, sendTrackedMeasurementsEvent] = (0,_xstate_react__WEBPACK_IMPORTED_MODULE_3__.useMachine)(measurementTrackingMachine);

  // Update TrackedMeasurementsService when trackedSeries changes in context
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (trackedMeasurements?.context?.trackedSeries && trackedMeasurementsService) {
      trackedMeasurementsService.updateTrackedSeries(trackedMeasurements.context.trackedSeries);
    }
  }, [trackedMeasurements?.context?.trackedSeries, trackedMeasurementsService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Update the state machine with the active viewport ID
    sendTrackedMeasurementsEvent('UPDATE_ACTIVE_VIEWPORT_ID', {
      activeViewportId
    });
  }, [activeViewportId, sendTrackedMeasurementsEvent]);

  // ~~ Listen for changes to ViewportGrid for potential SRs hung in panes when idle
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const triggerPromptHydrateFlow = async () => {
      if (viewports.size > 0) {
        const activeViewport = viewports.get(activeViewportId);
        if (!activeViewport || !activeViewport?.displaySetInstanceUIDs?.length) {
          return;
        }

        // Todo: Getting the first displaySetInstanceUID is wrong, but we don't have
        // tracking fusion viewports yet. This should change when we do.
        const {
          displaySetService
        } = servicesManager.services;
        const displaySet = displaySetService.getDisplaySetByUID(activeViewport.displaySetInstanceUIDs[0]);
        if (!displaySet) {
          return;
        }

        // If this is an SR produced by our SR SOPClassHandler,
        // and it hasn't been loaded yet, do that now so we
        // can check if it can be rehydrated or not.
        //
        // Note: This happens:
        // - If the viewport is not currently an OHIFCornerstoneSRViewport
        // - If the displaySet has never been hung
        //
        // Otherwise, the displaySet will be loaded by the useEffect handler
        // listening to displaySet changes inside OHIFCornerstoneSRViewport.
        // The issue here is that this handler in TrackedMeasurementsContext
        // ends up occurring before the Viewport is created, so the displaySet
        // is not loaded yet, and isRehydratable is undefined unless we call load().
        if (displaySet.SOPClassHandlerId === SR_SOPCLASSHANDLERID && !displaySet.isLoaded && displaySet.load) {
          await displaySet.load();
        }

        // Magic string
        // load function added by our sopClassHandler module
        if (displaySet.SOPClassHandlerId === SR_SOPCLASSHANDLERID && displaySet.isRehydratable === true && !displaySet.isHydrated) {
          const params = {
            displaySetInstanceUID: displaySet.displaySetInstanceUID,
            SeriesInstanceUID: displaySet.SeriesInstanceUID,
            viewportId: activeViewportId
          };

          // Check if we should bypass the confirmation prompt
          const disableConfirmationPrompts = appConfig?.disableConfirmationPrompts;
          if (disableConfirmationPrompts) {
            sendTrackedMeasurementsEvent('HYDRATE_SR', params);
          } else {
            sendTrackedMeasurementsEvent('PROMPT_HYDRATE_SR', params);
          }
        }
      }
    };
    triggerPromptHydrateFlow();
  }, [trackedMeasurements, activeViewportId, sendTrackedMeasurementsEvent, servicesManager.services, viewports, appConfig]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // The command needs to be bound to the context's sendTrackedMeasurementsEvent
    // so the command has to be registered in a React component.
    commandsManager.registerCommand('DEFAULT', 'loadTrackedSRMeasurements', {
      commandFn: props => sendTrackedMeasurementsEvent('HYDRATE_SR', props)
    });
  }, [commandsManager, sendTrackedMeasurementsEvent]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TrackedMeasurementsContext.Provider, {
    value: [trackedMeasurements, sendTrackedMeasurementsEvent]
  }, children);
}
_s2(TrackedMeasurementsContextProvider, "ddn/GVNwuNtX9GoD7fByjJ55dJc=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_8__.useAppConfig, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.useViewportGrid, _xstate_react__WEBPACK_IMPORTED_MODULE_3__.useMachine];
});
_c = TrackedMeasurementsContextProvider;
TrackedMeasurementsContextProvider.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)]),
  appConfig: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};

var _c;
__webpack_require__.$Refresh$.register(_c, "TrackedMeasurementsContextProvider");

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx":
/*!********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx ***!
  \********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_extension_cornerstone_dicom_sr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-cornerstone-dicom-sr */ "../../../extensions/cornerstone-dicom-sr/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function hydrateStructuredReport({
  servicesManager,
  extensionManager,
  commandsManager,
  appConfig
}, ctx, evt) {
  const {
    displaySetService
  } = servicesManager.services;
  const {
    viewportId,
    displaySetInstanceUID
  } = evt;
  const srDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  return new Promise((resolve, reject) => {
    const hydrationResult = (0,_ohif_extension_cornerstone_dicom_sr__WEBPACK_IMPORTED_MODULE_0__.hydrateStructuredReport)({
      servicesManager,
      extensionManager,
      commandsManager,
      appConfig
    }, displaySetInstanceUID);
    const StudyInstanceUID = hydrationResult.StudyInstanceUID;
    const SeriesInstanceUIDs = hydrationResult.SeriesInstanceUIDs;
    resolve({
      displaySetInstanceUID: evt.displaySetInstanceUID,
      srSeriesInstanceUID: srDisplaySet.SeriesInstanceUID,
      viewportId,
      StudyInstanceUID,
      SeriesInstanceUIDs
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hydrateStructuredReport);

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/index.js":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/index.js ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsContext: () => (/* reexport safe */ _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContext),
/* harmony export */   TrackedMeasurementsContextProvider: () => (/* reexport safe */ _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContextProvider),
/* harmony export */   useTrackedMeasurements: () => (/* reexport safe */ _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__.useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackedMeasurementsContext.tsx */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RESPONSE: () => (/* binding */ RESPONSE),
/* harmony export */   defaultOptions: () => (/* binding */ defaultOptions),
/* harmony export */   machineConfiguration: () => (/* binding */ machineConfiguration)
/* harmony export */ });
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xstate */ "../../../node_modules/xstate/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4,
  HYDRATE_REPORT: 5
};
const machineConfiguration = {
  id: 'measurementTracking',
  initial: 'idle',
  context: {
    activeViewportId: null,
    trackedStudy: '',
    trackedSeries: [],
    ignoredSeries: [],
    //
    prevTrackedStudy: '',
    prevTrackedSeries: [],
    prevIgnoredSeries: [],
    //
    ignoredSRSeriesForHydration: [],
    isDirty: false
  },
  states: {
    off: {
      type: 'final'
    },
    labellingOnly: {
      on: {
        TRACK_SERIES: [{
          target: 'promptLabelAnnotation',
          actions: ['setPreviousState']
        }, {
          target: 'off'
        }]
      }
    },
    idle: {
      entry: 'clearContext',
      on: {
        TRACK_SERIES: [{
          target: 'promptLabelAnnotation',
          cond: 'isLabelOnMeasure',
          actions: ['setPreviousState']
        }, {
          target: 'promptBeginTracking',
          actions: ['setPreviousState']
        }],
        SET_TRACKED_SERIES: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries', 'setIsDirtyToClean']
        }],
        PROMPT_HYDRATE_SR: {
          target: 'promptHydrateStructuredReport',
          cond: 'hasNotIgnoredSRSeriesForHydration'
        },
        RESTORE_PROMPT_HYDRATE_SR: 'promptHydrateStructuredReport',
        HYDRATE_SR: 'hydrateStructuredReport',
        UPDATE_ACTIVE_VIEWPORT_ID: {
          actions: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)({
            activeViewportId: (_, event) => event.activeViewportId
          })
        }
      }
    },
    promptBeginTracking: {
      invoke: {
        src: 'promptBeginTracking',
        onDone: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndSeries', 'setIsDirty'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'labellingOnly',
          cond: 'isLabelOnMeasureAndShouldKillMachine'
        }, {
          target: 'off',
          cond: 'shouldKillMachine'
        }, {
          target: 'idle'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    tracking: {
      on: {
        TRACK_SERIES: [{
          target: 'promptLabelAnnotation',
          cond: 'isLabelOnMeasure',
          actions: ['setPreviousState']
        }, {
          target: 'promptTrackNewStudy',
          cond: 'isNewStudy'
        }, {
          target: 'promptTrackNewSeries',
          cond: 'isNewSeries'
        }],
        UNTRACK_SERIES: [{
          target: 'tracking',
          actions: ['removeTrackedSeries', 'setIsDirty', 'clearDisplaySetHydratedState'],
          cond: 'hasRemainingTrackedSeries'
        }, {
          target: 'idle'
        }],
        UNTRACK_ALL: [{
          target: 'tracking',
          actions: ['clearContext', 'setIsDirtyToClean', 'clearDisplaySetHydratedState', 'clearAllMeasurements']
        }, {
          target: 'idle'
        }],
        SET_TRACKED_SERIES: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries']
        }],
        SAVE_REPORT: 'promptSaveReport',
        SET_DIRTY: [{
          target: 'tracking',
          actions: ['setIsDirty'],
          cond: 'shouldSetDirty'
        }, {
          target: 'tracking'
        }],
        CHECK_DIRTY: {
          target: 'promptHasDirtyAnnotations',
          cond: 'hasDirtyAndSimplified'
        },
        PROMPT_HYDRATE_SR: {
          target: 'promptHydrateStructuredReport',
          cond: 'isSimplifiedConfig',
          actions: ['clearAllMeasurements', 'clearDisplaySetHydratedState']
        }
      }
    },
    promptTrackNewSeries: {
      invoke: {
        src: 'promptTrackNewSeries',
        onDone: [{
          target: 'tracking',
          actions: ['addTrackedSeries', 'setIsDirty'],
          cond: 'shouldAddSeries'
        }, {
          target: 'tracking',
          actions: ['discardPreviouslyTrackedMeasurements', 'setTrackedStudyAndSeries', 'setIsDirty'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'promptSaveReport',
          cond: 'shouldPromptSaveReport'
        }, {
          target: 'tracking'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptTrackNewStudy: {
      invoke: {
        src: 'promptTrackNewStudy',
        onDone: [{
          target: 'tracking',
          actions: ['discardPreviouslyTrackedMeasurements', 'setTrackedStudyAndSeries', 'setIsDirty'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'tracking',
          actions: ['ignoreSeries'],
          cond: 'shouldAddIgnoredSeries'
        }, {
          target: 'promptSaveReport',
          cond: 'shouldPromptSaveReport'
        }, {
          target: 'tracking'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptSaveReport: {
      invoke: {
        src: 'promptSaveReport',
        onDone: [{
          target: 'tracking',
          actions: ['clearAllMeasurements', 'clearDisplaySetHydratedState', 'setIsDirty', 'updatedViewports'],
          cond: 'simplifiedAndLoadSR'
        },
        // "clicked the save button"
        // - should clear all measurements
        // - show DICOM SR
        {
          target: 'idle',
          actions: ['clearAllMeasurements', 'showStructuredReportDisplaySetInActiveViewport'],
          cond: 'shouldSaveAndContinueWithSameReport'
        },
        // "starting a new report"
        // - remove "just saved" measurements
        // - start tracking a new study + report
        {
          target: 'tracking',
          actions: ['discardPreviouslyTrackedMeasurements', 'setTrackedStudyAndSeries'],
          cond: 'shouldSaveAndStartNewReport'
        },
        // Cancel, back to tracking
        {
          target: 'tracking'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptHydrateStructuredReport: {
      invoke: {
        src: 'promptHydrateStructuredReport',
        onDone: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries', 'jumpToSameImageInActiveViewport', 'setIsDirtyToClean'],
          cond: 'shouldHydrateStructuredReport'
        }, {
          target: 'idle',
          actions: ['ignoreHydrationForSRSeries'],
          cond: 'shouldIgnoreHydrationForSR'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    hydrateStructuredReport: {
      invoke: {
        src: 'hydrateStructuredReport',
        onDone: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries', 'jumpToSameImageInActiveViewport', 'setIsDirtyToClean']
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptLabelAnnotation: {
      invoke: {
        src: 'promptLabelAnnotation',
        onDone: [{
          target: 'labellingOnly',
          cond: 'wasLabellingOnly'
        }, {
          target: 'promptBeginTracking',
          cond: 'wasIdle'
        }, {
          target: 'promptTrackNewStudy',
          cond: 'wasTrackingAndIsNewStudy'
        }, {
          target: 'promptTrackNewSeries',
          cond: 'wasTrackingAndIsNewSeries'
        }, {
          target: 'tracking',
          cond: 'wasTracking'
        }, {
          target: 'off'
        }]
      }
    },
    promptHasDirtyAnnotations: {
      invoke: {
        src: 'promptHasDirtyAnnotations',
        onDone: [{
          target: 'tracking',
          actions: ['clearAllMeasurements', 'clearDisplaySetHydratedState', 'setIsDirty', 'updatedViewports'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'promptSaveReport',
          cond: 'shouldPromptSaveReport'
        }, {
          target: 'tracking'
        }]
      }
    }
  },
  strict: true
};
const defaultOptions = {
  services: {
    promptBeginTracking: (ctx, evt) => {
      // return { userResponse, StudyInstanceUID, SeriesInstanceUID }
    },
    promptTrackNewStudy: (ctx, evt) => {
      // return { userResponse, StudyInstanceUID, SeriesInstanceUID }
    },
    promptTrackNewSeries: (ctx, evt) => {
      // return { userResponse, StudyInstanceUID, SeriesInstanceUID }
    }
  },
  actions: {
    discardPreviouslyTrackedMeasurements: (ctx, evt) => {
      console.log('discardPreviouslyTrackedMeasurements: not implemented');
    },
    clearAllMeasurements: (ctx, evt) => {
      console.log('clearAllMeasurements: not implemented');
    },
    jumpToFirstMeasurementInActiveViewport: (ctx, evt) => {
      console.warn('jumpToFirstMeasurementInActiveViewport: not implemented');
    },
    showStructuredReportDisplaySetInActiveViewport: (ctx, evt) => {
      console.warn('showStructuredReportDisplaySetInActiveViewport: not implemented');
    },
    clearContext: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)({
      trackedStudy: '',
      trackedSeries: [],
      ignoredSeries: [],
      prevTrackedStudy: '',
      prevTrackedSeries: [],
      prevIgnoredSeries: []
    }),
    // Promise resolves w/ `evt.data.*`
    setTrackedStudyAndSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevTrackedStudy: ctx.trackedStudy,
      prevTrackedSeries: ctx.trackedSeries.slice(),
      prevIgnoredSeries: ctx.ignoredSeries.slice(),
      //
      trackedStudy: evt.data.StudyInstanceUID,
      trackedSeries: [evt.data.SeriesInstanceUID],
      ignoredSeries: []
    })),
    setTrackedStudyAndMultipleSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => {
      const studyInstanceUID = evt.StudyInstanceUID || evt.data.StudyInstanceUID;
      const seriesInstanceUIDs = evt.SeriesInstanceUIDs || evt.data.SeriesInstanceUIDs;
      return {
        prevTrackedStudy: ctx.trackedStudy,
        prevTrackedSeries: ctx.trackedSeries.slice(),
        prevIgnoredSeries: ctx.ignoredSeries.slice(),
        //
        trackedStudy: studyInstanceUID,
        trackedSeries: [...ctx.trackedSeries, ...seriesInstanceUIDs],
        ignoredSeries: []
      };
    }),
    setIsDirtyToClean: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      isDirty: false
    })),
    setIsDirty: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      isDirty: true
    })),
    ignoreSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevIgnoredSeries: [...ctx.ignoredSeries],
      ignoredSeries: [...ctx.ignoredSeries, evt.data.SeriesInstanceUID]
    })),
    ignoreHydrationForSRSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      ignoredSRSeriesForHydration: [...ctx.ignoredSRSeriesForHydration, evt.data.srSeriesInstanceUID]
    })),
    addTrackedSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevTrackedSeries: [...ctx.trackedSeries],
      trackedSeries: [...ctx.trackedSeries, evt.data.SeriesInstanceUID]
    })),
    removeTrackedSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevTrackedSeries: ctx.trackedSeries.slice().filter(ser => ser !== evt.SeriesInstanceUID),
      trackedSeries: ctx.trackedSeries.slice().filter(ser => ser !== evt.SeriesInstanceUID)
    })),
    setPreviousState: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt, meta) => {
      return {
        prevState: meta.state.value
      };
    })
  },
  guards: {
    // We set dirty any time we performan an action that:
    // - Tracks a new study
    // - Tracks a new series
    // - Adds a measurement to an already tracked study/series
    //
    // We set clean any time we restore from an SR
    //
    // This guard/condition is specific to "new measurements"
    // to make sure we only track dirty when the new measurement is specific
    // to a series we're already tracking
    //
    // tl;dr
    // Any report change, that is not a hydration of an existing report, should
    // result in a "dirty" report
    //
    // Where dirty means there would be "loss of data" if we blew away measurements
    // without creating a new SR.
    shouldSetDirty: (ctx, evt) => {
      return (
        // When would this happen?
        evt.SeriesInstanceUID === undefined || ctx.trackedSeries.includes(evt.SeriesInstanceUID)
      );
    },
    wasLabellingOnly: (ctx, evt, condMeta) => {
      return ctx.prevState === 'labellingOnly';
    },
    wasIdle: (ctx, evt, condMeta) => {
      return ctx.prevState === 'idle';
    },
    wasTracking: (ctx, evt, condMeta) => {
      return ctx.prevState === 'tracking';
    },
    wasTrackingAndIsNewStudy: (ctx, evt, condMeta) => {
      return ctx.prevState === 'tracking' && !ctx.ignoredSeries.includes(evt.data.SeriesInstanceUID) && ctx.trackedStudy !== evt.data.StudyInstanceUID;
    },
    wasTrackingAndIsNewSeries: (ctx, evt, condMeta) => {
      return ctx.prevState === 'tracking' && !ctx.ignoredSeries.includes(evt.data.SeriesInstanceUID) && !ctx.trackedSeries.includes(evt.data.SeriesInstanceUID);
    },
    shouldKillMachine: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.NO_NEVER,
    shouldAddSeries: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.ADD_SERIES,
    shouldSetStudyAndSeries: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.SET_STUDY_AND_SERIES,
    shouldAddIgnoredSeries: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.NO_NOT_FOR_SERIES,
    shouldPromptSaveReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CREATE_REPORT,
    shouldIgnoreHydrationForSR: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CANCEL,
    shouldSaveAndContinueWithSameReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CREATE_REPORT && evt.data.isBackupSave === true,
    shouldSaveAndStartNewReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CREATE_REPORT && evt.data.isBackupSave === false,
    shouldHydrateStructuredReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.HYDRATE_REPORT,
    // Has more than 1, or SeriesInstanceUID is not in list
    // --> Post removal would have non-empty trackedSeries array
    hasRemainingTrackedSeries: (ctx, evt) => ctx.trackedSeries.length > 1 || !ctx.trackedSeries.includes(evt.SeriesInstanceUID),
    hasNotIgnoredSRSeriesForHydration: (ctx, evt) => {
      return !ctx.ignoredSRSeriesForHydration.includes(evt.SeriesInstanceUID);
    },
    isNewStudy: (ctx, evt) => !ctx.ignoredSeries.includes(evt.SeriesInstanceUID) && ctx.trackedStudy !== evt.StudyInstanceUID,
    isNewSeries: (ctx, evt) => !ctx.ignoredSeries.includes(evt.SeriesInstanceUID) && !ctx.trackedSeries.includes(evt.SeriesInstanceUID)
  }
};


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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js":
/*!***************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   measurementTrackingMode: () => (/* binding */ measurementTrackingMode)
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3
};
const measurementTrackingMode = {
  STANDARD: 'standard',
  SIMPLIFIED: 'simplified',
  NONE: 'none'
};
function promptBeginTracking({
  servicesManager,
  extensionManager
}, ctx, evt) {
  const {
    uiViewportDialogService,
    customizationService
  } = servicesManager.services;
  const appConfig = extensionManager._appConfig;
  // When the state change happens after a promise, the state machine sends the retult in evt.data;
  // In case of direct transition to the state, the state machine sends the data in evt;
  const {
    viewportId,
    StudyInstanceUID,
    SeriesInstanceUID
  } = evt.data || evt;
  return new Promise(async function (resolve, reject) {
    const standardMode = appConfig?.measurementTrackingMode === measurementTrackingMode.STANDARD;
    const noTrackingMode = appConfig?.measurementTrackingMode === measurementTrackingMode.NONE;
    let promptResult;
    promptResult = noTrackingMode ? RESPONSE.NO_NEVER : standardMode ? await _askTrackMeasurements(uiViewportDialogService, customizationService, viewportId) : RESPONSE.SET_STUDY_AND_SERIES;
    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId
    });
  });
}
function _askTrackMeasurements(uiViewportDialogService, customizationService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = customizationService.getCustomization('viewportNotification.beginTrackingMessage');
    const actions = [{
      id: 'prompt-begin-tracking-cancel',
      type: 'secondary',
      text: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('Common:No'),
      value: RESPONSE.CANCEL
    }, {
      id: 'prompt-begin-tracking-no-do-not-ask-again',
      type: 'secondary',
      text: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('MeasurementTable:No, do not ask again'),
      value: RESPONSE.NO_NEVER
    }, {
      id: 'prompt-begin-tracking-yes',
      type: 'primary',
      text: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('Common:Yes'),
      value: RESPONSE.SET_STUDY_AND_SERIES
    }];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };
    uiViewportDialogService.show({
      viewportId,
      id: 'measurement-tracking-prompt-begin-tracking',
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        if (event.key === 'Enter') {
          const action = actions.find(action => action.id === 'prompt-begin-tracking-yes');
          onSubmit(action.value);
        }
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptBeginTracking);

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHasDirtyAnnotations.ts":
/*!*********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHasDirtyAnnotations.ts ***!
  \*********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
function promptHasDirtyAnnotations({
  servicesManager
}, ctx, evt) {
  const {
    viewportId,
    displaySetInstanceUID
  } = evt.data || evt;
  return new Promise(async function (resolve, reject) {
    const {
      uiViewportDialogService,
      customizationService
    } = servicesManager.services;
    const promptResult = await _askSaveDiscardOrCancel(uiViewportDialogService, customizationService, viewportId);
    resolve({
      displaySetInstanceUID,
      userResponse: promptResult,
      viewportId,
      isBackupSave: false
    });
  });
}
function _askSaveDiscardOrCancel(UIViewportDialogService, customizationService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = customizationService.getCustomization('viewportNotification.discardDirtyMessage');
    const actions = [{
      id: 'cancel',
      type: 'cancel',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      id: 'discard-existing',
      type: 'secondary',
      text: 'No, discard existing',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }, {
      id: 'save-existing',
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.CREATE_REPORT
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportId,
      id: 'measurement-tracking-prompt-dirty-measurement',
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        if (event.key === 'Enter') {
          const action = actions.find(action => action.id === 'save-existing');
          onSubmit(action.value);
        }
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptHasDirtyAnnotations);

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.ts":
/*!*************************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.ts ***!
  \*************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function promptHydrateStructuredReport({
  servicesManager,
  commandsManager
}, ctx, evt) {
  const {
    displaySetService
  } = servicesManager.services;
  const {
    viewportId,
    displaySetInstanceUID
  } = evt;
  const srDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  const hydrateCallback = async () => {
    return commandsManager.runCommand('hydrateSecondaryDisplaySet', {
      displaySet: srDisplaySet,
      viewportId
    });
  };

  // For SR we need to use the whole context
  const enhancedSrDisplaySet = {
    ...srDisplaySet,
    displaySetInstanceUID
  };
  return _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_0__.utils.promptHydrationDialog({
    servicesManager,
    viewportId,
    displaySet: enhancedSrDisplaySet,
    hydrateCallback,
    type: 'SR'
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptHydrateStructuredReport);

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js":
/*!****************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js ***!
  \****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _promptBeginTracking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
function promptTrackNewSeries({
  servicesManager,
  extensionManager
}, ctx, evt) {
  const {
    UIViewportDialogService,
    customizationService
  } = servicesManager.services;
  // When the state change happens after a promise, the state machine sends the retult in evt.data;
  // In case of direct transition to the state, the state machine sends the data in evt;
  const {
    viewportId,
    StudyInstanceUID,
    SeriesInstanceUID
  } = evt.data || evt;
  return new Promise(async function (resolve, reject) {
    const appConfig = extensionManager._appConfig;
    const showPrompt = appConfig?.measurementTrackingMode === _promptBeginTracking__WEBPACK_IMPORTED_MODULE_0__.measurementTrackingMode.STANDARD;
    let promptResult = showPrompt ? await _askShouldAddMeasurements(UIViewportDialogService, customizationService, viewportId) : RESPONSE.ADD_SERIES;
    if (promptResult === RESPONSE.CREATE_REPORT) {
      promptResult = ctx.isDirty ? await _askSaveDiscardOrCancel(UIViewportDialogService, customizationService, viewportId) : RESPONSE.SET_STUDY_AND_SERIES;
    }
    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId,
      isBackupSave: false
    });
  });
}
function _askShouldAddMeasurements(uiViewportDialogService, customizationService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = customizationService.getCustomization('viewportNotification.trackNewSeriesMessage');
    const actions = [{
      type: 'secondary',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      type: 'primary',
      text: 'Create new report',
      value: RESPONSE.CREATE_REPORT
    }, {
      type: 'primary',
      text: 'Add to existing report',
      value: RESPONSE.ADD_SERIES
    }];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };
    uiViewportDialogService.show({
      viewportId,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
function _askSaveDiscardOrCancel(UIViewportDialogService, customizationService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = customizationService.getCustomization('viewportNotification.discardSeriesMessage');
    const actions = [{
      type: 'secondary',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: 'Save',
      value: RESPONSE.CREATE_REPORT
    }, {
      type: 'primary',
      text: 'Discard',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportId,
      type: 'warning',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptTrackNewSeries);

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.ts":
/*!***************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.ts ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _promptBeginTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
function promptTrackNewStudy({
  servicesManager,
  extensionManager
}, ctx, evt) {
  const {
    uiViewportDialogService,
    customizationService
  } = servicesManager.services;
  // When the state change happens after a promise, the state machine sends the retult in evt.data;
  // In case of direct transition to the state, the state machine sends the data in evt;
  const {
    viewportId,
    StudyInstanceUID,
    SeriesInstanceUID
  } = evt.data || evt;
  return new Promise(async function (resolve, reject) {
    const appConfig = extensionManager._appConfig;
    const standardMode = appConfig?.measurementTrackingMode === _promptBeginTracking__WEBPACK_IMPORTED_MODULE_1__.measurementTrackingMode.STANDARD;
    const simplifiedMode = appConfig?.measurementTrackingMode === _promptBeginTracking__WEBPACK_IMPORTED_MODULE_1__.measurementTrackingMode.SIMPLIFIED;
    let promptResult = standardMode ? await _askTrackMeasurements(uiViewportDialogService, customizationService, viewportId) : RESPONSE.SET_STUDY_AND_SERIES;
    if (promptResult === RESPONSE.SET_STUDY_AND_SERIES) {
      promptResult = ctx.isDirty && (standardMode || simplifiedMode) ? await _askSaveDiscardOrCancel(uiViewportDialogService, customizationService, viewportId) : RESPONSE.SET_STUDY_AND_SERIES;
    }
    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId,
      isBackupSave: false
    });
  });
}
function _askTrackMeasurements(UIViewportDialogService, customizationService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = customizationService.getCustomization('viewportNotification.trackNewStudyMessage');
    const actions = [{
      type: 'cancel',
      text: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('MeasurementTable:No'),
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('MeasurementTable:No, do not ask again'),
      value: RESPONSE.NO_NOT_FOR_SERIES
    }, {
      type: 'primary',
      text: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('MeasurementTable:Yes'),
      value: RESPONSE.SET_STUDY_AND_SERIES
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportId,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        if (event.key === 'Enter') {
          const action = actions.find(action => action.value === RESPONSE.SET_STUDY_AND_SERIES);
          onSubmit(action.value);
        }
      }
    });
  });
}
function _askSaveDiscardOrCancel(UIViewportDialogService, customizationService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = customizationService.getCustomization('viewportNotification.discardStudyMessage');
    const actions = [{
      type: 'cancel',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: 'No, discard previously tracked series & measurements',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }, {
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.CREATE_REPORT
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportId,
      type: 'warning',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptTrackNewStudy);

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

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptWrapperFunctions.ts":
/*!******************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptWrapperFunctions.ts ***!
  \******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   promptBeginTrackingWrapper: () => (/* binding */ promptBeginTrackingWrapper),
/* harmony export */   promptHasDirtyAnnotationsWrapper: () => (/* binding */ promptHasDirtyAnnotationsWrapper),
/* harmony export */   promptHydrateStructuredReportWrapper: () => (/* binding */ promptHydrateStructuredReportWrapper),
/* harmony export */   promptLabelAnnotationWrapper: () => (/* binding */ promptLabelAnnotationWrapper),
/* harmony export */   promptSaveReportWrapper: () => (/* binding */ promptSaveReportWrapper),
/* harmony export */   promptTrackNewSeriesWrapper: () => (/* binding */ promptTrackNewSeriesWrapper),
/* harmony export */   promptTrackNewStudyWrapper: () => (/* binding */ promptTrackNewStudyWrapper)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const promptBeginTrackingWrapper = ({
  servicesManager,
  extensionManager
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptBeginTracking = customizationService.getCustomization('measurement.promptBeginTracking');
  return promptBeginTracking({
    servicesManager,
    extensionManager
  }, ctx, evt);
};
const promptHydrateStructuredReportWrapper = ({
  servicesManager,
  extensionManager,
  commandsManager,
  appConfig
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptHydrateStructuredReport = customizationService.getCustomization('measurement.promptHydrateStructuredReport');
  return promptHydrateStructuredReport({
    servicesManager,
    extensionManager,
    commandsManager,
    appConfig
  }, ctx, evt);
};
const promptTrackNewSeriesWrapper = ({
  servicesManager,
  extensionManager
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptTrackNewSeries = customizationService.getCustomization('measurement.promptTrackNewSeries');
  return promptTrackNewSeries({
    servicesManager,
    extensionManager
  }, ctx, evt);
};
const promptTrackNewStudyWrapper = ({
  servicesManager,
  extensionManager
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptTrackNewStudy = customizationService.getCustomization('measurement.promptTrackNewStudy');
  return promptTrackNewStudy({
    servicesManager,
    extensionManager
  }, ctx, evt);
};
const promptLabelAnnotationWrapper = ({
  servicesManager
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptLabelAnnotation = customizationService.getCustomization('measurement.promptLabelAnnotation');
  return promptLabelAnnotation({
    servicesManager
  }, ctx, evt);
};
const promptSaveReportWrapper = ({
  servicesManager,
  commandsManager,
  extensionManager
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptSaveReport = customizationService.getCustomization('measurement.promptSaveReport');
  return promptSaveReport({
    servicesManager,
    commandsManager,
    extensionManager
  }, ctx, evt);
};
const promptHasDirtyAnnotationsWrapper = ({
  servicesManager,
  commandsManager,
  extensionManager
}, ctx, evt) => {
  const {
    customizationService
  } = servicesManager.services;
  const promptHasDirtyAnnotations = customizationService.getCustomization('measurement.promptHasDirtyAnnotations');
  return promptHasDirtyAnnotations({
    servicesManager,
    commandsManager,
    extensionManager
  }, ctx, evt);
};


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

/***/ "../../../extensions/measurement-tracking/src/contexts/index.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/index.js ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsContext: () => (/* reexport safe */ _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContext),
/* harmony export */   TrackedMeasurementsContextProvider: () => (/* reexport safe */ _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContextProvider),
/* harmony export */   useTrackedMeasurements: () => (/* reexport safe */ _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__.useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackedMeasurementsContext */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



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

/***/ "../../../extensions/measurement-tracking/src/customizations/measurementTrackingPrompts.tsx":
/*!**************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/customizations/measurementTrackingPrompts.tsx ***!
  \**************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptBeginTracking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../contexts/TrackedMeasurementsContext/promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptHasDirtyAnnotations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contexts/TrackedMeasurementsContext/promptHasDirtyAnnotations */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHasDirtyAnnotations.ts");
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptHydrateStructuredReport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/TrackedMeasurementsContext/promptHydrateStructuredReport */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.ts");
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptTrackNewSeries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/TrackedMeasurementsContext/promptTrackNewSeries */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptTrackNewStudy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contexts/TrackedMeasurementsContext/promptTrackNewStudy */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.ts");
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'measurement.promptBeginTracking': _contexts_TrackedMeasurementsContext_promptBeginTracking__WEBPACK_IMPORTED_MODULE_0__["default"],
  'measurement.promptHydrateStructuredReport': _contexts_TrackedMeasurementsContext_promptHydrateStructuredReport__WEBPACK_IMPORTED_MODULE_2__["default"],
  'measurement.promptTrackNewSeries': _contexts_TrackedMeasurementsContext_promptTrackNewSeries__WEBPACK_IMPORTED_MODULE_3__["default"],
  'measurement.promptTrackNewStudy': _contexts_TrackedMeasurementsContext_promptTrackNewStudy__WEBPACK_IMPORTED_MODULE_4__["default"],
  'measurement.promptLabelAnnotation': _ohif_extension_default__WEBPACK_IMPORTED_MODULE_5__.promptLabelAnnotation,
  'measurement.promptSaveReport': _ohif_extension_default__WEBPACK_IMPORTED_MODULE_5__.promptSaveReport,
  'measurement.promptHasDirtyAnnotations': _contexts_TrackedMeasurementsContext_promptHasDirtyAnnotations__WEBPACK_IMPORTED_MODULE_1__["default"]
});

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

/***/ "../../../extensions/measurement-tracking/src/customizations/studyBrowserCustomization.ts":
/*!************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/customizations/studyBrowserCustomization.ts ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customOnDropHandlerCallback: () => (/* binding */ customOnDropHandlerCallback),
/* harmony export */   onDoubleClickHandler: () => (/* binding */ onDoubleClickHandler)
/* harmony export */ });
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptBeginTracking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../contexts/TrackedMeasurementsContext/promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const onDoubleClickHandler = {
  callbacks: [({
    activeViewportId,
    servicesManager,
    isHangingProtocolLayout,
    appConfig
  }) => async displaySetInstanceUID => {
    const {
      hangingProtocolService,
      viewportGridService,
      uiNotificationService
    } = servicesManager.services;
    let updatedViewports = [];
    const viewportId = activeViewportId;
    const haveDirtyMeasurementsInSimplifiedMode = checkHasDirtyAndSimplifiedMode({
      servicesManager,
      appConfig,
      displaySetInstanceUID
    });
    try {
      if (!haveDirtyMeasurementsInSimplifiedMode) {
        updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID, isHangingProtocolLayout);
        viewportGridService.setDisplaySetsForViewports(updatedViewports);
      }
    } catch (error) {
      console.warn(error);
      uiNotificationService.show({
        title: 'Thumbnail Double Click',
        message: 'The selected display sets could not be added to the viewport.',
        type: 'error',
        duration: 3000
      });
    }
  }]
};
const customOnDropHandlerCallback = async props => {
  const handled = checkHasDirtyAndSimplifiedMode(props);
  return Promise.resolve({
    handled
  });
};
const checkHasDirtyAndSimplifiedMode = props => {
  const {
    servicesManager,
    appConfig,
    displaySetInstanceUID
  } = props;
  const simplifiedMode = appConfig.measurementTrackingMode === _contexts_TrackedMeasurementsContext_promptBeginTracking__WEBPACK_IMPORTED_MODULE_0__.measurementTrackingMode.SIMPLIFIED;
  const {
    measurementService,
    displaySetService
  } = servicesManager.services;
  const measurements = measurementService.getMeasurements();
  const haveDirtyMeasurements = measurements.some(m => m.isDirty) || measurements.length && measurementService.getIsMeasurementDeletedIndividually();
  const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  const hasDirtyAndSimplifiedMode = displaySet.Modality === 'SR' && simplifiedMode && haveDirtyMeasurements;
  return hasDirtyAndSimplifiedMode;
};


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

/***/ "../../../extensions/measurement-tracking/src/getContextModule.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getContextModule.tsx ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useTrackedMeasurements: () => (/* reexport safe */ _contexts__WEBPACK_IMPORTED_MODULE_0__.useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var _contexts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contexts */ "../../../extensions/measurement-tracking/src/contexts/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function getContextModule({
  servicesManager,
  extensionManager,
  commandsManager
}) {
  const BoundTrackedMeasurementsContextProvider = _contexts__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContextProvider.bind(null, {
    servicesManager,
    extensionManager,
    commandsManager
  });
  return [{
    name: 'TrackedMeasurementsContext',
    context: _contexts__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContext,
    provider: BoundTrackedMeasurementsContextProvider
  }];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContextModule);

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

/***/ "../../../extensions/measurement-tracking/src/getCustomizationModule.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getCustomizationModule.ts ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* harmony import */ var _customizations_measurementTrackingPrompts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizations/measurementTrackingPrompts */ "../../../extensions/measurement-tracking/src/customizations/measurementTrackingPrompts.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function getCustomizationModule() {
  return [{
    name: 'default',
    value: {
      ..._customizations_measurementTrackingPrompts__WEBPACK_IMPORTED_MODULE_0__["default"]
    }
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

/***/ "../../../extensions/measurement-tracking/src/getPanelModule.tsx":
/*!***********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getPanelModule.tsx ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _panels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panels */ "../../../extensions/measurement-tracking/src/panels/index.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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




// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  return [{
    name: 'seriesList',
    iconName: 'tab-studies',
    iconLabel: 'Studies',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('SidePanel:Studies'),
    component: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_panels__WEBPACK_IMPORTED_MODULE_0__.PanelStudyBrowserTracking, props)
  }, {
    name: 'trackedMeasurements',
    iconName: 'tab-linear',
    iconLabel: 'Measure',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('SidePanel:Measurements'),
    component: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_panels__WEBPACK_IMPORTED_MODULE_0__.PanelMeasurementTableTracking, _extends({}, props, {
      key: "trackedMeasurements-panel",
      commandsManager: commandsManager,
      extensionManager: extensionManager,
      servicesManager: servicesManager
    }))
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPanelModule);

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

/***/ "../../../extensions/measurement-tracking/src/getViewportModule.tsx":
/*!**************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getViewportModule.tsx ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
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
  return __webpack_require__.e(/*! import() */ "extensions_measurement-tracking_src_viewports_TrackedCornerstoneViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/TrackedCornerstoneViewport */ "../../../extensions/measurement-tracking/src/viewports/TrackedCornerstoneViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstoneViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, props));
};
_c3 = OHIFCornerstoneViewport;
function getViewportModule({
  servicesManager,
  commandsManager,
  extensionManager
}) {
  const ExtendedOHIFCornerstoneTrackingViewport = props => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(OHIFCornerstoneViewport, _extends({
      servicesManager: servicesManager,
      commandsManager: commandsManager,
      extensionManager: extensionManager
    }, props));
  };
  return [{
    name: 'cornerstone-tracked',
    component: ExtendedOHIFCornerstoneTrackingViewport,
    isReferenceViewable: props => _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.utils.isReferenceViewable({
      ...props,
      servicesManager
    })
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getViewportModule);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Component$React.lazy");
__webpack_require__.$Refresh$.register(_c2, "Component");
__webpack_require__.$Refresh$.register(_c3, "OHIFCornerstoneViewport");

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

/***/ "../../../extensions/measurement-tracking/src/id.js":
/*!**********************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/id.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/measurement-tracking/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;


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

/***/ "../../../extensions/measurement-tracking/src/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   measurementTrackingMode: () => (/* reexport safe */ _contexts_TrackedMeasurementsContext_promptBeginTracking__WEBPACK_IMPORTED_MODULE_4__.measurementTrackingMode)
/* harmony export */ });
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/measurement-tracking/src/getPanelModule.tsx");
/* harmony import */ var _getViewportModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getViewportModule */ "../../../extensions/measurement-tracking/src/getViewportModule.tsx");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./id.js */ "../../../extensions/measurement-tracking/src/id.js");
/* harmony import */ var _contexts_TrackedMeasurementsContext_promptBeginTracking__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contexts/TrackedMeasurementsContext/promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/measurement-tracking/src/getCustomizationModule.ts");
/* harmony import */ var _customizations_studyBrowserCustomization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customizations/studyBrowserCustomization */ "../../../extensions/measurement-tracking/src/customizations/studyBrowserCustomization.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services */ "../../../extensions/measurement-tracking/src/services/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./types */ "../../../extensions/measurement-tracking/src/types/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");









// Import types to ensure they're included in the build

const measurementTrackingExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_3__.id,
  getContextModule: _getContextModule__WEBPACK_IMPORTED_MODULE_0__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  getViewportModule: _getViewportModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * Service configuration
   */
  preRegistration({
    servicesManager
  }) {
    servicesManager.registerService(_services__WEBPACK_IMPORTED_MODULE_7__.TrackedMeasurementsService.REGISTRATION);
  },
  onModeEnter({
    servicesManager
  }) {
    const {
      customizationService,
      toolbarService,
      trackedMeasurementsService
    } = servicesManager.services;
    toolbarService.registerEventForToolbarUpdate(trackedMeasurementsService, [trackedMeasurementsService.EVENTS.TRACKED_SERIES_CHANGED, trackedMeasurementsService.EVENTS.SERIES_ADDED, trackedMeasurementsService.EVENTS.SERIES_REMOVED, trackedMeasurementsService.EVENTS.TRACKING_ENABLED, trackedMeasurementsService.EVENTS.TRACKING_DISABLED]);
    customizationService.setCustomizations({
      'studyBrowser.thumbnailDoubleClickCallback': {
        $set: _customizations_studyBrowserCustomization__WEBPACK_IMPORTED_MODULE_6__.onDoubleClickHandler
      },
      customOnDropHandler: {
        $set: _customizations_studyBrowserCustomization__WEBPACK_IMPORTED_MODULE_6__.customOnDropHandlerCallback
      }
    });
  },
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_5__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (measurementTrackingExtension);


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

/***/ "../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking.tsx ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* harmony import */ var _PanelStudyBrowserTracking_untrackSeriesModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PanelStudyBrowserTracking/untrackSeriesModal */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/untrackSeriesModal.tsx");
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






const {
  filterAnd,
  filterPlanarMeasurement,
  filterMeasurementsBySeriesUID
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.MeasurementFilters;
function PanelMeasurementTableTracking(props) {
  _s();
  const [viewportGrid] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid)();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem)();
  const {
    measurementService,
    uiModalService
  } = servicesManager.services;
  const [trackedMeasurements, sendTrackedMeasurementsEvent] = (0,_getContextModule__WEBPACK_IMPORTED_MODULE_4__.useTrackedMeasurements)();
  const {
    trackedStudy,
    trackedSeries
  } = trackedMeasurements.context;
  const measurementFilter = trackedStudy ? filterAnd(filterPlanarMeasurement, filterMeasurementsBySeriesUID(trackedSeries)) : filterPlanarMeasurement;
  const onUntrackConfirm = () => {
    sendTrackedMeasurementsEvent('UNTRACK_ALL', {});
  };
  const onDelete = () => {
    const hasDirtyMeasurements = measurementService.getMeasurements().some(measurement => measurement.isDirty);
    hasDirtyMeasurements ? uiModalService.show({
      title: 'Untrack Study',
      content: _PanelStudyBrowserTracking_untrackSeriesModal__WEBPACK_IMPORTED_MODULE_5__.UntrackSeriesModal,
      contentProps: {
        onConfirm: onUntrackConfirm,
        message: 'Are you sure you want to untrack study and delete all measurements?'
      }
    }) : onUntrackConfirm();
  };
  const EmptyComponent = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": "trackedMeasurements-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.MeasurementTable, {
    title: "Measurements",
    isExpanded: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.MeasurementTable.Body, null)));
  const actions = {
    createSR: ({
      StudyInstanceUID
    }) => {
      sendTrackedMeasurementsEvent('SAVE_REPORT', {
        viewportId: viewportGrid.activeViewportId,
        isBackupSave: true,
        StudyInstanceUID,
        measurementFilter
      });
    },
    onDelete
  };
  const Header = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.AccordionTrigger, {
    asChild: true,
    className: "px-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": "TrackingHeader"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.StudySummaryFromMetadata, _extends({}, props, {
    actions: actions
  }))));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ScrollArea, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": "trackedMeasurements-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.PanelMeasurement, {
    measurementFilter: measurementFilter,
    emptyComponent: EmptyComponent,
    sourceChildren: props.children
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.StudyMeasurements, {
    grouping: props.grouping
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.AccordionGroup.Trigger, {
    key: "trackingMeasurementsHeader",
    asChild: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Header, {
    key: "trackingHeadChild"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.MeasurementsOrAdditionalFindings, {
    key: "measurementsOrAdditionalFindings",
    activeStudyUID: trackedStudy,
    customHeader: _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.StudyMeasurementsActions,
    measurementFilter: measurementFilter,
    actions: actions
  })))));
}
_s(PanelMeasurementTableTracking, "0kwOg5uN4eGzxd1vUg2OO0Byh08=", false, function () {
  return [_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid, _ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem, _getContextModule__WEBPACK_IMPORTED_MODULE_4__.useTrackedMeasurements];
});
_c = PanelMeasurementTableTracking;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PanelMeasurementTableTracking);
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelMeasurementTableTracking");

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

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx":
/*!*******************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx ***!
  \*******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelStudyBrowserTracking)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_extension_default_src_Panels_StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/extension-default/src/Panels/StudyBrowser/PanelStudyBrowser */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx");
/* harmony import */ var _untrackSeriesModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./untrackSeriesModal */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/untrackSeriesModal.tsx");
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();






const thumbnailNoImageModalities = ['SR', 'SEG', 'RTSTRUCT', 'RTPLAN', 'RTDOSE', 'PMAP'];

/**
 * Panel component for the Study Browser with tracking capabilities
 */
function PanelStudyBrowserTracking({
  getImageSrc,
  getStudiesForPatientByMRN,
  requestDisplaySetCreationForStudy,
  dataSource
}) {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    displaySetService,
    uiModalService,
    measurementService,
    viewportGridService
  } = servicesManager.services;
  const [trackedMeasurements, sendTrackedMeasurementsEvent] = (0,_getContextModule__WEBPACK_IMPORTED_MODULE_5__.useTrackedMeasurements)();
  const {
    trackedSeries
  } = trackedMeasurements.context;
  const checkDirtyMeasurements = displaySetInstanceUID => {
    const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    if (displaySet.Modality === 'SR') {
      const activeViewportId = viewportGridService.getActiveViewportId();
      sendTrackedMeasurementsEvent('CHECK_DIRTY', {
        viewportId: activeViewportId,
        displaySetInstanceUID: displaySetInstanceUID
      });
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const subscriptionOndropFired = viewportGridService.subscribe(viewportGridService.EVENTS.VIEWPORT_ONDROP_HANDLED, ({
      eventData
    }) => {
      checkDirtyMeasurements(eventData.displaySetInstanceUID);
    });
    return () => {
      subscriptionOndropFired.unsubscribe();
    };
  }, []);
  const onClickUntrack = displaySetInstanceUID => {
    const onConfirm = () => {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      sendTrackedMeasurementsEvent('UNTRACK_SERIES', {
        SeriesInstanceUID: displaySet.SeriesInstanceUID
      });
      const measurements = measurementService.getMeasurements();
      measurements.forEach(m => {
        if (m.referenceSeriesUID === displaySet.SeriesInstanceUID) {
          measurementService.remove(m.uid);
        }
      });
    };
    uiModalService.show({
      title: 'Untrack Series',
      content: _untrackSeriesModal__WEBPACK_IMPORTED_MODULE_4__.UntrackSeriesModal,
      contentProps: {
        onConfirm,
        message: 'Are you sure you want to untrack this series?'
      }
    });
  };

  // Custom mapping function to add tracking data to display sets
  const mapDisplaySetsWithTracking = (displaySets, displaySetLoadingState, thumbnailImageSrcMap, viewports) => {
    const thumbnailDisplaySets = [];
    const thumbnailNoImageDisplaySets = [];
    displaySets.filter(ds => !ds.excludeFromThumbnailBrowser).forEach(ds => {
      const {
        thumbnailSrc,
        displaySetInstanceUID
      } = ds;
      const componentType = getComponentType(ds);
      const array = componentType === 'thumbnailTracked' ? thumbnailDisplaySets : thumbnailNoImageDisplaySets;
      const loadingProgress = displaySetLoadingState?.[displaySetInstanceUID];
      array.push({
        displaySetInstanceUID,
        description: ds.SeriesDescription || '',
        seriesNumber: ds.SeriesNumber,
        modality: ds.Modality,
        seriesDate: ds.SeriesDate ? new Date(ds.SeriesDate).toLocaleDateString() : '',
        numInstances: ds.numImageFrames,
        loadingProgress,
        countIcon: ds.countIcon,
        messages: ds.messages,
        StudyInstanceUID: ds.StudyInstanceUID,
        componentType,
        imageSrc: thumbnailSrc || thumbnailImageSrcMap[displaySetInstanceUID],
        dragData: {
          type: 'displayset',
          displaySetInstanceUID
        },
        isTracked: trackedSeries.includes(ds.SeriesInstanceUID),
        isHydratedForDerivedDisplaySet: ds.isHydrated
      });
    });
    return [...thumbnailDisplaySets, ...thumbnailNoImageDisplaySets];
  };

  // Override component type to use tracking specific components
  const getComponentType = ds => {
    if (thumbnailNoImageModalities.includes(ds.Modality) || ds.unsupported || ds.thumbnailSrc === null) {
      return 'thumbnailNoImage';
    }
    return 'thumbnailTracked';
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_default_src_Panels_StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_3__["default"], {
    getImageSrc: getImageSrc,
    getStudiesForPatientByMRN: getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy: requestDisplaySetCreationForStudy,
    dataSource: dataSource,
    customMapDisplaySets: mapDisplaySetsWithTracking,
    onClickUntrack: onClickUntrack,
    onDoubleClickThumbnailHandlerCallBack: checkDirtyMeasurements
  });
}
_s(PanelStudyBrowserTracking, "5m5U/U2UCChT3+4bFaWe32/76lM=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem, _getContextModule__WEBPACK_IMPORTED_MODULE_5__.useTrackedMeasurements];
});
_c = PanelStudyBrowserTracking;
PanelStudyBrowserTracking.propTypes = {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    getImageIdsForDisplaySet: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }).isRequired,
  getImageSrc: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  getStudiesForPatientByMRN: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  requestDisplaySetCreationForStudy: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelStudyBrowserTracking");

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

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js":
/*!***************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * @param {*} cornerstone
 * @param {*} imageId
 */
function getImageSrcFromImageId(cornerstone, imageId) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    cornerstone.utilities.loadImageToCanvas({
      canvas,
      imageId,
      thumbnail: true
    }).then(imageId => {
      resolve(canvas.toDataURL());
    }).catch(reject);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getImageSrcFromImageId);

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

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelStudyBrowserTracking */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
/* harmony import */ var _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getImageSrcFromImageId */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js");
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();

//




function _getStudyForPatientUtility(extensionManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-default.utilityModule.common');
  const {
    getStudiesForPatientByMRN
  } = utilityModule.exports;
  return getStudiesForPatientByMRN;
}

/**
 * Wraps the PanelStudyBrowser and provides features afforded by managers/services
 *
 * @param {object} params
 * @param {object} commandsManager
 * @param {object} extensionManager
 */
function WrappedPanelStudyBrowserTracking() {
  _s();
  const {
    extensionManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_4__.useSystem)();
  const dataSource = extensionManager.getActiveDataSource()[0];
  const getStudiesForPatientByMRN = _getStudyForPatientUtility(extensionManager);
  const _getStudiesForPatientByMRN = getStudiesForPatientByMRN.bind(null, dataSource);
  const _getImageSrcFromImageId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_createGetImageSrcFromImageIdFn(extensionManager), []);
  const _requestDisplaySetCreationForStudy = _ohif_extension_default__WEBPACK_IMPORTED_MODULE_3__.requestDisplaySetCreationForStudy.bind(null, dataSource);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_1__["default"], {
    dataSource: dataSource,
    getImageSrc: _getImageSrcFromImageId,
    getStudiesForPatientByMRN: _getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy: _requestDisplaySetCreationForStudy
  });
}

/**
 * Grabs cornerstone library reference using a dependent command from
 * the @ohif/extension-cornerstone extension. Then creates a helper function
 * that can take an imageId and return an image src.
 *
 * @param {func} getCommand - CommandManager's getCommand method
 * @returns {func} getImageSrcFromImageId - A utility function powered by
 * cornerstone
 */
_s(WrappedPanelStudyBrowserTracking, "VBl3w6h1VvKF7U9AVeERoMHQXTM=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_4__.useSystem];
});
_c = WrappedPanelStudyBrowserTracking;
function _createGetImageSrcFromImageIdFn(extensionManager) {
  const utilities = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  try {
    const {
      cornerstone
    } = utilities.exports.getCornerstoneLibraries();
    return _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_2__["default"].bind(null, cornerstone);
  } catch (ex) {
    throw new Error('Required command not found');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WrappedPanelStudyBrowserTracking);
var _c;
__webpack_require__.$Refresh$.register(_c, "WrappedPanelStudyBrowserTracking");

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

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/untrackSeriesModal.tsx":
/*!************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/untrackSeriesModal.tsx ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UntrackSeriesModal: () => (/* binding */ UntrackSeriesModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function UntrackSeriesModal({
  hide,
  onConfirm,
  message
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-foreground text-[13px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "mt-2"
  }, "This action cannot be undone and will delete all your existing measurements.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.FooterAction, {
    className: "mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.FooterAction.Right, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.FooterAction.Secondary, {
    onClick: hide
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.FooterAction.Primary, {
    onClick: () => {
      onConfirm();
      hide();
    }
  }, "Untrack"))));
}
_c = UntrackSeriesModal;
var _c;
__webpack_require__.$Refresh$.register(_c, "UntrackSeriesModal");

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

/***/ "../../../extensions/measurement-tracking/src/panels/index.js":
/*!********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/index.js ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelMeasurementTableTracking: () => (/* reexport safe */ _PanelMeasurementTableTracking__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   PanelStudyBrowserTracking: () => (/* reexport safe */ _PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelStudyBrowserTracking */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx");
/* harmony import */ var _PanelMeasurementTableTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelMeasurementTableTracking */ "../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





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

/***/ "../../../extensions/measurement-tracking/src/services/TrackedMeasurementsService/TrackedMeasurementsService.ts":
/*!**********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/services/TrackedMeasurementsService/TrackedMeasurementsService.ts ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsService: () => (/* binding */ TrackedMeasurementsService),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _TrackedMeasurementsService;

const EVENTS = {
  TRACKED_SERIES_CHANGED: 'event::trackedmeasurements:trackedserieschanged',
  SERIES_ADDED: 'event::trackedmeasurements:seriesadded',
  SERIES_REMOVED: 'event::trackedmeasurements:seriesremoved',
  TRACKING_ENABLED: 'event::trackedmeasurements:trackingenabled',
  TRACKING_DISABLED: 'event::trackedmeasurements:trackingdisabled'
};

/**
 * Service class for accessing tracked measurements data.
 * This service provides a robust way to access tracked series information
 * from anywhere in the application, including outside of React components.
 */
class TrackedMeasurementsService extends _ohif_core__WEBPACK_IMPORTED_MODULE_0__.PubSubService {
  constructor() {
    super(EVENTS);
    this._trackedSeries = [];
  }

  /**
   * Updates the tracked series and notifies subscribers
   * @param trackedSeries Array of series UIDs being tracked
   */
  updateTrackedSeries(trackedSeries) {
    if (!trackedSeries) {
      trackedSeries = [];
    }
    const hasChanged = this._trackedSeries.length !== trackedSeries.length || this._trackedSeries.some((seriesUID, index) => seriesUID !== trackedSeries[index]);
    if (hasChanged) {
      const oldSeries = [...this._trackedSeries];
      this._trackedSeries = [...trackedSeries];
      const wasEmpty = oldSeries.length === 0;
      const isEmpty = trackedSeries.length === 0;
      if (wasEmpty && !isEmpty) {
        this._broadcastEvent(EVENTS.TRACKING_ENABLED, {
          trackedSeries: this.getTrackedSeries()
        });
      } else if (!wasEmpty && isEmpty) {
        this._broadcastEvent(EVENTS.TRACKING_DISABLED, {
          trackedSeries: this.getTrackedSeries()
        });
      }
      this._broadcastEvent(EVENTS.TRACKED_SERIES_CHANGED, {
        trackedSeries: this.getTrackedSeries()
      });
    }
  }

  /**
   * Adds a single series to tracking
   * @param seriesInstanceUID Series instance UID to add to tracking
   */
  addTrackedSeries(seriesInstanceUID) {
    if (!seriesInstanceUID || this.isSeriesTracked(seriesInstanceUID)) {
      return;
    }
    const wasEmpty = this._trackedSeries.length === 0;
    this._trackedSeries = [...this._trackedSeries, seriesInstanceUID];
    this._broadcastEvent(EVENTS.SERIES_ADDED, {
      seriesInstanceUID,
      trackedSeries: this.getTrackedSeries()
    });
    if (wasEmpty) {
      this._broadcastEvent(EVENTS.TRACKING_ENABLED, {
        trackedSeries: this.getTrackedSeries()
      });
    }
    this._broadcastEvent(EVENTS.TRACKED_SERIES_CHANGED, {
      trackedSeries: this.getTrackedSeries()
    });
  }

  /**
   * Removes a single series from tracking
   * @param seriesInstanceUID Series instance UID to remove from tracking
   */
  removeTrackedSeries(seriesInstanceUID) {
    if (!seriesInstanceUID || !this.isSeriesTracked(seriesInstanceUID)) {
      return;
    }
    this._trackedSeries = this._trackedSeries.filter(uid => uid !== seriesInstanceUID);
    this._broadcastEvent(EVENTS.SERIES_REMOVED, {
      seriesInstanceUID,
      trackedSeries: this.getTrackedSeries()
    });
    if (this._trackedSeries.length === 0) {
      this._broadcastEvent(EVENTS.TRACKING_DISABLED, {
        trackedSeries: this.getTrackedSeries()
      });
    }
    this._broadcastEvent(EVENTS.TRACKED_SERIES_CHANGED, {
      trackedSeries: this.getTrackedSeries()
    });
  }

  /**
   * Retrieves the currently tracked series
   * @returns Array of series UIDs being tracked
   */
  getTrackedSeries() {
    return [...this._trackedSeries];
  }

  /**
   * Checks if a specific series is being tracked
   * @param seriesInstanceUID Series instance UID to check
   * @returns boolean indicating if series is tracked
   */
  isSeriesTracked(seriesInstanceUID) {
    return this._trackedSeries.includes(seriesInstanceUID);
  }

  /**
   * Resets the service state
   */
  reset() {
    const wasTracking = this._trackedSeries.length > 0;
    this._trackedSeries = [];
    if (wasTracking) {
      this._broadcastEvent(EVENTS.TRACKING_DISABLED, {
        trackedSeries: []
      });
      this._broadcastEvent(EVENTS.TRACKED_SERIES_CHANGED, {
        trackedSeries: []
      });
    }
    super.reset();
  }

  /**
   * Checks if any series are being tracked
   * @returns boolean indicating if tracking is active
   */
  isTrackingEnabled() {
    return this._trackedSeries.length > 0;
  }
}
_TrackedMeasurementsService = TrackedMeasurementsService;
TrackedMeasurementsService.REGISTRATION = {
  name: 'trackedMeasurementsService',
  altName: 'TrackedMeasurementsService',
  create: ({
    configuration = {}
  }) => {
    return new _TrackedMeasurementsService();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackedMeasurementsService);

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

/***/ "../../../extensions/measurement-tracking/src/services/TrackedMeasurementsService/index.ts":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/services/TrackedMeasurementsService/index.ts ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsService: () => (/* reexport safe */ _TrackedMeasurementsService__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsService)
/* harmony export */ });
/* harmony import */ var _TrackedMeasurementsService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackedMeasurementsService */ "../../../extensions/measurement-tracking/src/services/TrackedMeasurementsService/TrackedMeasurementsService.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



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

/***/ "../../../extensions/measurement-tracking/src/services/index.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/services/index.ts ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsService: () => (/* reexport safe */ _TrackedMeasurementsService__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsService)
/* harmony export */ });
/* harmony import */ var _TrackedMeasurementsService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackedMeasurementsService */ "../../../extensions/measurement-tracking/src/services/TrackedMeasurementsService/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



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

/***/ "../../../extensions/measurement-tracking/src/types/AppTypes.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/types/AppTypes.ts ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




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

/***/ "../../../extensions/measurement-tracking/src/types/index.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/types/index.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppTypes */ "../../../extensions/measurement-tracking/src/types/AppTypes.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



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

/***/ "../../../extensions/measurement-tracking/package.json":
/*!*************************************************************!*\
  !*** ../../../extensions/measurement-tracking/package.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-measurement-tracking","version":"3.11.0-beta.56","description":"Tracking features and functionality for basic image viewing","author":"OHIF Core Team","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-measurement-tracking.umd.js","module":"src/index.tsx","publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"files":["dist","README.md"],"keywords":["ohif-extension"],"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@cornerstonejs/core":"^3.15.6","@cornerstonejs/tools":"^3.15.6","@ohif/core":"3.11.0-beta.56","@ohif/extension-cornerstone-dicom-sr":"3.11.0-beta.56","@ohif/extension-default":"3.11.0-beta.56","@ohif/ui":"3.11.0-beta.56","classnames":"^2.3.2","dcmjs":"*","lodash.debounce":"^4.0.8","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","webpack":"5.89.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","@ohif/ui":"3.11.0-beta.56","@xstate/react":"^3.2.2","xstate":"^4.10.0"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_measurement-tracking_src_index_tsx.js.map