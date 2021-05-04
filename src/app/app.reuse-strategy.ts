import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Tells the system which components should be always recreated after a change in the URL
 * and which ones may be recycled.
 */
@Injectable()
export class AppReuseStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void { }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Reuse only the address page. Also, only if the navigation is from it and to it (that
    // happens when the user selects a new address, uses the search bar or changes the page).
    if (curr.routeConfig && curr.routeConfig.path.includes('app/address/') && future.routeConfig && future.routeConfig.path.includes('app/address/')) {
      return true;
    } else if ((curr.children && curr.children.length > 0 && curr.children[0].routeConfig && curr.children[0].routeConfig.path.includes('app/address/')) &&
            (future.children && future.children.length > 0 && future.children[0].routeConfig && future.children[0].routeConfig.path.includes('app/address/'))) {
      return true;
    } else {
      return false;
    }
  }
}
