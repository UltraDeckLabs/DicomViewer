"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_measurement-tracking_src_viewports_TrackedCornerstoneViewport_tsx"],{

/***/ "../../../extensions/measurement-tracking/src/viewports/TrackedCornerstoneViewport.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/viewports/TrackedCornerstoneViewport.tsx ***!
  \*********************************************************************************************/
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
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
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








function TrackedCornerstoneViewport(props) {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_7__.useSystem)();
  const {
    displaySets,
    viewportId
  } = props;
  const {
    measurementService,
    cornerstoneViewportService,
    viewportGridService,
    toolbarService
  } = servicesManager.services;

  // Todo: handling more than one displaySet on the same viewport
  const displaySet = displaySets[0];
  const [trackedMeasurements, sendTrackedMeasurementsEvent] = (0,_getContextModule__WEBPACK_IMPORTED_MODULE_5__.useTrackedMeasurements)();
  const [isTracked, setIsTracked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [trackedMeasurementUID, setTrackedMeasurementUID] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [viewportElem, setViewportElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    trackedSeries
  } = trackedMeasurements.context;
  const {
    SeriesInstanceUID
  } = displaySet;
  const updateIsTracked = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_6__.BaseVolumeViewport) {
      // A current image id will only exist for volume viewports that can have measurements tracked.
      // Typically these are those volume viewports for the series of acquisition.
      const currentImageId = viewport?.getCurrentImageId();
      if (!currentImageId) {
        if (isTracked) {
          setIsTracked(false);
        }
        return;
      }
    }
    if (trackedSeries.includes(SeriesInstanceUID) !== isTracked) {
      setIsTracked(!isTracked);
    }
  }, [isTracked, trackedMeasurements, viewportId, SeriesInstanceUID]);
  const onElementEnabled = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(evt => {
    if (evt.detail.element !== viewportElem) {
      // The VOLUME_VIEWPORT_NEW_VOLUME event allows updateIsTracked to reliably fetch the image id for a volume viewport.
      evt.detail.element?.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_6__.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, updateIsTracked);
      setViewportElem(evt.detail.element);
    }
  }, [updateIsTracked, viewportElem]);
  const onElementDisabled = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    viewportElem?.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_6__.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, updateIsTracked);
  }, [updateIsTracked, viewportElem]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(updateIsTracked, [updateIsTracked]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED, props => {
      if (props.viewportId !== viewportId) {
        return;
      }
      updateIsTracked();
    });
    return () => {
      unsubscribe();
    };
  }, [updateIsTracked, viewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isTracked) {
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__.annotation.config.style.setViewportToolStyles(viewportId, {
        ReferenceLines: {
          lineDash: '4,4'
        },
        global: {
          lineDash: ''
        }
      });
      cornerstoneViewportService.getRenderingEngine().renderViewport(viewportId);
      return;
    }
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__.annotation.config.style.setViewportToolStyles(viewportId, {
      global: {
        lineDash: '4,4'
      }
    });
    cornerstoneViewportService.getRenderingEngine().renderViewport(viewportId);
    return () => {
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__.annotation.config.style.setViewportToolStyles(viewportId, {});
    };
  }, [isTracked]);

  /**
   * The effect for listening to measurement service measurement added events
   * and in turn firing an event to update the measurement tracking state machine.
   * The TrackedCornerstoneViewport is the best place for this because when
   * a measurement is added, at least one TrackedCornerstoneViewport will be in
   * the DOM and thus can react to the events fired.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const added = measurementService.EVENTS.MEASUREMENT_ADDED;
    const addedRaw = measurementService.EVENTS.RAW_MEASUREMENT_ADDED;
    const subscriptions = [];
    [added, addedRaw].forEach(evt => {
      subscriptions.push(measurementService.subscribe(evt, ({
        source,
        measurement
      }) => {
        const {
          activeViewportId
        } = viewportGridService.getState();

        // Each TrackedCornerstoneViewport receives the MeasurementService's events.
        // Only send the tracked measurements event for the active viewport to avoid
        // sending it more than once.
        if (viewportId === activeViewportId) {
          const {
            referenceStudyUID: StudyInstanceUID,
            referenceSeriesUID: SeriesInstanceUID,
            uid: measurementId,
            toolName
          } = measurement;
          sendTrackedMeasurementsEvent('SET_DIRTY', {
            SeriesInstanceUID
          });
          sendTrackedMeasurementsEvent('TRACK_SERIES', {
            viewportId,
            StudyInstanceUID,
            SeriesInstanceUID,
            measurementId,
            toolName
          });
        }
      }).unsubscribe);
    });
    return () => {
      subscriptions.forEach(unsub => {
        unsub();
      });
    };
  }, [measurementService, sendTrackedMeasurementsEvent, viewportId, viewportGridService]);
  const switchMeasurement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(direction => {
    const newTrackedMeasurementUID = _getNextMeasurementUID(direction, servicesManager, trackedMeasurementUID, trackedMeasurements);
    if (!newTrackedMeasurementUID) {
      return;
    }
    setTrackedMeasurementUID(newTrackedMeasurementUID);
    measurementService.jumpToMeasurement(viewportId, newTrackedMeasurementUID);
  }, [measurementService, servicesManager, trackedMeasurementUID, trackedMeasurements, viewportId]);
  const getCornerstoneViewport = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.OHIFCornerstoneViewport, _extends({}, props, {
      onElementEnabled: evt => {
        props.onElementEnabled?.(evt);
        onElementEnabled(evt);
      },
      onElementDisabled: onElementDisabled
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex h-full w-full flex-row overflow-hidden"
  }, getCornerstoneViewport());
}
_s(TrackedCornerstoneViewport, "fj1J4cKvMi3ryZxIpiJTLs/MwXY=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_7__.useSystem, _getContextModule__WEBPACK_IMPORTED_MODULE_5__.useTrackedMeasurements];
});
_c = TrackedCornerstoneViewport;
TrackedCornerstoneViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired).isRequired,
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};
function _getNextMeasurementUID(direction, servicesManager, trackedMeasurementId, trackedMeasurements) {
  const {
    measurementService,
    viewportGridService
  } = servicesManager.services;
  const measurements = measurementService.getMeasurements();
  const {
    activeViewportId,
    viewports
  } = viewportGridService.getState();
  const {
    displaySetInstanceUIDs: activeViewportDisplaySetInstanceUIDs
  } = viewports.get(activeViewportId);
  const {
    trackedSeries
  } = trackedMeasurements.context;

  // Get the potentially trackable measurements for the series of the
  // active viewport.
  // The measurements to jump between are the same
  // regardless if this series is tracked or not.

  const filteredMeasurements = measurements.filter(m => trackedSeries.includes(m.referenceSeriesUID) && activeViewportDisplaySetInstanceUIDs.includes(m.displaySetInstanceUID));
  if (!filteredMeasurements.length) {
    // No measurements on this series.
    return;
  }
  const measurementCount = filteredMeasurements.length;
  const uids = filteredMeasurements.map(fm => fm.uid);
  let measurementIndex = uids.findIndex(uid => uid === trackedMeasurementId);
  if (measurementIndex === -1) {
    // Not tracking a measurement, or previous measurement now deleted, revert to 0.
    measurementIndex = 0;
  } else {
    measurementIndex += direction;
    if (measurementIndex < 0) {
      measurementIndex = measurementCount - 1;
    } else if (measurementIndex === measurementCount) {
      measurementIndex = 0;
    }
  }
  const newTrackedMeasurementId = uids[measurementIndex];
  return newTrackedMeasurementId;
}
const _getArrowsComponent = (isTracked, switchMeasurement, isActiveViewport) => {
  if (!isTracked) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ViewportActionArrows, {
    onArrowsClick: direction => switchMeasurement(direction),
    className: isActiveViewport ? 'visible' : 'invisible group-hover/pane:visible'
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackedCornerstoneViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "TrackedCornerstoneViewport");

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
//# sourceMappingURL=extensions_measurement-tracking_src_viewports_TrackedCornerstoneViewport_tsx.js.map