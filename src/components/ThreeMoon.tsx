'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeMoon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
    container.appendChild(renderer.domElement);

    // Light sources
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff3e0, 2.2);
    directionalLight.position.set(-8, 6, 8);
    scene.add(directionalLight);

    // Subtle orange back-light for high-end glowing look
    const backlight = new THREE.DirectionalLight(0xffaa44, 0.4);
    backlight.position.set(8, -6, -8);
    scene.add(backlight);

    // Create a procedural cratered texture on an offscreen canvas
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext('2d');
    if (ctx) {
      // Base fill
      ctx.fillStyle = '#171e28';
      ctx.fillRect(0, 0, 1024, 512);

      // Noise and variations
      for (let i = 0; i < 30000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const radius = Math.random() * 1.5;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.18)';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw crater features
      const drawCrater = (cx: number, cy: number, r: number) => {
        // Shadow/depth
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.lineWidth = r * 0.15;
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI * 1.15, Math.PI * 2.15);
        ctx.stroke();

        // Highlight/rim
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = r * 0.15;
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI * 0.15, Math.PI * 1.15);
        ctx.stroke();

        // Inner shadow crater bed
        const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        innerGlow.addColorStop(0, 'rgba(10,14,20,0.45)');
        innerGlow.addColorStop(0.7, 'rgba(18,24,34,0.2)');
        innerGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };

      // Generate a set of crater clusters
      for (let i = 0; i < 35; i++) {
        const cx = Math.random() * 1024;
        const cy = Math.random() * 512;
        const r = 12 + Math.random() * 28;
        drawCrater(cx, cy, r);
      }

      // Generate tiny crater details
      for (let i = 0; i < 150; i++) {
        const cx = Math.random() * 1024;
        const cy = Math.random() * 512;
        const r = 2 + Math.random() * 6;
        drawCrater(cx, cy, r);
      }
    }

    const texture = new THREE.CanvasTexture(textureCanvas);
    
    // Create heightMap (bumpMap) from Canvas
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 1024;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#808080';
      bCtx.fillRect(0, 0, 1024, 512);
      bCtx.drawImage(textureCanvas, 0, 0);
      const imgData = bCtx.getImageData(0, 0, 1024, 512);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const nv = Math.max(0, Math.min(255, (v - 128) * 1.8 + 128));
        data[i] = nv;
        data[i + 1] = nv;
        data[i + 2] = nv;
      }
      bCtx.putImageData(imgData, 0, 0);
    }
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

    // Create Moon geometry and material
    const geometry = new THREE.SphereGeometry(3.6, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: bumpTexture,
      bumpScale: 0.18,
      roughness: 0.9,
      metalness: 0.05,
    });
    
    const moon = new THREE.Mesh(geometry, material);
    moon.rotation.x = 0.2;
    moon.rotation.y = 0.5;
    scene.add(moon);

    // Glowing Atmosphere mesh (slightly larger sphere back-facing)
    const glowGeometry = new THREE.SphereGeometry(3.7, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(0.98, 0.51, 0.0, 1.0) * intensity * 0.95;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(atmosphere);

    // Mouse interactive rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = moon.rotation.x;
    let targetRotationY = moon.rotation.y;

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      if (isDragging) {
        targetRotationY += deltaMove.x * 0.005;
        targetRotationX += deltaMove.y * 0.005;
      }

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile devices
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDragging && event.touches.length === 1) {
        const deltaMove = {
          x: event.touches[0].clientX - previousMousePosition.x,
          y: event.touches[0].clientY - previousMousePosition.y,
        };
        targetRotationY += deltaMove.x * 0.005;
        targetRotationX += deltaMove.y * 0.005;

        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.0016;
      }

      // Smooth rotation interpolation (lerp)
      moon.rotation.y += (targetRotationY - moon.rotation.y) * 0.06;
      moon.rotation.x += (targetRotationX - moon.rotation.x) * 0.06;
      atmosphere.rotation.y = moon.rotation.y;
      atmosphere.rotation.x = moon.rotation.x;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}
    />
  );
}
