/* Aba "Gerar" do app Universo: monta prompts de OCs base. Injeta a própria aba, seção e estilo. */
(function(){
const $=s=>document.querySelector(s);
const CAMPOS={
 corpo:[
  ["genero","Presença",[["Masculina","male"],["Feminina","female"],["Andrógina","androgynous"]]],
  ["biotipo","Biotipo",[["Magro e esguio","slim lanky build, narrow shoulders"],["Baixinho e compacto","short compact build, small frame"],["Médio, normal","average build, medium height"],["Atlético","athletic build, defined but lean muscles"],["Alto e largo","tall and broad-shouldered build"],["Forte e parrudo","stocky heavyset muscular build"],["Curvilíneo","curvy build, wide hips, soft proportions"],["Robusto, gordinho","plus-size soft round build"]]],
  ["altura","Altura",[["Baixa (1,55 m)","short height, about 155 cm"],["Média (1,68 m)","medium height, about 168 cm"],["Alta (1,80 m)","tall height, about 180 cm"],["Muito alta (1,90 m)","very tall, about 190 cm"]]],
  ["pele","Tom de pele",[["Clara","fair skin"],["Morena clara","light tan skin"],["Morena","medium brown skin"],["Marrom escura","dark brown skin"],["Negra retinta","deep dark skin"]]]],
 rosto:[
  ["cabTipo","Tipo de cabelo",[["Liso","straight hair"],["Ondulado","wavy hair"],["Cacheado","curly hair"],["Crespo/afro","coily afro-textured hair"],["Raspado com degradê","short fade haircut"],["Bagunçado","messy tousled hair"]]],
  ["cabComp","Comprimento",[["Curto","short"],["Médio","medium-length"],["Longo","long"],["Muito longo","very long, down to the waist"]]],
  ["cabCor","Cor do cabelo",[["Preto","black"],["Castanho","dark brown"],["Ruivo/acobreado","auburn copper"],["Loiro","blonde"],["Loiro com raiz preta","blonde with black roots"],["Degradê azul e roxo","blue-to-purple gradient"],["Branco/prata","silver white"]]],
  ["olhos","Cor dos olhos",[["Castanhos","brown eyes"],["Âmbar","amber eyes"],["Verdes","green eyes"],["Cinza","grey eyes"],["Azuis","blue eyes"]]],
  ["vibe","Expressão base",[["Calmo e observador","calm, observant, neutral expression"],["Provocador","smug teasing smirk"],["Irritado","annoyed scowl"],["Tímido","shy, looking away slightly"],["Sorriso aberto","bright cheerful grin"],["Entediado","bored half-lidded eyes"]]]],
 roupa:[
  ["jaqueta","Jaqueta",[["Gakuran preto fechado","black gakuran-style jacket with high stand collar and gold buttons"],["Gakuran aberto","open black gakuran-style jacket over a black shirt"],["Casaco cropped","cropped black school blazer"]]],
  ["calca","Parte de baixo",[["Calça larguíssima","extra baggy black trousers with side stripe"],["Calça cargo","baggy black cargo pants with straps"],["Saia xadrez","pleated plaid skirt with belt and chain, loose white socks"]]],
  ["sapato","Calçado",[["Mocassim plataforma","chunky black platform loafers"],["Coturno","black combat boots"],["Tênis preto","black chunky sneakers"]]]]
};
const ACESS=[["Óculos","round glasses"],["Brinco","a pendant earring"],["Corrente na calça","a chain hanging from the belt"],["Pirulito na boca","a lollipop stick in the mouth"],["Mochila","a black backpack"],["Chaveiro fofo","a cute plush keychain"],["Pulseira de corrente","a chain bracelet"],["Gravata","a school tie"],["Choker","a choker necklace"],["Presilhas no cabelo","metal hair clips"],["Caderno/livro","holding a small black notebook"],["Curativo no rosto","a bandage on the cheek"]];
const FORMATOS=[["Corpo inteiro, pose neutra (pra desenhar por cima)","full body character reference, standing neutral A-pose, front view, hands relaxed, plain flat background, even lighting, no cast shadows, clean readable silhouette"],["Ficha completa (turnaround + expressões)","character reference sheet: large front full-body view, turnaround (front, right, back, left), 6 head expressions, color palette swatches, labeled sections"],["Só turnaround (4 ângulos)","character turnaround sheet, four full-body views: front, right side, back, left side, same pose, plain background"],["Só expressões (rosto)","head expression sheet, 6 expressions: neutral, side glance, annoyed, subtle smile, looking down, profile"]];
const ESTILO="anime illustration, thick bold outer outline with thinner delicate inner lines, flat blocked colors with simple cel shading, hair in solid chunky locks without stray strands, strong expressive cartoon-like face, dark navy slate background";
const NEG="blurry, photorealistic, 3d render, extra fingers, deformed hands, text artifacts, watermark, busy background, dramatic shadows";
const GP=[{nome:"Corvos Índigo",cor:"black",detalhe:"indigo purple",emblema:"a shield crest with a crow and stars"},{nome:"Lilás Prateado",cor:"black",detalhe:"silvery lilac",emblema:"a silver wolf-mask crest"},{nome:"Azul Celeste",cor:"black",detalhe:"silvery sky blue",emblema:"a pale blue star crest"}];

const ler=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}};
const gua=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const esc=s=>String(s||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
let gangues=ler("kg_gangues",GP);

/* estilo */
const st=document.createElement("style");
st.textContent=`#gen .gn-p{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin:12px 0}
#gen h3{margin:0 0 10px;font-size:1rem;color:var(--ac)}
#gen .gn-g{display:grid;grid-template-columns:1fr 1fr;gap:10px}
#gen .gn-f{grid-column:1/-1}
#gen label{display:block;font-size:.8rem;color:var(--mut);margin-bottom:3px}
#gen select{width:100%;min-height:44px;padding:0 10px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--tx);font:inherit}
#gen select:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
#gen textarea{min-height:84px}
#gen .gn-c{display:flex;flex-wrap:wrap;gap:8px}
#gen .gn-c label{display:flex;align-items:center;gap:6px;margin:0;padding:6px 12px;border:1px solid var(--line);border-radius:999px;font-size:.9rem;color:var(--tx);cursor:pointer}
#gen .gn-c label:has(input:checked){border-color:var(--ac);color:var(--ac)}
#gen .gn-c input{width:auto;margin:0}
#gn-out{background:var(--bg);border:1px solid var(--ac);border-radius:10px;padding:12px;font-size:.9rem;white-space:pre-wrap;overflow-wrap:anywhere;min-height:110px}
#gen .gn-n{color:var(--mut);font-size:.8rem;margin:8px 0 0}
#gen .gn-gg{border:1px solid var(--line);border-radius:10px;padding:10px;margin-bottom:10px}
#gen input[type=text]{min-height:44px}
#gen summary{cursor:pointer;color:var(--ac)}`;
document.head.appendChild(st);

/* aba e seção */
const sec=document.createElement("section");sec.id="gen";sec.className="hide";
sec.innerHTML=`<h2>Gerar OC base</h2>
<p style="color:var(--mut)">Escolha a base e a gangue, copie o prompt e gere a imagem na sua ferramenta.</p>
<div class="row"><button class="pri" id="gn-sort">Sortear</button><button id="gn-copy">Copiar prompt</button></div>
<div class="gn-p"><h3>Prompt pronto</h3><div id="gn-out"></div><p class="gn-n" id="gn-neg"></p></div>
<div class="gn-p"><h3>Corpo</h3><div class="gn-g" id="gn-corpo"></div></div>
<div class="gn-p"><h3>Rosto e cabelo</h3><div class="gn-g" id="gn-rosto"></div></div>
<div class="gn-p"><h3>Gangue e roupa</h3><label for="gn-gang">Gangue do personagem</label><select id="gn-gang"></select>
<div class="gn-g" style="margin-top:10px" id="gn-roupa"></div>
<details style="margin-top:12px"><summary>Editar gangues</summary><div id="gn-gl" style="margin-top:10px"></div>
<div class="row"><button id="gn-add">+ Nova gangue</button><button id="gn-rst">Restaurar padrão</button></div></details></div>
<div class="gn-p"><h3>Acessórios</h3><div class="gn-c" id="gn-ac"></div></div>
<div class="gn-p"><h3>Saída e estilo</h3><label for="gn-fmt">O que gerar</label><select id="gn-fmt"></select>
<label for="gn-est" style="margin-top:10px">Estilo (edite se quiser)</label><textarea id="gn-est"></textarea></div>`;
$("main").appendChild(sec);

const tabs=$("#tabs"),tbtn=document.createElement("button");
tbtn.dataset.tab="gen";tbtn.textContent="Gerar";tabs.appendChild(tbtn);

/* mostrar/esconder sem mexer no código do app */
const outras=["list","edit","meet","bye","board"].map(i=>document.getElementById(i));
const obs=new MutationObserver(()=>{if(outras.some(e=>!e.classList.contains("hide")))sec.classList.add("hide")});
outras.forEach(e=>obs.observe(e,{attributes:true,attributeFilter:["class"]}));
const tabOrig=window.tab;
window.tab=function(t){
 if(t!=="gen"){sec.classList.add("hide");return tabOrig(t)}
 outras.forEach(e=>e.classList.add("hide"));
 sec.classList.remove("hide");
 tabs.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.tab==="gen"));
 atualizar();
};

/* campos */
const sel={};
function mk(box,[id,rot,itens]){
 const w=document.createElement("div");
 w.innerHTML=`<label for="gn-${id}">${rot}</label><select id="gn-${id}"></select>`;
 $(box).appendChild(w);
 const s=w.querySelector("select");
 itens.forEach(([pt],i)=>s.add(new Option(pt,i)));
 s.onchange=()=>{atualizar();salvar()};
 sel[id]={el:s,itens};
}
Object.keys(CAMPOS).forEach(g=>CAMPOS[g].forEach(c=>mk("#gn-"+g,c)));
FORMATOS.forEach(([pt],i)=>$("#gn-fmt").add(new Option(pt,i)));
$("#gn-est").value=ler("kg_estilo",ESTILO);
$("#gn-est").oninput=()=>{gua("kg_estilo",$("#gn-est").value);atualizar()};
$("#gn-fmt").onchange=()=>{atualizar();salvar()};
$("#gn-gang").onchange=()=>{atualizar();salvar()};
ACESS.forEach(([pt],i)=>{
 const l=document.createElement("label");
 l.innerHTML=`<input type="checkbox" value="${i}"> ${pt}`;
 l.querySelector("input").onchange=()=>{atualizar();salvar()};
 $("#gn-ac").appendChild(l);
});

function gangs(){
 const a=$("#gn-gang").value;
 $("#gn-gang").innerHTML="";
 gangues.forEach((g,i)=>$("#gn-gang").add(new Option(g.nome||"Sem nome",i)));
 if(a&&gangues[a])$("#gn-gang").value=a;
 $("#gn-gl").innerHTML=gangues.map((g,i)=>`<div class="gn-gg"><div class="row" style="justify-content:space-between;align-items:center"><strong>${esc(g.nome)||"Sem nome"}</strong><button class="bad" data-del="${i}">Remover</button></div>
 <div class="gn-g"><div class="gn-f"><label>Nome</label><input type="text" data-k="nome" data-i="${i}" value="${esc(g.nome)}"></div>
 <div><label>Cor da roupa (inglês)</label><input type="text" data-k="cor" data-i="${i}" value="${esc(g.cor)}"></div>
 <div><label>Cor do detalhe (inglês)</label><input type="text" data-k="detalhe" data-i="${i}" value="${esc(g.detalhe)}"></div>
 <div class="gn-f"><label>Emblema/brasão (inglês)</label><input type="text" data-k="emblema" data-i="${i}" value="${esc(g.emblema)}"></div></div></div>`).join("");
}
$("#gn-gl").addEventListener("input",e=>{
 const t=e.target;if(t.dataset.k===undefined)return;
 gangues[t.dataset.i][t.dataset.k]=t.value;gua("kg_gangues",gangues);
 if(t.dataset.k==="nome")$("#gn-gang").options[t.dataset.i].text=t.value||"Sem nome";
 atualizar();
});
$("#gn-gl").addEventListener("click",e=>{
 const i=e.target.dataset.del;if(i===undefined)return;
 if(gangues.length<=1){alert("Mantenha pelo menos uma gangue.");return}
 gangues.splice(i,1);gua("kg_gangues",gangues);gangs();atualizar();
});
$("#gn-add").onclick=()=>{gangues.push({nome:"Nova gangue",cor:"black",detalhe:"red",emblema:"a simple emblem crest"});gua("kg_gangues",gangues);gangs();$("#gn-gang").value=gangues.length-1;atualizar()};
$("#gn-rst").onclick=()=>{gangues=JSON.parse(JSON.stringify(GP));gua("kg_gangues",gangues);gangs();atualizar()};

const val=id=>sel[id].itens[sel[id].el.value][1];
function atualizar(){
 const g=gangues[$("#gn-gang").value]||gangues[0];
 const ac=[...document.querySelectorAll("#gn-ac input:checked")].map(c=>ACESS[c.value][1]);
 const p=[FORMATOS[$("#gn-fmt").value][1],
  `original character, ${val("genero")}, ${val("biotipo")}, ${val("altura")}, ${val("pele")}`,
  `${val("cabComp")} ${val("cabTipo")}, ${val("cabCor")}, ${val("olhos")}, ${val("vibe")}`,
  `wearing ${val("jaqueta")} in ${g.cor} with ${g.detalhe} piping and ${g.emblema} on the chest, ${val("calca")}, ${val("sapato")}`,
  ac.length?"accessories: "+ac.join(", "):"",
  $("#gn-est").value.trim()].filter(Boolean);
 $("#gn-out").textContent=p.join(". ")+".";
 $("#gn-neg").textContent="Negativo (se a ferramenta tiver): "+NEG;
}
function salvar(){
 const o={};Object.keys(sel).forEach(k=>o[k]=sel[k].el.value);
 o.fmt=$("#gn-fmt").value;o.gang=$("#gn-gang").value;
 o.ac=[...document.querySelectorAll("#gn-ac input:checked")].map(c=>c.value);
 gua("kg_escolhas",o);
}
function carregar(){
 const o=ler("kg_escolhas",null);if(!o)return;
 Object.keys(sel).forEach(k=>{if(o[k]!==undefined&&sel[k].itens[o[k]])sel[k].el.value=o[k]});
 if(FORMATOS[o.fmt])$("#gn-fmt").value=o.fmt;
 if(gangues[o.gang])$("#gn-gang").value=o.gang;
 document.querySelectorAll("#gn-ac input").forEach(c=>c.checked=(o.ac||[]).includes(c.value));
}
const rnd=n=>Math.floor(Math.random()*n);
$("#gn-sort").onclick=()=>{
 Object.keys(sel).forEach(k=>sel[k].el.value=rnd(sel[k].itens.length));
 $("#gn-gang").value=rnd(gangues.length);
 const ids=ACESS.map((_,i)=>i).sort(()=>Math.random()-.5).slice(0,rnd(4));
 document.querySelectorAll("#gn-ac input").forEach(c=>c.checked=ids.includes(+c.value));
 atualizar();salvar();
};
$("#gn-copy").onclick=async()=>{
 const b=$("#gn-copy"),t=$("#gn-out").textContent;
 try{await navigator.clipboard.writeText(t);b.textContent="Copiado!"}
 catch(e){const r=document.createRange();r.selectNodeContents($("#gn-out"));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selecionado, copie"}
 setTimeout(()=>b.textContent="Copiar prompt",1800);
};
gangs();carregar();atualizar();
})();
