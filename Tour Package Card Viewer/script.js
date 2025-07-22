const tours = [
  {
    name: "Goa Beach Paradise",
    type: "Beach",
    price: "₹12,999",
    days: "3 Nights / 4 Days",
    img: "https://wallpapers.com/images/hd/goa-beach-pictures-a3ifdr3durh2xy54.jpg"
  },
  {
    name: "Manali Mountain Adventure",
    type: "Mountain",
    price: "₹14,999",
    days: "4 Nights / 5 Days",
    img: "https://www.tripplannersindia.com/assets/images/page/2_Nights_3_Days_Manali_Tour_Package5.jpg"
  },
  {
    name: "Mumbai City Lights",
    type: "City",
    price: "₹8,500",
    days: "2 Nights / 3 Days",
    img: "https://www.adotrip.com/public/images/city/master_images/5e41077a0dc68-Mumbai_Attractions.jpg"
  },
  {
    name: "Kerala Backwater Cruise",
    type: "Beach",
    price: "₹13,499",
    days: "4 Nights / 5 Days",
    img: "https://static.wixstatic.com/media/ed75e9_a632f4cd3b5444549d4a4f12be78f530~mv2_d_3119_2079_s_2.jpg/v1/fill/w_2500,h_1666,al_c/ed75e9_a632f4cd3b5444549d4a4f12be78f530~mv2_d_3119_2079_s_2.jpg"
  },
  {
    name: "Shimla Snow Escape",
    type: "Mountain",
    price: "₹11,200",
    days: "3 Nights / 4 Days",
    img: "https://etvbharatimages.akamaized.net/etvbharat/prod-images/25-12-2024/1200-675-23190106-370-23190106-1735113346569.jpg?imwidth=1200"
  },
  {
    name: "Jaipur Heritage Tour",
    type: "City",
    price: "₹10,000",
    days: "3 Nights / 4 Days",
    img: "https://www.freetour.com/images/tours/4270/private-3day-jaipur-heritage-tour-05.jpg"
  }
];

function verifyUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email.includes("@")) {
    alert("Please enter valid details.");
    return;
  }

  document.getElementById("verify-section").style.display = "none";
  document.getElementById("tour-section").classList.remove("hidden");
  loadTours("All");
}

function loadTours(type) {
  const container = document.getElementById("tours");
  container.innerHTML = "";
  const filtered = type === "All" ? tours : tours.filter(t => t.type === type);
  filtered.forEach((t, i) => {
    const card = `
      <div class="card-3d">
        <div class="card-3d-inner bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl transform transition duration-500 opacity-0 translate-y-10">
          <img src="${t.img}" alt="${t.name}" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold">${t.name}</h3>
            <p class="text-sm">${t.days}</p>
            <p class="text-green-600 font-bold mt-1">${t.price}</p>
            <p class="text-xs text-gray-500 mt-1">Type: ${t.type}</p>
            <button class="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Book Now</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
  // Animate cards in 3D
  setTimeout(() => {
    document.querySelectorAll('.card-3d-inner').forEach((el, idx) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-10');
        el.classList.add('opacity-100', 'translate-y-0');
      }, idx * 120);
    });
  }, 100);
}

function filterTours(type) {
  loadTours(type);
}

// 3D Globe Animation using Three.js
window.addEventListener('DOMContentLoaded', () => {
  // Globe
  const canvas = document.getElementById('globe-canvas');
  if (canvas) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 3;
    // Globe
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2196f3,
      roughness: 0.7,
      metalness: 0.3,
      wireframe: false,
      opacity: 0.7,
      transparent: true
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    // Animate
    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.003;
      globe.rotation.x += 0.0007;
      renderer.render(scene, camera);
    }
    animate();
    // Responsive
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
  }
  // Parallax effect for overlay
  const overlay = document.querySelector('.parallax-bg');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (overlay) overlay.style.transform = `translateY(${y * 0.2}px)`;
  });

  // Login Modal Logic
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  const closeLogin = document.getElementById('close-login');
  if (loginBtn && loginModal && closeLogin) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });
    closeLogin.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });
    // Close modal when clicking outside the modal content
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.add('hidden');
      }
    });
  }
});
