import * as React from 'react';
import * as BABYLON from 'babylonjs'
import Scene from './BabylonScene'; // import the component above linking to file we just created.
import * as $ from 'jquery'
import * as GUI from 'babylonjs-gui';

export default class PageWithScene extends React.Component {
    onSceneMount = (e) => {
        const { canvas, scene, engine } = e;
        var inputData =[{"year":2017,"t1":29,"t2":29,"t3":28,"t4":27,"t5":27,"t6":26,"t7":26,"t8":26,"t9":26,"t10":27,"t11":29,"t12":29,"t13":28,"t14":28,"t15":29,"t16":31,"t17":32,"t18":33,"t19":34,"t20":35,"t21":35,"t22":35,"t23":36,"t24":37,"t25":37,"t26":35,"t27":35,"t28":34,"t29":34,"t30":33,"t31":31}, {"year":2016,"t1":28,"t2":28,"t3":27,"t4":26,"t5":26,"t6":25,"t7":25,"t8":25,"t9":25,"t10":26,"t11":27,"t12":27,"t13":28,"t14":28,"t15":29,"t16":30,"t17":31,"t18":32,"t19":33,"t20":34,"t21":34,"t22":35,"t23":36,"t24":37,"t25":36,"t26":34,"t27":34,"t28":33,"t29":33,"t30":32,"t31":31}, {"year":2015,"t1":27,"t2":27,"t3":27,"t4":26,"t5":25,"t6":25,"t7":25,"t8":25,"t9":25,"t10":25,"t11":27,"t12":27,"t13":27,"t14":27,"t15":28,"t16":29,"t17":30,"t18":31,"t19":32,"t20":33,"t21":33,"t22":34,"t23":35,"t24":36,"t25":35,"t26":34,"t27":33,"t28":32,"t29":32,"t30":31,"t31":30}, {"year":2014,"t1":27,"t2":27,"t3":27,"t4":26,"t5":25,"t6":25,"t7":25,"t8":25,"t9":25,"t10":25,"t11":26,"t12":26,"t13":27,"t14":26,"t15":27,"t16":28,"t17":29,"t18":30,"t19":31,"t20":32,"t21":32,"t22":33,"t23":35,"t24":35,"t25":34,"t26":33,"t27":32,"t28":31,"t29":31,"t30":30,"t31":29},{"year":2013,"t1":27,"t2":27,"t3":27,"t4":26,"t5":25,"t6":25,"t7":25,"t8":25,"t9":26,"t10":25,"t11":27,"t12":27,"t13":27,"t14":27,"t15":28,"t16":29,"t17":30,"t18":31,"t19":32,"t20":33,"t21":33,"t22":34,"t23":35,"t24":36,"t25":35,"t26":34,"t27":33,"t28":32,"t29":32,"t30":31,"t31":30}, {"year":2012,"t1":28,"t2":28,"t3":27,"t4":26,"t5":26,"t6":25,"t7":25,"t8":25,"t9":25,"t10":26,"t11":27,"t12":27,"t13":28,"t14":28,"t15":29,"t16":30,"t17":31,"t18":32,"t19":33,"t20":34,"t21":34,"t22":35,"t23":36,"t24":37,"t25":36,"t26":34,"t27":34,"t28":33,"t29":33,"t30":32,"t31":31}, {"year":2011,"t1":29,"t2":29,"t3":28,"t4":27,"t5":27,"t6":26,"t7":26,"t8":26,"t9":26,"t10":27,"t11":29,"t12":29,"t13":28,"t14":28,"t15":29,"t16":31,"t17":32,"t18":33,"t19":34,"t20":35,"t21":35,"t22":35,"t23":36,"t24":37,"t25":37,"t26":35,"t27":35,"t28":34,"t29":34,"t30":33,"t31":31}, {"year":2010,"t1":30,"t2":30,"t3":29,"t4":28,"t5":28,"t6":27,"t7":27,"t8":27,"t9":27,"t10":28,"t11":30,"t12":30,"t13":29,"t14":29,"t15":30,"t16":31,"t17":32,"t18":34,"t19":35,"t20":36,"t21":36,"t22":36,"t23":37,"t24":36,"t25":36,"t26":35,"t27":36,"t28":34,"t29":33,"t30":32,"t31":30},{"year":2009,"t1":31,"t2":31,"t3":30,"t4":29,"t5":29,"t6":28,"t7":28,"t8":28,"t9":28,"t10":29,"t11":31,"t12":31,"t13":30,"t14":30,"t15":31,"t16":32,"t17":33,"t18":34,"t19":35,"t20":36,"t21":37,"t22":37,"t23":37,"t24":36,"t25":35,"t26":35,"t27":34,"t28":33,"t29":32,"t30":31,"t31":29}, {"year":2008,"t1":32,"t2":32,"t3":31,"t4":30,"t5":30,"t6":29,"t7":29,"t8":29,"t9":29,"t10":30,"t11":32,"t12":32,"t13":31,"t14":31,"t15":32,"t16":33,"t17":34,"t18":35,"t19":36,"t20":37,"t21":37,"t22":37,"t23":37,"t24":37,"t25":35,"t26":35,"t27":34,"t28":32,"t29":31,"t30":30,"t31":29}, {"year":2007,"t1":32,"t2":32,"t3":31,"t4":30,"t5":30,"t6":29,"t7":29,"t8":29,"t9":29,"t10":30,"t11":32,"t12":32,"t13":31,"t14":31,"t15":32,"t16":33,"t17":34,"t18":35,"t19":36,"t20":37,"t21":37,"t22":37,"t23":37,"t24":37,"t25":35,"t26":35,"t27":34,"t28":32,"t29":31,"t30":30,"t31":29}, {"year":2006,"t1":30,"t2":30,"t3":29,"t4":28,"t5":28,"t6":27,"t7":27,"t8":27,"t9":27,"t10":28,"t11":30,"t12":30,"t13":29,"t14":29,"t15":30,"t16":31,"t17":32,"t18":34,"t19":35,"t20":36,"t21":36,"t22":36,"t23":37,"t24":36,"t25":36,"t26":35,"t27":36,"t28":34,"t29":33,"t30":32,"t31":30}];
        var VR_mode = false;
        let W = Screen.width, H = Screen.height, D = Screen.depth;


        var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
          
        var camera = new BABYLON.ArcRotateCamera("Camera", 0.33, 1.33, 350, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        camera.fov = 1;
    
        if (navigator.getVRDisplays) 
            var camera2 = new BABYLON.WebVRFreeCamera("camera1", new BABYLON.Vector3(0, 1, 0), scene, false, { trackPosition: true });
        else 
            var camera2 = new BABYLON.VRDeviceOrientationArcRotateCamera("vrCam", 0.76, 1.41, 350, BABYLON.Vector3.Zero(), scene);
        camera2.attachControl(canvas, true);
    
        var scatterPlot = new this.ScatterPlot([W,H,D],{
            x: [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006],
            y: ["", "25°", "26°", "27°", "28°", "29°", "30°", "31°", "32°", "33°", "34°", "35°", "36°", "37°", "38°", "39°", "40°"],
            z: ["",31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,"09","08","07","06","05","04","03","02","01"]  
        }, scene);
    
        
        var sp_labels = scatterPlot.labelsInfo;
    
        //set points
        var points = [];
        for(var i=0;i<inputData.length;i++)
        {
            var x = Object.keys(sp_labels['x']).filter(function(k) { return sp_labels['x'][k] == inputData[i]["year"];});
            var xp = sp_labels['x'].length - x[0];
            var z = 1;
    
            for(var j in inputData[i])
            {
                if(j=="year") continue;
                var y = inputData[i][j]-24;
                points.push(new BABYLON.Vector3(this.roundToTwo(xp),this.roundToTwo(y),this.roundToTwo(z)));        
                z++;
            }
        }
        
        scatterPlot.draw(points);
    
        //GUI
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        var panel3 = new GUI.StackPanel();
        panel3.width = "220px";
        panel3.fontSize = "16px";
        panel3.left = "10px";
        panel3.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(panel3);
    
        var header = new GUI.TextBlock();
        header.text = "Display:";
        header.height = "40px";
        header.color = "black";
        header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.paddingTop = "10px";
        panel3.addControl(header); 
    
        var button1 = this.getBut("plain color");
        button1.onPointerUpObservable.add(function() {
            scatterPlot.dispose();
            scatterPlot.draw(points);
        });
        panel3.addControl(button1);
    
        var button2 = this.getBut("3d objects");
        button2.onPointerUpObservable.add(function() {
            scatterPlot.dispose();
            scatterPlot.draw(points, true);
        });
        panel3.addControl(button2);
    
        var button3 = this.getBut("grid mat");
        button3.onPointerUpObservable.add(function() {
            scatterPlot.dispose();
            scatterPlot.draw(points, false, true);
        });
        panel3.addControl(button3);
    
        var button4 = this.getBut("flat shaded");
        button4.onPointerUpObservable.add(function() {
            scatterPlot.dispose();
            scatterPlot.draw(points, false, false, true);
        });
        panel3.addControl(button4);
    
        var header = new GUI.TextBlock();
        header.text = "View:";
        header.height = "40px";
        header.color = "black";
        header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.paddingTop = "10px";
        panel3.addControl(header); 
    
        var button5 = this.getBut("3D");
        button5.onPointerUpObservable.add(function() {
            camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
            camera.attachControl(canvas, true);  
        });
        panel3.addControl(button5);
    
        var button6 = this.getBut("2D");
        button6.onPointerUpObservable.add(function() {
            camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
            
            camera.orthoTop = 200;
            camera.orthoBottom = -200;
            camera.orthoLeft = -300;
            camera.orthoRight = 300; 
            camera.beta = Math.PI/2;
            if(camera.alpha%(Math.PI/2)!=0)
                camera.alpha = 0;  
            else
                camera.alpha += Math.PI/2;
                        
            camera.detachControl(canvas);
        });
        panel3.addControl(button6);
    
        var button7 = this.getBut("VR");
        button7.onPointerUpObservable.add(function() {
            engine.switchFullscreen(true);
        });
        panel3.addControl(button7);
    
        var header = new GUI.TextBlock();
        header.text = "Color:";
        header.height = "40px";
        header.color = "black";
        header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.paddingTop = "10px";
        panel3.addControl(header); 
    
        var picker = new GUI.ColorPicker();
        picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        picker.value = new BABYLON.Color3(0.6,0.6,0.6);
        picker.height = "100px";
        picker.width = "100px";
        picker.onValueChangedObservable.add(function(value) { // value is a color3
            scatterPlot.setColor(value);
        });    
        panel3.addControl(picker);  
        
        //scene.createDefaultVRExperience();
     
        var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
        $(document).on(screen_change_events, function () {
            if(VR_mode){
                camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
                camera.attachControl(canvas, true);
                scene.activeCamera = camera;       
            }else{
                camera.detachControl(canvas); 
                scene.activeCamera = camera2;
            }
             VR_mode = !VR_mode;
        });
        //var scene = createScene()

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }
    
        // return scene;

    enterVR = () => {}
    
    exitVR = () => {}
    
    getBut = (text) => {
        var button = GUI.Button.CreateSimpleButton("but", text);
        button.width = "100px";
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.height = "30px";
        button.color = "black";
    
        return button;
    }
    ScatterPlot = (dimensions, labels, scene) => {
        
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
    
    roundToTwo = (num) => {    
        return +(Math.round(num + "e+2")  + "e-2");
    };
    
    showWorldAxis = (size) => {
        const {scene} = this.props
        var makeTextPlane = function(text, color, size) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
            var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
        return plane;
         };
        var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
          BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
          new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
          ], scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        var xChar = makeTextPlane("X", "red", size / 10);
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
            ], scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        var yChar = makeTextPlane("Y", "green", size / 10);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
            ], scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
        var zChar = makeTextPlane("Z", "blue", size / 10);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    }

    render() {               
        return (
            <div>
                <Scene adaptToDeviceRatio={true} onSceneMount={this.onSceneMount} width={Screen.width} height={Screen.height}/>
            </div>
        )
    }
}