import React, { useEffect, useRef } from 'react';
import { Container, Box, Text } from "@chakra-ui/react";
import * as THREE from 'three';
import Countdown from 'react-countdown';

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

  const Completionist = () => <Text fontSize="2xl" color="white" fontFamily="monospace" fontWeight="bold">DEMO DAY</Text>;

  return (
    <Box ref={mountRef} width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Text fontSize="4xl" color="white" fontFamily="monospace" fontWeight="bold" mb={4}>teleses.ai</Text>
      <Countdown date={new Date('2024-07-27T00:00:00')} renderer={({ days, hours, minutes, seconds }) => (
        <Text fontSize="2xl" color="white" fontFamily="monospace" fontWeight="bold">
          {days}d {hours}h {minutes}m {seconds}s
        </Text>
      )} />
    </Box>
  );
};

export default Index;