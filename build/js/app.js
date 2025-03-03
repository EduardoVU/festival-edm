let imagenIndex;document.addEventListener("DOMContentLoaded",(()=>{navegacionFija(),createGaleria(),resaltarEnlace()}));const navegacionFija=()=>{const e=document.querySelector(".header"),a=document.querySelector(".sobre-festival");window.addEventListener("scroll",(()=>{const{bottom:n}=a.getBoundingClientRect();n<1?e.classList.add("fixed"):e.classList.remove("fixed")}))},resaltarEnlace=()=>{window.addEventListener("scroll",(()=>{const e=document.querySelectorAll("section"),a=document.querySelectorAll(".navegacion-principal a");let n;e.forEach((e=>{const a=e.offsetTop,t=e.clientHeight;window.scrollY>=a-t/3&&(n=e.id)})),a.forEach((e=>{e.classList.remove("active"),e.getAttribute("href")===`#${n}`&&e.classList.add("active")}))}))},createGaleria=()=>{const e=document.querySelector(".galeria-imagenes");for(let a=1;a<=16;a++){const n=document.createElement("PICTURE"),t=document.createElement("DIV");n.innerHTML=`\n        <source srcset="build/img/gallery/thumb/${a}.avif" type="image/avif">\n        <source srcset="build/img/gallery/thumb/${a}.webp" type="image/webp">\n        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${a}.jpg" alt="imagen galeria">\n    `,t.classList.add("galeria-contenedor"),t.appendChild(n),n.onclick=()=>{mostrarImagen(a)},e.appendChild(t)}},mostrarImagen=e=>{imagenIndex=e;const a=document.createElement("PICTURE");a.innerHTML=`\n    <source srcset="build/img/gallery/full/${e}.avif" type="image/avif">\n    <source srcset="build/img/gallery/full/${e}.webp" type="image/webp">\n    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${e}.jpg" alt="imagen galeria">\n`;const n=document.createElement("DIV");n.classList.add("modal");const t=document.createElement("BUTTON");t.textContent="X",t.classList.add("btn-cerrar"),t.onclick=e=>{e.stopPropagation(),cerrarModal()},n.appendChild(a),n.appendChild(t),n.onclick=cerrarModal;const l=document.querySelector("body");l.removeEventListener("keydown",handleKeyDown),l.addEventListener("keydown",handleKeyDown),l.classList.add("overflow-hidden"),l.append(n)},handleKeyDown=e=>{"Escape"===e.code?cerrarModal():"ArrowRight"===e.code?(imagenIndex=Math.min(++imagenIndex,16),nextImage()):"ArrowLeft"===e.code&&(imagenIndex=Math.max(--imagenIndex,1),nextImage())},nextImage=()=>{document.querySelector(".modal picture").innerHTML=`\n    <source srcset="build/img/gallery/full/${imagenIndex}.avif" type="image/avif">\n    <source srcset="build/img/gallery/full/${imagenIndex}.webp" type="image/webp">\n    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${imagenIndex}.jpg" alt="imagen galeria">\n`},cerrarModal=()=>{const e=document.querySelector(".modal");if(!e)return;e.classList.add("fade-out");const a=document.querySelector("body");a.removeEventListener("keydown",handleKeyDown),setTimeout((()=>{a.classList.remove("overflow-hidden"),e?.remove()}),500)};