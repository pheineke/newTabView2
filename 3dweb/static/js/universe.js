class Universe {
    constructor() {
        this.init();
    }

    async init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.cssRenderer = new THREE.CSS3DRenderer();
        this.controls = null;
        this.currentContent = null;

        this.fontLoader = new THREE.FontLoader();
        await new Promise(resolve => {
          this.fontLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/refs/heads/dev/examples/fonts/helvetiker_regular.typeface.json', 
              font => {
                  this.font = font;
                  this.createText("X", {x: 1, y: 0, z: 0});
                  this.createText("Y", {x: 0, y: 1, z: 0});
                  this.createText("Z", {x: 0, y: 0, z: 1});
                  resolve();
              }
          );
        });

        // Renderer Setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0';
        document.body.appendChild(this.cssRenderer.domElement);

        // Camera & Controls
        this.camera.position.set(0, 1.6, 5);
        this.controls = new THREE.PointerLockControls(this.camera, document.body);
        document.addEventListener('click', () => this.controls.lock());

        // Lighting
        // this.addLights();
        // this.addFloor();

        // Start with initial URL
        // await this.loadPage(window.location.href, new THREE.Vector3(0, 1.5, -5));


        this.createWorldOrigin();
        
        
        this.setupEventListeners();
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
      
        // Update movement each frame
        this.updateMovement();
      
        this.renderer.render(this.scene, this.camera);
        this.cssRenderer.render(this.scene, this.camera);
    }
      
    updateMovement() {
        const speed = 0.04;
        // Build movement vector:
        const moveX = (this.moveState.right ? 1 : 0) + (this.moveState.left ? -1 : 0);
        const moveZ = (this.moveState.forward ? 1 : 0) + (this.moveState.backward ? -1 : 0);
        const moveY = (this.moveState.up ? 1 : 0) + (this.moveState.down ? -1 : 0);

      
        if (moveX !== 0 || moveY !== 0 || moveZ !== 0) {
          const moveVec = new THREE.Vector3(moveX, moveY, moveZ);
          moveVec.normalize(); // Normalization prevents diagonal speed boost
      
          // Apply movement: moveForward moves along the camera's local z-axis,
          // moveRight moves along the local x-axis.
          this.controls.moveForward(moveVec.y * speed);
          this.controls.moveRight(moveVec.x * speed);
          this.controls.moveUp(moveVec.z * speed);
        }
    }

    setupEventListeners() {
        // Store moveState as an instance property for access in updateMovement
        this.moveState = { forward: false, backward: false, left: false, right: false, up: false, down: false };
      
        document.addEventListener('keydown', e => {
          switch(e.key.toLowerCase()) {
            case 'w': this.moveState.forward = true; break;
            case 's': this.moveState.backward = true; break;
            case 'a': this.moveState.left = true; break;
            case 'd': this.moveState.right = true; break;
            case ' ': this.moveState.up = true; break;
            case 'shift': this.moveState.down = true; break;
          }
        });
      
        document.addEventListener('keyup', e => {
          switch(e.key.toLowerCase()) {
            case 'w': this.moveState.forward = false; break;
            case 's': this.moveState.backward = false; break;
            case 'a': this.moveState.left = false; break;
            case 'd': this.moveState.right = false; break;
            case ' ': this.moveState.up = false; break;
            case 'shift': this.moveState.down = false; break;
          }
        });
      
        window.addEventListener('resize', () => {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        });
      }
      
    createWorldOrigin() {
      const points_x = [];
      points_x.push( new THREE.Vector3( 0, 0, 0 ) );
      points_x.push( new THREE.Vector3( 1, 0, 0 ) );

      const material_x = new THREE.LineBasicMaterial( { color: 0xff0000 } );
      const geometry_x = new THREE.BufferGeometry().setFromPoints( points_x );
      const line_x = new THREE.Line( geometry_x, material_x );
      this.scene.add( line_x );


      const points_y = [];
      points_y.push( new THREE.Vector3( 0, 0, 0 ) );
      points_y.push( new THREE.Vector3( 0, 1, 0 ) );

      const material_y = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
      const geometry_y = new THREE.BufferGeometry().setFromPoints( points_y );
      const line_y = new THREE.Line( geometry_y, material_y );
      this.scene.add( line_y );

      const points_z = [];
      points_z.push( new THREE.Vector3( 0, 0, 0 ) );
      points_z.push( new THREE.Vector3( 0, 0, 1 ) );

      const material_z = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      const geometry_z = new THREE.BufferGeometry().setFromPoints( points_z );
      const line_z = new THREE.Line( geometry_z, material_z );
      this.scene.add( line_z );
    }

    createText(string = 'Your 3D Text', position = {x: 0, y: 0, z: 0}) {
      // Create a div element
      const element = document.createElement('div');
      element.className = 'text-label';
      element.textContent = string;
  
      // Set the CSS styles for the text
      element.style.position = 'absolute';
      element.style.color = 'white';
      element.style.fontSize = '50px';
      element.style.transform = 'translate(-50%, -50%)';
  
      // Append the element to the CSS3DRenderer's DOM element
      this.cssRenderer.domElement.appendChild(element);
  
      // Create a CSS3DObject to position the element in 3D space
      const object = new THREE.CSS3DObject(element);
      object.position.set(position.x, position.y, position.z);

      object.scale.set(0.0025, 0.0025, 0.0025);


      this.scene.add(object);
  
      return object;
  }
  

    createCube(scale, color = 0x00ff00) {
        const geometry = new THREE.BoxGeometry( scale, scale, scale ); 
        const material = new THREE.MeshBasicMaterial( {color: color} ); 
        this.cube = new THREE.Mesh( geometry, material ); 
        this.scene.add( this.cube );
    }

    createCubeGhost(scale, color = 0x00ff00, {x, y, z}) {
      const geometry = new THREE.BoxGeometry( scale, scale, scale ); 
      const material = new THREE.MeshBasicMaterial( {color: color} ); 
      const cube = new THREE.Mesh( geometry, material ); 
      cube.position.set(x, y, z);
      this.scene.add( cube );
  }

    moveCube(x, y, z) {
        this.createCubeGhost(0.08, 0xAAAAAA, {x, y, z})

        const targetPosition = new THREE.Vector3(x, y, z);
        const smoothingFactor = .1; // Adjust this value between 0 and 1 for desired smoothness
    
        // In your animation loop:
        this.cube.position.set(x, y, z);
    }

    getCubePosition() {
        return this.cube.position;
    }
}