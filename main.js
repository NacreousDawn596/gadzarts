// Author: Aferiad Kamal
// See more: https://kamal.aferiad.xyz/

const { createApp, ref } = Vue;
createApp({
    setup() {
        const campuses = ref([
            { id: 1, name: "Paris", location: "Paris, Île-de-France", description: "Le campus historique au cœur de la capitale, centre de recherche et d'innovation.", url: "https://paristech.fr/fr/les-ecoles-de-paristech/arts-et-metiers" },
            { id: 2, name: "Aix-en-Provence", location: "Aix-en-Provence, Provence-Alpes-Côte d'Azur", description: "Spécialisé en mécanique et énergétique, au cœur du bassin industriel méditerranéen.", url: "https://www.aixenprovence.fr/Ecole-Nationale-Superieure-des-Arts-et-Metiers-34045" },
            { id: 3, name: "Angers", location: "Angers, Pays de la Loire", description: "Expert en matériaux et structures, avec un fort partenariat avec l'industrie aéronautique.", url: "https://dp-www.s3.ensam.eu/public/2019-07/fiche%20campus%20angers%20site%20web%20rentree%202019%20VF_compressed.pdf" },
            { id: 4, name: "Bordeaux", location: "Bordeaux, Nouvelle-Aquitaine", description: "Centre d'excellence en ingénierie des systèmes complexes et numérique.", url: "https://lannuaire.service-public.fr/gouvernement/6915acfa-f56a-435f-93a7-85ae9ba9fc6d" },
            { id: 5, name: "Châlons-en-Champagne", location: "Châlons-en-Champagne, Grand Est", description: "Spécialiste des procédés de fabrication et de la production industrielle.", url: "https://fr.wikipedia.org/wiki/%C3%89cole_nationale_sup%C3%A9rieure_d%27arts_et_m%C3%A9tiers_de_Ch%C3%A2lons-en-Champagne" },
            { id: 6, name: "Cluny", location: "Cluny, Bourgogne-Franche-Comté", description: "Campus historique dans une abbaye médiévale, spécialisé en génie civil et patrimoine.", url: "https://artsetmetiers.fr/fr/campus/cluny" },
            { id: 7, name: "Lille", location: "Lille, Hauts-de-France", description: "Expert en génie industriel et logistique, au cœur du bassin industriel du Nord.", url: "https://fr.wikipedia.org/wiki/%C3%89cole_nationale_sup%C3%A9rieure_des_arts_et_m%C3%A9tiers_de_Lille" },
            { id: 8, name: "Metz", location: "Metz, Grand Est", description: "Centre d'excellence en ingénierie des systèmes et intelligence artificielle.", url: "https://metz.fr/lieux/lieu-250.php" },
            { id: 8, name: "Meknes", location: "Meknes, Maroc", description: "Premier établissement du réseau ENSAM au Maroc, ENSAM Meknès incarne l’esprit fondateur du modèle Gadzarts à la marocaine, alliant excellence académique et tradition.", url: "http://www.ensam-umi.ac.ma/" },
            { id: 8, name: "Casablanca", location: "Casablanca, Maroc", description: "Deuxième école du réseau, ENSAM Casablanca profite de son implantation au cœur du tissu industriel national pour offrir une formation ancrée dans le concret.", url: "https://ensam-casa.ma/" },
            { id: 8, name: "Rabat", location: "Rabat, Maroc", description: "Troisième née du réseau, ENSAM Rabat se distingue par son intégration universitaire et son engagement pour la recherche et l'innovation technologique.", url: "https://artsetmetiers.ma/fr" },
        ]);
        const goToUrl = (url) => {
            window.location.href = url;
        };
        return { campuses, goToUrl };
    },
    mounted() {
        AOS.init({ once: true, duration: 800 });
        const canvas = this.$refs.threeCanvas;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.5,
            sizeAttenuation: true
        });
        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);
        const bigStarsGeometry = new THREE.BufferGeometry();
        const bigStarsMaterial = new THREE.PointsMaterial({
            color: 0x4dabf7,
            size: 3,
            sizeAttenuation: true
        });
        const bigStarsVertices = [];
        for (let i = 0; i < 500; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            bigStarsVertices.push(x, y, z);
        }
        bigStarsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bigStarsVertices, 3));
        const bigStars = new THREE.Points(bigStarsGeometry, bigStarsMaterial);
        scene.add(bigStars);
        const galaxyGeometry = new THREE.BufferGeometry();
        const galaxyMaterial = new THREE.PointsMaterial({
            color: 0x5f3dc4,
            size: 2,
            transparent: true,
            opacity: 0.3
        });
        const galaxyVertices = [];
        for (let i = 0; i < 5000; i++) {
            const radius = Math.random() * 500 + 100;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta) * 0.3;
            const z = radius * Math.cos(phi);
            galaxyVertices.push(x, y, z);
        }
        galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
        const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
        scene.add(galaxy);
        camera.position.z = 500;
        const animate = () => {
            requestAnimationFrame(animate);
            starField.rotation.y += 0.0002;
            bigStars.rotation.y += 0.0003;
            galaxy.rotation.y += 0.0001;
            renderer.render(scene, camera);
        };
        animate();
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
}).mount('#app');