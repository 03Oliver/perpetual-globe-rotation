import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Text } from "@chakra-ui/react";
import * as THREE from 'three';
import "@fontsource/roboto"; // Defaults to weight 400 (regular)

const Index = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Globe
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Box ref={mountRef} width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" position="relative">
      <Text position="absolute" color="white" fontSize="4xl" fontFamily="Roboto" fontWeight="bold" zIndex="10">
        teleses.ai — buildspace s5
      </Text>
    </Box>
  );
};


export default Index;