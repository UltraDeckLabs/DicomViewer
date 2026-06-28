"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_tmtv_src_index_ts"],{

/***/ "../../../modes/tmtv/src/id.js":
/*!*************************************!*\
  !*** ../../../modes/tmtv/src/id.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/tmtv/package.json");
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

/***/ "../../../modes/tmtv/src/index.ts":
/*!****************************************!*\
  !*** ../../../modes/tmtv/src/index.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/tmtv/src/toolbarButtons.ts");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id.js */ "../../../modes/tmtv/src/id.js");
/* harmony import */ var _initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initToolGroups.js */ "../../../modes/tmtv/src/initToolGroups.js");
/* harmony import */ var _utils_setCrosshairsConfiguration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/setCrosshairsConfiguration.js */ "../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js");
/* harmony import */ var _utils_setFusionActiveVolume_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/setFusionActiveVolume.js */ "../../../modes/tmtv/src/utils/setFusionActiveVolume.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








const {
  MetadataProvider
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes;
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
  segPanel: '@ohif/extension-cornerstone.panelModule.panelSegmentationNoHeader',
  measurements: '@ohif/extension-cornerstone.panelModule.measurements'
};
const tmtv = {
  hangingProtocol: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  petSUV: '@ohif/extension-tmtv.panelModule.petSUV',
  tmtv: '@ohif/extension-tmtv.panelModule.tmtv'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-tmtv': '^3.0.0'
};
const unsubscriptions = [];
function modeFactory({
  modeConfiguration
}) {
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: _id_js__WEBPACK_IMPORTED_MODULE_2__.id,
    routeName: 'tmtv',
    displayName: i18next__WEBPACK_IMPORTED_MODULE_6__["default"].t('Modes:Total Metabolic Tumor Volume'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager,
      extensionManager,
      commandsManager
    }) => {
      const {
        toolbarService,
        toolGroupService,
        customizationService,
        hangingProtocolService,
        displaySetService
      } = servicesManager.services;
      const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
      const {
        toolNames,
        Enums
      } = utilityModule.exports;

      // Init Default and SR ToolGroups
      (0,_initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__["default"])(toolNames, Enums, toolGroupService, commandsManager);
      const {
        unsubscribe
      } = toolGroupService.subscribe(toolGroupService.EVENTS.VIEWPORT_ADDED, () => {
        // For fusion toolGroup we need to add the volumeIds for the crosshairs
        // since in the fusion viewport we don't want both PT and CT to render MIP
        // when slabThickness is modified
        const {
          displaySetMatchDetails
        } = hangingProtocolService.getMatchDetails();
        (0,_utils_setCrosshairsConfiguration_js__WEBPACK_IMPORTED_MODULE_4__["default"])(displaySetMatchDetails, toolNames, toolGroupService, displaySetService);
        (0,_utils_setFusionActiveVolume_js__WEBPACK_IMPORTED_MODULE_5__["default"])(displaySetMatchDetails, toolNames, toolGroupService, displaySetService);
      });
      unsubscriptions.push(unsubscribe);
      toolbarService.register(_toolbarButtons__WEBPACK_IMPORTED_MODULE_1__["default"]);
      toolbarService.updateSection(toolbarService.sections.primary, ['MeasurementTools', 'Zoom', 'Pan', 'WindowLevel', 'Crosshairs']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topLeft, ['orientationMenu', 'dataOverlayMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomMiddle, ['AdvancedRenderingControls']);
      toolbarService.updateSection('AdvancedRenderingControls', ['windowLevelMenuEmbedded', 'voiManualControlMenu', 'Colorbar', 'opacityMenu', 'thresholdMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topRight, ['modalityLoadBadge', 'trackingStatus', 'navigationComponent']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomLeft, ['windowLevelMenu']);
      toolbarService.updateSection('MeasurementTools', ['Length', 'Bidirectional', 'ArrowAnnotate', 'EllipticalROI']);
      toolbarService.updateSection('ROIThresholdToolbox', ['SegmentationTools']);
      toolbarService.updateSection('SegmentationTools', ['RectangleROIStartEndThreshold', 'BrushTools']);
      toolbarService.updateSection('BrushTools', ['Brush', 'Eraser', 'Threshold']);
      customizationService.setCustomizations({
        'panelSegmentation.tableMode': {
          $set: 'expanded'
        },
        'panelSegmentation.onSegmentationAdd': {
          $set: () => {
            commandsManager.run('createNewLabelmapFromPT');
          }
        }
      });

      // For the hanging protocol we need to decide on the window level
      // based on whether the SUV is corrected or not, hence we can't hard
      // code the window level in the hanging protocol but we add a custom
      // attribute to the hanging protocol that will be used to get the
      // window level based on the metadata
      hangingProtocolService.addCustomAttribute('getPTVOIRange', 'get PT VOI based on corrected or not', props => {
        const ptDisplaySet = props.find(imageSet => imageSet.Modality === 'PT');
        if (!ptDisplaySet) {
          return;
        }
        const {
          imageId
        } = ptDisplaySet.images[0];
        const imageIdScalingFactor = MetadataProvider.get('scalingModule', imageId);
        const isSUVAvailable = imageIdScalingFactor && imageIdScalingFactor.suvbw;
        if (isSUVAvailable) {
          return {
            windowWidth: 5,
            windowCenter: 2.5
          };
        }
        return;
      });
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      unsubscriptions.forEach(unsubscribe => unsubscribe());
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: ({
      modalities,
      study
    }) => {
      const modalities_list = modalities.split('\\');
      const invalidModalities = ['SM'];
      const isValid = modalities_list.includes('CT') && study.mrn !== 'M1' && modalities_list.includes('PT') && !invalidModalities.some(modality => modalities_list.includes(modality)) &&
      // This is study is a 4D study with PT and CT and not a 3D study for the tmtv
      // mode, until we have a better way to identify 4D studies we will use the
      // StudyInstanceUID to identify the study
      // Todo: when we add the 4D mode which comes with a mechanism to identify
      // 4D studies we can use that
      study.studyInstanceUid !== '1.3.6.1.4.1.12842.1.1.14.3.20220915.105557.468.2963630849';

      // there should be both CT and PT modalities and the modality should not be SM
      return {
        valid: isValid,
        description: 'The mode requires both PT and CT series in the study'
      };
    },
    routes: [{
      path: 'tmtv',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: () => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [ohif.thumbnailList],
            leftPanelResizable: true,
            leftPanelClosed: true,
            rightPanels: [tmtv.tmtv, tmtv.petSUV],
            rightPanelResizable: true,
            viewports: [{
              namespace: cs3d.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    hangingProtocol: tmtv.hangingProtocol,
    sopClassHandlers: [ohif.sopClassHandler],
    ...modeConfiguration
  };
}
const mode = {
  id: _id_js__WEBPACK_IMPORTED_MODULE_2__.id,
  modeFactory,
  extensionDependencies
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mode);

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

/***/ "../../../modes/tmtv/src/initToolGroups.js":
/*!*************************************************!*\
  !*** ../../../modes/tmtv/src/initToolGroups.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toolGroupIds: () => (/* binding */ toolGroupIds)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const toolGroupIds = {
  CT: 'ctToolGroup',
  PT: 'ptToolGroup',
  Fusion: 'fusionToolGroup',
  MIP: 'mipToolGroup',
  default: 'default'
};
function _initToolGroups(toolNames, Enums, toolGroupService, commandsManager) {
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }, {
        numTouchPoints: 3
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.SegmentBidirectional
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            eventDetails
          });
        },
        changeTextCallback: (data, eventDetails, callback) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            data,
            eventDetails
          });
        }
      }
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: 'CircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_CIRCLE'
      }
    }, {
      toolName: 'CircularEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_CIRCLE'
      }
    }, {
      toolName: 'SphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_SPHERE'
      }
    }, {
      toolName: 'SphereEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_SPHERE'
      }
    }, {
      toolName: 'ThresholdCircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE'
      }
    }, {
      toolName: 'ThresholdSphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE'
      }
    }, {
      toolName: 'ThresholdCircularBrushDynamic',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        // preview: {
        //   enabled: true,
        // },
        threshold: {
          isDynamic: true,
          dynamicRadius: 3
        }
      }
    }],
    enabled: [],
    disabled: [{
      toolName: toolNames.Crosshairs,
      configuration: {
        disableOnPassive: true,
        autoPan: {
          enabled: false,
          panSize: 10
        }
      }
    }]
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.CT, tools);
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.PT, {
    active: tools.active,
    passive: [...tools.passive, {
      toolName: 'RectangleROIStartEndThreshold'
    }],
    enabled: tools.enabled,
    disabled: tools.disabled
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.Fusion, tools);
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.default, tools);
  const mipTools = {
    active: [{
      toolName: toolNames.VolumeRotate,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }],
      configuration: {
        rotateIncrementDegrees: 5
      }
    }, {
      toolName: toolNames.MipJumpToClick,
      configuration: {
        toolGroupId: toolGroupIds.PT
      },
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }],
    enabled: [{
      toolName: toolNames.OrientationMarker,
      configuration: {
        orientationWidget: {
          viewportCorner: 'BOTTOM_LEFT'
        }
      }
    }]
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.MIP, mipTools);
}
function initToolGroups(toolNames, Enums, toolGroupService, commandsManager) {
  _initToolGroups(toolNames, Enums, toolGroupService, commandsManager);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initToolGroups);

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

/***/ "../../../modes/tmtv/src/toolbarButtons.ts":
/*!*************************************************!*\
  !*** ../../../modes/tmtv/src/toolbarButtons.ts ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initToolGroups */ "../../../modes/tmtv/src/initToolGroups.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: [_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion]
  }
};
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'SegmentationTools',
  uiType: 'ohif.toolBoxButton',
  props: {
    buttonSection: true
  }
}, {
  id: 'BrushTools',
  uiType: 'ohif.toolBoxButtonGroup',
  props: {
    buttonSection: true
  }
}, {
  id: 'AdvancedRenderingControls',
  uiType: 'ohif.advancedRenderingControls',
  props: {
    buttonSection: true
  }
}, {
  id: 'modalityLoadBadge',
  uiType: 'ohif.modalityLoadBadge',
  props: {
    icon: 'Status',
    label: 'Status',
    tooltip: 'Status',
    evaluate: {
      name: 'evaluate.modalityLoadBadge',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'Colorbar',
  uiType: 'ohif.colorbar',
  props: {
    type: 'tool',
    label: 'Colorbar'
  }
}, {
  id: 'navigationComponent',
  uiType: 'ohif.navigationComponent',
  props: {
    icon: 'Navigation',
    label: 'Navigation',
    tooltip: 'Navigate between segments/measurements and manage their visibility',
    evaluate: {
      name: 'evaluate.navigationComponent',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'windowLevelMenuEmbedded',
  uiType: 'ohif.windowLevelMenuEmbedded',
  props: {
    icon: 'WindowLevel',
    label: 'Window Level',
    tooltip: 'Adjust window/level presets and customize image contrast settings',
    evaluate: {
      name: 'evaluate.windowLevelMenuEmbedded',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'trackingStatus',
  uiType: 'ohif.trackingStatus',
  props: {
    icon: 'TrackingStatus',
    label: 'Tracking Status',
    tooltip: 'View and manage tracking status of measurements and annotations',
    evaluate: {
      name: 'evaluate.trackingStatus',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'Length',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: 'Length',
    tooltip: 'Length Tool',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Bidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-bidirectional',
    label: 'Bidirectional',
    tooltip: 'Bidirectional Tool',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'ArrowAnnotate',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-annotate',
    label: 'Arrow Annotate',
    tooltip: 'Arrow Annotate Tool',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'EllipticalROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-ellipse',
    label: 'Ellipse',
    tooltip: 'Ellipse Tool',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-zoom',
    label: 'Zoom',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'WindowLevel',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-window-level',
    label: 'Window Level',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-crosshair',
    label: 'Crosshairs',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: 'Pan',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'RectangleROIStartEndThreshold',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'tool-create-threshold',
    label: 'Rectangle ROI Threshold',
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstone.segmentation', {
      name: 'evaluate.cornerstoneTool',
      disabledText: 'Select the PT Axial to enable this tool'
    }],
    options: 'tmtv.RectangleROIThresholdOptions'
  }
}, {
  id: 'Brush',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-brush',
    label: 'Brush',
    evaluate: {
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircularBrush', 'SphereBrush'],
      disabledText: 'Create new segmentation to enable this tool.'
    },
    options: [{
      name: 'Radius (mm)',
      id: 'brush-radius',
      type: 'range',
      min: 0.5,
      max: 99.5,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['CircularBrush', 'SphereBrush']
        }
      }
    }, {
      name: 'Shape',
      type: 'radio',
      id: 'brush-mode',
      value: 'CircularBrush',
      values: [{
        value: 'CircularBrush',
        label: 'Circle'
      }, {
        value: 'SphereBrush',
        label: 'Sphere'
      }],
      commands: 'setToolActiveToolbar'
    }]
  }
}, {
  id: 'Eraser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-eraser',
    label: 'Eraser',
    evaluate: {
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircularEraser', 'SphereEraser']
    },
    options: [{
      name: 'Radius (mm)',
      id: 'eraser-radius',
      type: 'range',
      min: 0.5,
      max: 99.5,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['CircularEraser', 'SphereEraser']
        }
      }
    }, {
      name: 'Shape',
      type: 'radio',
      id: 'eraser-mode',
      value: 'CircularEraser',
      values: [{
        value: 'CircularEraser',
        label: 'Circle'
      }, {
        value: 'SphereEraser',
        label: 'Sphere'
      }],
      commands: 'setToolActiveToolbar'
    }]
  }
}, {
  id: 'Threshold',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-threshold',
    label: 'Threshold Tool',
    evaluate: {
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
    },
    options: [{
      name: 'Radius (mm)',
      id: 'threshold-radius',
      type: 'range',
      min: 0.5,
      max: 99.5,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush', 'ThresholdCircularBrushDynamic']
        }
      }
    }, {
      name: 'Threshold',
      type: 'radio',
      id: 'dynamic-mode',
      value: 'ThresholdRange',
      values: [{
        value: 'ThresholdDynamic',
        label: 'Dynamic'
      }, {
        value: 'ThresholdRange',
        label: 'Range'
      }],
      commands: ({
        value,
        commandsManager
      }) => {
        if (value === 'ThresholdDynamic') {
          commandsManager.run('setToolActive', {
            toolName: 'ThresholdCircularBrushDynamic'
          });
        } else {
          commandsManager.run('setToolActive', {
            toolName: 'ThresholdCircularBrush'
          });
        }
      }
    }, {
      name: 'Shape',
      type: 'radio',
      id: 'eraser-mode',
      value: 'ThresholdCircularBrush',
      values: [{
        value: 'ThresholdCircularBrush',
        label: 'Circle'
      }, {
        value: 'ThresholdSphereBrush',
        label: 'Sphere'
      }],
      condition: ({
        options
      }) => options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
      commands: 'setToolActiveToolbar'
    }, {
      name: 'ThresholdRange',
      type: 'double-range',
      id: 'threshold-range',
      min: 0,
      max: 50,
      step: 0.5,
      value: [2.5, 50],
      condition: ({
        options
      }) => options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
      commands: {
        commandName: 'setThresholdRange',
        commandOptions: {
          toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
        }
      }
    }]
  }
}, {
  id: 'dataOverlayMenu',
  uiType: 'ohif.dataOverlayMenu',
  props: {
    icon: 'ViewportViews',
    label: 'Data Overlay',
    tooltip: 'Configure data overlay options and manage foreground/background display sets',
    evaluate: 'evaluate.dataOverlayMenu'
  }
}, {
  id: 'orientationMenu',
  uiType: 'ohif.orientationMenu',
  props: {
    icon: 'OrientationSwitch',
    label: 'Orientation',
    tooltip: 'Change viewport orientation between axial, sagittal, coronal and acquisition planes',
    evaluate: {
      name: 'evaluate.orientationMenu'
      // hideWhenDisabled: true,
    }
  }
}, {
  id: 'windowLevelMenu',
  uiType: 'ohif.windowLevelMenu',
  props: {
    icon: 'WindowLevel',
    label: 'Window Level',
    tooltip: 'Adjust window/level presets and customize image contrast settings',
    evaluate: 'evaluate.windowLevelMenu'
  }
}, {
  id: 'voiManualControlMenu',
  uiType: 'ohif.voiManualControlMenu',
  props: {
    icon: 'WindowLevelAdvanced',
    label: 'Advanced Window Level',
    tooltip: 'Advanced window/level settings with manual controls and presets',
    evaluate: 'evaluate.voiManualControlMenu'
  }
}, {
  id: 'thresholdMenu',
  uiType: 'ohif.thresholdMenu',
  props: {
    icon: 'Threshold',
    label: 'Threshold',
    tooltip: 'Image threshold settings',
    evaluate: {
      name: 'evaluate.thresholdMenu',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'opacityMenu',
  uiType: 'ohif.opacityMenu',
  props: {
    icon: 'Opacity',
    label: 'Opacity',
    tooltip: 'Image opacity settings',
    evaluate: {
      name: 'evaluate.opacityMenu',
      hideWhenDisabled: true
    }
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toolbarButtons);

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

/***/ "../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js":
/*!*******************************************************************!*\
  !*** ../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setCrosshairsConfiguration)
/* harmony export */ });
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initToolGroups */ "../../../modes/tmtv/src/initToolGroups.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function setCrosshairsConfiguration(matches, toolNames, toolGroupService, displaySetService) {
  const matchDetails = matches.get('ctDisplaySet');
  if (!matchDetails) {
    return;
  }
  const {
    SeriesInstanceUID
  } = matchDetails;
  const displaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
  const toolConfig = toolGroupService.getToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.Crosshairs);
  const crosshairsConfig = {
    ...toolConfig,
    filterActorUIDsToSetSlabThickness: [displaySets[0].displaySetInstanceUID]
  };
  toolGroupService.setToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.Crosshairs, crosshairsConfig);
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

/***/ "../../../modes/tmtv/src/utils/setFusionActiveVolume.js":
/*!**************************************************************!*\
  !*** ../../../modes/tmtv/src/utils/setFusionActiveVolume.js ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setFusionActiveVolume)
/* harmony export */ });
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initToolGroups */ "../../../modes/tmtv/src/initToolGroups.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function setFusionActiveVolume(matches, toolNames, toolGroupService, displaySetService) {
  const matchDetails = matches.get('ptDisplaySet');
  const matchDetails2 = matches.get('ctDisplaySet');
  if (!matchDetails) {
    return;
  }
  const {
    SeriesInstanceUID
  } = matchDetails;
  const displaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
  if (!displaySets || displaySets.length === 0) {
    return;
  }
  const wlToolConfig = toolGroupService.getToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.WindowLevel);
  const ellipticalToolConfig = toolGroupService.getToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.EllipticalROI);

  // Todo: this should not take into account the loader id
  const volumeId = `cornerstoneStreamingImageVolume:${displaySets[0].displaySetInstanceUID}`;
  const {
    SeriesInstanceUID: SeriesInstanceUID2
  } = matchDetails2;
  const ctDisplaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID2);
  const ctVolumeId = `cornerstoneStreamingImageVolume:${ctDisplaySets[0].displaySetInstanceUID}`;
  const windowLevelConfig = {
    ...wlToolConfig,
    volumeId: ctVolumeId
  };
  const ellipticalROIConfig = {
    ...ellipticalToolConfig,
    volumeId
  };
  toolGroupService.setToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.WindowLevel, windowLevelConfig);
  toolGroupService.setToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.EllipticalROI, ellipticalROIConfig);
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

/***/ "../../../modes/tmtv/package.json":
/*!****************************************!*\
  !*** ../../../modes/tmtv/package.json ***!
  \****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-tmtv","version":"3.11.0-beta.56","description":"Total Metabolic Tumor Volume Workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-tmtv.umd.js","module":"src/index.ts","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"keywords":["ohif-mode"],"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/extension-cornerstone":"3.11.0-beta.56","@ohif/extension-cornerstone-dicom-sr":"3.11.0-beta.56","@ohif/extension-default":"3.11.0-beta.56","@ohif/extension-dicom-pdf":"3.11.0-beta.56","@ohif/extension-dicom-video":"3.11.0-beta.56","@ohif/extension-measurement-tracking":"3.11.0-beta.56"},"dependencies":{"@babel/runtime":"^7.20.13","i18next":"^17.0.3"},"devDependencies":{"webpack":"5.94.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_tmtv_src_index_ts.js.map