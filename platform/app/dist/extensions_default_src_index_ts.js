(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_default_src_index_ts"],{

/***/ "../../../extensions/default/src/Actions/createReportAsync.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Actions/createReportAsync.tsx ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 *
 * @param {*} servicesManager
 */
async function createReportAsync({
  servicesManager,
  getReport,
  reportType = 'measurement'
}) {
  const {
    displaySetService,
    uiNotificationService,
    uiDialogService
  } = servicesManager.services;
  try {
    const naturalizedReport = await getReport();
    if (!naturalizedReport) {
      return;
    }

    // The "Mode" route listens for DicomMetadataStore changes
    // When a new instance is added, it listens and
    // automatically calls makeDisplaySets
    _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addInstances([naturalizedReport], true);
    const displaySet = displaySetService.getMostRecentDisplaySet();
    const displaySetInstanceUID = displaySet.displaySetInstanceUID;
    uiNotificationService.show({
      title: 'Create Report',
      message: `${reportType} saved successfully`,
      type: 'success'
    });
    return [displaySetInstanceUID];
  } catch (error) {
    uiNotificationService.show({
      title: 'Create Report',
      message: error.message || `Failed to store ${reportType}`,
      type: 'error'
    });
    throw new Error(`Failed to store ${reportType}. Error: ${error.message || 'Unknown error'}`);
  } finally {
    uiDialogService.hide('loading-dialog');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createReportAsync);

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

/***/ "../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _DataSourceConfigurationModalComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataSourceConfigurationModalComponent */ "../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




function DataSourceConfigurationComponent({
  servicesManager,
  extensionManager
}) {
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('DataSourceConfiguration');
  const {
    show,
    hide
  } = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useModal)();
  const {
    customizationService
  } = servicesManager.services;
  const [configurationAPI, setConfigurationAPI] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [configuredItems, setConfiguredItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let shouldUpdate = true;
    const dataSourceChangedCallback = async () => {
      const activeDataSourceDef = extensionManager.getActiveDataSourceDefinition();
      if (!activeDataSourceDef?.configuration?.configurationAPI) {
        return;
      }
      const {
        factory: configurationAPIFactory
      } = customizationService.getCustomization(activeDataSourceDef.configuration.configurationAPI) ?? {
        factory: () => null
      };
      if (!configurationAPIFactory) {
        return;
      }
      const configAPI = configurationAPIFactory(activeDataSourceDef.sourceName);
      setConfigurationAPI(configAPI);

      // New configuration API means that the existing configured items must be cleared.
      setConfiguredItems(null);
      configAPI.getConfiguredItems().then(list => {
        if (shouldUpdate) {
          setConfiguredItems(list);
        }
      });
    };
    const sub = extensionManager.subscribe(extensionManager.EVENTS.ACTIVE_DATA_SOURCE_CHANGED, dataSourceChangedCallback);
    dataSourceChangedCallback();
    return () => {
      shouldUpdate = false;
      sub.unsubscribe();
    };
  }, []);
  const showConfigurationModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    show({
      content: _DataSourceConfigurationModalComponent__WEBPACK_IMPORTED_MODULE_3__["default"],
      title: t('Configure Data Source'),
      contentProps: {
        configurationAPI,
        configuredItems,
        onHide: hide
      }
    });
  }, [configurationAPI, configuredItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!configurationAPI || !configuredItems) {
      return;
    }
    if (configuredItems.length !== configurationAPI.getItemLabels().length) {
      // Not the correct number of configured items, so show the modal to configure the data source.
      showConfigurationModal();
    }
  }, [configurationAPI, configuredItems, showConfigurationModal]);
  return configuredItems ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-aqua-pale flex items-center overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.Settings, {
    className: "mr-2.5 h-3.5 w-3.5 shrink-0 cursor-pointer",
    onClick: showConfigurationModal
  }), configuredItems.map((item, itemIndex) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: itemIndex,
      className: "flex overflow-hidden"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: itemIndex,
      className: "overflow-hidden text-ellipsis whitespace-nowrap"
    }, item.name), itemIndex !== configuredItems.length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "px-2.5"
    }, "|"));
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
}
_s(DataSourceConfigurationComponent, "bBg3JxcyiXWOlzlRoI7Z61H/OZk=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.useModal];
});
_c = DataSourceConfigurationComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceConfigurationComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "DataSourceConfigurationComponent");

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

/***/ "../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ItemListComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ItemListComponent */ "../../../extensions/default/src/Components/ItemListComponent.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();





const NO_WRAP_ELLIPSIS_CLASS_NAMES = 'text-ellipsis whitespace-nowrap overflow-hidden';
function DataSourceConfigurationModalComponent({
  configurationAPI,
  configuredItems,
  onHide
}) {
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('DataSourceConfiguration');
  const [itemList, setItemList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [selectedItems, setSelectedItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(configuredItems);
  const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [itemLabels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(configurationAPI.getItemLabels());

  // Determines whether to show the full/existing configuration for the data source.
  // A full or complete configuration is one where the data source (path) has the
  // maximum/required number of path items. Anything less is considered not complete and
  // the configuration starts from scratch (i.e. as if no items are configured at all).
  // TODO: consider configuration starting from a partial (i.e. non-empty) configuration
  const [showFullConfig, setShowFullConfig] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(itemLabels.length === configuredItems.length);

  /**
   * The index of the selected item that is considered current and for which
   * its sub-items should be displayed in the items list component. When the
   * full/existing configuration for a data source is to be shown, the current
   * selected item is the second to last in the `selectedItems` list.
   */
  const currentSelectedItemIndex = showFullConfig ? selectedItems.length - 2 : selectedItems.length - 1;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let shouldUpdate = true;
    setErrorMessage(null);

    // Clear out the former/old list while we fetch the next sub item list.
    setItemList(null);
    if (selectedItems.length === 0) {
      configurationAPI.initialize().then(items => {
        if (shouldUpdate) {
          setItemList(items);
        }
      }).catch(error => setErrorMessage(error.message));
    } else if (!showFullConfig && selectedItems.length === itemLabels.length) {
      // The last item to configure the data source (path) has been selected.
      configurationAPI.setCurrentItem(selectedItems[selectedItems.length - 1]);
      // We can hide the modal dialog now.
      onHide();
    } else {
      configurationAPI.setCurrentItem(selectedItems[currentSelectedItemIndex]).then(items => {
        if (shouldUpdate) {
          setItemList(items);
        }
      }).catch(error => setErrorMessage(error.message));
    }
    return () => {
      shouldUpdate = false;
    };
  }, [selectedItems, configurationAPI, onHide, itemLabels, showFullConfig, currentSelectedItemIndex]);
  const getSelectedItemCursorClasses = itemIndex => itemIndex !== itemLabels.length - 1 && itemIndex < selectedItems.length ? 'cursor-pointer' : 'cursor-auto';
  const getSelectedItemBackgroundClasses = itemIndex => itemIndex < selectedItems.length ? classnames__WEBPACK_IMPORTED_MODULE_0___default()('bg-black/[.4]', itemIndex !== itemLabels.length - 1 ? 'hover:bg-transparent active:bg-secondary-dark' : '') : 'bg-transparent';
  const getSelectedItemBorderClasses = itemIndex => itemIndex === currentSelectedItemIndex + 1 ? classnames__WEBPACK_IMPORTED_MODULE_0___default()('border-2', 'border-solid', 'border-primary-light') : itemIndex < selectedItems.length ? 'border border-solid border-primary-active hover:border-primary-light active:border-white' : 'border border-dashed border-secondary-light';
  const getSelectedItemTextClasses = itemIndex => itemIndex <= selectedItems.length ? 'text-primary-light' : 'text-primary';
  const getErrorComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "flex min-h-[1px] grow flex-col gap-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "text-primary-light text-[20px]"
    }, t(`Error fetching ${itemLabels[selectedItems.length]} list`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "grow bg-black p-4 text-[14px]"
    }, errorMessage));
  };
  const getSelectedItemsComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "flex gap-4"
    }, itemLabels.map((itemLabel, itemLabelIndex) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        key: itemLabel,
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('flex min-w-[1px] shrink basis-[200px] flex-col gap-1 rounded-md p-3.5', getSelectedItemCursorClasses(itemLabelIndex), getSelectedItemBackgroundClasses(itemLabelIndex), getSelectedItemBorderClasses(itemLabelIndex), getSelectedItemTextClasses(itemLabelIndex)),
        onClick: showFullConfig && itemLabelIndex < currentSelectedItemIndex || itemLabelIndex <= currentSelectedItemIndex ? () => {
          setShowFullConfig(false);
          setSelectedItems(theList => theList.slice(0, itemLabelIndex));
        } : undefined
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: "text- flex items-center gap-2"
      }, itemLabelIndex < selectedItems.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons.ByName, {
        name: "status-tracked"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons.ByName, {
        name: "status-untracked"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(NO_WRAP_ELLIPSIS_CLASS_NAMES)
      }, t(itemLabel))), itemLabelIndex < selectedItems.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('text-[14px] text-white', NO_WRAP_ELLIPSIS_CLASS_NAMES)
      }, selectedItems[itemLabelIndex].name) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null));
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex h-[calc(100vh-300px)] select-none flex-col gap-4 pt-0.5"
  }, getSelectedItemsComponent(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "h-0.5 w-full shrink-0 bg-black"
  }), errorMessage ? getErrorComponent() : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ItemListComponent__WEBPACK_IMPORTED_MODULE_4__["default"], {
    itemLabel: itemLabels[currentSelectedItemIndex + 1],
    itemList: itemList,
    onItemClicked: item => {
      setShowFullConfig(false);
      setSelectedItems(theList => [...theList.slice(0, currentSelectedItemIndex + 1), item]);
    }
  }));
}
_s(DataSourceConfigurationModalComponent, "4U1nWu0JHjOrcSK6xCxSs7RNCkQ=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = DataSourceConfigurationModalComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceConfigurationModalComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "DataSourceConfigurationModalComponent");

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

/***/ "../../../extensions/default/src/Components/ItemListComponent.tsx":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/Components/ItemListComponent.tsx ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();






function ItemListComponent({
  itemLabel,
  itemList,
  onItemClicked
}) {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('DataSourceConfiguration');
  const [filterValue, setFilterValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setFilterValue('');
  }, [itemList]);
  const LoadingIndicatorProgress = servicesManager.services.customizationService.getCustomization('ui.loadingIndicatorProgress');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex min-h-[1px] grow flex-col gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-primary-light text-[20px]"
  }, t(`Select ${itemLabel}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.InputFilterText, {
    className: "max-w-[40%] grow",
    value: filterValue,
    onDebounceChange: setFilterValue,
    placeholder: t(`Search ${itemLabel} list`)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "relative flex min-h-[1px] grow flex-col bg-black text-[14px]"
  }, itemList == null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LoadingIndicatorProgress, {
    className: 'h-full w-full'
  }) : itemList.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-primary-light flex h-full flex-col items-center justify-center px-6 py-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.ToolMagnify, {
    className: "mb-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, t(`No ${itemLabel} available`))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "bg-secondary-dark px-3 py-1.5 text-white"
  }, t(itemLabel)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "ohif-scrollbar overflow-auto"
  }, itemList.filter(item => !filterValue || item.name.toLowerCase().includes(filterValue.toLowerCase())).map(item => {
    const border = 'rounded border-transparent border-b-secondary-light border-[1px] hover:border-primary-light';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('hover:text-primary-light hover:bg-primary-dark group mx-2 flex items-center justify-between px-6 py-2', border),
      key: item.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
      onClick: () => onItemClicked(item),
      className: "invisible group-hover:visible",
      endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.ByName, {
        name: "arrow-left"
      })
    }, t('Select')));
  })))));
}
_s(ItemListComponent, "XggkBGR6VbNvbpnWolf/Ybec/lI=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem, react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = ItemListComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemListComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "ItemListComponent");

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

/***/ "../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx":
/*!******************************************************************************************!*\
  !*** ../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LineChartViewport)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const LineChartViewport = ({
  displaySets
}) => {
  const displaySet = displaySets[0];
  const {
    axis: chartAxis,
    series: chartSeries
  } = displaySet.instance.chartData;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.LineChart, {
    showLegend: true,
    legendWidth: 150,
    axis: {
      x: {
        label: chartAxis.x.label,
        indexRef: 0,
        type: 'x',
        range: {
          min: 0
        }
      },
      y: {
        label: chartAxis.y.label,
        indexRef: 1,
        type: 'y'
      }
    },
    series: chartSeries
  });
};
_c = LineChartViewport;

var _c;
__webpack_require__.$Refresh$.register(_c, "LineChartViewport");

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

/***/ "../../../extensions/default/src/Components/LineChartViewport/index.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/default/src/Components/LineChartViewport/index.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _LineChartViewport__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _LineChartViewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineChartViewport */ "../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx");
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

/***/ "../../../extensions/default/src/Components/MoreDropdownMenu.tsx":
/*!***********************************************************************!*\
  !*** ../../../extensions/default/src/Components/MoreDropdownMenu.tsx ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MoreDropdownMenu)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}




/**
 * The default sub-menu appearance and setup is defined here, but this can be
 * replaced by
 */
const getMenuItemsDefault = ({
  commandsManager,
  items,
  ...props
}) => {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    customizationService
  } = servicesManager.services;

  // This allows replacing the default child item for menus, whereas the entire
  // getMenuItems can also be replaced by providing it to the MoreDropdownMenu
  const menuContent = customizationService.getCustomization('ohif.menuContent');

  // Default menu item component if none is provided through customization

  const DefaultMenuItem = ({
    item
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuItem, {
    onClick: () => item.onClick({
      commandsManager,
      servicesManager,
      ...props
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, item.iconName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.ByName, {
    name: item.iconName
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, item.label)));
  const MenuItemComponent = menuContent?.content || DefaultMenuItem;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuContent, {
    hideWhenDetached: true,
    align: "start",
    onClick: e => {
      e.stopPropagation();
      e.preventDefault();
    }
  }, items?.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MenuItemComponent, _extends({
    key: item.id || `menu-item-${index}`,
    item: item,
    commandsManager: commandsManager,
    servicesManager: servicesManager
  }, props))));
};

/**
 * The component provides a ... sub-menu for various components which appears
 * on hover over the main component.
 *
 * @param bindProps - properties to define the sub-menu
 * @returns Component bound to the bindProps
 */
_s(getMenuItemsDefault, "9im43WjHHpYAdxqRAjz29gyfNeo=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem];
});
function MoreDropdownMenu(bindProps) {
  _s2();
  const {
    menuItemsKey,
    getMenuItems = getMenuItemsDefault,
    commandsManager
  } = bindProps;
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    customizationService
  } = servicesManager.services;
  const items = customizationService.getCustomization(menuItemsKey);
  if (!items?.length) {
    return null;
  }
  function BoundMoreDropdownMenu(props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuTrigger, {
      asChild: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "ghost",
      size: "icon",
      className: "hidden group-hover:inline-flex data-[state=open]:inline-flex",
      onClick: e => {
        e.preventDefault();
        e.stopPropagation();
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.More, null))), getMenuItems({
      ...props,
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      items
    }));
  }
  return BoundMoreDropdownMenu;
}
_s2(MoreDropdownMenu, "9im43WjHHpYAdxqRAjz29gyfNeo=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem];
});
_c = MoreDropdownMenu;
var _c;
__webpack_require__.$Refresh$.register(_c, "MoreDropdownMenu");

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

/***/ "../../../extensions/default/src/Components/ProgressDropdownWithService.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/Components/ProgressDropdownWithService.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgressDropdownWithService: () => (/* binding */ ProgressDropdownWithService)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();



const workflowStepsToDropdownOptions = (steps = []) => steps.map(step => ({
  label: step.name,
  value: step.id,
  info: step.info,
  activated: false,
  completed: false
}));
function ProgressDropdownWithService() {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    workflowStepsService
  } = servicesManager.services;
  const [activeStepId, setActiveStepId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(workflowStepsService.activeWorkflowStep?.id);
  const [dropdownOptions, setDropdownOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(workflowStepsToDropdownOptions(workflowStepsService.workflowSteps));
  const setCurrentAndPreviousOptionsAsCompleted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(currentOption => {
    if (currentOption.completed) {
      return;
    }
    setDropdownOptions(prevOptions => {
      const newOptionsState = [...prevOptions];
      const startIndex = newOptionsState.findIndex(option => option.value === currentOption.value);
      for (let i = startIndex; i >= 0; i--) {
        const option = newOptionsState[i];
        if (option.completed) {
          break;
        }
        newOptionsState[i] = {
          ...option,
          completed: true
        };
      }
      return newOptionsState;
    });
  }, []);
  const handleDropdownChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    selectedOption
  }) => {
    if (!selectedOption) {
      return;
    }

    // TODO: Steps should be marked as completed after user has
    // completed some action when required (not implemented)
    setCurrentAndPreviousOptionsAsCompleted(selectedOption);
    setActiveStepId(selectedOption.value);
  }, [setCurrentAndPreviousOptionsAsCompleted]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let timeoutId;
    if (activeStepId) {
      // We've used setTimeout to give it more time to update the UI since
      // create3DFilterableFromDataArray from Texture.js may take 600+ ms to run
      // when there is a new series to load in the next step but that resulted
      // in the followed React error when updating the content from left/right panels
      // and all component states were being lost:
      //   Error: Can't perform a React state update on an unmounted component
      workflowStepsService.setActiveWorkflowStep(activeStepId);
    }
    return () => clearTimeout(timeoutId);
  }, [activeStepId, workflowStepsService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe: unsubStepsChanged
    } = workflowStepsService.subscribe(workflowStepsService.EVENTS.STEPS_CHANGED, () => setDropdownOptions(workflowStepsToDropdownOptions(workflowStepsService.workflowSteps)));
    const {
      unsubscribe: unsubActiveStepChanged
    } = workflowStepsService.subscribe(workflowStepsService.EVENTS.ACTIVE_STEP_CHANGED, () => setActiveStepId(workflowStepsService.activeWorkflowStep.id));
    return () => {
      unsubStepsChanged();
      unsubActiveStepChanged();
    };
  }, [servicesManager, workflowStepsService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ProgressDropdown, {
    options: dropdownOptions,
    value: activeStepId,
    onChange: handleDropdownChange
  });
}
_s(ProgressDropdownWithService, "BzlacjvdYvSknXZFEz/eHbTOBfE=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem];
});
_c = ProgressDropdownWithService;
var _c;
__webpack_require__.$Refresh$.register(_c, "ProgressDropdownWithService");

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

/***/ "../../../extensions/default/src/Components/SidePanelWithServices.tsx":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/Components/SidePanelWithServices.tsx ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
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


const SidePanelWithServices = ({
  servicesManager,
  side,
  activeTabIndex: activeTabIndexProp,
  isExpanded,
  tabs: tabsProp,
  onOpen,
  onClose,
  ...props
}) => {
  _s();
  const panelService = servicesManager?.services?.panelService;

  // Tracks whether this SidePanel has been opened at least once since this SidePanel was inserted into the DOM.
  // Thus going to the Study List page and back to the viewer resets this flag for a SidePanel.
  const [sidePanelExpanded, setSidePanelExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isExpanded);
  const [activeTabIndex, setActiveTabIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(activeTabIndexProp ?? 0);
  const [closedManually, setClosedManually] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [tabs, setTabs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(tabsProp ?? panelService.getPanels(side));
  const handleActiveTabIndexChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    activeTabIndex
  }) => {
    setActiveTabIndex(activeTabIndex);
  }, []);
  const handleOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setSidePanelExpanded(true);
    onOpen?.();
  }, [onOpen]);
  const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setSidePanelExpanded(false);
    setClosedManually(true);
    onClose?.();
  }, [onClose]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidePanelExpanded(isExpanded);
  }, [isExpanded]);

  /** update the active tab index from outside */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setActiveTabIndex(activeTabIndexProp ?? 0);
  }, [activeTabIndexProp]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = panelService.subscribe(panelService.EVENTS.PANELS_CHANGED, panelChangedEvent => {
      if (panelChangedEvent.position !== side) {
        return;
      }
      setTabs(panelService.getPanels(side));
    });
    return () => {
      unsubscribe();
    };
  }, [panelService, side]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const activatePanelSubscription = panelService.subscribe(panelService.EVENTS.ACTIVATE_PANEL, activatePanelEvent => {
      if (sidePanelExpanded || activatePanelEvent.forceActive) {
        const tabIndex = tabs.findIndex(tab => tab.id === activatePanelEvent.panelId);
        if (tabIndex !== -1) {
          if (!closedManually) {
            setSidePanelExpanded(true);
          }
          setActiveTabIndex(tabIndex);
        }
      }
    });
    return () => {
      activatePanelSubscription.unsubscribe();
    };
  }, [tabs, sidePanelExpanded, panelService, closedManually]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SidePanel, _extends({}, props, {
    side: side,
    tabs: tabs,
    activeTabIndex: activeTabIndex,
    isExpanded: sidePanelExpanded,
    onOpen: handleOpen,
    onClose: handleClose,
    onActiveTabIndexChange: handleActiveTabIndexChange
  }));
};
_s(SidePanelWithServices, "nUlMQMp7BVbp6i/5g2z/tV+ryz0=");
_c = SidePanelWithServices;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidePanelWithServices);
var _c;
__webpack_require__.$Refresh$.register(_c, "SidePanelWithServices");

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

/***/ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContextMenuController)
/* harmony export */ });
/* harmony import */ var _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuItemsBuilder */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _ContextMenuController;


/**
 * The context menu controller is a helper class that knows how
 * to manage context menus based on the UI Customization Service.
 * There are a few parts to this:
 *    1. Basic controls to manage displaying and hiding context menus
 *    2. Menu selection services, which use the UI customization service
 *       to choose which menu to display
 *    3. Menu item adapter services to convert menu items into displayable and actionable items.
 *
 * The format for a menu is defined in the exported type MenuItem
 */
class ContextMenuController {
  constructor(servicesManager, commandsManager) {
    this.commandsManager = void 0;
    this.services = void 0;
    this.menuItems = void 0;
    this.services = servicesManager.services;
    this.commandsManager = commandsManager;
  }
  closeContextMenu() {
    this.services.uiDialogService.hide('context-menu');
  }

  /**
   * Figures out which context menu is appropriate to display and shows it.
   *
   * @param contextMenuProps - the context menu properties, see ./types.ts
   * @param viewportElement - the DOM element this context menu is related to
   * @param defaultPointsPosition - a default position to show the context menu
   */
  showContextMenu(contextMenuProps, viewportElement, defaultPointsPosition) {
    if (!this.services.uiDialogService) {
      console.warn('Unable to show dialog; no UI Dialog Service available.');
      return;
    }
    const {
      event,
      subMenu,
      menuId,
      menus,
      selectorProps
    } = contextMenuProps;
    if (!menus) {
      console.warn('No menus found for', menuId);
      return;
    }
    const {
      locking,
      visibility
    } = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation;
    const targetAnnotationId = selectorProps?.nearbyToolData?.annotationUID;
    if (targetAnnotationId) {
      const isLocked = locking.isAnnotationLocked(targetAnnotationId);
      const isVisible = visibility.isAnnotationVisible(targetAnnotationId);
      if (isLocked || !isVisible) {
        console.warn(`Annotation is ${isLocked ? 'locked' : 'not visible'}.`);
        return;
      }
    }
    const items = _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_0__.getMenuItems(selectorProps || contextMenuProps, event, menus, menuId);
    if (!items) {
      return;
    }
    const ContextMenu = this.services.customizationService.getCustomization('ui.contextMenu');
    this.services.uiDialogService.hide('context-menu');
    this.services.uiDialogService.show({
      id: 'context-menu',
      defaultPosition: ContextMenuController._getDefaultPosition(defaultPointsPosition, event?.detail || event, viewportElement),
      content: ContextMenu,
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      unstyled: true,
      contentProps: {
        items,
        selectorProps,
        menus,
        event,
        subMenu,
        eventData: event?.detail || event,
        onClose: () => {
          this.services.uiDialogService.hide('context-menu');
        },
        /**
         * Displays a sub-menu, removing this menu
         * @param {*} item
         * @param {*} itemRef
         * @param {*} subProps
         */
        onShowSubMenu: (item, itemRef, subProps) => {
          if (!itemRef.subMenu) {
            console.warn('No submenu defined for', item, itemRef, subProps);
            return;
          }
          this.showContextMenu({
            ...contextMenuProps,
            menuId: itemRef.subMenu
          }, viewportElement, defaultPointsPosition);
        },
        // Default is to run the specified commands.
        onDefault: (item, itemRef, subProps) => {
          this.commandsManager.run(item, {
            ...selectorProps,
            ...itemRef,
            subProps
          });
        }
      }
    });
  }
}
_ContextMenuController = ContextMenuController;
ContextMenuController.getDefaultPosition = () => {
  return {
    x: 0,
    y: 0
  };
};
ContextMenuController._getEventDefaultPosition = eventDetail => ({
  x: eventDetail?.currentPoints?.client[0] ?? eventDetail?.pageX,
  y: eventDetail?.currentPoints?.client[1] ?? eventDetail?.pageY
});
ContextMenuController._getElementDefaultPosition = element => {
  if (element) {
    const boundingClientRect = element.getBoundingClientRect();
    return {
      x: boundingClientRect.x,
      y: boundingClientRect.y
    };
  }
  return {
    x: undefined,
    y: undefined
  };
};
ContextMenuController._getCanvasPointsPosition = (points = [], element) => {
  const viewerPos = _ContextMenuController._getElementDefaultPosition(element);
  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const point = {
      x: points[pointIndex][0] || points[pointIndex]['x'],
      y: points[pointIndex][1] || points[pointIndex]['y']
    };
    if (_ContextMenuController._isValidPosition(point) && _ContextMenuController._isValidPosition(viewerPos)) {
      return {
        x: point.x + viewerPos.x,
        y: point.y + viewerPos.y
      };
    }
  }
};
ContextMenuController._isValidPosition = source => {
  return source && typeof source.x === 'number' && typeof source.y === 'number';
};
/**
 * Returns the context menu default position. It look for the positions of: canvasPoints (got from selected), event that triggers it, current viewport element
 */
ContextMenuController._getDefaultPosition = (canvasPoints, eventDetail, viewerElement) => {
  function* getPositionIterator() {
    yield _ContextMenuController._getCanvasPointsPosition(canvasPoints, viewerElement);
    yield _ContextMenuController._getEventDefaultPosition(eventDetail);
    yield _ContextMenuController._getElementDefaultPosition(viewerElement);
    yield _ContextMenuController.getDefaultPosition();
  }
  const positionIterator = getPositionIterator();
  let current = positionIterator.next();
  let position = current.value;
  while (!current.done) {
    position = current.value;
    if (_ContextMenuController._isValidPosition(position)) {
      positionIterator.return();
    }
    current = positionIterator.next();
  }
  return position;
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

/***/ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts":
/*!******************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adaptItem: () => (/* binding */ adaptItem),
/* harmony export */   findMenu: () => (/* binding */ findMenu),
/* harmony export */   findMenuById: () => (/* binding */ findMenuById),
/* harmony export */   findMenuDefault: () => (/* binding */ findMenuDefault),
/* harmony export */   getMenuItems: () => (/* binding */ getMenuItems)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Finds menu by menu id
 *
 * @returns Menu having the menuId
 */
function findMenuById(menus, menuId) {
  if (!menuId) {
    return;
  }
  return menus.find(menu => menu.id === menuId);
}

/**
 * Default finding menu method.  This method will go through
 * the list of menus until it finds the first one which
 * has no selector, OR has the selector, when applied to the
 * check props, return true.
 * The selectorProps are a set of provided properties which can be
 * passed into the selector function to determine when to display a menu.
 * For example, a selector function of:
 * `({displayset}) => displaySet?.SeriesDescription?.indexOf?.('Left')!==-1
 * would match series descriptions containing 'Left'.
 *
 * @param {Object[]} menus List of menus
 * @param {*} subProps
 * @returns
 */
function findMenuDefault(menus, subProps) {
  if (!menus) {
    return null;
  }
  return menus.find(menu => !menu.selector || menu.selector(subProps.selectorProps));
}

/**
 * Finds the menu to be used for different scenarios:
 * This will first look for a subMenu with the specified subMenuId
 * Next it will look for the first menu whose selector returns true.
 *
 * @param menus - List of menus
 * @param props - root props
 * @param menuIdFilter - menu id identifier (to be considered on selection)
 *      This is intended to support other types of filtering in the future.
 */
function findMenu(menus, props, menuIdFilter) {
  const {
    subMenu
  } = props;
  function* findMenuIterator() {
    yield findMenuById(menus, menuIdFilter || subMenu);
    yield findMenuDefault(menus, props);
  }
  const findIt = findMenuIterator();
  let current = findIt.next();
  let menu = current.value;
  while (!current.done) {
    menu = current.value;
    if (menu) {
      findIt.return();
    }
    current = findIt.next();
  }
  return menu;
}

/**
 * Returns the menu from a list of possible menus, based on the actual state of component props and tool data nearby.
 * This uses the findMenu command above to first find the appropriate
 * menu, and then it chooses the actual contents of that menu.
 * A menu item can be optional by implementing the 'selector',
 * which will be called with the selectorProps, and if it does not return true,
 * then the item is excluded.
 *
 * Other menus can be delegated to by setting the delegating value to
 * a string id for another menu.  That menu's content will replace the
 * current menu item (only if the item would be included).
 *
 * This allows single id menus to be chosen by id, but have varying contents
 * based on the delegated menus.
 *
 * Finally, for each item, the adaptItem call is made.  This allows
 * items to modify themselves before being displayed, such as
 * incorporating additional information from translation sources.
 * See the `test-mode` examples for details.
 *
 * @param selectorProps
 * @param {*} event event that originates the context menu
 * @param {*} menus List of menus
 * @param {*} menuIdFilter
 * @returns
 */
function getMenuItems(selectorProps, event, menus, menuIdFilter) {
  // Include both the check props and the ...check props as one is used
  // by the child menu and the other used by the selector function
  const subProps = {
    selectorProps,
    event
  };
  const menu = findMenu(menus, subProps, menuIdFilter);
  if (!menu) {
    return undefined;
  }
  if (!menu.items) {
    console.warn('Must define items in menu', menu);
    return [];
  }
  let menuItems = [];
  menu.items.forEach(item => {
    const {
      delegating,
      selector,
      subMenu
    } = item;
    if (!selector || selector(selectorProps)) {
      if (delegating) {
        menuItems = [...menuItems, ...getMenuItems(selectorProps, event, menus, subMenu)];
      } else {
        const toAdd = adaptItem(item, subProps);
        menuItems.push(toAdd);
      }
    }
  });
  return menuItems;
}

/**
 * Returns item adapted to be consumed by ContextMenu component
 * and then goes through the item to add action behaviour for clicking the item,
 * making it compatible with the default ContextMenu display.
 *
 * @param {Object} item
 * @param {Object} subProps
 * @returns a MenuItem that is compatible with the base ContextMenu
 *    This requires having a label and set of actions to be called.
 */
function adaptItem(item, subProps) {
  const newItem = {
    ...item,
    value: subProps.selectorProps?.value
  };
  if (item.actionType === 'ShowSubMenu' && !newItem.iconRight) {
    newItem.iconRight = 'chevron-down';
  }
  if (!item.action) {
    newItem.action = (itemRef, componentProps) => {
      const {
        event = {}
      } = componentProps;
      const {
        detail = {}
      } = event;
      newItem.element = detail.element;
      componentProps.onClose();
      const action = componentProps[`on${itemRef.actionType || 'Default'}`];
      if (action) {
        action.call(componentProps, newItem, itemRef, subProps);
      } else {
        console.warn('No action defined for', itemRef);
      }
    };
  }
  return newItem;
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

/***/ "../../../extensions/default/src/CustomizableContextMenu/index.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/index.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuController: () => (/* reexport safe */ _ContextMenuController__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ContextMenuItemsBuilder: () => (/* reexport module object */ _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   CustomizableContextMenuTypes: () => (/* reexport module object */ _types__WEBPACK_IMPORTED_MODULE_2__)
/* harmony export */ });
/* harmony import */ var _ContextMenuController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuController */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx");
/* harmony import */ var _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextMenuItemsBuilder */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../extensions/default/src/CustomizableContextMenu/types.ts");
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

/***/ "../../../extensions/default/src/CustomizableContextMenu/types.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/types.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts":
/*!***********************************************************************************************************!*\
  !*** ../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleCloudDataSourceConfigurationAPI: () => (/* binding */ GoogleCloudDataSourceConfigurationAPI)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * This file contains the implementations of BaseDataSourceConfigurationAPIItem
 * and BaseDataSourceConfigurationAPI for the Google cloud healthcare API. To
 * better understand this implementation and/or to implement custom implementations,
 * see the platform\core\src\types\DataSourceConfigurationAPI.ts and its JS doc
 * comments as a guide.
 */
/**
 * The various Google Cloud Healthcare path item types.
 */
var ItemType = /*#__PURE__*/function (ItemType) {
  ItemType[ItemType["projects"] = 0] = "projects";
  ItemType[ItemType["locations"] = 1] = "locations";
  ItemType[ItemType["datasets"] = 2] = "datasets";
  ItemType[ItemType["dicomStores"] = 3] = "dicomStores";
  return ItemType;
}(ItemType || {});
const initialUrl = 'https://cloudresourcemanager.googleapis.com/v1';
const baseHealthcareUrl = 'https://healthcare.googleapis.com/v1';
class GoogleCloudDataSourceConfigurationAPIItem {
  constructor() {
    this.id = void 0;
    this.name = void 0;
    this.url = void 0;
    this.itemType = void 0;
  }
}
class GoogleCloudDataSourceConfigurationAPI {
  constructor(dataSourceName, servicesManager, extensionManager) {
    this._extensionManager = void 0;
    this._fetchOptions = void 0;
    this._dataSourceName = void 0;
    this.getItemLabels = () => ['Project', 'Location', 'Data set', 'DICOM store'];
    this._dataSourceName = dataSourceName;
    this._extensionManager = extensionManager;
    const userAuthenticationService = servicesManager.services.userAuthenticationService;
    this._fetchOptions = {
      method: 'GET',
      headers: userAuthenticationService.getAuthorizationHeader()
    };
  }
  async initialize() {
    const url = `${initialUrl}/projects`;
    const projects = await GoogleCloudDataSourceConfigurationAPI._doFetch(url, ItemType.projects, this._fetchOptions);
    if (!projects?.length) {
      return [];
    }
    const projectItems = projects.map(project => {
      return {
        id: project.projectId,
        name: project.name,
        itemType: ItemType.projects,
        url: `${baseHealthcareUrl}/projects/${project.projectId}`
      };
    });
    return projectItems;
  }
  async setCurrentItem(anItem) {
    const googleCloudItem = anItem;
    if (googleCloudItem.itemType === ItemType.dicomStores) {
      // Last configurable item, so update the data source configuration.
      const url = `${googleCloudItem.url}/dicomWeb`;
      const dataSourceDefCopy = JSON.parse(JSON.stringify(this._extensionManager.getDataSourceDefinition(this._dataSourceName)));
      dataSourceDefCopy.configuration = {
        ...dataSourceDefCopy.configuration,
        wadoUriRoot: url,
        qidoRoot: url,
        wadoRoot: url
      };
      this._extensionManager.updateDataSourceConfiguration(dataSourceDefCopy.sourceName, dataSourceDefCopy.configuration);
      return [];
    }
    const subItemType = googleCloudItem.itemType + 1;
    const subItemField = `${ItemType[subItemType]}`;
    const url = `${googleCloudItem.url}/${subItemField}`;
    const fetchedSubItems = await GoogleCloudDataSourceConfigurationAPI._doFetch(url, subItemType, this._fetchOptions);
    if (!fetchedSubItems?.length) {
      return [];
    }
    const subItems = fetchedSubItems.map(subItem => {
      const nameSplit = subItem.name.split('/');
      return {
        id: subItem.name,
        name: nameSplit[nameSplit.length - 1],
        itemType: subItemType,
        url: `${baseHealthcareUrl}/${subItem.name}`
      };
    });
    return subItems;
  }
  async getConfiguredItems() {
    const dataSourceDefinition = this._extensionManager.getDataSourceDefinition(this._dataSourceName);
    const url = dataSourceDefinition.configuration.wadoUriRoot;
    const projectsIndex = url.indexOf('projects');
    // Split the configured URL into (essentially) pairs (i.e. item type followed by item)
    // Explicitly: ['projects','aProject','locations','aLocation','datasets','aDataSet','dicomStores','aDicomStore']
    // Note that a partial configuration will have a subset of the above.
    const urlSplit = url.substring(projectsIndex).split('/');
    const configuredItems = [];
    for (let itemType = 0;
    // the number of configured items is either the max (4) or the number extracted from the url split
    itemType < 4 && (itemType + 1) * 2 < urlSplit.length; itemType += 1) {
      if (itemType === ItemType.projects) {
        const projectId = urlSplit[1];
        const projectUrl = `${initialUrl}/projects/${projectId}`;
        const data = await GoogleCloudDataSourceConfigurationAPI._doFetch(projectUrl, ItemType.projects, this._fetchOptions);
        const project = data[0];
        configuredItems.push({
          id: project.projectId,
          name: project.name,
          itemType: itemType,
          url: `${baseHealthcareUrl}/projects/${project.projectId}`
        });
      } else {
        const relativePath = urlSplit.slice(0, itemType * 2 + 2).join('/');
        configuredItems.push({
          id: relativePath,
          name: urlSplit[itemType * 2 + 1],
          itemType: itemType,
          url: `${baseHealthcareUrl}/${relativePath}`
        });
      }
    }
    return configuredItems;
  }

  /**
   * Fetches an array of items the specified item type.
   * @param urlStr the fetch url
   * @param fetchItemType the type to fetch
   * @param fetchOptions the header options for the fetch (e.g. authorization header)
   * @param fetchSearchParams any search query params; currently only used for paging results
   * @returns an array of items of the specified type
   */
  static async _doFetch(urlStr, fetchItemType, fetchOptions = {}, fetchSearchParams = {}) {
    try {
      const url = new URL(urlStr);
      url.search = new URLSearchParams(fetchSearchParams).toString();
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      if (response.status >= 200 && response.status < 300 && data != null) {
        if (data.nextPageToken != null) {
          fetchSearchParams.pageToken = data.nextPageToken;
          const subPageData = await this._doFetch(urlStr, fetchItemType, fetchOptions, fetchSearchParams);
          data[ItemType[fetchItemType]] = data[ItemType[fetchItemType]].concat(subPageData);
        }
        if (data[ItemType[fetchItemType]]) {
          return data[ItemType[fetchItemType]];
        } else if (data.name) {
          return [data];
        } else {
          return [];
        }
      } else {
        const message = data?.error?.message || `Error returned from Google Cloud Healthcare: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }
    } catch (err) {
      const message = err?.message || 'Error occurred during fetch request.';
      throw new Error(message);
    }
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

/***/ "../../../extensions/default/src/DicomJSONDataSource/index.js":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/DicomJSONDataSource/index.js ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomJSONApi: () => (/* binding */ createDicomJSONApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "../../../node_modules/query-string/index.js");
/* harmony import */ var _DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DicomWebDataSource/utils/getImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js");
/* harmony import */ var _utils_getDirectURL__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getDirectURL */ "../../../extensions/default/src/utils/getDirectURL.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
const mappings = {
  studyInstanceUid: 'StudyInstanceUID',
  patientId: 'PatientID'
};
let _store = {
  urls: [],
  studyInstanceUIDMap: new Map() // map of urls to array of study instance UIDs
  // {
  //   url: url1
  //   studies: [Study1, Study2], // if multiple studies
  // }
  // {
  //   url: url2
  //   studies: [Study1],
  // }
  // }
};
function wrapSequences(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively wrap sequences for nested objects
      acc[key] = wrapSequences(obj[key]);
    } else {
      acc[key] = obj[key];
    }
    if (key.endsWith('Sequence')) {
      acc[key] = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].utils.addAccessors(acc[key]);
    }
    return acc;
  }, Array.isArray(obj) ? [] : {});
}
const getMetaDataByURL = url => {
  return _store.urls.find(metaData => metaData.url === url);
};
const findStudies = (key, value) => {
  let studies = [];
  _store.urls.map(metaData => {
    metaData.studies.map(aStudy => {
      if (aStudy[key] === value) {
        studies.push(aStudy);
      }
    });
  });
  return studies;
};
function createDicomJSONApi(dicomJsonConfig) {
  const implementation = {
    initialize: async ({
      query,
      url
    }) => {
      if (!url) {
        url = query.get('url');
      }
      let metaData = getMetaDataByURL(url);

      // if we have already cached the data from this specific url
      // We are only handling one StudyInstanceUID to run; however,
      // all studies for patientID will be put in the correct tab
      if (metaData) {
        return metaData.studies.map(aStudy => {
          return aStudy.StudyInstanceUID;
        });
      }
      const response = await fetch(url);
      const data = await response.json();
      let StudyInstanceUID;
      let SeriesInstanceUID;
      data.studies.forEach(study => {
        StudyInstanceUID = study.StudyInstanceUID;
        study.series.forEach(series => {
          SeriesInstanceUID = series.SeriesInstanceUID;
          series.instances.forEach(instance => {
            const {
              metadata: naturalizedDicom
            } = instance;
            const imageId = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
              instance,
              config: dicomJsonConfig
            });
            const {
              query
            } = query_string__WEBPACK_IMPORTED_MODULE_1__.parseUrl(instance.url);

            // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
            metadataProvider.addImageIdToUIDs(imageId, {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID: naturalizedDicom.SOPInstanceUID,
              frameNumber: query.frame ? parseInt(query.frame) : undefined
            });
          });
        });
      });
      _store.urls.push({
        url,
        studies: [...data.studies]
      });
      _store.studyInstanceUIDMap.set(url, data.studies.map(study => study.StudyInstanceUID));
    },
    query: {
      studies: {
        mapParams: () => {},
        search: async param => {
          const [key, value] = Object.entries(param)[0];
          const mappedParam = mappings[key];

          // todo: should fetch from dicomMetadataStore
          const studies = findStudies(mappedParam, value);
          return studies.map(aStudy => {
            return {
              accession: aStudy.AccessionNumber,
              date: aStudy.StudyDate,
              description: aStudy.StudyDescription,
              instances: aStudy.NumInstances,
              modalities: aStudy.Modalities,
              mrn: aStudy.PatientID,
              patientName: aStudy.PatientName,
              studyInstanceUid: aStudy.StudyInstanceUID,
              NumInstances: aStudy.NumInstances,
              time: aStudy.StudyTime
            };
          });
        },
        processResults: () => {
          console.warn(' DICOMJson QUERY processResults not implemented');
        }
      },
      series: {
        // mapParams: mapParams.bind(),
        search: () => {
          console.warn(' DICOMJson QUERY SERIES SEARCH not implemented');
        }
      },
      instances: {
        search: () => {
          console.warn(' DICOMJson QUERY instances SEARCH not implemented');
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {string} params.defaultPath path for the pixel data url
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @param {string} params.fetchPart unknown?
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return (0,_utils_getDirectURL__WEBPACK_IMPORTED_MODULE_3__["default"])(dicomJsonConfig, params);
      },
      series: {
        metadata: async ({
          filters,
          StudyInstanceUID,
          madeInClient = false,
          customSort
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
          let series;
          if (customSort) {
            series = customSort(study.series);
          } else {
            series = study.series;
          }
          const seriesKeys = ['SeriesInstanceUID', 'SeriesInstanceUIDs', 'seriesInstanceUID', 'seriesInstanceUIDs'];
          const seriesFilter = seriesKeys.find(key => filters[key]);
          if (seriesFilter) {
            const seriesUIDs = filters[seriesFilter];
            series = series.filter(s => seriesUIDs.includes(s.SeriesInstanceUID));
          }
          const seriesSummaryMetadata = series.map(series => {
            const seriesSummary = {
              StudyInstanceUID: study.StudyInstanceUID,
              ...series
            };
            delete seriesSummary.instances;
            return seriesSummary;
          });

          // Async load series, store as retrieved
          function storeInstances(naturalizedInstances) {
            _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
          }
          _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
          function setSuccessFlag() {
            const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);
            study.isLoaded = true;
          }
          const numberOfSeries = series.length;
          series.forEach((series, index) => {
            const instances = series.instances.map(instance => {
              // for instance.metadata if the key ends with sequence then
              // we need to add a proxy to the first item in the sequence
              // so that we can access the value of the sequence
              // by using sequenceName.value
              const modifiedMetadata = wrapSequences(instance.metadata);
              const obj = {
                ...modifiedMetadata,
                url: instance.url,
                imageId: (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
                  instance,
                  config: dicomJsonConfig
                }),
                ...series,
                ...study
              };
              delete obj.instances;
              delete obj.series;
              return obj;
            });
            storeInstances(instances);
            if (index === numberOfSeries - 1) {
              setSuccessFlag();
            }
          });
        }
      }
    },
    store: {
      dicom: () => {
        console.warn(' DICOMJson store dicom not implemented');
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = displaySet;
      const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
      const series = study.series.find(s => s.SeriesInstanceUID === SeriesInstanceUID) || [];
      const instanceMap = new Map();
      series.instances.forEach(instance => {
        if (instance?.metadata?.SOPInstanceUID) {
          const {
            metadata,
            url
          } = instance;
          const existingInstances = instanceMap.get(metadata.SOPInstanceUID) || [];
          existingInstances.push({
            ...metadata,
            url
          });
          instanceMap.set(metadata.SOPInstanceUID, existingInstances);
        }
      });
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames || 1;
        const instances = instanceMap.get(instance.SOPInstanceUID) || [instance];
        for (let i = 0; i < NumberOfFrames; i++) {
          const imageId = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
            instance: instances[Math.min(i, instances.length - 1)],
            frame: NumberOfFrames > 1 ? i : undefined,
            config: dicomJsonConfig
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame
    }) {
      const imageIds = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
        instance,
        frame
      });
      return imageIds;
    },
    getStudyInstanceUIDs: ({
      params,
      query
    }) => {
      const url = query.get('url');
      return _store.studyInstanceUIDMap.get(url);
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/DicomLocalDataSource/index.js":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/DicomLocalDataSource/index.js ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomLocalApi: () => (/* binding */ createDicomLocalApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
const {
  EVENTS
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore;
const END_MODALITIES = {
  SR: true,
  SEG: true,
  DOC: true
};
const compareValue = (v1, v2, def = 0) => {
  if (v1 === v2) {
    return def;
  }
  if (v1 < v2) {
    return -1;
  }
  return 1;
};

// Sorting SR modalities to be at the end of series list
const customSort = (seriesA, seriesB) => {
  const instanceA = seriesA.instances[0];
  const instanceB = seriesB.instances[0];
  const modalityA = instanceA.Modality;
  const modalityB = instanceB.Modality;
  const isEndA = END_MODALITIES[modalityA];
  const isEndB = END_MODALITIES[modalityB];
  if (isEndA && isEndB) {
    // Compare by series date
    return compareValue(instanceA.SeriesNumber, instanceB.SeriesNumber);
  }
  if (!isEndA && !isEndB) {
    return compareValue(instanceB.SeriesNumber, instanceA.SeriesNumber);
  }
  return isEndA ? -1 : 1;
};
function createDicomLocalApi(dicomLocalConfig) {
  const {
    name
  } = dicomLocalConfig;
  const implementation = {
    initialize: ({
      params,
      query
    }) => {},
    query: {
      studies: {
        mapParams: () => {},
        search: params => {
          const studyUIDs = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudyInstanceUIDs();
          return studyUIDs.map(StudyInstanceUID => {
            let numInstances = 0;
            const modalities = new Set();

            // Calculating the number of instances in the study and modalities
            // present in the study
            const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
            study.series.forEach(aSeries => {
              numInstances += aSeries.instances.length;
              modalities.add(aSeries.instances[0].Modality);
            });

            // first instance in the first series
            const firstInstance = study?.series[0]?.instances[0];
            if (firstInstance) {
              return {
                accession: firstInstance.AccessionNumber,
                date: firstInstance.StudyDate,
                description: firstInstance.StudyDescription,
                mrn: firstInstance.PatientID,
                patientName: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(firstInstance.PatientName),
                studyInstanceUid: firstInstance.StudyInstanceUID,
                time: firstInstance.StudyTime,
                //
                instances: numInstances,
                modalities: Array.from(modalities).join('/'),
                NumInstances: numInstances
              };
            }
          });
        },
        processResults: () => {
          console.warn(' DICOMLocal QUERY processResults not implemented');
        }
      },
      series: {
        search: studyInstanceUID => {
          const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(studyInstanceUID);
          return study.series.map(aSeries => {
            const firstInstance = aSeries?.instances[0];
            return {
              studyInstanceUid: studyInstanceUID,
              seriesInstanceUid: firstInstance.SeriesInstanceUID,
              modality: firstInstance.Modality,
              seriesNumber: firstInstance.SeriesNumber,
              seriesDate: firstInstance.SeriesDate,
              numSeriesInstances: aSeries.instances.length,
              description: firstInstance.SeriesDescription
            };
          });
        }
      },
      instances: {
        search: () => {
          console.warn(' DICOMLocal QUERY instances SEARCH not implemented');
        }
      }
    },
    retrieve: {
      directURL: params => {
        const {
          instance,
          tag,
          defaultType
        } = params;
        const value = instance[tag];
        if (value instanceof Array && value[0] instanceof ArrayBuffer) {
          return URL.createObjectURL(new Blob([value[0]], {
            type: defaultType
          }));
        }
      },
      series: {
        metadata: async ({
          StudyInstanceUID,
          madeInClient = false
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }

          // Instances metadata already added via local upload
          const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);

          // Series metadata already added via local upload
          _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore._broadcastEvent(EVENTS.SERIES_ADDED, {
            StudyInstanceUID,
            madeInClient
          });
          study.series.forEach(aSeries => {
            const {
              SeriesInstanceUID
            } = aSeries;
            const isMultiframe = aSeries.instances[0].NumberOfFrames > 1;
            aSeries.instances.forEach((instance, index) => {
              const {
                url: imageId,
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID
              } = instance;
              instance.imageId = imageId;

              // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
              metadataProvider.addImageIdToUIDs(imageId, {
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID,
                frameIndex: isMultiframe ? index : 1
              });
            });
            _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore._broadcastEvent(EVENTS.INSTANCES_ADDED, {
              StudyInstanceUID,
              SeriesInstanceUID,
              madeInClient
            });
          });
        }
      }
    },
    store: {
      dicom: naturalizedReport => {
        const reportBlob = dcmjs__WEBPACK_IMPORTED_MODULE_1__["default"].data.datasetToBlob(naturalizedReport);

        //Create a URL for the binary.
        var objectUrl = URL.createObjectURL(reportBlob);
        window.location.assign(objectUrl);
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          // in multiframe we start at frame 1
          for (let i = 1; i <= NumberOfFrames; i++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame: i
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame
    }) {
      // Important: Never use instance.imageId because it might be multiframe,
      // which would make it an invalid imageId.
      // if (instance.imageId) {
      //   return instance.imageId;
      // }

      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = instance;
      const SOPInstanceUID = instance.SOPInstanceUID || instance.SopInstanceUID;
      const storedInstance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getInstance(StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID);
      let imageId = storedInstance.url;
      if (frame !== undefined) {
        imageId += `&frame=${frame}`;
      }
      return imageId;
    },
    deleteStudyMetadataPromise() {
      console.log('deleteStudyMetadataPromise not implemented');
    },
    getStudyInstanceUIDs: ({
      params,
      query
    }) => {
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = query.getAll('StudyInstanceUIDs');
      const StudyInstanceUIDs = queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];

      // Put SRs at the end of series list to make sure images are loaded first
      let isStudyInCache = false;
      StudyInstanceUIDsAsArray.forEach(StudyInstanceUID => {
        const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
        if (study) {
          study.series = study.series.sort(customSort);
          isStudyInCache = true;
        }
      });
      return isStudyInCache ? StudyInstanceUIDsAsArray : [];
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "../../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _DicomTagTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DicomTagTable */ "../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
/* harmony import */ var _DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DicomTagBrowser.css */ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");
/* harmony import */ var _DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_6__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();








let rowCounter = 0;
const generateRowId = () => `row_${++rowCounter}`;
const {
  ImageSet
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.classes;
const {
  DicomMetaDictionary
} = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data;
const {
  nameMap
} = DicomMetaDictionary;
const DicomTagBrowser = ({
  displaySets,
  displaySetInstanceUID
}) => {
  _s();
  const [selectedDisplaySetInstanceUID, setSelectedDisplaySetInstanceUID] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(displaySetInstanceUID);
  const [instanceNumber, setInstanceNumber] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
  const [shouldShowInstanceList, setShouldShowInstanceList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [filterValue, setFilterValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const onSelectChange = value => {
    setSelectedDisplaySetInstanceUID(value.value);
    setInstanceNumber(1);
  };
  const activeDisplaySet = displaySets.find(ds => ds.displaySetInstanceUID === selectedDisplaySetInstanceUID);
  const displaySetList = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    displaySets.sort((a, b) => a.SeriesNumber - b.SeriesNumber);
    return displaySets.map(displaySet => {
      const {
        displaySetInstanceUID,
        SeriesDate,
        SeriesTime,
        SeriesNumber,
        SeriesDescription,
        Modality
      } = displaySet;

      /* Map to display representation */
      const dateStr = `${SeriesDate}:${SeriesTime}`.split('.')[0];
      const date = moment__WEBPACK_IMPORTED_MODULE_1___default()(dateStr, 'YYYYMMDD:HHmmss');
      const displayDate = date.format('ddd, MMM Do YYYY');
      return {
        value: displaySetInstanceUID,
        label: `${SeriesNumber} (${Modality}):  ${SeriesDescription}`,
        description: displayDate
      };
    });
  }, [displaySets]);
  const getMetadata = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(isImageStack => {
    if (isImageStack) {
      return activeDisplaySet.images[instanceNumber - 1];
    }
    return activeDisplaySet.instance || activeDisplaySet;
  }, [activeDisplaySet, instanceNumber]);
  const rows = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const isImageStack = activeDisplaySet instanceof ImageSet;
    const metadata = getMetadata(isImageStack);
    setShouldShowInstanceList(isImageStack && activeDisplaySet.images.length > 1);
    const tags = getSortedTags(metadata);
    const rows = getFormattedRowsFromTags({
      tags,
      metadata
    });
    return rows;
  }, [getMetadata, activeDisplaySet]);
  const filteredRows = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    if (!filterValue) {
      return rows;
    }
    const matchedRowIds = new Set();
    const propertiesToCheck = ['tag', 'valueRepresentation', 'keyword', 'value'];
    const setIsMatched = row => {
      const isDirectMatch = propertiesToCheck.some(propertyName => row[propertyName]?.toLowerCase().includes(filterValueLowerCase));
      if (!isDirectMatch) {
        return;
      }
      matchedRowIds.add(row.uid);
      [...(row.parents ?? []), ...(row.children ?? [])].forEach(uid => matchedRowIds.add(uid));
    };
    const filterValueLowerCase = filterValue.toLowerCase();
    rows.forEach(setIsMatched);
    return rows.filter(row => matchedRowIds.has(row.uid));
  }, [rows, filterValue]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "dicom-tag-browser-content bg-muted"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "mb-6 flex flex-row items-start pl-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "flex w-full flex-row items-start gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "flex w-1/3 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
    className: "text-muted-foreground flex h-6 items-center pb-2 text-base"
  }, "Series"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Select, {
    value: selectedDisplaySetInstanceUID,
    onValueChange: value => onSelectChange({
      value
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.SelectTrigger, null, displaySetList.find(ds => ds.value === selectedDisplaySetInstanceUID)?.label || 'Select Series'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.SelectContent, null, displaySetList.map(item => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.SelectItem, {
      key: item.value,
      value: item.value
    }, item.label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
      className: "text-muted-foreground ml-1 text-xs"
    }, item.description));
  })))), shouldShowInstanceList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "mx-auto mt-0.5 flex w-1/4 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
    className: "text-muted-foreground flex h-6 items-center pb-2 text-base"
  }, "Instance Number (", instanceNumber, " of ", activeDisplaySet?.images?.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Slider, {
    value: [instanceNumber],
    onValueChange: ([value]) => {
      setInstanceNumber(value);
    },
    min: 1,
    max: activeDisplaySet?.images?.length,
    step: 1,
    className: "pt-4"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "ml-auto mr-1 flex w-1/3 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
    className: "text-muted-foreground flex h-6 items-center pb-2 text-base"
  }, "Search metadata"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.InputFilter, {
    className: "text-muted-foreground",
    onChange: setFilterValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.InputFilter.SearchIcon, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.InputFilter.Input, {
    placeholder: "Search metadata",
    className: "pl-9 pr-9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.InputFilter.ClearButton, {
    className: "text-primary mr-0.5 p-0.5"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_DicomTagTable__WEBPACK_IMPORTED_MODULE_5__["default"], {
    rows: filteredRows
  }));
};
_s(DicomTagBrowser, "qxprW3iOUY3atv04sWS4QqkrpIY=");
_c = DicomTagBrowser;
function getFormattedRowsFromTags({
  tags,
  metadata
}) {
  const rows = [];
  const stack = [{
    tags,
    depth: 0,
    parents: null,
    index: 0,
    children: []
  }];
  const parentChildMap = new Map();
  while (stack.length > 0) {
    const current = stack.pop();
    const {
      tags,
      depth,
      parents,
      index,
      children
    } = current;
    for (let i = index; i < tags.length; i++) {
      const tagInfo = tags[i];
      const uid = tagInfo.uid ?? generateRowId();
      if (parents?.length > 0) {
        parents.forEach(parent => {
          parentChildMap.get(parent).push(uid);
        });
      }
      if (tagInfo.vr === 'SQ') {
        const row = {
          uid,
          tag: tagInfo.tag,
          valueRepresentation: tagInfo.vr,
          keyword: tagInfo.keyword,
          value: '',
          depth,
          isVisible: true,
          areChildrenVisible: true,
          children: [],
          parents
        };
        rows.push(row);
        parentChildMap.set(uid, row.children);
        const newParents = parents ? [...parents, uid] : [uid];
        if (tagInfo.values.length > 0) {
          stack.push({
            tags,
            depth,
            parents,
            index: i + 1,
            children
          });
          for (let j = tagInfo.values.length - 1, values = tagInfo.values[j]; j >= 0; values = tagInfo.values[--j]) {
            const itemUid = generateRowId();
            stack.push({
              tags: values,
              depth: depth + 2,
              parents: [...newParents, itemUid],
              index: 0,
              children: []
            });
            const itemTagInfo = {
              tags: [{
                tag: '(FFFE,E000)',
                vr: '',
                keyword: `Item #${j}`,
                value: '',
                uid: itemUid
              }],
              depth: depth + 1,
              parents: newParents,
              index: 0,
              children: []
            };
            stack.push(itemTagInfo);
            parentChildMap.set(itemUid, itemTagInfo.children);
          }
          break;
        }
      } else {
        if (tagInfo.vr === 'xs') {
          try {
            const tag = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.Tag.fromPString(tagInfo.tag).toCleanString();
            const originalTagInfo = metadata[tag];
            tagInfo.vr = originalTagInfo.vr;
          } catch (error) {
            console.warn(`Failed to parse value representation for tag '${tagInfo.keyword}'`);
          }
        }
        const row = {
          uid,
          tag: tagInfo.tag,
          valueRepresentation: tagInfo.vr,
          keyword: tagInfo.keyword,
          value: tagInfo.value,
          depth,
          isVisible: true,
          parents
        };
        rows.push(row);
        if (row.tag === '(FFFE,E000)') {
          row.areChildrenVisible = true;
          row.children = [];
        }
      }
    }
  }
  return rows;
}
function getSortedTags(metadata) {
  const tagList = getRows(metadata);

  // Sort top level tags, sequence groups are sorted when created.
  _sortTagList(tagList);
  return tagList;
}
function getRows(metadata, depth = 0) {
  // Tag, Type, Value, Keyword

  const keywords = Object.keys(metadata);
  const rows = [];
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    if (keyword === '_vrMap') {
      continue;
    }
    const tagInfo = nameMap[keyword];
    let value = metadata[keyword];
    if (tagInfo && tagInfo.vr === 'SQ') {
      const sequenceAsArray = toArray(value);

      // Push line defining the sequence

      const sequence = {
        tag: tagInfo.tag,
        vr: tagInfo.vr,
        keyword,
        values: []
      };
      rows.push(sequence);
      if (value === null) {
        // Type 2 Sequence
        continue;
      }
      sequenceAsArray.forEach(item => {
        const sequenceRows = getRows(item, depth + 1);
        if (sequenceRows.length) {
          // Sort the sequence group.
          _sortTagList(sequenceRows);
          sequence.values.push(sequenceRows);
        }
      });
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] != 'object') {
        value = value.join('\\');
      }
    }
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof value !== 'string') {
      if (value === null) {
        value = ' ';
      } else {
        if (typeof value === 'object') {
          if (value.InlineBinary) {
            value = 'Inline Binary';
          } else if (value.BulkDataURI) {
            value = `Bulk Data URI`; //: ${value.BulkDataURI}`;
          } else if (value.Alphabetic) {
            value = value.Alphabetic;
          } else {
            console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
            console.warn(value);
            value = ' ';
          }
        } else {
          console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
          value = ' ';
        }
      }
    }

    // tag / vr/ keyword/ value

    // Remove retired tags
    keyword = keyword.replace('RETIRED_', '');
    if (tagInfo) {
      rows.push({
        tag: tagInfo.tag,
        vr: tagInfo.vr,
        keyword,
        value
      });
    } else {
      // skip properties without hex tag numbers
      const regex = /[0-9A-Fa-f]{6}/g;
      if (keyword.match(regex)) {
        const tag = `(${keyword.substring(0, 4)},${keyword.substring(4, 8)})`;
        rows.push({
          tag,
          vr: '',
          keyword: 'Private Tag',
          value
        });
      }
    }
  }
  return rows;
}
function toArray(objectOrArray) {
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}
function _sortTagList(tagList) {
  tagList.sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    }
    return 1;
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DicomTagBrowser);
var _c;
__webpack_require__.$Refresh$.register(_c, "DicomTagBrowser");

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

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-window */ "../../../node_modules/react-window/dist/index.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature(),
  _s3 = __webpack_require__.$Refresh$.signature();





const lineHeightPx = 20;
const lineHeightClassName = `leading-[${lineHeightPx}px]`;
const rowVerticalPaddingPx = 10;
const rowBottomBorderPx = 1;
const rowVerticalPaddingStyle = {
  padding: `${rowVerticalPaddingPx}px 0`
};
const rowStyle = {
  borderBottomWidth: `${rowBottomBorderPx}px`,
  ...rowVerticalPaddingStyle
};
const indentationPadding = 8;
const RowComponent = ({
  row,
  style,
  keyPrefix,
  onToggle
}) => {
  _s();
  const handleToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    onToggle(!row.areChildrenVisible);
  }, [row.areChildrenVisible, onToggle]);
  const hasChildren = row.children && row.children.length > 0;
  const isChildOrParent = hasChildren || row.depth > 0;
  const padding = indentationPadding * (1 + 2 * row.depth);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      ...style,
      ...rowStyle
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('hover:bg-secondary-main border-secondary-light text-foreground flex w-full flex-row items-center break-all bg-black text-base transition duration-300', lineHeightClassName),
    key: keyPrefix
  }, isChildOrParent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      paddingLeft: `${padding}px`,
      opacity: onToggle ? 1 : 0
    }
  }, row.areChildrenVisible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cursor-pointer p-1",
    onClick: handleToggle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Icons.ChevronDown, null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cursor-pointer p-1",
    onClick: handleToggle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_4__.Icons.ChevronRight, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-4/24 px-3"
  }, row.tag), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-2/24 px-3"
  }, row.valueRepresentation), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-6/24 px-3"
  }, row.keyword), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-5/24 grow px-3"
  }, row.value));
};
_s(RowComponent, "ZlkaYGR3P75MlG1Y6zRKbNQ3VWg=");
_c = RowComponent;
function ColumnHeaders({
  tagRef,
  vrRef,
  keywordRef,
  valueRef
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('bg-secondary-dark ohif-scrollbar flex w-full flex-row overflow-y-scroll'),
    style: rowVerticalPaddingStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-4/24 px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: tagRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Tag"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-2/24 px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: vrRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "VR"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-6/24 px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: keywordRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Keyword"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-5/24 grow px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: valueRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Value"))));
}
_c2 = ColumnHeaders;
function DicomTagTable({
  rows
}) {
  _s3();
  const listRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [tagHeaderElem, setTagHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [vrHeaderElem, setVrHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [keywordHeaderElem, setKeywordHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [valueHeaderElem, setValueHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [internalRows, setInternalRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(rows);

  // Here the refs are inturn stored in state to trigger a render of the table.
  // This virtualized table does NOT render until the header is rendered because the header column widths are used to determine the row heights in the table.
  // Therefore whenever the refs change (in particular the first time the refs are set), we want to trigger a render of the table.
  const tagRef = elem => {
    if (elem) {
      setTagHeaderElem(elem);
    }
  };
  const vrRef = elem => {
    if (elem) {
      setVrHeaderElem(elem);
    }
  };
  const keywordRef = elem => {
    if (elem) {
      setKeywordHeaderElem(elem);
    }
  };
  const valueRef = elem => {
    if (elem) {
      setValueHeaderElem(elem);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setInternalRows(rows);
  }, [rows]);
  const visibleRows = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return internalRows.filter(row => row.isVisible);
  }, [internalRows]);

  /**
   * When new rows are set, scroll to the top and reset the virtualization.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!listRef?.current) {
      return;
    }
    listRef.current.scrollTo(0);
    listRef.current.resetAfterIndex(0);
  }, [rows]);

  /**
   * When the browser window resizes, update the row virtualization (i.e. row heights)
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const debouncedResize = lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(() => listRef.current.resetAfterIndex(0), 100);
    window.addEventListener('resize', debouncedResize);
    return () => {
      debouncedResize.cancel();
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);
  const getOneRowHeight = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(row => {
    const headerWidths = [tagHeaderElem.offsetWidth, vrHeaderElem.offsetWidth, keywordHeaderElem.offsetWidth, valueHeaderElem.offsetWidth];
    const context = canvasRef.current.getContext('2d');
    context.font = getComputedStyle(canvasRef.current).font;
    const propertiesToCheck = ['tag', 'valueRepresentation', 'keyword', 'value'];
    return Object.entries(row).filter(([key]) => propertiesToCheck.includes(key)).map(([, colText], index) => {
      const colOneLineWidth = context.measureText(colText).width;
      const numLines = Math.ceil(colOneLineWidth / headerWidths[index]);
      return numLines * lineHeightPx + 2 * rowVerticalPaddingPx + rowBottomBorderPx;
    }).reduce((maxHeight, colHeight) => Math.max(maxHeight, colHeight), 0);
  }, [keywordHeaderElem, tagHeaderElem, valueHeaderElem, vrHeaderElem]);

  /**
   * Get the item/row size. We use the header column widths to calculate the various row heights.
   * @param index the row index
   * @returns the row height
   */
  const getItemSize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(rows => index => {
    const row = rows[index];
    const height = getOneRowHeight(row);
    return height;
  }, [getOneRowHeight]);
  const onToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(sourceRow => {
    if (!sourceRow.children) {
      return undefined;
    }
    return areChildrenVisible => {
      const newInternalRows = internalRows.map(internalRow => {
        if (sourceRow.uid === internalRow.uid) {
          return {
            ...internalRow,
            areChildrenVisible
          };
        }
        if (sourceRow.children.includes(internalRow.uid)) {
          return {
            ...internalRow,
            isVisible: areChildrenVisible,
            areChildrenVisible
          };
        }
        return internalRow;
      });
      setInternalRows(newInternalRows);
      listRef?.current?.resetAfterIndex(0);
    };
  }, [internalRows, listRef]);
  const getRowComponent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    rows
  }) => {
    var _s2 = __webpack_require__.$Refresh$.signature();
    return _s2(function RowList({
      index,
      style
    }) {
      _s2();
      const row = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => rows[index], [index]);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RowComponent, {
        style: style,
        row: row,
        keyPrefix: `DICOMTagRow-${index}`,
        onToggle: onToggle(row)
      });
    }, "M0k6ONFHO+ufYwPxQo4/XQCy3KU=");
  }, [onToggle]);

  /**
   * Whenever any one of the column headers is set, then the header is rendered.
   * Here we chose the tag header.
   */
  const isHeaderRendered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => tagHeaderElem !== null, [tagHeaderElem]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    style: {
      visibility: 'hidden',
      position: 'absolute'
    },
    className: "text-base",
    ref: canvasRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ColumnHeaders, {
    tagRef: tagRef,
    vrRef: vrRef,
    keywordRef: keywordRef,
    valueRef: valueRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative m-auto border-2 border-black bg-black",
    style: {
      height: '32rem'
    }
  }, isHeaderRendered() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_window__WEBPACK_IMPORTED_MODULE_1__.VariableSizeList, {
    ref: listRef,
    height: 500,
    itemCount: visibleRows.length,
    itemSize: getItemSize(visibleRows),
    width: '100%',
    className: "ohif-scrollbar text-foreground"
  }, getRowComponent({
    rows: visibleRows
  }))));
}
_s3(DicomTagTable, "TTfamYspc+jS4GzlVZuScJgdlHw=");
_c3 = DicomTagTable;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/_c4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(DicomTagTable));
var _c, _c2, _c3, _c4;
__webpack_require__.$Refresh$.register(_c, "RowComponent");
__webpack_require__.$Refresh$.register(_c2, "ColumnHeaders");
__webpack_require__.$Refresh$.register(_c3, "DicomTagTable");
__webpack_require__.$Refresh$.register(_c4, "%default%");

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

/***/ "../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(wadoRoot, getAuthrorizationHeader) {
  return {
    series: (StudyInstanceUID, SeriesInstanceUID) => {
      return new Promise((resolve, reject) => {
        // Reject because of Quality. (Seems the most sensible out of the options)
        const CodeValueAndCodeSchemeDesignator = `113001%5EDCM`;
        const url = `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/reject/${CodeValueAndCodeSchemeDesignator}`;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        const headers = getAuthrorizationHeader();
        for (const key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }

        //Send the proper header information along with the request
        // TODO -> Auth when we re-add authorization.

        console.log(xhr);
        xhr.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr.readyState == 4) {
            switch (xhr.status) {
              case 204:
                resolve(xhr.responseText);
                break;
              case 404:
                reject('Your dataSource does not support reject functionality');
            }
          }
        };
        xhr.send();
      });
    }
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

/***/ "../../../extensions/default/src/DicomWebDataSource/index.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/index.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomWebApi: () => (/* binding */ createDicomWebApi)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _qido_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qido.js */ "../../../extensions/default/src/DicomWebDataSource/qido.js");
/* harmony import */ var _dcm4cheeReject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dcm4cheeReject.js */ "../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js");
/* harmony import */ var _utils_getImageId_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getImageId.js */ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./retrieveStudyMetadata.js */ "../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
/* harmony import */ var _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/StaticWadoClient */ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts");
/* harmony import */ var _utils_getDirectURL__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/getDirectURL */ "../../../extensions/default/src/utils/getDirectURL.ts");
/* harmony import */ var _utils_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");











const {
  DicomMetaDictionary,
  DicomDict
} = dcmjs__WEBPACK_IMPORTED_MODULE_5__["default"].data;
const {
  naturalizeDataset,
  denaturalizeDataset
} = DicomMetaDictionary;
const ImplementationClassUID = '2.25.270695996825855179949881587723571202391.2.0.0';
const ImplementationVersionName = 'OHIF-VIEWER-2.0.0';
const EXPLICIT_VR_LITTLE_ENDIAN = '1.2.840.10008.1.2.1';
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes.MetadataProvider;
/**
 * Creates a DICOM Web API based on the provided configuration.
 *
 * @param dicomWebConfig - Configuration for the DICOM Web API
 * @returns DICOM Web API object
 */
function createDicomWebApi(dicomWebConfig, servicesManager) {
  const {
    userAuthenticationService
  } = servicesManager.services;
  let dicomWebConfigCopy, qidoConfig, wadoConfig, qidoDicomWebClient, wadoDicomWebClient, getAuthorizationHeader, generateWadoHeader;
  // Default to enabling bulk data retrieves, with no other customization as
  // this is part of hte base standard.
  dicomWebConfig.bulkDataURI ||= {
    enabled: true
  };
  const implementation = {
    initialize: ({
      params,
      query
    }) => {
      if (dicomWebConfig.onConfiguration && typeof dicomWebConfig.onConfiguration === 'function') {
        dicomWebConfig = dicomWebConfig.onConfiguration(dicomWebConfig, {
          params,
          query
        });
      }
      dicomWebConfigCopy = JSON.parse(JSON.stringify(dicomWebConfig));
      getAuthorizationHeader = () => {
        const xhrRequestHeaders = {};
        const authHeaders = userAuthenticationService.getAuthorizationHeader();
        if (authHeaders && authHeaders.Authorization) {
          xhrRequestHeaders.Authorization = authHeaders.Authorization;
        }
        return xhrRequestHeaders;
      };
      generateWadoHeader = () => {
        const authorizationHeader = getAuthorizationHeader();
        //Generate accept header depending on config params
        const formattedAcceptHeader = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.generateAcceptHeader(dicomWebConfig.acceptHeader, dicomWebConfig.requestTransferSyntaxUID, dicomWebConfig.omitQuotationForMultipartRequest);
        return {
          ...authorizationHeader,
          Accept: formattedAcceptHeader
        };
      };
      qidoConfig = {
        url: dicomWebConfig.qidoRoot,
        staticWado: dicomWebConfig.staticWado,
        singlepart: dicomWebConfig.singlepart,
        headers: userAuthenticationService.getAuthorizationHeader(),
        errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler(),
        supportsFuzzyMatching: dicomWebConfig.supportsFuzzyMatching
      };
      wadoConfig = {
        url: dicomWebConfig.wadoRoot,
        staticWado: dicomWebConfig.staticWado,
        singlepart: dicomWebConfig.singlepart,
        headers: userAuthenticationService.getAuthorizationHeader(),
        errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler(),
        supportsFuzzyMatching: dicomWebConfig.supportsFuzzyMatching
      };

      // TODO -> Two clients sucks, but its better than 1000.
      // TODO -> We'll need to merge auth later.
      qidoDicomWebClient = dicomWebConfig.staticWado ? new _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__["default"](qidoConfig) : new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(qidoConfig);
      wadoDicomWebClient = dicomWebConfig.staticWado ? new _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__["default"](wadoConfig) : new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(wadoConfig);
    },
    query: {
      studies: {
        mapParams: _qido_js__WEBPACK_IMPORTED_MODULE_2__.mapParams.bind(),
        search: async function (origParams) {
          qidoDicomWebClient.headers = getAuthorizationHeader();
          const {
            studyInstanceUid,
            seriesInstanceUid,
            ...mappedParams
          } = (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.mapParams)(origParams, {
            supportsFuzzyMatching: dicomWebConfig.supportsFuzzyMatching,
            supportsWildcard: dicomWebConfig.supportsWildcard
          }) || {};
          const results = await (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.search)(qidoDicomWebClient, undefined, undefined, mappedParams);
          return (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.processResults)(results);
        },
        processResults: _qido_js__WEBPACK_IMPORTED_MODULE_2__.processResults.bind()
      },
      series: {
        // mapParams: mapParams.bind(),
        search: async function (studyInstanceUid) {
          qidoDicomWebClient.headers = getAuthorizationHeader();
          const results = await (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.seriesInStudy)(qidoDicomWebClient, studyInstanceUid);
          return (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.processSeriesResults)(results);
        }
        // processResults: processResults.bind(),
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => {
          qidoDicomWebClient.headers = getAuthorizationHeader();
          return _qido_js__WEBPACK_IMPORTED_MODULE_2__.search.call(undefined, qidoDicomWebClient, studyInstanceUid, null, queryParameters);
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */

      getGetThumbnailSrc: function (instance, imageId) {
        if (dicomWebConfig.thumbnailRendering === 'wadors') {
          return function getThumbnailSrc(options) {
            if (!imageId) {
              return null;
            }
            if (!options?.getImageSrc) {
              return null;
            }
            return options.getImageSrc(imageId);
          };
        }
        if (dicomWebConfig.thumbnailRendering === 'thumbnailDirect') {
          return function getThumbnailSrc() {
            return this.directURL({
              instance: instance,
              defaultPath: '/thumbnail',
              defaultType: 'image/jpeg',
              singlepart: true,
              tag: 'Absent'
            });
          }.bind(this);
        }
        if (dicomWebConfig.thumbnailRendering === 'thumbnail') {
          return async function getThumbnailSrc() {
            const {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID
            } = instance;
            const bulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}/thumbnail?accept=image/jpeg`;
            return URL.createObjectURL(new Blob([await this.bulkDataURI({
              BulkDataURI: bulkDataURI.replace('wadors:', ''),
              defaultType: 'image/jpeg',
              mediaTypes: ['image/jpeg'],
              thumbnail: true
            })], {
              type: 'image/jpeg'
            }));
          }.bind(this);
        }
        if (dicomWebConfig.thumbnailRendering === 'rendered') {
          return async function getThumbnailSrc() {
            const {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID
            } = instance;
            const bulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}/rendered?accept=image/jpeg`;
            return URL.createObjectURL(new Blob([await this.bulkDataURI({
              BulkDataURI: bulkDataURI.replace('wadors:', ''),
              defaultType: 'image/jpeg',
              mediaTypes: ['image/jpeg'],
              thumbnail: true
            })], {
              type: 'image/jpeg'
            }));
          }.bind(this);
        }
      },
      directURL: params => {
        return (0,_utils_getDirectURL__WEBPACK_IMPORTED_MODULE_8__["default"])({
          wadoRoot: dicomWebConfig.wadoRoot,
          singlepart: dicomWebConfig.singlepart
        }, params);
      },
      /**
       * Provide direct access to the dicom web client for certain use cases
       * where the dicom web client is used by an external library such as the
       * microscopy viewer.
       * Note this instance only needs to support the wado queries, and may not
       * support any QIDO or STOW operations.
       */
      getWadoDicomWebClient: () => wadoDicomWebClient,
      bulkDataURI: async ({
        StudyInstanceUID,
        BulkDataURI
      }) => {
        qidoDicomWebClient.headers = getAuthorizationHeader();
        const options = {
          multipart: false,
          BulkDataURI,
          StudyInstanceUID
        };
        return qidoDicomWebClient.retrieveBulkData(options).then(val => {
          const ret = val && val[0] || undefined;
          return ret;
        });
      },
      series: {
        metadata: async ({
          StudyInstanceUID,
          filters,
          sortCriteria,
          sortFunction,
          madeInClient = false,
          returnPromises = false
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          if (dicomWebConfig.enableStudyLazyLoad) {
            return implementation._retrieveSeriesMetadataAsync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient, returnPromises);
          }
          return implementation._retrieveSeriesMetadataSync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient);
        }
      }
    },
    store: {
      dicom: async (dataset, request, dicomDict) => {
        wadoDicomWebClient.headers = getAuthorizationHeader();
        if (dataset instanceof ArrayBuffer) {
          const options = {
            datasets: [dataset],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        } else {
          let effectiveDicomDict = dicomDict;
          if (!dicomDict) {
            const meta = {
              FileMetaInformationVersion: dataset._meta?.FileMetaInformationVersion?.Value,
              MediaStorageSOPClassUID: dataset.SOPClassUID,
              MediaStorageSOPInstanceUID: dataset.SOPInstanceUID,
              TransferSyntaxUID: EXPLICIT_VR_LITTLE_ENDIAN,
              ImplementationClassUID,
              ImplementationVersionName
            };
            const denaturalized = denaturalizeDataset(meta);
            const defaultDicomDict = new DicomDict(denaturalized);
            defaultDicomDict.dict = denaturalizeDataset(dataset);
            effectiveDicomDict = defaultDicomDict;
          }
          const part10Buffer = effectiveDicomDict.write();
          const options = {
            datasets: [part10Buffer],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        }
      }
    },
    _retrieveSeriesMetadataSync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient) => {
      const enableStudyLazyLoad = false;
      wadoDicomWebClient.headers = generateWadoHeader();
      // data is all SOPInstanceUIDs
      const data = await (0,_retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.retrieveStudyMetadata)(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig);

      // first naturalize the data
      const naturalizedInstancesMetadata = data.map(naturalizeDataset);
      const seriesSummaryMetadata = {};
      const instancesPerSeries = {};
      naturalizedInstancesMetadata.forEach(instance => {
        if (!seriesSummaryMetadata[instance.SeriesInstanceUID]) {
          seriesSummaryMetadata[instance.SeriesInstanceUID] = {
            StudyInstanceUID: instance.StudyInstanceUID,
            StudyDescription: instance.StudyDescription,
            SeriesInstanceUID: instance.SeriesInstanceUID,
            SeriesDescription: instance.SeriesDescription,
            SeriesNumber: instance.SeriesNumber,
            SeriesTime: instance.SeriesTime,
            SOPClassUID: instance.SOPClassUID,
            ProtocolName: instance.ProtocolName,
            Modality: instance.Modality
          };
        }
        if (!instancesPerSeries[instance.SeriesInstanceUID]) {
          instancesPerSeries[instance.SeriesInstanceUID] = [];
        }
        const imageId = implementation.getImageIdsForInstance({
          instance
        });
        instance.imageId = imageId;
        instance.wadoRoot = dicomWebConfig.wadoRoot;
        instance.wadoUri = dicomWebConfig.wadoUri;
        metadataProvider.addImageIdToUIDs(imageId, {
          StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          SOPInstanceUID: instance.SOPInstanceUID
        });
        instancesPerSeries[instance.SeriesInstanceUID].push(instance);
      });

      // grab all the series metadata
      const seriesMetadata = Object.values(seriesSummaryMetadata);
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addSeriesMetadata(seriesMetadata, madeInClient);
      Object.keys(instancesPerSeries).forEach(seriesInstanceUID => _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances(instancesPerSeries[seriesInstanceUID], madeInClient));
      return seriesSummaryMetadata;
    },
    _retrieveSeriesMetadataAsync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient = false, returnPromises = false) => {
      const enableStudyLazyLoad = true;
      wadoDicomWebClient.headers = generateWadoHeader();
      // Get Series
      const {
        preLoadData: seriesSummaryMetadata,
        promises: seriesPromises
      } = await (0,_retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.retrieveStudyMetadata)(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig);

      /**
       * Adds the retrieve bulkdata function to naturalized DICOM data.
       * This is done recursively, for sub-sequences.
       */
      const addRetrieveBulkDataNaturalized = (naturalized, instance = naturalized) => {
        if (!naturalized) {
          return naturalized;
        }
        for (const key of Object.keys(naturalized)) {
          const value = naturalized[key];
          if (Array.isArray(value) && typeof value[0] === 'object') {
            // Fix recursive values
            const validValues = value.filter(Boolean);
            validValues.forEach(child => addRetrieveBulkDataNaturalized(child, instance));
            continue;
          }

          // The value.Value will be set with the bulkdata read value
          // in which case it isn't necessary to re-read this.
          if (value && value.BulkDataURI && !value.Value) {
            // handle the scenarios where bulkDataURI is relative path
            (0,_utils_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_9__.fixBulkDataURI)(value, instance, dicomWebConfig);
            // Provide a method to fetch bulkdata
            value.retrieveBulkData = retrieveBulkData.bind(qidoDicomWebClient, value);
          }
        }
        return naturalized;
      };

      /**
       * naturalizes the dataset, and adds a retrieve bulkdata method
       * to any values containing BulkDataURI.
       * @param {*} instance
       * @returns naturalized dataset, with retrieveBulkData methods
       */
      const addRetrieveBulkData = instance => {
        const naturalized = naturalizeDataset(instance);

        // if we know the server doesn't use bulkDataURI, then don't
        if (!dicomWebConfig.bulkDataURI?.enabled) {
          return naturalized;
        }
        return addRetrieveBulkDataNaturalized(naturalized);
      };

      // Async load series, store as retrieved
      function storeInstances(instances) {
        const naturalizedInstances = instances.map(addRetrieveBulkData);

        // Adding instanceMetadata to OHIF MetadataProvider
        naturalizedInstances.forEach(instance => {
          instance.wadoRoot = dicomWebConfig.wadoRoot;
          instance.wadoUri = dicomWebConfig.wadoUri;
          const {
            StudyInstanceUID,
            SeriesInstanceUID,
            SOPInstanceUID
          } = instance;
          const numberOfFrames = instance.NumberOfFrames || 1;
          // Process all frames consistently, whether single or multiframe
          for (let i = 0; i < numberOfFrames; i++) {
            const frameNumber = i + 1;
            const frameImageId = implementation.getImageIdsForInstance({
              instance,
              frame: frameNumber
            });
            // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
            metadataProvider.addImageIdToUIDs(frameImageId, {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID,
              frameNumber: numberOfFrames > 1 ? frameNumber : undefined
            });
          }

          // Adding imageId to each instance
          // Todo: This is not the best way I can think of to let external
          // metadata handlers know about the imageId that is stored in the store
          const imageId = implementation.getImageIdsForInstance({
            instance
          });
          instance.imageId = imageId;
        });
        _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
      }
      function setSuccessFlag() {
        const study = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.getStudy(StudyInstanceUID);
        if (!study) {
          return;
        }
        study.isLoaded = true;
      }

      // Google Cloud Healthcare doesn't return StudyInstanceUID, so we need to add
      // it manually here
      seriesSummaryMetadata.forEach(aSeries => {
        aSeries.StudyInstanceUID = StudyInstanceUID;
      });
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
      const seriesDeliveredPromises = seriesPromises.map(promise => {
        if (!returnPromises) {
          promise?.start();
        }
        return promise.then(instances => {
          storeInstances(instances);
        });
      });
      if (returnPromises) {
        Promise.all(seriesDeliveredPromises).then(() => setSuccessFlag());
        return seriesPromises;
      } else {
        await Promise.all(seriesDeliveredPromises);
        setSuccessFlag();
      }
      return seriesSummaryMetadata;
    },
    deleteStudyMetadataPromise: _retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.deleteStudyMetadataPromise,
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          for (let frame = 1; frame <= NumberOfFrames; frame++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame = undefined
    }) {
      const imageIds = (0,_utils_getImageId_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        instance,
        frame,
        config: dicomWebConfig
      });
      return imageIds;
    },
    getConfig() {
      return dicomWebConfigCopy;
    },
    getStudyInstanceUIDs({
      params,
      query
    }) {
      const paramsStudyInstanceUIDs = params.StudyInstanceUIDs || params.studyInstanceUIDs;
      const queryStudyInstanceUIDs = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.splitComma(query.getAll('StudyInstanceUIDs').concat(query.getAll('studyInstanceUIDs')));
      const StudyInstanceUIDs = queryStudyInstanceUIDs.length && queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];
      return StudyInstanceUIDsAsArray;
    }
  };
  if (dicomWebConfig.supportsReject) {
    implementation.reject = (0,_dcm4cheeReject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dicomWebConfig.wadoRoot, getAuthorizationHeader);
  }
  return _ohif_core__WEBPACK_IMPORTED_MODULE_1__.IWebApiDataSource.create(implementation);
}

/**
 * A bindable function that retrieves the bulk data against this as the
 * dicomweb client, and on the given value element.
 *
 * @param value - a bind value that stores the retrieve value to short circuit the
 *    next retrieve instance.
 * @param options - to allow specifying the content type.
 */
function retrieveBulkData(value, options = {}) {
  const {
    mediaType
  } = options;
  const useOptions = {
    // The bulkdata fetches work with either multipart or
    // singlepart, so set multipart to false to let the server
    // decide which type to respond with.
    multipart: false,
    BulkDataURI: value.BulkDataURI,
    mediaTypes: mediaType ? [{
      mediaType
    }, {
      mediaType: 'application/octet-stream'
    }] : undefined,
    ...options
  };
  return this.retrieveBulkData(useOptions).then(val => {
    // There are DICOM PDF cases where the first ArrayBuffer in the array is
    // the bulk data and DICOM video cases where the second ArrayBuffer is
    // the bulk data. Here we play it safe and do a find.
    const ret = val instanceof Array && val.find(arrayBuffer => arrayBuffer?.byteLength) || undefined;
    value.Value = ret;
    return ret;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/qido.js":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/qido.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ searchStudies),
/* harmony export */   mapParams: () => (/* binding */ mapParams),
/* harmony export */   processResults: () => (/* binding */ processResults),
/* harmony export */   processSeriesResults: () => (/* binding */ processSeriesResults),
/* harmony export */   search: () => (/* binding */ search),
/* harmony export */   seriesInStudy: () => (/* binding */ seriesInStudy)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sortStudy */ "../../core/src/utils/sortStudy.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * QIDO - Query based on ID for DICOM Objects
 * search for studies, series and instances by patient ID, and receive their
 * unique identifiers for further usage.
 *
 * Quick: https://www.dicomstandard.org/dicomweb/query-qido-rs/
 * Standard: http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6
 *
 * Routes:
 * ==========
 * /studies?
 * /studies/{studyInstanceUid}/series?
 * /studies/{studyInstanceUid}/series/{seriesInstanceUid}/instances?
 *
 * Query Parameters:
 * ================
 * | KEY              | VALUE              |
 * |------------------|--------------------|
 * | {attributeId}    | {value}            |
 * | includeField     | {attribute} or all |
 * | fuzzymatching    | true OR false      |
 * | limit            | {number}           |
 * | offset           | {number}           |
 */


const {
  getString,
  getName,
  getModalities
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DICOMWeb;

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoStudies - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoStudies[0].qidoStudy - An object where each key is the DICOM Tag group+element
 * @param {object} qidoStudies[0].qidoStudy[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoStudies[0].qidoStudy[dicomTag].vr - Value Representation
 * @param {string[]} qidoStudies[0].qidoStudy[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processResults(qidoStudies) {
  if (!qidoStudies || !qidoStudies.length) {
    return [];
  }
  const studies = [];
  qidoStudies.forEach(qidoStudy => studies.push({
    studyInstanceUid: getString(qidoStudy['0020000D']),
    date: getString(qidoStudy['00080020']),
    // YYYYMMDD
    time: getString(qidoStudy['00080030']),
    // HHmmss.SSS (24-hour, minutes, seconds, fractional seconds)
    accession: getString(qidoStudy['00080050']) || '',
    // short string, probably a number?
    mrn: getString(qidoStudy['00100020']) || '',
    // medicalRecordNumber
    patientName: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(getName(qidoStudy['00100010'])) || '',
    instances: Number(getString(qidoStudy['00201208'])) || 0,
    // number
    description: getString(qidoStudy['00081030']) || '',
    modalities: getString(getModalities(qidoStudy['00080060'], qidoStudy['00080061'])) || ''
  }));
  return studies;
}

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoSeries - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoSeries[0].qidoSeries - An object where each key is the DICOM Tag group+element
 * @param {object} qidoSeries[0].qidoSeries[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoSeries[0].qidoSeries[dicomTag].vr - Value Representation
 * @param {string[]} qidoSeries[0].qidoSeries[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processSeriesResults(qidoSeries) {
  const series = [];
  if (qidoSeries && qidoSeries.length) {
    qidoSeries.forEach(qidoSeries => series.push({
      studyInstanceUid: getString(qidoSeries['0020000D']),
      seriesInstanceUid: getString(qidoSeries['0020000E']),
      modality: getString(qidoSeries['00080060']),
      seriesNumber: getString(qidoSeries['00200011']),
      seriesDate: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatDate(getString(qidoSeries['00080021'])),
      numSeriesInstances: Number(getString(qidoSeries['00201209'])),
      description: getString(qidoSeries['0008103E'])
    }));
  }
  (0,_ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortStudySeries)(series);
  return series;
}

/**
 *
 * @param {object} dicomWebClient - Client similar to what's provided by `dicomweb-client` library
 * @param {function} dicomWebClient.searchForStudies -
 * @param {string} [studyInstanceUid]
 * @param {string} [seriesInstanceUid]
 * @param {string} [queryParamaters]
 * @returns {Promise<results>} - Promise that resolves results
 */
async function search(dicomWebClient, studyInstanceUid, seriesInstanceUid, queryParameters) {
  let searchResult = await dicomWebClient.searchForStudies({
    studyInstanceUid: undefined,
    queryParams: queryParameters
  });
  return searchResult;
}

/**
 *
 * @param {string} studyInstanceUID - ID of study to return a list of series for
 * @returns {Promise} - Resolves SeriesMetadata[] in study
 */
function seriesInStudy(dicomWebClient, studyInstanceUID) {
  // Series Description
  // Already included?
  const commaSeparatedFields = ['0008103E', '00080021'].join(',');
  const queryParams = {
    includefield: commaSeparatedFields
  };
  return dicomWebClient.searchForSeries({
    studyInstanceUID,
    queryParams
  });
}
function searchStudies(server, filter) {
  const queryParams = getQIDOQueryParams(filter, server.qidoSupportsIncludeField);
  const options = {
    queryParams
  };
  return dicomWeb.searchForStudies(options).then(resultDataToStudies);
}

/**
 * Produces a QIDO URL given server details and a set of specified search filter
 * items
 *
 * @param filter
 * @param serverSupportsQIDOIncludeField
 * @returns {string} The URL with encoded filter query data
 */
function mapParams(params, options = {}) {
  if (!params) {
    return;
  }
  const commaSeparatedFields = ['00081030',
  // Study Description
  '00080060' // Modality
  // Add more fields here if you want them in the result
  ].join(',');
  const useWildcard = params?.disableWildcard !== undefined ? !params.disableWildcard : options.supportsWildcard;
  const withWildcard = value => {
    return useWildcard && value ? `*${value}*` : value;
  };
  const parameters = {
    // Named
    PatientName: withWildcard(params.patientName),
    //PatientID: withWildcard(params.patientId),
    '00100020': withWildcard(params.patientId),
    // Temporarily to make the tests pass with dicomweb-server.. Apparently it's broken?
    AccessionNumber: withWildcard(params.accessionNumber),
    StudyDescription: withWildcard(params.studyDescription),
    ModalitiesInStudy: params.modalitiesInStudy,
    // Other
    limit: params.limit || 101,
    offset: params.offset || 0,
    fuzzymatching: options.supportsFuzzyMatching === true,
    includefield: commaSeparatedFields // serverSupportsQIDOIncludeField ? commaSeparatedFields : 'all',
  };

  // build the StudyDate range parameter
  if (params.startDate && params.endDate) {
    parameters.StudyDate = `${params.startDate}-${params.endDate}`;
  } else if (params.startDate) {
    const today = new Date();
    const DD = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const YYYY = today.getFullYear();
    const todayStr = `${YYYY}${MM}${DD}`;
    parameters.StudyDate = `${params.startDate}-${todayStr}`;
  } else if (params.endDate) {
    const oldDateStr = `19700102`;
    parameters.StudyDate = `${oldDateStr}-${params.endDate}`;
  }

  // Build the StudyInstanceUID parameter
  if (params.studyInstanceUid) {
    let studyUids = params.studyInstanceUid;
    studyUids = Array.isArray(studyUids) ? studyUids.join() : studyUids;
    studyUids = studyUids.replace(/[^0-9.]+/g, '\\');
    parameters.StudyInstanceUID = studyUids;
  }

  // Clean query params of undefined values.
  const final = {};
  Object.keys(parameters).forEach(key => {
    if (parameters[key] !== undefined && parameters[key] !== '') {
      final[key] = parameters[key];
    }
  });
  return final;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteStudyMetadataPromise: () => (/* binding */ deleteStudyMetadataPromise),
/* harmony export */   retrieveStudyMetadata: () => (/* binding */ retrieveStudyMetadata)
/* harmony export */ });
/* harmony import */ var _utils_retrieveMetadataFiltered_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/retrieveMetadataFiltered.js */ "../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js");
/* harmony import */ var _wado_retrieveMetadata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wado/retrieveMetadata.js */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const moduleName = 'RetrieveStudyMetadata';
// Cache for promises. Prevents unnecessary subsequent calls to the server
const StudyMetaDataPromises = new Map();

/**
 * Retrieves study metadata.
 *
 * @param {Object} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} StudyInstanceUID The UID of the Study to be retrieved
 * @param {boolean} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously.
 * @param {Object} [filters] Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns {Promise} that will be resolved with the metadata or rejected with the error
 */
function retrieveStudyMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig = {}) {
  // @TODO: Whenever a study metadata request has failed, its related promise will be rejected once and for all
  // and further requests for that metadata will always fail. On failure, we probably need to remove the
  // corresponding promise from the "StudyMetaDataPromises" map...

  if (!dicomWebClient) {
    throw new Error(`${moduleName}: Required 'dicomWebClient' parameter not provided.`);
  }
  if (!StudyInstanceUID) {
    throw new Error(`${moduleName}: Required 'StudyInstanceUID' parameter not provided.`);
  }
  const promiseId = `${dicomWebConfig.name}:${StudyInstanceUID}`;

  // Already waiting on result? Return cached promise
  if (StudyMetaDataPromises.has(promiseId)) {
    return StudyMetaDataPromises.get(promiseId);
  }
  let promise;
  if (filters && filters.seriesInstanceUID && Array.isArray(filters.seriesInstanceUID)) {
    promise = (0,_utils_retrieveMetadataFiltered_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction);
  } else {
    // Create a promise to handle the data retrieval
    promise = new Promise((resolve, reject) => {
      (0,_wado_retrieveMetadata_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction).then(function (data) {
        resolve(data);
      }, reject);
    });
  }

  // Store the promise in cache
  StudyMetaDataPromises.set(promiseId, promise);
  return promise;
}

/**
 * Delete the cached study metadata retrieval promise to ensure that the browser will
 * re-retrieve the study metadata when it is next requested.
 *
 * @param {String} StudyInstanceUID The UID of the Study to be removed from cache
 */
function deleteStudyMetadataPromise(StudyInstanceUID) {
  if (StudyMetaDataPromises.has(StudyInstanceUID)) {
    StudyMetaDataPromises.delete(StudyInstanceUID);
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticWadoClient)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _fixMultipart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixMultipart */ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const {
  DICOMwebClient
} = dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api;
const anyDicomwebClient = DICOMwebClient;

// Ugly over-ride, but the internals aren't otherwise accessible.
if (!anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue) {
  anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue = anyDicomwebClient._buildMultipartAcceptHeaderFieldValue;
  anyDicomwebClient._buildMultipartAcceptHeaderFieldValue = function (mediaTypes, acceptableTypes) {
    if (mediaTypes.length === 1 && mediaTypes[0].mediaType.endsWith('/*')) {
      return '*/*';
    } else {
      return anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue(mediaTypes, acceptableTypes);
    }
  };
}

/**
 * An implementation of the static wado client, that fetches data from
 * a static response rather than actually doing real queries.  This allows
 * fast encoding of test data, but because it is static, anything actually
 * performing searches doesn't work.  This version fixes the query issue
 * by manually implementing a query option.
 */

class StaticWadoClient extends dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient {
  constructor(config) {
    super(config);
    this.config = void 0;
    this.staticWado = void 0;
    this.staticWado = config.staticWado;
    this.config = config;
  }

  /**
   * Handle improperly specified multipart/related return type.
   * Note if the response is SUPPOSED to be multipart encoded already, then this
   * will double-decode it.
   *
   * @param options
   * @returns De-multiparted response data.
   *
   */
  retrieveBulkData(options) {
    const shouldFixMultipart = this.config.fixBulkdataMultipart !== false;
    const useOptions = {
      ...options
    };
    if (this.staticWado) {
      useOptions.mediaTypes = [{
        mediaType: 'application/*'
      }];
    }
    return super.retrieveBulkData(useOptions).then(result => shouldFixMultipart ? (0,_fixMultipart__WEBPACK_IMPORTED_MODULE_1__["default"])(result) : result);
  }

  /**
   * Retrieves instance frames using the image/* media type when configured
   * to do so (static wado back end).
   */
  retrieveInstanceFrames(options) {
    if (this.staticWado) {
      return super.retrieveInstanceFrames({
        ...options,
        mediaTypes: [{
          mediaType: 'image/*'
        }]
      });
    } else {
      return super.retrieveInstanceFrames(options);
    }
  }

  /**
   * Replace the search for studies remote query with a local version which
   * retrieves a complete query list and then sub-selects from it locally.
   * @param {*} options
   * @returns
   */
  async searchForStudies(options) {
    if (!this.staticWado) {
      return super.searchForStudies(options);
    }
    const searchResult = await super.searchForStudies(options);
    const {
      queryParams
    } = options;
    if (!queryParams) {
      return searchResult;
    }
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(study => {
      for (const key of Object.keys(StaticWadoClient.studyFilterKeys)) {
        if (!this.filterItem(key, lowerParams, study, StaticWadoClient.studyFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }
  async searchForSeries(options) {
    if (!this.staticWado) {
      return super.searchForSeries(options);
    }
    const searchResult = await super.searchForSeries(options);
    const {
      queryParams
    } = options;
    if (!queryParams) {
      return searchResult;
    }
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(series => {
      for (const key of Object.keys(StaticWadoClient.seriesFilterKeys)) {
        if (!this.filterItem(key, lowerParams, series, StaticWadoClient.seriesFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }

  /**
   * Compares values, matching any instance of desired to any instance of
   * actual by recursively go through the paired set of values.  That is,
   * this is O(m*n) where m is how many items in desired and n is the length of actual
   * Then, at the individual item node, compares the Alphabetic name if present,
   * and does a sub-string matching on string values, and otherwise does an
   * exact match comparison.
   *
   * @param {*} desired
   * @param {*} actual
   * @param {*} options - fuzzyMatching: if true, then do a sub-string match
   * @returns true if the values match
   */
  compareValues(desired, actual, options) {
    const {
      fuzzyMatching
    } = options;
    if (Array.isArray(desired)) {
      return desired.find(item => this.compareValues(item, actual, options));
    }
    if (Array.isArray(actual)) {
      return actual.find(actualItem => this.compareValues(desired, actualItem, options));
    }
    if (actual?.Alphabetic) {
      actual = actual.Alphabetic;
    }
    if (fuzzyMatching && typeof actual === 'string' && typeof desired === 'string') {
      const normalizeValue = str => {
        return str.toLowerCase();
      };
      const normalizedDesired = normalizeValue(desired);
      const normalizedActual = normalizeValue(actual);
      const tokenizeAndNormalize = str => str.split(/[\s^]+/).filter(Boolean);
      const desiredTokens = tokenizeAndNormalize(normalizedDesired);
      const actualTokens = tokenizeAndNormalize(normalizedActual);
      return desiredTokens.every(desiredToken => actualTokens.some(actualToken => actualToken.startsWith(desiredToken)));
    }
    if (typeof actual == 'string') {
      if (actual.length === 0) {
        return true;
      }
      if (desired.length === 0 || desired === '*') {
        return true;
      }
      if (desired[0] === '*' && desired[desired.length - 1] === '*') {
        // console.log(`Comparing ${actual} to ${desired.substring(1, desired.length - 1)}`)
        return actual.indexOf(desired.substring(1, desired.length - 1)) != -1;
      } else if (desired[desired.length - 1] === '*') {
        return actual.indexOf(desired.substring(0, desired.length - 1)) != -1;
      } else if (desired[0] === '*') {
        return actual.indexOf(desired.substring(1)) === actual.length - desired.length + 1;
      }
    }
    return desired === actual;
  }

  /** Compares a pair of dates to see if the value is within the range */
  compareDateRange(range, value) {
    if (!value) {
      return true;
    }
    const dash = range.indexOf('-');
    if (dash === -1) {
      return this.compareValues(range, value, {});
    }
    const start = range.substring(0, dash);
    const end = range.substring(dash + 1);
    return (!start || value >= start) && (!end || value <= end);
  }

  /**
   * Filters the return list by the query parameters.
   *
   * @param anyCaseKey - a possible search key
   * @param queryParams -
   * @param {*} study
   * @param {*} sourceFilterMap
   * @returns
   */
  filterItem(key, queryParams, study, sourceFilterMap) {
    const isName = key => key.indexOf('name') !== -1;
    const {
      supportsFuzzyMatching = false
    } = this.config;
    const options = {
      fuzzyMatching: isName(key) && supportsFuzzyMatching
    };
    const altKey = sourceFilterMap[key] || key;
    if (!queryParams) {
      return true;
    }
    const testValue = queryParams[key] || queryParams[altKey];
    if (!testValue) {
      return true;
    }
    const valueElem = study[key] || study[altKey];
    if (!valueElem) {
      return false;
    }
    if (valueElem.vr === 'DA' && valueElem.Value?.[0]) {
      return this.compareDateRange(testValue, valueElem.Value[0]);
    }
    const value = valueElem.Value;
    return this.compareValues(testValue, value, options);
  }

  /** Converts the query parameters to lower case query parameters */
  toLowerParams(queryParams) {
    const lowerParams = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      lowerParams[key.toLowerCase()] = value;
    });
    return lowerParams;
  }
}
StaticWadoClient.studyFilterKeys = {
  studyinstanceuid: '0020000D',
  patientname: '00100010',
  '00100020': 'mrn',
  studydescription: '00081030',
  studydate: '00080020',
  modalitiesinstudy: '00080061',
  accessionnumber: '00080050'
};
StaticWadoClient.seriesFilterKeys = {
  seriesinstanceuid: '0020000E',
  seriesnumber: '00200011',
  modality: '00080060'
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanDenaturalizedDataset: () => (/* binding */ cleanDenaturalizedDataset),
/* harmony export */   transferDenaturalizedDataset: () => (/* binding */ transferDenaturalizedDataset)
/* harmony export */ });
/* harmony import */ var _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function isPrimitive(v) {
  return !(typeof v == 'object' || Array.isArray(v));
}
const vrNumerics = new Set(['DS', 'FL', 'FD', 'IS', 'OD', 'OF', 'OL', 'OV', 'SL', 'SS', 'SV', 'UL', 'US', 'UV']);

/**
 * Specialized for DICOM JSON format dataset cleaning.
 * @param obj
 * @returns
 */
function cleanDenaturalizedDataset(obj, options) {
  if (Array.isArray(obj)) {
    const newAry = obj.map(o => isPrimitive(o) ? o : cleanDenaturalizedDataset(o, options));
    return newAry;
  }
  if (isPrimitive(obj)) {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (obj[key].Value === null && obj[key].vr) {
      delete obj[key].Value;
    } else if (Array.isArray(obj[key].Value) && obj[key].vr) {
      if (obj[key].Value.length === 1 && obj[key].Value[0].BulkDataURI) {
        if (options?.dataSourceConfig) {
          // Not needed unless data source is directly used for loading data.
          (0,_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__.fixBulkDataURI)(obj[key].Value[0], options, options.dataSourceConfig);
        }
        obj[key].BulkDataURI = obj[key].Value[0].BulkDataURI;

        // prevent mixed-content blockage
        if (window.location.protocol === 'https:' && obj[key].BulkDataURI.startsWith('http:')) {
          obj[key].BulkDataURI = obj[key].BulkDataURI.replace('http:', 'https:');
        }
        delete obj[key].Value;
      } else if (vrNumerics.has(obj[key].vr)) {
        obj[key].Value = obj[key].Value.map(v => +v);
      } else {
        obj[key].Value = obj[key].Value.map(entry => cleanDenaturalizedDataset(entry, options));
      }
    }
  });
  return obj;
}

/**
 * This is required to make the denaturalized data transferrable when it has
 * added proxy values.
 */
function transferDenaturalizedDataset(dataset) {
  const noNull = cleanDenaturalizedDataset(dataset);
  return JSON.parse(JSON.stringify(noNull));
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function checkToken(token, data, dataOffset) {
  if (dataOffset + token.length > data.length) {
    return false;
  }
  let endIndex = dataOffset;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== data[endIndex++]) {
      return false;
    }
  }
  return true;
}
function stringToUint8Array(str) {
  const uint = new Uint8Array(str.length);
  for (let i = 0, j = str.length; i < j; i++) {
    uint[i] = str.charCodeAt(i);
  }
  return uint;
}
function findIndexOfString(data, str, offset) {
  offset = offset || 0;
  const token = stringToUint8Array(str);
  for (let i = offset; i < data.length; i++) {
    if (token[0] === data[i]) {
      // console.log('match @', i);
      if (checkToken(token, data, i)) {
        return i;
      }
    }
  }
  return -1;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findIndexOfString);

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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixBulkDataURI: () => (/* binding */ fixBulkDataURI)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Modifies a bulkDataURI to ensure it is absolute based on the DICOMWeb configuration and
 * instance data. The modification is in-place.
 *
 * If the bulkDataURI is relative to the series or study (according to the DICOM standard),
 * it is made absolute by prepending the relevant paths.
 *
 * In scenarios where the bulkDataURI is a server-relative path (starting with '/'), the function
 * handles two cases:
 *
 * 1. If the wado root is absolute (starts with 'http'), it prepends the wado root to the bulkDataURI.
 * 2. If the wado root is relative, no changes are needed as the bulkDataURI is already correctly relative to the server root.
 *
 * @param value - The object containing BulkDataURI to be fixed.
 * @param instance - The object (DICOM instance data) containing StudyInstanceUID and SeriesInstanceUID.
 * @param dicomWebConfig - The DICOMWeb configuration object, containing wadoRoot and potentially bulkDataURI.relativeResolution.
 * @returns The function modifies `value` in-place, it does not return a value.
 */
function fixBulkDataURI(value, instance, dicomWebConfig) {
  // in case of the relative path, make it absolute. The current DICOM standard says
  // the bulkdataURI is relative to the series. However, there are situations where
  // it can be relative to the study too
  let {
    BulkDataURI
  } = value;
  const {
    bulkDataURI: uriConfig = {}
  } = dicomWebConfig;
  BulkDataURI = uriConfig.transform?.(BulkDataURI) || BulkDataURI;

  // Handle incorrectly prefixed origins
  const {
    startsWith,
    prefixWith = ''
  } = uriConfig;
  if (startsWith && BulkDataURI.startsWith(startsWith)) {
    BulkDataURI = prefixWith + BulkDataURI.substring(startsWith.length);
    value.BulkDataURI = BulkDataURI;
  }
  if (!BulkDataURI.startsWith('http') && !value.BulkDataURI.startsWith('/')) {
    const {
      StudyInstanceUID,
      SeriesInstanceUID
    } = instance;
    const isInstanceStart = BulkDataURI.startsWith('instances/') || BulkDataURI.startsWith('../');
    if (BulkDataURI.startsWith('series/') || BulkDataURI.startsWith('bulkdata/') || uriConfig.relativeResolution === 'studies' && !isInstanceStart) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/${BulkDataURI}`;
    } else if (isInstanceStart || uriConfig.relativeResolution === 'series' || !uriConfig.relativeResolution) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/${BulkDataURI}`;
    }
    return;
  }

  // in case it is relative path but starts at the server (e.g., /bulk/1e, note the missing http
  // in the beginning and the first character is /) There are two scenarios, whether the wado root
  // is absolute or relative. In case of absolute, we need to prepend the wado root to the bulkdata
  // uri (e.g., bulkData: /bulk/1e, wado root: http://myserver.com/dicomweb, output: http://myserver.com/bulk/1e)
  // and in case of relative wado root, we need to prepend the bulkdata uri to the wado root (e.g,. bulkData: /bulk/1e
  // wado root: /dicomweb, output: /bulk/1e)
  if (BulkDataURI[0] === '/') {
    if (dicomWebConfig.wadoRoot.startsWith('http')) {
      // Absolute wado root
      const url = new URL(dicomWebConfig.wadoRoot);
      value.BulkDataURI = `${url.origin}${BulkDataURI}`;
    } else {
      // Relative wado root, we don't need to do anything, bulkdata uri is already correct
    }
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixMultiValueKeys: () => (/* binding */ fixMultiValueKeys)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Fix multi-valued keys so that those which are strings split by
 * a backslash are returned as arrays.
 */
function fixMultiValueKeys(naturalData, keys = ['ImageType']) {
  for (const key of keys) {
    if (typeof naturalData[key] === 'string') {
      naturalData[key] = naturalData[key].split('\\');
    }
  }
  return naturalData;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fixMultipart),
/* harmony export */   findBoundary: () => (/* binding */ findBoundary),
/* harmony export */   findContentType: () => (/* binding */ findContentType),
/* harmony export */   uint8ArrayToString: () => (/* binding */ uint8ArrayToString)
/* harmony export */ });
/* harmony import */ var _findIndexOfString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findIndexOfString */ "../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Fix multipart data coming back from the retrieve bulkdata request, but
 * incorrectly tagged as application/octet-stream.  Some servers don't handle
 * the response type correctly, and this method is relatively robust about
 * detecting multipart data correctly.  It will only extract one value.
 */
function fixMultipart(arrayData) {
  const data = new Uint8Array(arrayData[0]);
  // Don't know the exact minimum length, but it is at least 25 to encode multipart
  if (data.length < 25) {
    return arrayData;
  }
  const dashIndex = (0,_findIndexOfString__WEBPACK_IMPORTED_MODULE_0__["default"])(data, '--');
  if (dashIndex > 6) {
    return arrayData;
  }
  const tokenIndex = (0,_findIndexOfString__WEBPACK_IMPORTED_MODULE_0__["default"])(data, '\r\n\r\n', dashIndex);
  if (tokenIndex > 512) {
    // Allow for 512 characters in the header - there is no apriori limit, but
    // this seems ok for now as we only expect it to have content type in it.
    return arrayData;
  }
  const header = uint8ArrayToString(data, 0, tokenIndex);
  // Now find the boundary  marker
  const responseHeaders = header.split('\r\n');
  const boundary = findBoundary(responseHeaders);
  if (!boundary) {
    return arrayData;
  }
  // Start of actual data is 4 characters after the token
  const offset = tokenIndex + 4;
  const endIndex = (0,_findIndexOfString__WEBPACK_IMPORTED_MODULE_0__["default"])(data, boundary, offset);
  if (endIndex === -1) {
    return arrayData;
  }
  return [data.slice(offset, endIndex - 2).buffer];
}
function findBoundary(header) {
  for (let i = 0; i < header.length; i++) {
    if (header[i].substr(0, 2) === '--') {
      return header[i];
    }
  }
}
function findContentType(header) {
  for (let i = 0; i < header.length; i++) {
    if (header[i].substr(0, 13) === 'Content-Type:') {
      return header[i].substr(13).trim();
    }
  }
}
function uint8ArrayToString(data, offset, length) {
  offset = offset || 0;
  length = length || data.length - offset;
  let str = '';
  for (let i = offset; i < offset + length; i++) {
    str += String.fromCharCode(data[i]);
  }
  return str;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getImageId)
/* harmony export */ });
/* harmony import */ var _getWADORSImageId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWADORSImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function buildInstanceWadoUrl(config, instance) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const params = [];
  params.push('requestType=WADO');
  params.push(`studyUID=${StudyInstanceUID}`);
  params.push(`seriesUID=${SeriesInstanceUID}`);
  params.push(`objectUID=${SOPInstanceUID}`);
  params.push('contentType=application/dicom');
  params.push('transferSyntax=*');
  const paramString = params.join('&');
  return `${config.wadoUriRoot}?${paramString}`;
}

/**
 * Obtain an imageId for Cornerstone from an image instance
 *
 * @param instance
 * @param frame
 * @param thumbnail
 * @returns {string} The imageId to be used by Cornerstone
 */
function getImageId({
  instance,
  frame,
  config,
  thumbnail = false
}) {
  if (!instance) {
    return;
  }
  if (instance.imageId && frame === undefined) {
    return instance.imageId;
  }
  if (instance.url) {
    return instance.url;
  }
  const renderingAttr = thumbnail ? 'thumbnailRendering' : 'imageRendering';
  if (!config[renderingAttr] || config[renderingAttr] === 'wadouri') {
    const wadouri = buildInstanceWadoUrl(config, instance);
    let imageId = 'dicomweb:' + wadouri;
    if (frame !== undefined) {
      imageId += '&frame=' + frame;
    }
    return imageId;
  } else {
    return (0,_getWADORSImageId__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, config, frame); // WADO-RS Retrieve Frame
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWADORSImageId)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function buildInstanceWadoRsUri(instance, config) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  return `${config.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}`;
}
function buildInstanceFrameWadoRsUri(instance, config, frame) {
  const baseWadoRsUri = buildInstanceWadoRsUri(instance, config);
  frame = frame || 1;
  return `${baseWadoRsUri}/frames/${frame}`;
}

// function getWADORSImageUrl(instance, frame) {
//   const wadorsuri = buildInstanceFrameWadoRsUri(instance, config, frame);

//   if (!wadorsuri) {
//     return;
//   }

//   // Use null to obtain an imageId which represents the instance
//   if (frame === null) {
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, '');
//   } else {
//     // We need to sum 1 because WADO-RS frame number is 1-based
//     frame = frame ? parseInt(frame) + 1 : 1;

//     // Replaces /frame/1 by /frame/{frame}
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, `frames/${frame}`);
//   }

//   return wadorsuri;
// }

/**
 * Obtain an imageId for Cornerstone based on the WADO-RS scheme
 *
 * @param {object} instanceMetada metadata object (InstanceMetadata)
 * @param {(string\|number)} [frame] the frame number
 * @returns {string} The imageId to be used by Cornerstone
 */
function getWADORSImageId(instance, config, frame) {
  //const uri = getWADORSImageUrl(instance, frame);
  const uri = buildInstanceFrameWadoRsUri(instance, config, frame);
  if (!uri) {
    return;
  }
  return `wadors:${uri}`;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/index.ts":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/index.ts ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanDenaturalizedDataset: () => (/* reexport safe */ _cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_1__.cleanDenaturalizedDataset),
/* harmony export */   fixBulkDataURI: () => (/* reexport safe */ _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__.fixBulkDataURI),
/* harmony export */   fixMultiValueKeys: () => (/* reexport safe */ _fixMultiValueKeys__WEBPACK_IMPORTED_MODULE_2__.fixMultiValueKeys),
/* harmony export */   transferDenaturalizedDataset: () => (/* reexport safe */ _cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_1__.transferDenaturalizedDataset)
/* harmony export */ });
/* harmony import */ var _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* harmony import */ var _cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cleanDenaturalizedDataset */ "../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts");
/* harmony import */ var _fixMultiValueKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fixMultiValueKeys */ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts");
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js":
/*!********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wado_retrieveMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wado/retrieveMetadata */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Retrieve metadata filtered.
 *
 * @param {*} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {*} StudyInstanceUID The UID of the Study to be retrieved
 * @param {*} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously
 * @param {object} filters Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns
 */
function retrieveMetadataFiltered(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction) {
  const {
    seriesInstanceUID
  } = filters;
  return new Promise((resolve, reject) => {
    const promises = seriesInstanceUID.map(uid => {
      const seriesSpecificFilters = Object.assign({}, filters, {
        seriesInstanceUID: uid
      });
      return (0,_wado_retrieveMetadata__WEBPACK_IMPORTED_MODULE_0__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, seriesSpecificFilters, sortCriteria, sortFunction);
    });
    if (enableStudyLazyLoad === true) {
      Promise.all(promises).then(results => {
        const aggregatedResult = {
          preLoadData: [],
          promises: []
        };
        results.forEach(({
          preLoadData,
          promises
        }) => {
          aggregatedResult.preLoadData = aggregatedResult.preLoadData.concat(preLoadData);
          aggregatedResult.promises = aggregatedResult.promises.concat(promises);
        });
        resolve(aggregatedResult);
      }, reject);
    } else {
      Promise.all(promises).then(results => {
        resolve(results.flat());
      }, reject);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (retrieveMetadataFiltered);

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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retrieveMetadataLoaderSync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retrieveMetadataLoaderSync */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js");
/* harmony import */ var _retrieveMetadataLoaderAsync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retrieveMetadataLoaderAsync */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Retrieve Study metadata from a DICOM server. If the server is configured to use lazy load, only the first series
 * will be loaded and the property "studyLoader" will be set to let consumer load remaining series as needed.
 *
 * @param {*} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {*} StudyInstanceUID The UID of the Study to be retrieved
 * @param {*} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously
 * @param {object} filters Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns {Promise} A promises that resolves the study descriptor object
 */
async function RetrieveMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters = {}, sortCriteria, sortFunction) {
  const RetrieveMetadataLoader = enableStudyLazyLoad !== false ? _retrieveMetadataLoaderAsync__WEBPACK_IMPORTED_MODULE_1__["default"] : _retrieveMetadataLoaderSync__WEBPACK_IMPORTED_MODULE_0__["default"];
  const retrieveMetadataLoader = new RetrieveMetadataLoader(dicomWebClient, StudyInstanceUID, filters, sortCriteria, sortFunction);
  const data = await retrieveMetadataLoader.execLoad();
  return data;
}
_c = RetrieveMetadata;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RetrieveMetadata);
var _c;
__webpack_require__.$Refresh$.register(_c, "RetrieveMetadata");

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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoader)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Class to define inheritance of load retrieve strategy.
 * The process can be async load (lazy) or sync load
 *
 * There are methods that must be implemented at consumer level
 * To retrieve study call execLoad
 */
class RetrieveMetadataLoader {
  /**
   * @constructor
   * @param {Object} client The dicomweb-client.
   * @param {Array} studyInstanceUID Study instance ui to be retrieved
   * @param {Object} [filters] - Object containing filters to be applied on retrieve metadata process
   * @param {string} [filters.seriesInstanceUID] - series instance uid to filter results against
   * @param {Object} [sortCriteria] - Custom sort criteria used for series
   * @param {Function} [sortFunction] - Custom sort function for series
   */
  constructor(client, studyInstanceUID, filters = {}, sortCriteria = undefined, sortFunction = undefined) {
    this.client = client;
    this.studyInstanceUID = studyInstanceUID;
    this.filters = filters;
    this.sortCriteria = sortCriteria;
    this.sortFunction = sortFunction;
  }
  async execLoad() {
    const preLoadData = await this.preLoad();
    const loadData = await this.load(preLoadData);
    const postLoadData = await this.posLoad(loadData);
    return postLoadData;
  }

  /**
   * It iterates over given loaders running each one. Loaders parameters must be bind when getting it.
   * @param {Array} loaders - array of loader to retrieve data.
   */
  async runLoaders(loaders) {
    let result;
    for (const loader of loaders) {
      result = await loader();
      if (result && result.length) {
        break; // closes iterator in case data is retrieved successfully
      }
    }
    if (loaders.next().done && !result) {
      throw new Error('RetrieveMetadataLoader failed');
    }
    return result;
  }

  // Methods to be overwrite
  async configLoad() {}
  async preLoad() {}
  async load(preLoadData) {}
  async posLoad(loadData) {}
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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeferredPromise: () => (/* binding */ DeferredPromise),
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoaderAsync)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sortStudy */ "../../core/src/utils/sortStudy.ts");
/* harmony import */ var _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retrieveMetadataLoader */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





// Series Date, Series Time, Series Description and Series Number to be included
// in the series metadata query result
const includeField = ['00080021', '00080031', '0008103E', '00200011'].join(',');
class DeferredPromise {
  constructor() {
    this.metadata = undefined;
    this.processFunction = undefined;
    this.internalPromise = undefined;
    this.thenFunction = undefined;
    this.rejectFunction = undefined;
  }
  setMetadata(metadata) {
    this.metadata = metadata;
  }
  setProcessFunction(func) {
    this.processFunction = func;
  }
  getPromise() {
    return this.start();
  }
  start() {
    if (this.internalPromise) {
      return this.internalPromise;
    }
    this.internalPromise = this.processFunction();
    // in case then and reject functions called before start
    if (this.thenFunction) {
      this.then(this.thenFunction);
      this.thenFunction = undefined;
    }
    if (this.rejectFunction) {
      this.reject(this.rejectFunction);
      this.rejectFunction = undefined;
    }
    return this.internalPromise;
  }
  then(func) {
    if (this.internalPromise) {
      return this.internalPromise.then(func);
    } else {
      this.thenFunction = func;
    }
  }
  reject(func) {
    if (this.internalPromise) {
      return this.internalPromise.reject(func);
    } else {
      this.rejectFunction = func;
    }
  }
}
/**
 * Creates an immutable series loader object which loads each series sequentially using the iterator interface.
 *
 * @param {DICOMWebClient} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} studyInstanceUID The Study Instance UID from which series will be loaded
 * @param {Array} seriesInstanceUIDList A list of Series Instance UIDs
 *
 * @returns {Object} Returns an object which supports loading of instances from each of given Series Instance UID
 */
function makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDList) {
  return Object.freeze({
    hasNext() {
      return seriesInstanceUIDList.length > 0;
    },
    next() {
      const {
        seriesInstanceUID,
        metadata
      } = seriesInstanceUIDList.shift();
      const promise = new DeferredPromise();
      promise.setMetadata(metadata);
      promise.setProcessFunction(() => {
        return client.retrieveSeriesMetadata({
          studyInstanceUID,
          seriesInstanceUID
        });
      });
      return promise;
    }
  });
}

/**
 * Class for async load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * It loads the one series and then append to seriesLoader the others to be consumed/loaded
 */
class RetrieveMetadataLoaderAsync extends _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * @returns {Array} Array of preLoaders. To be consumed as queue
   */
  *getPreLoaders() {
    const preLoaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;

    // asking to include Series Date, Series Time, Series Description
    // and Series Number in the series metadata returned to better sort series
    // in preLoad function
    let options = {
      studyInstanceUID,
      queryParams: {
        includefield: includeField
      }
    };
    if (seriesInstanceUID) {
      options.queryParams.SeriesInstanceUID = seriesInstanceUID;
      preLoaders.push(client.searchForSeries.bind(client, options));
    }
    // Fallback preloader
    preLoaders.push(client.searchForSeries.bind(client, options));
    yield* preLoaders;
  }
  async preLoad() {
    const preLoaders = this.getPreLoaders();
    const result = await this.runLoaders(preLoaders);
    const sortCriteria = this.sortCriteria;
    const sortFunction = this.sortFunction;
    const {
      naturalizeDataset
    } = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.DicomMetaDictionary;
    const naturalized = result.map(naturalizeDataset);
    return (0,_ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortStudySeries)(naturalized, sortCriteria, sortFunction);
  }
  async load(preLoadData) {
    const {
      client,
      studyInstanceUID
    } = this;
    const seriesInstanceUIDs = preLoadData.map(seriesMetadata => {
      return {
        seriesInstanceUID: seriesMetadata.SeriesInstanceUID,
        metadata: seriesMetadata
      };
    });
    const seriesAsyncLoader = makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDs);
    const promises = [];
    while (seriesAsyncLoader.hasNext()) {
      const promise = seriesAsyncLoader.next();
      promises.push(promise);
    }
    return {
      preLoadData,
      promises
    };
  }
  async posLoad({
    preLoadData,
    promises
  }) {
    return {
      preLoadData,
      promises
    };
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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoaderSync)
/* harmony export */ });
/* harmony import */ var _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retrieveMetadataLoader */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// import { api } from 'dicomweb-client';
// import DICOMWeb from '../../../DICOMWeb/';


/**
 * Class for sync load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * A list of loaders (getLoaders) can be created so, it will be applied a fallback load strategy.
 * I.e Retrieve metadata using all loaders possibilities.
 */
class RetrieveMetadataLoaderSync extends _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getOptions() {
    const {
      studyInstanceUID,
      filters
    } = this;
    const options = {
      studyInstanceUID
    };
    const {
      seriesInstanceUID
    } = filters;
    if (seriesInstanceUID) {
      options['seriesInstanceUID'] = seriesInstanceUID;
    }
    return options;
  }

  /**
   * @returns {Array} Array of loaders. To be consumed as queue
   */
  *getLoaders() {
    const loaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;
    if (seriesInstanceUID) {
      loaders.push(client.retrieveSeriesMetadata.bind(client, {
        studyInstanceUID,
        seriesInstanceUID
      }));
    }
    loaders.push(client.retrieveStudyMetadata.bind(client, {
      studyInstanceUID
    }));
    yield* loaders;
  }
  async load(preLoadData) {
    const loaders = this.getLoaders();
    const result = this.runLoaders(loaders);
    return result;
  }
  async posLoad(loadData) {
    return loadData;
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

/***/ "../../../extensions/default/src/DicomWebProxyDataSource/index.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebProxyDataSource/index.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomWebProxyApi: () => (/* binding */ createDicomWebProxyApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DicomWebDataSource/index */ "../../../extensions/default/src/DicomWebDataSource/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * This datasource is initialized with a url that returns a JSON object with a
 * dicomWeb datasource configuration array present in a "servers" object.
 *
 * Only the first array item is parsed, if there are multiple items in the
 * dicomWeb configuration array
 *
 */
function createDicomWebProxyApi(dicomWebProxyConfig, servicesManager) {
  const {
    name
  } = dicomWebProxyConfig;
  let dicomWebDelegate = undefined;
  const implementation = {
    initialize: async ({
      params,
      query
    }) => {
      const url = query.get('url');
      if (!url) {
        throw new Error(`No url for '${name}'`);
      } else {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.servers?.dicomWeb?.[0]) {
          throw new Error('Invalid configuration returned by url');
        }
        dicomWebDelegate = (0,_DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_1__.createDicomWebApi)(data.servers.dicomWeb[0].configuration || data.servers.dicomWeb[0], servicesManager);
        dicomWebDelegate.initialize({
          params,
          query
        });
      }
    },
    query: {
      studies: {
        search: params => dicomWebDelegate.query.studies.search(params)
      },
      series: {
        search: (...args) => dicomWebDelegate.query.series.search(...args)
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => dicomWebDelegate.query.instances.search(studyInstanceUid, queryParameters)
      }
    },
    retrieve: {
      directURL: (...args) => dicomWebDelegate.retrieve.directURL(...args),
      series: {
        metadata: async (...args) => dicomWebDelegate.retrieve.series.metadata(...args)
      }
    },
    store: {
      dicom: (...args) => dicomWebDelegate.store.dicom(...args)
    },
    deleteStudyMetadataPromise: (...args) => dicomWebDelegate.deleteStudyMetadataPromise(...args),
    getImageIdsForDisplaySet: (...args) => dicomWebDelegate.getImageIdsForDisplaySet(...args),
    getImageIdsForInstance: (...args) => dicomWebDelegate.getImageIdsForInstance(...args),
    getStudyInstanceUIDs({
      params,
      query
    }) {
      let studyInstanceUIDs = [];

      // there seem to be a couple of variations of the case for this parameter
      const queryStudyInstanceUIDs = query.get('studyInstanceUIDs') || query.get('studyInstanceUids');
      if (!queryStudyInstanceUIDs) {
        throw new Error(`No studyInstanceUids in request for '${name}'`);
      }
      studyInstanceUIDs = queryStudyInstanceUIDs.split(';');
      return studyInstanceUIDs;
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/MergeDataSource/index.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/MergeDataSource/index.ts ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callByRetrieveAETitle: () => (/* binding */ callByRetrieveAETitle),
/* harmony export */   callForAllDataSources: () => (/* binding */ callForAllDataSources),
/* harmony export */   callForAllDataSourcesAsync: () => (/* binding */ callForAllDataSourcesAsync),
/* harmony export */   callForDefaultDataSource: () => (/* binding */ callForDefaultDataSource),
/* harmony export */   createMergeDataSourceApi: () => (/* binding */ createMergeDataSourceApi),
/* harmony export */   mergeMap: () => (/* binding */ mergeMap)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.get */ "../../../node_modules/lodash.get/index.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_uniqby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash.uniqby */ "../../../node_modules/lodash.uniqby/index.js");
/* harmony import */ var lodash_uniqby__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqby__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const mergeMap = {
  'query.studies.search': {
    mergeKey: 'studyInstanceUid',
    tagFunc: x => x
  },
  'query.series.search': {
    mergeKey: 'seriesInstanceUid',
    tagFunc: (series, sourceName) => {
      series.forEach(series => {
        series.RetrieveAETitle = sourceName;
        _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.updateSeriesMetadata(series);
      });
      return series;
    }
  }
};

/**
 * Calls all data sources asynchronously and merges the results.
 * @param {CallForAllDataSourcesAsyncOptions} options - The options for calling all data sources.
 * @param {string} options.path - The path to the function to be called on each data source.
 * @param {unknown[]} options.args - The arguments to be passed to the function.
 * @param {ExtensionManager} options.extensionManager - The extension manager.
 * @param {string[]} options.dataSourceNames - The names of the data sources to be called.
 * @param {string} options.defaultDataSourceName - The name of the default data source.
 * @returns {Promise<unknown[]>} - A promise that resolves to the merged data from all data sources.
 */
const callForAllDataSourcesAsync = async ({
  mergeMap,
  path,
  args,
  extensionManager,
  dataSourceNames,
  defaultDataSourceName
}) => {
  const {
    mergeKey,
    tagFunc
  } = mergeMap[path] || {
    tagFunc: x => x
  };

  /** Sort by default data source */
  const defs = Object.values(extensionManager.dataSourceDefs);
  const defaultDataSourceDef = defs.find(def => def.sourceName === defaultDataSourceName);
  const dataSourceDefs = defs.filter(def => def.sourceName !== defaultDataSourceName);
  if (defaultDataSourceDef) {
    dataSourceDefs.unshift(defaultDataSourceDef);
  }
  const promises = [];
  const sourceNames = [];
  for (const dataSourceDef of dataSourceDefs) {
    const {
      configuration,
      sourceName
    } = dataSourceDef;
    if (!!configuration && dataSourceNames.includes(sourceName)) {
      const [dataSource] = extensionManager.getDataSources(sourceName);
      const func = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(dataSource, path);
      const promise = func.apply(dataSource, args);
      promises.push(promise);
      sourceNames.push(sourceName);
    }
  }
  const data = await Promise.allSettled(promises);
  const mergedData = data.map((data, i) => tagFunc(data.value, sourceNames[i]));
  let results = [];
  if (mergeKey) {
    results = lodash_uniqby__WEBPACK_IMPORTED_MODULE_2___default()(mergedData.flat(), obj => lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(obj, mergeKey));
  } else {
    results = mergedData.flat();
  }
  return results;
};

/**
 * Calls all data sources that match the provided names and merges their data.
 * @param options - The options for calling all data sources.
 * @param options.path - The path to the function to be called on each data source.
 * @param options.args - The arguments to be passed to the function.
 * @param options.extensionManager - The extension manager instance.
 * @param options.dataSourceNames - The names of the data sources to be called.
 * @param options.defaultDataSourceName - The name of the default data source.
 * @returns The merged data from all the matching data sources.
 */
const callForAllDataSources = ({
  path,
  args,
  extensionManager,
  dataSourceNames,
  defaultDataSourceName
}) => {
  /** Sort by default data source */
  const defs = Object.values(extensionManager.dataSourceDefs);
  const defaultDataSourceDef = defs.find(def => def.sourceName === defaultDataSourceName);
  const dataSourceDefs = defs.filter(def => def.sourceName !== defaultDataSourceName);
  if (defaultDataSourceDef) {
    dataSourceDefs.unshift(defaultDataSourceDef);
  }
  const mergedData = [];
  for (const dataSourceDef of dataSourceDefs) {
    const {
      configuration,
      sourceName
    } = dataSourceDef;
    if (!!configuration && dataSourceNames.includes(sourceName)) {
      const [dataSource] = extensionManager.getDataSources(sourceName);
      const func = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(dataSource, path);
      const data = func.apply(dataSource, args);
      mergedData.push(data);
    }
  }
  return mergedData.flat();
};

/**
 * Calls the default data source function specified by the given path with the provided arguments.
 * @param {CallForDefaultDataSourceOptions} options - The options for calling the default data source.
 * @param {string} options.path - The path to the function within the default data source.
 * @param {unknown[]} options.args - The arguments to pass to the function.
 * @param {string} options.defaultDataSourceName - The name of the default data source.
 * @param {ExtensionManager} options.extensionManager - The extension manager instance.
 * @returns {unknown} - The result of calling the default data source function.
 */
const callForDefaultDataSource = ({
  path,
  args,
  defaultDataSourceName,
  extensionManager
}) => {
  const [dataSource] = extensionManager.getDataSources(defaultDataSourceName);
  const func = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(dataSource, path);
  return func.apply(dataSource, args);
};

/**
 * Calls the data source specified by the RetrieveAETitle of the given display set.
 * @typedef {Object} CallByRetrieveAETitleOptions
 * @property {string} path - The path of the method to call on the data source.
 * @property {any[]} args - The arguments to pass to the method.
 * @property {string} defaultDataSourceName - The name of the default data source.
 * @property {ExtensionManager} extensionManager - The extension manager.
 */
const callByRetrieveAETitle = ({
  path,
  args,
  defaultDataSourceName,
  extensionManager
}) => {
  const [displaySet] = args;
  const seriesMetadata = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getSeries(displaySet.StudyInstanceUID, displaySet.SeriesInstanceUID);
  const [dataSource] = extensionManager.getDataSources(seriesMetadata.RetrieveAETitle || defaultDataSourceName);
  return dataSource[path](...args);
};
function createMergeDataSourceApi(mergeConfig, servicesManager, extensionManager) {
  const {
    seriesMerge
  } = mergeConfig;
  const {
    dataSourceNames,
    defaultDataSourceName
  } = seriesMerge;
  const implementation = {
    initialize: (...args) => callForAllDataSources({
      path: 'initialize',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    }),
    query: {
      studies: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.studies.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      },
      series: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.series.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      },
      instances: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.instances.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      }
    },
    retrieve: {
      bulkDataURI: (...args) => callForAllDataSourcesAsync({
        mergeMap,
        path: 'retrieve.bulkDataURI',
        args,
        extensionManager,
        dataSourceNames,
        defaultDataSourceName
      }),
      directURL: (...args) => callForDefaultDataSource({
        path: 'retrieve.directURL',
        args,
        defaultDataSourceName,
        extensionManager
      }),
      series: {
        metadata: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'retrieve.series.metadata',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      }
    },
    store: {
      dicom: (...args) => callForDefaultDataSource({
        path: 'store.dicom',
        args,
        defaultDataSourceName,
        extensionManager
      })
    },
    deleteStudyMetadataPromise: (...args) => callForAllDataSources({
      path: 'deleteStudyMetadataPromise',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    }),
    getImageIdsForDisplaySet: (...args) => callByRetrieveAETitle({
      path: 'getImageIdsForDisplaySet',
      args,
      defaultDataSourceName,
      extensionManager
    }),
    getImageIdsForInstance: (...args) => callByRetrieveAETitle({
      path: 'getImageIdsForDisplaySet',
      args,
      defaultDataSourceName,
      extensionManager
    }),
    getStudyInstanceUIDs: (...args) => callForAllDataSources({
      path: 'getStudyInstanceUIDs',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    })
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/Panels/DataSourceSelector.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Panels/DataSourceSelector.tsx ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../../../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();





function DataSourceSelector() {
  _s();
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();

  // This is frowned upon, but the raw config is needed here to provide
  // the selector
  const dsConfigs = appConfig.dataSources;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-screen w-screen items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-secondary-dark mx-auto space-y-2 rounded-lg py-8 px-8 drop-shadow-md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "mx-auto block h-14",
    src: "./ohif-logo.svg",
    alt: "OHIF"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-2 pt-4 text-center"
  }, dsConfigs.filter(it => it.sourceName !== 'dicomjson' && it.sourceName !== 'dicomlocal').map(ds => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: ds.sourceName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-white"
  }, ds.configuration?.friendlyName || ds.friendlyName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    type: _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.ButtonEnums.type.primary,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ml-2'),
    onClick: () => {
      navigate({
        pathname: '/',
        search: `datasources=${ds.sourceName}`
      });
    }
  }, ds.sourceName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null)))))));
}
_s(DataSourceSelector, "vWWYUHztbe5Wm6NOy7wIPD3E4Q4=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig, react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate];
});
_c = DataSourceSelector;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceSelector);
var _c;
__webpack_require__.$Refresh$.register(_c, "DataSourceSelector");

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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "../../../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PanelStudyBrowserHeader */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts");
/* harmony import */ var _Components_MoreDropdownMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Components/MoreDropdownMenu */ "../../../extensions/default/src/Components/MoreDropdownMenu.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();








const {
  sortStudyInstances,
  formatDate,
  createStudyBrowserTabs
} = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils;
const thumbnailNoImageModalities = ['SR', 'SEG', 'RTSTRUCT', 'RTPLAN', 'RTDOSE', 'DOC', 'PMAP'];

/**
 * Study Browser component that displays and manages studies and their display sets
 */
function PanelStudyBrowser({
  getImageSrc,
  getStudiesForPatientByMRN,
  requestDisplaySetCreationForStudy,
  dataSource,
  customMapDisplaySets,
  onClickUntrack,
  onDoubleClickThumbnailHandlerCallBack
}) {
  _s();
  const {
    servicesManager,
    commandsManager,
    extensionManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    displaySetService,
    customizationService
  } = servicesManager.services;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  const studyMode = customizationService.getCustomization('studyBrowser.studyMode') || 'all';
  const internalImageViewer = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useImageViewer)();
  const StudyInstanceUIDs = internalImageViewer.StudyInstanceUIDs;
  const fetchedStudiesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set());
  const [{
    activeViewportId,
    viewports,
    isHangingProtocolLayout
  }] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid)();
  const [activeTabName, setActiveTabName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(studyMode);
  const [expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([...StudyInstanceUIDs]);
  const [hasLoadedViewports, setHasLoadedViewports] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [studyDisplayList, setStudyDisplayList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [displaySets, setDisplaySets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [displaySetsLoadingState, setDisplaySetsLoadingState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [thumbnailImageSrcMap, setThumbnailImageSrcMap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [jumpToDisplaySet, setJumpToDisplaySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [viewPresets, setViewPresets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(customizationService.getCustomization('studyBrowser.viewPresets'));
  const [actionIcons, setActionIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_constants__WEBPACK_IMPORTED_MODULE_5__.defaultActionIcons);

  // multiple can be true or false
  const updateActionIconValue = actionIcon => {
    actionIcon.value = !actionIcon.value;
    const newActionIcons = [...actionIcons];
    setActionIcons(newActionIcons);
  };

  // only one is true at a time
  const updateViewPresetValue = viewPreset => {
    if (!viewPreset) {
      return;
    }
    const newViewPresets = viewPresets.map(preset => {
      preset.selected = preset.id === viewPreset.id;
      return preset;
    });
    setViewPresets(newViewPresets);
  };
  const mapDisplaySetsWithState = customMapDisplaySets || _mapDisplaySets;
  const onDoubleClickThumbnailHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async displaySetInstanceUID => {
    const customHandler = customizationService.getCustomization('studyBrowser.thumbnailDoubleClickCallback');
    const setupArgs = {
      activeViewportId,
      commandsManager,
      servicesManager,
      isHangingProtocolLayout,
      appConfig: extensionManager._appConfig
    };
    const handlers = customHandler?.callbacks.map(callback => callback(setupArgs));
    for (const handler of handlers) {
      await handler(displaySetInstanceUID);
    }
    onDoubleClickThumbnailHandlerCallBack?.(displaySetInstanceUID);
  }, [activeViewportId, commandsManager, servicesManager, isHangingProtocolLayout, customizationService]);

  // ~~ studyDisplayList
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Fetch all studies for the patient in each primary study
    async function fetchStudiesForPatient(StudyInstanceUID) {
      // Skip fetching if we've already fetched this study
      if (fetchedStudiesRef.current.has(StudyInstanceUID)) {
        return;
      }
      fetchedStudiesRef.current.add(StudyInstanceUID);

      // current study qido
      const qidoForStudyUID = await dataSource.query.studies.search({
        studyInstanceUid: StudyInstanceUID
      });
      if (!qidoForStudyUID?.length) {
        navigate('/notfoundstudy', '_self');
        throw new Error('Invalid study URL');
      }
      let qidoStudiesForPatient = qidoForStudyUID;

      // try to fetch the prior studies based on the patientID if the
      // server can respond.
      try {
        qidoStudiesForPatient = await getStudiesForPatientByMRN(qidoForStudyUID);
      } catch (error) {
        console.warn(error);
      }
      const mappedStudies = _mapDataSourceStudies(qidoStudiesForPatient);
      const actuallyMappedStudies = mappedStudies.map(qidoStudy => {
        return {
          studyInstanceUid: qidoStudy.StudyInstanceUID,
          date: formatDate(qidoStudy.StudyDate) || '',
          description: qidoStudy.StudyDescription,
          modalities: qidoStudy.ModalitiesInStudy,
          numInstances: Number(qidoStudy.NumInstances)
        };
      });
      setStudyDisplayList(prevArray => {
        const ret = [...prevArray];
        for (const study of actuallyMappedStudies) {
          if (!prevArray.find(it => it.studyInstanceUid === study.studyInstanceUid)) {
            ret.push(study);
          }
        }
        return ret;
      });
    }
    StudyInstanceUIDs.forEach(sid => fetchStudiesForPatient(sid));
  }, [StudyInstanceUIDs, dataSource, getStudiesForPatientByMRN, navigate]);

  // ~~ Initial Thumbnails
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!hasLoadedViewports) {
      if (activeViewportId) {
        // Once there is an active viewport id, it means the layout is ready
        // so wait a bit of time to allow the viewports preferential loading
        // which improves user experience of responsiveness significantly on slower
        // systems.
        const delayMs = 250 + displaySetService.getActiveDisplaySets().length * 10;
        window.setTimeout(() => setHasLoadedViewports(true), delayMs);
      }
      return;
    }
    let currentDisplaySets = displaySetService.activeDisplaySets;
    // filter non based on the list of modalities that are supported by cornerstone
    currentDisplaySets = currentDisplaySets.filter(ds => !thumbnailNoImageModalities.includes(ds.Modality) || ds.thumbnailSrc === null);
    if (!currentDisplaySets.length) {
      return;
    }
    currentDisplaySets.forEach(async dSet => {
      const newImageSrcEntry = {};
      const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
      const imageIds = dataSource.getImageIdsForDisplaySet(dSet);
      const imageId = getImageIdForThumbnail(displaySet, imageIds);

      // TODO: Is it okay that imageIds are not returned here for SR displaySets?
      if (displaySet?.unsupported) {
        return;
      }
      // When the image arrives, render it and store the result in the thumbnailImgSrcMap
      let {
        thumbnailSrc
      } = displaySet;
      if (!thumbnailSrc && displaySet.getThumbnailSrc) {
        thumbnailSrc = await displaySet.getThumbnailSrc({
          getImageSrc
        });
      }
      if (!thumbnailSrc && imageId) {
        const thumbnailSrc = await getImageSrc(imageId);
        displaySet.thumbnailSrc = thumbnailSrc;
      }
      newImageSrcEntry[dSet.displaySetInstanceUID] = thumbnailSrc;
      setThumbnailImageSrcMap(prevState => {
        return {
          ...prevState,
          ...newImageSrcEntry
        };
      });
    });
  }, [displaySetService, dataSource, getImageSrc, activeViewportId, hasLoadedViewports]);

  // ~~ displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const currentDisplaySets = displaySetService.activeDisplaySets;
    if (!currentDisplaySets.length) {
      return;
    }
    const mappedDisplaySets = mapDisplaySetsWithState(currentDisplaySets, displaySetsLoadingState, thumbnailImageSrcMap, viewports);
    if (!customMapDisplaySets) {
      sortStudyInstances(mappedDisplaySets);
    }
    setDisplaySets(mappedDisplaySets);
  }, [displaySetService.activeDisplaySets, displaySetsLoadingState, viewports, thumbnailImageSrcMap, customMapDisplaySets]);

  // ~~ subscriptions --> displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // DISPLAY_SETS_ADDED returns an array of DisplaySets that were added
    const SubscriptionDisplaySetsAdded = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
      if (!hasLoadedViewports) {
        return;
      }
      const {
        displaySetsAdded,
        options
      } = data;
      displaySetsAdded.forEach(async dSet => {
        const displaySetInstanceUID = dSet.displaySetInstanceUID;
        const newImageSrcEntry = {};
        const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
        if (displaySet?.unsupported) {
          return;
        }
        if (options?.madeInClient) {
          setJumpToDisplaySet(displaySetInstanceUID);
        }
        const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
        const imageId = getImageIdForThumbnail(displaySet, imageIds);

        // TODO: Is it okay that imageIds are not returned here for SR displaysets?
        if (!imageId) {
          return;
        }

        // When the image arrives, render it and store the result in the thumbnailImgSrcMap
        let {
          thumbnailSrc
        } = displaySet;
        if (!thumbnailSrc && displaySet.getThumbnailSrc) {
          thumbnailSrc = await displaySet.getThumbnailSrc({
            getImageSrc
          });
        }
        if (!thumbnailSrc) {
          thumbnailSrc = await getImageSrc(imageId);
          displaySet.thumbnailSrc = thumbnailSrc;
        }
        newImageSrcEntry[displaySetInstanceUID] = thumbnailSrc;
        setThumbnailImageSrcMap(prevState => {
          return {
            ...prevState,
            ...newImageSrcEntry
          };
        });
      });
    });
    return () => {
      SubscriptionDisplaySetsAdded.unsubscribe();
    };
  }, [displaySetService, dataSource, getImageSrc, hasLoadedViewports]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // TODO: Will this always hold _all_ the displaySets we care about?
    // DISPLAY_SETS_CHANGED returns `DisplaySerService.activeDisplaySets`
    const SubscriptionDisplaySetsChanged = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_CHANGED, changedDisplaySets => {
      const mappedDisplaySets = mapDisplaySetsWithState(changedDisplaySets, displaySetsLoadingState, thumbnailImageSrcMap, viewports);
      if (!customMapDisplaySets) {
        sortStudyInstances(mappedDisplaySets);
      }
      setDisplaySets(mappedDisplaySets);
    });
    const SubscriptionDisplaySetMetaDataInvalidated = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SET_SERIES_METADATA_INVALIDATED, () => {
      const mappedDisplaySets = mapDisplaySetsWithState(displaySetService.getActiveDisplaySets(), displaySetsLoadingState, thumbnailImageSrcMap, viewports);
      if (!customMapDisplaySets) {
        sortStudyInstances(mappedDisplaySets);
      }
      setDisplaySets(mappedDisplaySets);
    });
    return () => {
      SubscriptionDisplaySetsChanged.unsubscribe();
      SubscriptionDisplaySetMetaDataInvalidated.unsubscribe();
    };
  }, [displaySetsLoadingState, thumbnailImageSrcMap, viewports, displaySetService, customMapDisplaySets]);
  const tabs = createStudyBrowserTabs(StudyInstanceUIDs, studyDisplayList, displaySets);

  // TODO: Should not fire this on "close"
  function _handleStudyClick(StudyInstanceUID) {
    const shouldCollapseStudy = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    const updatedExpandedStudyInstanceUIDs = shouldCollapseStudy ? [...expandedStudyInstanceUIDs.filter(stdyUid => stdyUid !== StudyInstanceUID)] : [...expandedStudyInstanceUIDs, StudyInstanceUID];
    setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    if (!shouldCollapseStudy) {
      const madeInClient = true;
      requestDisplaySetCreationForStudy(displaySetService, StudyInstanceUID, madeInClient);
    }
  }
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (jumpToDisplaySet) {
      // Get element by displaySetInstanceUID
      const displaySetInstanceUID = jumpToDisplaySet;
      const element = document.getElementById(`thumbnail-${displaySetInstanceUID}`);
      if (element && typeof element.scrollIntoView === 'function') {
        // TODO: Any way to support IE here?
        element.scrollIntoView({
          behavior: 'smooth'
        });
        setJumpToDisplaySet(null);
      }
    }
  }, [jumpToDisplaySet, expandedStudyInstanceUIDs, activeTabName]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!jumpToDisplaySet) {
      return;
    }
    const displaySetInstanceUID = jumpToDisplaySet;
    // Set the activeTabName and expand the study
    const thumbnailLocation = _findTabAndStudyOfDisplaySet(displaySetInstanceUID, tabs);
    if (!thumbnailLocation) {
      console.warn('jumpToThumbnail: displaySet thumbnail not found.');
      return;
    }
    const {
      tabName,
      StudyInstanceUID
    } = thumbnailLocation;
    setActiveTabName(tabName);
    const studyExpanded = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    if (!studyExpanded) {
      const updatedExpandedStudyInstanceUIDs = [...expandedStudyInstanceUIDs, StudyInstanceUID];
      setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    }
  }, [expandedStudyInstanceUIDs, jumpToDisplaySet, tabs]);
  const activeDisplaySetInstanceUIDs = viewports.get(activeViewportId)?.displaySetInstanceUIDs;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_4__.PanelStudyBrowserHeader, {
    viewPresets: viewPresets,
    updateViewPresetValue: updateViewPresetValue,
    actionIcons: actionIcons,
    updateActionIconValue: updateActionIconValue
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Separator, {
    orientation: "horizontal",
    className: "bg-black",
    thickness: "2px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.StudyBrowser, {
    tabs: tabs,
    servicesManager: servicesManager,
    activeTabName: activeTabName,
    expandedStudyInstanceUIDs: expandedStudyInstanceUIDs,
    onClickStudy: _handleStudyClick,
    onClickTab: clickedTabName => {
      setActiveTabName(clickedTabName);
    },
    onClickUntrack: onClickUntrack,
    onClickThumbnail: () => {},
    onDoubleClickThumbnail: onDoubleClickThumbnailHandler,
    activeDisplaySetInstanceUIDs: activeDisplaySetInstanceUIDs,
    showSettings: actionIcons.find(icon => icon.id === 'settings')?.value,
    viewPresets: viewPresets,
    ThumbnailMenuItems: (0,_Components_MoreDropdownMenu__WEBPACK_IMPORTED_MODULE_6__["default"])({
      commandsManager,
      servicesManager,
      menuItemsKey: 'studyBrowser.thumbnailMenuItems'
    }),
    StudyMenuItems: (0,_Components_MoreDropdownMenu__WEBPACK_IMPORTED_MODULE_6__["default"])({
      commandsManager,
      servicesManager,
      menuItemsKey: 'studyBrowser.studyMenuItems'
    })
  }));
}
_s(PanelStudyBrowser, "vuM7nsCiiTKPBNvNAPn616nLifc=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem, react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useImageViewer, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid];
});
_c = PanelStudyBrowser;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PanelStudyBrowser);

/**
 * Maps from the DataSource's format to a naturalized object
 *
 * @param {*} studies
 */
function _mapDataSourceStudies(studies) {
  return studies.map(study => {
    // TODO: Why does the data source return in this format?
    return {
      AccessionNumber: study.accession,
      StudyDate: study.date,
      StudyDescription: study.description,
      NumInstances: study.instances,
      ModalitiesInStudy: study.modalities,
      PatientID: study.mrn,
      PatientName: study.patientName,
      StudyInstanceUID: study.studyInstanceUid,
      StudyTime: study.time
    };
  });
}
function _mapDisplaySets(displaySets, displaySetLoadingState, thumbnailImageSrcMap, viewports) {
  const thumbnailDisplaySets = [];
  const thumbnailNoImageDisplaySets = [];
  displaySets.filter(ds => !ds.excludeFromThumbnailBrowser).forEach(ds => {
    const {
      thumbnailSrc,
      displaySetInstanceUID
    } = ds;
    const componentType = _getComponentType(ds);
    const array = componentType === 'thumbnail' ? thumbnailDisplaySets : thumbnailNoImageDisplaySets;
    const loadingProgress = displaySetLoadingState?.[displaySetInstanceUID];
    array.push({
      displaySetInstanceUID,
      description: ds.SeriesDescription || '',
      seriesNumber: ds.SeriesNumber,
      modality: ds.Modality,
      seriesDate: formatDate(ds.SeriesDate),
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
        // .. Any other data to pass
      },
      isHydratedForDerivedDisplaySet: ds.isHydrated
    });
  });
  return [...thumbnailDisplaySets, ...thumbnailNoImageDisplaySets];
}
function _getComponentType(ds) {
  if (thumbnailNoImageModalities.includes(ds.Modality) || ds?.unsupported || ds.thumbnailSrc === null) {
    return 'thumbnailNoImage';
  }
  return 'thumbnail';
}
function getImageIdForThumbnail(displaySet, imageIds) {
  let imageId;
  if (displaySet.isDynamicVolume) {
    const timePoints = displaySet.dynamicVolumeInfo.timePoints;
    const middleIndex = Math.floor(timePoints.length / 2);
    const middleTimePointImageIds = timePoints[middleIndex];
    imageId = middleTimePointImageIds[Math.floor(middleTimePointImageIds.length / 2)];
  } else {
    imageId = imageIds[Math.floor(imageIds.length / 2)];
  }
  return imageId;
}
function _findTabAndStudyOfDisplaySet(displaySetInstanceUID, tabs) {
  for (let t = 0; t < tabs.length; t++) {
    const {
      studies
    } = tabs[t];
    for (let s = 0; s < studies.length; s++) {
      const {
        displaySets
      } = studies[s];
      for (let d = 0; d < displaySets.length; d++) {
        const displaySet = displaySets[d];
        if (displaySet.displaySetInstanceUID === displaySetInstanceUID) {
          return {
            tabName: tabs[t].name,
            StudyInstanceUID: studies[s].studyInstanceUid
          };
        }
      }
    }
  }
}
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelStudyBrowser");

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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelStudyBrowserHeader: () => (/* binding */ PanelStudyBrowserHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function PanelStudyBrowserHeader({
  viewPresets,
  updateViewPresetValue,
  actionIcons,
  updateActionIconValue
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-muted flex h-[40px] select-none rounded-t p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: 'flex h-[24px] w-full select-none justify-center self-center text-[14px]'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-full items-center gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-primary flex items-center space-x-1"
  }, actionIcons.map((icon, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons[icon.iconName] || _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.MissingIcon, {
    key: index,
    onClick: () => updateActionIconValue(icon),
    className: `cursor-pointer`
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ml-auto flex h-full items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToggleGroup, {
    type: "single",
    value: viewPresets.filter(preset => preset.selected)[0].id,
    onValueChange: value => {
      const selectedViewPreset = viewPresets.find(preset => preset.id === value);
      updateViewPresetValue(selectedViewPreset);
    }
  }, viewPresets.map((viewPreset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToggleGroupItem, {
    key: index,
    "aria-label": viewPreset.id,
    value: viewPreset.id,
    className: "text-actions-primary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons[viewPreset.iconName] || _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.MissingIcon)))))))));
}
_c = PanelStudyBrowserHeader;

var _c;
__webpack_require__.$Refresh$.register(_c, "PanelStudyBrowserHeader");

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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultActionIcons: () => (/* binding */ defaultActionIcons)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultActionIcons = [{
  id: 'settings',
  iconName: 'Settings',
  value: false
}];


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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultActionIcons: () => (/* reexport safe */ _actionIcons__WEBPACK_IMPORTED_MODULE_0__.defaultActionIcons),
/* harmony export */   defaultViewPresets: () => (/* reexport safe */ _viewPresets__WEBPACK_IMPORTED_MODULE_1__.defaultViewPresets)
/* harmony export */ });
/* harmony import */ var _actionIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionIcons */ "../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts");
/* harmony import */ var _viewPresets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewPresets */ "../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts");
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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultViewPresets: () => (/* binding */ defaultViewPresets)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultViewPresets = [{
  id: 'list',
  iconName: 'ListView',
  selected: false
}, {
  id: 'thumbnails',
  iconName: 'ThumbnailView',
  selected: true
}];


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

/***/ "../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StudyBrowser/PanelStudyBrowser */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx");
/* harmony import */ var _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getImageSrcFromImageId */ "../../../extensions/default/src/Panels/getImageSrcFromImageId.js");
/* harmony import */ var _getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getStudiesForPatientByMRN */ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js");
/* harmony import */ var _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./requestDisplaySetCreationForStudy */ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();

//






/**
 * Wraps the PanelStudyBrowser and provides features afforded by managers/services
 *
 * @param {object} params
 * @param {object} commandsManager
 * @param {object} extensionManager
 */
function WrappedPanelStudyBrowser() {
  _s();
  const {
    extensionManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_5__.useSystem)();
  // TODO: This should be made available a different way; route should have
  // already determined our datasource
  const [dataSource] = extensionManager.getActiveDataSource();
  const _getStudiesForPatientByMRN = _getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_3__["default"].bind(null, dataSource);
  const _getImageSrcFromImageId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_createGetImageSrcFromImageIdFn(extensionManager), []);
  const _requestDisplaySetCreationForStudy = _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_4__["default"].bind(null, dataSource);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
_s(WrappedPanelStudyBrowser, "VBl3w6h1VvKF7U9AVeERoMHQXTM=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_5__.useSystem];
});
_c = WrappedPanelStudyBrowser;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WrappedPanelStudyBrowser);
var _c;
__webpack_require__.$Refresh$.register(_c, "WrappedPanelStudyBrowser");

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

/***/ "../../../extensions/default/src/Panels/createReportDialogPrompt.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/createReportDialogPrompt.tsx ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateReportDialogPrompt)
/* harmony export */ });
/* harmony import */ var _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/_shared/PROMPT_RESPONSES */ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function CreateReportDialogPrompt({
  title = 'Create Report',
  extensionManager,
  servicesManager
}) {
  const {
    uiDialogService,
    customizationService
  } = servicesManager.services;
  const dataSources = extensionManager.getDataSourcesForUI();
  const ReportDialog = customizationService.getCustomization('ohif.createReportDialog');
  const allowMultipleDataSources = window.config.allowMultiSelectExport;
  return new Promise(function (resolve, reject) {
    uiDialogService.show({
      id: 'report-dialog',
      title,
      content: ReportDialog,
      contentProps: {
        dataSources: allowMultipleDataSources ? dataSources : undefined,
        onSave: async ({
          reportName,
          dataSource: selectedDataSource,
          series
        }) => {
          resolve({
            value: reportName,
            dataSourceName: selectedDataSource,
            series,
            action: _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_0__["default"].CREATE_REPORT
          });
        },
        onCancel: () => {
          resolve({
            action: _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_0__["default"].CANCEL,
            value: undefined,
            series: undefined,
            dataSourceName: undefined
          });
        },
        defaultValue: title
      }
    });
  });
}
_c = CreateReportDialogPrompt;
var _c;
__webpack_require__.$Refresh$.register(_c, "CreateReportDialogPrompt");

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

/***/ "../../../extensions/default/src/Panels/getImageSrcFromImageId.js":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/getImageSrcFromImageId.js ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

async function getStudiesForPatientByMRN(dataSource, qidoForStudyUID) {
  if (!qidoForStudyUID?.length) {
    return [];
  }
  const mrn = qidoForStudyUID[0].mrn;

  // if not defined or empty, return the original qidoForStudyUID
  if (!mrn) {
    return qidoForStudyUID;
  }
  return dataSource.query.studies.search({
    patientId: mrn,
    disableWildcard: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getStudiesForPatientByMRN);

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

/***/ "../../../extensions/default/src/Panels/index.js":
/*!*******************************************************!*\
  !*** ../../../extensions/default/src/Panels/index.js ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelStudyBrowser: () => (/* reexport safe */ _StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   WrappedPanelStudyBrowser: () => (/* reexport safe */ _WrappedPanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   createReportDialogPrompt: () => (/* reexport safe */ _createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StudyBrowser/PanelStudyBrowser */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx");
/* harmony import */ var _WrappedPanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WrappedPanelStudyBrowser */ "../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx");
/* harmony import */ var _createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createReportDialogPrompt */ "../../../extensions/default/src/Panels/createReportDialogPrompt.tsx");
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

/***/ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function requestDisplaySetCreationForStudy(dataSource, displaySetService, StudyInstanceUID, madeInClient) {
  // TODO: is this already short-circuited by the map of Retrieve promises?
  if (displaySetService.activeDisplaySets.some(displaySet => displaySet.StudyInstanceUID === StudyInstanceUID)) {
    return;
  }
  return dataSource.retrieve.series.metadata({
    StudyInstanceUID,
    madeInClient
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestDisplaySetCreationForStudy);

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

/***/ "../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chartHandler: () => (/* binding */ chartHandler)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../id */ "../../../extensions/default/src/id.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const SOPClassHandlerName = 'chart';
const CHART_MODALITY = 'CHT';

// Private SOPClassUid for chart data
const ChartDataSOPClassUid = '1.9.451.13215.7.3.2.7.6.1';
const sopClassUids = [ChartDataSOPClassUid];
const makeChartDataDisplaySet = (instance, sopClassUids) => {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID
  } = instance;
  return {
    Modality: CHART_MODALITY,
    loading: false,
    isReconstructable: false,
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: `${_id__WEBPACK_IMPORTED_MODULE_1__.id}.sopClassHandlerModule.${SOPClassHandlerName}`,
    SOPClassUID,
    isDerivedDisplaySet: true,
    isLoaded: true,
    sopClassUids,
    instance,
    instances: [instance],
    /**
     * Adds instances to the chart displaySet, rather than creating a new one
     * when user moves to a different workflow step and gets back to a step that
     * recreates the chart
     */
    addInstances: function (instances, _displaySetService) {
      this.instances.push(...instances);
      this.instance = this.instances[this.instances.length - 1];
      return this;
    }
  };
};
function getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}
function _getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const sopClassUids = getSopClassUids(instances);
  const displaySets = instances.map(instance => {
    if (instance.Modality === CHART_MODALITY) {
      return makeChartDataDisplaySet(instance, sopClassUids);
    }
    throw new Error('Unsupported modality');
  });
  return displaySets;
}
const chartHandler = {
  name: SOPClassHandlerName,
  sopClassUids,
  getDisplaySetsFromSeries: instances => {
    return _getDisplaySetsFromSeries(instances);
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

/***/ "../../../extensions/default/src/Toolbar/ToolBoxWrapper.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolBoxWrapper.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolBoxButtonGroupWrapper: () => (/* binding */ ToolBoxButtonGroupWrapper),
/* harmony export */   ToolBoxButtonWrapper: () => (/* binding */ ToolBoxButtonWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core_src_hooks_useToolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core/src/hooks/useToolbar */ "../../core/src/hooks/useToolbar.tsx");
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





/**
 * Wraps the ToolButtonList component to handle the OHIF toolbar button structure
 * @param props - Component props
 * @returns Component
 */
function ToolBoxButtonGroupWrapper({
  buttonSection,
  id
}) {
  _s();
  const {
    onInteraction,
    toolbarButtons
  } = (0,_ohif_core_src_hooks_useToolbar__WEBPACK_IMPORTED_MODULE_3__.useToolbar)({
    buttonSection
  });
  if (!buttonSection) {
    return null;
  }
  const items = toolbarButtons.map(button => button.componentProps);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-popover flex flex-row space-x-1 rounded-md px-0 py-0"
  }, items.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ToolButton, _extends({}, item, {
    key: item.id,
    size: "small",
    className: item.disabled && 'text-foreground/70',
    onInteraction: event => {
      onInteraction?.({
        event,
        id,
        commands: item.commands,
        itemId: item.id,
        item
      });
    }
  }))));
}
_s(ToolBoxButtonGroupWrapper, "tLjZD2Y0E4+CQ8sAi3+XVB/EaIY=", false, function () {
  return [_ohif_core_src_hooks_useToolbar__WEBPACK_IMPORTED_MODULE_3__.useToolbar];
});
_c = ToolBoxButtonGroupWrapper;
function ToolBoxButtonWrapper({
  onInteraction,
  className,
  options,
  ...props
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-popover flex flex-row rounded-md px-0 py-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ToolButton, _extends({}, props, {
    id: props.id,
    size: "small",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(props.disabled && 'text-foreground/70', className),
    onInteraction: event => {
      onInteraction?.({
        event,
        itemId: props.id,
        commands: props.commands,
        options
      });
    }
  })));
}
_c2 = ToolBoxButtonWrapper;
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "ToolBoxButtonGroupWrapper");
__webpack_require__.$Refresh$.register(_c2, "ToolBoxButtonWrapper");

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

/***/ "../../../extensions/default/src/Toolbar/ToolButtonListWrapper.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolButtonListWrapper.tsx ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToolButtonListWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core_src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src */ "../../core/src/index.ts");
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



/**
 * Wraps the ToolButtonList component to handle the OHIF toolbar button structure
 * @param props - Component props
 * @returns Component
 * // test
 */
function ToolButtonListWrapper({
  buttonSection,
  id
}) {
  _s();
  const {
    onInteraction,
    toolbarButtons
  } = (0,_ohif_core_src__WEBPACK_IMPORTED_MODULE_2__.useToolbar)({
    buttonSection
  });
  if (!toolbarButtons?.length) {
    return null;
  }
  const primary = toolbarButtons.find(button => button.componentProps.isActive)?.componentProps || toolbarButtons[0].componentProps;
  const items = toolbarButtons.map(button => button.componentProps);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolButtonList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolButtonListDefault, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": `${id}-split-button-primary`,
    "data-tool": primary.id,
    "data-active": primary.isActive
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolButton, _extends({}, primary, {
    onInteraction: ({
      itemId
    }) => onInteraction?.({
      id,
      itemId,
      commands: primary.commands
    }),
    className: primary.className
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolButtonListDivider, {
    className: primary.isActive ? 'opacity-0' : 'opacity-100'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": `${id}-split-button-secondary`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolButtonListDropDown, null, items.map(item => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolButtonListItem, _extends({
      key: item.id
    }, item, {
      "data-cy": item.id,
      "data-tool": item.id,
      "data-active": item.isActive,
      onSelect: () => onInteraction?.({
        id,
        itemId: item.id,
        commands: item.commands
      })
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "pl-1"
    }, item.label || item.tooltip || item.id));
  }))));
}
_s(ToolButtonListWrapper, "tLjZD2Y0E4+CQ8sAi3+XVB/EaIY=", false, function () {
  return [_ohif_core_src__WEBPACK_IMPORTED_MODULE_2__.useToolbar];
});
_c = ToolButtonListWrapper;
var _c;
__webpack_require__.$Refresh$.register(_c, "ToolButtonListWrapper");

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

/***/ "../../../extensions/default/src/Toolbar/ToolButtonWrapper.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolButtonWrapper.tsx ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolButtonWrapper: () => (/* binding */ ToolButtonWrapper),
/* harmony export */   "default": () => (/* binding */ ToolButtonWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
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


function ToolButtonWrapper(props) {
  _s();
  const {
    IconContainer,
    containerProps
  } = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useIconPresentation)();
  const Icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.ByName, {
    name: props.icon
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, IconContainer ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(IconContainer, _extends({
    disabled: props.disabled
  }, props, containerProps), Icon) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "ghost",
    size: "icon",
    disabled: props.disabled
  }, Icon));
}
_s(ToolButtonWrapper, "EdmW9abovJfPd/zhVl7Xid0J3hE=", false, function () {
  return [_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useIconPresentation];
});
_c = ToolButtonWrapper;

var _c;
__webpack_require__.$Refresh$.register(_c, "ToolButtonWrapper");

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

/***/ "../../../extensions/default/src/Toolbar/ToolRowWrapper.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolRowWrapper.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
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


function ToolRowWrapper({
  buttonSection,
  className = '',
  show = true
}) {
  _s();
  const {
    onInteraction,
    toolbarButtons
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar)({
    buttonSection
  });

  // No need for debugger statement
  if (!toolbarButtons?.length) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `space-x-1} flex flex-row items-center ${className}`
  }, toolbarButtons.map((button, index) => {
    const {
      id,
      Component,
      componentProps
    } = button;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: id || index,
      className: "flex-shrink-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({}, componentProps, {
      onInteraction: onInteraction,
      location: componentProps.location || buttonSection
    })));
  }));
}
_s(ToolRowWrapper, "tLjZD2Y0E4+CQ8sAi3+XVB/EaIY=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar];
});
_c = ToolRowWrapper;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolRowWrapper);
var _c;
__webpack_require__.$Refresh$.register(_c, "ToolRowWrapper");

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

/***/ "../../../extensions/default/src/Toolbar/Toolbar.tsx":
/*!***********************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/Toolbar.tsx ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toolbar: () => (/* binding */ Toolbar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
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


function Toolbar({
  buttonSection = 'primary',
  viewportId,
  location
}) {
  _s();
  const {
    toolbarButtons,
    onInteraction,
    isItemOpen,
    isItemLocked,
    openItem,
    closeItem,
    toggleLock
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar)({
    buttonSection
  });
  if (!toolbarButtons.length) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, toolbarButtons?.map(toolDef => {
    if (!toolDef) {
      return null;
    }
    const {
      id,
      Component,
      componentProps
    } = toolDef;

    // Enhanced props with state and actions - respecting viewport specificity
    const enhancedProps = {
      ...componentProps,
      isOpen: isItemOpen(id, viewportId),
      isLocked: isItemLocked(id, viewportId),
      onOpen: () => openItem(id, viewportId),
      onClose: () => closeItem(id, viewportId),
      onToggleLock: () => toggleLock(id, viewportId),
      viewportId
    };
    const tool = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({
      key: id,
      id: id,
      location: location,
      onInteraction: args => {
        onInteraction({
          ...args,
          itemId: id,
          viewportId
        });
      }
    }, enhancedProps));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: id
    }, tool);
  }));
}
_s(Toolbar, "dqf1Gez2RiHQsKfbgExIlDLylbM=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar];
});
_c = Toolbar;
var _c;
__webpack_require__.$Refresh$.register(_c, "Toolbar");

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

/***/ "../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
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
// Updated ToolbarLayoutSelector.tsx




function ToolbarLayoutSelectorWithServices({
  commandsManager,
  servicesManager,
  rows = 3,
  columns = 4,
  ...props
}) {
  _s();
  const {
    customizationService
  } = servicesManager.services;

  // Get the presets from the customization service
  const commonPresets = customizationService?.getCustomization('layoutSelector.commonPresets') || [{
    icon: 'layout-single',
    commandOptions: {
      numRows: 1,
      numCols: 1
    }
  }, {
    icon: 'layout-side-by-side',
    commandOptions: {
      numRows: 1,
      numCols: 2
    }
  }, {
    icon: 'layout-four-up',
    commandOptions: {
      numRows: 2,
      numCols: 2
    }
  }, {
    icon: 'layout-three-row',
    commandOptions: {
      numRows: 3,
      numCols: 1
    }
  }];

  // Get the advanced presets generator from the customization service
  const advancedPresetsGenerator = customizationService?.getCustomization('layoutSelector.advancedPresetGenerator');

  // Generate the advanced presets
  const advancedPresets = advancedPresetsGenerator ? advancedPresetsGenerator({
    servicesManager
  }) : [{
    title: 'MPR',
    icon: 'layout-three-col',
    commandOptions: {
      protocolId: 'mpr'
    }
  }, {
    title: '3D four up',
    icon: 'layout-four-up',
    commandOptions: {
      protocolId: '3d-four-up'
    }
  }, {
    title: '3D main',
    icon: 'layout-three-row',
    commandOptions: {
      protocolId: '3d-main'
    }
  }, {
    title: 'Axial Primary',
    icon: 'layout-side-by-side',
    commandOptions: {
      protocolId: 'axial-primary'
    }
  }, {
    title: '3D only',
    icon: 'layout-single',
    commandOptions: {
      protocolId: '3d-only'
    }
  }, {
    title: '3D primary',
    icon: 'layout-side-by-side',
    commandOptions: {
      protocolId: '3d-primary'
    }
  }, {
    title: 'Frame View',
    icon: 'icon-stack',
    commandOptions: {
      protocolId: 'frame-view'
    }
  }];

  // Unified selection handler that dispatches to the appropriate command
  const handleSelectionChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((commandOptions, isPreset) => {
    if (isPreset) {
      // Advanced preset selection
      commandsManager.run({
        commandName: 'setHangingProtocol',
        commandOptions
      });
    } else {
      // Common preset or custom grid selection
      commandsManager.run({
        commandName: 'setViewportGridLayout',
        commandOptions
      });
    }
  }, [commandsManager]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "Layout",
    "data-cy": "Layout"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector, _extends({
    onSelectionChange: handleSelectionChange
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.Trigger, {
    tooltip: "Change layout"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.Content, null, (commonPresets.length > 0 || advancedPresets.length > 0) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-popover flex flex-col gap-2.5 rounded-lg p-2"
  }, commonPresets.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.PresetSection, {
    title: "Common"
  }, commonPresets.map((preset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.Preset, {
    key: `common-preset-${index}`,
    icon: preset.icon,
    commandOptions: preset.commandOptions,
    isPreset: false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.Divider, null)), advancedPresets.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.PresetSection, {
    title: "Advanced"
  }, advancedPresets.map((preset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.Preset, {
    key: `advanced-preset-${index}`,
    title: preset.title,
    icon: preset.icon,
    commandOptions: preset.commandOptions,
    disabled: preset.disabled,
    isPreset: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-muted flex flex-col gap-2.5 border-l-2 border-solid border-black p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-muted-foreground text-xs"
  }, "Custom"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.GridSelector, {
    rows: rows,
    columns: columns
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LayoutSelector.HelpText, null, "Hover to select ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), "rows and columns ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), " Click to apply")))));
}
_s(ToolbarLayoutSelectorWithServices, "muvwvtwNdX7ju60cthy8YyzO7aA=");
_c = ToolbarLayoutSelectorWithServices;
ToolbarLayoutSelectorWithServices.propTypes = {
  commandsManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.CommandsManager),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  rows: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  columns: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarLayoutSelectorWithServices);
var _c;
__webpack_require__.$Refresh$.register(_c, "ToolbarLayoutSelectorWithServices");

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

/***/ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PatientInfoVisibility: () => (/* binding */ PatientInfoVisibility),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/usePatientInfo */ "../../../extensions/default/src/hooks/usePatientInfo.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();



let PatientInfoVisibility = /*#__PURE__*/function (PatientInfoVisibility) {
  PatientInfoVisibility["VISIBLE"] = "visible";
  PatientInfoVisibility["VISIBLE_COLLAPSED"] = "visibleCollapsed";
  PatientInfoVisibility["DISABLED"] = "disabled";
  PatientInfoVisibility["VISIBLE_READONLY"] = "visibleReadOnly";
  return PatientInfoVisibility;
}({});
const formatWithEllipsis = (str, maxLength) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};
function HeaderPatientInfo({
  servicesManager,
  appConfig
}) {
  _s();
  const initialExpandedState = appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE || appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE_READONLY;
  const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialExpandedState);
  const {
    patientInfo,
    isMixedPatients
  } = (0,_hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__["default"])(servicesManager);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isMixedPatients && expanded) {
      setExpanded(false);
    }
  }, [isMixedPatients, expanded]);
  const handleOnClick = () => {
    if (!isMixedPatients && appConfig.showPatientInfo !== PatientInfoVisibility.VISIBLE_READONLY) {
      setExpanded(!expanded);
    }
  };
  const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
  const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hover:bg-primary-dark flex cursor-pointer items-center justify-center gap-1 rounded-lg",
    onClick: handleOnClick
  }, isMixedPatients ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.MultiplePatients, {
    className: "text-primary"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.Patient, {
    className: "text-primary"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col justify-center"
  }, expanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "self-start text-[13px] font-bold text-white"
  }, formattedPatientName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-aqua-pale flex gap-2 text-[11px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, formattedPatientID), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, patientInfo.PatientSex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, patientInfo.PatientDOB))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-primary self-center text-[13px]"
  }, isMixedPatients ? 'Multiple Patients' : 'Patient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.ArrowLeft, {
    className: `text-primary ${expanded ? 'rotate-180' : ''}`
  }));
}
_s(HeaderPatientInfo, "aekHMZyRCCytEVeE8BYjXA1ED04=", false, function () {
  return [_hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__["default"]];
});
_c = HeaderPatientInfo;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderPatientInfo);
var _c;
__webpack_require__.$Refresh$.register(_c, "HeaderPatientInfo");

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

/***/ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js":
/*!*******************************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderPatientInfo */ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/default/src/ViewerLayout/ResizablePanelsHook.tsx":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/ResizablePanelsHook.tsx ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_resizable_panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-resizable-panels */ "../../../node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.esm.js");
/* harmony import */ var _constants_panels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/panels */ "../../../extensions/default/src/ViewerLayout/constants/panels.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




/**
 * Set the minimum and maximum css style width attributes for the given element.
 * The two style attributes are cleared whenever the width
 * argument is undefined.
 * <p>
 * This utility is used as part of a HACK throughout the ViewerLayout component as
 * the means of restricting the side panel widths during the resizing of the
 * browser window. In general, the widths are always set unless the resize
 * handle for either side panel is being dragged (i.e. a side panel is being resized).
 *
 * @param elem the element
 * @param width the max and min width to set on the element
 */
const setMinMaxWidth = (elem, width) => {
  if (!elem) {
    return;
  }
  elem.style.minWidth = width === undefined ? '' : `${width}px`;
  elem.style.maxWidth = elem.style.minWidth;
};
const useResizablePanels = (leftPanelClosed, setLeftPanelClosed, rightPanelClosed, setRightPanelClosed, hasLeftPanels, hasRightPanels) => {
  _s();
  const [leftPanelExpandedWidth, setLeftPanelExpandedWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.initialExpandedWidth);
  const [rightPanelExpandedWidth, setRightPanelExpandedWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.initialExpandedWidth);
  const [leftResizablePanelMinimumSize, setLeftResizablePanelMinimumSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [rightResizablePanelMinimumSize, setRightResizablePanelMinimumSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [leftResizablePanelCollapsedSize, setLeftResizePanelCollapsedSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [rightResizePanelCollapsedSize, setRightResizePanelCollapsedSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const resizablePanelGroupElemRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const resizableLeftPanelElemRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const resizableRightPanelElemRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const resizableLeftPanelAPIRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const resizableRightPanelAPIRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isResizableHandleDraggingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  // The total width of both handles.
  const resizableHandlesWidth = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // This useLayoutEffect is used to...
  // - Grab a reference to the various resizable panel elements needed for
  //   converting between percentages and pixels in various callbacks.
  // - Expand those panels that are initially expanded.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const panelGroupElem = (0,react_resizable_panels__WEBPACK_IMPORTED_MODULE_1__.getPanelGroupElement)(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.groupId);
    resizablePanelGroupElemRef.current = panelGroupElem;
    const leftPanelElem = (0,react_resizable_panels__WEBPACK_IMPORTED_MODULE_1__.getPanelElement)(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.panelId);
    resizableLeftPanelElemRef.current = leftPanelElem;
    const rightPanelElem = (0,react_resizable_panels__WEBPACK_IMPORTED_MODULE_1__.getPanelElement)(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.panelId);
    resizableRightPanelElemRef.current = rightPanelElem;

    // Calculate and set the width of both handles combined.
    const resizeHandles = document.querySelectorAll('[data-panel-resize-handle-id]');
    resizableHandlesWidth.current = 0;
    resizeHandles.forEach(resizeHandle => {
      resizableHandlesWidth.current += resizeHandle.offsetWidth;
    });

    // Since both resizable panels are collapsed by default (i.e. their default size is zero),
    // on the very first render check if either/both side panels should be expanded.
    // we use the initialExpandedOffsetWidth on the first render incase the panel has min width but we want the initial state to be larger than that

    if (!leftPanelClosed) {
      const leftResizablePanelExpandedSize = getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.initialExpandedOffsetWidth);
      resizableLeftPanelAPIRef?.current?.expand(leftResizablePanelExpandedSize);
      setMinMaxWidth(leftPanelElem, _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.initialExpandedOffsetWidth);
    }
    if (!rightPanelClosed) {
      const rightResizablePanelExpandedSize = getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.initialExpandedOffsetWidth);
      resizableRightPanelAPIRef?.current?.expand(rightResizablePanelExpandedSize);
      setMinMaxWidth(rightPanelElem, _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.initialExpandedOffsetWidth);
    }
  }, []); // no dependencies because this useLayoutEffect is only needed on the very first render

  // This useLayoutEffect follows the pattern prescribed by the react-resizable-panels
  // readme for converting between pixel values and percentages. An example of
  // the pattern can be found here:
  // https://github.com/bvaughn/react-resizable-panels/issues/46#issuecomment-1368108416
  // This useLayoutEffect is used to...
  // - Ensure that the percentage size is up-to-date with the pixel sizes
  // - Add a resize observer to the resizable panel group to reset various state
  //   values whenever the resizable panel group is resized (e.g. whenever the
  //   browser window is resized).
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    // Ensure the side panels' percentage size is in synch with the pixel width of the
    // expanded side panels. In general the two get out-of-sync during a browser
    // window resize. Note that this code is here and NOT in the ResizeObserver
    // because it has to be done AFTER the minimum percentage size for a panel is
    // updated which occurs only AFTER the render following a browser window resize.
    // And by virtue of the dependency on the minimum size state variables, this code
    // is executed on the render following an update of the minimum percentage sizes
    // for a panel.
    if (!resizableLeftPanelAPIRef.current?.isCollapsed()) {
      const leftSize = getPercentageSize(leftPanelExpandedWidth + _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize);
      resizableLeftPanelAPIRef.current?.resize(leftSize);
    }
    if (!resizableRightPanelAPIRef?.current?.isCollapsed()) {
      const rightSize = getPercentageSize(rightPanelExpandedWidth + _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize);
      resizableRightPanelAPIRef?.current?.resize(rightSize);
    }

    // This observer kicks in when the ViewportLayout resizable panel group
    // component is resized. This typically occurs when the browser window resizes.
    const observer = new ResizeObserver(() => {
      const minimumLeftSize = getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.minimumExpandedOffsetWidth);
      const minimumRightSize = getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.minimumExpandedOffsetWidth);

      // Set the new minimum and collapsed resizable panel sizes.
      setLeftResizablePanelMinimumSize(minimumLeftSize);
      setRightResizablePanelMinimumSize(minimumRightSize);
      setLeftResizePanelCollapsedSize(getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.collapsedOffsetWidth));
      setRightResizePanelCollapsedSize(getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.collapsedOffsetWidth));
    });
    observer.observe(resizablePanelGroupElemRef.current);
    return () => {
      observer.disconnect();
    };
  }, [leftPanelExpandedWidth, rightPanelExpandedWidth, leftResizablePanelMinimumSize, rightResizablePanelMinimumSize, hasLeftPanels, hasRightPanels]);

  /**
   * Handles dragging of either side panel resize handle.
   */
  const onHandleDragging = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(isStartDrag => {
    if (isStartDrag) {
      isResizableHandleDraggingRef.current = true;
      setMinMaxWidth(resizableLeftPanelElemRef.current);
      setMinMaxWidth(resizableRightPanelElemRef.current);
    } else {
      isResizableHandleDraggingRef.current = false;
      if (resizableLeftPanelAPIRef?.current?.isExpanded()) {
        setMinMaxWidth(resizableLeftPanelElemRef.current, leftPanelExpandedWidth + _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize);
      }
      if (resizableRightPanelAPIRef?.current?.isExpanded()) {
        setMinMaxWidth(resizableRightPanelElemRef.current, rightPanelExpandedWidth + _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize);
      }
    }
  }, [leftPanelExpandedWidth, rightPanelExpandedWidth]);
  const onLeftPanelClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setLeftPanelClosed(true);
    setMinMaxWidth(resizableLeftPanelElemRef.current);
    resizableLeftPanelAPIRef?.current?.collapse();
  }, [setLeftPanelClosed]);
  const onLeftPanelOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    resizableLeftPanelAPIRef?.current?.expand(getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.initialExpandedOffsetWidth));
    setLeftPanelClosed(false);
  }, [setLeftPanelClosed]);
  const onLeftPanelResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(size => {
    if (!resizablePanelGroupElemRef?.current || resizableLeftPanelAPIRef.current?.isCollapsed()) {
      return;
    }
    const newExpandedWidth = getExpandedPixelWidth(size);
    setLeftPanelExpandedWidth(newExpandedWidth);
    if (!isResizableHandleDraggingRef.current) {
      // This typically gets executed when the left panel is expanded via one of the UI
      // buttons. It is done here instead of in the onLeftPanelOpen method
      // because here we know the size of the expanded panel.
      setMinMaxWidth(resizableLeftPanelElemRef.current, newExpandedWidth);
    }
  }, []);
  const onRightPanelClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setRightPanelClosed(true);
    setMinMaxWidth(resizableRightPanelElemRef.current);
    resizableRightPanelAPIRef?.current?.collapse();
  }, [setRightPanelClosed]);
  const onRightPanelOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    resizableRightPanelAPIRef?.current?.expand(getPercentageSize(_constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.initialExpandedOffsetWidth));
    setRightPanelClosed(false);
  }, [setRightPanelClosed]);
  const onRightPanelResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(size => {
    if (!resizablePanelGroupElemRef?.current || resizableRightPanelAPIRef?.current?.isCollapsed()) {
      return;
    }
    const newExpandedWidth = getExpandedPixelWidth(size);
    setRightPanelExpandedWidth(newExpandedWidth);
    if (!isResizableHandleDraggingRef.current) {
      // This typically gets executed when the right panel is expanded via one of the UI
      // buttons. It is done here instead of in the onRightPanelOpen method
      // because here we know the size of the expanded panel.
      setMinMaxWidth(resizableRightPanelElemRef.current, newExpandedWidth);
    }
  }, []);

  /**
   * Gets the percentage size corresponding to the given pixel size.
   * Note that the width attributed to the handles must be taken into account.
   */
  const getPercentageSize = pixelSize => {
    const {
      width: panelGroupWidth
    } = resizablePanelGroupElemRef.current?.getBoundingClientRect();
    return pixelSize / (panelGroupWidth - resizableHandlesWidth.current) * 100;
  };

  /**
   * Gets the width in pixels for an expanded panel given its percentage size/width.
   * Note that the width attributed to the handles must be taken into account.
   */
  const getExpandedPixelWidth = percentageSize => {
    const {
      width: panelGroupWidth
    } = resizablePanelGroupElemRef.current?.getBoundingClientRect();
    const expandedWidth = percentageSize / 100 * (panelGroupWidth - resizableHandlesWidth.current) - _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize;
    return expandedWidth;
  };
  return [{
    expandedWidth: leftPanelExpandedWidth,
    collapsedWidth: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.collapsedWidth,
    collapsedInsideBorderSize: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.collapsedInsideBorderSize,
    collapsedOutsideBorderSize: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.collapsedOutsideBorderSize,
    expandedInsideBorderSize: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize,
    onClose: onLeftPanelClose,
    onOpen: onLeftPanelOpen
  }, {
    expandedWidth: rightPanelExpandedWidth,
    collapsedWidth: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.collapsedWidth,
    collapsedInsideBorderSize: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.collapsedInsideBorderSize,
    collapsedOutsideBorderSize: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.collapsedOutsideBorderSize,
    expandedInsideBorderSize: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.shared.expandedInsideBorderSize,
    onClose: onRightPanelClose,
    onOpen: onRightPanelOpen
  }, {
    direction: 'horizontal',
    id: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.groupId
  }, {
    defaultSize: leftResizablePanelMinimumSize,
    minSize: leftResizablePanelMinimumSize,
    onResize: onLeftPanelResize,
    collapsible: true,
    collapsedSize: leftResizablePanelCollapsedSize,
    onCollapse: () => setLeftPanelClosed(true),
    onExpand: () => setLeftPanelClosed(false),
    ref: resizableLeftPanelAPIRef,
    order: 0,
    id: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.left.panelId
  }, {
    order: 1,
    id: 'viewerLayoutResizableViewportGridPanel'
  }, {
    defaultSize: rightResizablePanelMinimumSize,
    minSize: rightResizablePanelMinimumSize,
    onResize: onRightPanelResize,
    collapsible: true,
    collapsedSize: rightResizePanelCollapsedSize,
    onCollapse: () => setRightPanelClosed(true),
    onExpand: () => setRightPanelClosed(false),
    ref: resizableRightPanelAPIRef,
    order: 2,
    id: _constants_panels__WEBPACK_IMPORTED_MODULE_2__.panelGroupDefinition.right.panelId
  }, onHandleDragging];
};
_s(useResizablePanels, "JY9U/MdCIA690gJzTQFqaT6lB/E=");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useResizablePanels);

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

/***/ "../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../../../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Toolbar/Toolbar */ "../../../extensions/default/src/Toolbar/Toolbar.tsx");
/* harmony import */ var _HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HeaderPatientInfo */ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js");
/* harmony import */ var _HeaderPatientInfo_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HeaderPatientInfo/HeaderPatientInfo */ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx");
/* harmony import */ var _ohif_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ohif/app */ "./index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();









function ViewerHeader({
  appConfig
}) {
  _s();
  const {
    servicesManager,
    extensionManager,
    commandsManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_4__.useSystem)();
  const {
    customizationService
  } = servicesManager.services;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation)();
  const onClickReturnButton = () => {
    const {
      pathname
    } = location;
    const dataSourceIdx = pathname.indexOf('/', 1);
    const dataSourceName = pathname.substring(dataSourceIdx + 1);
    const existingDataSource = extensionManager.getDataSources(dataSourceName);
    const searchQuery = new URLSearchParams();
    if (dataSourceIdx !== -1 && existingDataSource) {
      searchQuery.append('datasources', pathname.substring(dataSourceIdx + 1));
    }
    (0,_ohif_app__WEBPACK_IMPORTED_MODULE_8__.preserveQueryParameters)(searchQuery);
    navigate({
      pathname: '/',
      search: decodeURIComponent(searchQuery.toString())
    });
  };
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
  const {
    show
  } = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.useModal)();
  const AboutModal = customizationService.getCustomization('ohif.aboutModal');
  const UserPreferencesModal = customizationService.getCustomization('ohif.userPreferencesModal');
  const menuOptions = [{
    title: AboutModal?.menuTitle ?? t('Header:About'),
    icon: 'info',
    onClick: () => show({
      content: AboutModal,
      title: AboutModal?.title ?? t('AboutModal:About OHIF Viewer'),
      containerClassName: AboutModal?.containerClassName ?? 'max-w-md'
    })
  }, {
    title: UserPreferencesModal.menuTitle ?? t('Header:Preferences'),
    icon: 'settings',
    onClick: () => show({
      content: UserPreferencesModal,
      title: UserPreferencesModal.title ?? t('UserPreferencesModal:User preferences'),
      containerClassName: UserPreferencesModal?.containerClassName ?? 'flex max-w-4xl p-6 flex-col'
    })
  }];
  if (appConfig.oidc) {
    menuOptions.push({
      title: t('Header:Logout'),
      icon: 'power-off',
      onClick: async () => {
        navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
      }
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Header, {
    menuOptions: menuOptions,
    isReturnEnabled: !!appConfig.showStudyList,
    onClickReturnButton: onClickReturnButton,
    WhiteLabeling: appConfig.whiteLabeling,
    Secondary: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_5__.Toolbar, {
      buttonSection: "secondary"
    }),
    PatientInfo: appConfig.showPatientInfo !== _HeaderPatientInfo_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_7__.PatientInfoVisibility.DISABLED && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_6__["default"], {
      servicesManager: servicesManager,
      appConfig: appConfig
    }),
    UndoRedo: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "text-primary flex cursor-pointer items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "ghost",
      className: "hover:bg-primary-dark",
      onClick: () => {
        commandsManager.run('undo');
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons.Undo, {
      className: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "ghost",
      className: "hover:bg-primary-dark",
      onClick: () => {
        commandsManager.run('redo');
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons.Redo, {
      className: ""
    })))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex justify-center gap-[4px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_5__.Toolbar, {
    buttonSection: "primary"
  })));
}
_s(ViewerHeader, "QmhJg7t2wmtqmyBtKqPAuWYaFFs=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_4__.useSystem, react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate, react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation, react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation, _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.useModal];
});
_c = ViewerHeader;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerHeader);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewerHeader");

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

/***/ "../../../extensions/default/src/ViewerLayout/constants/panels.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/constants/panels.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   panelGroupDefinition: () => (/* binding */ panelGroupDefinition)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const expandedInsideBorderSize = 0;
const collapsedInsideBorderSize = 4;
const collapsedOutsideBorderSize = 4;
const collapsedWidth = 25;
const rightPanelInitialExpandedWidth = 280;
const leftPanelInitialExpandedWidth = 282;
const panelGroupDefinition = {
  groupId: 'viewerLayoutResizablePanelGroup',
  shared: {
    expandedInsideBorderSize,
    collapsedInsideBorderSize,
    collapsedOutsideBorderSize,
    collapsedWidth
  },
  left: {
    // id
    panelId: 'viewerLayoutResizableLeftPanel',
    // expanded width
    initialExpandedWidth: leftPanelInitialExpandedWidth,
    // expanded width + expanded inside border
    minimumExpandedOffsetWidth: 145 + expandedInsideBorderSize,
    // initial expanded width
    initialExpandedOffsetWidth: leftPanelInitialExpandedWidth + expandedInsideBorderSize,
    // collapsed width + collapsed inside border + collapsed outside border
    collapsedOffsetWidth: collapsedWidth + collapsedInsideBorderSize + collapsedOutsideBorderSize
  },
  right: {
    panelId: 'viewerLayoutResizableRightPanel',
    initialExpandedWidth: rightPanelInitialExpandedWidth,
    minimumExpandedOffsetWidth: rightPanelInitialExpandedWidth + expandedInsideBorderSize,
    initialExpandedOffsetWidth: rightPanelInitialExpandedWidth + expandedInsideBorderSize,
    collapsedOffsetWidth: collapsedWidth + collapsedInsideBorderSize + collapsedOutsideBorderSize
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

/***/ "../../../extensions/default/src/ViewerLayout/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _ViewerHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ViewerHeader */ "../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx");
/* harmony import */ var _Components_SidePanelWithServices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Components/SidePanelWithServices */ "../../../extensions/default/src/Components/SidePanelWithServices.tsx");
/* harmony import */ var _ResizablePanelsHook__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ResizablePanelsHook */ "../../../extensions/default/src/ViewerLayout/ResizablePanelsHook.tsx");
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









const resizableHandleClassName = 'mt-[1px] bg-black';
function ViewerLayout({
  // From Extension Module Params
  extensionManager,
  servicesManager,
  hotkeysManager,
  commandsManager,
  // From Modes
  viewports,
  ViewportGridComp,
  leftPanelClosed = false,
  rightPanelClosed = false,
  leftPanelResizable = false,
  rightPanelResizable = false
}) {
  _s();
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_4__.useAppConfig)();
  const {
    panelService,
    hangingProtocolService,
    customizationService
  } = servicesManager.services;
  const [showLoadingIndicator, setShowLoadingIndicator] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(appConfig.showLoadingIndicator);
  const hasPanels = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(side => !!panelService.getPanels(side).length, [panelService]);
  const [hasRightPanels, setHasRightPanels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(hasPanels('right'));
  const [hasLeftPanels, setHasLeftPanels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(hasPanels('left'));
  const [leftPanelClosedState, setLeftPanelClosed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(leftPanelClosed);
  const [rightPanelClosedState, setRightPanelClosed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(rightPanelClosed);
  const [leftPanelProps, rightPanelProps, resizablePanelGroupProps, resizableLeftPanelProps, resizableViewportGridPanelProps, resizableRightPanelProps, onHandleDragging] = (0,_ResizablePanelsHook__WEBPACK_IMPORTED_MODULE_7__["default"])(leftPanelClosed, setLeftPanelClosed, rightPanelClosed, setRightPanelClosed, hasLeftPanels, hasRightPanels);
  const handleMouseEnter = () => {
    document.activeElement?.blur();
  };
  const LoadingIndicatorProgress = customizationService.getCustomization('ui.loadingIndicatorProgress');

  /**
   * Set body classes (tailwindcss) that don't allow vertical
   * or horizontal overflow (no scrolling). Also guarantee window
   * is sized to our viewport.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.classList.add('bg-black');
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  const getComponent = id => {
    const entry = extensionManager.getModuleEntry(id);
    if (!entry || !entry.component) {
      throw new Error(`${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`);
    }
    return {
      entry
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_3__.HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
    // Todo: right now to set the loading indicator to false, we need to wait for the
    // hangingProtocolService to finish applying the viewport matching to each viewport,
    // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
    () => {
      setShowLoadingIndicator(false);
    });
    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);
  const getViewportComponentData = viewportComponent => {
    const {
      entry
    } = getComponent(viewportComponent.namespace);
    return {
      component: entry.component,
      isReferenceViewable: entry.isReferenceViewable,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = panelService.subscribe(panelService.EVENTS.PANELS_CHANGED, ({
      options
    }) => {
      setHasLeftPanels(hasPanels('left'));
      setHasRightPanels(hasPanels('right'));
      if (options?.leftPanelClosed !== undefined) {
        setLeftPanelClosed(options.leftPanelClosed);
      }
      if (options?.rightPanelClosed !== undefined) {
        setRightPanelClosed(options.rightPanelClosed);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [panelService, hasPanels]);
  const viewportComponents = viewports.map(getViewportComponentData);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewerHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    hotkeysManager: hotkeysManager,
    extensionManager: extensionManager,
    servicesManager: servicesManager,
    appConfig: appConfig
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black",
    style: {
      height: 'calc(100vh - 52px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, showLoadingIndicator && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LoadingIndicatorProgress, {
    className: "h-full w-full bg-black"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ResizablePanelGroup, resizablePanelGroupProps, hasLeftPanels ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ResizablePanel, resizableLeftPanelProps, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Components_SidePanelWithServices__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
    side: "left",
    isExpanded: !leftPanelClosedState,
    servicesManager: servicesManager
  }, leftPanelProps))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ResizableHandle, {
    onDragging: onHandleDragging,
    disabled: !leftPanelResizable,
    className: resizableHandleClassName
  })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ResizablePanel, resizableViewportGridPanelProps, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-full flex-1 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black",
    onMouseEnter: handleMouseEnter
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ViewportGridComp, {
    servicesManager: servicesManager,
    viewportComponents: viewportComponents,
    commandsManager: commandsManager
  })))), hasRightPanels ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ResizableHandle, {
    onDragging: onHandleDragging,
    disabled: !rightPanelResizable,
    className: resizableHandleClassName
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.ResizablePanel, resizableRightPanelProps, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Components_SidePanelWithServices__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
    side: "right",
    isExpanded: !rightPanelClosedState,
    servicesManager: servicesManager
  }, rightPanelProps)))) : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Onboarding, {
    tours: customizationService.getCustomization('ohif.tours')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.InvestigationalUseDialog, {
    dialogConfiguration: appConfig?.investigationalUseDialog
  }));
}
_s(ViewerLayout, "QjHTp+RhtxxTZS6GYyEn4ZlQ2t0=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_4__.useAppConfig, _ResizablePanelsHook__WEBPACK_IMPORTED_MODULE_7__["default"]];
});
_c = ViewerLayout;
ViewerLayout.propTypes = {
  // From extension module params
  extensionManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    getModuleEntry: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }).isRequired,
  commandsManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_3__.CommandsManager),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  // From modes
  leftPanels: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  rightPanels: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  leftPanelClosed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  rightPanelClosed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  /** Responsible for rendering our grid of viewports; provided by consuming application */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().node), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)]).isRequired,
  viewports: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerLayout);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewerLayout");

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

/***/ "../../../extensions/default/src/commandsModule.ts":
/*!*********************************************************!*\
  !*** ../../../extensions/default/src/commandsModule.ts ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomizableContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/index.ts");
/* harmony import */ var _DicomTagBrowser_DicomTagBrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DicomTagBrowser/DicomTagBrowser */ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
/* harmony import */ var _utils_reuseCachedLayouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/reuseCachedLayouts */ "../../../extensions/default/src/utils/reuseCachedLayouts.ts");
/* harmony import */ var _utils_layerConfigurationUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/layerConfigurationUtils */ "../../../extensions/default/src/utils/layerConfigurationUtils.ts");
/* harmony import */ var _findViewportsByPosition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./findViewportsByPosition */ "../../../extensions/default/src/findViewportsByPosition.ts");
/* harmony import */ var _ohif_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/app */ "./index.js");
/* harmony import */ var _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stores/useViewportGridStore */ "../../../extensions/default/src/stores/useViewportGridStore.ts");
/* harmony import */ var _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stores/useDisplaySetSelectorStore */ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts");
/* harmony import */ var _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stores/useHangingProtocolStageIndexStore */ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts");
/* harmony import */ var _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stores/useToggleHangingProtocolStore */ "../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts");
/* harmony import */ var _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stores/useViewportsByPositionStore */ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts");
/* harmony import */ var _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./stores/useToggleOneUpViewportGridStore */ "../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts");
/* harmony import */ var _Panels_requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Panels/requestDisplaySetCreationForStudy */ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
/* harmony import */ var _utils_promptSaveReport__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/promptSaveReport */ "../../../extensions/default/src/utils/promptSaveReport.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");
















const commandsModule = ({
  servicesManager,
  commandsManager,
  extensionManager
}) => {
  const {
    customizationService,
    measurementService,
    hangingProtocolService,
    uiNotificationService,
    viewportGridService,
    displaySetService,
    multiMonitorService
  } = servicesManager.services;

  // Define a context menu controller for use with any context menus
  const contextMenuController = new _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_1__.ContextMenuController(servicesManager, commandsManager);
  const actions = {
    /**
     * Adds a display set as a layer to the specified viewport
     *
     * @param options.viewportId - The ID of the viewport to add the layer to
     * @param options.displaySetInstanceUID - The UID of the display set to add as a layer
     * @param options.removeFirst - Optional flag to remove the display set first if it's already added
     */
    addDisplaySetAsLayer: ({
      viewportId,
      displaySetInstanceUID,
      removeFirst = false
    }) => {
      if (!viewportId || !displaySetInstanceUID) {
        console.warn('Missing required parameters for addDisplaySetAsLayer command');
        return;
      }
      const {
        displaySetService,
        viewportGridService,
        hangingProtocolService
      } = servicesManager.services;

      // Get the display set
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      if (!displaySet) {
        return;
      }

      // Get current display sets for the viewport
      const currentDisplaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);

      // Check if we can add this display set to the viewport
      const canAdd = (0,_utils_layerConfigurationUtils__WEBPACK_IMPORTED_MODULE_4__.canAddDisplaySetToViewport)({
        viewportId,
        displaySetInstanceUID,
        servicesManager
      });
      if (!canAdd) {
        return;
      }

      // Add the display set to the viewport
      const updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID);

      // Configure each viewport for layer addition
      updatedViewports.forEach(viewport => {
        (0,_utils_layerConfigurationUtils__WEBPACK_IMPORTED_MODULE_4__.configureViewportForLayerAddition)({
          viewport,
          displaySetInstanceUID,
          currentDisplaySetUIDs,
          servicesManager
        });
      });

      // Update position presentation
      commandsManager.runCommand('updateStoredPositionPresentation', {
        viewportId,
        displaySetInstanceUIDs: updatedViewports[0].displaySetInstanceUIDs
      });

      // Run command to update viewports
      commandsManager.run('setDisplaySetsForViewports', {
        viewportsToUpdate: updatedViewports
      });
    },
    /**
     * Removes a display set layer from the specified viewport
     *
     * @param options.viewportId - The ID of the viewport to remove the layer from
     * @param options.displaySetInstanceUID - The UID of the display set to remove
     */
    removeDisplaySetLayer: ({
      viewportId,
      displaySetInstanceUID
    }) => {
      if (!viewportId || !displaySetInstanceUID) {
        console.warn('Missing required parameters for removeDisplaySetLayer command');
        return;
      }
      const {
        displaySetService,
        viewportGridService,
        hangingProtocolService,
        segmentationService
      } = servicesManager.services;

      // Get the display set
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      if (!displaySet) {
        return;
      }

      // Get current display sets for the viewport
      const currentDisplaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);

      // If the display set is not in the viewport, no need to remove it
      if (!currentDisplaySetUIDs.includes(displaySetInstanceUID)) {
        return;
      }

      // Check if it's a segmentation and handle accordingly
      const isSegmentation = _utils_layerConfigurationUtils__WEBPACK_IMPORTED_MODULE_4__.DERIVED_OVERLAY_MODALITIES.includes(displaySet.Modality);
      if (isSegmentation) {
        segmentationService.removeSegmentationRepresentations(viewportId, {
          segmentationId: displaySetInstanceUID
        });
      }
      const updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID);

      // Configure each viewport for layer removal
      updatedViewports.forEach(viewport => {
        (0,_utils_layerConfigurationUtils__WEBPACK_IMPORTED_MODULE_4__.configureViewportForLayerRemoval)({
          viewport,
          displaySetInstanceUID,
          currentDisplaySetUIDs,
          servicesManager
        });
      });

      // Update position presentation
      commandsManager.runCommand('updateStoredPositionPresentation', {
        viewportId,
        displaySetInstanceUIDs: updatedViewports[0].displaySetInstanceUIDs
      });

      // Update the viewports
      commandsManager.run('setDisplaySetsForViewports', {
        viewportsToUpdate: updatedViewports
      });
    },
    /**
     * Runs a command in multi-monitor mode.  No-op if not multi-monitor.
     */
    multimonitor: async options => {
      const {
        screenDelta,
        StudyInstanceUID,
        commands,
        hashParams
      } = options;
      if (multiMonitorService.numberOfScreens < 2) {
        return options.fallback?.(options);
      }
      const newWindow = await multiMonitorService.launchWindow(StudyInstanceUID, screenDelta, hashParams);

      // Only run commands if we successfully got a window with a commands manager
      if (newWindow && commands) {
        // Todo: fix this properly, but it takes time for the new window to load
        // and then the commandsManager is available for it
        setTimeout(() => {
          multiMonitorService.run(screenDelta, commands, options);
        }, 1000);
      }
    },
    /** Displays a prompt and then save the report if relevant */
    promptSaveReport: props => {
      const {
        StudyInstanceUID
      } = props;
      (0,_utils_promptSaveReport__WEBPACK_IMPORTED_MODULE_14__["default"])({
        servicesManager,
        commandsManager,
        extensionManager
      }, props, {
        data: {
          StudyInstanceUID
        }
      });
    },
    /**
     * Ensures that the specified study is available for display
     * Then, if commands is specified, runs the given commands list/instance
     */
    loadStudy: async options => {
      const {
        StudyInstanceUID
      } = options;
      const displaySets = displaySetService.getActiveDisplaySets();
      const isActive = displaySets.find(ds => ds.StudyInstanceUID === StudyInstanceUID);
      if (isActive) {
        return;
      }
      const [dataSource] = extensionManager.getActiveDataSource();
      await (0,_Panels_requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_13__["default"])(dataSource, displaySetService, StudyInstanceUID);
      const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
      hangingProtocolService.addStudy(study);
    },
    /**
     * Show the context menu.
     * @param options.menuId defines the menu name to lookup, from customizationService
     * @param options.defaultMenu contains the default menu set to use
     * @param options.element is the element to show the menu within
     * @param options.event is the event that caused the context menu
     * @param options.selectorProps is the set of selection properties to use
     */
    showContextMenu: options => {
      const {
        menuCustomizationId,
        element,
        event,
        selectorProps,
        defaultPointsPosition = []
      } = options;
      const optionsToUse = {
        ...options
      };
      if (menuCustomizationId) {
        Object.assign(optionsToUse, customizationService.getCustomization(menuCustomizationId));
      }

      // TODO - make the selectorProps richer by including the study metadata and display set.
      const {
        protocol,
        stage
      } = hangingProtocolService.getActiveProtocol();
      optionsToUse.selectorProps = {
        event,
        protocol,
        stage,
        ...selectorProps
      };
      contextMenuController.showContextMenu(optionsToUse, element, defaultPointsPosition);
    },
    /** Close a context menu currently displayed */
    closeContextMenu: () => {
      contextMenuController.closeContextMenu();
    },
    displayNotification: ({
      text,
      title,
      type
    }) => {
      uiNotificationService.show({
        title: title,
        message: text,
        type: type
      });
    },
    clearMeasurements: options => {
      measurementService.clearMeasurements(options.measurementFilter);
    },
    /**
     *  Sets the specified protocol
     *    1. Records any existing state using the viewport grid service
     *    2. Finds the destination state - this can be one of:
     *       a. The specified protocol stage
     *       b. An alternate (toggled or restored) protocol stage
     *       c. A restored custom layout
     *    3. Finds the parameters for the specified state
     *       a. Gets the displaySetSelectorMap
     *       b. Gets the map by position
     *       c. Gets any toggle mapping to map position to/from current view
     *    4. If restore, then sets layout
     *       a. Maps viewport position by currently displayed viewport map id
     *       b. Uses toggle information to map display set id
     *    5. Else applies the hanging protocol
     *       a. HP Service is provided displaySetSelectorMap
     *       b. HP Service will throw an exception if it isn't applicable
     * @param options - contains information on the HP to apply
     * @param options.activeStudyUID - the updated study to apply the HP to
     * @param options.protocolId - the protocol ID to change to
     * @param options.stageId - the stageId to apply
     * @param options.stageIndex - the index of the stage to go to.
     * @param options.reset - flag to indicate if the HP should be reset to its original and not restored to a previous state
     *
     * commandsManager.run('setHangingProtocol', {
     *   activeStudyUID: '1.2.3',
     *   protocolId: 'myProtocol',
     *   stageId: 'myStage',
     *   stageIndex: 0,
     *   reset: false,
     * });
     */
    setHangingProtocol: ({
      activeStudyUID = '',
      StudyInstanceUID = '',
      protocolId,
      stageId,
      stageIndex,
      reset = false
    }) => {
      const toUseStudyInstanceUID = activeStudyUID || StudyInstanceUID;
      try {
        // Stores in the state the display set selector id to displaySetUID mapping
        // Pass in viewportId for the active viewport.  This item will get set as
        // the activeViewportId
        const state = viewportGridService.getState();
        const hpInfo = hangingProtocolService.getState();
        (0,_utils_reuseCachedLayouts__WEBPACK_IMPORTED_MODULE_3__["default"])(state, hangingProtocolService);
        const {
          hangingProtocolStageIndexMap
        } = _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_9__.useHangingProtocolStageIndexStore.getState();
        const {
          displaySetSelectorMap
        } = _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_8__.useDisplaySetSelectorStore.getState();
        if (!protocolId) {
          // Reuse the previous protocol id, and optionally stage
          protocolId = hpInfo.protocolId;
          if (stageId === undefined && stageIndex === undefined) {
            stageIndex = hpInfo.stageIndex;
          }
        } else if (stageIndex === undefined && stageId === undefined) {
          // Re-set the same stage as was previously used
          const hangingId = `${toUseStudyInstanceUID || hpInfo.activeStudyUID}:${protocolId}`;
          stageIndex = hangingProtocolStageIndexMap[hangingId]?.stageIndex;
        }
        const useStageIdx = stageIndex ?? hangingProtocolService.getStageIndex(protocolId, {
          stageId,
          stageIndex
        });
        const activeStudyChanged = hangingProtocolService.setActiveStudyUID(toUseStudyInstanceUID);
        const storedHanging = `${toUseStudyInstanceUID || hangingProtocolService.getState().activeStudyUID}:${protocolId}:${useStageIdx || 0}`;
        const {
          viewportGridState
        } = _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_7__.useViewportGridStore.getState();
        const restoreProtocol = !reset && viewportGridState[storedHanging];
        if (reset || activeStudyChanged && !viewportGridState[storedHanging] && stageIndex === undefined && stageId === undefined) {
          // Run the hanging protocol fresh, re-using the existing study data
          // This is done on reset or when the study changes and we haven't yet
          // applied it, and don't specify exact stage to use.
          const displaySets = displaySetService.getActiveDisplaySets();
          const activeStudy = {
            StudyInstanceUID: toUseStudyInstanceUID,
            displaySets
          };
          hangingProtocolService.run(activeStudy, protocolId);
        } else if (protocolId === hpInfo.protocolId && useStageIdx === hpInfo.stageIndex && !toUseStudyInstanceUID) {
          // Clear the HP setting to reset them
          hangingProtocolService.setProtocol(protocolId, {
            stageId,
            stageIndex: useStageIdx,
            displaySetSelectorMap
          });
        } else {
          hangingProtocolService.setProtocol(protocolId, {
            displaySetSelectorMap,
            stageId,
            stageIndex: useStageIdx,
            restoreProtocol
          });
          if (restoreProtocol) {
            viewportGridService.set(viewportGridState[storedHanging]);
          }
        }
        // Do this after successfully applying the update
        const {
          setDisplaySetSelector
        } = _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_8__.useDisplaySetSelectorStore.getState();
        setDisplaySetSelector(`${toUseStudyInstanceUID || hpInfo.activeStudyUID}:activeDisplaySet:0`, null);
        return true;
      } catch (e) {
        console.error(e);
        uiNotificationService.show({
          title: 'Apply Hanging Protocol',
          message: 'The hanging protocol could not be applied.',
          type: 'error',
          duration: 3000
        });
        return false;
      }
    },
    toggleHangingProtocol: ({
      protocolId,
      stageIndex
    }) => {
      const {
        protocol,
        stageIndex: desiredStageIndex,
        activeStudy
      } = hangingProtocolService.getActiveProtocol();
      const {
        toggleHangingProtocol,
        setToggleHangingProtocol
      } = _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_10__.useToggleHangingProtocolStore.getState();
      const storedHanging = `${activeStudy.StudyInstanceUID}:${protocolId}:${stageIndex | 0}`;
      if (protocol.id === protocolId && (stageIndex === undefined || stageIndex === desiredStageIndex)) {
        // Toggling off - restore to previous state
        const previousState = toggleHangingProtocol[storedHanging] || {
          protocolId: 'default'
        };
        return actions.setHangingProtocol(previousState);
      } else {
        setToggleHangingProtocol(storedHanging, {
          protocolId: protocol.id,
          stageIndex: desiredStageIndex
        });
        return actions.setHangingProtocol({
          protocolId,
          stageIndex,
          reset: true
        });
      }
    },
    deltaStage: ({
      direction
    }) => {
      const {
        protocolId,
        stageIndex: oldStageIndex
      } = hangingProtocolService.getState();
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      for (let stageIndex = oldStageIndex + direction; stageIndex >= 0 && stageIndex < protocol.stages.length; stageIndex += direction) {
        if (protocol.stages[stageIndex].status !== 'disabled') {
          return actions.setHangingProtocol({
            protocolId,
            stageIndex
          });
        }
      }
      uiNotificationService.show({
        title: 'Change Stage',
        message: 'The hanging protocol has no more applicable stages',
        type: 'info',
        duration: 3000
      });
    },
    /**
     * Changes the viewport grid layout in terms of the MxN layout.
     */
    setViewportGridLayout: ({
      numRows,
      numCols,
      isHangingProtocolLayout = false
    }) => {
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      const onLayoutChange = protocol.callbacks?.onLayoutChange;
      if (commandsManager.run(onLayoutChange, {
        numRows,
        numCols
      }) === false) {
        // Don't apply the layout if the run command returns false
        return;
      }
      const completeLayout = () => {
        const state = viewportGridService.getState();
        (0,_findViewportsByPosition__WEBPACK_IMPORTED_MODULE_5__["default"])(state, {
          numRows,
          numCols
        });
        const {
          viewportsByPosition,
          initialInDisplay
        } = _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_11__.useViewportsByPositionStore.getState();
        const findOrCreateViewport = _findViewportsByPosition__WEBPACK_IMPORTED_MODULE_5__.findOrCreateViewport.bind(null, hangingProtocolService, isHangingProtocolLayout, {
          ...viewportsByPosition,
          initialInDisplay
        });
        viewportGridService.setLayout({
          numRows,
          numCols,
          findOrCreateViewport,
          isHangingProtocolLayout
        });
      };
      // Need to finish any work in the callback
      window.setTimeout(completeLayout, 0);
    },
    toggleOneUp() {
      const viewportGridState = viewportGridService.getState();
      const {
        activeViewportId,
        viewports,
        layout,
        isHangingProtocolLayout
      } = viewportGridState;
      const {
        displaySetInstanceUIDs,
        displaySetOptions,
        viewportOptions
      } = viewports.get(activeViewportId);
      if (layout.numCols === 1 && layout.numRows === 1) {
        // The viewer is in one-up. Check if there is a state to restore/toggle back to.
        const {
          toggleOneUpViewportGridStore
        } = _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_12__.useToggleOneUpViewportGridStore.getState();
        if (!toggleOneUpViewportGridStore) {
          return;
        }
        // There is a state to toggle back to. The viewport that was
        // originally toggled to one up was the former active viewport.
        const viewportIdToUpdate = toggleOneUpViewportGridStore.activeViewportId;

        // We are restoring the previous layout but taking into the account that
        // the current one up viewport might have a new displaySet dragged and dropped on it.
        // updatedViewportsViaHP below contains the viewports applicable to the HP that existed
        // prior to the toggle to one-up - including the updated viewports if a display
        // set swap were to have occurred.
        const updatedViewportsViaHP = displaySetInstanceUIDs.length > 1 ? [] : displaySetInstanceUIDs.map(displaySetInstanceUID => hangingProtocolService.getViewportsRequireUpdate(viewportIdToUpdate, displaySetInstanceUID, isHangingProtocolLayout)).flat();

        // findOrCreateViewport returns either one of the updatedViewportsViaHP
        // returned from the HP service OR if there is not one from the HP service then
        // simply returns what was in the previous state for a given position in the layout.
        const findOrCreateViewport = (position, positionId) => {
          // Find the viewport for the given position prior to the toggle to one-up.
          const preOneUpViewport = Array.from(toggleOneUpViewportGridStore.viewports.values()).find(viewport => viewport.positionId === positionId);

          // Use the viewport id from before the toggle to one-up to find any updates to the viewport.
          const viewport = updatedViewportsViaHP.find(viewport => viewport.viewportId === preOneUpViewport.viewportId);
          return viewport ?
          // Use the applicable viewport from the HP updated viewports
          {
            viewportOptions,
            displaySetOptions,
            ...viewport
          } :
          // Use the previous viewport for the given position
          preOneUpViewport;
        };
        const layoutOptions = viewportGridService.getLayoutOptionsFromState(toggleOneUpViewportGridStore);

        // Restore the previous layout including the active viewport.
        viewportGridService.setLayout({
          numRows: toggleOneUpViewportGridStore.layout.numRows,
          numCols: toggleOneUpViewportGridStore.layout.numCols,
          activeViewportId: viewportIdToUpdate,
          layoutOptions,
          findOrCreateViewport,
          isHangingProtocolLayout: true
        });

        // Reset crosshairs after restoring the layout
        setTimeout(() => {
          commandsManager.runCommand('resetCrosshairs');
        }, 0);
      } else {
        // We are not in one-up, so toggle to one up.

        // Store the current viewport grid state so we can toggle it back later.
        const {
          setToggleOneUpViewportGridStore
        } = _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_12__.useToggleOneUpViewportGridStore.getState();
        setToggleOneUpViewportGridStore(viewportGridState);

        // one being toggled to one up.
        const findOrCreateViewport = () => {
          return {
            displaySetInstanceUIDs,
            displaySetOptions,
            viewportOptions
          };
        };

        // Set the layout to be 1x1/one-up.
        viewportGridService.setLayout({
          numRows: 1,
          numCols: 1,
          findOrCreateViewport,
          isHangingProtocolLayout: true
        });
      }
    },
    /**
     * Exposes the browser history navigation used by OHIF. This command can be used to either replace or
     * push a new entry into the browser history. For example, the following will replace the current
     * browser history entry with the specified relative URL which changes the study displayed to the
     * study with study instance UID 1.2.3. Note that as a result of using `options.replace = true`, the
     * page prior to invoking this command cannot be returned to via the browser back button.
     *
     * navigateHistory({
     *   to: 'viewer?StudyInstanceUIDs=1.2.3',
     *   options: { replace: true },
     * });
     *
     * @param historyArgs - arguments for the history function;
     *                      the `to` property is the URL;
     *                      the `options.replace` is a boolean indicating if the current browser history entry
     *                      should be replaced or a new entry pushed onto the history (stack); the default value
     *                      for `replace` is false
     */
    navigateHistory(historyArgs) {
      _ohif_app__WEBPACK_IMPORTED_MODULE_6__.history.navigate(historyArgs.to, historyArgs.options);
    },
    openDICOMTagViewer({
      displaySetInstanceUID
    }) {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const activeViewportSpecificData = viewports.get(activeViewportId);
      const {
        displaySetInstanceUIDs
      } = activeViewportSpecificData;
      const displaySets = displaySetService.activeDisplaySets;
      const {
        UIModalService
      } = servicesManager.services;
      const defaultDisplaySetInstanceUID = displaySetInstanceUID || displaySetInstanceUIDs[0];
      UIModalService.show({
        content: _DicomTagBrowser_DicomTagBrowser__WEBPACK_IMPORTED_MODULE_2__["default"],
        contentProps: {
          displaySets,
          displaySetInstanceUID: defaultDisplaySetInstanceUID
        },
        title: 'DICOM Tag Browser',
        containerClassName: 'max-w-3xl'
      });
    },
    /**
     * Toggle viewport overlay (the information panel shown on the four corners
     * of the viewport)
     * @see ViewportOverlay and CustomizableViewportOverlay components
     */
    toggleOverlays: () => {
      const overlays = document.getElementsByClassName('viewport-overlay');
      for (let i = 0; i < overlays.length; i++) {
        overlays.item(i).classList.toggle('hidden');
      }
    },
    scrollActiveThumbnailIntoView: () => {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const activeViewport = viewports.get(activeViewportId);
      const activeDisplaySetInstanceUID = activeViewport?.displaySetInstanceUIDs?.[0];
      if (!activeDisplaySetInstanceUID) {
        return;
      }
      const thumbnailList = document.querySelector('#ohif-thumbnail-list');
      if (!thumbnailList) {
        return;
      }
      const thumbnail = document.querySelector(`#thumbnail-${activeDisplaySetInstanceUID}`);
      if (!thumbnail) {
        return;
      }
      thumbnail.scrollIntoView({
        behavior: 'smooth'
      });
    },
    updateViewportDisplaySet: ({
      direction,
      excludeNonImageModalities
    }) => {
      const nonImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
      const currentDisplaySets = [...displaySetService.activeDisplaySets];
      const {
        activeViewportId,
        viewports,
        isHangingProtocolLayout
      } = viewportGridService.getState();
      const {
        displaySetInstanceUIDs
      } = viewports.get(activeViewportId);
      const activeDisplaySetIndex = currentDisplaySets.findIndex(displaySet => displaySetInstanceUIDs.includes(displaySet.displaySetInstanceUID));
      let displaySetIndexToShow;
      for (displaySetIndexToShow = activeDisplaySetIndex + direction; displaySetIndexToShow > -1 && displaySetIndexToShow < currentDisplaySets.length; displaySetIndexToShow += direction) {
        if (!excludeNonImageModalities || !nonImageModalities.includes(currentDisplaySets[displaySetIndexToShow].Modality)) {
          break;
        }
      }
      if (displaySetIndexToShow < 0 || displaySetIndexToShow >= currentDisplaySets.length) {
        return;
      }
      const {
        displaySetInstanceUID
      } = currentDisplaySets[displaySetIndexToShow];
      let updatedViewports = [];
      try {
        updatedViewports = hangingProtocolService.getViewportsRequireUpdate(activeViewportId, displaySetInstanceUID, isHangingProtocolLayout);
      } catch (error) {
        console.warn(error);
        uiNotificationService.show({
          title: 'Navigate Viewport Display Set',
          message: 'The requested display sets could not be added to the viewport due to a mismatch in the Hanging Protocol rules.',
          type: 'info',
          duration: 3000
        });
      }
      commandsManager.run('setDisplaySetsForViewports', {
        viewportsToUpdate: updatedViewports
      });
      setTimeout(() => actions.scrollActiveThumbnailIntoView(), 0);
    }
  };
  const definitions = {
    multimonitor: actions.multimonitor,
    promptSaveReport: actions.promptSaveReport,
    loadStudy: actions.loadStudy,
    showContextMenu: actions.showContextMenu,
    closeContextMenu: actions.closeContextMenu,
    clearMeasurements: actions.clearMeasurements,
    displayNotification: actions.displayNotification,
    setHangingProtocol: actions.setHangingProtocol,
    toggleHangingProtocol: actions.toggleHangingProtocol,
    navigateHistory: actions.navigateHistory,
    nextStage: {
      commandFn: actions.deltaStage,
      options: {
        direction: 1
      }
    },
    previousStage: {
      commandFn: actions.deltaStage,
      options: {
        direction: -1
      }
    },
    setViewportGridLayout: actions.setViewportGridLayout,
    toggleOneUp: actions.toggleOneUp,
    openDICOMTagViewer: actions.openDICOMTagViewer,
    updateViewportDisplaySet: actions.updateViewportDisplaySet,
    scrollActiveThumbnailIntoView: actions.scrollActiveThumbnailIntoView,
    addDisplaySetAsLayer: actions.addDisplaySetAsLayer,
    removeDisplaySetLayer: actions.removeDisplaySetLayer
  };
  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT'
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

/***/ "../../../extensions/default/src/customizations/aboutModalCustomization.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/aboutModalCustomization.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var browser_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser-detect */ "../../../node_modules/browser-detect/dist/browser-detect.es5.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function AboutModalDefault() {
  const {
    os,
    version,
    name
  } = (0,browser_detect__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const browser = `${name[0].toUpperCase()}${name.substr(1)} ${version}`;
  const versionNumber = "3.11.0-beta.56";
  const commitHash = "5311c941f7ebbfe8cc2943e3718245567c09a034";
  const [main, beta] = versionNumber.split('-');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal, {
    className: "w-[400px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.ProductName, null, "OHIF Viewer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.ProductVersion, null, main), beta && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.ProductBeta, null, beta), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.DetailItem, {
    label: "Commit Hash",
    value: commitHash
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.DetailItem, {
    label: "Current Browser & OS",
    value: `${browser}, ${os}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.AboutModal.SocialItem, {
    icon: "SocialGithub",
    url: "OHIF/Viewers",
    text: "github.com/OHIF/Viewers"
  })));
}
_c = AboutModalDefault;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.aboutModal': AboutModalDefault
});
var _c;
__webpack_require__.$Refresh$.register(_c, "AboutModalDefault");

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

/***/ "../../../extensions/default/src/customizations/contextMenuCustomization.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/contextMenuCustomization.ts ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.contextMenu': {
    $transform: function (customizationService) {
      /**
       * Applies the inheritsFrom to all the menu items.
       * This function clones the object and child objects to prevent
       * changes to the original customization object.
       */
      // Don't modify the children, as those are copied by reference
      const clonedObject = {
        ...this
      };
      clonedObject.menus = this.menus.map(menu => ({
        ...menu
      }));
      for (const menu of clonedObject.menus) {
        const {
          items: originalItems
        } = menu;
        menu.items = [];
        for (const item of originalItems) {
          menu.items.push(customizationService.transform(item));
        }
      }
      return clonedObject;
    }
  }
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

/***/ "../../../extensions/default/src/customizations/contextMenuUICustomization.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/contextMenuUICustomization.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ui.contextMenu': _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ContextMenu
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

/***/ "../../../extensions/default/src/customizations/customRoutesCustomization.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/customRoutesCustomization.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'routes.customRoutes': {
    routes: [],
    notFoundRoute: null
  }
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

/***/ "../../../extensions/default/src/customizations/dataSourceConfigurationCustomization.ts":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/dataSourceConfigurationCustomization.ts ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDataSourceConfigurationCustomization)
/* harmony export */ });
/* harmony import */ var _Components_DataSourceConfigurationComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components/DataSourceConfigurationComponent */ "../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx");
/* harmony import */ var _DataSourceConfigurationAPI_GoogleCloudDataSourceConfigurationAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI */ "../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function getDataSourceConfigurationCustomization({
  servicesManager,
  extensionManager
}) {
  return {
    // the generic GUI component to configure a data source using an instance of a BaseDataSourceConfigurationAPI
    'ohif.dataSourceConfigurationComponent': _Components_DataSourceConfigurationComponent__WEBPACK_IMPORTED_MODULE_0__["default"].bind(null, {
      servicesManager,
      extensionManager
    }),
    // The factory for creating an instance of a BaseDataSourceConfigurationAPI for Google Cloud Healthcare
    'ohif.dataSourceConfigurationAPI.google': dataSourceName => new _DataSourceConfigurationAPI_GoogleCloudDataSourceConfigurationAPI__WEBPACK_IMPORTED_MODULE_1__.GoogleCloudDataSourceConfigurationAPI(dataSourceName, servicesManager, extensionManager)
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

/***/ "../../../extensions/default/src/customizations/datasourcesCustomization.tsx":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/datasourcesCustomization.tsx ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Panels_DataSourceSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Panels/DataSourceSelector */ "../../../extensions/default/src/Panels/DataSourceSelector.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'routes.customRoutes': {
    routes: {
      $push: [{
        path: '/datasources',
        children: _Panels_DataSourceSelector__WEBPACK_IMPORTED_MODULE_0__["default"]
      }]
    }
  }
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

/***/ "../../../extensions/default/src/customizations/defaultContextMenuCustomization.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/defaultContextMenuCustomization.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  measurementsContextMenu: {
    inheritsFrom: 'ohif.contextMenu',
    menus: [
    // Get the items from the UI Customization for the menu name (and have a custom name)
    {
      id: 'forExistingMeasurement',
      selector: ({
        nearbyToolData
      }) => !!nearbyToolData,
      items: [{
        label: 'Delete measurement',
        commands: 'removeMeasurement'
      }, {
        label: 'Add Label',
        commands: 'setMeasurementLabel'
      }]
    }]
  }
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

/***/ "../../../extensions/default/src/customizations/helloPageCustomization.tsx":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/helloPageCustomization.tsx ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'routes.customRoutes': {
    routes: {
      $push: [{
        path: '/custom',
        children: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
          style: {
            color: 'white'
          }
        }, "Hello Custom Route")
      }]
    }
  }
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

/***/ "../../../extensions/default/src/customizations/hotkeyBindingsCustomization.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/hotkeyBindingsCustomization.ts ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.hotkeyBindings': _ohif_core__WEBPACK_IMPORTED_MODULE_0__.defaults.hotkeyBindings
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

/***/ "../../../extensions/default/src/customizations/labellingFlowCustomization.tsx":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/labellingFlowCustomization.tsx ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ui.labellingComponent': _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__.LabellingFlow
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

/***/ "../../../extensions/default/src/customizations/loadingIndicatorProgressCustomization.tsx":
/*!************************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/loadingIndicatorProgressCustomization.tsx ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ui.loadingIndicatorProgress': _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__.LoadingIndicatorProgress
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

/***/ "../../../extensions/default/src/customizations/loadingIndicatorTotalPercentCustomization.tsx":
/*!****************************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/loadingIndicatorTotalPercentCustomization.tsx ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ui.loadingIndicatorTotalPercent': _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__.LoadingIndicatorTotalPercent
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

/***/ "../../../extensions/default/src/customizations/menuContentCustomization.tsx":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/menuContentCustomization.tsx ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.menuContent': function (props) {
    const {
      item: topLevelItem,
      commandsManager,
      servicesManager,
      ...rest
    } = props;
    const content = function (subProps) {
      const {
        item: subItem
      } = subProps;

      // Regular menu item
      const isDisabled = subItem.selector && !subItem.selector({
        servicesManager
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuItem, {
        disabled: isDisabled,
        onSelect: () => {
          commandsManager.runAsync(subItem.commands, {
            ...subItem.commandOptions,
            ...rest
          });
        },
        className: "gap-[6px]"
      }, subItem.iconName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.ByName, {
        name: subItem.iconName,
        className: "-ml-1"
      }), subItem.label);
    };

    // If item has sub-items, render a submenu
    if (topLevelItem.items) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuSub, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuSubTrigger, {
        className: "gap-[6px]"
      }, topLevelItem.iconName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.ByName, {
        name: topLevelItem.iconName,
        className: "-ml-1"
      }), topLevelItem.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuPortal, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.DropdownMenuSubContent, null, topLevelItem.items.map(subItem => content({
        ...props,
        item: subItem
      })))));
    }
    return content({
      ...props,
      item: topLevelItem
    });
  }
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

/***/ "../../../extensions/default/src/customizations/multimonitorCustomization.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/multimonitorCustomization.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'studyBrowser.studyMenuItems': {
    $push: [{
      id: 'applyHangingProtocol',
      label: 'Apply Hanging Protocol',
      iconName: 'ViewportViews',
      items: [{
        id: 'applyDefaultProtocol',
        label: 'Default',
        commands: ['loadStudy', {
          commandName: 'setHangingProtocol',
          commandOptions: {
            protocolId: 'default'
          }
        }]
      }, {
        id: 'applyMPRProtocol',
        label: '2x2 Grid',
        commands: ['loadStudy', {
          commandName: 'setHangingProtocol',
          commandOptions: {
            protocolId: '@ohif/mnGrid'
          }
        }]
      }]
    }, {
      id: 'showInOtherMonitor',
      label: 'Launch On Second Monitor',
      iconName: 'DicomTagBrowser',
      selector: ({
        servicesManager
      }) => {
        const {
          multiMonitorService
        } = servicesManager.services;
        return multiMonitorService.isMultimonitor;
      },
      commands: {
        commandName: 'multimonitor',
        commandOptions: {
          hashParams: '&hangingProtocolId=@ohif/mnGrid8',
          commands: ['loadStudy', {
            commandName: 'setHangingProtocol',
            commandOptions: {
              protocolId: '@ohif/mnGrid8'
            }
          }]
        }
      }
    }]
  }
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

/***/ "../../../extensions/default/src/customizations/notificationCustomization.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/notificationCustomization.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const beginTrackingMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('MeasurementTable:Track measurements for this series?');
const trackNewSeriesMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Do you want to add this measurement to the existing report?');
const discardSeriesMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('You have existing tracked measurements. What would you like to do with your existing tracked measurements?');
const trackNewStudyMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('MeasurementTable:Track measurements for this series?');
const discardStudyMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Measurements cannot span across multiple studies. Do you want to save your tracked measurements?');
const hydrateSRMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Do you want to continue tracking measurements for this study?');
const hydrateRTMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Do you want to open this Segmentation?');
const hydrateSEGMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Do you want to open this Segmentation?');
const discardDirtyMessage = _ohif_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('There are unsaved measurements. Do you want to save it?');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ui.notificationComponent': _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ViewportDialog,
  'viewportNotification.beginTrackingMessage': beginTrackingMessage,
  'viewportNotification.trackNewSeriesMessage': trackNewSeriesMessage,
  'viewportNotification.discardSeriesMessage': discardSeriesMessage,
  'viewportNotification.trackNewStudyMessage': trackNewStudyMessage,
  'viewportNotification.discardStudyMessage': discardStudyMessage,
  'viewportNotification.hydrateSRMessage': hydrateSRMessage,
  'viewportNotification.hydrateRTMessage': hydrateRTMessage,
  'viewportNotification.hydrateSEGMessage': hydrateSEGMessage,
  'viewportNotification.discardDirtyMessage': discardDirtyMessage
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

/***/ "../../../extensions/default/src/customizations/onDropHandlerCustomization.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/onDropHandlerCustomization.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  customOnDropHandler: () => {
    return Promise.resolve({
      handled: false
    });
  }
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

/***/ "../../../extensions/default/src/customizations/onboardingCustomization.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/onboardingCustomization.ts ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function waitForElement(selector, maxAttempts = 20, interval = 25) {
  return new Promise(resolve => {
    let attempts = 0;
    const checkForElement = setInterval(() => {
      const element = document.querySelector(selector);
      if (element || attempts >= maxAttempts) {
        clearInterval(checkForElement);
        resolve();
      }
      attempts++;
    }, interval);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.tours': [{
    id: 'basicViewerTour',
    route: '/viewer',
    steps: [{
      id: 'scroll',
      title: 'Scrolling Through Images',
      text: 'You can scroll through the images using the mouse wheel or scrollbar.',
      attachTo: {
        element: '.viewport-element',
        on: 'top'
      },
      advanceOn: {
        selector: '.cornerstone-viewport-element',
        event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL'
      },
      beforeShowPromise: () => waitForElement('.viewport-element')
    }, {
      id: 'zoom',
      title: 'Zooming In and Out',
      text: 'You can zoom the images using the right click.',
      attachTo: {
        element: '.viewport-element',
        on: 'left'
      },
      advanceOn: {
        selector: '.cornerstone-viewport-element',
        event: 'CORNERSTONE_TOOLS_MOUSE_UP'
      },
      beforeShowPromise: () => waitForElement('.viewport-element')
    }, {
      id: 'pan',
      title: 'Panning the Image',
      text: 'You can pan the images using the middle click.',
      attachTo: {
        element: '.viewport-element',
        on: 'top'
      },
      advanceOn: {
        selector: '.cornerstone-viewport-element',
        event: 'CORNERSTONE_TOOLS_MOUSE_UP'
      },
      beforeShowPromise: () => waitForElement('.viewport-element')
    }, {
      id: 'windowing',
      title: 'Adjusting Window Level',
      text: 'You can modify the window level using the left click.',
      attachTo: {
        element: '.viewport-element',
        on: 'left'
      },
      advanceOn: {
        selector: '.cornerstone-viewport-element',
        event: 'CORNERSTONE_TOOLS_MOUSE_UP'
      },
      beforeShowPromise: () => waitForElement('.viewport-element')
    }, {
      id: 'length',
      title: 'Using the Measurement Tools',
      text: 'You can measure the length of a region using the Length tool.',
      attachTo: {
        element: '[data-cy="MeasurementTools-split-button-primary"]',
        on: 'bottom'
      },
      advanceOn: {
        selector: '[data-cy="MeasurementTools-split-button-primary"]',
        event: 'click'
      },
      beforeShowPromise: () => waitForElement('[data-cy="MeasurementTools-split-button-primary]')
    }, {
      id: 'drawAnnotation',
      title: 'Drawing Length Annotations',
      text: 'Use the length tool on the viewport to measure the length of a region.',
      attachTo: {
        element: '.viewport-element',
        on: 'right'
      },
      advanceOn: {
        selector: 'body',
        event: 'event::measurement_added'
      },
      beforeShowPromise: () => waitForElement('.viewport-element')
    }, {
      id: 'trackMeasurement',
      title: 'Tracking Measurements in the Panel',
      text: 'Click yes to track the measurements in the measurement panel.',
      attachTo: {
        element: '[data-cy="prompt-begin-tracking-yes-btn"]',
        on: 'bottom'
      },
      advanceOn: {
        selector: '[data-cy="prompt-begin-tracking-yes-btn"]',
        event: 'click'
      },
      beforeShowPromise: () => waitForElement('[data-cy="prompt-begin-tracking-yes-btn"]')
    }, {
      id: 'openMeasurementPanel',
      title: 'Opening the Measurements Panel',
      text: 'Click the measurements button to open the measurements panel.',
      attachTo: {
        element: '#trackedMeasurements-btn',
        on: 'left-start'
      },
      advanceOn: {
        selector: '#trackedMeasurements-btn',
        event: 'click'
      },
      beforeShowPromise: () => waitForElement('#trackedMeasurements-btn')
    }, {
      id: 'scrollAwayFromMeasurement',
      title: 'Scrolling Away from a Measurement',
      text: 'Scroll the images using the mouse wheel away from the measurement.',
      attachTo: {
        element: '.viewport-element',
        on: 'left'
      },
      advanceOn: {
        selector: '.cornerstone-viewport-element',
        event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL'
      },
      beforeShowPromise: () => waitForElement('.viewport-element')
    }, {
      id: 'jumpToMeasurement',
      title: 'Jumping to Measurements in the Panel',
      text: 'Click the measurement in the measurement panel to jump to it.',
      attachTo: {
        element: '[data-cy="data-row"]',
        on: 'left-start'
      },
      advanceOn: {
        selector: '[data-cy="data-row"]',
        event: 'click'
      },
      beforeShowPromise: () => waitForElement('[data-cy="data-row"]')
    }, {
      id: 'changeLayout',
      title: 'Changing Layout',
      text: 'You can change the layout of the viewer using the layout button.',
      attachTo: {
        element: '[data-cy="Layout"]',
        on: 'bottom'
      },
      advanceOn: {
        selector: '[data-cy="Layout"]',
        event: 'click'
      },
      beforeShowPromise: () => waitForElement('[data-cy="Layout"]')
    }, {
      id: 'selectLayout',
      title: 'Selecting the MPR Layout',
      text: 'Select the MPR layout to view the images in MPR mode.',
      attachTo: {
        element: '[data-cy="MPR"]',
        on: 'left-start'
      },
      advanceOn: {
        selector: '[data-cy="MPR"]',
        event: 'click'
      },
      beforeShowPromise: () => waitForElement('[data-cy="MPR"]')
    }],
    tourOptions: {
      useModalOverlay: true,
      defaultStepOptions: {
        buttons: [{
          text: 'Skip all',
          action() {
            this.complete();
          },
          secondary: true
        }]
      }
    }
  }]
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

/***/ "../../../extensions/default/src/customizations/overlayItemCustomization.tsx":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/overlayItemCustomization.tsx ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.overlayItem': function (props) {
    if (this.condition && !this.condition(props)) {
      return null;
    }
    const {
      instance
    } = props;
    const value = instance && this.attribute ? instance[this.attribute] : this.contentF && typeof this.contentF === 'function' ? this.contentF(props) : null;
    if (!value) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "overlay-item flex flex-row",
      style: {
        color: this.color || undefined
      },
      title: this.title || ''
    }, this.label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "mr-1 shrink-0"
    }, this.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "font-light"
    }, value));
  }
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

/***/ "../../../extensions/default/src/customizations/progressDropdownCustomization.ts":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/progressDropdownCustomization.ts ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components/ProgressDropdownWithService */ "../../../extensions/default/src/Components/ProgressDropdownWithService.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  progressDropdownWithServiceComponent: _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_0__.ProgressDropdownWithService
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

/***/ "../../../extensions/default/src/customizations/progressLoadingBarCustomization.tsx":
/*!******************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/progressLoadingBarCustomization.tsx ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ui.progressLoadingBar': _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__.ProgressLoadingBar
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

/***/ "../../../extensions/default/src/customizations/reportDialogCustomization.tsx":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/reportDialogCustomization.tsx ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportDialog: () => (/* binding */ ReportDialog),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




function ReportDialog({
  dataSources,
  hide,
  onSave,
  onCancel
}) {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const [selectedDataSource, setSelectedDataSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dataSources?.[0]?.value ?? null);
  const [selectedSeries, setSelectedSeries] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [reportName, setReportName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    displaySetService
  } = servicesManager.services;
  const seriesOptions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const displaySetsMap = displaySetService.getDisplaySetCache();
    const displaySets = Array.from(displaySetsMap.values());
    const options = displaySets.filter(ds => ds.Modality === 'SR').map(ds => ({
      value: ds.SeriesInstanceUID,
      description: ds.SeriesDescription,
      label: `${ds.SeriesDescription} ${ds.SeriesDate}/${ds.SeriesTime} ${ds.SeriesNumber}`
    }));
    return [{
      value: null,
      description: null,
      label: 'Create new series'
    }, ...options];
  }, [displaySetService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const seriesOption = seriesOptions.find(s => s.value === selectedSeries);
    const newReportName = selectedSeries && seriesOption?.description ? seriesOption.description : '';
    setReportName(newReportName);
  }, [selectedSeries, seriesOptions]);
  const handleSave = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    onSave({
      reportName,
      dataSource: selectedDataSource,
      series: selectedSeries
    });
    hide();
  }, [selectedDataSource, selectedSeries, reportName, hide, onSave]);
  const handleCancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    onCancel();
    hide();
  }, [onCancel, hide]);
  const showDataSourceSelect = dataSources?.length > 1;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-foreground flex min-w-[400px] max-w-md flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex gap-4"
  }, showDataSourceSelect && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-1 w-1/2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-1 pl-1 text-base"
  }, "Data source"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: selectedDataSource,
    onValueChange: setSelectedDataSource
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectTrigger, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectValue, {
    placeholder: "Select a data source"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectContent, null, dataSources.map(source => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectItem, {
    key: source.value,
    value: source.value
  }, source.label))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: showDataSourceSelect ? 'mt-1 w-1/2' : 'mt-1 w-full'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-1 pl-1 text-base"
  }, "Series"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: selectedSeries,
    onValueChange: setSelectedSeries
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectTrigger, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectValue, {
    placeholder: "Select a series"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectContent, null, seriesOptions.map(series => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectItem, {
    key: series.value,
    value: series.value
  }, series.label))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-end gap-4"
  }, !showDataSourceSelect && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-1/3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-1 pl-1 text-base"
  }, "Series"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: selectedSeries,
    onValueChange: setSelectedSeries
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectTrigger, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectValue, {
    placeholder: "Select a series"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectContent, null, seriesOptions.map(series => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SelectItem, {
    key: series.value,
    value: series.value
  }, series.label))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog, {
    value: reportName,
    onChange: setReportName,
    submitOnEnter: true,
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog.Field, {
    className: "mb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog.Input, {
    placeholder: "Report name",
    disabled: !!selectedSeries
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-end gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog.Actions, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog.ActionsSecondary, {
    onClick: handleCancel
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.InputDialog.ActionsPrimary, {
    onClick: handleSave
  }, "Save"))))));
}
_s(ReportDialog, "mdpEkNZuZVN5TNpKXgGD2c+oIUA=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem];
});
_c = ReportDialog;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.createReportDialog': ReportDialog
});
var _c;
__webpack_require__.$Refresh$.register(_c, "ReportDialog");

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

/***/ "../../../extensions/default/src/customizations/sortingCriteriaCustomization.ts":
/*!**************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/sortingCriteriaCustomization.ts ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const {
  sortingCriteria
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sortingCriteria: sortingCriteria.seriesSortCriteria.seriesInfoSortingCriteria
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

/***/ "../../../extensions/default/src/customizations/studyBrowserCustomization.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/studyBrowserCustomization.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const {
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'studyBrowser.studyMenuItems': [],
  'studyBrowser.thumbnailMenuItems': [{
    id: 'tagBrowser',
    label: 'Tag Browser',
    iconName: 'DicomTagBrowser',
    onClick: ({
      commandsManager,
      displaySetInstanceUID
    }) => {
      commandsManager.runCommand('openDICOMTagViewer', {
        displaySetInstanceUID
      });
    }
  }, {
    id: 'addAsLayer',
    label: 'Add as Layer',
    iconName: 'ViewportViews',
    onClick: ({
      commandsManager,
      displaySetInstanceUID,
      servicesManager
    }) => {
      const {
        viewportGridService
      } = servicesManager.services;

      // Get the active viewport
      const {
        activeViewportId
      } = viewportGridService.getState();
      if (!activeViewportId) {
        return;
      }

      // Use the new command to add the display set as a layer
      commandsManager.runCommand('addDisplaySetAsLayer', {
        viewportId: activeViewportId,
        displaySetInstanceUID
      });
    }
  }],
  'studyBrowser.sortFunctions': [{
    label: 'Series Number',
    sortFunction: (a, b) => {
      return a?.SeriesNumber - b?.SeriesNumber;
    }
  }, {
    label: 'Series Date',
    sortFunction: (a, b) => {
      const dateA = new Date(formatDate(a?.SeriesDate));
      const dateB = new Date(formatDate(b?.SeriesDate));
      return dateB.getTime() - dateA.getTime();
    }
  }],
  'studyBrowser.viewPresets': [{
    id: 'list',
    iconName: 'ListView',
    selected: false
  }, {
    id: 'thumbnails',
    iconName: 'ThumbnailView',
    selected: true
  }],
  'studyBrowser.studyMode': 'all',
  'studyBrowser.thumbnailDoubleClickCallback': {
    callbacks: [({
      activeViewportId,
      servicesManager,
      commandsManager,
      isHangingProtocolLayout
    }) => async displaySetInstanceUID => {
      const {
        hangingProtocolService,
        uiNotificationService
      } = servicesManager.services;
      let updatedViewports = [];
      const viewportId = activeViewportId;
      try {
        updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID, isHangingProtocolLayout);
      } catch (error) {
        console.warn(error);
        uiNotificationService.show({
          title: 'Thumbnail Double Click',
          message: 'The selected display sets could not be added to the viewport.',
          type: 'error',
          duration: 3000
        });
      }
      commandsManager.run('setDisplaySetsForViewports', {
        viewportsToUpdate: updatedViewports
      });
    }]
  }
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

/***/ "../../../extensions/default/src/customizations/userPreferencesCustomization.tsx":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/customizations/userPreferencesCustomization.tsx ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();






const {
  availableLanguages,
  defaultLanguage,
  currentLanguage: currentLanguageFn
} = _ohif_i18n__WEBPACK_IMPORTED_MODULE_4__["default"];
function UserPreferencesModalDefault({
  hide
}) {
  _s();
  const {
    hotkeysManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)('UserPreferencesModal');
  const {
    hotkeyDefinitions = {},
    hotkeyDefaults = {}
  } = hotkeysManager;
  const currentLanguage = currentLanguageFn();
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    hotkeyDefinitions: hotkeyDefinitions,
    languageValue: currentLanguage.value
  });
  const onLanguageChangeHandler = value => {
    setState(state => ({
      ...state,
      languageValue: value
    }));
  };
  const onHotkeyChangeHandler = (id, newKeys) => {
    setState(state => ({
      ...state,
      hotkeyDefinitions: {
        ...state.hotkeyDefinitions,
        [id]: {
          ...state.hotkeyDefinitions[id],
          keys: newKeys
        }
      }
    }));
  };
  const onResetHandler = () => {
    setState(state => ({
      ...state,
      languageValue: defaultLanguage.value,
      hotkeyDefinitions: hotkeyDefaults
    }));
    hotkeysManager.restoreDefaultBindings();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.UserPreferencesModal, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.UserPreferencesModal.Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 flex items-center space-x-14"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.UserPreferencesModal.SubHeading, null, t('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Select, {
    defaultValue: state.languageValue,
    onValueChange: onLanguageChangeHandler
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.SelectTrigger, {
    className: "w-60",
    "aria-label": "Language"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.SelectValue, {
    placeholder: t('Select language')
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.SelectContent, null, availableLanguages.map(lang => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.SelectItem, {
    key: lang.value,
    value: lang.value
  }, lang.label))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.UserPreferencesModal.SubHeading, null, t('Hotkeys')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.UserPreferencesModal.HotkeysGrid, null, Object.entries(state.hotkeyDefinitions).map(([id, definition]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.UserPreferencesModal.Hotkey, {
    key: id,
    label: t(definition.label),
    value: definition.keys,
    onChange: newKeys => onHotkeyChangeHandler(id, newKeys),
    placeholder: definition.keys,
    hotkeys: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Left, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Auxiliary, {
    onClick: onResetHandler
  }, t('Reset to defaults'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Right, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Secondary, {
    onClick: () => {
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.stopRecord();
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.unpause();
      hide();
    }
  }, t('Cancel')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Primary, {
    onClick: () => {
      if (state.languageValue !== currentLanguage.value) {
        _ohif_i18n__WEBPACK_IMPORTED_MODULE_4__["default"].changeLanguage(state.languageValue);
      }
      hotkeysManager.setHotkeys(state.hotkeyDefinitions);
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.stopRecord();
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.unpause();
      hide();
    }
  }, t('Save')))));
}
_s(UserPreferencesModalDefault, "CVRrsNxAXmKw2F7V3oOq4CVZMGo=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem, react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation];
});
_c = UserPreferencesModalDefault;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'ohif.userPreferencesModal': UserPreferencesModalDefault
});
var _c;
__webpack_require__.$Refresh$.register(_c, "UserPreferencesModalDefault");

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

/***/ "../../../extensions/default/src/findViewportsByPosition.ts":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/findViewportsByPosition.ts ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findOrCreateViewport: () => (/* binding */ findOrCreateViewport)
/* harmony export */ });
/* harmony import */ var _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stores/useViewportsByPositionStore */ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * This find or create viewport is paired with the reduce results from
 * below, and the action of this viewport is to look for previously filled
 * viewports, and to reuse by position id.  If there is no filled viewport,
 * then one can be re-used from the display set if it isn't going to be displayed.
 * @param hangingProtocolService - bound parameter supplied before using this
 * @param viewportsByPosition - bound parameter supplied before using this
 * @param position - the position in the grid to retrieve
 * @param positionId - the current position on screen to retrieve
 * @param options - the set of options used, so that subsequent calls can
 *                  store state that is reset by the setLayout.
 *                  This class uses the options to store the already viewed
 *                  display sets, filling it initially with the pre-existing viewports.
 */
const findOrCreateViewport = (hangingProtocolService, isHangingProtocolLayout, viewportsByPosition, position, positionId, options) => {
  const byPositionViewport = viewportsByPosition?.[positionId];
  if (byPositionViewport) {
    return {
      ...byPositionViewport
    };
  }
  const {
    protocolId,
    stageIndex
  } = hangingProtocolService.getState();

  // Setup the initial in display correctly for initial view/select
  if (!options.inDisplay) {
    options.inDisplay = [...viewportsByPosition.initialInDisplay];
  }

  // See if there is a default viewport for new views
  const missing = hangingProtocolService.getMissingViewport(isHangingProtocolLayout ? protocolId : 'default', stageIndex, options);
  if (missing) {
    const displaySetInstanceUIDs = missing.displaySetsInfo.map(it => it.displaySetInstanceUID);
    options.inDisplay.push(...displaySetInstanceUIDs);
    return {
      displaySetInstanceUIDs,
      displaySetOptions: missing.displaySetsInfo.map(it => it.displaySetOptions),
      viewportOptions: {
        ...missing.viewportOptions
      }
    };
  }

  // and lastly if there is no default viewport, then we see if we can grab the
  // viewportsByPosition at the position index and use that
  // const candidate = Object.values(viewportsByPosition)[position];

  // // if it has something to display, then we can use it
  // return candidate?.displaySetInstanceUIDs ? candidate : {};
  return {};
};

/**
 * Records the information on what viewports are displayed in which position.
 * Also records what instances from the existing positions are going to be in
 * view initially.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const findViewportsByPosition = (state, {
  numRows,
  numCols
}) => {
  const {
    viewports
  } = state;
  const {
    setViewportsByPosition,
    addInitialInDisplay
  } = _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_0__.useViewportsByPositionStore.getState();
  const initialInDisplay = [];
  const viewportsByPosition = {};
  viewports.forEach(viewport => {
    if (viewport.positionId) {
      const storedViewport = {
        ...viewport,
        viewportOptions: {
          ...viewport.viewportOptions
        }
      };
      viewportsByPosition[viewport.positionId] = storedViewport;
      setViewportsByPosition(viewport.positionId, storedViewport);
    }
  });
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const positionId = `${col}-${row}`;
      const viewport = viewportsByPosition[positionId];
      if (viewport?.displaySetInstanceUIDs) {
        initialInDisplay.push(...viewport.displaySetInstanceUIDs);
      }
    }
  }
  initialInDisplay.forEach(displaySetInstanceUID => addInitialInDisplay(displaySetInstanceUID));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findViewportsByPosition);

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

/***/ "../../../extensions/default/src/getCustomizationModule.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/getCustomizationModule.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* harmony import */ var _customizations_defaultContextMenuCustomization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizations/defaultContextMenuCustomization */ "../../../extensions/default/src/customizations/defaultContextMenuCustomization.ts");
/* harmony import */ var _customizations_helloPageCustomization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customizations/helloPageCustomization */ "../../../extensions/default/src/customizations/helloPageCustomization.tsx");
/* harmony import */ var _customizations_datasourcesCustomization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customizations/datasourcesCustomization */ "../../../extensions/default/src/customizations/datasourcesCustomization.tsx");
/* harmony import */ var _customizations_multimonitorCustomization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customizations/multimonitorCustomization */ "../../../extensions/default/src/customizations/multimonitorCustomization.ts");
/* harmony import */ var _customizations_customRoutesCustomization__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customizations/customRoutesCustomization */ "../../../extensions/default/src/customizations/customRoutesCustomization.ts");
/* harmony import */ var _customizations_studyBrowserCustomization__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customizations/studyBrowserCustomization */ "../../../extensions/default/src/customizations/studyBrowserCustomization.ts");
/* harmony import */ var _customizations_overlayItemCustomization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customizations/overlayItemCustomization */ "../../../extensions/default/src/customizations/overlayItemCustomization.tsx");
/* harmony import */ var _customizations_contextMenuCustomization__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customizations/contextMenuCustomization */ "../../../extensions/default/src/customizations/contextMenuCustomization.ts");
/* harmony import */ var _customizations_contextMenuUICustomization__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customizations/contextMenuUICustomization */ "../../../extensions/default/src/customizations/contextMenuUICustomization.ts");
/* harmony import */ var _customizations_menuContentCustomization__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customizations/menuContentCustomization */ "../../../extensions/default/src/customizations/menuContentCustomization.tsx");
/* harmony import */ var _customizations_dataSourceConfigurationCustomization__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./customizations/dataSourceConfigurationCustomization */ "../../../extensions/default/src/customizations/dataSourceConfigurationCustomization.ts");
/* harmony import */ var _customizations_progressDropdownCustomization__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./customizations/progressDropdownCustomization */ "../../../extensions/default/src/customizations/progressDropdownCustomization.ts");
/* harmony import */ var _customizations_sortingCriteriaCustomization__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./customizations/sortingCriteriaCustomization */ "../../../extensions/default/src/customizations/sortingCriteriaCustomization.ts");
/* harmony import */ var _customizations_onDropHandlerCustomization__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./customizations/onDropHandlerCustomization */ "../../../extensions/default/src/customizations/onDropHandlerCustomization.ts");
/* harmony import */ var _customizations_loadingIndicatorProgressCustomization__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./customizations/loadingIndicatorProgressCustomization */ "../../../extensions/default/src/customizations/loadingIndicatorProgressCustomization.tsx");
/* harmony import */ var _customizations_loadingIndicatorTotalPercentCustomization__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./customizations/loadingIndicatorTotalPercentCustomization */ "../../../extensions/default/src/customizations/loadingIndicatorTotalPercentCustomization.tsx");
/* harmony import */ var _customizations_progressLoadingBarCustomization__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./customizations/progressLoadingBarCustomization */ "../../../extensions/default/src/customizations/progressLoadingBarCustomization.tsx");
/* harmony import */ var _customizations_labellingFlowCustomization__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./customizations/labellingFlowCustomization */ "../../../extensions/default/src/customizations/labellingFlowCustomization.tsx");
/* harmony import */ var _customizations_notificationCustomization__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./customizations/notificationCustomization */ "../../../extensions/default/src/customizations/notificationCustomization.ts");
/* harmony import */ var _customizations_aboutModalCustomization__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./customizations/aboutModalCustomization */ "../../../extensions/default/src/customizations/aboutModalCustomization.tsx");
/* harmony import */ var _customizations_userPreferencesCustomization__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./customizations/userPreferencesCustomization */ "../../../extensions/default/src/customizations/userPreferencesCustomization.tsx");
/* harmony import */ var _customizations_reportDialogCustomization__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./customizations/reportDialogCustomization */ "../../../extensions/default/src/customizations/reportDialogCustomization.tsx");
/* harmony import */ var _customizations_hotkeyBindingsCustomization__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./customizations/hotkeyBindingsCustomization */ "../../../extensions/default/src/customizations/hotkeyBindingsCustomization.ts");
/* harmony import */ var _customizations_onboardingCustomization__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./customizations/onboardingCustomization */ "../../../extensions/default/src/customizations/onboardingCustomization.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

























/**
 *
 * Note: this is an example of how the customization module can be used
 * using the customization module. Below, we are adding a new custom route
 * to the application at the path /custom and rendering a custom component
 * Real world use cases of the having a custom route would be to add a
 * custom page for the user to view their profile, or to add a custom
 * page for login etc.
 */
function getCustomizationModule({
  servicesManager,
  extensionManager
}) {
  return [{
    name: 'helloPage',
    value: _customizations_helloPageCustomization__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    name: 'datasources',
    value: _customizations_datasourcesCustomization__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, {
    name: 'multimonitor',
    value: _customizations_multimonitorCustomization__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    name: 'default',
    value: {
      ..._customizations_customRoutesCustomization__WEBPACK_IMPORTED_MODULE_4__["default"],
      ..._customizations_studyBrowserCustomization__WEBPACK_IMPORTED_MODULE_5__["default"],
      ..._customizations_overlayItemCustomization__WEBPACK_IMPORTED_MODULE_6__["default"],
      ..._customizations_contextMenuCustomization__WEBPACK_IMPORTED_MODULE_7__["default"],
      ..._customizations_menuContentCustomization__WEBPACK_IMPORTED_MODULE_9__["default"],
      ...(0,_customizations_dataSourceConfigurationCustomization__WEBPACK_IMPORTED_MODULE_10__["default"])({
        servicesManager,
        extensionManager
      }),
      ..._customizations_progressDropdownCustomization__WEBPACK_IMPORTED_MODULE_11__["default"],
      ..._customizations_sortingCriteriaCustomization__WEBPACK_IMPORTED_MODULE_12__["default"],
      ..._customizations_defaultContextMenuCustomization__WEBPACK_IMPORTED_MODULE_0__["default"],
      ..._customizations_onDropHandlerCustomization__WEBPACK_IMPORTED_MODULE_13__["default"],
      ..._customizations_loadingIndicatorProgressCustomization__WEBPACK_IMPORTED_MODULE_14__["default"],
      ..._customizations_loadingIndicatorTotalPercentCustomization__WEBPACK_IMPORTED_MODULE_15__["default"],
      ..._customizations_progressLoadingBarCustomization__WEBPACK_IMPORTED_MODULE_16__["default"],
      ..._customizations_labellingFlowCustomization__WEBPACK_IMPORTED_MODULE_17__["default"],
      ..._customizations_contextMenuUICustomization__WEBPACK_IMPORTED_MODULE_8__["default"],
      ..._customizations_notificationCustomization__WEBPACK_IMPORTED_MODULE_18__["default"],
      ..._customizations_aboutModalCustomization__WEBPACK_IMPORTED_MODULE_19__["default"],
      ..._customizations_userPreferencesCustomization__WEBPACK_IMPORTED_MODULE_20__["default"],
      ..._customizations_reportDialogCustomization__WEBPACK_IMPORTED_MODULE_21__["default"],
      ..._customizations_hotkeyBindingsCustomization__WEBPACK_IMPORTED_MODULE_22__["default"],
      ..._customizations_onboardingCustomization__WEBPACK_IMPORTED_MODULE_23__["default"]
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

/***/ "../../../extensions/default/src/getDataSourcesModule.js":
/*!***************************************************************!*\
  !*** ../../../extensions/default/src/getDataSourcesModule.js ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DicomWebDataSource/index */ "../../../extensions/default/src/DicomWebDataSource/index.ts");
/* harmony import */ var _DicomJSONDataSource_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DicomJSONDataSource/index */ "../../../extensions/default/src/DicomJSONDataSource/index.js");
/* harmony import */ var _DicomLocalDataSource_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DicomLocalDataSource/index */ "../../../extensions/default/src/DicomLocalDataSource/index.js");
/* harmony import */ var _DicomWebProxyDataSource_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DicomWebProxyDataSource/index */ "../../../extensions/default/src/DicomWebProxyDataSource/index.ts");
/* harmony import */ var _MergeDataSource_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MergeDataSource/index */ "../../../extensions/default/src/MergeDataSource/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// TODO: Pull in IWebClientApi from @ohif/core
// TODO: Use constructor to create an instance of IWebClientApi
// TODO: Use existing DICOMWeb configuration (previously, appConfig, to configure instance)







/**
 *
 */
function getDataSourcesModule() {
  return [{
    name: 'dicomweb',
    type: 'webApi',
    createDataSource: _DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_0__.createDicomWebApi
  }, {
    name: 'dicomwebproxy',
    type: 'webApi',
    createDataSource: _DicomWebProxyDataSource_index__WEBPACK_IMPORTED_MODULE_3__.createDicomWebProxyApi
  }, {
    name: 'dicomjson',
    type: 'jsonApi',
    createDataSource: _DicomJSONDataSource_index__WEBPACK_IMPORTED_MODULE_1__.createDicomJSONApi
  }, {
    name: 'dicomlocal',
    type: 'localApi',
    createDataSource: _DicomLocalDataSource_index__WEBPACK_IMPORTED_MODULE_2__.createDicomLocalApi
  }, {
    name: 'merge',
    type: 'mergeApi',
    createDataSource: _MergeDataSource_index__WEBPACK_IMPORTED_MODULE_4__.createMergeDataSourceApi
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDataSourcesModule);

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

/***/ "../../../extensions/default/src/getDisplaySetMessages.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/getDisplaySetMessages.ts ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDisplaySetMessages)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_sortInstancesByPosition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/sortInstancesByPosition */ "../../core/src/utils/sortInstancesByPosition.ts");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _utils_validations_checkMultiframe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/validations/checkMultiframe */ "../../../extensions/default/src/utils/validations/checkMultiframe.ts");
/* harmony import */ var _utils_validations_checkSingleFrames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/validations/checkSingleFrames */ "../../../extensions/default/src/utils/validations/checkSingleFrames.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






/**
 * Checks if a series is reconstructable to a 3D volume.
 *
 * @param {Object[]} instances An array of `OHIFInstanceMetadata` objects.
 */
function getDisplaySetMessages(instances, isReconstructable, isDynamicVolume) {
  const messages = new _ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessageList();
  if (isDynamicVolume) {
    return messages;
  }
  if (!instances.length) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessage.CODES.NO_VALID_INSTANCES);
    return;
  }
  const firstInstance = instances[0];
  const {
    Modality,
    ImageType,
    NumberOfFrames
  } = firstInstance;
  // Due to current requirements, LOCALIZER series doesn't have any messages
  if (ImageType?.includes('LOCALIZER')) {
    return messages;
  }
  if (!_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__.constructableModalities.includes(Modality)) {
    return messages;
  }
  const isMultiframe = NumberOfFrames > 1;
  // Can't reconstruct if all instances don't have the ImagePositionPatient.
  if (!isMultiframe && !instances.every(instance => instance.ImagePositionPatient)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessage.CODES.NO_POSITION_INFORMATION);
  }
  const sortedInstances = (0,_ohif_core_src_utils_sortInstancesByPosition__WEBPACK_IMPORTED_MODULE_0__["default"])(instances);
  isMultiframe ? (0,_utils_validations_checkMultiframe__WEBPACK_IMPORTED_MODULE_3__["default"])(sortedInstances[0], messages) : (0,_utils_validations_checkSingleFrames__WEBPACK_IMPORTED_MODULE_4__["default"])(sortedInstances, messages);
  if (!isReconstructable) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessage.CODES.NOT_RECONSTRUCTABLE);
  }
  return messages;
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

/***/ "../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDisplaySetsFromUnsupportedSeries)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_classes_ImageSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/classes/ImageSet */ "../../core/src/classes/ImageSet.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Default handler for a instance list with an unsupported sopClassUID
 */
function getDisplaySetsFromUnsupportedSeries(instances) {
  const imageSet = new _ohif_core_src_classes_ImageSet__WEBPACK_IMPORTED_MODULE_0__["default"](instances);
  const messages = new _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessageList();
  const instance = instances[0];
  if (!instances.length) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.NO_VALID_INSTANCES);
  } else {
    const sopClassUid = instance.SOPClassUID;
    if (sopClassUid) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.UNSUPPORTED_SOP_CLASS_UID, {
        sopClassUid
      });
    } else {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MISSING_SOP_CLASS_UID);
    }
  }
  imageSet.setAttributes({
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    numImageFrames: instances.length,
    unsupported: true,
    SOPClassHandlerId: 'unsupported',
    isReconstructable: false,
    messages
  });
  return [imageSet];
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

/***/ "../../../extensions/default/src/getHangingProtocolModule.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/getHangingProtocolModule.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hangingprotocols/hpMNGrid */ "../../../extensions/default/src/hangingprotocols/hpMNGrid.ts");
/* harmony import */ var _hangingprotocols_hpCompare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hangingprotocols/hpCompare */ "../../../extensions/default/src/hangingprotocols/hpCompare.ts");
/* harmony import */ var _hangingprotocols_hpMammo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hangingprotocols/hpMammo */ "../../../extensions/default/src/hangingprotocols/hpMammo.ts");
/* harmony import */ var _hangingprotocols_hpScale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hangingprotocols/hpScale */ "../../../extensions/default/src/hangingprotocols/hpScale.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const defaultProtocol = {
  id: 'default',
  locked: true,
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
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
      allowUnmatchedView: true,
      syncGroups: [{
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true,
        options: {
          matchingRules: ['sameFOR']
        }
      }]
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    defaultDisplaySetId: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
      // Try to match series with images by default, to prevent weird display
      // on SEG/SR containing studies
      {
        weight: 10,
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 20,
        constraint: {
          equals: true
        }
      }]
    }
  },
  stages: [{
    name: 'default',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        viewportType: 'stack',
        viewportId: 'default',
        toolGroupId: 'default',
        // This will specify the initial image options index if it matches in the URL
        // and will otherwise not specify anything.
        initialImageOptions: {
          custom: 'sopInstanceLocation'
        },
        // Other options for initialImageOptions, which can be included in the default
        // custom attribute, or can be provided directly.
        //   index: 180,
        //   preset: 'middle', // 'first', 'last', 'middle'
        // },
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }],
    createdDate: '2021-02-23T18:32:42.850Z'
  }]
};
function getHangingProtocolModule() {
  return [{
    name: defaultProtocol.id,
    protocol: defaultProtocol
  },
  // Create a MxN comparison hanging protocol available by default
  {
    name: _hangingprotocols_hpCompare__WEBPACK_IMPORTED_MODULE_1__["default"].id,
    protocol: _hangingprotocols_hpCompare__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    name: _hangingprotocols_hpMammo__WEBPACK_IMPORTED_MODULE_2__["default"].id,
    protocol: _hangingprotocols_hpMammo__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, {
    name: _hangingprotocols_hpScale__WEBPACK_IMPORTED_MODULE_3__["default"].id,
    protocol: _hangingprotocols_hpScale__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  // Create a MxN hanging protocol available by default
  {
    name: _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__.hpMN.id,
    protocol: _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__.hpMN
  }, {
    name: _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__.hpMN8.id,
    protocol: _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__.hpMN8
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

/***/ "../../../extensions/default/src/getLayoutTemplateModule.js":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/getLayoutTemplateModule.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewerLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerLayout */ "../../../extensions/default/src/ViewerLayout/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/*
- Define layout for the viewer in mode configuration.
- Pass in the viewport types that can populate the viewer.
- Init layout based on the displaySets and the objects.
*/

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__({
  servicesManager,
  extensionManager,
  commandsManager,
  hotkeysManager
}) {
  function ViewerLayoutWithServices(props) {
    return (0,_ViewerLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props
    });
  }
  return [
  // Layout Template Definition
  // TODO: this is weird naming
  {
    name: 'viewerLayout',
    id: 'viewerLayout',
    component: ViewerLayoutWithServices
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

/***/ "../../../extensions/default/src/getPTImageIdInstanceMetadata.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/default/src/getPTImageIdInstanceMetadata.ts ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPTImageIdInstanceMetadata),
/* harmony export */   getPTImageIdInstanceMetadata: () => (/* binding */ getPTImageIdInstanceMetadata)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
function getPTImageIdInstanceMetadata(imageId) {
  const dicomMetaData = metadataProvider.get('instance', imageId);
  if (!dicomMetaData) {
    throw new Error('dicom metadata are required');
  }
  if (dicomMetaData.SeriesDate === undefined || dicomMetaData.SeriesTime === undefined || dicomMetaData.CorrectedImage === undefined || dicomMetaData.Units === undefined || !dicomMetaData.RadiopharmaceuticalInformationSequence || dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose === undefined || dicomMetaData.DecayCorrection === undefined || dicomMetaData.AcquisitionDate === undefined || dicomMetaData.AcquisitionTime === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartDateTime === undefined && dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime === undefined) {
    throw new Error('required metadata are missing');
  }
  if (dicomMetaData.PatientWeight === undefined) {
    console.warn('PatientWeight missing from PT instance metadata');
  }
  const instanceMetadata = {
    CorrectedImage: dicomMetaData.CorrectedImage,
    Units: dicomMetaData.Units,
    RadionuclideHalfLife: dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife,
    RadionuclideTotalDose: dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose,
    RadiopharmaceuticalStartDateTime: dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartDateTime,
    RadiopharmaceuticalStartTime: dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime,
    DecayCorrection: dicomMetaData.DecayCorrection,
    PatientWeight: dicomMetaData.PatientWeight,
    SeriesDate: dicomMetaData.SeriesDate,
    SeriesTime: dicomMetaData.SeriesTime,
    AcquisitionDate: dicomMetaData.AcquisitionDate,
    AcquisitionTime: dicomMetaData.AcquisitionTime
  };
  if (dicomMetaData['70531000'] || dicomMetaData['70531000'] !== undefined || dicomMetaData['70531009'] || dicomMetaData['70531009'] !== undefined) {
    const philipsPETPrivateGroup = {
      SUVScaleFactor: dicomMetaData['70531000'],
      ActivityConcentrationScaleFactor: dicomMetaData['70531009']
    };
    instanceMetadata.PhilipsPETPrivateGroup = philipsPETPrivateGroup;
  }
  if (dicomMetaData['0009100d'] && dicomMetaData['0009100d'] !== undefined) {
    instanceMetadata.GEPrivatePostInjectionDateTime = dicomMetaData['0009100d'];
  }
  if (dicomMetaData.FrameReferenceTime && dicomMetaData.FrameReferenceTime !== undefined) {
    instanceMetadata.FrameReferenceTime = dicomMetaData.FrameReferenceTime;
  }
  if (dicomMetaData.ActualFrameDuration && dicomMetaData.ActualFrameDuration !== undefined) {
    instanceMetadata.ActualFrameDuration = dicomMetaData.ActualFrameDuration;
  }
  if (dicomMetaData.PatientSex && dicomMetaData.PatientSex !== undefined) {
    instanceMetadata.PatientSex = dicomMetaData.PatientSex;
  }
  if (dicomMetaData.PatientSize && dicomMetaData.PatientSize !== undefined) {
    instanceMetadata.PatientSize = dicomMetaData.PatientSize;
  }
  return instanceMetadata;
}
function convertInterfaceTimeToString(time) {
  const hours = `${time.hours || '00'}`.padStart(2, '0');
  const minutes = `${time.minutes || '00'}`.padStart(2, '0');
  const seconds = `${time.seconds || '00'}`.padStart(2, '0');
  const fractionalSeconds = `${time.fractionalSeconds || '000000'}`.padEnd(6, '0');
  const timeString = `${hours}${minutes}${seconds}.${fractionalSeconds}`;
  return timeString;
}
function convertInterfaceDateToString(date) {
  const month = `${date.month}`.padStart(2, '0');
  const day = `${date.day}`.padStart(2, '0');
  const dateString = `${date.year}${month}${day}`;
  return dateString;
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

/***/ "../../../extensions/default/src/getPanelModule.tsx":
/*!**********************************************************!*\
  !*** ../../../extensions/default/src/getPanelModule.tsx ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels */ "../../../extensions/default/src/Panels/index.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('SidePanel:Studies'),
    component: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.WrappedPanelStudyBrowser, _extends({}, props, {
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

/***/ "../../../extensions/default/src/getSopClassHandlerModule.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/getSopClassHandlerModule.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id */ "../../../extensions/default/src/id.js");
/* harmony import */ var _getDisplaySetMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getDisplaySetMessages */ "../../../extensions/default/src/getDisplaySetMessages.ts");
/* harmony import */ var _getDisplaySetsFromUnsupportedSeries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getDisplaySetsFromUnsupportedSeries */ "../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js");
/* harmony import */ var _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SOPClassHandlers/chartSOPClassHandler */ "../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const {
  isImage,
  sortStudyInstances,
  instancesSortCriteria,
  sopClassDictionary,
  isDisplaySetReconstructable
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
const {
  ImageSet
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes;
const DEFAULT_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
const DYNAMIC_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingDynamicImageVolume';
const sopClassHandlerName = 'stack';
let appContext = {};
const getDynamicVolumeInfo = instances => {
  const {
    extensionManager
  } = appContext;
  if (!extensionManager) {
    throw new Error('extensionManager is not available');
  }
  const imageIds = instances.map(({
    imageId
  }) => imageId);
  const volumeLoaderUtility = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.volumeLoader');
  const {
    getDynamicVolumeInfo: csGetDynamicVolumeInfo
  } = volumeLoaderUtility.exports;
  return csGetDynamicVolumeInfo(imageIds);
};
const isMultiFrame = instance => {
  return instance.NumberOfFrames > 1;
};
function getDisplaySetInfo(instances) {
  const dynamicVolumeInfo = getDynamicVolumeInfo(instances);
  const {
    isDynamicVolume,
    timePoints
  } = dynamicVolumeInfo;
  let displaySetInfo;
  const {
    appConfig
  } = appContext;
  if (isDynamicVolume) {
    const timePoint = timePoints[0];
    const instancesMap = new Map();

    // O(n) to convert it into a map and O(1) to find each instance
    instances.forEach(instance => instancesMap.set(instance.imageId, instance));
    const firstTimePointInstances = timePoint.map(imageId => instancesMap.get(imageId));
    displaySetInfo = isDisplaySetReconstructable(firstTimePointInstances, appConfig);
  } else {
    displaySetInfo = isDisplaySetReconstructable(instances, appConfig);
  }
  return {
    isDynamicVolume,
    ...displaySetInfo,
    dynamicVolumeInfo
  };
}
const makeDisplaySet = instances => {
  // Need to sort the instances in order to get a consistent instance/thumbnail
  sortStudyInstances(instances);
  const instance = instances[0];
  const imageSet = new ImageSet(instances);
  const {
    extensionManager
  } = appContext;
  const dataSource = extensionManager.getActiveDataSource()[0];
  const {
    isDynamicVolume,
    value: isReconstructable,
    averageSpacingBetweenFrames,
    dynamicVolumeInfo
  } = getDisplaySetInfo(instances);
  const volumeLoaderSchema = isDynamicVolume ? DYNAMIC_VOLUME_LOADER_SCHEME : DEFAULT_VOLUME_LOADER_SCHEME;

  // set appropriate attributes to image set...
  const messages = (0,_getDisplaySetMessages__WEBPACK_IMPORTED_MODULE_3__["default"])(instances, isReconstructable, isDynamicVolume);
  const imageIds = dataSource.getImageIdsForDisplaySet(imageSet);
  let imageId = imageIds[Math.floor(imageIds.length / 2)];
  let thumbnailInstance = instances[Math.floor(instances.length / 2)];
  if (isDynamicVolume) {
    const timePoints = dynamicVolumeInfo.timePoints;
    const middleIndex = Math.floor(timePoints.length / 2);
    const middleTimePointImageIds = timePoints[middleIndex];
    imageId = middleTimePointImageIds[Math.floor(middleTimePointImageIds.length / 2)];
  }
  imageSet.setAttributes({
    volumeLoaderSchema,
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    isMultiFrame: isMultiFrame(instance),
    countIcon: isReconstructable ? 'icon-mpr' : undefined,
    numImageFrames: instances.length,
    SOPClassHandlerId: `${_id__WEBPACK_IMPORTED_MODULE_2__.id}.sopClassHandlerModule.${sopClassHandlerName}`,
    isReconstructable,
    messages,
    averageSpacingBetweenFrames: averageSpacingBetweenFrames || null,
    isDynamicVolume,
    dynamicVolumeInfo,
    getThumbnailSrc: dataSource.retrieve.getGetThumbnailSrc?.(thumbnailInstance, imageId),
    supportsWindowLevel: true,
    label: instance.SeriesDescription || `${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('Series')} ${instance.SeriesNumber} - ${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t(instance.Modality)}`,
    FrameOfReferenceUID: instance.FrameOfReferenceUID
  });
  imageSet.sortBy(instancesSortCriteria.default);

  // Include the first image instance number (after sorted)
  /*imageSet.setAttribute(
    'instanceNumber',
    imageSet.getImage(0).InstanceNumber
  );*/

  /*const isReconstructable = isDisplaySetReconstructable(series, instances);
   imageSet.isReconstructable = isReconstructable.value;
   if (isReconstructable.missingFrames) {
    // TODO -> This is currently unused, but may be used for reconstructing
    // Volumes with gaps later on.
    imageSet.missingFrames = isReconstructable.missingFrames;
  }*/

  return imageSet;
};
const isSingleImageModality = modality => {
  return modality === 'CR' || modality === 'MG' || modality === 'DX';
};
function getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}

/**
 * Basic SOPClassHandler:
 * - For all Image types that are stackable, create
 *   a displaySet with a stack of images
 *
 * @param {SeriesMetadata} series The series metadata object from which the display sets will be created
 * @returns {Array} The list of display sets created for the given series object
 */
function getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const displaySets = [];
  const sopClassUids = getSopClassUids(instances);

  // Search through the instances (InstanceMetadata object) of this series
  // Split Multi-frame instances and Single-image modalities
  // into their own specific display sets. Place the rest of each
  // series into another display set.
  const stackableInstances = [];
  instances.forEach(instance => {
    // All imaging modalities must have a valid value for sopClassUid (x00080016) or rows (x00280010)
    if (!isImage(instance.SOPClassUID) && !instance.Rows) {
      return;
    }
    let displaySet;
    if (isMultiFrame(instance)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        numImageFrames: instance.NumberOfFrames,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else if (isSingleImageModality(instance.Modality)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else {
      stackableInstances.push(instance);
    }
  });
  if (stackableInstances.length) {
    const displaySet = makeDisplaySet(stackableInstances);
    displaySet.setAttribute('studyInstanceUid', instances[0].StudyInstanceUID);
    displaySet.setAttributes({
      sopClassUids
    });
    displaySets.push(displaySet);
  }
  return displaySets;
}
const sopClassUids = [sopClassDictionary.ComputedRadiographyImageStorage, sopClassDictionary.DigitalXRayImageStorageForPresentation, sopClassDictionary.DigitalXRayImageStorageForProcessing, sopClassDictionary.DigitalMammographyXRayImageStorageForPresentation, sopClassDictionary.DigitalMammographyXRayImageStorageForProcessing, sopClassDictionary.DigitalIntraOralXRayImageStorageForPresentation, sopClassDictionary.DigitalIntraOralXRayImageStorageForProcessing, sopClassDictionary.CTImageStorage, sopClassDictionary.EnhancedCTImageStorage, sopClassDictionary.LegacyConvertedEnhancedCTImageStorage, sopClassDictionary.UltrasoundMultiframeImageStorage, sopClassDictionary.MRImageStorage, sopClassDictionary.EnhancedMRImageStorage, sopClassDictionary.EnhancedMRColorImageStorage, sopClassDictionary.LegacyConvertedEnhancedMRImageStorage, sopClassDictionary.UltrasoundImageStorage, sopClassDictionary.UltrasoundImageStorageRET, sopClassDictionary.SecondaryCaptureImageStorage, sopClassDictionary.MultiframeSingleBitSecondaryCaptureImageStorage, sopClassDictionary.MultiframeGrayscaleByteSecondaryCaptureImageStorage, sopClassDictionary.MultiframeGrayscaleWordSecondaryCaptureImageStorage, sopClassDictionary.MultiframeTrueColorSecondaryCaptureImageStorage, sopClassDictionary.XRayAngiographicImageStorage, sopClassDictionary.EnhancedXAImageStorage, sopClassDictionary.XRayRadiofluoroscopicImageStorage, sopClassDictionary.EnhancedXRFImageStorage, sopClassDictionary.XRay3DAngiographicImageStorage, sopClassDictionary.XRay3DCraniofacialImageStorage, sopClassDictionary.BreastTomosynthesisImageStorage, sopClassDictionary.BreastProjectionXRayImageStorageForPresentation, sopClassDictionary.BreastProjectionXRayImageStorageForProcessing, sopClassDictionary.IntravascularOpticalCoherenceTomographyImageStorageForPresentation, sopClassDictionary.IntravascularOpticalCoherenceTomographyImageStorageForProcessing, sopClassDictionary.NuclearMedicineImageStorage, sopClassDictionary.VLEndoscopicImageStorage, sopClassDictionary.VideoEndoscopicImageStorage, sopClassDictionary.VLMicroscopicImageStorage, sopClassDictionary.VideoMicroscopicImageStorage, sopClassDictionary.VLSlideCoordinatesMicroscopicImageStorage, sopClassDictionary.VLPhotographicImageStorage, sopClassDictionary.VideoPhotographicImageStorage, sopClassDictionary.OphthalmicPhotography8BitImageStorage, sopClassDictionary.OphthalmicPhotography16BitImageStorage, sopClassDictionary.OphthalmicTomographyImageStorage,
// Handled by another sop class module
// sopClassDictionary.VLWholeSlideMicroscopyImageStorage,
sopClassDictionary.PositronEmissionTomographyImageStorage, sopClassDictionary.EnhancedPETImageStorage, sopClassDictionary.LegacyConvertedEnhancedPETImageStorage, sopClassDictionary.RTImageStorage, sopClassDictionary.EnhancedUSVolumeStorage, sopClassDictionary.RTDoseStorage];
function getSopClassHandlerModule(appContextParam) {
  appContext = appContextParam;
  return [{
    name: sopClassHandlerName,
    sopClassUids,
    getDisplaySetsFromSeries
  }, {
    name: 'not-supported-display-sets-handler',
    sopClassUids: [],
    getDisplaySetsFromSeries: _getDisplaySetsFromUnsupportedSeries__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, {
    name: _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_5__.chartHandler.name,
    sopClassUids: _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_5__.chartHandler.sopClassUids,
    getDisplaySetsFromSeries: _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_5__.chartHandler.getDisplaySetsFromSeries
  }];
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

/***/ "../../../extensions/default/src/getToolbarModule.tsx":
/*!************************************************************!*\
  !*** ../../../extensions/default/src/getToolbarModule.tsx ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getToolbarModule)
/* harmony export */ });
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _Toolbar_ToolbarLayoutSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar/ToolbarLayoutSelector */ "../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx");
/* harmony import */ var _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/ProgressDropdownWithService */ "../../../extensions/default/src/Components/ProgressDropdownWithService.tsx");
/* harmony import */ var _Toolbar_ToolButtonListWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toolbar/ToolButtonListWrapper */ "../../../extensions/default/src/Toolbar/ToolButtonListWrapper.tsx");
/* harmony import */ var _Toolbar_ToolRowWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Toolbar/ToolRowWrapper */ "../../../extensions/default/src/Toolbar/ToolRowWrapper.tsx");
/* harmony import */ var _Toolbar_ToolBoxWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Toolbar/ToolBoxWrapper */ "../../../extensions/default/src/Toolbar/ToolBoxWrapper.tsx");
/* harmony import */ var _Toolbar_ToolButtonWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Toolbar/ToolButtonWrapper */ "../../../extensions/default/src/Toolbar/ToolButtonWrapper.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




// legacy


// new




function getToolbarModule({
  commandsManager,
  servicesManager
}) {
  const {
    cineService
  } = servicesManager.services;
  return [
  // new
  {
    name: 'ohif.toolButton',
    defaultComponent: _Toolbar_ToolButtonWrapper__WEBPACK_IMPORTED_MODULE_6__.ToolButtonWrapper
  }, {
    name: 'ohif.toolButtonList',
    defaultComponent: _Toolbar_ToolButtonListWrapper__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    name: 'ohif.row',
    defaultComponent: _Toolbar_ToolRowWrapper__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, {
    name: 'ohif.toolBoxButtonGroup',
    defaultComponent: _Toolbar_ToolBoxWrapper__WEBPACK_IMPORTED_MODULE_5__.ToolBoxButtonGroupWrapper
  }, {
    name: 'ohif.toolBoxButton',
    defaultComponent: _Toolbar_ToolBoxWrapper__WEBPACK_IMPORTED_MODULE_5__.ToolBoxButtonWrapper
  },
  // others
  {
    name: 'ohif.layoutSelector',
    defaultComponent: props => (0,_Toolbar_ToolbarLayoutSelector__WEBPACK_IMPORTED_MODULE_1__["default"])({
      ...props,
      commandsManager,
      servicesManager
    })
  }, {
    name: 'ohif.progressDropdown',
    defaultComponent: _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_2__.ProgressDropdownWithService
  }, {
    name: 'evaluate.cine',
    evaluate: () => {
      const isToggled = cineService.getState().isCineEnabled;
      return {
        className: _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__.utils.getToggledClassName(isToggled)
      };
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

/***/ "../../../extensions/default/src/getViewportModule.tsx":
/*!*************************************************************!*\
  !*** ../../../extensions/default/src/getViewportModule.tsx ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportModule)
/* harmony export */ });
/* harmony import */ var _Components_LineChartViewport_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/LineChartViewport/index */ "../../../extensions/default/src/Components/LineChartViewport/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const getViewportModule = () => {
  return [{
    name: 'chartViewport',
    component: _Components_LineChartViewport_index__WEBPACK_IMPORTED_MODULE_0__["default"],
    isReferenceViewable: () => false
  }];
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

/***/ "../../../extensions/default/src/hangingprotocols/hpCompare.ts":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpCompare.ts ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultDisplaySetSelector = {
  studyMatchingRules: [{
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: {
        value: 0
      }
    }
  }],
  seriesMatchingRules: [{
    attribute: 'numImageFrames',
    constraint: {
      greaterThan: {
        value: 0
      }
    }
  },
  // This display set will select the specified items by preference
  // It has no affect if nothing is specified in the URL.
  {
    attribute: 'isDisplaySetFromUrl',
    weight: 20,
    constraint: {
      equals: true
    }
  }]
};
const priorDisplaySetSelector = {
  studyMatchingRules: [{
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: {
        value: 1
      }
    }
  }],
  seriesMatchingRules: [{
    attribute: 'numImageFrames',
    constraint: {
      greaterThan: {
        value: 0
      }
    }
  },
  // This display set will select the specified items by preference
  // It has no affect if nothing is specified in the URL.
  {
    attribute: 'isDisplaySetFromUrl',
    weight: 20,
    constraint: {
      equals: true
    }
  }]
};
const currentDisplaySet = {
  id: 'defaultDisplaySetId'
};
const priorDisplaySet = {
  id: 'priorDisplaySetId'
};
const currentViewport0 = {
  viewportOptions: {
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [currentDisplaySet]
};
const currentViewport1 = {
  ...currentViewport0,
  displaySets: [{
    ...currentDisplaySet,
    matchedDisplaySetsIndex: 1
  }]
};
const priorViewport0 = {
  ...currentViewport0,
  displaySets: [priorDisplaySet]
};
const priorViewport1 = {
  ...priorViewport0,
  displaySets: [{
    ...priorDisplaySet,
    matchedDisplaySetsIndex: 1
  }]
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMNCompare = {
  id: '@ohif/hpCompare',
  description: 'Compare two studies in various layouts',
  name: 'Compare Two Studies',
  numberOfPriorsReferenced: 1,
  protocolMatchingRules: [{
    id: 'Two Studies',
    weight: 1000,
    // is there a second study or in another work the attribute
    // studyInstanceUIDsIndex that we get from prior should not be null
    attribute: 'StudyInstanceUID',
    from: 'prior',
    required: true,
    constraint: {
      notNull: true
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: defaultDisplaySetSelector,
    priorDisplaySetId: priorDisplaySetSelector
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    name: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [currentViewport0, priorViewport0, currentViewport1, priorViewport1]
  }, {
    name: '2x1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [currentViewport0, priorViewport0]
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpMNCompare);

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

/***/ "../../../extensions/default/src/hangingprotocols/hpMNGrid.ts":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpMNGrid.ts ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HYDRATE_SEG_SYNC_GROUP: () => (/* binding */ HYDRATE_SEG_SYNC_GROUP),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hpMN: () => (/* binding */ hpMN),
/* harmony export */   hpMN8: () => (/* binding */ hpMN8)
/* harmony export */ });
/* harmony import */ var _utils_studySelectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/studySelectors */ "../../../extensions/default/src/hangingprotocols/utils/studySelectors.ts");
/* harmony import */ var _utils_seriesSelectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/seriesSelectors */ "../../../extensions/default/src/hangingprotocols/utils/seriesSelectors.ts");
/* harmony import */ var _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/viewportOptions */ "../../../extensions/default/src/hangingprotocols/utils/viewportOptions.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





/**
 * Sync group configuration for hydrating segmentations across viewports
 * that share the same frame of reference
 * @type {Types.HangingProtocol.SyncGroup}
 */
const HYDRATE_SEG_SYNC_GROUP = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMN = {
  id: '@ohif/mnGrid',
  description: 'Has various hanging protocol grid layouts',
  name: '2x2',
  protocolMatchingRules: _utils_studySelectors__WEBPACK_IMPORTED_MODULE_0__.studyWithImages,
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      allowUnmatchedView: true,
      seriesMatchingRules: _utils_seriesSelectors__WEBPACK_IMPORTED_MODULE_1__.seriesWithImages
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      syncGroups: [HYDRATE_SEG_SYNC_GROUP]
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    id: '2x2',
    name: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 2,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 3,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // 3x1 stage
  {
    name: '3x1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 3
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 1
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 2
      }]
    }]
  },
  // A 2x1 stage
  {
    name: '2x1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    name: '1x1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid8` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMN8 = {
  ...hpMN,
  id: '@ohif/mnGrid8',
  description: 'Has various hanging protocol grid layouts up to 4x2',
  name: '4x2',
  stages: [{
    id: '4x2',
    name: '4x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 7
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 4
      }
    },
    viewports: [{
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 2,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 3,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 4,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 5,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 6,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 7,
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    id: '3x2',
    name: '3x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 5
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 2,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 3,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 4,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: _utils_viewportOptions__WEBPACK_IMPORTED_MODULE_2__.viewportOptions,
      displaySets: [{
        matchedDisplaySetsIndex: 5,
        id: 'defaultDisplaySetId'
      }]
    }]
  }, ...hpMN.stages]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpMN);

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

/***/ "../../../extensions/default/src/hangingprotocols/hpMammo.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpMammo.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/mammoDisplaySetSelector */ "../../../extensions/default/src/hangingprotocols/utils/mammoDisplaySetSelector.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const rightDisplayArea = {
  storeAsInitialCamera: true,
  imageArea: [0.8, 0.8],
  imageCanvasPoint: {
    imagePoint: [0, 0.5],
    canvasPoint: [0, 0.5]
  }
};
const leftDisplayArea = {
  storeAsInitialCamera: true,
  imageArea: [0.8, 0.8],
  imageCanvasPoint: {
    imagePoint: [1, 0.5],
    canvasPoint: [1, 0.5]
  }
};
const hpMammography = {
  id: '@ohif/hpMammo',
  hasUpdatedPriorsInformation: false,
  name: 'Mammography Breast Screening',
  protocolMatchingRules: [{
    id: 'Mammography',
    weight: 150,
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: 'MG'
    },
    required: true
  }, {
    id: 'numberOfImages',
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 2
    },
    required: true
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    RCC: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RCC,
    LCC: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LCC,
    RMLO: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RMLO,
    LMLO: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LMLO,
    RCCPrior: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RCCPrior,
    LCCPrior: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LCCPrior,
    RMLOPrior: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RMLOPrior,
    LMLOPrior: _utils_mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LMLOPrior
  },
  stages: [{
    name: 'CC/MLO',
    viewportStructure: {
      type: 'grid',
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        // flipHorizontal: true,
        // rotation: 180,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'RCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        // flipHorizontal: true,
        displayArea: rightDisplayArea,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'LCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        // rotation: 180,
        // flipHorizontal: true,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'RMLO'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
        // flipHorizontal: true,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'LMLO'
      }]
    }]
  },
  // Compare CC current/prior top/bottom
  {
    name: 'CC compare',
    viewportStructure: {
      type: 'grid',
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true,
        rotation: 180
      },
      displaySets: [{
        id: 'RCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        flipHorizontal: true,
        displayArea: rightDisplayArea
      },
      displaySets: [{
        id: 'LCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true
      },
      displaySets: [{
        id: 'RCCPrior'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea
      },
      displaySets: [{
        id: 'LCCPrior'
      }]
    }]
  }],
  // Indicates it is prior aware, but will work with no priors
  numberOfPriorsReferenced: 0
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpMammography);

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

/***/ "../../../extensions/default/src/hangingprotocols/hpScale.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpScale.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const displayAreaScale1 = {
  type: 'SCALE',
  scale: 1,
  storeAsInitialCamera: true
};
const displayAreaScale15 = {
  ...displayAreaScale1,
  scale: 15
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpScale = {
  id: '@ohif/hpScale',
  description: 'Has various hanging protocol grid layouts',
  name: 'Scale Images',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        },
        required: true
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 20,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      displayArea: displayAreaScale1,
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    name: 'Scale 1:1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        displayArea: displayAreaScale1
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'Scale 1:15',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        displayArea: displayAreaScale15
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpScale);

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

/***/ "../../../extensions/default/src/hangingprotocols/index.ts":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/index.ts ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HYDRATE_SEG_SYNC_GROUP: () => (/* reexport safe */ _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__.HYDRATE_SEG_SYNC_GROUP),
/* harmony export */   hpCompare: () => (/* reexport safe */ _hpCompare__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   hpMN: () => (/* reexport safe */ _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__.hpMN),
/* harmony export */   hpMN8: () => (/* reexport safe */ _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__.hpMN8),
/* harmony export */   hpMNGrid: () => (/* reexport safe */ _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   hpMammo: () => (/* reexport safe */ _hpMammo__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   lateralityAttribute: () => (/* reexport safe */ _utils_laterality__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   registerHangingProtocolAttributes: () => (/* reexport safe */ _utils_registerHangingProtocolAttributes__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   viewCodeAttribute: () => (/* reexport safe */ _utils_viewCode__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _utils_viewCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/viewCode */ "../../../extensions/default/src/hangingprotocols/utils/viewCode.ts");
/* harmony import */ var _utils_laterality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/laterality */ "../../../extensions/default/src/hangingprotocols/utils/laterality.ts");
/* harmony import */ var _utils_registerHangingProtocolAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/registerHangingProtocolAttributes */ "../../../extensions/default/src/hangingprotocols/utils/registerHangingProtocolAttributes.ts");
/* harmony import */ var _hpMammo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hpMammo */ "../../../extensions/default/src/hangingprotocols/hpMammo.ts");
/* harmony import */ var _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hpMNGrid */ "../../../extensions/default/src/hangingprotocols/hpMNGrid.ts");
/* harmony import */ var _hpCompare__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hpCompare */ "../../../extensions/default/src/hangingprotocols/hpCompare.ts");
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

/***/ "../../../extensions/default/src/hangingprotocols/utils/laterality.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/laterality.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displaySet => {
  const frameAnatomy = displaySet?.images?.[0]?.SharedFunctionalGroupsSequence?.[0]?.FrameAnatomySequence?.[0];
  if (!frameAnatomy) {
    return undefined;
  }
  const laterality = frameAnatomy?.FrameLaterality;
  return laterality;
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

/***/ "../../../extensions/default/src/hangingprotocols/utils/mammoDisplaySetSelector.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/mammoDisplaySetSelector.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LCC: () => (/* binding */ LCC),
/* harmony export */   LCCPrior: () => (/* binding */ LCCPrior),
/* harmony export */   LMLO: () => (/* binding */ LMLO),
/* harmony export */   LMLOPrior: () => (/* binding */ LMLOPrior),
/* harmony export */   RCC: () => (/* binding */ RCC),
/* harmony export */   RCCPrior: () => (/* binding */ RCCPrior),
/* harmony export */   RMLO: () => (/* binding */ RMLO),
/* harmony export */   RMLOPrior: () => (/* binding */ RMLOPrior)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const priorStudyMatchingRules = [{
  // The priorInstance is a study counter that indicates what position this study is in
  // and the value comes from the options parameter.
  attribute: 'studyInstanceUIDsIndex',
  from: 'options',
  required: true,
  constraint: {
    equals: {
      value: 1
    }
  }
}];
const currentStudyMatchingRules = [{
  // The priorInstance is a study counter that indicates what position this study is in
  // and the value comes from the options parameter.
  attribute: 'studyInstanceUIDsIndex',
  from: 'options',
  required: true,
  constraint: {
    equals: {
      value: 0
    }
  }
}];
const LCCSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399162004'
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    contains: 'L'
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'L CC'
  }
}];
const RCCSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399162004'
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['P', 'L']
  }
}, {
  attribute: 'PatientOrientation',
  constraint: {
    doesNotEqual: ['A', 'R']
  },
  required: true
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'CC'
  }
}];
const LMLOSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399368009'
  }
}, {
  weight: 0,
  attribute: 'ViewCode',
  constraint: {
    doesNotEqual: 'SCT:399162004'
  },
  required: true
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['A', 'R']
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'L MLO'
  }
}];
const RMLOSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399368009'
  }
}, {
  attribute: 'ViewCode',
  constraint: {
    doesNotEqual: 'SCT:399162004'
  },
  required: true
}, {
  attribute: 'PatientOrientation',
  constraint: {
    doesNotContain: ['P', 'FL']
  },
  required: true
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['P', 'L']
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['A', 'FR']
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'R MLO'
  }
}, {
  attribute: 'SeriesDescription',
  required: true,
  constraint: {
    doesNotContain: 'CC'
  }
}, {
  attribute: 'SeriesDescription',
  required: true,
  constraint: {
    doesNotEqual: 'L MLO'
  },
  required: true
}];
const RCC = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const RCCPrior = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const LCC = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const LCCPrior = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const RMLO = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const RMLOPrior = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const LMLO = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const LMLOPrior = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
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

/***/ "../../../extensions/default/src/hangingprotocols/utils/registerHangingProtocolAttributes.ts":
/*!***************************************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/registerHangingProtocolAttributes.ts ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ registerHangingProtocolAttributes)
/* harmony export */ });
/* harmony import */ var _viewCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewCode */ "../../../extensions/default/src/hangingprotocols/utils/viewCode.ts");
/* harmony import */ var _laterality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./laterality */ "../../../extensions/default/src/hangingprotocols/utils/laterality.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function registerHangingProtocolAttributes({
  servicesManager
}) {
  const {
    hangingProtocolService
  } = servicesManager.services;
  hangingProtocolService.addCustomAttribute('ViewCode', 'View Code Designator:Value', _viewCode__WEBPACK_IMPORTED_MODULE_0__["default"]);
  hangingProtocolService.addCustomAttribute('Laterality', 'Laterality of object', _laterality__WEBPACK_IMPORTED_MODULE_1__["default"]);
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

/***/ "../../../extensions/default/src/hangingprotocols/utils/seriesSelectors.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/seriesSelectors.ts ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   seriesWithImages: () => (/* binding */ seriesWithImages)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const seriesWithImages = [{
  attribute: 'numImageFrames',
  constraint: {
    greaterThan: {
      value: 0
    }
  },
  weight: 1,
  required: true
},
// This display set will select the specified items by preference
// It has no affect if nothing is specified in the URL.
{
  attribute: 'isDisplaySetFromUrl',
  weight: 20,
  constraint: {
    equals: true
  }
}];

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

/***/ "../../../extensions/default/src/hangingprotocols/utils/studySelectors.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/studySelectors.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   studyWithImages: () => (/* binding */ studyWithImages)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const studyWithImages = [{
  id: 'OneOrMoreSeries',
  weight: 25,
  attribute: 'numberOfDisplaySetsWithImages',
  constraint: {
    greaterThan: 0
  }
}];

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

/***/ "../../../extensions/default/src/hangingprotocols/utils/viewCode.ts":
/*!**************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/viewCode.ts ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displaySet => {
  const ViewCodeSequence = displaySet?.images[0]?.ViewCodeSequence[0];
  if (!ViewCodeSequence) {
    return undefined;
  }
  const {
    CodingSchemeDesignator,
    CodeValue
  } = ViewCodeSequence;
  if (!CodingSchemeDesignator || !CodeValue) {
    return undefined;
  }
  return `${CodingSchemeDesignator}:${CodeValue}`;
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

/***/ "../../../extensions/default/src/hangingprotocols/utils/viewportOptions.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/utils/viewportOptions.ts ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hydrateSegDefault: () => (/* binding */ hydrateSegDefault),
/* harmony export */   viewportOptions: () => (/* binding */ viewportOptions)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/** A default viewport options */
const viewportOptions = {
  toolGroupId: 'default',
  allowUnmatchedView: true,
  syncGroups: [{
    type: 'hydrateseg',
    id: 'sameFORId',
    source: true,
    target: true,
    options: {
      matchingRules: ['sameFOR']
    }
  }]
};
const hydrateSegDefault = viewportOptions;

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

/***/ "../../../extensions/default/src/hooks/usePatientInfo.tsx":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/hooks/usePatientInfo.tsx ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();


const {
  formatPN,
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils;
function usePatientInfo() {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem)();
  const {
    displaySetService
  } = servicesManager.services;
  const [patientInfo, setPatientInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    PatientName: '',
    PatientID: '',
    PatientSex: '',
    PatientDOB: ''
  });
  const [isMixedPatients, setIsMixedPatients] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const checkMixedPatients = PatientID => {
    const displaySets = displaySetService.getActiveDisplaySets();
    let isMixedPatients = false;
    displaySets.forEach(displaySet => {
      const instance = displaySet?.instances?.[0] || displaySet?.instance;
      if (!instance) {
        return;
      }
      if (instance.PatientID !== PatientID) {
        isMixedPatients = true;
      }
    });
    setIsMixedPatients(isMixedPatients);
  };
  const updatePatientInfo = ({
    displaySetsAdded
  }) => {
    if (!displaySetsAdded.length) {
      return;
    }
    const displaySet = displaySetsAdded[0];
    const instance = displaySet?.instances?.[0] || displaySet?.instance;
    if (!instance) {
      return;
    }
    setPatientInfo({
      PatientID: instance.PatientID || null,
      PatientName: instance.PatientName ? formatPN(instance.PatientName) : null,
      PatientSex: instance.PatientSex || null,
      PatientDOB: formatDate(instance.PatientBirthDate) || null
    });
    checkMixedPatients(instance.PatientID || null);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const subscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, props => updatePatientInfo(props));
    return () => subscription.unsubscribe();
  }, []);
  return {
    patientInfo,
    isMixedPatients
  };
}
_s(usePatientInfo, "7hWkw5Vht30Rhc9mE/vhXJqoDjQ=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem];
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePatientInfo);

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

/***/ "../../../extensions/default/src/id.js":
/*!*********************************************!*\
  !*** ../../../extensions/default/src/id.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/default/package.json");
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

/***/ "../../../extensions/default/src/index.ts":
/*!************************************************!*\
  !*** ../../../extensions/default/src/index.ts ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuController: () => (/* reexport safe */ _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_13__.ContextMenuController),
/* harmony export */   CustomizableContextMenuTypes: () => (/* reexport safe */ _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_13__.CustomizableContextMenuTypes),
/* harmony export */   MoreDropdownMenu: () => (/* reexport safe */ _Components_MoreDropdownMenu__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   PanelStudyBrowserHeader: () => (/* reexport safe */ _Panels_StudyBrowser_PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_29__.PanelStudyBrowserHeader),
/* harmony export */   StaticWadoClient: () => (/* reexport safe */ _DicomWebDataSource_utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   Toolbox: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_30__.Toolbox),
/* harmony export */   callInputDialog: () => (/* reexport safe */ _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__.callInputDialog),
/* harmony export */   callInputDialogAutoComplete: () => (/* reexport safe */ _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__.callInputDialogAutoComplete),
/* harmony export */   cleanDenaturalizedDataset: () => (/* reexport safe */ _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_14__.cleanDenaturalizedDataset),
/* harmony export */   colorPickerDialog: () => (/* reexport safe */ _utils_colorPickerDialog__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   createReportAsync: () => (/* reexport safe */ _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   createReportDialogPrompt: () => (/* reexport safe */ _Panels__WEBPACK_IMPORTED_MODULE_12__.createReportDialogPrompt),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dicomWebUtils: () => (/* reexport module object */ _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_14__),
/* harmony export */   getStudiesForPatientByMRN: () => (/* reexport safe */ _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   promptLabelAnnotation: () => (/* reexport safe */ _utils_promptLabelAnnotation__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   promptSaveReport: () => (/* reexport safe */ _utils_promptSaveReport__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   requestDisplaySetCreationForStudy: () => (/* reexport safe */ _Panels_requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   useDisplaySetSelectorStore: () => (/* reexport safe */ _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_20__.useDisplaySetSelectorStore),
/* harmony export */   useHangingProtocolStageIndexStore: () => (/* reexport safe */ _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_21__.useHangingProtocolStageIndexStore),
/* harmony export */   usePatientInfo: () => (/* reexport safe */ _hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   useToggleHangingProtocolStore: () => (/* reexport safe */ _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_22__.useToggleHangingProtocolStore),
/* harmony export */   useToggleOneUpViewportGridStore: () => (/* reexport safe */ _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_23__.useToggleOneUpViewportGridStore),
/* harmony export */   useUIStateStore: () => (/* reexport safe */ _stores_useUIStateStore__WEBPACK_IMPORTED_MODULE_19__.useUIStateStore),
/* harmony export */   useViewportGridStore: () => (/* reexport safe */ _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_18__.useViewportGridStore),
/* harmony export */   useViewportsByPositionStore: () => (/* reexport safe */ _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_17__.useViewportsByPositionStore),
/* harmony export */   utils: () => (/* reexport module object */ _utils__WEBPACK_IMPORTED_MODULE_30__)
/* harmony export */ });
/* harmony import */ var _getDataSourcesModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataSourcesModule */ "../../../extensions/default/src/getDataSourcesModule.js");
/* harmony import */ var _getLayoutTemplateModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getLayoutTemplateModule */ "../../../extensions/default/src/getLayoutTemplateModule.js");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/default/src/getPanelModule.tsx");
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/default/src/getSopClassHandlerModule.js");
/* harmony import */ var _getToolbarModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getToolbarModule */ "../../../extensions/default/src/getToolbarModule.tsx");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/default/src/commandsModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/default/src/getHangingProtocolModule.js");
/* harmony import */ var _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Panels/getStudiesForPatientByMRN */ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/default/src/getCustomizationModule.tsx");
/* harmony import */ var _getViewportModule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getViewportModule */ "../../../extensions/default/src/getViewportModule.tsx");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./id */ "../../../extensions/default/src/id.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./init */ "../../../extensions/default/src/init.ts");
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Panels */ "../../../extensions/default/src/Panels/index.js");
/* harmony import */ var _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CustomizableContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/index.ts");
/* harmony import */ var _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./DicomWebDataSource/utils */ "../../../extensions/default/src/DicomWebDataSource/utils/index.ts");
/* harmony import */ var _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Actions/createReportAsync */ "../../../extensions/default/src/Actions/createReportAsync.tsx");
/* harmony import */ var _DicomWebDataSource_utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./DicomWebDataSource/utils/StaticWadoClient */ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts");
/* harmony import */ var _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./stores/useViewportsByPositionStore */ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts");
/* harmony import */ var _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./stores/useViewportGridStore */ "../../../extensions/default/src/stores/useViewportGridStore.ts");
/* harmony import */ var _stores_useUIStateStore__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./stores/useUIStateStore */ "../../../extensions/default/src/stores/useUIStateStore.ts");
/* harmony import */ var _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./stores/useDisplaySetSelectorStore */ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts");
/* harmony import */ var _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./stores/useHangingProtocolStageIndexStore */ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts");
/* harmony import */ var _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./stores/useToggleHangingProtocolStore */ "../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts");
/* harmony import */ var _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./stores/useToggleOneUpViewportGridStore */ "../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts");
/* harmony import */ var _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./utils/callInputDialog */ "../../../extensions/default/src/utils/callInputDialog.tsx");
/* harmony import */ var _utils_colorPickerDialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./utils/colorPickerDialog */ "../../../extensions/default/src/utils/colorPickerDialog.tsx");
/* harmony import */ var _utils_promptSaveReport__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./utils/promptSaveReport */ "../../../extensions/default/src/utils/promptSaveReport.tsx");
/* harmony import */ var _utils_promptLabelAnnotation__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./utils/promptLabelAnnotation */ "../../../extensions/default/src/utils/promptLabelAnnotation.js");
/* harmony import */ var _hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./hooks/usePatientInfo */ "../../../extensions/default/src/hooks/usePatientInfo.tsx");
/* harmony import */ var _Panels_StudyBrowser_PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Panels/StudyBrowser/PanelStudyBrowserHeader */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./utils */ "../../../extensions/default/src/utils/index.ts");
/* harmony import */ var _Components_MoreDropdownMenu__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Components/MoreDropdownMenu */ "../../../extensions/default/src/Components/MoreDropdownMenu.tsx");
/* harmony import */ var _Panels_requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Panels/requestDisplaySetCreationForStudy */ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




































const defaultExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_10__.id,
  preRegistration: _init__WEBPACK_IMPORTED_MODULE_11__["default"],
  onModeExit() {
    _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_18__.useViewportGridStore.getState().clearViewportGridState();
    _stores_useUIStateStore__WEBPACK_IMPORTED_MODULE_19__.useUIStateStore.getState().clearUIState();
    _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_20__.useDisplaySetSelectorStore.getState().clearDisplaySetSelectorMap();
    _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_21__.useHangingProtocolStageIndexStore.getState().clearHangingProtocolStageIndexMap();
    _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_22__.useToggleHangingProtocolStore.getState().clearToggleHangingProtocol();
    _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_17__.useViewportsByPositionStore.getState().clearViewportsByPosition();
  },
  getDataSourcesModule: _getDataSourcesModule__WEBPACK_IMPORTED_MODULE_0__["default"],
  getViewportModule: _getViewportModule__WEBPACK_IMPORTED_MODULE_9__["default"],
  getLayoutTemplateModule: _getLayoutTemplateModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__["default"],
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_3__["default"],
  getToolbarModule: _getToolbarModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_5__["default"],
  getUtilityModule({
    servicesManager
  }) {
    return [{
      name: 'common',
      exports: {
        getStudiesForPatientByMRN: _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__["default"]
      }
    }];
  },
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_8__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultExtension);


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

/***/ "../../../extensions/default/src/init.ts":
/*!***********************************************!*\
  !*** ../../../extensions/default/src/init.ts ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_calculate_suv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/calculate-suv */ "../../../node_modules/@cornerstonejs/calculate-suv/dist/calculate-suv.esm.js");
/* harmony import */ var _getPTImageIdInstanceMetadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPTImageIdInstanceMetadata */ "../../../extensions/default/src/getPTImageIdInstanceMetadata.ts");
/* harmony import */ var _hangingprotocols__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hangingprotocols */ "../../../extensions/default/src/hangingprotocols/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.MetadataProvider;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 */
function init({
  servicesManager,
  commandsManager
}) {
  const {
    toolbarService,
    cineService,
    viewportGridService
  } = servicesManager.services;
  toolbarService.registerEventForToolbarUpdate(cineService, [cineService.EVENTS.CINE_STATE_CHANGED]);

  // Add
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.EVENTS.INSTANCES_ADDED, handleScalingModules);

  // If the metadata for PET has changed by the user (e.g. manually changing the PatientWeight)
  // we need to recalculate the SUV Scaling Factors
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.EVENTS.SERIES_UPDATED, handleScalingModules);

  // Adds extra custom attributes for use by hanging protocols
  (0,_hangingprotocols__WEBPACK_IMPORTED_MODULE_3__.registerHangingProtocolAttributes)({
    servicesManager
  });

  // Function to process and subscribe to events for a given set of commands and listeners
  const subscribeToEvents = listeners => {
    Object.entries(listeners).forEach(([event, commands]) => {
      const supportedEvents = [viewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED, viewportGridService.EVENTS.VIEWPORTS_READY];
      if (supportedEvents.includes(event)) {
        viewportGridService.subscribe(event, eventData => {
          const viewportId = eventData?.viewportId ?? viewportGridService.getActiveViewportId();
          commandsManager.run(commands, {
            viewportId
          });
        });
      }
    });
  };
  toolbarService.subscribe(toolbarService.EVENTS.TOOL_BAR_MODIFIED, state => {
    const {
      buttons
    } = state;
    for (const [id, button] of Object.entries(buttons)) {
      const {
        buttonSection,
        items,
        listeners
      } = button.props || {};

      // Handle group items' listeners
      if (buttonSection && items) {
        items.forEach(item => {
          if (item.listeners) {
            subscribeToEvents(item.listeners);
          }
        });
      }

      // Handle button listeners
      if (listeners) {
        subscribeToEvents(listeners);
      }
    }
  });
}
const handleScalingModules = ({
  SeriesInstanceUID,
  StudyInstanceUID
}) => {
  const {
    instances
  } = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getSeries(StudyInstanceUID, SeriesInstanceUID);
  if (!instances?.length) {
    return;
  }
  const modality = instances[0].Modality;
  const allowedModality = ['PT', 'RTDOSE'];
  if (!allowedModality.includes(modality)) {
    return;
  }
  const imageIds = instances.map(instance => instance.imageId);
  const instanceMetadataArray = [];
  if (modality === 'RTDOSE') {
    const DoseGridScaling = instances[0].DoseGridScaling;
    const DoseSummation = instances[0].DoseSummation;
    const DoseType = instances[0].DoseType;
    const DoseUnit = instances[0].DoseUnit;
    const NumberOfFrames = instances[0].NumberOfFrames;
    const imageId = imageIds[0];

    // add scaling module to the metadata
    // since RTDOSE is always a multiframe we should add the scaling module to each frame
    for (let i = 0; i < NumberOfFrames; i++) {
      const frameIndex = i + 1;

      // Todo: we should support other things like wadouri, local etc
      const newImageId = `${imageId.replace(/\/frames\/\d+$/, '')}/frames/${frameIndex}`;
      metadataProvider.addCustomMetadata(newImageId, 'scalingModule', {
        DoseGridScaling,
        DoseSummation,
        DoseType,
        DoseUnit
      });
    }
    return;
  }

  // try except block to prevent errors when the metadata is not correct
  try {
    imageIds.forEach(imageId => {
      const instanceMetadata = (0,_getPTImageIdInstanceMetadata__WEBPACK_IMPORTED_MODULE_2__["default"])(imageId);
      if (instanceMetadata) {
        instanceMetadataArray.push(instanceMetadata);
      }
    });
    if (!instanceMetadataArray.length) {
      return;
    }
    const suvScalingFactors = (0,_cornerstonejs_calculate_suv__WEBPACK_IMPORTED_MODULE_1__.calculateSUVScalingFactors)(instanceMetadataArray);
    instanceMetadataArray.forEach((instanceMetadata, index) => {
      metadataProvider.addCustomMetadata(imageIds[index], 'scalingModule', suvScalingFactors[index]);
    });
  } catch (error) {
    console.log(error);
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

/***/ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDisplaySetSelectorStore: () => (/* binding */ useDisplaySetSelectorStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../../../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Identifier for the display set selector store type.
 */
const PRESENTATION_TYPE_ID = 'displaySetSelectorId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * State shape for the Display Set Selector store.
 */

/**
 * Creates the Display Set Selector store.
 *
 * @param set - The zustand set function.
 * @returns The display set selector store state and actions.
 */
const createDisplaySetSelectorStore = set => ({
  type: PRESENTATION_TYPE_ID,
  displaySetSelectorMap: {},
  /**
   * Sets the display set selector for a given key.
   */
  setDisplaySetSelector: (key, value) => set(state => ({
    displaySetSelectorMap: {
      ...state.displaySetSelectorMap,
      [key]: value
    }
  }), false, 'setDisplaySetSelector'),
  /**
   * Clears the entire display set selector map.
   */
  clearDisplaySetSelectorMap: () => set({
    displaySetSelectorMap: {}
  }, false, 'clearDisplaySetSelectorMap')
});

/**
 * Zustand store for managing display set selectors.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useDisplaySetSelectorStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createDisplaySetSelectorStore, {
  name: 'DisplaySetSelectorStore'
}) : createDisplaySetSelectorStore);

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

/***/ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useHangingProtocolStageIndexStore: () => (/* binding */ useHangingProtocolStageIndexStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../../../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const PRESENTATION_TYPE_ID = 'hangingProtocolStageIndexId';
const DEBUG_STORE = false;

/**
 * Represents the state and actions for managing hanging protocol stage indexes.
 */

/**
 * Creates the Hanging Protocol Stage Index store.
 *
 * @param set - The zustand set function.
 * @returns The hanging protocol stage index store state and actions.
 */
const createHangingProtocolStageIndexStore = set => ({
  hangingProtocolStageIndexMap: {},
  type: PRESENTATION_TYPE_ID,
  /**
   * Sets the hanging protocol stage index for a given key.
   */
  setHangingProtocolStageIndex: (key, value) => set(state => ({
    hangingProtocolStageIndexMap: {
      ...state.hangingProtocolStageIndexMap,
      [key]: value
    }
  }), false, 'setHangingProtocolStageIndex'),
  /**
   * Clears all hanging protocol stage indexes.
   */
  clearHangingProtocolStageIndexMap: () => set({
    hangingProtocolStageIndexMap: {}
  }, false, 'clearHangingProtocolStageIndexMap')
});

/**
 * Zustand store for managing hanging protocol stage indexes.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useHangingProtocolStageIndexStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createHangingProtocolStageIndexStore, {
  name: 'HangingProtocolStageIndexStore'
}) : createHangingProtocolStageIndexStore);

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

/***/ "../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useToggleHangingProtocolStore: () => (/* binding */ useToggleHangingProtocolStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../../../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const PRESENTATION_TYPE_ID = 'toggleHangingProtocolId';
const DEBUG_STORE = false;

/**
 * Represents the state and actions for managing toggle hanging protocols.
 */

/**
 * Creates the Toggle Hanging Protocol store.
 *
 * @param set - The zustand set function.
 * @returns The toggle hanging protocol store state and actions.
 */
const createToggleHangingProtocolStore = set => ({
  toggleHangingProtocol: {},
  type: PRESENTATION_TYPE_ID,
  /**
   * Sets the toggle hanging protocol for a given key.
   */
  setToggleHangingProtocol: (key, value) => set(state => ({
    toggleHangingProtocol: {
      ...state.toggleHangingProtocol,
      [key]: value
    }
  }), false, 'setToggleHangingProtocol'),
  /**
   * Clears all toggle hanging protocols.
   */
  clearToggleHangingProtocol: () => set({
    toggleHangingProtocol: {}
  }, false, 'clearToggleHangingProtocol')
});

/**
 * Zustand store for managing toggle hanging protocols.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useToggleHangingProtocolStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createToggleHangingProtocolStore, {
  name: 'ToggleHangingProtocolStore'
}) : createToggleHangingProtocolStore);

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

/***/ "../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useToggleOneUpViewportGridStore: () => (/* binding */ useToggleOneUpViewportGridStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const PRESENTATION_TYPE_ID = 'toggleOneUpViewportGridId';
// Stores the entire ViewportGridService getState when toggling to one up
// (e.g. via a double click) so that it can be restored when toggling back.
const useToggleOneUpViewportGridStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)(set => ({
  toggleOneUpViewportGridStore: null,
  type: PRESENTATION_TYPE_ID,
  setToggleOneUpViewportGridStore: state => set({
    toggleOneUpViewportGridStore: state
  }),
  clearToggleOneUpViewportGridStore: () => set({
    toggleOneUpViewportGridStore: null
  })
}));

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

/***/ "../../../extensions/default/src/stores/useUIStateStore.ts":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/stores/useUIStateStore.ts ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useUIStateStore: () => (/* binding */ useUIStateStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../../../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Identifier for the UI State store type.
 */
const PRESENTATION_TYPE_ID = 'uiStateId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Represents the UI state.
 */

/**
 * State shape for the UI State store.
 */

/**
 * Creates the UI State store.
 *
 * @param set - The zustand set function.
 * @returns The UI State store state and actions.
 */
const createUIStateStore = set => ({
  type: PRESENTATION_TYPE_ID,
  uiState: {},
  /**
   * Sets the UI state for a given key.
   */
  setUIState: (key, value) => set(state => ({
    uiState: {
      ...state.uiState,
      [key]: value
    }
  }), false, 'setUIState'),
  /**
   * Clears all UI state.
   */
  clearUIState: () => set({
    uiState: {}
  }, false, 'clearUIState')
});

/**
 * Zustand store for managing UI state.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useUIStateStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createUIStateStore, {
  name: 'UIStateStore'
}) : createUIStateStore);

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

/***/ "../../../extensions/default/src/stores/useViewportGridStore.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/stores/useViewportGridStore.ts ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useViewportGridStore: () => (/* binding */ useViewportGridStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../../../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Identifier for the viewport grid store type.
 */
const PRESENTATION_TYPE_ID = 'viewportGridId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Represents the state of the viewport grid.
 */

/**
 * State shape for the Viewport Grid store.
 */

/**
 * Creates the Viewport Grid store.
 *
 * @param set - The zustand set function.
 * @returns The Viewport Grid store state and actions.
 */
const createViewportGridStore = set => ({
  type: PRESENTATION_TYPE_ID,
  viewportGridState: {},
  /**
   * Sets the viewport grid state for a given key.
   */
  setViewportGridState: (key, value) => set(state => ({
    viewportGridState: {
      ...state.viewportGridState,
      [key]: value
    }
  }), false, 'setViewportGridState'),
  /**
   * Clears the entire viewport grid state.
   */
  clearViewportGridState: () => set({
    viewportGridState: {}
  }, false, 'clearViewportGridState')
});

/**
 * Zustand store for managing viewport grid state.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useViewportGridStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createViewportGridStore, {
  name: 'ViewportGridStore'
}) : createViewportGridStore);

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

/***/ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useViewportsByPositionStore.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useViewportsByPositionStore: () => (/* binding */ useViewportsByPositionStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../../../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const PRESENTATION_TYPE_ID = 'viewportsByPositionId';
const DEBUG_STORE = false;

/**
 * Represents the state and actions for managing viewports by position.
 */

/**
 * Creates the Viewports By Position store.
 *
 * @param set - The zustand set function.
 * @returns The Viewports By Position store state and actions.
 */
const createViewportsByPositionStore = set => ({
  type: PRESENTATION_TYPE_ID,
  viewportsByPosition: {},
  initialInDisplay: [],
  /**
   * Sets the viewport for a given key.
   */
  setViewportsByPosition: (key, value) => set(state => ({
    viewportsByPosition: {
      ...state.viewportsByPosition,
      [key]: value
    }
  }), false, 'setViewportsByPosition'),
  /**
   * Clears all viewports by position.
   */
  clearViewportsByPosition: () => set({
    viewportsByPosition: {}
  }, false, 'clearViewportsByPosition'),
  /**
   * Adds an initial display viewport.
   */
  addInitialInDisplay: value => set(state => ({
    initialInDisplay: [...state.initialInDisplay, value]
  }), false, 'addInitialInDisplay')
});

/**
 * Zustand store for managing viewports by position.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useViewportsByPositionStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createViewportsByPositionStore, {
  name: 'ViewportsByPositionStore'
}) : createViewportsByPositionStore);

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

/***/ "../../../extensions/default/src/utils/Toolbox.tsx":
/*!*********************************************************!*\
  !*** ../../../extensions/default/src/utils/Toolbox.tsx ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toolbox: () => (/* binding */ Toolbox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
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





/**
 * A toolbox is a collection of buttons and commands that they invoke, used to provide
 * custom control panels to users. This component is a generic UI component that
 * interacts with services and commands in a generic fashion. While it might
 * seem unconventional to import it from the UI and integrate it into the JSX,
 * it belongs in the UI components as there isn't anything in this component that
 * couldn't be used for a completely different type of app. It plays a crucial
 * role in enhancing the app with a toolbox by providing a way to integrate
 * and display various tools and their corresponding options
 */
function Toolbox({
  buttonSectionId,
  title
}) {
  _s();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
  const {
    toolbarService,
    customizationService
  } = servicesManager.services;
  const [showConfig, setShowConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    toolbarButtons: toolboxSections,
    onInteraction
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useToolbar)({
    buttonSection: buttonSectionId
  });
  if (!toolboxSections.length) {
    return null;
  }

  // Ensure we have proper button sections at the top level.
  if (!toolboxSections.every(section => section.componentProps.buttonSection)) {
    throw new Error('Toolbox accepts only button sections at the top level, not buttons. Create at least one button section.');
  }

  // Helper to check a list of buttons for an active tool.
  const findActiveOptions = buttons => {
    for (const tool of buttons) {
      if (tool.componentProps.isActive) {
        return tool.componentProps.options;
      }
      if (tool.componentProps.buttonSection) {
        const nestedButtons = toolbarService.getButtonPropsInButtonSection(tool.componentProps.buttonSection);
        const activeNested = nestedButtons.find(nested => nested.isActive);
        if (activeNested) {
          return activeNested.options;
        }
      }
    }
    return null;
  };

  // Look for active tool options across all sections.
  const activeToolOptions = toolboxSections.reduce((activeOptions, section) => {
    if (activeOptions) {
      return activeOptions;
    }
    const sectionId = section.componentProps.buttonSection;
    const buttons = toolbarService.getButtonSection(sectionId);
    return findActiveOptions(buttons);
  }, null);

  // Define the interaction handler once.
  const handleInteraction = ({
    itemId
  }) => {
    onInteraction?.({
      itemId
    });
  };
  const CustomConfigComponent = customizationService.getCustomization(`${buttonSectionId}.config`);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.PanelSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.PanelSection.Header, {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, t(title)), CustomConfigComponent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ml-auto mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Settings, {
    className: "text-primary h-4 w-4",
    onClick: e => {
      e.stopPropagation();
      setShowConfig(!showConfig);
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.PanelSection.Content, {
    className: "bg-muted flex-shrink-0 border-none"
  }, showConfig && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CustomConfigComponent, null), toolboxSections.map(section => {
    const sectionId = section.componentProps.buttonSection;
    const buttons = toolbarService.getButtonSection(sectionId);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: sectionId,
      className: "bg-muted flex flex-wrap space-x-2 py-2 px-1"
    }, buttons.map(tool => {
      if (!tool) {
        return null;
      }
      const {
        id,
        Component,
        componentProps
      } = tool;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: id,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('ml-1')
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({}, componentProps, {
        id: id,
        onInteraction: handleInteraction,
        size: "toolbox",
        servicesManager: servicesManager
      })));
    }));
  }), activeToolOptions && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-dark mt-1 h-auto px-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToolSettings, {
    options: activeToolOptions
  }))));
}
_s(Toolbox, "woudtJ02c+gBnhNlD/aG2dl19c4=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useSystem, react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation, _ohif_core__WEBPACK_IMPORTED_MODULE_2__.useToolbar];
});
_c = Toolbox;
var _c;
__webpack_require__.$Refresh$.register(_c, "Toolbox");

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

/***/ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RESPONSE);

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

/***/ "../../../extensions/default/src/utils/addIcon.ts":
/*!********************************************************!*\
  !*** ../../../extensions/default/src/utils/addIcon.ts ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addIcon: () => (/* binding */ addIcon)
/* harmony export */ });
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/** Adds the icon to both ui and ui-next */
function addIcon(name, icon) {
  _ohif_ui_next__WEBPACK_IMPORTED_MODULE_0__.Icons.addIcon(name, icon);
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

/***/ "../../../extensions/default/src/utils/calculateScanAxisNormal.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/utils/calculateScanAxisNormal.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculateScanAxisNormal)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Calculates the scanAxisNormal based on a image orientation vector extract from a frame
 * @param {*} imageOrientation
 * @returns
 */
function calculateScanAxisNormal(imageOrientation) {
  const rowCosineVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(imageOrientation[0], imageOrientation[1], imageOrientation[2]);
  const colCosineVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(imageOrientation[3], imageOrientation[4], imageOrientation[5]);
  return gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.cross(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(), rowCosineVec, colCosineVec);
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

/***/ "../../../extensions/default/src/utils/callInputDialog.tsx":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/utils/callInputDialog.tsx ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callInputDialog: () => (/* binding */ callInputDialog),
/* harmony export */   callInputDialogAutoComplete: () => (/* binding */ callInputDialogAutoComplete),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cornerstonejs_tools_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools/utilities */ "../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






function InputDialogDefault({
  hide,
  onSave,
  placeholder = 'Enter value',
  defaultValue = '',
  submitOnEnter
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.InputDialog, {
    submitOnEnter: submitOnEnter,
    defaultValue: defaultValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.InputDialog.Field, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.InputDialog.Input, {
    placeholder: placeholder
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.InputDialog.Actions, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.InputDialog.ActionsSecondary, {
    onClick: hide
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.InputDialog.ActionsPrimary, {
    onClick: value => {
      onSave(value);
      hide();
    }
  }, "Save")));
}

/**
 * Shows an input dialog for entering text with customizable options
 * @param uiDialogService - Service for showing UI dialogs
 * @param onSave - Callback function called when save button is clicked with entered value
 * @param defaultValue - Initial value to show in input field
 * @param title - Title text to show in dialog header
 * @param placeholder - Placeholder text for input field
 * @param submitOnEnter - Whether to submit dialog when Enter key is pressed
 */
_c = InputDialogDefault;
async function callInputDialog({
  uiDialogService,
  defaultValue = '',
  title = 'Annotation',
  placeholder = '',
  submitOnEnter = true
}) {
  const dialogId = 'dialog-enter-annotation';
  const value = await new Promise(resolve => {
    uiDialogService.show({
      id: dialogId,
      content: InputDialogDefault,
      title: title,
      shouldCloseOnEsc: true,
      contentProps: {
        onSave: value => {
          resolve(value);
        },
        placeholder,
        defaultValue,
        submitOnEnter
      }
    });
  });
  return value;
}
async function callInputDialogAutoComplete({
  measurement,
  uiDialogService,
  labelConfig,
  renderContent = _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.LabellingFlow,
  element
}) {
  const exclusive = labelConfig ? labelConfig.exclusive : false;
  const dropDownItems = labelConfig ? labelConfig.items : [];
  const value = await new Promise((resolve, reject) => {
    const labellingDoneCallback = newValue => {
      uiDialogService.hide('select-annotation');
      if (measurement && typeof newValue === 'string') {
        const sourceAnnotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(measurement.uid);
        (0,_cornerstonejs_tools_utilities__WEBPACK_IMPORTED_MODULE_1__.setAnnotationLabel)(sourceAnnotation, element, newValue);
      }
      resolve(newValue);
    };
    uiDialogService.show({
      id: 'select-annotation',
      title: 'Annotation',
      content: renderContent,
      contentProps: {
        labellingDoneCallback: labellingDoneCallback,
        measurementData: measurement,
        componentClassName: {},
        labelData: dropDownItems,
        exclusive: exclusive
      }
    });
  });
  return value;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (callInputDialog);
var _c;
__webpack_require__.$Refresh$.register(_c, "InputDialogDefault");

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

/***/ "../../../extensions/default/src/utils/colorPickerDialog.tsx":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/colorPickerDialog.tsx ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-color */ "../../../node_modules/react-color/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _colorPickerDialog_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colorPickerDialog.css */ "../../../extensions/default/src/utils/colorPickerDialog.css");
/* harmony import */ var _colorPickerDialog_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_colorPickerDialog_css__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




function ColorPickerDialog({
  value,
  hide,
  onSave
}) {
  _s();
  const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  const handleChange = color => {
    setColor(color.rgb);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_color__WEBPACK_IMPORTED_MODULE_1__.ChromePicker, {
    color: color,
    onChange: handleChange,
    presetColors: [],
    width: 300
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Right, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Secondary, {
    onClick: hide
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.FooterAction.Primary, {
    onClick: () => {
      hide();
      onSave(color);
    }
  }, "Save"))));
}
_s(ColorPickerDialog, "5o5wpjcwen+9FLSa/sCn7Y7hMww=");
_c = ColorPickerDialog;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerDialog);
var _c;
__webpack_require__.$Refresh$.register(_c, "ColorPickerDialog");

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

/***/ "../../../extensions/default/src/utils/createRenderedRetrieve.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/default/src/utils/createRenderedRetrieve.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Generates the rendered URL that can be used for direct retrieve of the pixel data binary stream.
 *
 * @param {object} config - The configuration object.
 * @param {string} config.wadoRoot - The root URL for the WADO service.
 * @param {object} params - The parameters object.
 * @param {string} params.tag - The tag name of the URL to retrieve.
 * @param {string} params.defaultPath - The path for the pixel data URL.
 * @param {object} params.instance - The instance object that the tag is in.
 * @param {string} params.defaultType - The mime type of the response.
 * @param {string} params.singlepart - The type of the part to retrieve.
 * @param {string} params.fetchPart - Unknown parameter.
 * @param {string} params.url - Unknown parameter.
 * @returns {string|Promise<string>} - An absolute URL to the binary stream.
 */
const createRenderedRetrieve = (config, params) => {
  const {
    wadoRoot
  } = config;
  const {
    instance,
    tag = 'PixelData'
  } = params;
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const bulkDataURI = instance[tag]?.BulkDataURI ?? '';
  if (bulkDataURI?.indexOf('?') !== -1) {
    // The value instance has parameters, so it should not revert to the rendered
    return;
  }
  if (tag === 'PixelData' || tag === 'EncapsulatedDocument') {
    return `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}/rendered`;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRenderedRetrieve);

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

/***/ "../../../extensions/default/src/utils/getBulkdataValue.js":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/utils/getBulkdataValue.js ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Generates a URL that can be used for direct retrieve of the bulkdata.
 *
 * @param {object} config - The configuration object.
 * @param {object} params - The parameters object.
 * @param {string} params.tag - The tag name of the URL to retrieve.
 * @param {string} params.defaultPath - The path for the pixel data URL.
 * @param {object} params.instance - The instance object that the tag is in.
 * @param {string} params.defaultType - The mime type of the response.
 * @param {string} params.singlepart - The type of the part to retrieve.
 * @param {string} params.fetchPart - Unknown.
 * @returns {string|Promise<string>} - An absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI.
 */
const getBulkdataValue = (config, params) => {
  const {
    instance,
    tag = 'PixelData',
    defaultPath = '/pixeldata',
    defaultType = 'video/mp4'
  } = params;
  const value = instance[tag];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const BulkDataURI = value && value.BulkDataURI || `series/${SeriesInstanceUID}/instances/${SOPInstanceUID}${defaultPath}`;
  const hasQuery = BulkDataURI.indexOf('?') !== -1;
  const hasAccept = BulkDataURI.indexOf('accept=') !== -1;
  const acceptUri = BulkDataURI + (hasAccept ? '' : (hasQuery ? '&' : '?') + `accept=${defaultType}`);
  if (acceptUri.startsWith('series/')) {
    const {
      wadoRoot
    } = config;
    return `${wadoRoot}/studies/${StudyInstanceUID}/${acceptUri}`;
  }

  // The DICOMweb standard states that the default is multipart related, and then
  // separately states that the accept parameter is the URL parameter equivalent of the accept header.
  return acceptUri;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getBulkdataValue);

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

/***/ "../../../extensions/default/src/utils/getCurrentDicomDateTime.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/utils/getCurrentDicomDateTime.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDicomDateTime: () => (/* binding */ getDicomDateTime),
/* harmony export */   getSeriesDateTime: () => (/* binding */ getSeriesDateTime)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const getSeriesDateTime = (jsDate = new Date()) => {
  const dicomDateTime = getDicomDateTime(jsDate);
  return {
    SeriesDate: dicomDateTime.date,
    SeriesTime: dicomDateTime.time
  };
};
const getDicomDateTime = (jsDate = new Date()) => {
  const month = String(jsDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jsDate.getUTCDate()).padStart(2, '0');
  const year = String(jsDate.getUTCFullYear()).padStart(4, '0');
  const date = `${year}${month}${day}`;
  const hours = String(jsDate.getUTCHours()).padStart(2, '0');
  const minutes = String(jsDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(jsDate.getUTCSeconds()).padStart(2, '0');
  const time = `${hours}${minutes}${seconds}`;
  return {
    date,
    time
  };
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

/***/ "../../../extensions/default/src/utils/getDirectURL.ts":
/*!*************************************************************!*\
  !*** ../../../extensions/default/src/utils/getDirectURL.ts ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _getBulkdataValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBulkdataValue */ "../../../extensions/default/src/utils/getBulkdataValue.js");
/* harmony import */ var _createRenderedRetrieve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createRenderedRetrieve */ "../../../extensions/default/src/utils/createRenderedRetrieve.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





/**
 * Generates a URL that can be used for direct retrieve of the bulkdata
 *
 * @param {object} params
 * @param {string} params.tag is the tag name of the URL to retrieve
 * @param {string} params.defaultPath path for the pixel data url
 * @param {object} params.instance is the instance object that the tag is in
 * @param {string} params.defaultType is the mime type of the response
 * @param {string} params.singlepart is the type of the part to retrieve
 * @param {string} params.fetchPart unknown?
 * @param {string} params.url unknown?
 * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
 */
const getDirectURL = (config, params) => {
  const {
    singlepart
  } = config;
  const {
    instance,
    tag = 'PixelData',
    defaultType = 'video/mp4',
    singlepart: fetchPart = 'video',
    url = null
  } = params;
  if (url) {
    return url;
  }
  const value = instance[tag];
  if (value) {
    if (value.DirectRetrieveURL) {
      return value.DirectRetrieveURL;
    }
    if (value.InlineBinary) {
      const blob = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.b64toBlob(value.InlineBinary, defaultType);
      value.DirectRetrieveURL = URL.createObjectURL(blob);
      return value.DirectRetrieveURL;
    }
    if (!singlepart || singlepart !== true && singlepart.indexOf(fetchPart) === -1) {
      if (value.retrieveBulkData) {
        // Try the specified retrieve type.
        const options = {
          mediaType: defaultType
        };
        return value.retrieveBulkData(options).then(arr => {
          value.DirectRetrieveURL = URL.createObjectURL(new Blob([arr], {
            type: defaultType
          }));
          return value.DirectRetrieveURL;
        });
      }
      console.warn('Unable to retrieve', tag, 'from', instance);
      return undefined;
    }
  }
  return (0,_createRenderedRetrieve__WEBPACK_IMPORTED_MODULE_2__["default"])(config, params) || (0,_getBulkdataValue__WEBPACK_IMPORTED_MODULE_1__["default"])(config, params);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDirectURL);

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

/***/ "../../../extensions/default/src/utils/getSRSeriesAndInstanceNumber.js":
/*!*****************************************************************************!*\
  !*** ../../../extensions/default/src/utils/getSRSeriesAndInstanceNumber.js ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNextSeriesNumber: () => (/* binding */ getNextSeriesNumber),
/* harmony export */   getSRSeriesAndInstanceNumber: () => (/* binding */ getSRSeriesAndInstanceNumber)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const MIN_SR_SERIES_NUMBER = 4700;
function getNextSeriesNumber({
  displaySetService,
  modality,
  minSeriesNumber
}) {
  const activeDisplaySets = displaySetService.getActiveDisplaySets();
  const modalityDisplaySets = activeDisplaySets.filter(ds => ds.Modality === modality);
  const modalitySeriesNumbers = modalityDisplaySets.map(ds => ds.SeriesNumber);
  const maxSeriesNumber = Math.max(...modalitySeriesNumbers, minSeriesNumber);
  const allSeriesNumbers = activeDisplaySets.map(ds => ds.SeriesNumber);
  let finalSeriesNumber = maxSeriesNumber + 1;
  while (allSeriesNumbers.includes(finalSeriesNumber)) {
    finalSeriesNumber++;
  }
  return {
    SeriesNumber: finalSeriesNumber,
    InstanceNumber: 1
  };
}
function getSRSeriesAndInstanceNumber({
  displaySetService,
  SeriesInstanceUid
}) {
  if (!SeriesInstanceUid) {
    return getNextSeriesNumber({
      displaySetService,
      modality: 'SR',
      minSeriesNumber: MIN_SR_SERIES_NUMBER
    });
  }
  const displaySetsMap = displaySetService.getDisplaySetCache();
  const displaySets = Array.from(displaySetsMap.values());
  const srDisplaySet = displaySets.find(ds => ds.Modality === 'SR' && ds.SeriesInstanceUID === SeriesInstanceUid);
  const InstanceNumber = srDisplaySet.instances?.length + 1;
  if (!srDisplaySet?.SeriesNumber || !InstanceNumber) {
    return getNextSeriesNumber({
      displaySetService,
      modality: 'SR',
      minSeriesNumber: MIN_SR_SERIES_NUMBER
    });
  }
  return {
    SeriesNumber: srDisplaySet.SeriesNumber,
    InstanceNumber,
    referenceDisplaySet: srDisplaySet
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

/***/ "../../../extensions/default/src/utils/index.ts":
/*!******************************************************!*\
  !*** ../../../extensions/default/src/utils/index.ts ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toolbox: () => (/* reexport safe */ _Toolbox__WEBPACK_IMPORTED_MODULE_1__.Toolbox),
/* harmony export */   addIcon: () => (/* reexport safe */ _addIcon__WEBPACK_IMPORTED_MODULE_0__.addIcon)
/* harmony export */ });
/* harmony import */ var _addIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addIcon */ "../../../extensions/default/src/utils/addIcon.ts");
/* harmony import */ var _Toolbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbox */ "../../../extensions/default/src/utils/Toolbox.tsx");
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

/***/ "../../../extensions/default/src/utils/layerConfigurationUtils.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/utils/layerConfigurationUtils.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_COLORMAP: () => (/* binding */ DEFAULT_COLORMAP),
/* harmony export */   DEFAULT_OPACITY: () => (/* binding */ DEFAULT_OPACITY),
/* harmony export */   DEFAULT_OPACITY_PERCENT: () => (/* binding */ DEFAULT_OPACITY_PERCENT),
/* harmony export */   DERIVED_OVERLAY_MODALITIES: () => (/* binding */ DERIVED_OVERLAY_MODALITIES),
/* harmony export */   canAddDisplaySetToViewport: () => (/* binding */ canAddDisplaySetToViewport),
/* harmony export */   configureViewportForLayerAddition: () => (/* binding */ configureViewportForLayerAddition),
/* harmony export */   configureViewportForLayerRemoval: () => (/* binding */ configureViewportForLayerRemoval),
/* harmony export */   createColormapOverlayDisplaySetOptions: () => (/* binding */ createColormapOverlayDisplaySetOptions),
/* harmony export */   getModalityOverlayColormap: () => (/* binding */ getModalityOverlayColormap)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const DERIVED_OVERLAY_MODALITIES = ['SEG', 'RTSTRUCT'];
const DEFAULT_COLORMAP = 'hsv';
const DEFAULT_OPACITY = 0.9;
const DEFAULT_OPACITY_PERCENT = DEFAULT_OPACITY * 100;

/**
 * Get modality-specific color and opacity settings from the customization service
 */
function getModalityOverlayColormap(customizationService, modality) {
  const modalityOverlayDefaultColorMaps = customizationService?.getCustomization('cornerstone.modalityOverlayDefaultColorMaps') || {
    defaultSettings: {}
  };
  return modalityOverlayDefaultColorMaps.defaultSettings[modality] || {
    colormap: DEFAULT_COLORMAP,
    opacity: DEFAULT_OPACITY
  };
}

/**
 * Create display set options based on modality and opacity settings
 */
function createColormapOverlayDisplaySetOptions(displaySet, opacity, customizationService) {
  if (displaySet.Modality === 'SEG') {
    return {};
  }
  const modalitySettings = getModalityOverlayColormap(customizationService, displaySet.Modality);
  return {
    colormap: {
      name: modalitySettings.colormap || DEFAULT_COLORMAP,
      opacity: opacity / 100 // Convert from percentage to 0-1 range
    }
  };
}

/**
 * Configure viewport for adding a display set layer
 */
function configureViewportForLayerAddition(params) {
  const {
    viewport,
    displaySetInstanceUID,
    currentDisplaySetUIDs,
    servicesManager
  } = params;
  const {
    cornerstoneViewportService,
    displaySetService,
    customizationService
  } = servicesManager.services;
  const {
    viewportId
  } = viewport;

  // Set the display set UIDs for the viewport
  const allDisplaySetInstanceUIDs = [...currentDisplaySetUIDs, displaySetInstanceUID];
  viewport.displaySetInstanceUIDs = allDisplaySetInstanceUIDs;
  if (!viewport.viewportOptions) {
    viewport.viewportOptions = {};
  }
  const requestedLayerDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  if (!viewport.viewportOptions.orientation) {
    viewport.viewportOptions.orientation = cornerstoneViewportService.getOrientation(viewportId);
  }

  // Do not force volume for SEG and RTSTRUCT if there is only one display set
  if (requestedLayerDisplaySet.isOverlayDisplaySet && currentDisplaySetUIDs.length === 1) {
    viewport.viewportOptions.viewportType = 'stack';
  } else {
    viewport.viewportOptions.viewportType = 'volume';
  }

  // create same amount of display set options as the number of display set UIDs
  const displaySetOptions = allDisplaySetInstanceUIDs.map((uid, index) => {
    if (index === 0) {
      // no colormap for background
      return {};
    }
    const displaySet = displaySetService.getDisplaySetByUID(uid);
    return createColormapOverlayDisplaySetOptions(displaySet, 90, customizationService);
  });
  viewport.displaySetOptions = displaySetOptions;
  return viewport;
}

/**
 * Configure viewport for removing a display set layer
 */
function configureViewportForLayerRemoval(params) {
  const {
    viewport,
    displaySetInstanceUID,
    currentDisplaySetUIDs,
    servicesManager
  } = params;
  const {
    cornerstoneViewportService,
    displaySetService
  } = servicesManager.services;
  const {
    viewportId
  } = viewport;

  // Filter out the display set to remove
  viewport.displaySetInstanceUIDs = currentDisplaySetUIDs.filter(uid => uid !== displaySetInstanceUID);
  if (!viewport.viewportOptions) {
    viewport.viewportOptions = {};
  }
  viewport.viewportOptions.viewportType = 'volume';

  // orientation
  if (!viewport.viewportOptions.orientation) {
    viewport.viewportOptions.orientation = cornerstoneViewportService.getOrientation(viewportId);
  }

  // Recreate the display set options
  viewport.displaySetOptions = viewport.displaySetInstanceUIDs.map(() => {
    // For simplicity, we're returning empty options for now
    // In a more complete implementation, we would need to preserve existing display set options
    return {};
  });
  return viewport;
}

/**
 * Check if a display set can be added as a layer to the specified viewport
 */
function canAddDisplaySetToViewport(params) {
  const {
    viewportId,
    displaySetInstanceUID,
    servicesManager
  } = params;
  const {
    displaySetService,
    viewportGridService
  } = servicesManager.services;

  // Check if the display set exists
  const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  if (!displaySet) {
    return false;
  }

  // Get current display sets in the viewport
  const currentDisplaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);

  // Check if the display set is already in the viewport
  if (currentDisplaySetUIDs.includes(displaySetInstanceUID)) {
    return false;
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/promptLabelAnnotation.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/utils/promptLabelAnnotation.js ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _callInputDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./callInputDialog */ "../../../extensions/default/src/utils/callInputDialog.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function promptLabelAnnotation({
  servicesManager
}, ctx, evt) {
  const {
    measurementService,
    customizationService,
    toolGroupService,
    uiDialogService
  } = servicesManager.services;
  const {
    viewportId,
    StudyInstanceUID,
    SeriesInstanceUID,
    measurementId,
    toolName
  } = evt;
  return new Promise(resolve => {
    (async () => {
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      const activeToolOptions = toolGroup.getToolConfiguration(toolName);
      if (activeToolOptions.getTextCallback) {
        resolve({
          StudyInstanceUID,
          SeriesInstanceUID,
          viewportId
        });
      } else {
        const labelConfig = customizationService.getCustomization('measurementLabels');
        const measurement = measurementService.getMeasurement(measurementId);
        const renderContent = customizationService.getCustomization('ui.labellingComponent');
        const value = await (0,_callInputDialog__WEBPACK_IMPORTED_MODULE_0__.callInputDialogAutoComplete)({
          measurement,
          uiDialogService,
          labelConfig,
          renderContent
        });
        measurementService.update(measurementId, {
          ...value
        }, true);
        resolve({
          StudyInstanceUID,
          SeriesInstanceUID,
          viewportId
        });
      }
    })();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptLabelAnnotation);

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

/***/ "../../../extensions/default/src/utils/promptSaveReport.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/utils/promptSaveReport.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Actions/createReportAsync */ "../../../extensions/default/src/Actions/createReportAsync.tsx");
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Panels */ "../../../extensions/default/src/Panels/index.js");
/* harmony import */ var _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_shared/PROMPT_RESPONSES */ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts");
/* harmony import */ var _getSRSeriesAndInstanceNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getSRSeriesAndInstanceNumber */ "../../../extensions/default/src/utils/getSRSeriesAndInstanceNumber.js");
/* harmony import */ var _getCurrentDicomDateTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getCurrentDicomDateTime */ "../../../extensions/default/src/utils/getCurrentDicomDateTime.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const {
  filterAnd,
  filterMeasurementsByStudyUID,
  filterMeasurementsBySeriesUID,
  filterPlanarMeasurement
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.MeasurementFilters;
async function promptSaveReport({
  servicesManager,
  commandsManager,
  extensionManager
}, ctx, evt) {
  const {
    measurementService,
    displaySetService
  } = servicesManager.services;
  const viewportId = evt.viewportId === undefined ? evt.data.viewportId : evt.viewportId;
  const isBackupSave = evt.isBackupSave === undefined ? evt.data.isBackupSave : evt.isBackupSave;
  const StudyInstanceUID = evt?.data?.StudyInstanceUID || ctx.trackedStudy;
  const SeriesInstanceUID = evt?.data?.SeriesInstanceUID;
  const {
    displaySetInstanceUID
  } = evt.data ?? evt;
  const {
    trackedSeries,
    measurementFilter = filterAnd(filterMeasurementsByStudyUID(StudyInstanceUID), filterMeasurementsBySeriesUID(trackedSeries), filterPlanarMeasurement),
    defaultSaveTitle = 'Create Report'
  } = ctx;
  let displaySetInstanceUIDs;
  try {
    const promptResult = await (0,_Panels__WEBPACK_IMPORTED_MODULE_2__.createReportDialogPrompt)({
      title: defaultSaveTitle,
      extensionManager,
      servicesManager
    });
    if (promptResult.action === _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__["default"].CREATE_REPORT) {
      const dataSources = extensionManager.getDataSources(promptResult.dataSourceName);
      const dataSource = dataSources[0];
      const measurementData = measurementService.getMeasurements(measurementFilter);
      const SeriesDescription = promptResult.value || defaultSaveTitle;
      const {
        SeriesNumber,
        InstanceNumber,
        referenceDisplaySet
      } = (0,_getSRSeriesAndInstanceNumber__WEBPACK_IMPORTED_MODULE_4__.getSRSeriesAndInstanceNumber)({
        displaySetService,
        SeriesInstanceUid: promptResult.series
      });
      const {
        SeriesDate,
        SeriesTime
      } = referenceDisplaySet ?? (0,_getCurrentDicomDateTime__WEBPACK_IMPORTED_MODULE_5__.getSeriesDateTime)();
      const getReport = async () => {
        return commandsManager.runCommand('storeMeasurements', {
          measurementData,
          dataSource,
          additionalFindingTypes: ['ArrowAnnotate'],
          options: {
            SeriesDescription,
            SeriesNumber,
            InstanceNumber,
            SeriesInstanceUID: promptResult.series,
            SeriesDate,
            SeriesTime
          }
        }, 'CORNERSTONE_STRUCTURED_REPORT');
      };
      displaySetInstanceUIDs = await (0,_Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_1__["default"])({
        servicesManager,
        getReport
      });
    } else if (promptResult.action === RESPONSE.CANCEL) {
      // Do nothing
    }
    return {
      userResponse: promptResult.action,
      createdDisplaySetInstanceUIDs: displaySetInstanceUIDs,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId,
      isBackupSave,
      displaySetInstanceUID
    };
  } catch (error) {
    console.warn('Unable to save report', error);
    return null;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptSaveReport);

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

/***/ "../../../extensions/default/src/utils/reuseCachedLayouts.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/reuseCachedLayouts.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stores/useViewportGridStore */ "../../../extensions/default/src/stores/useViewportGridStore.ts");
/* harmony import */ var _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stores/useDisplaySetSelectorStore */ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts");
/* harmony import */ var _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/useHangingProtocolStageIndexStore */ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Calculates a set of state information for hanging protocols and viewport grid
 * which defines the currently applied hanging protocol state.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const reuseCachedLayout = (state, hangingProtocolService) => {
  const {
    activeViewportId
  } = state;
  const {
    protocol
  } = hangingProtocolService.getActiveProtocol();
  if (!protocol) {
    return;
  }
  const hpInfo = hangingProtocolService.getState();
  const {
    protocolId,
    stageIndex,
    activeStudyUID
  } = hpInfo;
  const {
    viewportGridState,
    setViewportGridState
  } = _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_0__.useViewportGridStore.getState();
  const {
    displaySetSelectorMap,
    setDisplaySetSelector
  } = _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_1__.useDisplaySetSelectorStore.getState();
  const {
    hangingProtocolStageIndexMap,
    setHangingProtocolStageIndex
  } = _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_2__.useHangingProtocolStageIndexStore.getState();
  const stage = protocol.stages[stageIndex];
  const storeId = `${activeStudyUID}:${protocolId}:${stageIndex}`;
  const cacheId = `${activeStudyUID}:${protocolId}`;
  const {
    rows,
    columns
  } = stage.viewportStructure.properties;
  const custom = stage.viewports.length !== state.viewports.size || state.layout.numRows !== rows || state.layout.numCols !== columns;
  hangingProtocolStageIndexMap[cacheId] = hpInfo;
  if (storeId && custom) {
    setViewportGridState(storeId, {
      ...state
    });
  }
  state.viewports.forEach((viewport, viewportId) => {
    const {
      displaySetOptions,
      displaySetInstanceUIDs
    } = viewport;
    if (!displaySetOptions) {
      return;
    }
    for (let i = 0; i < displaySetOptions.length; i++) {
      const displaySetUID = displaySetInstanceUIDs[i];
      if (!displaySetUID) {
        continue;
      }
      if (viewportId === activeViewportId && i === 0) {
        setDisplaySetSelector(`${activeStudyUID}:activeDisplaySet:0`, displaySetUID);
      }
      // The activeDisplaySet selector should only be set once (i.e. for the actual active display set)
      if (displaySetOptions[i]?.id && displaySetOptions[i].id !== 'activeDisplaySet') {
        setDisplaySetSelector(`${activeStudyUID}:${displaySetOptions[i].id}:${displaySetOptions[i].matchedDisplaySetsIndex || 0}`, displaySetUID);
      }
    }
  });
  setHangingProtocolStageIndex(cacheId, hpInfo);
  return {
    hangingProtocolStageIndexMap,
    viewportGridStore: viewportGridState,
    displaySetSelectorMap
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reuseCachedLayout);

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

/***/ "../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageComponentsEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Check if all voxels in series images has same number of components (samplesPerPixel)
 * @param {*} instances
 * @returns
 */
function areAllImageComponentsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageSamplesPerPixel = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.SamplesPerPixel);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const {
      SamplesPerPixel
    } = instance;
    if (SamplesPerPixel !== firstImageSamplesPerPixel) {
      return false;
    }
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageDimensionsEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Check if the frames in a series has different dimensions
 * @param {*} instances
 * @returns
 */
function areAllImageDimensionsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageRows = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.Rows);
  const firstImageColumns = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.Columns);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const {
      Rows,
      Columns
    } = instance;
    if ((0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(Rows) !== firstImageRows || (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(Columns) !== firstImageColumns) {
      return false;
    }
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageOrientationsEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Check is the series has frames with different orientations
 * @param {*} instances
 * @returns
 */
function areAllImageOrientationsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageOrientationPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.ImageOrientationPatient);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imageOrientationPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(instance.ImageOrientationPatient);
    if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__._isSameOrientation)(imageOrientationPatient, firstImageOrientationPatient)) {
      return false;
    }
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts":
/*!**************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImagePositionsEqual)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _calculateScanAxisNormal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../calculateScanAxisNormal */ "../../../extensions/default/src/utils/calculateScanAxisNormal.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






/**
 * Checks if there is a position shift between consecutive frames
 * @param {*} previousPosition
 * @param {*} actualPosition
 * @param {*} scanAxisNormal
 * @param {*} averageSpacingBetweenFrames
 * @returns
 */
function _checkSeriesPositionShift(previousPosition, actualPosition, scanAxisNormal, averageSpacingBetweenFrames) {
  // predicted position should be the previous position added by the multiplication
  // of the scanAxisNormal and the average spacing between frames
  const predictedPosition = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(), previousPosition, scanAxisNormal, averageSpacingBetweenFrames);
  return gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.distance(actualPosition, predictedPosition) > averageSpacingBetweenFrames;
}

/**
 * Checks if a series has position shifts between consecutive frames
 * @param {*} instances
 * @returns
 */
function areAllImagePositionsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImageOrientationPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instances[0].ImageOrientationPatient);
  if (!firstImageOrientationPatient) {
    return false;
  }
  const scanAxisNormal = (0,_calculateScanAxisNormal__WEBPACK_IMPORTED_MODULE_3__["default"])(firstImageOrientationPatient);
  const firstImagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instances[0].ImagePositionPatient);
  const lastIpp = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instances[instances.length - 1].ImagePositionPatient);
  if (!firstImagePositionPatient || !lastIpp) {
    return false;
  }
  const averageSpacingBetweenFrames = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_2__._getPerpendicularDistance)(firstImagePositionPatient, lastIpp) / (instances.length - 1);
  let previousImagePositionPatient = firstImagePositionPatient;
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instance.ImagePositionPatient);
    if (_checkSeriesPositionShift(previousImagePositionPatient, imagePositionPatient, scanAxisNormal, averageSpacingBetweenFrames)) {
      return false;
    }
    previousImagePositionPatient = imagePositionPatient;
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageSpacingEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Checks if series has spacing issues
 * @param {*} instances
 * @param {*} warnings
 */
function areAllImageSpacingEqual(instances, messages) {
  if (!instances?.length) {
    return;
  }
  const firstImagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(instances[0].ImagePositionPatient);
  if (!firstImagePositionPatient) {
    return;
  }
  const lastIpp = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(instances[instances.length - 1].ImagePositionPatient);
  const averageSpacingBetweenFrames = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__._getPerpendicularDistance)(firstImagePositionPatient, lastIpp) / (instances.length - 1);
  let previousImagePositionPatient = firstImagePositionPatient;
  const issuesFound = [];
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.ImagePositionPatient);
    const spacingBetweenFrames = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__._getPerpendicularDistance)(imagePositionPatient, previousImagePositionPatient);
    const spacingIssue = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__._getSpacingIssue)(spacingBetweenFrames, averageSpacingBetweenFrames);
    if (spacingIssue) {
      const issue = spacingIssue.issue;

      // avoid multiple warning of the same thing
      if (!issuesFound.includes(issue)) {
        issuesFound.push(issue);
        if (issue === _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.reconstructionIssues.MISSING_FRAMES) {
          messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MISSING_FRAMES);
        } else if (issue === _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.reconstructionIssues.IRREGULAR_SPACING) {
          messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.IRREGULAR_SPACING);
        }
      }
      // we just want to find issues not how many
      if (issuesFound.length > 1) {
        break;
      }
    }
    previousImagePositionPatient = imagePositionPatient;
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

/***/ "../../../extensions/default/src/utils/validations/checkMultiframe.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/checkMultiframe.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkMultiFrame)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Check various multi frame issues. It calls OHIF core functions
 * @param {*} multiFrameInstance
 * @param {*} warnings
 */
function checkMultiFrame(multiFrameInstance, messages) {
  if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.hasPixelMeasurements)(multiFrameInstance)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MULTIFRAME_NO_PIXEL_MEASUREMENTS);
  }
  if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.hasOrientation)(multiFrameInstance)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MULTIFRAME_NO_ORIENTATION);
  }
  if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.hasPosition)(multiFrameInstance)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MULTIFRAME_NO_POSITION_INFORMATION);
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

/***/ "../../../extensions/default/src/utils/validations/checkSingleFrames.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/checkSingleFrames.ts ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkSingleFrames)
/* harmony export */ });
/* harmony import */ var _areAllImageDimensionsEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./areAllImageDimensionsEqual */ "../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts");
/* harmony import */ var _areAllImageComponentsEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./areAllImageComponentsEqual */ "../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts");
/* harmony import */ var _areAllImageOrientationsEqual__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./areAllImageOrientationsEqual */ "../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts");
/* harmony import */ var _areAllImagePositionsEqual__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./areAllImagePositionsEqual */ "../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts");
/* harmony import */ var _areAllImageSpacingEqual__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./areAllImageSpacingEqual */ "../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








/**
 * Runs various checks in a single frame series
 * @param {*} instances
 * @param {*} warnings
 */
function checkSingleFrames(instances, messages) {
  if (instances.length > 2) {
    if (!(0,_areAllImageDimensionsEqual__WEBPACK_IMPORTED_MODULE_0__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_DIMENSIONS);
    }
    if (!(0,_areAllImageComponentsEqual__WEBPACK_IMPORTED_MODULE_1__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_COMPONENTS);
    }
    if (!(0,_areAllImageOrientationsEqual__WEBPACK_IMPORTED_MODULE_2__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_ORIENTATIONS);
    }
    if (!(0,_areAllImagePositionsEqual__WEBPACK_IMPORTED_MODULE_3__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_POSITION_INFORMATION);
    }
    (0,_areAllImageSpacingEqual__WEBPACK_IMPORTED_MODULE_4__["default"])(instances, messages);
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

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.dicom-tag-browser-table {
  margin-right: auto;
  margin-left: auto;
}

.dicom-tag-browser-table-wrapper {
  /*  height: 500px;*/
  /*overflow-y: scroll;*/
  overflow-x: scroll;
}

.dicom-tag-browser-table tr {
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;
  border-top: 1px solid #ddd;
  white-space: nowrap;
}

.stick {
  position: sticky;
  overflow: clip;
}

.dicom-tag-browser-content {
  overflow: hidden;
  /*height: 500px;*/
}

.dicom-tag-browser-instance-range .range {
  height: 20px;
}

.dicom-tag-browser-instance-range {
  padding: 20px 0 20px 0;
}

.dicom-tag-browser-table td.dicom-tag-browser-table-center {
  text-align: center;
}

.dicom-tag-browser-table th {
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  color: '#20A5D6';
}

.dicom-tag-browser-table th.dicom-tag-browser-table-left {
  text-align: left;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":[".dicom-tag-browser-table {\n  margin-right: auto;\n  margin-left: auto;\n}\n\n.dicom-tag-browser-table-wrapper {\n  /*  height: 500px;*/\n  /*overflow-y: scroll;*/\n  overflow-x: scroll;\n}\n\n.dicom-tag-browser-table tr {\n  padding-left: 10px;\n  padding-right: 10px;\n  color: #ffffff;\n  border-top: 1px solid #ddd;\n  white-space: nowrap;\n}\n\n.stick {\n  position: sticky;\n  overflow: clip;\n}\n\n.dicom-tag-browser-content {\n  overflow: hidden;\n  /*height: 500px;*/\n}\n\n.dicom-tag-browser-instance-range .range {\n  height: 20px;\n}\n\n.dicom-tag-browser-instance-range {\n  padding: 20px 0 20px 0;\n}\n\n.dicom-tag-browser-table td.dicom-tag-browser-table-center {\n  text-align: center;\n}\n\n.dicom-tag-browser-table th {\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: center;\n  color: '#20A5D6';\n}\n\n.dicom-tag-browser-table th.dicom-tag-browser-table-left {\n  text-align: left;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.chrome-picker {
  background: #090c29 !important;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/default/src/utils/colorPickerDialog.css"],"names":[],"mappings":"AAAA;EACE,8BAA8B;AAChC","sourcesContent":[".chrome-picker {\n  background: #090c29 !important;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css",
      function () {
        content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "../../../extensions/default/src/utils/colorPickerDialog.css":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/colorPickerDialog.css ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./colorPickerDialog.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./colorPickerDialog.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css",
      function () {
        content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./colorPickerDialog.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "../../../extensions/default/package.json":
/*!************************************************!*\
  !*** ../../../extensions/default/package.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-default","version":"3.11.0-beta.56","description":"Common/default features and functionality for basic image viewing","author":"OHIF Core Team","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-default.umd.js","module":"src/index.ts","publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"files":["dist","README.md"],"keywords":["ohif-extension"],"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.11.0-beta.56","@ohif/i18n":"3.11.0-beta.56","dcmjs":"*","dicomweb-client":"^0.10.4","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","react-i18next":"^12.2.2","react-window":"^1.8.9","webpack":"5.89.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/calculate-suv":"^1.1.0","lodash.get":"^4.4.2","lodash.uniqby":"^4.7.0"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_default_src_index_ts.js.map