declare module 'three/examples/jsm/loaders/OBJLoader' {
  export class OBJLoader extends THREE.Loader {
    constructor(manager?: THREE.LoadingManager);
    load(
      url: string,
      onLoad: (object: THREE.Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(data: string) : THREE.Group;
  }
}
declare module '*.obj' {
  const content: string;
  export default content;
}
declare module 'three/examples/jsm/loaders/MTLLoader' {
  import { LoadingManager, Material } from 'three';

  export class MTLLoader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (materials: Material[]) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    setPath(path: string): void;
    setResourcePath(path: string): void;
    setCrossOrigin(value: string): void;
    setMaterialOptions(value: object): void;
  }
}
declare module 'three/examples/jsm/loaders/FBXLoader' {
  export class FBXLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (group: Group) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(data: ArrayBuffer | string, path: string): Group;
  }
}
declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, MOUSE, Renderer, Vector3 } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    domElement: HTMLElement | undefined;

    // API
    enabled: boolean;
    target: Vector3;

    // rotation
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;

    enableDamping: boolean;
    dampingFactor: number;

    enableZoom: boolean;
    zoomSpeed: number;

    enableRotate: boolean;
    rotateSpeed: number;

    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;

    autoRotate: boolean;
    autoRotateSpeed: number;

    // methods
    update(): void;

    listenToKeyEvents(domElement: HTMLElement): void;

    saveState(): void;
    reset(): void;

    dispose(): void;

    getPolarAngle(): number;
    getAzimuthalAngle(): number;

    // EventDispatcher mixins
    addEventListener(type: string, listener: (event: any) => void): void;
    hasEventListener(type: string, listener: (event: any) => void): boolean;
    removeEventListener(type: string, listener: (event: any) => void): void;
    dispatchEvent(event: { type: string; target: any }): void;
  }
}
