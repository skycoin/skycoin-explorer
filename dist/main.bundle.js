webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<div class=\"container\">\n  <div class=\"row center\">\n    <app-search-bar></app-search-bar>\n    <router-outlet></router-outlet>\n  </div>\n</div>\n<app-loading [loading]=\"loading\"></app-loading>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    // Shows and hides the loading spinner during RouterEvent changes
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationStart */]) {
            this.loading = true;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* NavigationEnd */]) {
            this.loading = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* NavigationCancel */]) {
            this.loading = false;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* NavigationError */]) {
            this.loading = false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layout_footer_footer_component__ = __webpack_require__("../../../../../src/app/components/layout/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_layout_header_header_component__ = __webpack_require__("../../../../../src/app/components/layout/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_layout_search_bar_search_bar_component__ = __webpack_require__("../../../../../src/app/components/layout/search-bar/search-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_layout_loading_loading_component__ = __webpack_require__("../../../../../src/app/components/layout/loading/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_pages_block_chain_table_block_chain_table_component__ = __webpack_require__("../../../../../src/app/components/pages/block-chain-table/block-chain-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_pages_block_chain_table_pagination_pagination_component__ = __webpack_require__("../../../../../src/app/components/pages/block-chain-table/pagination/pagination.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_pages_block_chain_table_coin_supply_coin_supply_component__ = __webpack_require__("../../../../../src/app/components/pages/block-chain-table/coin-supply/coin-supply.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_pages_block_details_block_details_component__ = __webpack_require__("../../../../../src/app/components/pages/block-details/block-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_pages_transaction_detail_transaction_detail_component__ = __webpack_require__("../../../../../src/app/components/pages/transaction-detail/transaction-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_pages_address_detail_address_detail_component__ = __webpack_require__("../../../../../src/app/components/pages/address-detail/address-detail.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var ROUTES = [
    {
        path: '',
        redirectTo: 'blocks',
        pathMatch: 'full'
    },
    {
        path: 'blocks',
        component: __WEBPACK_IMPORTED_MODULE_8__components_pages_block_chain_table_block_chain_table_component__["a" /* BlockChainTableComponent */]
    },
    {
        path: 'block/:id',
        component: __WEBPACK_IMPORTED_MODULE_13__components_pages_block_details_block_details_component__["a" /* BlockDetailsComponent */]
    },
    {
        path: 'address/:address',
        component: __WEBPACK_IMPORTED_MODULE_15__components_pages_address_detail_address_detail_component__["a" /* AddressDetailComponent */]
    },
    {
        path: 'transaction/:txid',
        component: __WEBPACK_IMPORTED_MODULE_14__components_pages_transaction_detail_transaction_detail_component__["a" /* TransactionDetailComponent */]
    },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_layout_footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_layout_header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_pages_block_chain_table_block_chain_table_component__["a" /* BlockChainTableComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_layout_search_bar_search_bar_component__["a" /* SearchBarComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_layout_loading_loading_component__["a" /* LoadingComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_pages_block_chain_table_pagination_pagination_component__["a" /* PaginationComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_pages_block_chain_table_coin_supply_coin_supply_component__["a" /* CoinSupplyComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_pages_block_details_block_details_component__["a" /* BlockDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_pages_transaction_detail_transaction_detail_component__["a" /* TransactionDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_pages_address_detail_address_detail_component__["a" /* AddressDetailComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forRoot(ROUTES),
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__services_api_api_service__["a" /* ApiService */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/layout/footer/footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "footer{\r\n  background-color: #29b6f6;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/layout/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"page-footer\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col l6 s12\">\n        <p class=\"grey-text text-lighten-4\">Next generation of digital money.</p>\n      </div>\n      <div class=\"col l4 offset-l2 s12\">\n        <h5 class=\"white-text\">Links</h5>\n        <ul>\n          <li><a class=\"grey-text text-lighten-3\" href=\"http://skycoin.net/infographics.html\">How it works?</a></li>\n          <li><a class=\"grey-text text-lighten-3\" href=\"http://skycoin.net/downloads.html\">Download wallet</a></li>\n          <li><a class=\"grey-text text-lighten-3\" href=\"http://skycoin.net/whitepapers.html\">White papers</a></li>\n          <li><a class=\"grey-text text-lighten-3\" href=\"http://skycoin.net/faq.html\">FAQs</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer-copyright\">\n    <div class=\"container\">\n      © 2017 Skycoin\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "../../../../../src/app/components/layout/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-footer',
        template: __webpack_require__("../../../../../src/app/components/layout/footer/footer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/layout/footer/footer.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/layout/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/layout/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"light-blue lighten-1\" role=\"navigation\">\n  <div class=\"nav-wrapper container\"><a id=\"logo-container\" href=\"#\" class=\"brand-logo\">Skycoin</a>\n    <ul class=\"right hide-on-med-and-down\">\n      <li><a href=\"http://skycoin.net/infographics.html\">How it works</a></li>\n      <li><a href=\"http://skycoin.net/downloads.html\">Download wallet</a></li>\n      <li><a href=\"http://skycoin.net/faq.html\">FAQs</a></li>\n      <li><a href=\"http://skycoin.net/whitepapers.html\">White papers</a></li>\n    </ul>\n\n    <ul id=\"nav-mobile\" class=\"side-nav\">\n      <li><a href=\"http://skycoin.net/infographics.html\">How it works?</a></li>\n      <li><a href=\"http://skycoin.net/downloads.html\">Download wallet</a></li>\n      <li><a href=\"http://skycoin.net/faq.html\">FAQs</a></li>\n      <li><a href=\"http://skycoin.net/whitepapers.html\">White papers</a></li>\n    </ul>\n    <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n  </div>\n</nav>\n"

/***/ }),

/***/ "../../../../../src/app/components/layout/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/components/layout/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/layout/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);

//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/layout/loading/loading.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".modalShow{\r\n  z-index: 1003;\r\n  display: block;\r\n  opacity: 1;\r\n  max-width: 80%;\r\n  margin: 0 auto;\r\n  -webkit-transform: scaleX(1);\r\n          transform: scaleX(1);\r\n  top: 10%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/layout/loading/loading.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"loadingModal\" class=\"modal bottom-sheet\" [ngClass]=\"{modalShow:loading}\">\n  <div class=\"modal-content\">\n    <h4>Loading please wait...</h4>\n    <div class=\"preloader-wrapper big active\">\n      <div class=\"spinner-layer spinner-blue-only\">\n        <div class=\"circle-clipper left\">\n          <div class=\"circle\"></div>\n        </div><div class=\"gap-patch\">\n        <div class=\"circle\"></div>\n      </div><div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/layout/loading/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () {
        this.loading = false;
    };
    return LoadingComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Boolean)
], LoadingComponent.prototype, "loading", void 0);
LoadingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-loading',
        template: __webpack_require__("../../../../../src/app/components/layout/loading/loading.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/layout/loading/loading.component.css")]
    })
], LoadingComponent);

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/layout/search-bar/search-bar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/layout/search-bar/search-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"nav-wrapper\">\n  <form (submit)=\"searchBlockHistory(blockSearchKey.value)\">\n    <div class=\"input-field\">\n      <input #blockSearchKey id=\"search\" type=\"search\" required placeholder=\"address, block-number or transaction id\">\n      <label class=\"label-icon\" for=\"search\"><i class=\"material-icons\">search</i></label>\n      <i class=\"material-icons\">close</i>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/layout/search-bar/search-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchBarComponent = (function () {
    function SearchBarComponent(router) {
        this.router = router;
    }
    SearchBarComponent.prototype.ngOnInit = function () {
    };
    SearchBarComponent.prototype.searchBlockHistory = function (hashVal) {
        if (hashVal.length == 34 || hashVal.length == 35) {
            this.router.navigate(['/address', hashVal]);
            return;
        }
        if (hashVal.length == 64) {
            this.router.navigate(['/transaction', hashVal]);
            return;
        }
        this.router.navigate(['/block', hashVal]);
        return;
    };
    return SearchBarComponent;
}());
SearchBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-search-bar',
        template: __webpack_require__("../../../../../src/app/components/layout/search-bar/search-bar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/layout/search-bar/search-bar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], SearchBarComponent);

var _a;
//# sourceMappingURL=search-bar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/pages/address-detail/address-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".collection{\r\n  border: none;\r\n}\r\na{\r\n  word-wrap: break-word;\r\n}\r\n.collection-item{\r\n  border: none;\r\n}\r\n\r\n.card-title{\r\n  font-size: 16px;\r\n}\r\n.right-arrow{\r\n  margin-top: 50px;\r\n}\r\n\r\n.address-qr{\r\n  padding-top: 20px;\r\n}\r\n\r\n.modalShow{\r\n  z-index: 1003;\r\n  display: block;\r\n  opacity: 1;\r\n  max-width: 80%;\r\n  margin: 0 auto;\r\n  max-height: 25%;\r\n  -webkit-transform: scaleX(1);\r\n          transform: scaleX(1);\r\n  top: 10%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/address-detail/address-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"transactions\">\n  <div class=\"col s8\" >\n    <div class=\"card-content\" *ngIf=\"transactions.length>0\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>Address</h5><span>{{currentAddress}}</span></li>\n        <li class=\"collection-item\">Number of transactions: {{transactions.length| number : '1.0-0'}} </li>\n        <li class=\"collection-item\">Current value: <i class=\"material-icons\">ic_account_balance</i> {{currentBalance| number : '1.0-0'}} skycoins</li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"card col s4\">\n    <!--<qr-code *ngIf=\"currentAddress!=null\" [value]=\"currentAddress\" [size]=\"300\"></qr-code>-->\n    <div id=\"qr-code\"></div>\n    <p class=\"address-qr\">{{currentAddress}}</p>\n  </div>\n\n\n  <div class=\" card col s12\" *ngFor=\"let transaction of transactions\">\n    <div class=\"card-title\">Transaction id : <a href=\"/transaction/{{transaction.txid}}\">{{transaction.txid}}</a></div>\n    <div class=\"col s4\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>inputs</h5></li>\n        <li class=\"collection-item\" *ngFor=\"let input of transaction.inputs\">\n          <!--<a href=\"/address/{{input.uxid}}\">uxid</a>-->\n          <a class=\"tooltipped\" data-position=\"bottom\" data-delay=\"250\" attr.data-tooltip=\"UxId: {{input.uxid}}\" href=\"/address/{{input.owner}}\">{{input.owner}}</a>\n          <i (click)=\"showUxId()\" class=\"material-icons\">ic_info_outline</i>\n          <div class=\"modal bottom-sheet\" [ngClass]=\"{modalShow:showUxID}\">\n            <div class=\"modal-content\">\n              <h4>UxId</h4>\n              {{input.uxid}}\n            </div>\n            <div class=\"modal-footer\">\n              <a href=\"#!\" class=\" modal-action modal-close waves-effect waves-green btn-flat\" (click)=\"hideUxId()\">Close</a>\n            </div>\n          </div>\n        </li>\n\n      </ul>\n    </div>\n    <div class=\"accent-1 col s1 right-arrow center\">\n      <i class=\"material-icons\">trending_flat</i>\n    </div>\n\n    <div class=\"col s5\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>outputs</h5></li>\n        <li class=\"collection-item\" *ngFor=\"let output of transaction.outputs\"><a href=\"/address/{{output.dst}}\">{{output.dst}}</a></li>\n      </ul>\n    </div>\n    <div class=\"col s2\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>coins</h5></li>\n        <li class=\"collection-item\" *ngFor=\"let output of transaction.outputs\">{{output.coins| number : '1.0-0'}}</li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/address-detail/address-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddressDetailComponent = (function () {
    function AddressDetailComponent(api, route, router) {
        this.api = api;
        this.route = route;
        this.router = router;
        this.UxOutputs = null;
        this.currentBalance = 0;
        this.transactions = [];
        this.currentAddress = null;
        this.showUxID = false;
    }
    AddressDetailComponent.prototype.ngOnInit = function () {
    };
    AddressDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.UxOutputs = this.route.params
            .switchMap(function (params) {
            var address = params['address'];
            _this.currentAddress = address;
            var qrcode = new QRCode("qr-code");
            qrcode.makeCode(_this.currentAddress);
            return _this.api.getUxOutputsForAddress(address);
        });
        this.UxOutputs.subscribe(function (uxoutputs) {
            _this.transactions = uxoutputs;
            console.log(uxoutputs);
        });
        this.route.params
            .switchMap(function (params) {
            var address = params['address'];
            return _this.api.getCurrentBalanceOfAddress(address);
        }).subscribe(function (addressDetails) {
            if (addressDetails.head_outputs.length > 0) {
                for (var i = 0; i < addressDetails.head_outputs.length; i++) {
                    _this.currentBalance = _this.currentBalance + parseInt(addressDetails.head_outputs[i].coins);
                }
            }
        });
    };
    AddressDetailComponent.prototype.showUxId = function () {
        this.showUxID = true;
        return false;
    };
    AddressDetailComponent.prototype.hideUxId = function () {
        this.showUxID = false;
        return false;
    };
    return AddressDetailComponent;
}());
AddressDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-address-detail',
        template: __webpack_require__("../../../../../src/app/components/pages/address-detail/address-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/pages/address-detail/address-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AddressDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=address-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/block-chain-table.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "tr:hover{\r\n  cursor: pointer;\r\n}\r\n\r\n.wrap{\r\n  word-break: break-all;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/block-chain-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12 s12 card light-blue lighten-1 white-text\">\n    <div class=\"card-content\">\n      <span class=\"col s6\">Block Height:</span><span class=\"col s6\">{{ totalBlocks| number : '1.0-0'}}</span>\n      <app-coin-supply></app-coin-supply>\n    </div>\n  </div>\n</div>\n\n<!--TODO: Use general table?-->\n<table class=\"bordered striped centered responsive-table\">\n  <thead>\n    <tr>\n      <th data-field=\"id\">Time</th>\n      <th data-field=\"name\">Block Number</th>\n      <th data-field=\"price\">Transactions</th>\n      <th data-field=\"id\">Amount Transferred</th>\n      <th data-field=\"price\">Blockhash</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let block of blocks\" (click)=\"showDetails(block)\">\n      <!--TODO: Use pipe? -->\n      <td>{{getTime(block.header.timestamp)}}</td>\n      <td>{{ block.header.seq | number : '1.0-0'}}</td>\n      <td>{{ block.body.txns.length }}</td>\n      <!--TODO: Use pipe? -->\n      <td>{{ GetBlockAmount(block.body.txns) | number : '1.0-0'}}</td>\n      <td>{{ block.header.block_hash }}</td>\n    </tr>\n  </tbody>\n</table>\n<app-loading [loading]=\"loading\"></app-loading>\n\n<app-pagination (onChangePage)=\"handlePageChange($event)\"></app-pagination>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/block-chain-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_es__ = __webpack_require__("../../../../lodash-es/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_es6__ = __webpack_require__("../../../../moment-es6/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockChainTableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BlockChainTableComponent = (function () {
    function BlockChainTableComponent(api, router) {
        this.api = api;
        this.router = router;
        this.loading = false;
        this.blocks = [];
    }
    BlockChainTableComponent.prototype.GetBlockAmount = function (txns) {
        var ret = [];
        __WEBPACK_IMPORTED_MODULE_2_lodash_es__["a" /* each */](txns, function (o) {
            if (o.outputs) {
                __WEBPACK_IMPORTED_MODULE_2_lodash_es__["a" /* each */](o.outputs, function (_o) { return ret.push(_o.coins); });
            }
        });
        return ret.reduce(function (memo, coin) { return memo + parseInt(coin); }, 0);
    };
    BlockChainTableComponent.prototype.getTime = function (time) {
        return __WEBPACK_IMPORTED_MODULE_3_moment_es6___default.a.unix(time).format('YYYY-MM-DD HH:mm');
    };
    BlockChainTableComponent.prototype.showDetails = function (block) {
        this.router.navigate(['/block', block.header.seq]);
    };
    BlockChainTableComponent.prototype.handlePageChange = function (pagesData) {
        var _this = this;
        this.totalBlocks = pagesData[1];
        var currentPage = pagesData[0];
        var blockStart = this.totalBlocks - currentPage * 10 + 1;
        var blockEnd = blockStart + 9;
        if (blockEnd >= this.totalBlocks) {
            blockEnd = this.totalBlocks;
        }
        if (blockStart <= 1) {
            blockStart = 1;
        }
        this.loading = true;
        this.api.getBlocks(blockStart, blockEnd)
            .subscribe(function (data) {
            _this.blocks = __WEBPACK_IMPORTED_MODULE_2_lodash_es__["b" /* sortBy */](data, function (block) { return block.header.seq; }).reverse();
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    return BlockChainTableComponent;
}());
BlockChainTableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-block-chain-table',
        template: __webpack_require__("../../../../../src/app/components/pages/block-chain-table/block-chain-table.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/pages/block-chain-table/block-chain-table.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], BlockChainTableComponent);

var _a, _b;
//# sourceMappingURL=block-chain-table.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/coin-supply/coin-supply.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/coin-supply/coin-supply.component.html":
/***/ (function(module, exports) {

module.exports = "<span class=\"col s6\">  Coin Cap:</span><span class=\"col s6\"> {{ coinCap| number : '1.0-0'}}</span>\n<span class=\"col s6\">  Distributed:</span><span class=\"col s6\">{{coinSupply| number : '1.0-0'}}</span>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/coin-supply/coin-supply.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoinSupplyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CoinSupplyComponent = (function () {
    function CoinSupplyComponent(api) {
        this.api = api;
        this.coinSupply = this.coinCap = 0;
    }
    CoinSupplyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getCoinSupply().subscribe(function (supply) {
            _this.coinCap = supply.coinCap;
            _this.coinSupply = supply.coinSupply;
        });
    };
    return CoinSupplyComponent;
}());
CoinSupplyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-coin-supply',
        template: __webpack_require__("../../../../../src/app/components/pages/block-chain-table/coin-supply/coin-supply.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/pages/block-chain-table/coin-supply/coin-supply.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object])
], CoinSupplyComponent);

var _a;
//# sourceMappingURL=coin-supply.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/pagination/pagination.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".pagination li.active{\r\n  background-color: #29b6f6;\r\n  color:white;\r\n}\r\n\r\n.lower-panel{\r\n  color:black;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/pagination/pagination.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"pagination\">\n\n  <li [ngClass]=\"{disabled:currentPage <= 5}\"><a href=\"#!\" (click)=\"loadPrevious()\"><i class=\"material-icons\">chevron_left</i></a></li>\n\n  <li *ngFor='let page of currentPages' [ngClass]=\"{active:currentPage == page}\" class=\"active\">\n\n    <a  (click)=\"changePage(page)\" href=\"#!\">{{page}}</a>\n\n  </li>\n  <li [ngClass]=\"{disabled:noUpcoming}\"><a href=\"#!\" (click)=\"loadUpcoming()\"><i class=\"material-icons\">chevron_right</i></a></li>\n</ul>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/block-chain-table/pagination/pagination.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginationComponent = (function () {
    function PaginationComponent(api) {
        this.api = api;
        this.onChangePage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.numberOfBlocks = 0;
        this.currentPage = 1;
        this.currentPages = [];
        this.pagesToShowAtATime = 5;
        this.pageStartPointer = this.currentPage;
        this.pageEndPointer = this.currentPage;
        this.noUpcoming = false;
    }
    PaginationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.fetchNumberOfBlocks().subscribe(function (numberOfBlocks) {
            _this.numberOfBlocks = numberOfBlocks;
            _this.onChangePage.emit([1, _this.numberOfBlocks]);
            _this.pagesToShowAtATime = _this.pagesToShowAtATime < numberOfBlocks ? _this.pagesToShowAtATime : _this.numberOfBlocks;
            _this.currentPages = [];
            for (var i = _this.currentPage; i < _this.currentPage + _this.pagesToShowAtATime; i++) {
                _this.currentPages.push(i);
            }
        });
    };
    PaginationComponent.prototype.changePage = function (pageNumber) {
        this.onChangePage.emit([pageNumber, this.numberOfBlocks]);
        this.currentPage = pageNumber;
        return false;
    };
    PaginationComponent.prototype.loadUpcoming = function () {
        if (this.currentPages[0] * 10 + this.pagesToShowAtATime * 10 >= this.numberOfBlocks) {
            this.noUpcoming = true;
            return false;
        }
        this.onChangePage.emit([this.currentPages[0] + this.pagesToShowAtATime, this.numberOfBlocks]);
        this.currentPage = this.currentPages[0] + this.pagesToShowAtATime;
        this.currentPages = [];
        for (var i = this.currentPage; i < this.currentPage + this.pagesToShowAtATime && i <= this.numberOfBlocks; i++) {
            if (i * 10 - this.numberOfBlocks < 10) {
                this.currentPages.push(i);
            }
            else {
                this.noUpcoming = true;
            }
        }
        return false;
    };
    PaginationComponent.prototype.loadPrevious = function () {
        this.noUpcoming = false;
        if (this.currentPages[0] <= 1) {
            return false;
        }
        if (this.currentPages[0] - this.pagesToShowAtATime <= 0) {
            this.currentPages = [];
            this.currentPage = 1;
            this.onChangePage.emit([1, this.numberOfBlocks]);
            for (var i = this.currentPage; i < this.currentPage + this.pagesToShowAtATime; i++) {
                this.currentPages.push(i);
            }
        }
        else {
            this.onChangePage.emit([this.currentPages[0] - this.pagesToShowAtATime, this.numberOfBlocks]);
            this.currentPage = this.currentPages[0] - this.pagesToShowAtATime;
            this.currentPages = [];
            for (var i = this.currentPage; i < this.currentPage + this.pagesToShowAtATime; i++) {
                if (i * 10 <= this.numberOfBlocks) {
                    this.currentPages.push(i);
                }
            }
        }
        return false;
    };
    return PaginationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Output */])(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "onChangePage", void 0);
PaginationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-pagination',
        template: __webpack_require__("../../../../../src/app/components/pages/block-chain-table/pagination/pagination.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/pages/block-chain-table/pagination/pagination.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object])
], PaginationComponent);

var _a;
//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/pages/block-details/block-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card{\r\n  background-color: #29b6f6;\r\n  color:white;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/block-details/block-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <h2>Block Details</h2>\n  <div class=\"card\" *ngIf=\"block\">\n    <div class=\"card-content\" >\n      <table>\n        <tbody >\n\n        <tr>\n\n          <td>Height</td><td>{{ block.header.seq }}</td>\n\n        </tr>\n        <tr>\n          <td>Timestamp</td><td>{{getTime(block.header.timestamp)}}</td>\n        </tr>\n        <tr>\n          <td>Hash</td><td>{{ block.header.block_hash }}</td>\n        </tr>\n\n        <tr>\n          <td>Parent Hash</td><td>{{ block.header.previous_block_hash }}</td>\n        </tr>\n\n        <tr>\n          <td>Total Amount</td><td>{{ getAmount(block) }} coins</td>\n        </tr>\n\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n\n  <div class=\"col s12\">Transactions</div>\n  <div class=\"col s12\">\n    <div class=\"col s1\">S.no</div>\n    <div class=\"col s2\">Transaction Id</div>\n    <div class=\"col s3\">Inputs</div>\n    <div class=\"col s4\">Outputs</div>\n    <div class=\"col s2\">Amount</div>\n  </div>\n  <div *ngIf=\"block\">\n    <div  class=\"col s12\" *ngFor=\"let transaction of block.body.txns;let i = index\">\n\n      <div class=\"col s1\">{{i+1}}</div>\n      <div class=\"col s2 wrap\"><a [routerLink]=\"['/transaction', transaction.txid ]\" >{{transaction.txid}}</a></div>\n      <div class=\"col s3 wrap\"><p *ngFor=\"let input of transaction.inputs;\" class=\"input\">{{input}}</p></div>\n      <div class=\"col s6 wrap\"><p *ngFor=\"let output of transaction.outputs;\" class=\"input\"><a [routerLink]=\"['/address', output.dst ]\" >{{output.dst}}</a>  - {{output.coins}}</p></div>\n    </div>\n  </div>\n\n\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/block-details/block-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_es6__ = __webpack_require__("../../../../moment-es6/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BlockDetailsComponent = (function () {
    function BlockDetailsComponent(api, route, router) {
        this.api = api;
        this.route = route;
        this.router = router;
        this.block = null;
    }
    BlockDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.blocksObservable = this.route.params
            .filter(function (params) { return params['id'] !== undefined; })
            .switchMap(function (params) {
            var selectedBlock = +params['id'];
            return _this.api.getBlocks(selectedBlock, selectedBlock);
        });
        this.blocksObservable.subscribe(function (blocks) {
            _this.block = blocks[0];
        });
    };
    BlockDetailsComponent.prototype.getTime = function (time) {
        return __WEBPACK_IMPORTED_MODULE_3_moment_es6___default.a.unix(time).format();
    };
    BlockDetailsComponent.prototype.getAmount = function (block) {
        var ret = [];
        var txns = block.body.txns;
        __WEBPACK_IMPORTED_MODULE_2_lodash__["each"](txns, function (o) {
            if (o.outputs) {
                __WEBPACK_IMPORTED_MODULE_2_lodash__["each"](o.outputs, function (_o) {
                    ret.push(_o.coins);
                });
            }
        });
        var totalCoins = ret.reduce(function (memo, coin) {
            return memo + parseInt(coin);
        }, 0);
        return totalCoins;
    };
    return BlockDetailsComponent;
}());
BlockDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-block-details',
        template: __webpack_require__("../../../../../src/app/components/pages/block-details/block-details.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/pages/block-details/block-details.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], BlockDetailsComponent);

var _a, _b, _c;
//# sourceMappingURL=block-details.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/pages/transaction-detail/transaction-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".collection{\r\n  border: none;\r\n}\r\n.collection-item{\r\n  border: none;\r\n}\r\n\r\n.card-title{\r\n  font-size: 16px;\r\n}\r\n.right-arrow{\r\n  margin-top: 50px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/transaction-detail/transaction-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"transaction!=null\">\n  <h2>Transaction Details</h2>\n  <div class=\"card light-blue lighten-1 white-text\" *ngIf=\"transaction\">\n    <div class=\"card-content\" >\n      <table>\n        <tbody >\n\n        <tr>\n\n          <td>Status</td><td>{{ transaction.status?\"confirmed\":\"unconfirmed\" }}</td>\n\n        </tr>\n        <tr>\n          <td>Timestamp</td><td>{{getTime(transaction.timestamp)}}</td>\n        </tr>\n        <tr>\n          <td>Block </td><td><a [routerLink]=\"['/block', transaction.block_num ]\" style=\"color: #ffffff\">{{ transaction.block_num | number : '1.0-0'}}</a></td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n\n  <div class=\" card col s12\">\n    <div class=\"card-title\">Transaction id : {{transaction.txid}}</div>\n    <div class=\"col s4\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>Inputs</h5></li>\n        <li class=\"collection-item\" *ngFor=\"let input of transaction.inputs\">{{input}}</li>\n\n      </ul>\n    </div>\n    <div class=\"accent-1 col s1 right-arrow center\">\n      <i class=\"material-icons\">trending_flat</i>\n    </div>\n\n    <div class=\"col s5\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>Outputs</h5></li>\n        <li class=\"collection-item\" *ngFor=\"let output of transaction.outputs\"><a [routerLink]=\"['/address', output.dst ]\">{{output.dst}}</a></li>\n      </ul>\n    </div>\n    <div class=\"col s2\">\n      <ul class=\"collection\">\n        <li class=\"collection-item\"><h5>Coins</h5></li>\n        <li class=\"collection-item\" *ngFor=\"let output of transaction.outputs\">{{output.coins | number : '1.0-0'}}</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/transaction-detail/transaction-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_es6__ = __webpack_require__("../../../../moment-es6/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TransactionDetailComponent = (function () {
    function TransactionDetailComponent(api, route, router) {
        this.api = api;
        this.route = route;
        this.router = router;
        this.transactionObservable = null;
        this.transaction = null;
    }
    TransactionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transactionObservable = this.route.params
            .flatMap(function (params) {
            var txid = params['txid'];
            return _this.api.getTransaction(txid);
        })
            .flatMap(function (trans) {
            var tasks$ = [];
            _this.transaction = trans.txn;
            _this.transaction.status = trans.status.confirmed;
            _this.transaction.block_num = trans.status.block_seq;
            trans = trans.txn;
            for (var i = 0; i < trans.inputs.length; i++) {
                tasks$.push(_this.getAddressOfInput(trans.inputs[i]));
            }
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].forkJoin.apply(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"], tasks$);
        });
        this.transactionObservable.subscribe(function (trans) {
            for (var i = 0; i < trans.length; i++) {
                _this.transaction.inputs[i] = trans[i].owner_address;
            }
        });
    };
    TransactionDetailComponent.prototype.getAddressOfInput = function (uxid) {
        return this.api.getInputAddress(uxid);
    };
    TransactionDetailComponent.prototype.getTime = function (time) {
        return __WEBPACK_IMPORTED_MODULE_4_moment_es6___default.a.unix(time).format();
    };
    return TransactionDetailComponent;
}());
TransactionDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-transaction-detail',
        template: __webpack_require__("../../../../../src/app/components/pages/transaction-detail/transaction-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/pages/transaction-detail/transaction-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["g" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["g" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
], TransactionDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=transaction-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/api/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.baseUrl = '/';
    }
    ApiService.prototype.fetchNumberOfBlocks = function () {
        return this.get('blockchain/metadata')
            .map(function (res) { return res.head.seq; });
    };
    ApiService.prototype.getBlocks = function (startNumber, endNumber) {
        var stringConvert = 'start=' + startNumber + '&end=' + endNumber;
        return this.get('blocks?' + stringConvert)
            .map(function (res) { return res.blocks; });
    };
    ApiService.prototype.getCoinSupply = function () {
        return this.get('explorer/getEffectiveOutputs');
    };
    ApiService.prototype.getCurrentBalanceOfAddress = function (address) {
        return this.get('outputs?addrs=' + address);
    };
    ApiService.prototype.getInputAddress = function (uxid) {
        return this.get('uxout?uxid=' + uxid);
    };
    ApiService.prototype.getTransaction = function (txid) {
        return this.get('transaction?txid=' + txid);
    };
    ApiService.prototype.getUxOutputsForAddress = function (address) {
        return this.get('explorer/address?address=' + address);
    };
    ApiService.prototype.get = function (url) {
        return this.http.get(this.baseUrl + 'api/' + url)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error || 'Server error');
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ApiService);

var _a;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map