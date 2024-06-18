import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Text } from "@chakra-ui/react";
import * as THREE from 'three';

const Index = () => {
  const mountRef = useRef(null);
  const [countdown, setCountdown] = useState('');

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

  useEffect(() => {
    const now = new Date().getTime();
    const targetDate = now + 39.193 * 24 * 60 * 60 * 1000; // 39.193 days from now

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = distance / (1000 * 60 * 60 * 24);
      setCountdown(days.toFixed(3)); // Reduce to 3 decimal places
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box ref={mountRef} width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" position="relative">
      <Text position="absolute" color="white" fontSize="4xl" fontWeight="bold" zIndex="10">
        {countdown}
      </Text>
    </Box>
  );
};

export default Index;