import * as THREE from "three";
import { useEffect, useRef } from "react";

const SphereScene: React.FC = () => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee); // Set clear color to light gray
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    // Create a sphere
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Red color
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Camera position
    camera.position.set(0, 20, 20);
    camera.lookAt(0, 0, 0);

    // Render scene
    renderer.render(scene, camera);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on component unmount
    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={refContainer}></div>;
};

export default SphereScene;
