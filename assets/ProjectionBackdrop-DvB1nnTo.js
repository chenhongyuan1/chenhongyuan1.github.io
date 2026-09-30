import{r as e}from"./rolldown-runtime-hePW80VL.js";import{a as t,r as n,t as r}from"./index-2ZzmY6AW.js";import{$ as i,Bt as a,D as o,Dt as s,E as c,Ft as l,Ht as u,It as d,Lt as f,Nt as p,O as m,Ot as h,Tt as g,W as _,Wt as v,bt as y,dt as b,ft as ee,g as x,h as S,it as C,l as w,m as T,nt as E,pt as D,s as O,t as te,tt as k,w as A,xt as j,zt as M}from"./three.module-BcSExYyK.js";/* empty css                      */var N=e(t(),1),P=n(),F={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},I=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},L=new b(-1,1,1,-1,0,1),R=new class extends w{constructor(){super(),this.setAttribute(`position`,new A([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new A([0,2,0,0,2,0],2))}},z=class{constructor(e){this._mesh=new k(R,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,L)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},B=class extends I{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof h?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=d.clone(e.uniforms),this.material=new h({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new z(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},V=class extends I{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},ne=class extends I{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},re=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new M);this._width=n.width,this._height=n.height,t=new v(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:o}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new B(F),this.copyPass.material.blending=0,this.clock=new T}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}V!==void 0&&(r instanceof V?n=!0:r instanceof ne&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new M);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},H=class extends I{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new S}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},U={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new S(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},W=class e extends I{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new M(256,256):new M(e.x,e.y),this.clearColor=new S(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new v(i,s,{type:o}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new v(i,s,{type:o});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new v(i,s,{type:o});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),s=Math.round(s/2)}let c=U;this.highPassUniforms=d.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new h({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new M(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new a(1,1,1),new a(1,1,1),new a(1,1,1),new a(1,1,1),new a(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=d.clone(F.uniforms),this.blendMaterial=new h({uniforms:this.copyUniforms,vertexShader:F.vertexShader,fragmentShader:F.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new S,this._oldClearAlpha=1,this._basic=new E,this._fsQuad=new z(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new M(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new h({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new M(.5,.5)},direction:{value:new M(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new h({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};W.BlurDirectionX=new M(1,0),W.BlurDirectionY=new M(0,1);var G={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},K=class extends I{constructor(){super(),this.uniforms=d.clone(G.uniforms),this.material=new j({name:G.name,uniforms:this.uniforms,vertexShader:G.vertexShader,fragmentShader:G.fragmentShader}),this._fsQuad=new z(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},x.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function q(e,t,n,r=64){let i=new D(e,t,r,r);return i.rotateX(-Math.PI/2),new k(i,n)}function J(e){let t=new c,n=new O(1.15,.045,.42),r=new k(n,e);r.position.y=.0225,t.add(r);let i=new O(.09,.072,.07);for(let n=0;n<3;n+=1)for(let r=0;r<10;r+=1){let a=new k(i,e);a.position.set(-.45899999999999996+r*.102,.08299999999999999,-.08+n*.08),t.add(a)}return t.position.set(0,0,1.28),t}var Y=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,ie=`
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProjectionIntensity;
uniform float uReflectionGain;
uniform float uHighlightBoost;
uniform float uLumaVisibilityThreshold;
uniform float uInvertColor;
uniform float uHalftone;
uniform float uToneCut;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p = p * 2.0 + vec2(17.0, 31.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  float t = uTime;

  vec2 flow = vec2(t * 0.19, t * 0.13);
  vec2 q = vec2(
    fbm(p * 1.05 + flow),
    fbm(p * 1.05 + vec2(-flow.y * 1.1, flow.x * 0.9))
  );
  vec2 w = p + q * 0.62;

  float nA = 0.5 + 0.5 * fbm(w * 2.15 + flow * 0.8);
  float nB = 0.5 + 0.5 * fbm(w * 4.8 + vec2(-flow.x * 0.5, flow.y * 0.35));
  float ridge = 1.0 - abs(2.0 * nB - 1.0);
  float mask = clamp(0.18 + 1.12 * (0.58 * nA + 0.42 * ridge), 0.0, 1.0);
  float edgeFade = 1.0 - clamp(length(p) * 0.7, 0.0, 1.0);
  float intensity = pow(clamp(mask * (0.72 + edgeFade * 0.45), 0.0, 1.0), 1.05);

  float base = nA * 0.82 + ridge * 0.18;
  vec3 col = vec3(
    0.18 + 0.86 * (0.5 + 0.5 * cos(6.28318 * (base + 0.02 + t * 0.07))),
    0.14 + 0.9  * (0.5 + 0.5 * cos(6.28318 * (base + 0.37 + t * 0.06))),
    0.2  + 0.9  * (0.5 + 0.5 * cos(6.28318 * (base + 0.72 + t * 0.065)))
  );
  col *= intensity;

  float highlight = pow(clamp((nA * 1.1 + ridge * 0.75) - 1.1, 0.0, 1.0), 2.2);
  col = mix(col, vec3(1.0, 0.96, 0.92), highlight * vec3(0.22, 0.16, 0.1));
  vec3 tex = clamp(col, 0.0, 1.0);

  if (uInvertColor > 0.5) {
    tex = vec3(1.0) - tex;
  }

  if (uToneCut > 0.5) {
    float toneLevels = 5.0;
    tex = floor(tex * (toneLevels - 1.0) + 0.5) / (toneLevels - 1.0);
  }

  float lum = dot(tex, vec3(0.2126, 0.7152, 0.0722));
  float lumaStart = clamp(uLumaVisibilityThreshold, 0.0, 1.0);
  float lumaEnd = min(1.0, lumaStart + 0.1);
  float darkMask = 1.0;
  if (lumaStart > 1e-4) {
    darkMask = smoothstep(lumaStart, lumaEnd, lum);
  }

  if (uHalftone > 0.5) {
    vec2 hUv = vUv * vec2(180.0, 120.0);
    vec2 hCell = fract(hUv) - 0.5;
    float dotRadius = mix(0.02, 0.45, clamp(lum, 0.0, 1.0));
    float dotMask = 1.0 - smoothstep(dotRadius, dotRadius + 0.035, length(hCell));
    tex *= dotMask * darkMask;
  }

  float hi = smoothstep(0.5, 1.0, lum);
  tex *= darkMask;
  tex *= mix(1.0, uHighlightBoost, hi);
  tex *= max(0.0, uProjectionIntensity) * max(0.0, uReflectionGain);

  gl_FragColor = vec4(tex, 1.0);
}
`;function X(e=1024,t=576){let n=Math.max(2,Math.floor(e)),r=Math.max(2,Math.floor(t)),i=new s,a=new b(-1,1,1,-1,0,1),o=new h({vertexShader:Y,fragmentShader:ie,uniforms:{uTime:{value:0},uProjectionIntensity:{value:.5},uReflectionGain:{value:1},uHighlightBoost:{value:1.65},uLumaVisibilityThreshold:{value:.3},uInvertColor:{value:0},uHalftone:{value:0},uToneCut:{value:0}},depthTest:!1,depthWrite:!1}),c=new k(new D(2,2),o);i.add(c);let l=new v(n,r,{minFilter:_,magFilter:_,format:y,type:f,colorSpace:g,depthBuffer:!1,stencilBuffer:!1});return{texture:l.texture,render(e,t){let n=e.getRenderTarget(),r=e.xr.enabled;e.xr.enabled=!1,o.uniforms.uTime.value=t,e.setRenderTarget(l),e.clear(),e.render(i,a),e.setRenderTarget(n),e.xr.enabled=r},setEffects(e){o.uniforms.uProjectionIntensity.value=e.projectionIntensity,o.uniforms.uReflectionGain.value=e.reflectionGain,o.uniforms.uHighlightBoost.value=e.highlightBoost,o.uniforms.uLumaVisibilityThreshold.value=e.lumaVisibilityThreshold,o.uniforms.uInvertColor.value=+!!e.invertColor,o.uniforms.uHalftone.value=+!!e.halftone,o.uniforms.uToneCut.value=+!!e.toneCut},dispose(){c.geometry.dispose(),o.dispose(),l.dispose()}}}function ae(e){let t=new D(2,1.3),n=new E({map:e,toneMapped:!1,side:2}),r=new k(t,n);return r.position.set(0,1,.5),{mesh:r}}function Z(e,t,n){let r=new re(e);r.addPass(new H(t,n));let i=new W(new M(window.innerWidth,window.innerHeight),.22,.42,.72);return r.addPass(i),r.addPass(new K),{composer:r,bloomPass:i}}function oe(e,t,n){let r=new te({antialias:!0,powerPreference:`high-performance`});r.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),r.setSize(e.clientWidth,e.clientHeight),r.outputColorSpace=g,r.toneMapping=4,r.toneMappingExposure=.78,r.shadowMap.enabled=!0,r.shadowMap.type=2;let a=e=>{A||(e.preventDefault(),n(),O!==null&&cancelAnimationFrame(O))};r.domElement.addEventListener(`webglcontextlost`,a),e.appendChild(r.domElement);let o=new s;o.background=new S(1052692);let c=new ee(45,e.clientWidth/Math.max(1,e.clientHeight),.1,100);c.position.set(0,1.2,5.5),c.lookAt(0,.8,0);let l=X(1024,576),d=X(1024,576);l.setEffects({projectionIntensity:1,reflectionGain:1,highlightBoost:1,lumaVisibilityThreshold:0,invertColor:!1,halftone:!1,toneCut:!1}),l.render(r,0),d.render(r,0);let{mesh:f}=ae(l.texture),h=new C({color:1710626,roughness:.88,metalness:.06}),_=q(100,100,h,1);_.receiveShadow=!0;let v=J(h);v.traverse(e=>{e instanceof k&&(e.receiveShadow=!0,e.castShadow=!0)}),f.castShadow=!1,o.add(f,_,v);let y=new p(16777215,220);y.decay=6,y.distance=35,y.angle=Math.PI/3.1,y.penumbra=.58,y.map=d.texture,y.castShadow=!0,y.shadow.mapSize.set(1024,1024),y.shadow.bias=-2e-4,y.shadow.normalBias=.02,y.position.set(0,1,.52),y.target.position.set(0,.02,1.15),o.add(y),o.add(y.target);let b=new m(16777215,394760,.04);b.position.set(0,10,0),o.add(b);let{composer:x,bloomPass:w}=Z(r,o,c),T={projectionIntensity:1.64,reflectionGain:1,blurRadiusPx:64,highlightBoost:1.65,lumaVisibilityThreshold:.12,invertColor:!1,halftone:!0,toneCut:!1};function E(){let e=Math.max(0,T.projectionIntensity)*Math.max(0,T.reflectionGain);y.intensity=220*e,h.envMapIntensity=.35*Math.max(.1,T.reflectionGain),w.radius=i.clamp(T.blurRadiusPx/128,0,1),w.strength=.22*Math.max(.2,T.highlightBoost),w.threshold=i.clamp(T.lumaVisibilityThreshold,0,1),d.setEffects({projectionIntensity:T.projectionIntensity,reflectionGain:T.reflectionGain,highlightBoost:T.highlightBoost,lumaVisibilityThreshold:T.lumaVisibilityThreshold,invertColor:T.invertColor,halftone:T.halftone,toneCut:T.toneCut})}let D=null,O=null,A=!1,j=0,M=performance.now(),N=!1,P=window.matchMedia(`(prefers-reduced-motion: reduce)`);E();function F(){if(O=null,A||document.hidden)return;let e=performance.now();P.matches||(j+=Math.min((e-M)/1e3,.1)),M=e;try{D||(l.render(r,j),d.render(r,j)),x.render(),N||(N=!0,t())}catch{n();return}(!P.matches||D instanceof u)&&(O=requestAnimationFrame(F))}function I(){!A&&!document.hidden&&O===null&&(O=requestAnimationFrame(F))}function L(){O!==null&&cancelAnimationFrame(O),O=null,M=performance.now(),I()}function R(){let t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);c.aspect=t/n,c.position.z=Math.max(5.5,3.4/c.aspect),c.updateProjectionMatrix(),r.setSize(t,n),x.setSize(t,n),I()}let z=new ResizeObserver(R);return z.observe(e),document.addEventListener(`visibilitychange`,L),P.addEventListener(`change`,L),R(),{setMedia(e){D=e,N=!1;let t=f.material;t.map=e??l.texture,t.needsUpdate=!0,y.map=e??d.texture,I()},dispose(){A=!0,O!==null&&cancelAnimationFrame(O),z.disconnect(),document.removeEventListener(`visibilitychange`,L),P.removeEventListener(`change`,L),l.dispose(),d.dispose();let e=new Set;o.traverse(t=>{t instanceof k&&e.add(t.geometry)}),e.forEach(e=>e.dispose()),f.material.dispose(),h.dispose(),y.shadow.dispose(),x.passes.forEach(e=>e.dispose()),x.dispose(),r.domElement.removeEventListener(`webglcontextlost`,a),r.dispose(),r.forceContextLoss(),r.domElement.remove()}}}var Q=r(),$=`/images/projects/raze.png`;function se({onReady:e}){let t=(0,N.useRef)(null),n=(0,N.useRef)(e),r=(0,N.useRef)(null),i=(0,N.useRef)(null),a=(0,N.useRef)(0),o=(0,N.useRef)(!0),[s,c]=(0,N.useState)(!1),[d,f]=(0,N.useState)(!1),[p,m]=(0,N.useState)(`raze.png`),h=(0,N.useId)(),_=(0,N.useRef)(null);(0,N.useEffect)(()=>{n.current=e},[e]);function v(){let e=i.current;e&&(e.video?.pause(),e.video&&(e.video.removeAttribute(`src`),e.video.load()),e.texture.dispose(),e.url.startsWith(`blob:`)&&URL.revokeObjectURL(e.url),i.current=null)}async function y(){let e=++a.current;o.current=!0;try{let t=await new l().loadAsync($);if(e!==a.current||!r.current){t.dispose();return}t.colorSpace=g,r.current.setMedia(t),v(),i.current={texture:t,url:$},o.current=!1,m(`raze.png`)}catch{if(e!==a.current||!r.current)return;o.current=!1,m(`默认图片读取失败，可选择其他图片`),n.current?.()}}(0,N.useEffect)(()=>{let e=t.current;if(!e)return;let s=!0,c=()=>{s&&(f(!0),n.current?.())};try{r.current=oe(e,()=>{o.current||n.current?.()},c),y()}catch(e){console.error(`Projection scene initialization failed:`,e),c()}let l=()=>{let e=i.current?.video;e&&(document.hidden?e.pause():e.play().catch(()=>m(`视频播放暂停，请重新选择视频`)))};return document.addEventListener(`visibilitychange`,l),()=>{s=!1,a.current++,document.removeEventListener(`visibilitychange`,l),r.current?.dispose(),r.current=null,v()}},[]);async function b(e){let t=++a.current;o.current=!1;let n=URL.createObjectURL(e),s,c;try{if(e.type.startsWith(`video/`))s=document.createElement(`video`),s.muted=!0,s.loop=!0,s.playsInline=!0,await new Promise((e,t)=>{s.onloadeddata=()=>e(),s.onerror=()=>t(Error(`Video unreadable`)),s.src=n}),await s.play(),c=new u(s);else if(e.type.startsWith(`image/`))c=await new l().loadAsync(n);else throw Error(`Unsupported media`);if(c.colorSpace=g,t!==a.current||!r.current){s?.pause(),c.dispose(),URL.revokeObjectURL(n);return}r.current.setMedia(c),v(),i.current={texture:c,url:n,video:s},m(e.name)}catch{s?.pause(),c?.dispose(),URL.revokeObjectURL(n),t===a.current&&m(`无法读取此文件，请换一张图片或视频`)}}return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{ref:t,className:`projection-backdrop`,"aria-hidden":`true`,children:d&&(0,Q.jsx)(`p`,{className:`projection-backdrop__fallback`,children:`当前无法显示投影场景，请尝试开启浏览器硬件加速。`})}),!e&&(0,P.createPortal)((0,Q.jsxs)(`div`,{className:`scene-controls`,"data-open":s,onKeyDown:e=>{e.key===`Escape`&&(c(!1),_.current?.focus())},children:[(0,Q.jsx)(`button`,{ref:_,type:`button`,className:`scene-controls__toggle`,"aria-label":s?`收起屏幕设置`:`展开屏幕设置`,"aria-expanded":s,"aria-controls":h,title:`屏幕设置`,onClick:()=>c(e=>!e)}),(0,Q.jsxs)(`section`,{id:h,className:`scene-controls__panel`,"aria-label":`屏幕设置`,inert:!s,"aria-hidden":!s,children:[(0,Q.jsx)(`strong`,{children:`投影屏幕`}),(0,Q.jsx)(`p`,{className:`projection-controls__filename`,children:p}),(0,Q.jsxs)(`label`,{className:`scene-controls__upload`,children:[`更换图片或视频`,(0,Q.jsx)(`input`,{type:`file`,accept:`image/*,video/*`,onChange:e=>{let t=e.target.files?.[0];t&&b(t),e.target.value=``}})]}),(0,Q.jsx)(`button`,{type:`button`,className:`projection-controls__reset`,onClick:()=>void y(),children:`恢复默认画面`}),(0,Q.jsx)(`small`,{children:`画面同步投射到键盘与地面。文件仅在本机读取，视频静音循环播放。`})]})]}),document.body)]})}export{se as default};