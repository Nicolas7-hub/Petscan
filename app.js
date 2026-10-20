(function(){
var $=function(id){return document.getElementById(id)};
function face(c1,c2,c3,size,cls){return '<svg class="stk '+(cls||'')+'" viewBox="0 0 100 100" width="'+size+'" height="'+size+'" aria-hidden="true"><circle cx="50" cy="52" r="46" fill="#fff"/><ellipse cx="22" cy="40" rx="13" ry="24" fill="'+c2+'" transform="rotate(18 22 40)"/><ellipse cx="78" cy="40" rx="13" ry="24" fill="'+c2+'" transform="rotate(-18 78 40)"/><circle cx="50" cy="52" r="32" fill="'+c1+'"/><ellipse cx="50" cy="64" rx="17" ry="13" fill="'+c3+'"/><ellipse cx="50" cy="57" rx="6" ry="4.5" fill="#2b2118"/><circle cx="39" cy="46" r="3.6" fill="#2b2118"/><circle cx="61" cy="46" r="3.6" fill="#2b2118"/><path d="M44 68q6 7 12 0" stroke="#2b2118" stroke-width="2" fill="none"/></svg>';}
var WALKER='<svg viewBox="0 0 120 84" width="110" height="77" role="img" aria-label="Perro detector caminando"><g class="tail"><path d="M18 36q-14-8-10-24" stroke="#b97c1c" stroke-width="7" stroke-linecap="round" fill="none"/></g><rect class="leg l1" x="26" y="52" width="9" height="28" rx="4" fill="#b97c1c"/><rect class="leg l2" x="42" y="52" width="9" height="28" rx="4" fill="#b97c1c"/><ellipse cx="52" cy="42" rx="34" ry="18" fill="#e0a93b"/><rect class="leg l3" x="66" y="52" width="9" height="28" rx="4" fill="#b97c1c"/><rect class="leg l4" x="80" y="52" width="9" height="28" rx="4" fill="#b97c1c"/><circle cx="92" cy="30" r="17" fill="#e0a93b"/><ellipse cx="82" cy="30" rx="6" ry="13" fill="#b97c1c" transform="rotate(12 82 30)"/><ellipse cx="108" cy="36" rx="11" ry="8" fill="#f6dfa6"/><circle cx="116" cy="34" r="3.5" fill="#2b2118"/><circle cx="96" cy="26" r="2.8" fill="#2b2118"/></svg>';
$('walker').innerHTML='<div class="wb">'+WALKER+'</div>';
$('duo').innerHTML=face('#e0a93b','#b97c1c','#f6dfa6',150,'d1')+face('#4a3626','#2b2118','#c9a272',120,'d2');

/* Comparación de percepciones */
var cmp={h:'Las personas se apoyan en signos externos, síntomas y cambios físicos observables.',d:'El olfato canino podría reconocer ciertos patrones odorantes que las personas no perciben, según entrenamiento y condiciones de prueba.'};
function setCmp(k){$('cmpText').textContent=cmp[k];$('cmpH').classList.toggle('on',k==='h');$('cmpD').classList.toggle('on',k==='d');$('cmpH').setAttribute('aria-pressed',k==='h');$('cmpD').setAttribute('aria-pressed',k==='d');}
$('cmpH').onclick=function(){setCmp('h')};$('cmpD').onclick=function(){setCmp('d')};setCmp('h');

/* Etapas */
var etapas=[['Evaluación y obtención de muestras','Un equipo veterinario obtiene muestras biológicas apropiadas según el protocolo.'],['Preparación de las muestras','Se procesan, identifican y conservan con procedimientos estandarizados que reducen contaminación y sesgos.'],['Análisis olfativo','Un perro previamente entrenado participa en pruebas controladas para reconocer los patrones investigados.'],['Registro de la respuesta','Se registra si el perro presenta la conducta de marcación aprendida, sin interpretarla como diagnóstico.'],['Evaluación veterinaria y científica','Los resultados se contrastan con diagnósticos veterinarios independientes y métodos de referencia.']];
function card(n,t,d){var c=document.createElement('div');c.className='card';var s=document.createElement('span');s.className='num';s.textContent=n;var h=document.createElement('h3');h.textContent=t;c.appendChild(s);c.appendChild(h);if(d){var p=document.createElement('p');p.textContent=d;c.appendChild(p);}return c;}
etapas.forEach(function(e,i){$('etapas').appendChild(card(i+1,e[0],e[1]));});

/* Pestañas de entrenamiento */
var tabs=[['Familiarización','El perro se adapta al entorno de investigación y a las actividades olfativas.',8],['Reconocimiento del olor','Con entrenamiento controlado, asocia un estímulo odorante específico con una recompensa.',28],['Discriminación','Aprende a distinguir muestras distintas, evitando responder a pistas involuntarias del entrenador.',48],['Validación','Participa en pruebas controladas, con evaluadores cegados cuando corresponda, para estudiar su rendimiento real.',68]];
function pills(box,list,onPick){var btns=[];list.forEach(function(x,i){var b=document.createElement('button');b.className='pill';b.textContent=x[0];b.onclick=function(){onPick(i)};box.appendChild(b);btns.push(b);});return function(sel){btns.forEach(function(b,i){b.classList.toggle('on',i===sel);b.setAttribute('aria-pressed',i===sel);});};}
var markTab=pills($('tabs'),tabs,function(i){showTab(i)});
function showTab(i){markTab(i);$('tabTitle').textContent=tabs[i][0];$('tabText').textContent=tabs[i][1];$('dogimg').style.left=tabs[i][2]+'%';}
showTab(0);

/* Simulación */
var names=['Luna','Toby','Nube','Coco'],looks=[['#e0a93b','#b97c1c','#f6dfa6'],['#3b3029','#241b16','#b08a62'],['#f3ece0','#d9c7a8','#ffffff'],['#8a5a3a','#5e3a22','#d8b48a']];
var st={sim:'idle',cur:-1,target:0,mark:-1},timers=[];
function later(f,ms){timers.push(setTimeout(f,ms));}
function clearT(){timers.forEach(clearTimeout);timers=[];}
function pos(i){return i<0?8:12.5+25*i;}
/* Mueve al perro caminando hasta la muestra i; devuelve la duración en ms */
function moveTo(i){var w=$('walker'),a=pos(st.cur),b=pos(i),d=Math.abs(b-a);st.cur=i;if(!d)return 0;
  var dur=Math.max(.6,d/25*.8);w.style.transitionDuration=dur+'s';w.classList.toggle('flip',b<a);w.classList.remove('sniff');w.classList.add('walk');w.style.left=b+'%';return dur*1000;}
function renderSim(){
  var done=st.sim==='done',run=st.sim==='run';
  $('jars').innerHTML=names.map(function(n,i){var bc='transparent',bg='transparent';if(done){if(i===st.mark){bc='#c8922a';bg='#fcf0d2';}if(i===st.target&&i!==st.mark){bc='#2f6f73';bg='#e3efec';}}
    return '<div class="jarbox" style="border-color:'+bc+';background:'+bg+'">'+face(looks[i][0],looks[i][1],looks[i][2],84,done&&i===st.mark?'pop':'')+'<div class="cap">Muestra de '+n+'</div></div>';}).join('');
  $('start').disabled=run;
  var msg='Pulsa «Iniciar simulación» para ver al perro examinar las muestras.';
  if(run)msg='El perro está examinando las muestras…';
  if(done)msg='El perro ha realizado una señal de marcación en la muestra de '+names[st.mark]+'.';
  $('simMsg').textContent=msg;
  $('verdictBox').hidden=!done;
  if(done)$('verdict').textContent=st.mark===st.target?'En esta simulación, la marcación coincidió con la muestra positiva (la de '+names[st.target]+').':'En esta simulación hubo un falso positivo (la muestra de '+names[st.mark]+') y un falso negativo (la muestra positiva era la de '+names[st.target]+').';
}
function start(){clearT();var target=Math.floor(Math.random()*4),ok=Math.random()<0.7,mark=ok?target:(target+1+Math.floor(Math.random()*3))%4,path=[0,1,2,3,2,1];
  if(mark!==1)path.push(mark);
  st.sim='run';st.target=target;st.mark=-1;renderSim();
  function go(k){var ms=moveTo(path[k]),w=$('walker');
    later(function(){w.classList.remove('walk');w.classList.add('sniff');
      later(function(){w.classList.remove('sniff');if(k+1<path.length)go(k+1);else{st.sim='done';st.mark=mark;renderSim();}},650);},ms);}
  go(0);}
function reset(){clearT();var w=$('walker'),ms=moveTo(-1);w.classList.remove('sniff');
  later(function(){w.classList.remove('walk');w.classList.remove('flip');},ms);
  st.sim='idle';st.target=0;st.mark=-1;renderSim();}
$('start').onclick=start;$('reset').onclick=reset;renderSim();

/* Conceptos */
var con=[['Muestra positiva','Muestra que, según el diagnóstico veterinario de referencia, corresponde a un caso de la condición estudiada.'],['Muestra negativa','Muestra de un perro sin la condición estudiada, según el diagnóstico de referencia.'],['Falso positivo','El perro marca una muestra que en realidad es negativa. Puede deberse a contaminación, otra enfermedad o pistas involuntarias.'],['Falso negativo','El perro no marca una muestra positiva. Por eso un resultado negativo no permite descartar cáncer.']];
var markCon=pills($('concepts'),con,function(i){showCon(i)});
function showCon(i){markCon(i);$('conceptText').textContent=con[i][1];}
showCon(0);

/* Línea de tiempo */
['Golden Retriever','Evaluación veterinaria','Obtención controlada de muestras','Prueba olfativa con otro perro','Registro de la respuesta','Interpretación científica y veterinaria'].forEach(function(t,i){$('pasos').appendChild(card(i+1,t));});
$('toggleTl').onclick=function(){var h=!$('pasos').hidden;$('pasos').hidden=h;this.setAttribute('aria-expanded',!h);};

/* Kit de apoyo */
var kd=[['Frasco para la muestra','Recipiente limpio con tapa para recoger la muestra de orina siguiendo las indicaciones del veterinario.'],['Etiqueta de identificación','Identifica cada muestra con un código para evitar confusiones y mantener el análisis ciego.'],['Bolsa sellada','Protege el frasco durante el traslado y reduce el riesgo de derrames y contaminación.'],['Guía de uso','Explica cuándo y cómo tomar la muestra, cómo conservarla y cómo enviarla.']];
var kitOpen=false,kitSel=0;
var markKit=pills($('kitPills'),kd,function(i){kitSel=i;kitOpen=true;renderKit();});
function renderKit(){markKit(kitSel);$('kitsvg').setAttribute('class','kitbox'+(kitOpen?' open':''));for(var i=0;i<4;i++)$('k'+i).classList.toggle('on',i===kitSel);$('kitTitle').textContent=kd[kitSel][0];$('kitText').textContent=kd[kitSel][1];$('kitBtn').textContent=kitOpen?'Cerrar kit':'Abrir kit';$('kitBtn').setAttribute('aria-expanded',kitOpen);}
$('kitBtn').onclick=function(){kitOpen=!kitOpen;renderKit();};renderKit();
[['Toma de la muestra','Se recoge una muestra de orina siguiendo las indicaciones del veterinario.'],['Identificación y sellado','Se cierra el frasco, se etiqueta con un código y se guarda en la bolsa sellada.'],['Envío al estudio','La caja se envía al equipo de investigación, que la recibe y la registra.'],['Análisis olfativo','La muestra entra en una prueba controlada, junto a otras, con evaluadores cegados.']].forEach(function(e,i){$('envio').appendChild(card(i+1,e[0],e[1]));});

/* Comentarios (solo en el navegador del visitante) */
$('addC').onclick=function(){var m=$('cm').value.trim();if(!m)return;var n=$('cn').value.trim()||'Anónimo';var d=document.createElement('div');d.className='cm';var b=document.createElement('b');b.textContent=n;var p=document.createElement('p');p.textContent=m;d.appendChild(b);d.appendChild(p);$('clist').insertBefore(d,$('clist').firstChild);$('noC').hidden=true;$('cm').value='';};

/* Aparición suave de textos e imágenes al hacer scroll */
(function(){
  if(!('IntersectionObserver' in window)||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))return;
  var sel='.sec h2,.sec .in>h3,.sec .card,.sec .panel,.sec .in>p,.sec .in>.eyebrow,.sec .in>.row,.sec .in>.warn,.sec .in>.duo,.sec .ph,.sec .pair>p,.sec .pair>div>p,.sec .pair>div>.row,.sec .pair>img,#kit .grid>svg,#kitPills';
  var els=[].slice.call(document.querySelectorAll(sel));
  els.forEach(function(el){el.classList.add('rv');});
  els.forEach(function(el){var i=[].filter.call(el.parentNode.children,function(c){return c.classList.contains('rv');}).indexOf(el);if(i>0)el.style.transitionDelay=(Math.min(i,5)*90)+'ms';});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add('shown');io.unobserve(t);setTimeout(function(){t.style.transitionDelay='';},1400);});},{threshold:.08,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){io.observe(el);});
})();
})();
