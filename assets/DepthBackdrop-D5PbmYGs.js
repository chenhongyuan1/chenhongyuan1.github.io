import{r as e}from"./rolldown-runtime-hePW80VL.js";import{i as t,o as n,t as r}from"./index-D5HMd8PY.js";import{$ as i,Dt as a,Ot as o,Pt as s,d as c,f as l,pt as u,t as d,tt as f,zt as p}from"./three.module-BcSExYyK.js";/* empty css                      */var m=e(n(),1),h=t(),g=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,_=`
precision highp float;
uniform sampler2D photo;
uniform sampler2D heightMap;
uniform vec2 resolution;
uniform vec2 imageSize;
uniform vec2 light;
uniform float relief;
uniform float shadowAmount;
uniform float viewMode;
varying vec2 vUv;

vec2 photoUv(vec2 uv) {
  float screenAspect = resolution.x / resolution.y;
  float photoAspect = imageSize.x / imageSize.y;
  vec2 scale = vec2(min(screenAspect / photoAspect, 1.0), min(photoAspect / screenAspect, 1.0));
  return (uv - 0.5) * scale + 0.5;
}
float heightAt(vec2 uv) { return texture2D(heightMap, photoUv(uv)).r * relief; }
float detailAt(vec2 uv) { return dot(texture2D(photo, photoUv(uv)).rgb, vec3(0.2126, 0.7152, 0.0722)); }
void main() {
  float aspect = resolution.x / resolution.y;
  vec2 stepUv = vec2(1.0 / (128.0 * aspect), 1.0 / 128.0);
  float h = heightAt(vUv);
  float dx = heightAt(vUv + vec2(stepUv.x, 0.0)) - heightAt(vUv - vec2(stepUv.x, 0.0));
  float dy = heightAt(vUv + vec2(0.0, stepUv.y)) - heightAt(vUv - vec2(0.0, stepUv.y));
  dx += (detailAt(vUv + vec2(stepUv.x, 0.0)) - detailAt(vUv - vec2(stepUv.x, 0.0))) * 0.025;
  dy += (detailAt(vUv + vec2(0.0, stepUv.y)) - detailAt(vUv - vec2(0.0, stepUv.y))) * 0.025;
  vec3 normal = normalize(vec3(-dx * 32.0, -dy * 32.0, 1.0));
  vec3 position = vec3((vUv - 0.5) * vec2(aspect, 1.0) * 2.0, h);
  vec3 lamp = vec3((light - 0.5) * vec2(aspect, 1.0) * 2.0, relief + 0.55);
  vec3 toLight = lamp - position;
  vec3 direction = normalize(toLight);
  float visibility = 1.0;
  // March toward the light through the estimated surface, with a soft bias.
  for (int i = 1; i <= 24; i++) {
    float t = float(i) / 24.0;
    vec2 sampleUv = mix(vUv, light, t);
    float rayHeight = mix(h, lamp.z, t);
    float blocker = heightAt(sampleUv) - rayHeight;
    visibility = min(visibility, 1.0 - smoothstep(0.008, 0.065, blocker));
  }
  float diffuse = max(dot(normal, direction), 0.0);
  float attenuation = 1.05 / (1.0 + dot(toLight, toLight) * 1.4);
  float specular = pow(max(dot(normal, normalize(direction + vec3(0.0, 0.0, 1.0))), 0.0), 36.0) * 0.04;
  vec3 base = texture2D(photo, photoUv(vUv)).rgb;
  vec3 color = base * (0.20 + diffuse * attenuation * mix(1.0, visibility, shadowAmount));
  color += vec3(1.0, 0.95, 0.88) * specular * visibility;
  if (viewMode > 1.5) color = normal * 0.5 + 0.5;
  else if (viewMode > 0.5) color = vec3(h / max(relief, 0.001));
  gl_FragColor = vec4(color, 1.0);
}`,v=r(),y=`/images/projects/wallhaven-mlg9p1.png`;function b(e){let t=document.createElement(`canvas`);t.width=512,t.height=Math.max(1,Math.round(512*e.naturalHeight/e.naturalWidth));let n=t.getContext(`2d`);if(!n)throw Error(`Canvas unavailable`);n.filter=`blur(5px)`,n.drawImage(e,-8,-8,t.width+16,t.height+16);let r=n.getImageData(0,0,t.width,t.height);for(let e=0;e<t.height;e++)for(let n=0;n<t.width;n++){let a=(e*t.width+n)*4,o=(r.data[a]*.2126+r.data[a+1]*.7152+r.data[a+2]*.0722)/255,s=i.clamp((o*.7+e/t.height*.3-.5)*1.25+.5,0,1)*255;r.data[a]=r.data[a+1]=r.data[a+2]=s}return n.putImageData(r,0,0),new l(t)}function x({onReady:e,preparing:t}){let[n,r]=(0,m.useState)(!1),i=(0,m.useId)(),l=(0,m.useRef)(null),x=(0,m.useRef)(null),S=(0,m.useRef)(e);(0,m.useEffect)(()=>{S.current=e},[e]);let[C,w]=(0,m.useState)(y),[T,E]=(0,m.useState)(.1),[D,O]=(0,m.useState)(0),[k,A]=(0,m.useState)(0),[j,M]=(0,m.useState)(`正在准备光照…`),N=(0,m.useRef)({relief:T,shadows:D,view:k});return(0,m.useEffect)(()=>{N.current={relief:T,shadows:D,view:k}},[T,D,k]),(0,m.useEffect)(()=>()=>{C.startsWith(`blob:`)&&URL.revokeObjectURL(C)},[C]),(0,m.useEffect)(()=>{let e=x.current;if(!e)return;let t=!1,n=0,r,i,l,m,h,v,y=!1,w=window.matchMedia(`(prefers-reduced-motion: reduce)`),T=new p(.65,.65),E=T.clone(),D=!1,O=!1,k=()=>{!t&&!O&&(O=!0,S.current?.())},A=()=>{t||(y=!1,cancelAnimationFrame(n),r?.domElement.style.setProperty(`visibility`,`hidden`),e.dataset.render=`fallback`,M(`当前使用静态图片`),k())},j=t=>{D=!0;let n=e.getBoundingClientRect();T.set((t.clientX-n.left)/n.width,1-(t.clientY-n.top)/n.height),z()},P=()=>{D=!1,z()},F=new a,I=new c,L=0,R=i=>{if(n=0,t||document.hidden||!y||!r||!l)return;let a=Math.min((i-L)/1e3||.016,.1);L=i,!D&&!w.matches&&T.set(.5+Math.cos(i/3500)*.3,.5+Math.sin(i/3500)*.3),w.matches?E.copy(T):E.lerp(T,1-Math.exp(-a*9)),l.uniforms.light.value.copy(E),l.uniforms.relief.value=N.current.relief,l.uniforms.shadowAmount.value=N.current.shadows,l.uniforms.viewMode.value=N.current.view,r.render(F,I),y&&(e.dataset.render=`ready`,k(),w.matches||(n=requestAnimationFrame(R)))};function z(){!t&&!document.hidden&&!n&&y&&(n=requestAnimationFrame(R))}let B=()=>{cancelAnimationFrame(n),n=0,z()},V=e=>{e.preventDefault(),A()},H=new Image;return H.onload=()=>{if(!t)try{r=new d({antialias:!1,alpha:!0}),r.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),e.appendChild(r.domElement),r.domElement.addEventListener(`webglcontextlost`,V),i=new u(2,2),m=new s(H),m.needsUpdate=!0,h=b(H),l=new o({vertexShader:g,fragmentShader:_,uniforms:{photo:{value:m},heightMap:{value:h},resolution:{value:new p(1,1)},imageSize:{value:new p(H.naturalWidth,H.naturalHeight)},light:{value:E.clone()},relief:{value:N.current.relief},shadowAmount:{value:N.current.shadows},viewMode:{value:N.current.view}}}),F.add(new f(i,l)),r.debug.onShaderError=A,y=!0,v=new ResizeObserver(()=>{if(!r||!l)return;let{width:t,height:n}=e.getBoundingClientRect();r.setSize(Math.max(1,t),Math.max(1,n)),l.uniforms.resolution.value.set(Math.max(1,t),Math.max(1,n)),z()}),v.observe(e),M(`移动鼠标，观察光线掠过表面`),z()}catch{A()}},H.onerror=()=>{t||(M(`图片未能读取，请换一张图片`),k())},H.src=C,window.addEventListener(`pointermove`,j,{passive:!0}),window.addEventListener(`blur`,P),document.documentElement.addEventListener(`pointerleave`,P),document.addEventListener(`visibilitychange`,B),w.addEventListener(`change`,B),window.addEventListener(`input`,z),()=>{t=!0,H.onload=H.onerror=null,cancelAnimationFrame(n),v?.disconnect(),window.removeEventListener(`pointermove`,j),window.removeEventListener(`blur`,P),document.documentElement.removeEventListener(`pointerleave`,P),document.removeEventListener(`visibilitychange`,B),w.removeEventListener(`change`,B),window.removeEventListener(`input`,z),i?.dispose(),l?.dispose(),m?.dispose(),h?.dispose(),r?.domElement.removeEventListener(`webglcontextlost`,V),r?.dispose(),r?.forceContextLoss(),r?.domElement.remove()}},[C]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`div`,{ref:x,className:`depth-backdrop`,style:{backgroundImage:`url("${C}")`},"aria-hidden":`true`}),!t&&(0,h.createPortal)((0,v.jsxs)(`div`,{className:`scene-controls`,"data-open":n,onKeyDown:e=>{e.key===`Escape`&&(r(!1),l.current?.focus())},children:[(0,v.jsx)(`button`,{ref:l,type:`button`,className:`scene-controls__toggle`,"aria-label":n?`收起深度光照设置`:`展开深度光照设置`,title:n?`收起深度光照设置`:`展开深度光照设置`,"aria-expanded":n,"aria-controls":i,onClick:()=>r(e=>!e)}),(0,v.jsxs)(`section`,{id:i,className:`scene-controls__panel`,"aria-label":`深度光照设置`,inert:!n,"aria-hidden":!n,children:[(0,v.jsx)(`strong`,{children:`深度光照实验`}),(0,v.jsx)(`p`,{children:j}),(0,v.jsxs)(`label`,{className:`scene-controls__upload`,children:[`选择本地照片`,(0,v.jsx)(`input`,{type:`file`,accept:`image/*`,onChange:e=>{let t=e.target.files?.[0];t&&(M(`正在准备光照…`),w(URL.createObjectURL(t)))}})]}),(0,v.jsxs)(`label`,{children:[`起伏 `,(0,v.jsx)(`input`,{"aria-label":`起伏`,type:`range`,min:`0.1`,max:`1.5`,step:`0.05`,value:T,onChange:e=>E(Number(e.target.value))})]}),(0,v.jsxs)(`label`,{children:[`阴影 `,(0,v.jsx)(`input`,{"aria-label":`阴影`,type:`range`,min:`0`,max:`1`,step:`0.05`,value:D,onChange:e=>O(Number(e.target.value))})]}),(0,v.jsxs)(`label`,{children:[`查看 `,(0,v.jsxs)(`select`,{"aria-label":`查看模式`,value:k,onChange:e=>A(Number(e.target.value)),children:[(0,v.jsx)(`option`,{value:`0`,children:`光照效果`}),(0,v.jsx)(`option`,{value:`1`,children:`估算深度`}),(0,v.jsx)(`option`,{value:`2`,children:`表面法线`})]})]}),(0,v.jsx)(`small`,{children:`照片仅在本机处理。亮度估算深度，不代表真实几何。`})]})]}),document.body)]})}export{x as default};