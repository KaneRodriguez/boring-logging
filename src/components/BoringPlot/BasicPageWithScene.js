import * as React from 'react';
import * as BABYLON from 'babylonjs'
import Scene from './BabylonScene'; // import the component above linking to file we just created.

var ScatterPlot = function (dimensions, labels, scene) {
	
    this.scene = scene;
	this.dimensions = {width:100, height:100, depth:100};

    if (dimensions.length>0){
        if(dimensions[0] != undefined) 
            this.dimensions.width = parseFloat(dimensions[0]);
        if(dimensions[1] != undefined) 
            this.dimensions.height = parseFloat(dimensions[1]);
        if(dimensions[2] != undefined) 
            this.dimensions.depth = parseFloat(dimensions[2]);
    }
    
    this.labelsInfo = {x:[""], y:[""], z:[""]};

    if(Object.keys(labels).length>0){
        if(labels.x != undefined && Array.isArray(labels.x))
            this.labelsInfo.x = labels.x;
        if(labels.y != undefined && Array.isArray(labels.y))
            this.labelsInfo.y = labels.y;
        if(labels.z != undefined && Array.isArray(labels.z))
            this.labelsInfo.z = labels.z;
    }

    this.axis = [];

    //infos for dispose;
	this._materials = [];
    this._meshes = [];
    this._textures = [];

    //the figure
    this.shape = null;

    //the entire scatterPlot
    this.mesh = new BABYLON.Mesh("scatterPlot", this.scene);
	
    //internals
	this._depth = this.dimensions.depth/2, 
	this._width = this.dimensions.width/2,
	this._height = this.dimensions.height/2, 
	this._a = this.labelsInfo.y.length,
	this._b = this.labelsInfo.x.length,
	this._c = this.labelsInfo.z.length;
    this._color = new BABYLON.Color3(0.6,0.6,0.6);
	this._defPos = this.mesh.position.clone();

    this._addGrid = function (width, height, linesHeight, linesWidth, position, rotation) {
		
        var stepw = 2*width/linesWidth,
        steph = 2*height/linesHeight;
        var verts = [];

        //width
        for ( var i = -width; i <= width; i += stepw ) {
            verts.push([new BABYLON.Vector3( -height, i,0 ), new BABYLON.Vector3( height, i,0 )]);
        }
        
        //height
        for ( var i = -height; i <= height; i += steph ) {
            verts.push([new BABYLON.Vector3( i,-width,0 ), new BABYLON.Vector3( i, width, 0 )]);
        }

        this._BBJSaddGrid(verts, position, rotation);   
	};

    this._BBJSaddGrid = function (verts, position, rotation){

        var line = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: verts, updatable: false}, this.scene); 
        line.color = this._color;
        
        line.position = position;
        line.rotation = rotation;
	    line.parent = this.mesh;
        this.axis.push(line);
        this._meshes.push(line);
    };

    this._addLabel = function (length, data, axis, position) { 
        
        var diff = 2*length/data.length,
        p = new BABYLON.Vector3.Zero(),
        parent = new BABYLON.Mesh("label_"+axis, this.scene);

        for ( var i = 0; i < data.length; i ++ ) {
            var label = this._BBJSaddLabel(data[i]);
            label.position = p.clone();

            switch(axis.toLowerCase()){
                case "x":
                    p.subtractInPlace(new BABYLON.Vector3(diff,0,0));
                    break;
                case "y":
                    p.addInPlace(new BABYLON.Vector3(0, diff, 0));
                    break;
                case "z":
                    p.subtractInPlace(new BABYLON.Vector3(0,0,diff));
                    break;
            }
            label.parent =  parent;
        }
        parent.position = position;
        parent.parent = this.mesh;
        this._meshes.push(parent);
    };

    this._BBJSaddLabel = function(text){

        const planeTexture = new BABYLON.DynamicTexture("dynamic texture", 512, this.scene, true, BABYLON.DynamicTexture.TRILINEAR_SAMPLINGMODE);
        planeTexture.drawText(text, null, null, "normal 240px Helvetica", "black", "transparent", true);

        var material = new BABYLON.StandardMaterial("outputplane", this.scene);
        material.emissiveTexture = planeTexture;
        material.opacityTexture = planeTexture;
        material.backFaceCulling = true;
        material.disableLighting = true;
        material.freeze();
        
        var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 10, this.scene, false);
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.material = material;

        this._meshes.push(outputplane);
        this._materials.push(material);
        this._textures.push(planeTexture);

        return outputplane;           
    };
    
    this.setColor = function (color3){
        if(this.axis.length>0){
            for(var i=0;i<this.axis.length;i++){
                this.axis[i].color = color3;
            }    
        }
    };

    this.setPosition = function (vector3){
        if(this.mesh){
            this.mesh.position = vector3;
        }
    };

    this.setScaling = function (vector3){
        if(this.mesh){
            this.mesh.scaling = vector3;
        }
    };

    this.draw = function (vector3_array, use_objects = false, gridMaterial = false, convertToFlatShadedMesh = false){
        var points = [];
        if(vector3_array.length > 0){
            for(var i=0;i<vector3_array.length;i++){
                points.push(new BABYLON.Vector3(
                    vector3_array[i].x*(this.dimensions.width/this._b),
                    vector3_array[i].y*(this.dimensions.height/this._a),
                    vector3_array[i].z*(this.dimensions.depth/this._c)
                ));       
            }
        }
        
        if(points.length>0){
			this._defPos = this.mesh.position.clone();
			this.mesh.position = new BABYLON.Vector3(this._width,this._height,this._depth);
			
            if(use_objects){
                var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 1, this.scene); 
                var SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);
                SPS.addShape(sphere, points.length);
                SPS.buildMesh();
                sphere.dispose(); 
               
                SPS.initParticles = function(points,altitude) {
                    var p = 0;
                    for(var i=0;i<points.length;i++){
                        
                        SPS.particles[p].position.x = points[i].x;
                        SPS.particles[p].position.y = points[i].y;
                        SPS.particles[p].position.z = points[i].z;

                        SPS.particles[p].scale.x = vector3_array[i].y/1.5;
                        SPS.particles[p].scale.y = vector3_array[i].y/1.5;
                        SPS.particles[p].scale.z = vector3_array[i].y/1.5;
                       
                        SPS.particles[p].color.r = 1.0;
                        SPS.particles[p].color.g = 1-vector3_array[i].y/altitude;
                        SPS.particles[p].color.b = 0.5;
                        SPS.particles[p].color.a = 1.0;
                        p++;
                    }
                };

                // init all particle values and set them once to apply textures, colors, etc
                SPS.initParticles(points, this._a);
                SPS.setParticles();            
                SPS.isAlwaysVisible = true;
                SPS.computeParticleRotation = false;
                SPS.computeParticleColor = false;
                SPS.computeParticleTexture = false;
                SPS.mesh.position.subtractInPlace(this.mesh.position);
                SPS.mesh.parent = this.mesh;
                this._meshes.push(SPS);
                this.shape = SPS;
            }
            else
            {
                if(gridMaterial){
					var mat = new BABYLON.GridMaterial("grid", this.scene);	
                    mat.gridRatio = 2;
                    mat.majorUnitFrequency = 1;
                    mat.minorUnitVisibility = 0.1;
                    mat.opacity = 0.98;
                    mat.mainColor = new BABYLON.Color3(1, 1, 1);
	                mat.lineColor = new BABYLON.Color3(0,0,0);  
                }else{
                    var mat = new BABYLON.StandardMaterial("standard", this._scene);
                    mat.specularColor = new BABYLON.Color3();        
                }

                mat.backFaceCulling = false;
				
                var points_chunk = this._chunk(points, this._c-1);                
                
                var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", points_chunk, false, false, 0,  this.scene, true, BABYLON.Mesh.BACKSIDE);
                ribbon.material = mat;  

                var vertexData = new BABYLON.VertexData(); 
                var pdata = ribbon.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                
                var faceColors=[];
                for(var i=0;i<pdata.length;i+=3)
                {
                    var coef = (1-pdata[i+1]/this._a/8);
                    faceColors.push(1,coef,0.5,1);
                }
                
                vertexData.colors = faceColors; 
                vertexData.applyToMesh(ribbon, true);
                ribbon.useVertexColors = true;

                if(convertToFlatShadedMesh){
                    ribbon.convertToFlatShadedMesh();       
                }
                
                ribbon.position.subtractInPlace(this.mesh.position);
                ribbon.parent = this.mesh;
                this._meshes.push(ribbon);
                this._materials.push(mat);
                this.shape = ribbon;
            }
			this.mesh.position = this._defPos;
        }        
    };

    this._chunk = function (arr, chunkSize) {
        var R = [];
        for (var i=0,len=arr.length; i<len; i+=chunkSize)
            R.push(arr.slice(i,i+chunkSize));
        return R;
    };

    this.dispose = function (allmeshes = false){
        if(this.shape!=null){
            if(this.shape.material != undefined)
                this.shape.material.dispose();
            this.shape.dispose();
            this.shape = null;
        }
        if(allmeshes){
            if(this._textures.length>0){
                for(var i=0;i<this._textures.length;i++){
                    this._textures[i].dispose();
                }
            }
            if(this._materials.length>0){
                for(var i=0;i<this._materials.length;i++){
                    this._materials[i].dispose();
                }
            }
            if(this._meshes.length>0){
                for(var i=0;i<this._meshes.length;i++){
                    this._meshes[i].dispose();
                }
            }
            if(this.mesh!=null){
                if(this.mesh.material != null)
                    this.mesh.material.dispose();
                this.mesh.dispose();           
            }
            this._meshes = [];
            this._materials = [];
            this._textures = [];
            this.mesh = null;
            delete this;
        }
    }

    //create items
	this._addGrid(this._height, this._width, this._b, this._a, new BABYLON.Vector3(0,0,-this._depth), BABYLON.Vector3.Zero());
    this._addGrid(this._depth, this._width, this._b, this._c, new BABYLON.Vector3(0,-this._height,0), new BABYLON.Vector3(Math.PI/2,0,0));
    this._addGrid(this._height, this._depth, this._c, this._a, new BABYLON.Vector3(-this._width,0,0), new BABYLON.Vector3(0,Math.PI/2,0));				
    
    this._addLabel(this._width, this.labelsInfo.x, "x", new BABYLON.Vector3(this._width,-(this._height+2),-this._depth));
    this._addLabel(this._height, this.labelsInfo.y, "y", new BABYLON.Vector3(this._width,-this._height,-(this._depth+4)));
    this._addLabel(this._depth, this.labelsInfo.z, "z", new BABYLON.Vector3(this._width+2,-(this._height+2),this._depth));

    return this;
}

export default class BasicPageWithScene extends React.Component {
    onSceneMount = (e) => {
        const { canvas, scene, engine } = e;

        var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
  
        var camera = new BABYLON.ArcRotateCamera("Camera", 0.33, 1.33, 350, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        //scatterPlot
        var scatterPlot = new ScatterPlot(
            //dimensions - width, height, depth
            [],
            //labels value - x axis, y axis, z axis
            {
                x: ["", "1", "2", "3"],
                y: ["", "1", "2", "3"],
                z: ["", "3", "2", "1"]  
            }, scene);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    render() {               
        return (
            <div>
                <Scene 
                adaptToDeviceRatio={true} 
                onSceneMount={this.onSceneMount} />
            </div>
        )
    }
}