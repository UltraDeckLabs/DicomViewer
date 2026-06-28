"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_tmtv_src_index_tsx"],{

/***/ "../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx":
/*!***********************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelPetSUV)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src */ "../../core/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
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






const DEFAULT_MEATADATA = {
  PatientWeight: null,
  PatientSex: null,
  SeriesTime: null,
  RadiopharmaceuticalInformationSequence: {
    RadionuclideTotalDose: null,
    RadionuclideHalfLife: null,
    RadiopharmaceuticalStartTime: null
  }
};

/*
 * PETSUV panel enables the user to modify the patient related information, such as
 * patient sex, patientWeight. This is allowed since
 * sometimes these metadata are missing or wrong. By changing them
 * @param param0
 * @returns
 */

// InputRow compound component
const InputRow = ({
  children,
  className,
  ...props
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    className: `flex flex-row items-center space-x-4 ${className || ''}`
  }, props), children);
};

// InputRow sub-components
_c = InputRow;
InputRow.Label = ({
  children,
  unit,
  className,
  ...props
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Label, _extends({
  className: `min-w-32 flex-shrink-0 ${className || ''}`
}, props), children, unit && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "text-muted-foreground"
}, " ", unit));
InputRow.Input = ({
  className,
  ...props
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Input, _extends({
  className: `h-7 flex-1 ${className || ''}`
}, props));

// Set display names for better debugging
InputRow.Label.displayName = 'InputRow.Label';
InputRow.Input.displayName = 'InputRow.Input';
function PanelPetSUV() {
  _s();
  const {
    commandsManager,
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)('PanelSUV');
  const {
    displaySetService,
    hangingProtocolService
  } = servicesManager.services;
  const [metadata, setMetadata] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_MEATADATA);
  const [ptDisplaySet, setPtDisplaySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleMetadataChange = metadata => {
    setMetadata(prevState => {
      const newState = {
        ...prevState
      };
      Object.keys(metadata).forEach(key => {
        if (typeof metadata[key] === 'object') {
          newState[key] = {
            ...prevState[key],
            ...metadata[key]
          };
        } else {
          newState[key] = metadata[key];
        }
      });
      return newState;
    });
  };
  const getMatchingPTDisplaySet = viewportMatchDetails => {
    const ptDisplaySet = commandsManager.runCommand('getMatchingPTDisplaySet', {
      viewportMatchDetails
    });
    if (!ptDisplaySet) {
      return;
    }
    const metadata = commandsManager.runCommand('getPTMetadata', {
      ptDisplaySet
    });
    return {
      ptDisplaySet,
      metadata
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const displaySets = displaySetService.getActiveDisplaySets();
    const {
      viewportMatchDetails
    } = hangingProtocolService.getMatchDetails();
    if (!displaySets.length) {
      return;
    }
    const displaySetInfo = getMatchingPTDisplaySet(viewportMatchDetails);
    if (!displaySetInfo) {
      return;
    }
    const {
      ptDisplaySet,
      metadata
    } = displaySetInfo;
    setPtDisplaySet(ptDisplaySet);
    setMetadata(metadata);
  }, []);

  // get the patientMetadata from the StudyInstanceUIDs and update the state
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(hangingProtocolService.EVENTS.PROTOCOL_CHANGED, ({
      viewportMatchDetails
    }) => {
      const displaySetInfo = getMatchingPTDisplaySet(viewportMatchDetails);
      if (!displaySetInfo) {
        return;
      }
      const {
        ptDisplaySet,
        metadata
      } = displaySetInfo;
      setPtDisplaySet(ptDisplaySet);
      setMetadata(metadata);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  function updateMetadata() {
    if (!ptDisplaySet) {
      throw new Error('No ptDisplaySet found');
    }

    // metadata should be dcmjs naturalized
    _ohif_core__WEBPACK_IMPORTED_MODULE_2__.DicomMetadataStore.updateMetadataForSeries(ptDisplaySet.StudyInstanceUID, ptDisplaySet.SeriesInstanceUID, metadata);

    // update the displaySets
    displaySetService.setDisplaySetMetadataInvalidated(ptDisplaySet.displaySetInstanceUID);

    // Crosshair position depends on the metadata values such as the positioning interaction
    // between series, so when the metadata is updated, the crosshairs need to be reset.
    setTimeout(() => {
      commandsManager.runCommand('resetCrosshairs');
    }, 0);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ohif-scrollbar flex min-h-0 flex-auto select-none flex-col justify-between overflow-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex min-h-0 flex-1 flex-col bg-black text-base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.PanelSection, {
    defaultOpen: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.PanelSection.Header, null, t('Patient Information')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.PanelSection.Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-dark flex flex-col gap-3 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Label, null, t('Patient Sex')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Input, {
    value: metadata.PatientSex || '',
    onChange: e => {
      handleMetadataChange({
        PatientSex: e.target.value
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Label, {
    unit: "kg"
  }, t('Weight')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Input, {
    value: metadata.PatientWeight || '',
    onChange: e => {
      handleMetadataChange({
        PatientWeight: e.target.value
      });
    },
    id: "weight-input"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Label, {
    unit: "bq"
  }, t('Total Dose')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Input, {
    value: metadata.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadionuclideTotalDose: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Label, {
    unit: "s"
  }, t('Half Life')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Input, {
    value: metadata.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadionuclideHalfLife: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Label, {
    unit: "s"
  }, t('Injection Time')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Input, {
    value: metadata.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadiopharmaceuticalStartTime: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Label, {
    unit: "s"
  }, t('Acquisition Time')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InputRow.Input, {
    value: metadata.SeriesTime || '',
    onChange: () => {}
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "default",
    size: "sm",
    className: "w-28 self-end",
    onClick: updateMetadata
  }, "Reload Data")))))));
}
_s(PanelPetSUV, "Q1NuMN+mHy1r1FE7KqV1y3pIK+0=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem, react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation];
});
_c2 = PanelPetSUV;
PanelPetSUV.propTypes = {
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    services: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
      measurementService: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
        getMeasurements: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        subscribe: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        EVENTS: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
        VALUE_TYPES: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "InputRow");
__webpack_require__.$Refresh$.register(_c2, "PanelPetSUV");

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

/***/ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx":
/*!*****************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelRoiThresholdSegmentation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _utils_handleROIThresholding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/handleROIThresholding */ "../../../extensions/tmtv/src/utils/handleROIThresholding.ts");
/* harmony import */ var _ohif_core_src_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core/src/utils */ "../../core/src/utils/index.ts");
/* harmony import */ var _ohif_core_src__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/core/src */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();






function PanelRoiThresholdSegmentation() {
  _s();
  const {
    commandsManager,
    servicesManager
  } = (0,_ohif_core_src__WEBPACK_IMPORTED_MODULE_4__.useSystem)();
  const {
    segmentationService
  } = servicesManager.services;
  const {
    segmentationsWithRepresentations: segmentationsInfo
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations)();
  const segmentationIds = segmentationsInfo?.map(info => info.segmentation.segmentationId) || [];
  const segmentations = segmentationsInfo?.map(info => info.segmentation) || [];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const initialRun = async () => {
      for (const segmentationId of segmentationIds) {
        await (0,_utils_handleROIThresholding__WEBPACK_IMPORTED_MODULE_2__.handleROIThresholding)({
          segmentationId,
          commandsManager,
          segmentationService
        });
      }
    };
    initialRun();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const debouncedHandleROIThresholding = (0,_ohif_core_src_utils__WEBPACK_IMPORTED_MODULE_3__.debounce)(async eventDetail => {
      const {
        segmentationId
      } = eventDetail;
      await (0,_utils_handleROIThresholding__WEBPACK_IMPORTED_MODULE_2__.handleROIThresholding)({
        segmentationId,
        commandsManager,
        segmentationService
      });
    }, 100);
    const dataModifiedCallback = eventDetail => {
      debouncedHandleROIThresholding(eventDetail);
    };
    const dataModifiedSubscription = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_DATA_MODIFIED, dataModifiedCallback);
    return () => {
      dataModifiedSubscription.unsubscribe();
    };
  }, [commandsManager, segmentationService]);

  // Find the first segmentation with a TMTV value since all of them have the same value
  const stats = segmentationService.getSegmentationGroupStats(segmentationIds);
  const tmtvValue = stats?.tmtv;
  const handleExportCSV = () => {
    if (!segmentations.length) {
      return;
    }
    commandsManager.runCommand('exportTMTVReportCSV', {
      segmentations,
      tmtv: tmtvValue,
      config: {}
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-1 flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "invisible-scrollbar overflow-y-auto overflow-x-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-secondary-dark flex items-baseline justify-between px-2 py-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "py-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-muted-foreground text-base font-bold uppercase"
  }, 'TMTV: '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-foreground"
  }, tmtvValue ? `${tmtvValue.toFixed(3)} mL` : '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Button, {
    size: "sm",
    variant: "ghost",
    className: "text-blue-500",
    onClick: handleExportCSV
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "pl-1"
  }, "CSV"))))));
}
_s(PanelRoiThresholdSegmentation, "ewFqhyrrbGbH2S2gZLyAI+drn4Q=", false, function () {
  return [_ohif_core_src__WEBPACK_IMPORTED_MODULE_4__.useSystem, _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations];
});
_c = PanelRoiThresholdSegmentation;
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelRoiThresholdSegmentation");

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

/***/ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx":
/*!*******************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROI_STAT: () => (/* binding */ ROI_STAT),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();



const ROI_STAT = 'roi_stat';
const RANGE = 'range';
const options = [{
  value: ROI_STAT,
  label: 'Max',
  placeHolder: 'Max'
}, {
  value: RANGE,
  label: 'Range',
  placeHolder: 'Range'
}];
function ROIThresholdConfiguration({
  config,
  dispatch,
  runCommand
}) {
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('ROIThresholdConfiguration');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-dark flex flex-col space-y-4 p-px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-end space-x-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex min-w-0 flex-1 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: config.strategy,
    onValueChange: value => {
      dispatch({
        type: 'setStrategy',
        payload: {
          strategy: value
        }
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectTrigger, {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectValue, {
    placeholder: options.find(option => option.value === config.strategy)?.placeHolder
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectContent, {
    className: ""
  }, options.map(option => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectItem, {
    key: option.value,
    value: option.value
  }, option.label))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-shrink-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-end space-x-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: () => runCommand('setStartSliceForROIThresholdTool')
  }, t('Start')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: () => runCommand('setEndSliceForROIThresholdTool')
  }, t('End'))))), config.strategy === ROI_STAT && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mr-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Label, null, t('Percentage of Max SUV'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Input, {
    className: "w-full",
    type: "text",
    value: config.weight,
    onChange: e => {
      dispatch({
        type: 'setWeight',
        payload: {
          weight: e.target.value
        }
      });
    }
  })), config.strategy !== ROI_STAT && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mr-2 text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col space-y-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Label, null, "Lower & Upper Ranges"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-10 text-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Label, null, "CT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-1 space-x-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Input, {
    className: "w-full",
    type: "text",
    value: config.ctLower,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ctLower: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Input, {
    className: "w-full",
    type: "text",
    value: config.ctUpper,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ctUpper: e.target.value
        }
      });
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-10 text-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Label, null, "PT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-1 space-x-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Input, {
    className: "w-full",
    type: "text",
    value: config.ptLower,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ptLower: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Input, {
    className: "w-full",
    type: "text",
    value: config.ptUpper,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ptUpper: e.target.value
        }
      });
    }
  })))))));
}
_s(ROIThresholdConfiguration, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = ROIThresholdConfiguration;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ROIThresholdConfiguration);
var _c;
__webpack_require__.$Refresh$.register(_c, "ROIThresholdConfiguration");

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

/***/ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PanelROIThresholdExport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelROIThresholdExport */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_PanelROIThresholdExport__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/tmtv/src/Panels/PanelTMTV.tsx":
/*!*********************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelTMTV.tsx ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelTMTV)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _PanelROIThresholdSegmentation_PanelROIThresholdExport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelROIThresholdSegmentation/PanelROIThresholdExport */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function PanelTMTV({
  configuration
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.PanelSegmentation, {
    configuration: configuration
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelROIThresholdSegmentation_PanelROIThresholdExport__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
}
_c = PanelTMTV;
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelTMTV");

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

/***/ "../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx":
/*!*******************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _PanelROIThresholdSegmentation_ROIThresholdConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelROIThresholdSegmentation/ROIThresholdConfiguration */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();






const LOWER_CT_THRESHOLD_DEFAULT = -1024;
const UPPER_CT_THRESHOLD_DEFAULT = 1024;
const LOWER_PT_THRESHOLD_DEFAULT = 2.5;
const UPPER_PT_THRESHOLD_DEFAULT = 100;
const WEIGHT_DEFAULT = 0.41; // a default weight for suv max often used in the literature
const DEFAULT_STRATEGY = _PanelROIThresholdSegmentation_ROIThresholdConfiguration__WEBPACK_IMPORTED_MODULE_2__.ROI_STAT;
function reducer(state, action) {
  const {
    payload
  } = action;
  const {
    strategy,
    ctLower,
    ctUpper,
    ptLower,
    ptUpper,
    weight
  } = payload;
  switch (action.type) {
    case 'setStrategy':
      return {
        ...state,
        strategy
      };
    case 'setThreshold':
      return {
        ...state,
        ctLower: ctLower ? ctLower : state.ctLower,
        ctUpper: ctUpper ? ctUpper : state.ctUpper,
        ptLower: ptLower ? ptLower : state.ptLower,
        ptUpper: ptUpper ? ptUpper : state.ptUpper
      };
    case 'setWeight':
      return {
        ...state,
        weight
      };
    default:
      return state;
  }
}
function RectangleROIOptions() {
  _s();
  const {
    commandsManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_4__.useSystem)();
  const segmentations = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__.useSegmentations)();
  const activeSegmentation = segmentations[0];
  const runCommand = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((commandName, commandOptions = {}) => {
    return commandsManager.runCommand(commandName, commandOptions);
  }, [commandsManager]);
  const [config, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, {
    strategy: DEFAULT_STRATEGY,
    ctLower: LOWER_CT_THRESHOLD_DEFAULT,
    ctUpper: UPPER_CT_THRESHOLD_DEFAULT,
    ptLower: LOWER_PT_THRESHOLD_DEFAULT,
    ptUpper: UPPER_PT_THRESHOLD_DEFAULT,
    weight: WEIGHT_DEFAULT
  });
  const handleROIThresholding = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!activeSegmentation) {
      return;
    }
    const segmentationId = activeSegmentation.segmentationId;
    const activeSegmentIndex = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.segmentIndex.getActiveSegmentIndex(segmentationId);
    runCommand('thresholdSegmentationByRectangleROITool', {
      segmentationId,
      config,
      segmentIndex: activeSegmentIndex
    });
  }, [activeSegmentation, config]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "invisible-scrollbar mb-1 flex flex-col overflow-y-auto overflow-x-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelROIThresholdSegmentation_ROIThresholdConfiguration__WEBPACK_IMPORTED_MODULE_2__["default"], {
    config: config,
    dispatch: dispatch,
    runCommand: runCommand
  }), activeSegmentation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "default",
    className: "my-3 mr-auto w-20",
    onClick: handleROIThresholding
  }, "Run"));
}
_s(RectangleROIOptions, "a5D22L8Xb1Uv3ExgPVZOJ6kEHIU=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_4__.useSystem, _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__.useSegmentations];
});
_c = RectangleROIOptions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RectangleROIOptions);
var _c;
__webpack_require__.$Refresh$.register(_c, "RectangleROIOptions");

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

/***/ "../../../extensions/tmtv/src/Panels/index.tsx":
/*!*****************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/index.tsx ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelPetSUV: () => (/* reexport safe */ _PanelPetSUV__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PanelROIThresholdExport: () => (/* reexport safe */ _PanelROIThresholdSegmentation__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _PanelPetSUV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelPetSUV */ "../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx");
/* harmony import */ var _PanelROIThresholdSegmentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelROIThresholdSegmentation */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts");
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

/***/ "../../../extensions/tmtv/src/commandsModule.ts":
/*!******************************************************!*\
  !*** ../../../extensions/tmtv/src/commandsModule.ts ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _utils_getThresholdValue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getThresholdValue */ "../../../extensions/tmtv/src/utils/getThresholdValue.ts");
/* harmony import */ var _utils_createAndDownloadTMTVReport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createAndDownloadTMTVReport */ "../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js");
/* harmony import */ var _utils_dicomRTAnnotationExport_RTStructureSet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/dicomRTAnnotationExport/RTStructureSet */ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");











const {
  SegmentationRepresentations
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.Enums;
const {
  formatPN
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.MetadataProvider;
const ROI_THRESHOLD_MANUAL_TOOL_IDS = ['RectangleROIStartEndThreshold', 'RectangleROIThreshold', 'CircleROIStartEndThreshold'];
const commandsModule = ({
  servicesManager,
  commandsManager,
  extensionManager
}) => {
  const {
    viewportGridService,
    uiNotificationService,
    displaySetService,
    hangingProtocolService,
    toolGroupService,
    cornerstoneViewportService,
    segmentationService
  } = servicesManager.services;
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  const {
    getEnabledElement
  } = utilityModule.exports;
  function _getActiveViewportsEnabledElement() {
    const {
      activeViewportId
    } = viewportGridService.getState();
    const {
      element
    } = getEnabledElement(activeViewportId) || {};
    const enabledElement = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.getEnabledElement(element);
    return enabledElement;
  }
  function _getAnnotationsSelectedByToolNames(toolNames) {
    return toolNames.reduce((allAnnotationUIDs, toolName) => {
      const annotationUIDs = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.selection.getAnnotationsSelectedByToolName(toolName);
      return allAnnotationUIDs.concat(annotationUIDs);
    }, []);
  }
  const actions = {
    getMatchingPTDisplaySet: ({
      viewportMatchDetails
    }) => {
      // Todo: this is assuming that the hanging protocol has successfully matched
      // the correct PT. For future, we should have a way to filter out the PTs
      // that are in the viewer layout (but then we have the problem of the attenuation
      // corrected PT vs the non-attenuation correct PT)

      let ptDisplaySet = null;
      for (const [, viewportDetails] of viewportMatchDetails) {
        const {
          displaySetsInfo
        } = viewportDetails;
        const displaySets = displaySetsInfo.map(({
          displaySetInstanceUID
        }) => displaySetService.getDisplaySetByUID(displaySetInstanceUID));
        if (!displaySets || displaySets.length === 0) {
          continue;
        }
        ptDisplaySet = displaySets.find(displaySet => displaySet.Modality === 'PT');
        if (ptDisplaySet) {
          break;
        }
      }
      return ptDisplaySet;
    },
    getPTMetadata: ({
      ptDisplaySet
    }) => {
      const dataSource = extensionManager.getDataSources()[0];
      const imageIds = dataSource.getImageIdsForDisplaySet(ptDisplaySet);
      const firstImageId = imageIds[0];
      const instance = metadataProvider.get('instance', firstImageId);
      if (instance.Modality !== 'PT') {
        return;
      }
      const metadata = {
        SeriesTime: instance.SeriesTime,
        Modality: instance.Modality,
        PatientSex: instance.PatientSex,
        PatientWeight: instance.PatientWeight,
        RadiopharmaceuticalInformationSequence: {
          RadionuclideTotalDose: instance.RadiopharmaceuticalInformationSequence[0].RadionuclideTotalDose,
          RadionuclideHalfLife: instance.RadiopharmaceuticalInformationSequence[0].RadionuclideHalfLife,
          RadiopharmaceuticalStartTime: instance.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartTime,
          RadiopharmaceuticalStartDateTime: instance.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartDateTime
        }
      };
      return metadata;
    },
    createNewLabelmapFromPT: async ({
      label
    }) => {
      // Create a segmentation of the same resolution as the source data
      // using volumeLoader.createAndCacheDerivedVolume.

      const {
        viewportMatchDetails
      } = hangingProtocolService.getMatchDetails();
      const ptDisplaySet = actions.getMatchingPTDisplaySet({
        viewportMatchDetails
      });
      let withPTViewportId = null;
      for (const [viewportId, {
        displaySetsInfo
      }] of viewportMatchDetails.entries()) {
        const isPT = displaySetsInfo.some(({
          displaySetInstanceUID
        }) => displaySetInstanceUID === ptDisplaySet.displaySetInstanceUID);
        if (isPT) {
          withPTViewportId = viewportId;
          break;
        }
      }
      if (!ptDisplaySet) {
        uiNotificationService.error('No matching PT display set found');
        return;
      }
      const currentSegmentations = segmentationService.getSegmentationRepresentations(withPTViewportId);
      const displaySet = displaySetService.getDisplaySetByUID(ptDisplaySet.displaySetInstanceUID);
      const segmentationId = await segmentationService.createLabelmapForDisplaySet(displaySet, {
        label: `Segmentation ${currentSegmentations.length + 1}`,
        segments: {
          1: {
            label: `${_ohif_i18n__WEBPACK_IMPORTED_MODULE_3__["default"].t('Segment')} 1`,
            active: true
          }
        }
      });
      segmentationService.addSegmentationRepresentation(withPTViewportId, {
        segmentationId
      });
      return segmentationId;
    },
    thresholdSegmentationByRectangleROITool: ({
      segmentationId,
      config,
      segmentIndex
    }) => {
      const segmentation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.segmentation.state.getSegmentation(segmentationId);
      const {
        representationData
      } = segmentation;
      const {
        displaySetMatchDetails: matchDetails
      } = hangingProtocolService.getMatchDetails();
      const ctDisplaySetMatch = matchDetails.get('ctDisplaySet');
      const ptDisplaySetMatch = matchDetails.get('ptDisplaySet');
      const ctDisplaySet = displaySetService.getDisplaySetByUID(ctDisplaySetMatch.displaySetInstanceUID);
      const ptDisplaySet = displaySetService.getDisplaySetByUID(ptDisplaySetMatch.displaySetInstanceUID);
      const {
        volumeId: segVolumeId
      } = representationData[SegmentationRepresentations.Labelmap];
      const labelmapVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(segVolumeId);
      const annotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      if (annotationUIDs.length === 0) {
        uiNotificationService.show({
          title: 'Commands Module',
          message: 'No ROIThreshold Tool is Selected',
          type: 'error'
        });
        return;
      }
      const {
        ptLower,
        ptUpper,
        ctLower,
        ctUpper
      } = (0,_utils_getThresholdValue__WEBPACK_IMPORTED_MODULE_4__["default"])(annotationUIDs, ptDisplaySet, config);
      const {
        imageIds: ptImageIds
      } = ptDisplaySet;
      const ptVolumeInfo = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolumeContainingImageId(ptImageIds[0]);
      if (!ptVolumeInfo) {
        uiNotificationService.error('No PT volume found');
        return;
      }
      const {
        imageIds: ctImageIds
      } = ctDisplaySet;
      const ctVolumeInfo = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolumeContainingImageId(ctImageIds[0]);
      if (!ctVolumeInfo) {
        uiNotificationService.error('No CT volume found');
        return;
      }
      const ptVolume = ptVolumeInfo.volume;
      const ctVolume = ctVolumeInfo.volume;
      return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.segmentation.rectangleROIThresholdVolumeByRange(annotationUIDs, labelmapVolume, [{
        volume: ptVolume,
        lower: ptLower,
        upper: ptUpper
      }, {
        volume: ctVolume,
        lower: ctLower,
        upper: ctUpper
      }], {
        overwrite: true,
        segmentIndex,
        segmentationId
      });
    },
    calculateTMTV: async ({
      segmentations
    }) => {
      const segmentationIds = segmentations.map(segmentation => segmentation.segmentationId);
      const stats = await _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.segmentation.computeMetabolicStats({
        segmentationIds,
        segmentIndex: 1
      });
      segmentationService.setSegmentationGroupStats(segmentationIds, stats);
      return stats;
    },
    exportTMTVReportCSV: async ({
      segmentations,
      tmtv,
      config,
      options
    }) => {
      const segReport = commandsManager.runCommand('getSegmentationCSVReport', {
        segmentations
      });
      let total_tlg = 0;
      for (const segmentationId in segReport) {
        const report = segReport[segmentationId];
        const tlg = report['namedStats_lesionGlycolysis'];
        total_tlg += tlg.value;
      }
      const additionalReportRows = [{
        key: 'Total Lesion Glycolysis',
        value: {
          tlg: total_tlg.toFixed(4)
        }
      }, {
        key: 'Threshold Configuration',
        value: {
          ...config
        }
      }];
      if (tmtv !== undefined) {
        additionalReportRows.unshift({
          key: 'Total Metabolic Tumor Volume',
          value: {
            tmtv
          }
        });
      }
      (0,_utils_createAndDownloadTMTVReport__WEBPACK_IMPORTED_MODULE_5__["default"])(segReport, additionalReportRows, options);
    },
    setStartSliceForROIThresholdTool: () => {
      const {
        viewport
      } = _getActiveViewportsEnabledElement();
      const {
        focalPoint
      } = viewport.getCamera();
      const selectedAnnotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotationUID = selectedAnnotationUIDs[0];
      const annotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(annotationUID);

      // set the current focal point
      annotation.data.startCoordinate = focalPoint;
      // IMPORTANT: invalidate the toolData for the cached stat to get updated
      // and re-calculate the projection points
      annotation.invalidated = true;
      viewport.render();
    },
    setEndSliceForROIThresholdTool: () => {
      const {
        viewport
      } = _getActiveViewportsEnabledElement();
      const selectedAnnotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotationUID = selectedAnnotationUIDs[0];
      const annotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(annotationUID);

      // get the current focal point
      const focalPointToEnd = viewport.getCamera().focalPoint;
      annotation.data.endCoordinate = focalPointToEnd;

      // IMPORTANT: invalidate the toolData for the cached stat to get updated
      // and re-calculate the projection points
      annotation.invalidated = true;
      viewport.render();
    },
    createTMTVRTReport: () => {
      // get all Rectangle ROI annotation
      const stateManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotationManager();
      const annotations = [];
      Object.keys(stateManager.annotations).forEach(frameOfReferenceUID => {
        const forAnnotations = stateManager.annotations[frameOfReferenceUID];
        const ROIAnnotations = ROI_THRESHOLD_MANUAL_TOOL_IDS.reduce((annotations, toolName) => [...annotations, ...(forAnnotations[toolName] ?? [])], []);
        annotations.push(...ROIAnnotations);
      });
      commandsManager.runCommand('exportRTReportForAnnotations', {
        annotations
      });
    },
    getSegmentationCSVReport: ({
      segmentations
    }) => {
      if (!segmentations || !segmentations.length) {
        segmentations = segmentationService.getSegmentations();
      }
      const report = {};
      for (const segmentation of segmentations) {
        const {
          label,
          segmentationId,
          representationData
        } = segmentation;
        const id = segmentationId;
        const segReport = {
          id,
          label
        };
        if (!representationData) {
          report[id] = segReport;
          continue;
        }
        const {
          cachedStats
        } = segmentation.segments[1] || {}; // Assuming we want stats from the first segment

        if (cachedStats) {
          Object.entries(cachedStats).forEach(([key, value]) => {
            if (typeof value !== 'object') {
              segReport[key] = value;
            } else {
              Object.entries(value).forEach(([subKey, subValue]) => {
                const newKey = `${key}_${subKey}`;
                segReport[newKey] = subValue;
              });
            }
          });
        }
        const labelmapVolume = segmentation.representationData[SegmentationRepresentations.Labelmap];
        if (!labelmapVolume) {
          report[id] = segReport;
          continue;
        }
        const referencedVolume = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.segmentation.getReferenceVolumeForSegmentationVolume(segmentationId);
        if (!referencedVolume) {
          report[id] = segReport;
          continue;
        }
        if (!referencedVolume.imageIds || !referencedVolume.imageIds.length) {
          report[id] = segReport;
          continue;
        }
        const firstImageId = referencedVolume.imageIds[0];
        const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider.get('instance', firstImageId);
        if (!instance) {
          report[id] = segReport;
          continue;
        }
        report[id] = {
          ...segReport,
          PatientID: instance.PatientID ?? '000000',
          PatientName: formatPN(instance.PatientName),
          StudyInstanceUID: instance.StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          StudyDate: instance.StudyDate
        };
      }
      return report;
    },
    exportRTReportForAnnotations: ({
      annotations
    }) => {
      (0,_utils_dicomRTAnnotationExport_RTStructureSet__WEBPACK_IMPORTED_MODULE_6__["default"])(annotations);
    },
    setFusionPTColormap: ({
      toolGroupId,
      colormap
    }) => {
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      if (!toolGroup) {
        return;
      }
      const {
        viewportMatchDetails
      } = hangingProtocolService.getMatchDetails();
      const ptDisplaySet = actions.getMatchingPTDisplaySet({
        viewportMatchDetails
      });
      if (!ptDisplaySet) {
        return;
      }
      const fusionViewportIds = toolGroup.getViewportIds();
      const viewports = [];
      fusionViewportIds.forEach(viewportId => {
        commandsManager.runCommand('setViewportColormap', {
          viewportId,
          displaySetInstanceUID: ptDisplaySet.displaySetInstanceUID,
          colormap: {
            name: colormap
          }
        });
        viewports.push(cornerstoneViewportService.getCornerstoneViewport(viewportId));
      });
      viewports.forEach(viewport => {
        viewport.render();
      });
    }
  };
  const definitions = {
    setEndSliceForROIThresholdTool: {
      commandFn: actions.setEndSliceForROIThresholdTool
    },
    setStartSliceForROIThresholdTool: {
      commandFn: actions.setStartSliceForROIThresholdTool
    },
    getMatchingPTDisplaySet: {
      commandFn: actions.getMatchingPTDisplaySet
    },
    getPTMetadata: {
      commandFn: actions.getPTMetadata
    },
    createNewLabelmapFromPT: {
      commandFn: actions.createNewLabelmapFromPT
    },
    thresholdSegmentationByRectangleROITool: {
      commandFn: actions.thresholdSegmentationByRectangleROITool
    },
    calculateTMTV: {
      commandFn: actions.calculateTMTV
    },
    exportTMTVReportCSV: {
      commandFn: actions.exportTMTVReportCSV
    },
    createTMTVRTReport: {
      commandFn: actions.createTMTVRTReport
    },
    getSegmentationCSVReport: {
      commandFn: actions.getSegmentationCSVReport
    },
    exportRTReportForAnnotations: {
      commandFn: actions.exportRTReportForAnnotations
    },
    setFusionPTColormap: {
      commandFn: actions.setFusionPTColormap
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'TMTV:CORNERSTONE'
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commandsModule);

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

/***/ "../../../extensions/tmtv/src/getHangingProtocolModule.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/tmtv/src/getHangingProtocolModule.ts ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/hpViewports */ "../../../extensions/tmtv/src/utils/hpViewports.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * represents a 3x4 viewport layout configuration. The layout displays CT axial, sagittal, and coronal
 * images in the first row, PT axial, sagittal, and coronal images in the second row, and fusion axial,
 * sagittal, and coronal images in the third row. The fourth column is fully spanned by a MIP sagittal
 * image, covering all three rows. It has synchronizers for windowLevel for all CT and PT images, and
 * also camera synchronizer for each orientation
 */
const stage1 = {
  name: 'default',
  id: 'default',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 3,
      columns: 4,
      layoutOptions: [{
        x: 0,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 0,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 0,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 3 / 4,
        y: 0,
        width: 1 / 4,
        height: 1
      }]
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.mipSAGITTAL],
  createdDate: '2021-02-23T18:32:42.850Z'
};

/**
 * The layout displays CT axial image in the top-left viewport, fusion axial image
 * in the top-right viewport, PT axial image in the bottom-left viewport, and MIP
 * sagittal image in the bottom-right viewport. The layout follows a simple grid
 * pattern with 2 rows and 2 columns. It includes synchronizers as well.
 */
const stage2 = {
  name: 'Fusion 2x2',
  id: 'Fusion-2x2',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 2
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.mipSAGITTAL]
};

/**
 * The top row displays CT images in axial, sagittal, and coronal orientations from
 * left to right, respectively. The bottom row displays PT images in axial, sagittal,
 * and coronal orientations from left to right, respectively.
 * The layout follows a simple grid pattern with 2 rows and 3 columns.
 * It includes synchronizers as well.
 */
const stage3 = {
  name: '2x3-layout',
  id: '2x3-layout',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 3
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptCORONAL]
};

/**
 * In this layout, the top row displays PT images in coronal, sagittal, and axial
 * orientations from left to right, respectively, followed by a MIP sagittal image
 * that spans both rows on the rightmost side. The bottom row displays fusion images
 * in coronal, sagittal, and axial orientations from left to right, respectively.
 * There is no viewport in the bottom row's rightmost position, as the MIP sagittal viewport
 * from the top row spans the full height of both rows.
 * It includes synchronizers as well.
 */
const stage4 = {
  name: '2x4-layout',
  id: '2x4-layout',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 4,
      layoutOptions: [{
        x: 0,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 1 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 2 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 3 / 4,
        y: 0,
        width: 1 / 4,
        height: 1
      }, {
        x: 0,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 1 / 4,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 2 / 4,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }]
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.mipSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionAXIAL]
};

/**
 * This layout displays three fusion viewports: axial, sagittal, and coronal.
 * It follows a simple grid pattern with 1 row and 3 columns.
 */
// const stage0: AppTypes.HangingProtocol.ProtocolStage = {
//   name: 'Fusion 1x3',
//   viewportStructure: {
//     layoutType: 'grid',
//     properties: {
//       rows: 1,
//       columns: 3,
//     },
//   },
//   viewports: [fusionAXIAL, fusionSAGITTAL, fusionCORONAL],
// };

const ptCT = {
  id: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  locked: true,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  imageLoadStrategy: 'interleaveTopToBottom',
  // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [{
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: ['CT', 'PT']
    }
  }, {
    attribute: 'StudyDescription',
    constraint: {
      contains: 'PETCT'
    }
  }, {
    attribute: 'StudyDescription',
    constraint: {
      contains: 'PET/CT'
    }
  }],
  displaySetSelectors: {
    ctDisplaySet: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: {
            value: 'CT'
          }
        },
        required: true
      }, {
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'CT'
        }
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'CT WB'
        }
      }]
    },
    ptDisplaySet: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'PT'
        },
        required: true
      }, {
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'Corrected'
        }
      }, {
        weight: 2,
        attribute: 'SeriesDescription',
        constraint: {
          doesNotContain: {
            value: 'Uncorrected'
          }
        }
      }]
    }
  },
  stages: [stage1, stage2, stage3, stage4],
  numberOfPriorsReferenced: -1
};
function getHangingProtocolModule() {
  return [{
    name: ptCT.id,
    protocol: ptCT
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getHangingProtocolModule);

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

/***/ "../../../extensions/tmtv/src/getPanelModule.tsx":
/*!*******************************************************!*\
  !*** ../../../extensions/tmtv/src/getPanelModule.tsx ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels */ "../../../extensions/tmtv/src/Panels/index.tsx");
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _Panels_PanelTMTV__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Panels/PanelTMTV */ "../../../extensions/tmtv/src/Panels/PanelTMTV.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  const {
    toolbarService
  } = servicesManager.services;
  const wrappedPanelPetSuv = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.PanelPetSUV, null);
  };
  const wrappedROIThresholdToolbox = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_default__WEBPACK_IMPORTED_MODULE_2__.Toolbox, {
      buttonSectionId: toolbarService.sections.roiThresholdToolbox,
      title: "Threshold Tools"
    });
  };
  const wrappedROIThresholdExport = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.PanelROIThresholdExport, null);
  };
  const wrappedPanelTMTV = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_default__WEBPACK_IMPORTED_MODULE_2__.Toolbox, {
      buttonSectionId: toolbarService.sections.roiThresholdToolbox,
      title: "Threshold Tools"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels_PanelTMTV__WEBPACK_IMPORTED_MODULE_3__["default"], {
      commandsManager: commandsManager,
      servicesManager: servicesManager
    }));
  };
  return [{
    name: 'petSUV',
    iconName: 'tab-patient-info',
    iconLabel: 'Patient Info',
    label: 'Patient Info',
    component: wrappedPanelPetSuv
  }, {
    name: 'tmtv',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    component: wrappedPanelTMTV
  }, {
    name: 'tmtvBox',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation Toolbox',
    component: wrappedROIThresholdToolbox
  }, {
    name: 'tmtvExport',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation Export',
    component: wrappedROIThresholdExport
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

/***/ "../../../extensions/tmtv/src/getToolbarModule.tsx":
/*!*********************************************************!*\
  !*** ../../../extensions/tmtv/src/getToolbarModule.tsx ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getToolbarModule)
/* harmony export */ });
/* harmony import */ var _Panels_RectangleROIOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Panels/RectangleROIOptions */ "../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function getToolbarModule() {
  return [{
    name: 'tmtv.RectangleROIThresholdOptions',
    defaultComponent: _Panels_RectangleROIOptions__WEBPACK_IMPORTED_MODULE_0__["default"]
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

/***/ "../../../extensions/tmtv/src/id.js":
/*!******************************************!*\
  !*** ../../../extensions/tmtv/src/id.js ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/tmtv/package.json");
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

/***/ "../../../extensions/tmtv/src/index.tsx":
/*!**********************************************!*\
  !*** ../../../extensions/tmtv/src/index.tsx ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/tmtv/src/id.js");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/tmtv/src/getHangingProtocolModule.ts");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/tmtv/src/getPanelModule.tsx");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./init */ "../../../extensions/tmtv/src/init.js");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/tmtv/src/commandsModule.ts");
/* harmony import */ var _getToolbarModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getToolbarModule */ "../../../extensions/tmtv/src/getToolbarModule.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








/**
 *
 */
const tmtvExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  preRegistration({
    servicesManager,
    commandsManager,
    extensionManager,
    configuration = {}
  }) {
    (0,_init__WEBPACK_IMPORTED_MODULE_3__["default"])({
      servicesManager,
      commandsManager,
      extensionManager,
      configuration
    });
  },
  getToolbarModule: _getToolbarModule__WEBPACK_IMPORTED_MODULE_5__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  getCommandsModule({
    servicesManager,
    commandsManager,
    extensionManager
  }) {
    return (0,_commandsModule__WEBPACK_IMPORTED_MODULE_4__["default"])({
      servicesManager,
      commandsManager,
      extensionManager
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tmtvExtension);

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

/***/ "../../../extensions/tmtv/src/init.js":
/*!********************************************!*\
  !*** ../../../extensions/tmtv/src/init.js ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _utils_measurementServiceMappings_measurementServiceMappingsFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/measurementServiceMappings/measurementServiceMappingsFactory */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.Enums;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 * @param {Object|Array} configuration.csToolsConfig
 */
function init({
  servicesManager
}) {
  const {
    measurementService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.RectangleROIStartEndThresholdTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CircleROIStartEndThresholdTool);
  const {
    RectangleROIStartEndThreshold,
    CircleROIStartEndThreshold
  } = (0,_utils_measurementServiceMappings_measurementServiceMappingsFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(measurementService, displaySetService, cornerstoneViewportService);
  const csTools3DVer1MeasurementSource = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'RectangleROIStartEndThreshold', RectangleROIStartEndThreshold.matchingCriteria, RectangleROIStartEndThreshold.toAnnotation, RectangleROIStartEndThreshold.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CircleROIStartEndThreshold', CircleROIStartEndThreshold.matchingCriteria, CircleROIStartEndThreshold.toAnnotation, CircleROIStartEndThreshold.toMeasurement);
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

/***/ "../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js":
/*!*************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createAndDownloadTMTVReport)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function createAndDownloadTMTVReport(segReport, additionalReportRows, options = {}) {
  const firstReport = segReport[Object.keys(segReport)[0]];
  const columns = Object.keys(firstReport);
  const csv = [columns.join(',')];
  Object.values(segReport).forEach(segmentation => {
    const row = [];
    columns.forEach(column => {
      // if it is array then we need to replace , with space to avoid csv parsing error
      row.push(Array.isArray(segmentation[column]) ? segmentation[column].join(' ') : segmentation[column]);
    });
    csv.push(row.join(','));
  });
  csv.push('');
  csv.push('');
  csv.push('');
  csv.push(`Patient ID,${firstReport.PatientID}`);
  csv.push(`Study Date,${firstReport.StudyDate}`);
  csv.push('');
  additionalReportRows.forEach(({
    key,
    value: values
  }) => {
    const temp = [];
    temp.push(`${key}`);
    Object.keys(values).forEach(k => {
      temp.push(`${k}`);
      temp.push(`${values[k]}`);
    });
    csv.push(temp.join(','));
  });
  const blob = new Blob([csv.join('\n')], {
    type: 'text/csv;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = options.filename ?? `${firstReport.PatientID}_tmtv.csv`;
  a.click();
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

/***/ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js":
/*!************************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dicomRTAnnotationExport)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const {
  datasetToBlob
} = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data;
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes.MetadataProvider;
function dicomRTAnnotationExport(annotations) {
  const dataset = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__.adaptersRT.Cornerstone3D.RTSS.generateRTSSFromAnnotations(annotations, metadataProvider, _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore);
  const reportBlob = datasetToBlob(dataset);

  //Create a URL for the binary.
  var objectUrl = URL.createObjectURL(reportBlob);
  window.location.assign(objectUrl);
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

/***/ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js":
/*!******************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dicomRTAnnotationExport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dicomRTAnnotationExport */ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_dicomRTAnnotationExport__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/tmtv/src/utils/getThresholdValue.ts":
/*!***************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/getThresholdValue.ts ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function getRoiStats(displaySet, annotations) {
  const {
    imageIds
  } = displaySet;
  const ptVolumeInfo = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolumeContainingImageId(imageIds[0]);
  if (!ptVolumeInfo) {
    throw new Error('No volume found for display set');
  }
  const {
    volume
  } = ptVolumeInfo;
  const {
    voxelManager
  } = volume;

  // Todo: add support for other strategies
  const {
    fn,
    baseValue
  } = _getStrategyFn('max');
  let value = baseValue;
  const boundsIJK = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.rectangleROITool.getBoundsIJKFromRectangleAnnotations(annotations, volume);

  // Use the voxelManager's forEach method to iterate over the bounds
  voxelManager.forEach(({
    value: voxelValue
  }) => {
    value = fn(voxelValue, value);
  }, {
    boundsIJK
  });
  return value;
}
function getThresholdValues(annotationUIDs, ptDisplaySet, config) {
  if (config.strategy === 'range') {
    return {
      ptLower: Number(config.ptLower),
      ptUpper: Number(config.ptUpper),
      ctLower: Number(config.ctLower),
      ctUpper: Number(config.ctUpper)
    };
  }
  const {
    weight
  } = config;
  const annotations = annotationUIDs.map(annotationUID => _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotation(annotationUID));
  const ptValue = getRoiStats(ptDisplaySet, annotations);
  return {
    ctLower: -Infinity,
    ctUpper: +Infinity,
    ptLower: weight * ptValue,
    ptUpper: +Infinity
  };
}
function _getStrategyFn(statistic) {
  const baseValue = -Infinity;
  const fn = (number, maxValue) => {
    if (number > maxValue) {
      maxValue = number;
    }
    return maxValue;
  };
  return {
    fn,
    baseValue
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getThresholdValues);

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

/***/ "../../../extensions/tmtv/src/utils/handleROIThresholding.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/handleROIThresholding.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleROIThresholding: () => (/* binding */ handleROIThresholding)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const handleROIThresholding = async ({
  commandsManager,
  segmentationService
}) => {
  const segmentations = segmentationService.getSegmentations();
  const tmtv = await commandsManager.run('calculateTMTV', {
    segmentations
  });

  // add the tmtv to all the segment cachedStats, although it is a global
  // value but we don't have any other way to display it for now
  // Update all segmentations with the calculated TMTV
  segmentations.forEach(segmentation => {
    segmentation.cachedStats = {
      ...segmentation.cachedStats,
      tmtv
    };
    segmentationService.addOrUpdateSegmentation(segmentation);
  });
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

/***/ "../../../extensions/tmtv/src/utils/hpViewports.ts":
/*!*********************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/hpViewports.ts ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ctAXIAL: () => (/* binding */ ctAXIAL),
/* harmony export */   ctCORONAL: () => (/* binding */ ctCORONAL),
/* harmony export */   ctSAGITTAL: () => (/* binding */ ctSAGITTAL),
/* harmony export */   fusionAXIAL: () => (/* binding */ fusionAXIAL),
/* harmony export */   fusionCORONAL: () => (/* binding */ fusionCORONAL),
/* harmony export */   fusionSAGITTAL: () => (/* binding */ fusionSAGITTAL),
/* harmony export */   mipSAGITTAL: () => (/* binding */ mipSAGITTAL),
/* harmony export */   ptAXIAL: () => (/* binding */ ptAXIAL),
/* harmony export */   ptCORONAL: () => (/* binding */ ptCORONAL),
/* harmony export */   ptSAGITTAL: () => (/* binding */ ptSAGITTAL)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// Common sync group configurations
const cameraPositionSync = id => ({
  type: 'cameraPosition',
  id,
  source: true,
  target: true
});
const hydrateSegSync = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};
const ctAXIAL = {
  viewportOptions: {
    viewportId: 'ctAXIAL',
    viewportType: 'volume',
    orientation: 'axial',
    toolGroupId: 'ctToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ctSAGITTAL = {
  viewportOptions: {
    viewportId: 'ctSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ctCORONAL = {
  viewportOptions: {
    viewportId: 'ctCORONAL',
    viewportType: 'volume',
    orientation: 'coronal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ptAXIAL = {
  viewportOptions: {
    viewportId: 'ptAXIAL',
    viewportType: 'volume',
    background: [1, 1, 1],
    orientation: 'axial',
    toolGroupId: 'ptToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const ptSAGITTAL = {
  viewportOptions: {
    viewportId: 'ptSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const ptCORONAL = {
  viewportOptions: {
    viewportId: 'ptCORONAL',
    viewportType: 'volume',
    orientation: 'coronal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const fusionAXIAL = {
  viewportOptions: {
    viewportId: 'fusionAXIAL',
    viewportType: 'volume',
    orientation: 'axial',
    toolGroupId: 'fusionToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const fusionSAGITTAL = {
  viewportOptions: {
    viewportId: 'fusionSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const fusionCORONAL = {
  viewportOptions: {
    viewportId: 'fusionCoronal',
    viewportType: 'volume',
    orientation: 'coronal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const mipSAGITTAL = {
  viewportOptions: {
    viewportId: 'mipSagittal',
    viewportType: 'volume',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'mipToolGroup',
    syncGroups: [{
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync],
    // Custom props can be used to set custom properties which extensions
    // can react on.
    customViewportProps: {
      // We use viewportDisplay to filter the viewports which are displayed
      // in mip and we set the scrollbar according to their rotation index
      // in the cornerstone extension.
      hideOverlays: true
    }
  },
  displaySets: [{
    options: {
      blendMode: 'MIP',
      slabThickness: 'fullVolume',
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js":
/*!***************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const CircleROIStartEndThreshold = {
  toAnnotation: (measurement, definition) => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.getSOPInstanceAttributes)(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      cachedStats
    } = data;
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      // points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: metadata.label,
      // displayText: displayText,
      data: data.cachedStats,
      type: 'CircleROIStartEndThreshold'
      // getReport,
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircleROIStartEndThreshold);

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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js":
/*!******************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js ***!
  \******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const RectangleROIStartEndThreshold = {
  toAnnotation: (measurement, definition) => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.getSOPInstanceAttributes)(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      // points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: metadata.label,
      data: data.cachedStats,
      type: 'RectangleROIStartEndThreshold'
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RectangleROIStartEndThreshold);

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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['RectangleROIStartEndThreshold', 'CircleROIStartEndThreshold']);

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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js":
/*!**********************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RectangleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RectangleROIStartEndThreshold */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js");
/* harmony import */ var _CircleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleROIStartEndThreshold */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const measurementServiceMappingsFactory = (measurementService, displaySetService, cornerstoneViewportService) => {
  return {
    RectangleROIStartEndThreshold: {
      toAnnotation: _RectangleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_0__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _RectangleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_0__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService),
      matchingCriteria: [{
        valueType: measurementService.VALUE_TYPES.ROI_THRESHOLD_MANUAL
      }]
    },
    CircleROIStartEndThreshold: {
      toAnnotation: _CircleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_1__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _CircleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_1__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService),
      matchingCriteria: [{
        valueType: measurementService.VALUE_TYPES.ROI_THRESHOLD_MANUAL
      }]
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (measurementServiceMappingsFactory);

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

/***/ "../../../extensions/tmtv/package.json":
/*!*********************************************!*\
  !*** ../../../extensions/tmtv/package.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-tmtv","version":"3.11.0-beta.56","description":"OHIF extension for Total Metabolic Tumor Volume","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-tmtv.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/ui":"3.11.0-beta.56","dcmjs":"*","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^18.3.1"},"dependencies":{"@babel/runtime":"^7.20.13","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_tmtv_src_index_tsx.js.map