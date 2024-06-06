import * as THREE from "three";
import { useEffect, useRef } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const Rose: React.FC = () => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    const fbxLoader = new FBXLoader();

    fbxLoader.load(
      "/rose.fbx",
      (object) => {
        object.scale.set(0.5, 0.5, 0.5);
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        object.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            console.log(child);
            // Manually set red color with emissive property
            child.material = new THREE.MeshPhongMaterial({
              //   color: child.material.color,
              //   blendColor: child.material.blendColor,
              //   blendDst: child.material.blendDst,
              //   blendAlpha: child.material.blendAlpha,
              //   blendSrc: child.material.blendSrc,
              //   blendEquation: child.material.blendEquation,
              //   bumpMap: child.material.bumpMap,
              //   emissive: child.material.emissive,
              //     emissiveIntensity: child.material.emissiveIntensity,
              //   emissiveMap: child.material.emissiveMap,
              //   map: child.material.map,
              //   normalMap: child.material.normalMap,
              //   normalMapType: child.material.normalMapType,
              //@manual
              // color: 0xff0000,
              // emissive: 0x550000,
              // emissiveIntensity: 0.5,
              // shininess: 100,
            });
            // child.material.transparent = false;
            // child.material.opacity = 1.0;
          }
        });

        scene.add(object);
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error("Error loading FBX:", error);
      }
    );
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    //@ Increase the intensity of the ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    camera.position.set(0, 10, 50);
    camera.lookAt(0, 0, 0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={refContainer}></div>;
};

export default Rose;
