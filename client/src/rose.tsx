import * as THREE from "three";
import { useEffect, useRef } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load("/rflower.jpg");
    const texture2 = textureLoader.load("/rgtexture.jpg");
    const texture3 = textureLoader.load("/rgreen.jpg");
    const texture4 = textureLoader.load("/rgreen.jpg");
    const texture5 = textureLoader.load("/rgreen.jpg");

    const fbxLoader = new FBXLoader();
    let loadedObject: THREE.Group | undefined;

    fbxLoader.load(
      "/rose.fbx",
      (object) => {
        object.scale.set(0.5, 0.5, 0.5);
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        object.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              opacity: 1,
              flatShading: false,
              shininess: 200,
              specular: new THREE.Color(0x222222),
            });
            child.geometry.computeVertexNormals();
          }
        });

        const meshes = object.children;
        if (meshes.length >= 5) {
          meshes[0].material.map = texture1;
          meshes[1].material.map = texture2;
          meshes[2].material.map = texture3;
          meshes[3].material.map = texture4;
          meshes[4].material.map = texture5;
        }

        scene.add(object);
        loadedObject = object;
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error("Error loading FBX:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight1.position.set(10, 10, 10);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight2.position.set(-10, -10, 10);
    directionalLight2.castShadow = true;
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 4);
    pointLight.position.set(0, 50, 50);
    scene.add(pointLight);

    camera.position.set(0, 10, 42);
    camera.lookAt(0, 0, 0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      if (loadedObject) {
        loadedObject.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={refContainer} className=""></div>;
};

export default Rose;
