/* Native DOM/SVG: no CDN, fetch, framework, or build required. */
(() => {
  'use strict';
  const model = window.PURCHASE_CANVAS;
  const host = document.getElementById('view-canvas');
  if (!host || !model) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const byId = new Map(model.nodes.map(n => [n.id, n]));
  const stages = model.nodes.filter(n => !n.parent);
  const children = id => model.nodes.filter(n => n.parent === id);
  const state = { expanded:new Set(), selected:'entry', recipe:'all', lens:'all', x:28, y:28, scale:1, positions:new Map(), width:300, height:900 };
  const route = () => model.recipes.find(r => r.id === state.recipe) || model.recipes[0];
  let statusTimer;
  let restoringFocus=false;
  host.innerHTML = `
    <div class="canvas-intro">
      <div><div class="canvas-eyebrow">Showpass / purchase flow</div><h2>Follow the purchase. Unfold the details.</h2><p>Start with the main journey. Open a branch to explore its conditions, interruptions and outcomes.</p></div>
      <span class="review-tag">Local source review · ${esc(model.reviewedOn)}</span>
    </div>
    <div class="canvas-workspace">
      <aside class="canvas-nav" aria-label="Canvas navigation">
        <div class="canvas-field"><label for="canvas-search">Find a path</label><input id="canvas-search" type="search" placeholder="Waitlist, seats, failure…" autocomplete="off"></div>
        <div id="canvas-search-results" hidden><p class="canvas-search-status" id="canvas-search-count" role="status"></p><div id="canvas-matches"></div></div>
        <div id="canvas-navigation">
          <div class="canvas-field"><label for="canvas-recipe">Guided example</label><select id="canvas-recipe">${model.recipes.map(r => `<option value="${r.id}">${esc(r.title)}</option>`).join('')}</select></div>
          <div class="canvas-field lens-field"><label for="canvas-lens">Highlight audience</label><select id="canvas-lens"><option value="all">Everyone</option><option value="customer">Customer</option><option value="embedded">Widget / website</option><option value="seller">Box Office / POS</option></select></div>
          <div class="canvas-kicker">Main journey</div><nav class="canvas-stage-nav" id="canvas-stage-nav">${stages.map((n,i) => `<button type="button" data-jump="${n.id}"><span class="canvas-step-no">${String(i+1).padStart(2,'0')}</span><span>${esc(n.title)}</span></button>`).join('')}</nav>
          <div class="canvas-nav-note"><b>Read the connectors</b><br>→ Solid: ordinary sale sequence.<br>┄ Dotted: a condition or alternative.<br><br>Waitlist enrollment can stop early. Guided examples highlight a path; they do not validate every possible combination.<br><br><b>Source review ≠ a passing test.</b></div>
        </div>
      </aside>
      <div class="canvas-center">
        <div class="canvas-toolbar" aria-label="Canvas controls">
          <button class="canvas-button" type="button" id="canvas-collapse">Collapse all</button>
          <button class="canvas-button" type="button" id="canvas-expand">Expand stage</button>
          <span class="canvas-spacer"></span>
          <button class="canvas-button" type="button" id="canvas-zoom-out" aria-label="Zoom out">−</button><output class="canvas-zoom" id="canvas-zoom">100%</output><button class="canvas-button" type="button" id="canvas-zoom-in" aria-label="Zoom in">+</button>
          <button class="canvas-button" type="button" id="canvas-fit">Fit</button><button class="canvas-button" type="button" id="canvas-reset">Reset</button>
          <button class="canvas-button" type="button" id="canvas-about-open">About</button>
        </div>
        <p class="canvas-route-note" id="canvas-route-note"></p>
        <div id="canvas-viewport" class="canvas-viewport" tabindex="0" role="region" aria-label="Interactive purchase flow. Drag the background or use arrow keys to pan. Use plus and minus to zoom. Tab to a node or its expand button."><div class="canvas-world" id="canvas-world"></div></div>
        <div id="canvas-status" role="status" aria-live="polite"></div>
        <div class="canvas-footer"><span id="canvas-visible-count"></span><span>Drag to pan · Ctrl/⌘ + scroll to zoom</span></div>
      </div>
      <aside class="canvas-inspector" id="canvas-inspector" aria-label="Selected purchase-flow branch"></aside>
    </div>
    <dialog class="canvas-about" id="canvas-about" aria-labelledby="canvas-about-title"><h2 id="canvas-about-title">What this map establishes</h2>
      <p>This is a selective source trace of the current local checkout, payment, order and issuance flow. It describes implementation at the revisions below, not the deployed state of any Organization.</p>
      <table><thead><tr><th>Repository</th><th>Local branch</th><th>Revision</th></tr></thead><tbody>${Object.entries(model.revisions).map(([repo,r]) => `<tr><td>${esc(repo)}</td><td>${esc(r.branch)}</td><td><code>${esc(r.commit.slice(0,12))}</code></td></tr>`).join('')}</tbody></table>
      <ul><li>Both working trees were clean at review. Backend and frontend are on different branches; compatibility of a deployed pair is not established.</li><li>Solid connectors show the ordinary sale sequence. Dotted branches are conditions, alternatives or special outcomes. They are not all required or freely interchangeable.</li><li>Green badges mean selected current source was reviewed. Amber dashed nodes mark partial or older reference mapping. Neither badge means an executed purchase test.</li><li>No live purchases, provider/device tests, Admin access, saved-flag checks or Qase coverage audit were performed.</li><li>The older searchable matrix is retained in the other tabs. Its entire catalog was not re-certified against these revisions.</li><li>This page uses local HTML/CSS/JS only. It makes no Showpass API calls and changes no business records. Copy links contain view selections only.</li></ul>
      <p>Source links work best when this page is opened from the filesystem. Each source also has a copyable absolute path and line number. Local paths assume the current sibling repository layout.</p>
      <div class="dialog-actions"><button type="button" class="canvas-button" id="canvas-about-close">Close</button></div>
    </dialog>`;
  const $ = id => document.getElementById(id);
  const viewport = $('canvas-viewport');
  const world = $('canvas-world');

  function announce(message) {
    $('canvas-status').textContent = message;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { $('canvas-status').textContent = ''; }, 3500);
  }
  function ancestorStage(id) {
    let node = byId.get(id);
    while (node?.parent) node = byId.get(node.parent);
    return node;
  }
  function reveal(id) {
    let node = byId.get(id);
    while (node?.parent) { state.expanded.add(node.parent); node = byId.get(node.parent); }
  }
  function transform() {
    world.style.transform = `translate(${state.x}px,${state.y}px) scale(${state.scale})`;
    $('canvas-zoom').textContent = `${Math.round(state.scale*100)}%`;
    $('canvas-zoom-out').disabled = state.scale <= .2;
    $('canvas-zoom-in').disabled = state.scale >= 1.8;
  }
  function updateHash() {
    const params = new URLSearchParams({ node:state.selected, open:[...state.expanded].join(','), example:state.recipe, lens:state.lens });
    try { history.replaceState(null, '', `#canvas?${params}`); } catch { /* Some file hosts disable history. */ }
  }
  function fit() {
    if (!viewport.clientWidth || !viewport.clientHeight) return;
    state.scale = Math.max(.2, Math.min(1, (viewport.clientWidth-48)/state.width, (viewport.clientHeight-48)/state.height));
    state.x = (viewport.clientWidth-state.width*state.scale)/2;
    state.y = (viewport.clientHeight-state.height*state.scale)/2;
    transform();
  }
  function center(id) {
    const pos = state.positions.get(id);
    if (!pos) return;
    state.x = (state.expanded.has(id) ? 20 : Math.max(22, (viewport.clientWidth-270*state.scale)/2)) - pos.x*state.scale;
    state.y = viewport.clientHeight*.5 - (pos.y+42)*state.scale;
    transform();
  }
  function zoom(factor, point) {
    const old = state.scale;
    state.scale = Math.min(1.8,Math.max(.2,state.scale*factor));
    const px = point?.x ?? viewport.clientWidth/2, py = point?.y ?? viewport.clientHeight/2;
    state.x = px - (px-state.x)*state.scale/old;
    state.y = py - (py-state.y)*state.scale/old;
    transform();
  }
  function layout() {
    state.positions.clear();
    let maxX = 0;
    function place(node, x, top) {
      const subs = state.expanded.has(node.id) ? children(node.id) : [];
      let bottom = top;
      if (subs.length) {
        for (const child of subs) { bottom = place(child,x+324,bottom)+16; }
        bottom -= 16;
      } else bottom += 84;
      const y = top + (bottom-top-84)/2;
      state.positions.set(node.id,{ x,y });
      maxX = Math.max(maxX,x+270);
      return bottom;
    }
    let top = 28;
    for (const node of stages) top = place(node,28,top)+28;
    state.width = maxX+28;
    state.height = top;
  }
  function render() {
    const focusId = document.activeElement?.dataset?.focusId;
    layout();
    const highlighted = new Set(route().nodes);
    const paths = [];
    const curve = (a,b) => `M ${a.x+270} ${a.y+42} C ${a.x+297} ${a.y+42}, ${b.x-27} ${b.y+42}, ${b.x} ${b.y+42}`;
    for (const node of model.nodes) {
      const p = state.positions.get(node.id);
      if (!p || !node.parent) continue;
      const parent = state.positions.get(node.parent);
      const lit = highlighted.has(node.id) && highlighted.has(node.parent);
      paths.push(`<path class="canvas-edge branch ${lit?'highlight':''}" d="${curve(parent,p)}"/>`);
    }
    for (let i=1;i<stages.length;i++) {
      const a = state.positions.get(stages[i-1].id), b = state.positions.get(stages[i].id);
      const lit = highlighted.has(stages[i-1].id) && highlighted.has(stages[i].id);
      paths.push(`<path class="canvas-edge ${lit?'highlight':''}" marker-end="url(#canvas-arrow${lit?'-green':''})" d="M ${a.x+135} ${a.y+84} L ${b.x+135} ${b.y-3}"/>`);
    }
    const stageNo = new Map(stages.map((n,i) => [n.id,String(i+1).padStart(2,'0')]));
    world.style.width = `${state.width}px`; world.style.height = `${state.height}px`;
    world.innerHTML = `<svg width="${state.width}" height="${state.height}" aria-hidden="true"><defs><marker id="canvas-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="#7d9c91"/></marker><marker id="canvas-arrow-green" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="#0d8c70"/></marker></defs>${paths.join('')}</svg>` + model.nodes.filter(n => state.positions.has(n.id)).map(n => {
      const p = state.positions.get(n.id), count = children(n.id).length;
      const dimLens = state.lens !== 'all' && n.audience && !n.audience.includes(state.lens);
      return `<div class="flow-node ${n.kind==='stage'?'canvas-main-stage':''} ${state.selected===n.id?'selected':''} ${!n.reviewed?'reference':''} ${highlighted.size?(highlighted.has(n.id)?'path-active':'path-dim'):''} ${dimLens?'lens-dim':''}" data-node="${n.id}" style="left:${p.x}px;top:${p.y}px">
        <button type="button" class="flow-node-main" data-select="${n.id}" data-focus-id="select-${n.id}" aria-pressed="${state.selected===n.id}" aria-label="${esc(n.title)}. Show conditions and source references"><span class="flow-node-meta">${stageNo.has(n.id)?`${stageNo.get(n.id)} / MAIN JOURNEY`:n.reviewed?'SOURCE REVIEWED':'PARTIAL / REFERENCE'}</span><span class="flow-node-title">${esc(n.title)}</span><span class="flow-node-summary">${esc(n.summary)}</span></button>
        ${count?`<button type="button" class="flow-node-toggle" data-toggle="${n.id}" data-focus-id="toggle-${n.id}" aria-expanded="${state.expanded.has(n.id)}" aria-label="${state.expanded.has(n.id)?'Collapse':'Expand'} ${esc(n.title)}">${state.expanded.has(n.id)?'−':'+'}<small>${count}</small></button>`:''}
      </div>`;
    }).join('');
    $('canvas-visible-count').textContent = `${state.positions.size} of ${model.nodes.length} nodes visible`;
    $('canvas-route-note').innerHTML = `<b>${esc(route().title)}.</b> ${esc(route().description)}${state.lens!=='all'?' Audience highlighting dims unrelated entry/tender branches; it does not prove a valid combination.':''}`;
    $('canvas-recipe').value = state.recipe;
    $('canvas-lens').value = state.lens;
    const stage = ancestorStage(state.selected);
    $('canvas-stage-nav').querySelectorAll('button').forEach(b => b.setAttribute('aria-current',String(b.dataset.jump===stage?.id)));
    renderInspector();
    transform();
    restoringFocus=true;
    if (focusId) [...world.querySelectorAll('[data-focus-id]')].find(el=>el.dataset.focusId===focusId)?.focus({preventScroll:true});
    restoringFocus=false;
    updateHash();
  }
  function sourcePath(key) {
    const [repo,path] = model.sources[key];
    return `/Users/christianvaldez/Documents/Showpass/repos/${repo}/${path}`;
  }
  function renderInspector() {
    const n = byId.get(state.selected);
    if (!n) return;
    if ($('canvas-inspector').dataset.selected !== state.selected) $('canvas-inspector').scrollTop=0;
    $('canvas-inspector').dataset.selected=state.selected;
    const subs = children(n.id);
    $('canvas-inspector').innerHTML = `<div class="canvas-kicker">${n.parent?esc(ancestorStage(n.id).title):'Selected stage'}</div><span class="canvas-proof ${n.reviewed?'':'reference'}">${n.reviewed?'Current source reviewed':'Partial / older reference'}</span><h3>${esc(n.title)}</h3><p class="inspector-summary">${esc(n.summary)}</p>
      ${n.when?`<h4>When this applies</h4><p>${esc(n.when)}</p>`:`<h4>Open this stage</h4><p>Use the + button on the card, or choose a branch below. These branches describe conditions and alternatives; they are not consecutive steps.</p>`}
      ${n.result?`<h4>What happens</h4><p>${esc(n.result)}</p>`:''}
      ${n.caveat?`<div class="canvas-caveat"><p>${esc(n.caveat)}</p></div>`:''}
      ${subs.length?`<h4>${subs.length} branches to explore</h4><div class="canvas-link-list">${subs.map(s=>`<button type="button" class="canvas-button" data-jump="${s.id}">${esc(s.title)} →</button>`).join('')}</div>`:''}
      ${n.links?.length?`<h4>Continue / return</h4><div class="canvas-link-list">${n.links.map(([id,label])=>`<button type="button" class="canvas-button" data-jump="${id}">${esc(label)} →</button>`).join('')}</div>`:''}
      <h4>Source references</h4><p>Reviewed ${esc(model.reviewedOn)} · implementation evidence; live purchase not run.</p>
      ${(n.sources||[]).map(key=>{const [repo,path,line,label]=model.sources[key];const href='../../../'+repo+'/'+path.split('/').map(encodeURIComponent).join('/')+'#L'+line;return `<div class="canvas-source">${location.protocol==='file:'?`<a href="${href}" target="_blank" rel="noopener">${esc(label)} ↗</a>`:`<span class="canvas-source-label">${esc(label)}</span>`}<code>${esc(repo)}/${esc(path)}:${line}</code><small>${esc(model.revisions[repo].branch)} · ${esc(model.revisions[repo].commit.slice(0,12))}</small><button type="button" class="canvas-button" data-copy-source="${key}">Copy path + line</button></div>`;}).join('')}
      <details><summary>Proof still needed</summary><p>This node was not run against a live Showpass environment. Source review does not establish saved flags, gateway settings, permissions, provider results, Inventory, delivered artifacts or report totals.</p></details>
      <div class="canvas-link-list" style="margin-top:16px"><button type="button" class="canvas-button" id="canvas-copy-link">Copy this view link</button><button type="button" class="canvas-button" data-reference-browse>Browse older detailed records →</button></div>`;
  }
  function select(id, move=true) {
    if (!byId.has(id)) return;
    state.selected=id;
    reveal(id);
    render();
    if(move) center(id);
  }
  function toggle(id) {
    const before=state.positions.get(id);
    if(state.expanded.has(id)) {
      state.expanded.delete(id);
      let n=byId.get(state.selected);
      while(n?.parent) { if(n.parent===id) { state.selected=id; break; } n=byId.get(n.parent); }
    } else state.expanded.add(id);
    render();
    const after=state.positions.get(id);
    if(before&&after) { state.y+=(before.y-after.y)*state.scale;if(state.expanded.has(id))state.x=20-after.x*state.scale;transform(); }
    announce(`${byId.get(id).title} ${state.expanded.has(id)?'expanded':'collapsed'}`);
  }
  function applyRecipe(id) {
    state.recipe=model.recipes.some(r=>r.id===id)?id:'all';
    state.expanded.clear();
    for(const nodeId of route().nodes) reveal(nodeId);
    state.selected=route().nodes[0]||'entry';
    render(); fit();
    if(state.recipe==='all') { state.scale=1;state.x=Math.max(20,(viewport.clientWidth-state.width)/2);state.y=24;transform(); }
    if(state.recipe!=='all' && state.scale<.6) { state.scale=.85; center(state.selected); }
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); announce('Copied.'); }
    catch {
      const area=document.createElement('textarea'); area.value=text; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.opacity='0'; document.body.append(area); area.select();
      const ok=document.execCommand('copy'); area.remove(); announce(ok?'Copied.':'Copy is unavailable in this browser. The source path is shown in the panel.');
    }
  }
  function search() {
    const q=$('canvas-search').value.trim().toLowerCase();
    $('canvas-search-results').hidden=!q;
    $('canvas-navigation').hidden=!!q;
    if(!q) return;
    const matches=model.nodes.filter(n=>[n.title,n.summary,n.when,n.result,n.caveat,...n.sources.map(k=>model.sources[k].join(' '))].join(' ').toLowerCase().includes(q));
    $('canvas-search-count').textContent=matches.length?`${matches.length} matching branches`:'No matching branches. Try “credit”, “terminal” or “Waitlist”.';
    $('canvas-matches').innerHTML=matches.map(n=>`<button type="button" class="canvas-search-result" data-jump="${n.id}">${esc(n.title)}<small>${esc(ancestorStage(n.id).title)}</small></button>`).join('');
  }
  host.addEventListener('click',e=>{
    const selectButton=e.target.closest('[data-select]');
    const toggleButton=e.target.closest('[data-toggle]');
    const jump=e.target.closest('[data-jump]');
    const source=e.target.closest('[data-copy-source]');
    if(selectButton) { select(selectButton.dataset.select,false); return; }
    if(toggleButton) { toggle(toggleButton.dataset.toggle); return; }
    if(jump) { select(jump.dataset.jump); return; }
    if(source) { const k=source.dataset.copySource; copy(`${sourcePath(k)}:${model.sources[k][2]}`); return; }
    if(e.target.closest('#canvas-copy-link')) { copy(location.href); return; }
    if(e.target.closest('[data-reference-browse]')) { window.switchView?.('browse'); }
  });
  $('canvas-collapse').onclick=()=>{state.expanded.clear();state.selected=ancestorStage(state.selected).id;render();state.scale=1;center(state.selected);};
  $('canvas-expand').onclick=()=>{const stage=ancestorStage(state.selected);state.expanded.add(stage.id);render();center(stage.id);};
  $('canvas-fit').onclick=fit;
  $('canvas-zoom-in').onclick=()=>zoom(1.2);
  $('canvas-zoom-out').onclick=()=>zoom(1/1.2);
  $('canvas-reset').onclick=()=>{state.lens='all';$('canvas-search').value='';search();applyRecipe('all');};
  $('canvas-recipe').onchange=e=>applyRecipe(e.target.value);
  $('canvas-lens').onchange=e=>{state.lens=e.target.value;render();};
  $('canvas-search').oninput=search;
  $('canvas-search').onkeydown=e=>{if(e.key==='Escape') {e.target.value='';search();} };
  $('canvas-about-open').onclick=()=>$('canvas-about').showModal();
  $('canvas-about-close').onclick=()=>$('canvas-about').close();
  world.addEventListener('focusin',e=>{if(restoringFocus)return;const b=e.target.closest('[data-select],[data-toggle]');if(!b)return;const r=b.getBoundingClientRect(),v=viewport.getBoundingClientRect();if(r.left<v.left||r.right>v.right||r.top<v.top||r.bottom>v.bottom)center(b.dataset.select||b.dataset.toggle);});
  let drag=null;
  viewport.addEventListener('pointerdown',e=>{
    if(e.target.closest('button,a')||e.button!==0) return;
    drag={x:e.clientX,y:e.clientY,tx:state.x,ty:state.y};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');viewport.focus({preventScroll:true});
  });
  viewport.addEventListener('pointermove',e=>{if(!drag)return;state.x=drag.tx+e.clientX-drag.x;state.y=drag.ty+e.clientY-drag.y;transform();});
  const endDrag=()=>{drag=null;viewport.classList.remove('dragging');};
  viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);
  viewport.addEventListener('wheel',e=>{
    e.preventDefault();
    if(e.ctrlKey||e.metaKey) {const r=viewport.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.008),{x:e.clientX-r.left,y:e.clientY-r.top});}
    else {state.x-=e.deltaX+(e.shiftKey?e.deltaY:0);state.y-=e.shiftKey?0:e.deltaY;transform();}
  },{passive:false});
  viewport.addEventListener('keydown',e=>{
    if(e.target!==viewport)return;
    const delta={ArrowDown:[0,-70],ArrowUp:[0,70],ArrowLeft:[70,0],ArrowRight:[-70,0]}[e.key];
    if(delta){e.preventDefault();state.x+=delta[0];state.y+=delta[1];transform();}
    else if(e.key==='+'||e.key==='='){e.preventDefault();zoom(1.2);}
    else if(e.key==='-'){e.preventDefault();zoom(1/1.2);}
    else if(e.key==='Home'){e.preventDefault();fit();}
  });
  const params=location.hash.startsWith('#canvas?')?new URLSearchParams(location.hash.slice(8)):null;
  if(params) {
    for(const id of (params.get('open')||'').split(',')) if(byId.has(id)&&children(id).length)state.expanded.add(id);
    if(byId.has(params.get('node')))state.selected=params.get('node');
    if(model.recipes.some(r=>r.id===params.get('example')))state.recipe=params.get('example');
    if(['all','customer','embedded','seller'].includes(params.get('lens')))state.lens=params.get('lens');
    reveal(state.selected);
  }
  render();
  let firstSize=true;
  new ResizeObserver(()=>{if(!viewport.clientWidth)return;if(firstSize){state.scale=1;if(params)center(state.selected);else{state.x=Math.max(20,(viewport.clientWidth-state.width)/2);state.y=24;transform();}firstSize=false;}else center(state.selected);}).observe(viewport);
})();
