"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_microscopy_src_index_tsx"],{

/***/ "../../../modes/microscopy/src/id.js":
/*!*******************************************!*\
  !*** ../../../modes/microscopy/src/id.js ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/microscopy/package.json");
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

/***/ "../../../modes/microscopy/src/index.tsx":
/*!***********************************************!*\
  !*** ../../../modes/microscopy/src/index.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cornerstone: () => (/* binding */ cornerstone),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../modes/microscopy/src/id.js");
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/microscopy/src/toolbarButtons.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocols: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-dicom-microscopy.panelModule.measure'
};
const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
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
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-dicom-microscopy': '^3.0.0'
};
function modeFactory({
  modeConfiguration
}) {
  return {
    id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
    routeName: 'microscopy',
    displayName: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('Modes:Microscopy'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager
    }) => {
      const {
        toolbarService
      } = servicesManager.services;
      toolbarService.register(_toolbarButtons__WEBPACK_IMPORTED_MODULE_2__["default"]);
      toolbarService.updateSection('primary', ['MeasurementTools', 'dragPan', 'TagBrowser']);
      toolbarService.updateSection('MeasurementTools', ['line', 'point', 'polygon', 'circle', 'box', 'freehandpolygon', 'freehandline']);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolbarService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      uiDialogService.hideAll();
      uiModalService.hide();
      toolbarService.reset();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: ({
      modalities
    }) => {
      const modalities_list = modalities.split('\\');
      return {
        valid: modalities_list.includes('SM'),
        description: 'Microscopy mode only supports the SM modality'
      };
    },
    routes: [{
      path: 'microscopy',
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [ohif.leftPanel],
            leftPanelResizable: true,
            leftPanelClosed: true,
            // we have problem with rendering thumbnails for microscopy images
            // rightPanelClosed: true, // we do not have the save microscopy measurements yet
            rightPanels: [ohif.rightPanel],
            rightPanelResizable: true,
            viewports: [{
              namespace: '@ohif/extension-dicom-microscopy.viewportModule.microscopy-dicom',
              displaySetsToDisplay: [
              // Share the sop class handler with cornerstone version of it
              '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler']
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
    sopClassHandlers: ['@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler', dicomvideo.sopClassHandler, dicompdf.sopClassHandler],
    ...modeConfiguration
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

/***/ "../../../modes/microscopy/src/toolbarButtons.ts":
/*!*******************************************************!*\
  !*** ../../../modes/microscopy/src/toolbarButtons.ts ***!
  \*******************************************************/
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
    toolName: 'line'
  },
  context: 'MICROSCOPY'
};
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'line',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: 'Line',
    tooltip: 'Line',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'point',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-point',
    label: 'Point',
    tooltip: 'Point Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'point'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'polygon',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-polygon',
    label: 'Polygon',
    tooltip: 'Polygon Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'polygon'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'circle',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-circle',
    label: 'Circle',
    tooltip: 'Circle Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'circle'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'box',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rectangle',
    label: 'Box',
    tooltip: 'Box Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'box'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'freehandpolygon',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-freehand-polygon',
    label: 'Freehand Polygon',
    tooltip: 'Freehand Polygon Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'freehandpolygon'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'freehandline',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-freehand-line',
    label: 'Freehand Line',
    tooltip: 'Freehand Line Tool',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'freehandline'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'dragPan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: 'Pan',
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'dragPan'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'TagBrowser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'dicom-tag-browser',
    label: 'Dicom Tag Browser',
    tooltip: 'Dicom Tag Browser',
    commands: 'openDICOMTagViewer',
    evaluate: 'evaluate.action'
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

/***/ "../../../modes/microscopy/package.json":
/*!**********************************************!*\
  !*** ../../../modes/microscopy/package.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-microscopy","version":"3.11.0-beta.56","description":"OHIF mode for DICOM microscopy","author":"OHIF","license":"MIT","main":"dist/ohif-mode-microscopy.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-mode"],"publishConfig":{"access":"public"},"module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/extension-dicom-microscopy":"3.11.0-beta.56"},"dependencies":{"@babel/runtime":"^7.20.13","i18next":"^17.0.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_microscopy_src_index_tsx.js.map