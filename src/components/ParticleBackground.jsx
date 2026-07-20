import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full-page interactive Three.js particle background
 * - White "pearl" page background underneath
 * - Saudi MoE teal-colored particles (#2FAB99) - all green, no black
 * - Small, sharp, crisp particles (no blur)
 * - Solid colors (no additive blending that produces black)
 */
export default function ParticleBackground() {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const PARTICLE_SIZE = 14; // Smaller, more refined particles
    let particles = null;
    let raycaster = null;
    let intersects = null;
    let pointer = null;
    let INTERSECTED = null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 250;

    // Box geometry - higher density
    let boxGeometry = new THREE.BoxGeometry(250, 250, 250, 22, 22, 22);
    boxGeometry.deleteAttribute('normal');
    boxGeometry.deleteAttribute('uv');

    // Inline mergeVertices
    const positionAttribute = boxGeometry.getAttribute('position');
    const uniqueVerts = [];
    const indexMap = new Map();
    const newIndices = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      const key = `${x.toFixed(4)}_${y.toFixed(4)}_${z.toFixed(4)}`;
      if (!indexMap.has(key)) {
        indexMap.set(key, uniqueVerts.length / 3);
        uniqueVerts.push(x, y, z);
      }
      newIndices.push(indexMap.get(key));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(uniqueVerts, 3));
    geometry.setIndex(newIndices);

    // Colors - ALL teal green palette (no black/dark colors)
    const colors = [];
    const sizes = [];
    const color = new THREE.Color();
    const l = uniqueVerts.length / 3;

    // Solid teal color helpers
    const tealPrimary = new THREE.Color(0x2FAB99);   // #2FAB99
    const tealDeep = new THREE.Color(0x279685);      // #279685 (darker teal)
    const tealMedium = new THREE.Color(0x5BC9B1);    // #5BC9B1 (lighter teal)
    const tealLight = new THREE.Color(0x8EDBCB);     // #8EDBCB (very light teal)

    for (let i = 0; i < l; i++) {
      const r = Math.random();
      if (r < 0.4) {
        color.copy(tealPrimary);
      } else if (r < 0.7) {
        color.copy(tealMedium);
      } else if (r < 0.9) {
        color.copy(tealLight);
      } else {
        color.copy(tealDeep);
      }
      color.toArray(colors, i * 3);
      sizes[i] = PARTICLE_SIZE * (0.7 + Math.random() * 0.3); // Slight size variation
    }

    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Sharp, crisp dot texture - no soft edges, no blur
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dctx = dotCanvas.getContext('2d');
    // Single solid circle - crisp edges
    dctx.fillStyle = '#FFFFFF';
    dctx.beginPath();
    dctx.arc(32, 32, 30, 0, Math.PI * 2);
    dctx.fill();
    const dotTexture = new THREE.CanvasTexture(dotCanvas);
    dotTexture.minFilter = THREE.LinearFilter;
    dotTexture.magFilter = THREE.LinearFilter;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: dotTexture },
        alphaTest: { value: 0.5 }, // Higher threshold = sharper edges
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        void main() {
          vColor = customColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z); // Reduced multiplier
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        uniform float alphaTest;
        varying vec3 vColor;
        void main() {
          // Multiply texture alpha by vColor to get solid teal dots
          vec4 texel = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(color * vColor, texel.a);
          if (gl_FragColor.a < alphaTest) discard;
        }
      `,
      transparent: true,
      depthWrite: false,
      // NO blending - use NormalBlending so colors stay true teal (no black mixing)
      blending: THREE.NormalBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // TRANSPARENT canvas on white pearl background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // Fully transparent
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.opacity = '0.45'; // Subtle, doesn't compete with text

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('pointermove', onPointerMove);

    function animate() {
      requestAnimationFrame(animate);

      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;

      const attrs = particles.geometry.attributes;
      raycaster.setFromCamera(pointer, camera);
      intersects = raycaster.intersectObject(particles);

      if (intersects.length > 0) {
        if (INTERSECTED !== intersects[0].index) {
          attrs.size.array[INTERSECTED] = PARTICLE_SIZE;
          INTERSECTED = intersects[0].index;
          attrs.size.array[INTERSECTED] = PARTICLE_SIZE * 1.4;
          attrs.size.needsUpdate = true;
        }
      } else if (INTERSECTED !== null) {
        attrs.size.array[INTERSECTED] = PARTICLE_SIZE;
        attrs.size.needsUpdate = true;
        INTERSECTED = null;
      }

      renderer.render(scene, camera);
    }

    animate();

    cleanupRef.current = () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('pointermove', onPointerMove);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      dotTexture.dispose();
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}