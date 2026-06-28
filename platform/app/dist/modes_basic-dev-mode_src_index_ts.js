"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_basic-dev-mode_src_index_ts"],{

/***/ "../../../modes/basic-dev-mode/src/id.js":
/*!***********************************************!*\
  !*** ../../../modes/basic-dev-mode/src/id.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/basic-dev-mode/package.json");
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

/***/ "../../../modes/basic-dev-mode/src/index.ts":
/*!**************************************************!*\
  !*** ../../../modes/basic-dev-mode/src/index.ts ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/basic-dev-mode/src/toolbarButtons.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../modes/basic-dev-mode/src/id.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const configs = {
  Length: {}
  //
};
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video',
  viewport: '@ohif/extension-dicom-video.viewportModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1'
};
function modeFactory({
  modeConfiguration
}) {
  return {
    id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
    routeName: 'dev',
    displayName: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Modes:Basic Dev Viewer'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager,
      extensionManager
    }) => {
      const {
        toolbarService,
        toolGroupService
      } = servicesManager.services;
      const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
      const {
        toolNames,
        Enums
      } = utilityModule.exports;
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
          toolName: toolNames.Bidirectional
        }, {
          toolName: toolNames.Probe
        }, {
          toolName: toolNames.EllipticalROI
        }, {
          toolName: toolNames.CircleROI
        }, {
          toolName: toolNames.RectangleROI
        }, {
          toolName: toolNames.StackScroll
        }, {
          toolName: toolNames.CalibrationLine
        }],
        // enabled
        enabled: [{
          toolName: toolNames.ImageOverlayViewer
        }]
        // disabled
      };
      toolGroupService.createToolGroupAndAddTools('default', tools);
      toolbarService.register(_toolbarButtons__WEBPACK_IMPORTED_MODULE_0__["default"]);
      toolbarService.updateSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Pan', 'Layout', 'MoreTools']);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: ({
      modalities
    }) => {
      const modalities_list = modalities.split('\\');

      // Slide Microscopy modality not supported by basic mode yet
      return {
        valid: !modalities_list.includes('SM'),
        description: 'The mode does not support the following modalities: SM'
      };
    },
    routes: [{
      path: 'viewer-cs3d',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: ohif.layout,
          props: {
            // TODO: Should be optional, or required to pass empty array for slots?
            leftPanels: [ohif.thumbnailList],
            leftPanelResizable: true,
            rightPanels: [ohif.measurements],
            rightPanelResizable: true,
            viewports: [{
              namespace: cs3d.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler]
            }, {
              namespace: dicomvideo.viewport,
              displaySetsToDisplay: [dicomvideo.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    hangingProtocol: 'default',
    sopClassHandlers: [dicomvideo.sopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler]
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
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

/***/ "../../../modes/basic-dev-mode/src/toolbarButtons.ts":
/*!***********************************************************!*\
  !*** ../../../modes/basic-dev-mode/src/toolbarButtons.ts ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setToolActiveToolbar: () => (/* binding */ setToolActiveToolbar)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const setToolActiveToolbar = {
  commandName: 'setToolActive',
  commandOptions: {
    toolGroupIds: ['default', 'mpr']
  },
  context: 'CORNERSTONE'
};
const toolbarButtons = [
// sections
{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'MoreTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
},
// tool defs
{
  id: 'Length',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: 'Length',
    tooltip: 'Length Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Length'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Bidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-bidirectional',
    label: 'Bidirectional',
    tooltip: 'Bidirectional Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Bidirectional'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'EllipticalROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-ellipse',
    label: 'Ellipse',
    tooltip: 'Ellipse ROI',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'EllipticalROI'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CircleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-circle',
    label: 'Circle',
    tooltip: 'Circle Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'CircleROI'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-zoom',
    label: 'Zoom',
    tooltip: 'Zoom',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Zoom'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: 'Pan',
    tooltip: 'Pan',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Pan'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Capture',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-capture',
    label: 'Capture',
    tooltip: 'Capture',
    commands: 'showDownloadViewportModal',
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'wholeSlide']
    }]
  }
}, {
  id: 'Layout',
  uiType: 'ohif.layoutSelector',
  props: {
    rows: 3,
    columns: 4,
    evaluate: 'evaluate.action',
    commands: 'setViewportGridLayout'
  }
}, {
  id: 'Reset',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-reset',
    label: 'Reset View',
    tooltip: 'Reset View',
    commands: 'resetViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'RotateRight',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rotate-right',
    label: 'Rotate Right',
    tooltip: 'Rotate Right +90',
    commands: 'rotateViewportCW',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'FlipHorizontal',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-flip-horizontal',
    label: 'Flip Horizontally',
    tooltip: 'Flip Horizontally',
    commands: 'flipViewportHorizontal',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'StackScroll',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-stack-scroll',
    label: 'Stack Scroll',
    tooltip: 'Stack Scroll',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'StackScroll'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Invert',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-invert',
    label: 'Invert Colors',
    tooltip: 'Invert Colors',
    commands: 'invertViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'CalibrationLine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-calibration',
    label: 'Calibration Line',
    tooltip: 'Calibration Line',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'CalibrationLine'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
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

/***/ "../../../modes/basic-dev-mode/package.json":
/*!**************************************************!*\
  !*** ../../../modes/basic-dev-mode/package.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-basic-dev-mode","version":"3.11.0-beta.56","description":"Basic OHIF Viewer Using Cornerstone","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-basic-dev-mode.umd.js","module":"src/index.ts","engines":{"node":">=10","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/extension-cornerstone":"3.11.0-beta.56","@ohif/extension-cornerstone-dicom-sr":"3.11.0-beta.56","@ohif/extension-default":"3.11.0-beta.56","@ohif/extension-dicom-pdf":"3.11.0-beta.56","@ohif/extension-dicom-video":"3.11.0-beta.56"},"dependencies":{"@babel/runtime":"^7.20.13","i18next":"^17.0.3"},"devDependencies":{"webpack":"5.94.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_basic-dev-mode_src_index_ts.js.map