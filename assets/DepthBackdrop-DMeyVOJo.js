import{r as e}from"./rolldown-runtime-hePW80VL.js";import{a as t,r as n,t as r}from"./index-DImlW5HO.js";import{Ct as i,Nt as a,Q as o,St as s,X as c,d as l,kt as u,t as d,u as f,ut as p}from"./three.module-DOeldwY8.js";var m=e(t(),1),h=n(),g=`
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
}`,v=r(),y=`/images/projects/robot-design.png`;function b(e){let t=document.createElement(`canvas`);t.width=512,t.height=Math.max(1,Math.round(512*e.naturalHeight/e.naturalWidth));let n=t.getContext(`2d`);if(!n)throw Error(`Canvas unavailable`);n.filter=`blur(5px)`,n.drawImage(e,-8,-8,t.width+16,t.height+16);let r=n.getImageData(0,0,t.width,t.height);for(let e=0;e<t.height;e++)for(let n=0;n<t.width;n++){let i=(e*t.width+n)*4,a=(r.data[i]*.2126+r.data[i+1]*.7152+r.data[i+2]*.0722)/255,o=c.clamp((a*.7+e/t.height*.3-.5)*1.25+.5,0,1)*255;r.data[i]=r.data[i+1]=r.data[i+2]=o}return n.putImageData(r,0,0),new l(t)}function x({onReady:e}){let t=(0,m.useRef)(null),n=(0,m.useRef)(e);(0,m.useEffect)(()=>{n.current=e},[e]);let[r,c]=(0,m.useState)(y),[l,x]=(0,m.useState)(.85),[S,C]=(0,m.useState)(.75),[w,T]=(0,m.useState)(0),[E,D]=(0,m.useState)(`正在准备光照…`),O=(0,m.useRef)({relief:l,shadows:S,view:w});return(0,m.useEffect)(()=>{O.current={relief:l,shadows:S,view:w}},[l,S,w]),(0,m.useEffect)(()=>()=>{r.startsWith(`blob:`)&&URL.revokeObjectURL(r)},[r]),(0,m.useEffect)(()=>{let e=t.current;if(!e)return;let c=!1,l=0,m,h,v,y,x,S,C=!1,w=window.matchMedia(`(prefers-reduced-motion: reduce)`),T=new a(.65,.65),E=T.clone(),k=!1,A=!1,j=()=>{!c&&!A&&(A=!0,n.current?.())},M=()=>{c||(C=!1,cancelAnimationFrame(l),m?.domElement.style.setProperty(`visibility`,`hidden`),e.dataset.render=`fallback`,D(`当前使用静态图片`),j())},N=t=>{k=!0;let n=e.getBoundingClientRect();T.set((t.clientX-n.left)/n.width,1-(t.clientY-n.top)/n.height),z()},P=()=>{k=!1,z()},F=new s,I=new f,L=0,R=t=>{if(l=0,c||document.hidden||!C||!m||!v)return;let n=Math.min((t-L)/1e3||.016,.1);L=t,!k&&!w.matches&&T.set(.5+Math.cos(t/3500)*.3,.5+Math.sin(t/3500)*.3),w.matches?E.copy(T):E.lerp(T,1-Math.exp(-n*9)),v.uniforms.light.value.copy(E),v.uniforms.relief.value=O.current.relief,v.uniforms.shadowAmount.value=O.current.shadows,v.uniforms.viewMode.value=O.current.view,m.render(F,I),C&&(e.dataset.render=`ready`,j(),w.matches||(l=requestAnimationFrame(R)))};function z(){!c&&!document.hidden&&!l&&C&&(l=requestAnimationFrame(R))}let B=()=>{cancelAnimationFrame(l),l=0,z()},V=e=>{e.preventDefault(),M()},H=new Image;return H.onload=()=>{if(!c)try{m=new d({antialias:!1,alpha:!0}),m.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),e.appendChild(m.domElement),m.domElement.addEventListener(`webglcontextlost`,V),h=new p(2,2),y=new u(H),y.needsUpdate=!0,x=b(H),v=new i({vertexShader:g,fragmentShader:_,uniforms:{photo:{value:y},heightMap:{value:x},resolution:{value:new a(1,1)},imageSize:{value:new a(H.naturalWidth,H.naturalHeight)},light:{value:E.clone()},relief:{value:O.current.relief},shadowAmount:{value:O.current.shadows},viewMode:{value:O.current.view}}}),F.add(new o(h,v)),m.debug.onShaderError=M,C=!0,S=new ResizeObserver(()=>{if(!m||!v)return;let{width:t,height:n}=e.getBoundingClientRect();m.setSize(Math.max(1,t),Math.max(1,n)),v.uniforms.resolution.value.set(Math.max(1,t),Math.max(1,n)),z()}),S.observe(e),D(`移动鼠标，观察光线掠过表面`),z()}catch{M()}},H.onerror=()=>{c||(D(`图片未能读取，请换一张图片`),j())},H.src=r,window.addEventListener(`pointermove`,N,{passive:!0}),window.addEventListener(`blur`,P),document.documentElement.addEventListener(`pointerleave`,P),document.addEventListener(`visibilitychange`,B),w.addEventListener(`change`,B),window.addEventListener(`input`,z),()=>{c=!0,H.onload=H.onerror=null,cancelAnimationFrame(l),S?.disconnect(),window.removeEventListener(`pointermove`,N),window.removeEventListener(`blur`,P),document.documentElement.removeEventListener(`pointerleave`,P),document.removeEventListener(`visibilitychange`,B),w.removeEventListener(`change`,B),window.removeEventListener(`input`,z),h?.dispose(),v?.dispose(),y?.dispose(),x?.dispose(),m?.domElement.removeEventListener(`webglcontextlost`,V),m?.dispose(),m?.forceContextLoss(),m?.domElement.remove()}},[r]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`div`,{ref:t,className:`depth-backdrop`,style:{backgroundImage:`url("${r}")`},"aria-hidden":`true`}),!e&&(0,h.createPortal)((0,v.jsxs)(`details`,{className:`depth-controls`,open:!0,children:[(0,v.jsx)(`summary`,{children:`深度光照实验`}),(0,v.jsx)(`p`,{children:E}),(0,v.jsxs)(`label`,{className:`depth-controls__upload`,children:[`选择本地照片`,(0,v.jsx)(`input`,{type:`file`,accept:`image/*`,onChange:e=>{let t=e.target.files?.[0];t&&(D(`正在准备光照…`),c(URL.createObjectURL(t)))}})]}),(0,v.jsxs)(`label`,{children:[`起伏 `,(0,v.jsx)(`input`,{"aria-label":`起伏`,type:`range`,min:`0.1`,max:`1.5`,step:`0.05`,value:l,onChange:e=>x(Number(e.target.value))})]}),(0,v.jsxs)(`label`,{children:[`阴影 `,(0,v.jsx)(`input`,{"aria-label":`阴影`,type:`range`,min:`0`,max:`1`,step:`0.05`,value:S,onChange:e=>C(Number(e.target.value))})]}),(0,v.jsxs)(`label`,{children:[`查看 `,(0,v.jsxs)(`select`,{"aria-label":`查看模式`,value:w,onChange:e=>T(Number(e.target.value)),children:[(0,v.jsx)(`option`,{value:`0`,children:`光照效果`}),(0,v.jsx)(`option`,{value:`1`,children:`估算深度`}),(0,v.jsx)(`option`,{value:`2`,children:`表面法线`})]})]}),(0,v.jsx)(`small`,{children:`照片仅在本机处理。亮度估算深度，不代表真实几何。`})]}),document.body)]})}export{x as default};