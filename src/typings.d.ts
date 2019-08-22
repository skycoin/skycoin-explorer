/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
/**
 * Needed for using System in app.translate-loader.ts.
 */
declare var System: System;
interface System {
  import(request: string): Promise<any>;
}
