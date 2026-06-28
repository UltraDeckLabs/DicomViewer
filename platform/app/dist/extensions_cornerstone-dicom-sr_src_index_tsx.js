"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-sr_src_index_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-sr/src/commandsModule.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/commandsModule.ts ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var _utils_getFilteredCornerstoneToolState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getFilteredCornerstoneToolState */ "../../../extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts");
/* harmony import */ var _utils_hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/hydrateStructuredReport */ "../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const {
  MeasurementReport
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersSR.Cornerstone3D;
const {
  log
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__["default"];
/**
 * @param measurementData An array of measurements from the measurements service
 * that you wish to serialize.
 * @param additionalFindingTypes toolTypes that should be stored with labels as Findings
 * @param options Naturalized DICOM JSON headers to merge into the displaySet.
 *
 */
const _generateReport = (measurementData, additionalFindingTypes, options = {}) => {
  const filteredToolState = (0,_utils_getFilteredCornerstoneToolState__WEBPACK_IMPORTED_MODULE_4__["default"])(measurementData, additionalFindingTypes);
  const report = MeasurementReport.generateReport(filteredToolState, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.worldToImageCoords, options);
  const {
    dataset
  } = report;

  // Set the default character set as UTF-8
  // https://dicom.innolitics.com/ciods/nm-image/sop-common/00080005
  if (typeof dataset.SpecificCharacterSet === 'undefined') {
    dataset.SpecificCharacterSet = 'ISO_IR 192';
  }
  dataset.InstanceNumber = options.InstanceNumber ?? 1;
  return dataset;
};
const commandsModule = props => {
  const {
    servicesManager,
    extensionManager,
    commandsManager
  } = props;
  const {
    customizationService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;
  const actions = {
    changeColorMeasurement: ({
      uid
    }) => {
      // When this gets supported, it probably belongs in cornerstone, not sr
      throw new Error('Unsupported operation: changeColorMeasurement');
      // const { color } = measurementService.getMeasurement(uid);
      // const rgbaColor = {
      //   r: color[0],
      //   g: color[1],
      //   b: color[2],
      //   a: color[3] / 255.0,
      // };
      // colorPickerDialog(uiDialogService, rgbaColor, (newRgbaColor, actionId) => {
      //   if (actionId === 'cancel') {
      //     return;
      //   }

      //   const color = [newRgbaColor.r, newRgbaColor.g, newRgbaColor.b, newRgbaColor.a * 255.0];
      // segmentationService.setSegmentColor(viewportId, segmentationId, segmentIndex, color);
      // });
    },
    /**
     *
     * @param measurementData An array of measurements from the measurements service
     * @param additionalFindingTypes toolTypes that should be stored with labels as Findings
     * @param options Naturalized DICOM JSON headers to merge into the displaySet.
     * as opposed to Finding Sites.
     * that you wish to serialize.
     */
    downloadReport: ({
      measurementData,
      additionalFindingTypes,
      options = {}
    }) => {
      const srDataset = _generateReport(measurementData, additionalFindingTypes, options);
      const reportBlob = dcmjs__WEBPACK_IMPORTED_MODULE_2__["default"].data.datasetToBlob(srDataset);

      //Create a URL for the binary.
      const objectUrl = URL.createObjectURL(reportBlob);
      window.location.assign(objectUrl);
    },
    /**
     *
     * @param measurementData An array of measurements from the measurements service
     * that you wish to serialize.
     * @param dataSource The dataSource that you wish to use to persist the data.
     * @param additionalFindingTypes toolTypes that should be stored with labels as Findings
     * @param options Naturalized DICOM JSON headers to merge into the displaySet.
     * @return The naturalized report
     */
    storeMeasurements: async ({
      measurementData,
      dataSource,
      additionalFindingTypes,
      options = {}
    }) => {
      // Use the @cornerstonejs adapter for converting to/from DICOM
      // But it is good enough for now whilst we only have cornerstone as a datasource.
      log.info('[DICOMSR] storeMeasurements');
      if (!dataSource || !dataSource.store || !dataSource.store.dicom) {
        log.error('[DICOMSR] datasource has no dataSource.store.dicom endpoint!');
        return Promise.reject({});
      }
      try {
        const naturalizedReport = _generateReport(measurementData, additionalFindingTypes, options);
        const {
          StudyInstanceUID,
          ContentSequence
        } = naturalizedReport;
        // The content sequence has 5 or more elements, of which
        // the `[4]` element contains the annotation data, so this is
        // checking that there is some annotation data present.
        if (!ContentSequence?.[4].ContentSequence?.length) {
          console.log('naturalizedReport missing imaging content', naturalizedReport);
          throw new Error('Invalid report, no content');
        }
        const onBeforeDicomStore = customizationService.getCustomization('onBeforeDicomStore');
        let dicomDict;
        if (typeof onBeforeDicomStore === 'function') {
          dicomDict = onBeforeDicomStore({
            dicomDict,
            measurementData,
            naturalizedReport
          });
        }
        await dataSource.store.dicom(naturalizedReport, null, dicomDict);
        if (StudyInstanceUID) {
          dataSource.deleteStudyMetadataPromise(StudyInstanceUID);
        }

        // The "Mode" route listens for DicomMetadataStore changes
        // When a new instance is added, it listens and
        // automatically calls makeDisplaySets
        _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances([naturalizedReport], true);
        return naturalizedReport;
      } catch (error) {
        console.warn(error);
        log.error(`[DICOMSR] Error while saving the measurements: ${error.message}`);
        throw new Error(error.message || 'Error while saving the measurements.');
      }
    },
    /**
     * Loads measurements by hydrating and loading the SR for the given display set instance UID
     * and displays it in the active viewport.
     */
    hydrateStructuredReport: ({
      displaySetInstanceUID
    }) => {
      return (0,_utils_hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_5__["default"])({
        servicesManager,
        extensionManager,
        commandsManager
      }, displaySetInstanceUID);
    }
  };
  const definitions = {
    downloadReport: actions.downloadReport,
    storeMeasurements: actions.storeMeasurements,
    hydrateStructuredReport: actions.hydrateStructuredReport
  };
  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE_STRUCTURED_REPORT'
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/enums.ts":
/*!*************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/enums.ts ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeNameCodeSequenceValues: () => (/* binding */ CodeNameCodeSequenceValues),
/* harmony export */   CodingSchemeDesignators: () => (/* binding */ CodingSchemeDesignators),
/* harmony export */   RelationshipType: () => (/* binding */ RelationshipType),
/* harmony export */   SCOORDTypes: () => (/* binding */ SCOORDTypes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const {
  CodeScheme: Cornerstone3DCodeScheme
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__.adaptersSR.Cornerstone3D;
const SCOORDTypes = {
  POINT: 'POINT',
  MULTIPOINT: 'MULTIPOINT',
  POLYLINE: 'POLYLINE',
  CIRCLE: 'CIRCLE',
  ELLIPSE: 'ELLIPSE'
};
const CodeNameCodeSequenceValues = {
  ImagingMeasurementReport: '126000',
  ImageLibrary: '111028',
  ImagingMeasurements: '126010',
  MeasurementGroup: '125007',
  ImageLibraryGroup: '126200',
  TrackingUniqueIdentifier: '112040',
  TrackingIdentifier: '112039',
  Finding: '121071',
  FindingSite: 'G-C0E3',
  // SRT
  FindingSiteSCT: '363698007' // SCT
};
const CodingSchemeDesignators = {
  SRT: 'SRT',
  SCT: 'SCT',
  CornerstoneCodeSchemes: [Cornerstone3DCodeScheme.CodingSchemeDesignator, 'CST4']
};
const RelationshipType = {
  INFERRED_FROM: 'INFERRED FROM',
  CONTAINS: 'CONTAINS'
};
const enums = {
  CodeNameCodeSequenceValues,
  CodingSchemeDesignators,
  RelationshipType,
  SCOORDTypes
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enums);

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   srProtocol: () => (/* binding */ srProtocol)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const srProtocol = {
  id: '@ohif/sr',
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  name: 'SR Key Images',
  // Just apply this one when specifically listed
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'srDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    srDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'SR'
        }
      }]
    }
  },
  stages: [{
    name: 'SR Key Images',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'srDisplaySetId'
      }]
    }]
  }]
};
function getHangingProtocolModule() {
  return [{
    name: srProtocol.id,
    protocol: srProtocol
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var _utils_addSRAnnotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/addSRAnnotation */ "../../../extensions/cornerstone-dicom-sr/src/utils/addSRAnnotation.ts");
/* harmony import */ var _utils_isRehydratable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/isRehydratable */ "../../../extensions/cornerstone-dicom-sr/src/utils/isRehydratable.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-sr/src/id.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums */ "../../../extensions/cornerstone-dicom-sr/src/enums.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");









const {
  sopClassDictionary
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
const {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__.Enums;
const {
  ImageSet,
  MetadataProvider: metadataProvider
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes;
const {
  CodeScheme: Cornerstone3DCodeScheme
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersSR.Cornerstone3D;
/**
 * TODO
 * - [ ] Add SR thumbnail
 * - [ ] Make viewport
 * - [ ] Get stacks from referenced displayInstanceUID and load into wrapped CornerStone viewport
 */

const sopClassUids = [sopClassDictionary.BasicTextSR, sopClassDictionary.EnhancedSR, sopClassDictionary.ComprehensiveSR];
const validateSameStudyUID = (uid, instances) => {
  instances.forEach(it => {
    if (it.StudyInstanceUID !== uid) {
      console.warn('Not all instances have the same UID', uid, it);
      throw new Error(`Instances ${it.SOPInstanceUID} does not belong to ${uid}`);
    }
  });
};

/**
 * Adds instances to the DICOM SR series, rather than creating a new
 * series, so that as SR's are saved, they append to the series, and the
 * key image display set gets updated as well, containing just the new series.
 * @param instances is a list of instances from THIS series that are not
 *     in this DICOM SR Display Set already.
 */
function addInstances(instances, displaySetService) {
  this.instances.push(...instances);
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.sortStudyInstances(this.instances);
  // The last instance is the newest one, so is the one most interesting.
  // Eventually, the SR viewer should have the ability to choose which SR
  // gets loaded, and to navigate among them.
  this.instance = this.instances[this.instances.length - 1];
  this.isLoaded = false;
  return this;
}

/**
 * DICOM SR SOP Class Handler
 * For all referenced images in the TID 1500/300 sections, add an image to the
 * display.
 * @param instances is a set of instances all from the same series
 * @param servicesManager is the services that can be used for creating
 * @returns The list of display sets created for the given instances object
 */
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.sortStudyInstances(instances);
  // The last instance is the newest one, so is the one most interesting.
  // Eventually, the SR viewer should have the ability to choose which SR
  // gets loaded, and to navigate among them.
  const instance = instances[instances.length - 1];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SeriesTime,
    ConceptNameCodeSequence,
    SOPClassUID
  } = instance;
  validateSameStudyUID(instance.StudyInstanceUID, instances);
  const is3DSR = SOPClassUID === sopClassDictionary.Comprehensive3DSR;
  const isImagingMeasurementReport = ConceptNameCodeSequence?.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.ImagingMeasurementReport;
  const displaySet = {
    Modality: 'SR',
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SeriesTime,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: is3DSR ? _id__WEBPACK_IMPORTED_MODULE_6__.SOPClassHandlerId3D : _id__WEBPACK_IMPORTED_MODULE_6__.SOPClassHandlerId,
    SOPClassUID,
    instances,
    referencedImages: null,
    measurements: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    isImagingMeasurementReport,
    sopClassUids,
    instance,
    addInstances,
    label: SeriesDescription || `${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SR')}`
  };
  displaySet.load = () => _load(displaySet, servicesManager, extensionManager);
  return [displaySet];
}

/**
 * Loads the display set with the given services and extension manager.
 * @param srDisplaySet - The display set to load.
 * @param servicesManager - The services manager containing displaySetService and measurementService.
 * @param extensionManager - The extension manager containing data sources.
 */
async function _load(srDisplaySet, servicesManager, extensionManager) {
  const {
    displaySetService,
    measurementService
  } = servicesManager.services;
  const dataSources = extensionManager.getDataSources();
  const dataSource = dataSources[0];
  const {
    ContentSequence
  } = srDisplaySet.instance;
  async function retrieveBulkData(obj, parentObj = null, key = null) {
    for (const prop in obj) {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        await retrieveBulkData(obj[prop], obj, prop);
      } else if (Array.isArray(obj[prop])) {
        await Promise.all(obj[prop].map(item => retrieveBulkData(item, obj, prop)));
      } else if (prop === 'BulkDataURI') {
        const value = await dataSource.retrieve.bulkDataURI({
          BulkDataURI: obj[prop],
          StudyInstanceUID: srDisplaySet.instance.StudyInstanceUID,
          SeriesInstanceUID: srDisplaySet.instance.SeriesInstanceUID,
          SOPInstanceUID: srDisplaySet.instance.SOPInstanceUID
        });
        if (parentObj && key) {
          parentObj[key] = new Float32Array(value);
        }
      }
    }
  }
  if (srDisplaySet.isLoaded !== true) {
    await retrieveBulkData(ContentSequence);
  }
  if (srDisplaySet.isImagingMeasurementReport) {
    srDisplaySet.referencedImages = _getReferencedImagesList(ContentSequence);
    srDisplaySet.measurements = _getMeasurements(ContentSequence);
  } else {
    srDisplaySet.referencedImages = [];
    srDisplaySet.measurements = [];
  }
  const mappings = measurementService.getSourceMappings(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  srDisplaySet.isHydrated = false;
  srDisplaySet.isRehydratable = (0,_utils_isRehydratable__WEBPACK_IMPORTED_MODULE_5__["default"])(srDisplaySet, mappings);
  srDisplaySet.isLoaded = true;

  /** Check currently added displaySets and add measurements if the sources exist */
  displaySetService.activeDisplaySets.forEach(activeDisplaySet => {
    _checkIfCanAddMeasurementsToDisplaySet(srDisplaySet, activeDisplaySet, dataSource, servicesManager);
  });

  /** Subscribe to new displaySets as the source may come in after */
  displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
    const {
      displaySetsAdded
    } = data;
    /**
     * If there are still some measurements that have not yet been loaded into cornerstone,
     * See if we can load them onto any of the new displaySets.
     */
    displaySetsAdded.forEach(newDisplaySet => {
      _checkIfCanAddMeasurementsToDisplaySet(srDisplaySet, newDisplaySet, dataSource, servicesManager);
    });
  });
}

/**
 * Checks if measurements can be added to a display set.
 *
 * @param srDisplaySet - The source display set containing measurements.
 * @param newDisplaySet - The new display set to check if measurements can be added.
 * @param dataSource - The data source used to retrieve image IDs.
 * @param servicesManager - The services manager.
 */
function _checkIfCanAddMeasurementsToDisplaySet(srDisplaySet, newDisplaySet, dataSource, servicesManager) {
  const {
    customizationService
  } = servicesManager.services;
  const unloadedMeasurements = srDisplaySet.measurements.filter(measurement => measurement.loaded === false);
  if (unloadedMeasurements.length === 0 || !(newDisplaySet instanceof ImageSet) || newDisplaySet.unsupported) {
    return;
  }

  // const { sopClassUids } = newDisplaySet;
  // Create a Set for faster lookups
  // const sopClassUidSet = new Set(sopClassUids);

  // Create a Map to efficiently look up ImageIds by SOPInstanceUID and frame number
  const imageIdMap = new Map();
  const imageIds = dataSource.getImageIdsForDisplaySet(newDisplaySet);
  for (const imageId of imageIds) {
    const {
      SOPInstanceUID,
      frameNumber
    } = metadataProvider.getUIDsFromImageID(imageId);
    const key = `${SOPInstanceUID}:${frameNumber || 1}`;
    imageIdMap.set(key, imageId);
  }
  if (!unloadedMeasurements?.length) {
    return;
  }
  const is3DSR = srDisplaySet.SOPClassUID === sopClassDictionary.Comprehensive3DSR;
  for (let j = unloadedMeasurements.length - 1; j >= 0; j--) {
    let measurement = unloadedMeasurements[j];
    const onBeforeSRAddMeasurement = customizationService.getCustomization('onBeforeSRAddMeasurement');
    if (typeof onBeforeSRAddMeasurement === 'function') {
      measurement = onBeforeSRAddMeasurement({
        measurement,
        StudyInstanceUID: srDisplaySet.StudyInstanceUID,
        SeriesInstanceUID: srDisplaySet.SeriesInstanceUID
      });
    }

    // if it is 3d SR we can just add the SR annotation
    if (is3DSR) {
      (0,_utils_addSRAnnotation__WEBPACK_IMPORTED_MODULE_4__["default"])(measurement, null, null);
      measurement.loaded = true;
      continue;
    }
    const referencedSOPSequence = measurement.coords[0].ReferencedSOPSequence;
    if (!referencedSOPSequence) {
      continue;
    }
    const {
      ReferencedSOPInstanceUID
    } = referencedSOPSequence;
    const frame = referencedSOPSequence.ReferencedFrameNumber || 1;
    const key = `${ReferencedSOPInstanceUID}:${frame}`;
    const imageId = imageIdMap.get(key);
    if (imageId && _measurementReferencesSOPInstanceUID(measurement, ReferencedSOPInstanceUID, frame)) {
      (0,_utils_addSRAnnotation__WEBPACK_IMPORTED_MODULE_4__["default"])(measurement, imageId, frame);

      // Update measurement properties
      measurement.loaded = true;
      measurement.imageId = imageId;
      measurement.displaySetInstanceUID = newDisplaySet.displaySetInstanceUID;
      measurement.ReferencedSOPInstanceUID = ReferencedSOPInstanceUID;
      measurement.frameNumber = frame;
      unloadedMeasurements.splice(j, 1);
    }
  }
}

/**
 * Checks if a measurement references a specific SOP Instance UID.
 * @param measurement - The measurement object.
 * @param SOPInstanceUID - The SOP Instance UID to check against.
 * @param frameNumber - The frame number to check against (optional).
 * @returns True if the measurement references the specified SOP Instance UID, false otherwise.
 */
function _measurementReferencesSOPInstanceUID(measurement, SOPInstanceUID, frameNumber) {
  const {
    coords
  } = measurement;

  /**
   * NOTE: The ReferencedFrameNumber can be multiple values according to the DICOM
   * Standard. But for now, we will support only one ReferenceFrameNumber.
   */
  const ReferencedFrameNumber = measurement.coords[0].ReferencedSOPSequence && measurement.coords[0].ReferencedSOPSequence?.ReferencedFrameNumber || 1;
  if (frameNumber && Number(frameNumber) !== Number(ReferencedFrameNumber)) {
    return false;
  }
  for (let j = 0; j < coords.length; j++) {
    const coord = coords[j];
    const {
      ReferencedSOPInstanceUID
    } = coord.ReferencedSOPSequence;
    if (ReferencedSOPInstanceUID === SOPInstanceUID) {
      return true;
    }
  }
  return false;
}

/**
 * Retrieves the SOP class handler module.
 *
 * @param {Object} options - The options for retrieving the SOP class handler module.
 * @param {Object} options.servicesManager - The services manager.
 * @param {Object} options.extensionManager - The extension manager.
 * @returns {Array} An array containing the SOP class handler module.
 */
function getSopClassHandlerModule(params) {
  const {
    servicesManager,
    extensionManager
  } = params;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: _id__WEBPACK_IMPORTED_MODULE_6__.SOPClassHandlerName,
    sopClassUids,
    getDisplaySetsFromSeries
  }, {
    name: _id__WEBPACK_IMPORTED_MODULE_6__.SOPClassHandlerName3D,
    sopClassUids: [sopClassDictionary.Comprehensive3DSR],
    getDisplaySetsFromSeries
  }];
}

/**
 * Retrieves the measurements from the ImagingMeasurementReportContentSequence.
 *
 * @param {Array} ImagingMeasurementReportContentSequence - The ImagingMeasurementReportContentSequence array.
 * @returns {Array} - The array of measurements.
 */
function _getMeasurements(ImagingMeasurementReportContentSequence) {
  const ImagingMeasurements = ImagingMeasurementReportContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.ImagingMeasurements);
  if (!ImagingMeasurements) {
    return [];
  }
  const MeasurementGroups = _getSequenceAsArray(ImagingMeasurements.ContentSequence).filter(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.MeasurementGroup);
  const mergedContentSequencesByTrackingUniqueIdentifiers = _getMergedContentSequencesByTrackingUniqueIdentifiers(MeasurementGroups);
  const measurements = [];
  Object.keys(mergedContentSequencesByTrackingUniqueIdentifiers).forEach(trackingUniqueIdentifier => {
    const mergedContentSequence = mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier];
    const measurement = _processMeasurement(mergedContentSequence);
    if (measurement) {
      measurements.push(measurement);
    }
  });
  return measurements;
}

/**
 * Retrieves merged content sequences by tracking unique identifiers.
 *
 * @param {Array} MeasurementGroups - The measurement groups.
 * @returns {Object} - The merged content sequences by tracking unique identifiers.
 */
function _getMergedContentSequencesByTrackingUniqueIdentifiers(MeasurementGroups) {
  const mergedContentSequencesByTrackingUniqueIdentifiers = {};
  MeasurementGroups.forEach(MeasurementGroup => {
    const ContentSequence = _getSequenceAsArray(MeasurementGroup.ContentSequence);
    const TrackingUniqueIdentifierItem = ContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.TrackingUniqueIdentifier);
    if (!TrackingUniqueIdentifierItem) {
      console.warn('No Tracking Unique Identifier, skipping ambiguous measurement.');
    }
    const trackingUniqueIdentifier = TrackingUniqueIdentifierItem.UID;
    if (mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier] === undefined) {
      // Add the full ContentSequence
      mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier] = [...ContentSequence];
    } else {
      // Add the ContentSequence minus the tracking identifier, as we have this
      // Information in the merged ContentSequence anyway.
      ContentSequence.forEach(item => {
        if (item.ConceptNameCodeSequence.CodeValue !== _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.TrackingUniqueIdentifier) {
          mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier].push(item);
        }
      });
    }
  });
  return mergedContentSequencesByTrackingUniqueIdentifiers;
}

/**
 * Processes the measurement based on the merged content sequence.
 * If the merged content sequence contains SCOORD or SCOORD3D value types,
 * it calls the _processTID1410Measurement function.
 * Otherwise, it calls the _processNonGeometricallyDefinedMeasurement function.
 *
 * @param {Array<Object>} mergedContentSequence - The merged content sequence to process.
 * @returns {any} - The processed measurement result.
 */
function _processMeasurement(mergedContentSequence) {
  if (mergedContentSequence.some(group => group.ValueType === 'SCOORD' || group.ValueType === 'SCOORD3D')) {
    return _processTID1410Measurement(mergedContentSequence);
  }
  return _processNonGeometricallyDefinedMeasurement(mergedContentSequence);
}

/**
 * Processes TID 1410 style measurements from the mergedContentSequence.
 * TID 1410 style measurements have a SCOORD or SCOORD3D at the top level,
 * and non-geometric representations where each NUM has "INFERRED FROM" SCOORD/SCOORD3D.
 *
 * @param mergedContentSequence - The merged content sequence containing the measurements.
 * @returns The measurement object containing the loaded status, labels, coordinates, tracking unique identifier, and tracking identifier.
 */
function _processTID1410Measurement(mergedContentSequence) {
  // Need to deal with TID 1410 style measurements, which will have a SCOORD or SCOORD3D at the top level,
  // And non-geometric representations where each NUM has "INFERRED FROM" SCOORD/SCOORD3D

  const graphicItem = mergedContentSequence.find(group => group.ValueType === 'SCOORD' || group.ValueType === 'SCOORD3D');
  const UIDREFContentItem = mergedContentSequence.find(group => group.ValueType === 'UIDREF');
  const TrackingIdentifierContentItem = mergedContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.TrackingIdentifier);
  if (!graphicItem) {
    console.warn(`graphic ValueType ${graphicItem.ValueType} not currently supported, skipping annotation.`);
    return;
  }
  const NUMContentItems = mergedContentSequence.filter(group => group.ValueType === 'NUM');
  const measurement = {
    loaded: false,
    labels: [],
    coords: [_getCoordsFromSCOORDOrSCOORD3D(graphicItem)],
    TrackingUniqueIdentifier: UIDREFContentItem.UID,
    TrackingIdentifier: TrackingIdentifierContentItem.TextValue
  };
  NUMContentItems.forEach(item => {
    const {
      ConceptNameCodeSequence,
      MeasuredValueSequence
    } = item;
    if (MeasuredValueSequence) {
      measurement.labels.push(_getLabelFromMeasuredValueSequence(ConceptNameCodeSequence, MeasuredValueSequence));
    }
  });
  const findingSites = mergedContentSequence.filter(item => item.ConceptNameCodeSequence.CodingSchemeDesignator === _enums__WEBPACK_IMPORTED_MODULE_7__.CodingSchemeDesignators.SCT && item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.FindingSiteSCT);
  if (findingSites.length) {
    measurement.labels.push({
      label: _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.FindingSiteSCT,
      value: findingSites[0].ConceptCodeSequence.CodeMeaning
    });
  }
  return measurement;
}

/**
 * Processes the non-geometrically defined measurement from the merged content sequence.
 *
 * @param mergedContentSequence The merged content sequence containing the measurement data.
 * @returns The processed measurement object.
 */
function _processNonGeometricallyDefinedMeasurement(mergedContentSequence) {
  const NUMContentItems = mergedContentSequence.filter(group => group.ValueType === 'NUM');
  const UIDREFContentItem = mergedContentSequence.find(group => group.ValueType === 'UIDREF');
  const TrackingIdentifierContentItem = mergedContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.TrackingIdentifier);
  const finding = mergedContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.Finding);
  const findingSites = mergedContentSequence.filter(item => item.ConceptNameCodeSequence.CodingSchemeDesignator === _enums__WEBPACK_IMPORTED_MODULE_7__.CodingSchemeDesignators.SRT && item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.FindingSite);
  const measurement = {
    loaded: false,
    labels: [],
    coords: [],
    TrackingUniqueIdentifier: UIDREFContentItem.UID,
    TrackingIdentifier: TrackingIdentifierContentItem.TextValue
  };
  if (finding && _enums__WEBPACK_IMPORTED_MODULE_7__.CodingSchemeDesignators.CornerstoneCodeSchemes.includes(finding.ConceptCodeSequence.CodingSchemeDesignator) && finding.ConceptCodeSequence.CodeValue === Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT) {
    measurement.labels.push({
      label: Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT,
      value: finding.ConceptCodeSequence.CodeMeaning
    });
  }

  // TODO -> Eventually hopefully support SNOMED or some proper code library, just free text for now.
  if (findingSites.length) {
    const cornerstoneFreeTextFindingSite = findingSites.find(FindingSite => _enums__WEBPACK_IMPORTED_MODULE_7__.CodingSchemeDesignators.CornerstoneCodeSchemes.includes(FindingSite.ConceptCodeSequence.CodingSchemeDesignator) && FindingSite.ConceptCodeSequence.CodeValue === Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT);
    if (cornerstoneFreeTextFindingSite) {
      measurement.labels.push({
        label: Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT,
        value: cornerstoneFreeTextFindingSite.ConceptCodeSequence.CodeMeaning
      });
    }
  }
  NUMContentItems.forEach(item => {
    const {
      ConceptNameCodeSequence,
      ContentSequence,
      MeasuredValueSequence
    } = item;
    const {
      ValueType
    } = ContentSequence;
    if (!ValueType === 'SCOORD') {
      console.warn(`Graphic ${ValueType} not currently supported, skipping annotation.`);
      return;
    }
    const coords = _getCoordsFromSCOORDOrSCOORD3D(ContentSequence);
    if (coords) {
      measurement.coords.push(coords);
    }
    if (MeasuredValueSequence) {
      measurement.labels.push(_getLabelFromMeasuredValueSequence(ConceptNameCodeSequence, MeasuredValueSequence));
    }
  });
  return measurement;
}

/**
 * Extracts coordinates from a graphic item of type SCOORD or SCOORD3D.
 * @param {object} graphicItem - The graphic item containing the coordinates.
 * @returns {object} - The extracted coordinates.
 */
const _getCoordsFromSCOORDOrSCOORD3D = graphicItem => {
  const {
    ValueType,
    GraphicType,
    GraphicData
  } = graphicItem;
  const coords = {
    ValueType,
    GraphicType,
    GraphicData
  };
  coords.ReferencedSOPSequence = graphicItem.ContentSequence?.ReferencedSOPSequence;
  coords.ReferencedFrameOfReferenceSequence = graphicItem.ReferencedFrameOfReferenceUID || graphicItem.ContentSequence?.ReferencedFrameOfReferenceSequence;
  return coords;
};

/**
 * Retrieves the label and value from the provided ConceptNameCodeSequence and MeasuredValueSequence.
 * @param {Object} ConceptNameCodeSequence - The ConceptNameCodeSequence object.
 * @param {Object} MeasuredValueSequence - The MeasuredValueSequence object.
 * @returns {Object} - An object containing the label and value.
 *                    The label represents the CodeMeaning from the ConceptNameCodeSequence.
 *                    The value represents the formatted NumericValue and CodeValue from the MeasuredValueSequence.
 *                    Example: { label: 'Long Axis', value: '31.00 mm' }
 */
function _getLabelFromMeasuredValueSequence(ConceptNameCodeSequence, MeasuredValueSequence) {
  const {
    CodeMeaning
  } = ConceptNameCodeSequence;
  const {
    NumericValue,
    MeasurementUnitsCodeSequence
  } = MeasuredValueSequence;
  const {
    CodeValue
  } = MeasurementUnitsCodeSequence;
  const formatedNumericValue = NumericValue ? Number(NumericValue).toFixed(2) : '';
  return {
    label: CodeMeaning,
    value: `${formatedNumericValue} ${CodeValue}`
  }; // E.g. Long Axis: 31.0 mm
}

/**
 * Retrieves a list of referenced images from the Imaging Measurement Report Content Sequence.
 *
 * @param {Array} ImagingMeasurementReportContentSequence - The Imaging Measurement Report Content Sequence.
 * @returns {Array} - The list of referenced images.
 */
function _getReferencedImagesList(ImagingMeasurementReportContentSequence) {
  const ImageLibrary = ImagingMeasurementReportContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.ImageLibrary);
  if (!ImageLibrary) {
    return [];
  }
  const ImageLibraryGroup = _getSequenceAsArray(ImageLibrary.ContentSequence).find(item => item.ConceptNameCodeSequence.CodeValue === _enums__WEBPACK_IMPORTED_MODULE_7__.CodeNameCodeSequenceValues.ImageLibraryGroup);
  if (!ImageLibraryGroup) {
    return [];
  }
  const referencedImages = [];
  _getSequenceAsArray(ImageLibraryGroup.ContentSequence).forEach(item => {
    const {
      ReferencedSOPSequence
    } = item;
    if (!ReferencedSOPSequence) {
      return;
    }
    for (const ref of _getSequenceAsArray(ReferencedSOPSequence)) {
      if (ref.ReferencedSOPClassUID) {
        const {
          ReferencedSOPClassUID,
          ReferencedSOPInstanceUID
        } = ref;
        referencedImages.push({
          ReferencedSOPClassUID,
          ReferencedSOPInstanceUID
        });
      }
    }
  });
  return referencedImages;
}

/**
 * Converts a DICOM sequence to an array.
 * If the sequence is null or undefined, an empty array is returned.
 * If the sequence is already an array, it is returned as is.
 * Otherwise, the sequence is wrapped in an array and returned.
 *
 * @param {any} sequence - The DICOM sequence to convert.
 * @returns {any[]} - The converted array.
 */
function _getSequenceAsArray(sequence) {
  if (!sequence) {
    return [];
  }
  return Array.isArray(sequence) ? sequence : [sequence];
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/id.js":
/*!**********************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/id.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   SOPClassHandlerId3D: () => (/* binding */ SOPClassHandlerId3D),
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   SOPClassHandlerName3D: () => (/* binding */ SOPClassHandlerName3D),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dicom-sr/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dicom-sr';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;
const SOPClassHandlerName3D = 'dicom-sr-3d';
const SOPClassHandlerId3D = `${id}.sopClassHandlerModule.${SOPClassHandlerName3D}`;


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

/***/ "../../../extensions/cornerstone-dicom-sr/src/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Enums: () => (/* reexport safe */ _enums__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   createReferencedImageDisplaySet: () => (/* reexport safe */ _utils_createReferencedImageDisplaySet__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hydrateStructuredReport: () => (/* reexport safe */ _utils_hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   srProtocol: () => (/* reexport safe */ _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_2__.srProtocol),
/* harmony export */   toolNames: () => (/* reexport safe */ _tools_toolNames__WEBPACK_IMPORTED_MODULE_7__["default"])
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts");
/* harmony import */ var _onModeEnter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onModeEnter */ "../../../extensions/cornerstone-dicom-sr/src/onModeEnter.tsx");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/cornerstone-dicom-sr/src/commandsModule.ts");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./init */ "../../../extensions/cornerstone-dicom-sr/src/init.ts");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./id.js */ "../../../extensions/cornerstone-dicom-sr/src/id.js");
/* harmony import */ var _tools_toolNames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tools/toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* harmony import */ var _utils_hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/hydrateStructuredReport */ "../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.ts");
/* harmony import */ var _utils_createReferencedImageDisplaySet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/createReferencedImageDisplaySet */ "../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./enums */ "../../../extensions/cornerstone-dicom-sr/src/enums.ts");
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
  return __webpack_require__.e(/*! import() */ "extensions_cornerstone-dicom-sr_src_components_OHIFCornerstoneSRViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./components/OHIFCornerstoneSRViewport */ "../../../extensions/cornerstone-dicom-sr/src/components/OHIFCornerstoneSRViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstoneSRViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, props));
};

/**
 *
 */
_c3 = OHIFCornerstoneSRViewport;
const dicomSRExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_6__.id,
  onModeEnter: _onModeEnter__WEBPACK_IMPORTED_MODULE_3__["default"],
  preRegistration: _init__WEBPACK_IMPORTED_MODULE_5__["default"],
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
    const ExtendedOHIFCornerstoneSRViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(OHIFCornerstoneSRViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-sr',
      component: ExtendedOHIFCornerstoneSRViewport
    }];
  },
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  // Include dynamically computed values such as toolNames not known till instantiation
  getUtilityModule({
    servicesManager
  }) {
    return [{
      name: 'tools',
      exports: {
        toolNames: _tools_toolNames__WEBPACK_IMPORTED_MODULE_7__["default"]
      }
    }];
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dicomSRExtension);

// Put static exports here so they can be type checked

var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Component$React.lazy");
__webpack_require__.$Refresh$.register(_c2, "Component");
__webpack_require__.$Refresh$.register(_c3, "OHIFCornerstoneSRViewport");

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/init.ts":
/*!************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/init.ts ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _tools_DICOMSRDisplayTool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/DICOMSRDisplayTool */ "../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts");
/* harmony import */ var _tools_SCOORD3DPointTool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/SCOORD3DPointTool */ "../../../extensions/cornerstone-dicom-sr/src/tools/SCOORD3DPointTool.ts");
/* harmony import */ var _utils_SRSCOOR3DProbeMapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/SRSCOOR3DProbeMapper */ "../../../extensions/cornerstone-dicom-sr/src/utils/SRSCOOR3DProbeMapper.ts");
/* harmony import */ var _utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/addToolInstance */ "../../../extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts");
/* harmony import */ var _tools_toolNames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tools/toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








const {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.Enums;

/**
 * @param {object} configuration
 */
function init({
  configuration = {},
  servicesManager
}) {
  const {
    measurementService,
    cornerstoneViewportService
  } = servicesManager.services;
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].DICOMSRDisplay, _tools_DICOMSRDisplayTool__WEBPACK_IMPORTED_MODULE_2__["default"]);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRLength, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.LengthTool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRBidirectional, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.BidirectionalTool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SREllipticalROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.EllipticalROITool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRCircleROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CircleROITool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRArrowAnnotate, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ArrowAnnotateTool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRAngle, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.AngleTool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRPlanarFreehandROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.PlanarFreehandROITool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRRectangleROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.RectangleROITool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRSCOORD3DPoint, _tools_SCOORD3DPointTool__WEBPACK_IMPORTED_MODULE_3__["default"]);

  // TODO - fix the SR display of Cobb Angle, as it joins the two lines
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_5__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].SRCobbAngle, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CobbAngleTool);
  const csTools3DVer1MeasurementSource = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  const {
    POINT
  } = measurementService.VALUE_TYPES;
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'SRSCOORD3DPoint', POINT, _utils_SRSCOOR3DProbeMapper__WEBPACK_IMPORTED_MODULE_4__["default"].toAnnotation, _utils_SRSCOOR3DProbeMapper__WEBPACK_IMPORTED_MODULE_4__["default"].toMeasurement);

  // Modify annotation tools to use dashed lines on SR
  const dashedLine = {
    lineDash: '4,4'
  };
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.config.style.setToolGroupToolStyles('SRToolGroup', {
    [_tools_toolNames__WEBPACK_IMPORTED_MODULE_6__["default"].DICOMSRDisplay]: dashedLine,
    SRLength: dashedLine,
    SRBidirectional: dashedLine,
    SREllipticalROI: dashedLine,
    SRCircleROI: dashedLine,
    SRArrowAnnotate: dashedLine,
    SRCobbAngle: dashedLine,
    SRAngle: dashedLine,
    SRPlanarFreehandROI: dashedLine,
    SRRectangleROI: dashedLine,
    global: {}
  });
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/onModeEnter.tsx":
/*!********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/onModeEnter.tsx ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onModeEnter)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-sr/src/id.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function onModeEnter({
  servicesManager
}) {
  const {
    displaySetService
  } = servicesManager.services;
  const displaySetCache = displaySetService.getDisplaySetCache();
  const srDisplaySets = [...displaySetCache.values()].filter(ds => ds.SOPClassHandlerId === _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerId || ds.SOPClassHandlerId === _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerId3D);
  srDisplaySets.forEach(ds => {
    // New mode route, allow SRs to be hydrated again
    ds.isHydrated = false;
  });
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DICOMSRDisplayTool)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _modules_dicomSRModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/dicomSRModule */ "../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums */ "../../../extensions/cornerstone-dicom-sr/src/enums.ts");
/* harmony import */ var _toolNames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






class DICOMSRDisplayTool extends _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.AnnotationTool {
  constructor(toolProps = {}, defaultToolProps = {
    configuration: {}
  }) {
    super(toolProps, defaultToolProps);
    // This tool should not inherit from AnnotationTool and we should not need
    // to add the following lines.
    this.isPointNearTool = () => null;
    this.getHandleNearImagePoint = () => null;
    this.renderAnnotation = (enabledElement, svgDrawingHelper) => {
      const {
        viewport
      } = enabledElement;
      const {
        element
      } = viewport;
      let annotations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotations(this.getToolName(), element);

      // Todo: We don't need this anymore, filtering happens in triggerAnnotationRender
      if (!annotations?.length) {
        return;
      }
      annotations = this.filterInteractableAnnotationsForElement(element, annotations);
      if (!annotations?.length) {
        return;
      }
      const trackingUniqueIdentifiersForElement = (0,_modules_dicomSRModule__WEBPACK_IMPORTED_MODULE_2__.getTrackingUniqueIdentifiersForElement)(element);
      const {
        activeIndex,
        trackingUniqueIdentifiers
      } = trackingUniqueIdentifiersForElement;
      const activeTrackingUniqueIdentifier = trackingUniqueIdentifiers[activeIndex];

      // Filter toolData to only render the data for the active SR.
      const filteredAnnotations = annotations.filter(annotation => trackingUniqueIdentifiers.includes(annotation.data?.TrackingUniqueIdentifier));
      if (!viewport._actors?.size) {
        return;
      }
      const styleSpecifier = {
        toolGroupId: this.toolGroupId,
        toolName: this.getToolName(),
        viewportId: enabledElement.viewport.id
      };
      const {
        style: annotationStyle
      } = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.config;
      for (let i = 0; i < filteredAnnotations.length; i++) {
        const annotation = filteredAnnotations[i];
        const annotationUID = annotation.annotationUID;
        const {
          renderableData,
          TrackingUniqueIdentifier
        } = annotation.data;
        const {
          referencedImageId
        } = annotation.metadata;
        styleSpecifier.annotationUID = annotationUID;
        const groupStyle = annotationStyle.getToolGroupToolStyles(this.toolGroupId)[this.getToolName()];
        const lineWidth = this.getStyle('lineWidth', styleSpecifier, annotation);
        const lineDash = this.getStyle('lineDash', styleSpecifier, annotation);
        const color = TrackingUniqueIdentifier === activeTrackingUniqueIdentifier ? 'rgb(0, 255, 0)' : this.getStyle('color', styleSpecifier, annotation);
        const options = {
          color,
          lineDash,
          lineWidth,
          ...groupStyle
        };
        Object.keys(renderableData).forEach(GraphicType => {
          const renderableDataForGraphicType = renderableData[GraphicType];
          let renderMethod;
          let canvasCoordinatesAdapter;
          switch (GraphicType) {
            case _enums__WEBPACK_IMPORTED_MODULE_3__.SCOORDTypes.POINT:
              renderMethod = this.renderPoint;
              break;
            case _enums__WEBPACK_IMPORTED_MODULE_3__.SCOORDTypes.MULTIPOINT:
              renderMethod = this.renderMultipoint;
              break;
            case _enums__WEBPACK_IMPORTED_MODULE_3__.SCOORDTypes.POLYLINE:
              renderMethod = this.renderPolyLine;
              break;
            case _enums__WEBPACK_IMPORTED_MODULE_3__.SCOORDTypes.CIRCLE:
              renderMethod = this.renderEllipse;
              break;
            case _enums__WEBPACK_IMPORTED_MODULE_3__.SCOORDTypes.ELLIPSE:
              renderMethod = this.renderEllipse;
              canvasCoordinatesAdapter = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.math.ellipse.getCanvasEllipseCorners;
              break;
            default:
              throw new Error(`Unsupported GraphicType: ${GraphicType}`);
          }
          const canvasCoordinates = renderMethod(svgDrawingHelper, viewport, renderableDataForGraphicType, annotationUID, referencedImageId, options);
          this.renderTextBox(svgDrawingHelper, viewport, canvasCoordinates, canvasCoordinatesAdapter, annotation, styleSpecifier, options);
        });
      }
    };
  }
  _getTextBoxLinesFromLabels(labels) {
    // TODO -> max 5 for now (label + shortAxis + longAxis), need a generic solution for this!

    const labelLength = Math.min(labels.length, 5);
    const lines = [];
    for (let i = 0; i < labelLength; i++) {
      const labelEntry = labels[i];
      lines.push(`${_labelToShorthand(labelEntry.label)}: ${labelEntry.value}`);
    }
    return lines;
  }
  renderPolyLine(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    const drawingOptions = {
      color: options.color,
      width: options.lineWidth,
      lineDash: options.lineDash
    };
    let allCanvasCoordinates = [];
    renderableData.map((data, index) => {
      const canvasCoordinates = data.map(p => viewport.worldToCanvas(p));
      const lineUID = `${index}`;
      if (canvasCoordinates.length === 2) {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawLine(svgDrawingHelper, annotationUID, lineUID, canvasCoordinates[0], canvasCoordinates[1], drawingOptions);
      } else {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawPolyline(svgDrawingHelper, annotationUID, lineUID, canvasCoordinates, drawingOptions);
      }
      allCanvasCoordinates = allCanvasCoordinates.concat(canvasCoordinates);
    });
    return allCanvasCoordinates; // used for drawing textBox
  }
  renderMultipoint(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    let canvasCoordinates;
    renderableData.map((data, index) => {
      canvasCoordinates = data.map(p => viewport.worldToCanvas(p));
      const handleGroupUID = '0';
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawHandles(svgDrawingHelper, annotationUID, handleGroupUID, canvasCoordinates, {
        color: options.color
      });
    });
  }
  renderPoint(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    const canvasCoordinates = [];
    renderableData.map((data, index) => {
      const point = data[0];
      // This gives us one point for arrow
      canvasCoordinates.push(viewport.worldToCanvas(point));
      if (data[1] !== undefined) {
        canvasCoordinates.push(viewport.worldToCanvas(data[1]));
      } else {
        // We get the other point for the arrow by using the image size
        const imagePixelModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('imagePixelModule', referencedImageId);
        let xOffset = 10;
        let yOffset = 10;
        if (imagePixelModule) {
          const {
            columns,
            rows
          } = imagePixelModule;
          xOffset = columns / 10;
          yOffset = rows / 10;
        }
        const imagePoint = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.worldToImageCoords(referencedImageId, point);
        const arrowEnd = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.imageToWorldCoords(referencedImageId, [imagePoint[0] + xOffset, imagePoint[1] + yOffset]);
        canvasCoordinates.push(viewport.worldToCanvas(arrowEnd));
      }
      const arrowUID = `${index}`;

      // Todo: handle drawing probe as probe, currently we are drawing it as an arrow
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawArrow(svgDrawingHelper, annotationUID, arrowUID, canvasCoordinates[1], canvasCoordinates[0], {
        color: options.color,
        width: options.lineWidth
      });
    });
    return canvasCoordinates; // used for drawing textBox
  }
  renderEllipse(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    let canvasCoordinates;
    renderableData.map((data, index) => {
      if (data.length === 0) {
        // since oblique ellipse is not supported for hydration right now
        // we just return
        return;
      }
      const ellipsePointsWorld = data;
      const rotation = viewport.getRotation();
      canvasCoordinates = ellipsePointsWorld.map(p => viewport.worldToCanvas(p));
      let canvasCorners;
      if (rotation == 90 || rotation == 270) {
        canvasCorners = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.math.ellipse.getCanvasEllipseCorners([canvasCoordinates[2], canvasCoordinates[3], canvasCoordinates[0], canvasCoordinates[1]]);
      } else {
        canvasCorners = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.math.ellipse.getCanvasEllipseCorners(canvasCoordinates);
      }
      const lineUID = `${index}`;
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawEllipse(svgDrawingHelper, annotationUID, lineUID, canvasCorners[0], canvasCorners[1], {
        color: options.color,
        width: options.lineWidth,
        lineDash: options.lineDash
      });
    });
    return canvasCoordinates;
  }
  renderTextBox(svgDrawingHelper, viewport, canvasCoordinates, canvasCoordinatesAdapter, annotation, styleSpecifier, options = {}) {
    if (!canvasCoordinates || !annotation) {
      return;
    }
    const {
      annotationUID,
      data = {}
    } = annotation;
    const {
      labels
    } = data;
    const {
      color
    } = options;
    let adaptedCanvasCoordinates = canvasCoordinates;
    // adapt coordinates if there is an adapter
    if (typeof canvasCoordinatesAdapter === 'function') {
      adaptedCanvasCoordinates = canvasCoordinatesAdapter(canvasCoordinates);
    }
    const textLines = this._getTextBoxLinesFromLabels(labels);
    const canvasTextBoxCoords = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.drawing.getTextBoxCoordsCanvas(adaptedCanvasCoordinates);
    if (!annotation.data?.handles?.textBox?.worldPosition) {
      annotation.data.handles.textBox.worldPosition = viewport.canvasToWorld(canvasTextBoxCoords);
    }
    const textBoxPosition = viewport.worldToCanvas(annotation.data.handles.textBox.worldPosition);
    const textBoxUID = '1';
    const textBoxOptions = this.getLinkedTextBoxStyle(styleSpecifier, annotation);
    const boundingBox = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawLinkedTextBox(svgDrawingHelper, annotationUID, textBoxUID, textLines, textBoxPosition, canvasCoordinates, {}, {
      ...textBoxOptions,
      color
    });
    const {
      x: left,
      y: top,
      width,
      height
    } = boundingBox;
    annotation.data.handles.textBox.worldBoundingBox = {
      topLeft: viewport.canvasToWorld([left, top]),
      topRight: viewport.canvasToWorld([left + width, top]),
      bottomLeft: viewport.canvasToWorld([left, top + height]),
      bottomRight: viewport.canvasToWorld([left + width, top + height])
    };
  }
}
DICOMSRDisplayTool.toolName = _toolNames__WEBPACK_IMPORTED_MODULE_4__["default"].DICOMSRDisplay;
const SHORT_HAND_MAP = {
  'Short Axis': 'W: ',
  'Long Axis': 'L: ',
  AREA: 'Area: ',
  Length: '',
  CORNERSTONEFREETEXT: ''
};
function _labelToShorthand(label) {
  const shortHand = SHORT_HAND_MAP[label];
  if (shortHand !== undefined) {
    return shortHand;
  }
  return label;
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/SCOORD3DPointTool.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/SCOORD3DPointTool.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SCOORD3DPointTool)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _toolNames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



class SCOORD3DPointTool extends _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.AnnotationDisplayTool {
  constructor(toolProps = {}, defaultToolProps = {
    configuration: {}
  }) {
    super(toolProps, defaultToolProps);
    // This tool should not inherit from AnnotationTool and we should not need
    // to add the following lines.
    this.isPointNearTool = () => null;
    this.getHandleNearImagePoint = () => null;
    this.renderAnnotation = (enabledElement, svgDrawingHelper) => {
      const {
        viewport
      } = enabledElement;
      const {
        element
      } = viewport;
      const annotations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.state.getAnnotations(this.getToolName(), element);

      // Todo: We don't need this anymore, filtering happens in triggerAnnotationRender
      if (!annotations?.length) {
        return;
      }

      // Filter toolData to only render the data for the active SR.
      const filteredAnnotations = annotations;
      if (!viewport._actors?.size) {
        return;
      }
      const styleSpecifier = {
        toolGroupId: this.toolGroupId,
        toolName: this.getToolName(),
        viewportId: enabledElement.viewport.id
      };
      for (let i = 0; i < filteredAnnotations.length; i++) {
        const annotation = filteredAnnotations[i];
        const annotationUID = annotation.annotationUID;
        const {
          renderableData
        } = annotation.data;
        const {
          POINT: points
        } = renderableData;
        styleSpecifier.annotationUID = annotationUID;
        const lineWidth = this.getStyle('lineWidth', styleSpecifier, annotation);
        const lineDash = this.getStyle('lineDash', styleSpecifier, annotation);
        const color = this.getStyle('color', styleSpecifier, annotation);
        const options = {
          color,
          lineDash,
          lineWidth
        };
        const point = points[0][0];

        // check if viewport can render it
        const viewable = viewport.isReferenceViewable({
          FrameOfReferenceUID: annotation.metadata.FrameOfReferenceUID,
          cameraFocalPoint: point
        }, {
          asNearbyProjection: true
        });
        if (!viewable) {
          continue;
        }

        // render the point
        const arrowPointCanvas = viewport.worldToCanvas(point);
        // Todo: configure this
        const arrowEndCanvas = [arrowPointCanvas[0] + 20, arrowPointCanvas[1] + 20];
        const canvasCoordinates = [arrowPointCanvas, arrowEndCanvas];
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.drawing.drawArrow(svgDrawingHelper, annotationUID, '1', canvasCoordinates[1], canvasCoordinates[0], {
          color: options.color,
          width: options.lineWidth
        });
        this.renderTextBox(svgDrawingHelper, viewport, canvasCoordinates, annotation, styleSpecifier, options);
      }
    };
  }
  _getTextBoxLinesFromLabels(labels) {
    // TODO -> max 5 for now (label + shortAxis + longAxis), need a generic solution for this!

    const labelLength = Math.min(labels.length, 5);
    const lines = [];
    return lines;
  }
  renderTextBox(svgDrawingHelper, viewport, canvasCoordinates, annotation, styleSpecifier, options = {}) {
    if (!canvasCoordinates || !annotation) {
      return;
    }
    const {
      annotationUID,
      data = {}
    } = annotation;
    const {
      labels
    } = data;
    const textLines = [];
    for (const label of labels) {
      // make this generic
      // fix this
      if (label.label === '363698007') {
        textLines.push(`Finding Site: ${label.value}`);
      }
    }
    const {
      color
    } = options;
    const adaptedCanvasCoordinates = canvasCoordinates;
    // adapt coordinates if there is an adapter
    const canvasTextBoxCoords = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.utilities.drawing.getTextBoxCoordsCanvas(adaptedCanvasCoordinates);
    if (!annotation.data?.handles?.textBox?.worldPosition) {
      annotation.data.handles.textBox.worldPosition = viewport.canvasToWorld(canvasTextBoxCoords);
    }
    const textBoxPosition = viewport.worldToCanvas(annotation.data.handles.textBox.worldPosition);
    const textBoxUID = '1';
    const textBoxOptions = this.getLinkedTextBoxStyle(styleSpecifier, annotation);
    const boundingBox = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.drawing.drawLinkedTextBox(svgDrawingHelper, annotationUID, textBoxUID, textLines, textBoxPosition, canvasCoordinates, {}, {
      ...textBoxOptions,
      color
    });
    const {
      x: left,
      y: top,
      width,
      height
    } = boundingBox;
    annotation.data.handles.textBox.worldBoundingBox = {
      topLeft: viewport.canvasToWorld([left, top]),
      topRight: viewport.canvasToWorld([left + width, top]),
      bottomLeft: viewport.canvasToWorld([left, top + height]),
      bottomRight: viewport.canvasToWorld([left + width, top + height])
    };
  }
  getLinkedTextBoxStyle(specifications, annotation) {
    // Todo: this function can be used to set different styles for different toolMode
    // for the textBox.

    return {
      visibility: this.getStyle('textBoxVisibility', specifications, annotation),
      fontFamily: this.getStyle('textBoxFontFamily', specifications, annotation),
      fontSize: this.getStyle('textBoxFontSize', specifications, annotation),
      color: this.getStyle('textBoxColor', specifications, annotation),
      shadow: this.getStyle('textBoxShadow', specifications, annotation),
      background: this.getStyle('textBoxBackground', specifications, annotation),
      lineWidth: this.getStyle('textBoxLinkLineWidth', specifications, annotation),
      lineDash: this.getStyle('textBoxLinkLineDash', specifications, annotation)
    };
  }
}
SCOORD3DPointTool.toolName = _toolNames__WEBPACK_IMPORTED_MODULE_1__["default"].SRSCOORD3DPoint;

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTrackingUniqueIdentifiersForElement: () => (/* binding */ getTrackingUniqueIdentifiersForElement),
/* harmony export */   setActiveTrackingUniqueIdentifierForElement: () => (/* binding */ setActiveTrackingUniqueIdentifierForElement),
/* harmony export */   setTrackingUniqueIdentifiersForElement: () => (/* binding */ setTrackingUniqueIdentifiersForElement)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const state = {
  TrackingUniqueIdentifier: null,
  trackingIdentifiersByViewportId: {}
};

/**
 * This file is being used to store the per-viewport state of the SR tools,
 * Since, all the toolStates are added to the cornerstoneTools, when displaying the SRTools,
 * if there are two viewports rendering the same imageId, we don't want to show
 * the same SR annotation twice on irrelevant viewport, hence, we are storing the state
 * of the SR tools in state here, so that we can filter them later.
 */

function setTrackingUniqueIdentifiersForElement(element, trackingUniqueIdentifiers, activeIndex = 0) {
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  const {
    viewport
  } = enabledElement;
  state.trackingIdentifiersByViewportId[viewport.id] = {
    trackingUniqueIdentifiers,
    activeIndex
  };
}
function setActiveTrackingUniqueIdentifierForElement(element, TrackingUniqueIdentifier) {
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  const {
    viewport
  } = enabledElement;
  const trackingIdentifiersForElement = state.trackingIdentifiersByViewportId[viewport.id];
  if (trackingIdentifiersForElement) {
    const activeIndex = trackingIdentifiersForElement.trackingUniqueIdentifiers.findIndex(tuid => tuid === TrackingUniqueIdentifier);
    trackingIdentifiersForElement.activeIndex = activeIndex;
  }
}
function getTrackingUniqueIdentifiersForElement(element) {
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  const {
    viewport
  } = enabledElement;
  if (state.trackingIdentifiersByViewportId[viewport.id]) {
    return state.trackingIdentifiersByViewportId[viewport.id];
  }
  return {
    trackingUniqueIdentifiers: []
  };
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const toolNames = {
  DICOMSRDisplay: 'DICOMSRDisplay',
  SRLength: 'SRLength',
  SRBidirectional: 'SRBidirectional',
  SREllipticalROI: 'SREllipticalROI',
  SRCircleROI: 'SRCircleROI',
  SRArrowAnnotate: 'SRArrowAnnotate',
  SRAngle: 'SRAngle',
  SRCobbAngle: 'SRCobbAngle',
  SRRectangleROI: 'SRRectangleROI',
  SRPlanarFreehandROI: 'SRPlanarFreehandROI',
  SRSCOORD3DPoint: 'SRSCOORD3DPoint'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toolNames);

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/SRSCOOR3DProbeMapper.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/SRSCOOR3DProbeMapper.ts ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const SRSCOOR3DProbe = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Probe tool: Missing metadata or data');
      return null;
    }
    const {
      toolName
    } = metadata;
    const {
      points
    } = data.handles;
    const displayText = getDisplayText(annotation);
    return {
      uid: annotationUID,
      points,
      metadata,
      toolName: metadata.toolName,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType?.(toolName) ?? null
    };
  }
};
function getDisplayText(annotation) {
  const {
    data
  } = annotation;
  if (!data) {
    return [''];
  }
  const {
    labels
  } = data;
  const displayText = [];
  for (const label of labels) {
    // make this generic
    if (label.label === '33636980076') {
      displayText.push(`Finding Site: ${label.value}`);
    }
  }
  return displayText;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SRSCOOR3DProbe);

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/addSRAnnotation.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/addSRAnnotation.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addSRAnnotation)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _getRenderableData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getRenderableData */ "../../../extensions/cornerstone-dicom-sr/src/utils/getRenderableData.ts");
/* harmony import */ var _tools_toolNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





function addSRAnnotation(measurement, imageId, frameNumber) {
  let toolName = _tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].DICOMSRDisplay;
  const renderableData = measurement.coords.reduce((acc, coordProps) => {
    acc[coordProps.GraphicType] = acc[coordProps.GraphicType] || [];
    acc[coordProps.GraphicType].push((0,_getRenderableData__WEBPACK_IMPORTED_MODULE_2__["default"])({
      ...coordProps,
      imageId
    }));
    return acc;
  }, {});
  const {
    TrackingUniqueIdentifier
  } = measurement;
  const {
    ValueType: valueType,
    GraphicType: graphicType
  } = measurement.coords[0];
  const graphicTypePoints = renderableData[graphicType];

  /** TODO: Read the tool name from the DICOM SR identification type in the future. */
  let frameOfReferenceUID = null;
  if (imageId) {
    const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.metaData.get('imagePlaneModule', imageId);
    frameOfReferenceUID = imagePlaneModule?.frameOfReferenceUID;
  }
  if (valueType === 'SCOORD3D') {
    toolName = _tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRSCOORD3DPoint;

    // get the ReferencedFrameOfReferenceUID from the measurement
    frameOfReferenceUID = measurement.coords[0].ReferencedFrameOfReferenceSequence;
  }
  const SRAnnotation = {
    annotationUID: TrackingUniqueIdentifier,
    highlighted: false,
    isLocked: false,
    invalidated: false,
    metadata: {
      toolName,
      valueType,
      graphicType,
      FrameOfReferenceUID: frameOfReferenceUID,
      referencedImageId: imageId
    },
    data: {
      label: measurement.labels?.[0]?.value || undefined,
      displayText: measurement.displayText || undefined,
      handles: {
        textBox: measurement.textBox ?? {},
        points: graphicTypePoints[0]
      },
      cachedStats: {},
      frameNumber,
      renderableData,
      TrackingUniqueIdentifier,
      labels: measurement.labels
    }
  };

  /**
   * const annotationManager = annotation.annotationState.getAnnotationManager();
   * was not triggering annotation_added events.
   */
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.state.addAnnotation(SRAnnotation);
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addToolInstance)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function addToolInstance(name, toolClass, configuration = {}) {
  class InstanceClass extends toolClass {
    constructor(toolProps, defaultToolProps) {
      toolProps.configuration = toolProps.configuration ? {
        ...toolProps.configuration,
        ...configuration
      } : configuration;
      super(toolProps, defaultToolProps);
    }
  }
  InstanceClass.toolName = name;
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(InstanceClass);
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const ImageSet = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.ImageSet;
const findInstance = (measurement, displaySetService) => {
  const {
    displaySetInstanceUID,
    ReferencedSOPInstanceUID: sopUid
  } = measurement;
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  if (!referencedDisplaySet.images) {
    return;
  }
  return referencedDisplaySet.images.find(it => it.SOPInstanceUID === sopUid);
};

/** Finds references to display sets inside the measurements
 * contained within the provided display set.
 * @return an array of instances referenced.
 */
const findReferencedInstances = (displaySetService, displaySet) => {
  const instances = [];
  const instanceById = {};
  for (const measurement of displaySet.measurements) {
    const {
      imageId
    } = measurement;
    if (!imageId) {
      continue;
    }
    if (instanceById[imageId]) {
      continue;
    }
    const instance = findInstance(measurement, displaySetService);
    if (!instance) {
      console.log('Measurement', measurement, 'had no instances found');
      continue;
    }
    instanceById[imageId] = instance;
    instances.push(instance);
  }
  return instances;
};

/**
 * Creates a new display set containing a single image instance for each
 * referenced image.
 *
 * @param displaySetService
 * @param displaySet - containing measurements referencing images.
 * @returns A new (registered/active) display set containing the referenced images
 */
const createReferencedImageDisplaySet = (displaySetService, displaySet) => {
  const instances = findReferencedInstances(displaySetService, displaySet);
  // This will be a  member function of the created image set
  const updateInstances = function () {
    this.images.splice(0, this.images.length, ...findReferencedInstances(displaySetService, displaySet));
    this.numImageFrames = this.images.length;
  };
  const imageSet = new ImageSet(instances);
  const instance = instances[0];
  if (!instance) {
    return;
  }
  imageSet.setAttributes({
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: imageSet.uid,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: `${displaySet.SeriesDescription} KO ${displaySet.instance.SeriesNumber}`,
    Modality: 'KO',
    isMultiFrame: false,
    numImageFrames: instances.length,
    SOPClassHandlerId: `@ohif/extension-default.sopClassHandlerModule.stack`,
    isReconstructable: false,
    // This object is made of multiple instances from other series
    isCompositeStack: true,
    madeInClient: true,
    excludeFromThumbnailBrowser: true,
    updateInstances
  });
  displaySetService.addDisplaySets(imageSet);
  return imageSet;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createReferencedImageDisplaySet);

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const {
  log
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"];
function getFilteredCornerstoneToolState(measurementData, additionalFindingTypes) {
  const filteredToolState = {};
  function addToFilteredToolState(annotation, toolType) {
    if (!annotation.metadata?.referencedImageId) {
      log.warn(`[DICOMSR] No referencedImageId found for ${toolType} ${annotation.id}`);
      return;
    }
    const imageId = annotation.metadata.referencedImageId;
    if (!filteredToolState[imageId]) {
      filteredToolState[imageId] = {};
    }
    const imageIdSpecificToolState = filteredToolState[imageId];
    if (!imageIdSpecificToolState[toolType]) {
      imageIdSpecificToolState[toolType] = {
        data: []
      };
    }
    const measurementDataI = measurementData.find(md => md.uid === annotation.annotationUID);
    const toolData = imageIdSpecificToolState[toolType].data;
    let {
      finding
    } = measurementDataI;
    const findingSites = [];

    // NOTE -> We use the CORNERSTONEJS coding schemeDesignator which we have
    // defined in the @cornerstonejs/adapters
    if (measurementDataI.label) {
      if (additionalFindingTypes.includes(toolType)) {
        finding = {
          CodeValue: 'CORNERSTONEFREETEXT',
          CodingSchemeDesignator: 'CORNERSTONEJS',
          CodeMeaning: measurementDataI.label
        };
      } else {
        findingSites.push({
          CodeValue: 'CORNERSTONEFREETEXT',
          CodingSchemeDesignator: 'CORNERSTONEJS',
          CodeMeaning: measurementDataI.label
        });
      }
    }
    if (measurementDataI.findingSites) {
      findingSites.push(...measurementDataI.findingSites);
    }
    const measurement = Object.assign({}, annotation, {
      finding,
      findingSites
    });
    toolData.push(measurement);
  }
  const uidFilter = measurementData.map(md => md.uid);
  const uids = uidFilter.slice();
  const annotationManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotationManager();
  const framesOfReference = annotationManager.getFramesOfReference();
  for (let i = 0; i < framesOfReference.length; i++) {
    const frameOfReference = framesOfReference[i];
    const frameOfReferenceAnnotations = annotationManager.getAnnotations(frameOfReference);
    const toolTypes = Object.keys(frameOfReferenceAnnotations);
    for (let j = 0; j < toolTypes.length; j++) {
      const toolType = toolTypes[j];
      const annotations = frameOfReferenceAnnotations[toolType];
      if (annotations) {
        for (let k = 0; k < annotations.length; k++) {
          const annotation = annotations[k];
          const uidIndex = uids.findIndex(uid => uid === annotation.annotationUID);
          if (uidIndex !== -1) {
            addToFilteredToolState(annotation, toolType);
            uids.splice(uidIndex, 1);
            if (!uids.length) {
              return filteredToolState;
            }
          }
        }
      }
    }
  }
  return filteredToolState;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getFilteredCornerstoneToolState);

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLabelFromDCMJSImportedToolData)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const {
  CodeScheme: Cornerstone3DCodeScheme
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__.adaptersSR.Cornerstone3D;

/**
 * Extracts the label from the toolData imported from dcmjs. We need to do this
 * as dcmjs does not depeend on OHIF/the measurementService, it just produces data for cornestoneTools.
 * This optional data is available for the consumer to process if they wish to.
 * @param {object} toolData The tooldata relating to the
 *
 * @returns {string} The extracted label.
 */
function getLabelFromDCMJSImportedToolData(toolData) {
  const {
    findingSites = [],
    finding
  } = toolData;
  let freeTextLabel = findingSites.find(fs => fs.CodeValue === Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT);
  if (freeTextLabel) {
    return freeTextLabel.CodeMeaning;
  }
  if (finding && finding.CodeValue === Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT) {
    return finding.CodeMeaning;
  }
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/getRenderableData.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/getRenderableData.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums */ "../../../extensions/cornerstone-dicom-sr/src/enums.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const EPSILON = 1e-4;
const getRenderableCoords = ({
  GraphicData,
  ValueType,
  imageId
}) => {
  const renderableData = [];
  if (ValueType === 'SCOORD3D') {
    for (let i = 0; i < GraphicData.length; i += 3) {
      renderableData.push([GraphicData[i], GraphicData[i + 1], GraphicData[i + 2]]);
    }
  } else {
    for (let i = 0; i < GraphicData.length; i += 2) {
      const worldPos = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.imageToWorldCoords(imageId, [GraphicData[i], GraphicData[i + 1]]);
      renderableData.push(worldPos);
    }
  }
  return renderableData;
};
function getRenderableData({
  GraphicType,
  GraphicData,
  ValueType,
  imageId
}) {
  let renderableData = [];
  switch (GraphicType) {
    case _enums__WEBPACK_IMPORTED_MODULE_2__.SCOORDTypes.POINT:
    case _enums__WEBPACK_IMPORTED_MODULE_2__.SCOORDTypes.MULTIPOINT:
    case _enums__WEBPACK_IMPORTED_MODULE_2__.SCOORDTypes.POLYLINE:
      {
        renderableData = getRenderableCoords({
          GraphicData,
          ValueType,
          imageId
        });
        break;
      }
    case _enums__WEBPACK_IMPORTED_MODULE_2__.SCOORDTypes.CIRCLE:
      {
        const pointsWorld = getRenderableCoords({
          GraphicData,
          ValueType,
          imageId
        });
        // We do not have an explicit draw circle svg helper in Cornerstone3D at
        // this time, but we can use the ellipse svg helper to draw a circle, so
        // here we reshape the data for that purpose.
        const center = pointsWorld[0];
        const onPerimeter = pointsWorld[1];
        const radius = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.distance(center, onPerimeter);
        const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.metaData.get('imagePlaneModule', imageId);
        if (!imagePlaneModule) {
          throw new Error('No imagePlaneModule found');
        }
        const {
          columnCosines,
          rowCosines
        } = imagePlaneModule;

        // we need to get major/minor axis (which are both the same size major = minor)

        const firstAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(firstAxisStart, center, columnCosines, radius);
        const firstAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(firstAxisEnd, center, columnCosines, -radius);
        const secondAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(secondAxisStart, center, rowCosines, radius);
        const secondAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(secondAxisEnd, center, rowCosines, -radius);
        renderableData = [firstAxisStart, firstAxisEnd, secondAxisStart, secondAxisEnd];
        break;
      }
    case _enums__WEBPACK_IMPORTED_MODULE_2__.SCOORDTypes.ELLIPSE:
      {
        // GraphicData is ordered as [majorAxisStartX, majorAxisStartY, majorAxisEndX, majorAxisEndY, minorAxisStartX, minorAxisStartY, minorAxisEndX, minorAxisEndY]
        // But Cornerstone3D points are ordered as top, bottom, left, right for the
        // ellipse so we need to identify if the majorAxis is horizontal or vertical
        // and then choose the correct points to use for the ellipse.
        const pointsWorld = getRenderableCoords({
          GraphicData,
          ValueType,
          imageId
        });
        const majorAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[0]);
        const majorAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[1]);
        const minorAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[2]);
        const minorAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[3]);
        const majorAxisVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.sub(majorAxisVec, majorAxisEnd, majorAxisStart);

        // normalize majorAxisVec to avoid scaling issues
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.normalize(majorAxisVec, majorAxisVec);
        const minorAxisVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.sub(minorAxisVec, minorAxisEnd, minorAxisStart);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.normalize(minorAxisVec, minorAxisVec);
        const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.metaData.get('imagePlaneModule', imageId);
        if (!imagePlaneModule) {
          throw new Error('imageId does not have imagePlaneModule metadata');
        }
        const {
          columnCosines
        } = imagePlaneModule;

        // find which axis is parallel to the columnCosines
        const columnCosinesVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...columnCosines);
        const projectedMajorAxisOnColVec = Math.abs(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.dot(columnCosinesVec, majorAxisVec));
        const projectedMinorAxisOnColVec = Math.abs(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.dot(columnCosinesVec, minorAxisVec));
        const absoluteOfMajorDotProduct = Math.abs(projectedMajorAxisOnColVec);
        const absoluteOfMinorDotProduct = Math.abs(projectedMinorAxisOnColVec);
        renderableData = [];
        if (Math.abs(absoluteOfMajorDotProduct - 1) < EPSILON) {
          renderableData = [pointsWorld[0], pointsWorld[1], pointsWorld[2], pointsWorld[3]];
        } else if (Math.abs(absoluteOfMinorDotProduct - 1) < EPSILON) {
          renderableData = [pointsWorld[2], pointsWorld[3], pointsWorld[0], pointsWorld[1]];
        } else {
          console.warn('OBLIQUE ELLIPSE NOT YET SUPPORTED');
        }
        break;
      }
    default:
      console.warn('Unsupported GraphicType:', GraphicType);
  }
  return renderableData;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRenderableData);

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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.ts ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hydrateStructuredReport)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _getLabelFromDCMJSImportedToolData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getLabelFromDCMJSImportedToolData */ "../../../extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const {
  locking
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__.annotation;
const {
  guid
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__["default"].utils;
const {
  MeasurementReport,
  CORNERSTONE_3D_TAG
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersSR.Cornerstone3D;
const {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_5__.Enums;
const supportedLegacyCornerstoneTags = ['cornerstoneTools@^4.0.0'];
const convertCode = (codingValues, code) => {
  if (!code || code.CodingSchemeDesignator === 'CORNERSTONEJS') {
    return;
  }
  const ref = `${code.CodingSchemeDesignator}:${code.CodeValue}`;
  const ret = {
    ...codingValues[ref],
    ref,
    ...code,
    text: code.CodeMeaning
  };
  return ret;
};
const convertSites = (codingValues, sites) => {
  if (!sites || !sites.length) {
    return;
  }
  const ret = [];
  // Do as a loop to convert away from Proxy instances
  for (let i = 0; i < sites.length; i++) {
    // Deal with irregular conversion from dcmjs
    const site = convertCode(codingValues, sites[i][0] || sites[i]);
    if (site) {
      ret.push(site);
    }
  }
  return ret.length && ret || undefined;
};

/**
 * Hydrates a structured report, for default viewports.
 *
 */
function hydrateStructuredReport({
  servicesManager,
  extensionManager,
  commandsManager
}, displaySetInstanceUID) {
  const dataSource = extensionManager.getActiveDataSource()[0];
  const {
    measurementService,
    displaySetService,
    customizationService
  } = servicesManager.services;
  const codingValues = customizationService.getCustomization('codingValues');
  const disableEditing = customizationService.getCustomization('panelMeasurement.disableEditing');
  const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

  // TODO -> We should define a strict versioning somewhere.
  const mappings = measurementService.getSourceMappings(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  if (!mappings || !mappings.length) {
    throw new Error(`Attempting to hydrate measurements service when no mappings present. This shouldn't be reached.`);
  }
  const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.getInstance(displaySet.StudyInstanceUID, displaySet.SeriesInstanceUID, displaySet.SOPInstanceUID);
  const sopInstanceUIDToImageId = {};
  const imageIdsForToolState = {};
  displaySet.measurements.forEach(measurement => {
    const {
      ReferencedSOPInstanceUID,
      imageId,
      frameNumber
    } = measurement;
    if (!sopInstanceUIDToImageId[ReferencedSOPInstanceUID]) {
      sopInstanceUIDToImageId[ReferencedSOPInstanceUID] = imageId;
      imageIdsForToolState[ReferencedSOPInstanceUID] = [];
    }
    if (!imageIdsForToolState[ReferencedSOPInstanceUID][frameNumber]) {
      imageIdsForToolState[ReferencedSOPInstanceUID][frameNumber] = imageId;
    }
  });

  // Mapping of legacy datasets is now directly handled by adapters module
  const datasetToUse = instance;

  // Use dcmjs to generate toolState.
  let storedMeasurementByAnnotationType = MeasurementReport.generateToolState(datasetToUse,
  // NOTE: we need to pass in the imageIds to dcmjs since the we use them
  // for the imageToWorld transformation. The following assumes that the order
  // that measurements were added to the display set are the same order as
  // the measurementGroups in the instance.
  sopInstanceUIDToImageId, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.imageToWorldCoords, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData);
  const onBeforeSRHydration = customizationService.getCustomization('onBeforeSRHydration')?.value;
  if (typeof onBeforeSRHydration === 'function') {
    storedMeasurementByAnnotationType = onBeforeSRHydration({
      storedMeasurementByAnnotationType,
      displaySet
    });
  }

  // Filter what is found by DICOM SR to measurements we support.
  const mappingDefinitions = mappings.map(m => m.annotationType);
  const hydratableMeasurementsInSR = {};
  Object.keys(storedMeasurementByAnnotationType).forEach(key => {
    if (mappingDefinitions.includes(key)) {
      hydratableMeasurementsInSR[key] = storedMeasurementByAnnotationType[key];
    }
  });

  // Set the series touched as tracked.
  const imageIds = [];

  // TODO: notification if no hydratable?
  Object.keys(hydratableMeasurementsInSR).forEach(annotationType => {
    const toolDataForAnnotationType = hydratableMeasurementsInSR[annotationType];
    toolDataForAnnotationType.forEach(toolData => {
      // Add the measurement to toolState
      // dcmjs and Cornerstone3D has structural defect in supporting multi-frame
      // files, and looking up the imageId from sopInstanceUIDToImageId results
      // in the wrong value.
      const frameNumber = toolData.annotation.data && toolData.annotation.data.frameNumber || 1;
      const imageId = imageIdsForToolState[toolData.sopInstanceUid][frameNumber] || sopInstanceUIDToImageId[toolData.sopInstanceUid];
      if (!imageIds.includes(imageId)) {
        imageIds.push(imageId);
      }
    });
  });
  let targetStudyInstanceUID;
  const SeriesInstanceUIDs = [];
  for (let i = 0; i < imageIds.length; i++) {
    const imageId = imageIds[i];
    const {
      SeriesInstanceUID,
      StudyInstanceUID
    } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('instance', imageId);
    if (!SeriesInstanceUIDs.includes(SeriesInstanceUID)) {
      SeriesInstanceUIDs.push(SeriesInstanceUID);
    }
    if (!targetStudyInstanceUID) {
      targetStudyInstanceUID = StudyInstanceUID;
    } else if (targetStudyInstanceUID !== StudyInstanceUID) {
      console.warn('NO SUPPORT FOR SRs THAT HAVE MEASUREMENTS FROM MULTIPLE STUDIES.');
    }
  }
  Object.keys(hydratableMeasurementsInSR).forEach(annotationType => {
    const toolDataForAnnotationType = hydratableMeasurementsInSR[annotationType];
    toolDataForAnnotationType.forEach(toolData => {
      // Add the measurement to toolState
      // dcmjs and Cornerstone3D has structural defect in supporting multi-frame
      // files, and looking up the imageId from sopInstanceUIDToImageId results
      // in the wrong value.
      const frameNumber = toolData.annotation.data && toolData.annotation.data.frameNumber || 1;
      const imageId = imageIdsForToolState[toolData.sopInstanceUid][frameNumber] || sopInstanceUIDToImageId[toolData.sopInstanceUid];
      toolData.uid = guid();
      const instance = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('instance', imageId);
      const {
        FrameOfReferenceUID
        // SOPInstanceUID,
        // SeriesInstanceUID,
        // StudyInstanceUID,
      } = instance;
      const annotation = {
        annotationUID: toolData.annotation.annotationUID,
        data: toolData.annotation.data,
        metadata: {
          toolName: annotationType,
          referencedImageId: imageId,
          FrameOfReferenceUID
        }
      };
      const source = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
      annotation.data.label = (0,_getLabelFromDCMJSImportedToolData__WEBPACK_IMPORTED_MODULE_2__["default"])(toolData);
      annotation.data.finding = convertCode(codingValues, toolData.finding?.[0]);
      annotation.data.findingSites = convertSites(codingValues, toolData.findingSites);
      annotation.data.findingSites?.forEach(site => {
        if (site.type) {
          annotation.data[site.type] = site;
        }
      });
      const matchingMapping = mappings.find(m => m.annotationType === annotationType);
      const newAnnotationUID = measurementService.addRawMeasurement(source, annotationType, {
        annotation
      }, matchingMapping.toMeasurementSchema, dataSource);
      commandsManager.runCommand('updateMeasurement', {
        uid: newAnnotationUID,
        code: annotation.data.finding
      });
      if (disableEditing) {
        locking.setAnnotationLocked(newAnnotationUID, true);
      }
      if (!imageIds.includes(imageId)) {
        imageIds.push(imageId);
      }
    });
  });
  displaySet.isHydrated = true;
  return {
    StudyInstanceUID: targetStudyInstanceUID,
    SeriesInstanceUIDs
  };
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

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/isRehydratable.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/isRehydratable.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isRehydratable)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const {
  MeasurementReport
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__.adaptersSR.Cornerstone3D;

/**
 * Checks if the given `displaySet`can be rehydrated into the `measurementService`.
 *
 * @param {object} displaySet The SR `displaySet` to check.
 * @param {object[]} mappings The CornerstoneTools 4 mappings to the `measurementService`.
 * @returns {boolean} True if the SR can be rehydrated into the `measurementService`.
 */
function isRehydratable(displaySet, mappings) {
  if (!mappings || !mappings.length) {
    return false;
  }
  const mappingDefinitions = new Set();
  for (const m of mappings) {
    mappingDefinitions.add(m.annotationType);
  }
  const {
    measurements
  } = displaySet;
  for (let i = 0; i < measurements.length; i++) {
    const {
      TrackingIdentifier
    } = measurements[i] || {};
    if (!TrackingIdentifier) {
      console.warn('No tracking identifier for measurement ', measurements[i]);
      continue;
    }
    const adapter = MeasurementReport.getAdapterForTrackingIdentifier(TrackingIdentifier);
    const hydratable = adapter && mappingDefinitions.has(adapter.toolType);
    if (hydratable) {
      return true;
    }
    console.log('Measurement is not rehydratable', TrackingIdentifier, measurements[i]);
  }
  console.log('No measurements found which were rehydratable');
  return false;
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

/***/ "../../../extensions/cornerstone-dicom-sr/package.json":
/*!*************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/package.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-sr","version":"3.11.0-beta.56","description":"OHIF extension for an SR Cornerstone Viewport","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-cornerstone-dicom-sr.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"keywords":["ohif-extension"],"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/extension-cornerstone":"3.11.0-beta.56","@ohif/extension-measurement-tracking":"3.11.0-beta.56","@ohif/ui":"3.11.0-beta.56","dcmjs":"*","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^18.3.1"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/adapters":"^3.15.6","@cornerstonejs/core":"^3.15.6","@cornerstonejs/tools":"^3.15.6","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-sr_src_index_tsx.js.map