// Harcer screen kit. Every builder returns the HTML of one .scr (402×874 points).
// Content is real app content (debug-data/*.json, assets/explain, assets/vocab), copied in below.
// Usage: <link rel="stylesheet" href="kit.css"><script src="kit.js"></script>, then
//   await HK.ready; el.innerHTML = HK.screens.mathQ({ state: 'ok' });
(function () {
  const HK = (window.HK = {});
  let GLYPH = {};
  HK.ready = Promise.all([
    fetch(HK_BASE() + 'ionicons.json').then(r => r.json()).then(j => (GLYPH = j)),
    document.fonts.load('20px Ionicons'),
  ]);
  function HK_BASE() { const s = document.currentScript || [...document.scripts].find(s => /kit\.js/.test(s.src)); return s.src.replace(/kit\.js.*$/, ''); }
  const BASE = HK_BASE();
  const ic = (name, size = 20, color = 'currentColor', extra = '') =>
    `<i class="io" style="font-size:${size}px;color:${color};${extra}">${GLYPH[name] ? String.fromCodePoint(GLYPH[name]) : '?'}</i>`;
  HK.ic = ic;

  // ───────────── chrome ─────────────
  const statusIcons = c => `<span class="ic">
    <svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="8" width="3.2" height="4" rx="1" fill="${c}"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1" fill="${c}"/><rect x="10" y="3" width="3.2" height="9" rx="1" fill="${c}"/><rect x="15" y="0" width="3.2" height="12" rx="1" fill="${c}"/></svg>
    <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.2c2.5 0 4.8 1 6.5 2.6l1.2-1.3A11 11 0 0 0 8.5.4 11 11 0 0 0 .8 3.5L2 4.8a9.2 9.2 0 0 1 6.5-2.6Zm0 3.6c1.5 0 2.9.6 4 1.6l1.2-1.3a7.6 7.6 0 0 0-10.4 0l1.2 1.3c1.1-1 2.5-1.6 4-1.6Zm0 3.6c.6 0 1.1.2 1.5.6L8.5 11.6 7 10c.4-.4.9-.6 1.5-.6Z" fill="${c}"/></svg>
    <svg width="28" height="13" viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="${c}" stroke-opacity=".4"/><rect x="2" y="2" width="21" height="9" rx="2.5" fill="${c}"/><path d="M26 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="${c}" fill-opacity=".45"/></svg></span>`;
  const sb = (dark, time = '09:41') => `<div class="sb ${dark ? 'dark' : 'light'}"><span>${time}</span><div class="isl"></div>${statusIcons(dark ? '#fff' : '#000')}</div>`;
  const hi = dark => `<div class="hi ${dark ? 'dark' : ''}"></div>`;
  HK.statusBar = sb;
  const logo = (h = 22) => `<img src="${BASE}logo-white.svg" style="height:${(h * 1403.2 / 760).toFixed(1)}px;display:block">`;
  // release tab bar: the Մաթեմ review tab is __DEV__-only, so a store build shows these four
  const tabs = on => `<div class="tabs">${[['home', 'Գլխավոր'], ['stats-chart', 'Առաջընթաց'], ['game-controller', 'Խաղեր'], ['person-circle', 'Պրոֆիլ']]
    .map(([i, l], k) => `<div class="t ${k === on ? 'on' : ''}">${ic(k === on ? i : i + '-outline', 24)}<span>${l}</span></div>`).join('')}</div>`;
  const toolbar = (saved = false) => `<div class="tb"><div class="bar"><div class="b36">${ic('chevron-back', 22)}</div><div style="flex:1"></div>
    <div class="b36" style="font-weight:700;font-size:13px">A<span style="font-size:17px">A</span></div><div class="b36">${ic('sunny-outline', 20)}</div><div class="b36">${ic('brush-outline', 19)}</div></div>
    <div class="pin ${saved ? 'on' : ''}">${ic(saved ? 'bookmark' : 'bookmark-outline', 15)}${saved ? 'Պահպանված է' : 'Պահպանել'}</div></div>`;

  // ───────────── content (real) ─────────────
  const COVERS = { slate: ['#4E6B79', '#3A515C'], green: ['#2F6B5E', '#234F45'], wine: ['#6E3540', '#51262E'], navy: ['#3C4E7A', '#2C3A5C'] };
  // beta: the flask badge the app puts on a BETA subject's covers (MainPage coverBeta)
  // One volume on the home shelf, as app/(tabs)/MainPage.tsx draws it: the contact shadow, the page block
  // with its fore-edge lines, then the cloth cover (93 of the 100 points) with spine strip, hinge, the
  // stamped frame around everything, and the foot pill. kind: open (an owner's «Բացել ›») | try (a free sample's «ՓՈՐՁԵԼ ›»)
  const book = (ser, rn, col, kind = 'open', beta = false) => `<div class="book"><div class="ftsh"></div><div class="pg"></div>${[97.65, 95.85, 94.05].map((x, i) => `<i class="ln" style="left:${x}px;opacity:${(.9 - i * .2).toFixed(1)}"></i>`).join('')}
    <div class="cv" style="background:linear-gradient(to bottom right,${COVERS[col][0]},${COVERS[col][1]})"><i class="sp"></i><i class="hg"></i><i class="fr"></i>
      <div class="bd"><div class="ser">${ser}</div><div class="lb"><div class="ey">ՄԱՍ</div><div class="rn">${rn}</div></div>
        <div class="ft">${kind === 'try' ? `<div class="pill gold">ՓՈՐՁԵԼ${ic('chevron-forward', 10, '#2A2A2A')}</div>` : `<div class="pill">Բացել${ic('chevron-forward', 10, '#F3EAD3')}</div>`}</div></div>
      ${beta ? `<div class="bt">${ic('flask', 10, '#F3EAD3')}</div>` : ''}</div></div>`;
  const MATH = { // book 1, 1.7.4 — assets/explain/explain_1_7.json + math bank
    stem: 'Տրված է <span class="m">f</span>(<span class="m">x</span>) = <span class="m">x</span>³ − 3<span class="m">x</span>² − 9<span class="m">x</span> + 8 ֆունկցիան:',
    q: 'Գտնել <span class="m">f</span> ֆունկցիայի նվազման միջակայքերը:',
    opts: ['[−3; 1]', '(−∞; −1] ∪ [3; +∞)', '(−∞; −3] և [1; +∞)', '[−1; 3]'], answer: 3,
    steps: [
      { t: 'Ինչու՞ է պետք ածանցյալը', b: 'Ածանցյալը յուրաքանչյուր կետում շոշափողի թեքությունն է: Հետևե՛ք շոշափողին. որտեղ գրաֆիկը բարձրանում է, այն թեքված է վերև (թեքությունը դրական է), որտեղ իջնում է՝ ներքև (բացասական):', f: '<span class="m">f</span> նվազում է ⇔ <span class="m">f′</span>(<span class="m">x</span>) &lt; 0' },
      { t: 'Հաշվում ենք ածանցյալը', b: 'Ածանցում ենք անդամ առ անդամ և վերլուծում: Ստացվածը պարաբոլ է. նրա գրաֆիկը գծված է ներքևում՝ նույն <span class="m">x</span>-երի տակ:', f: '<span class="m">f′</span>(<span class="m">x</span>) = 3<span class="m">x</span>² − 6<span class="m">x</span> − 9 = 3(<span class="m">x</span> + 1)(<span class="m">x</span> − 3)' },
      { t: 'Ինչու՞ հենց այս երկու կետը', b: 'Շոշափողը հորիզոնական է այնտեղ, որտեղ <span class="m">f′</span>(<span class="m">x</span>) = 0, այսինքն՝ պարաբոլը հատում է առանցքը: Դա <span class="m">x</span> = −1 և <span class="m">x</span> = 3 կետերն են՝ գրաֆիկի «գագաթն» ու «փոսը»:', f: '<span class="m">f′</span>(<span class="m">x</span>) = 0 ⇔ <span class="m">x</span> = −1 կամ <span class="m">x</span> = 3' },
      { t: 'Կարդում ենք պատասխանը պարաբոլից', b: 'Պարաբոլի ճյուղերը վերև են, ուրեմն այն առանցքի տակ է իր արմատների միջև: Այնտեղ <span class="m">f′</span> &lt; 0, հետևաբար այնտեղ <span class="m">f</span>-ը նվազում է: Ծայրակետերը ներառվում են:', f: '<span class="m">f</span> ↘ [−1; 3]' },
    ],
    // "Տիպիկ սխալներ" — why each wrong option is wrong (explain JSON distractors)
    why: { 0: 'Ստացվում է <span class="m">x</span>² − 2<span class="m">x</span> − 3 = (<span class="m">x</span> + 3)(<span class="m">x</span> − 1) սխալ վերլուծությունից. ճիշտն է (<span class="m">x</span> + 1)(<span class="m">x</span> − 3):', 1: 'Սա այն միջակայքն է, որտեղ պարաբոլը առանցքից վերև է՝ <span class="m">f′</span> &gt; 0, այսինքն՝ աճման միջակայքը:', 2: 'Նույն սխալ արմատները, դրան գումարած՝ վերցված է աճման, ոչ թե նվազման միջակայքը:' },
  };
  HK.MATH = MATH;
  const BIO = { // debug-data/biology.json, Մաս 1 · Գլուխ 1 · 1
    where: 'Կենսաբանություն · Մաս 1 · Գլուխ 1', n: 1, total: 142,
    q: 'Հետևյալ օրգանիզմներից ո՞րն է պատկանում նախակորիզավորների վերնաթագավորությանը.',
    opts: ['մուկորը', 'քլամիդոմոնադը', 'կանաչ էվգլենան', 'անաբենան'], answer: 3,
  };
  const HIST = { // debug-data/history.json, Գիրք 1 · Մաս Ա · 1. Տարեթվեր · 1
    where: 'Հայոց պատմություն · Գիրք 1 · Տարեթվեր', n: 1, total: 60,
    q: 'Ե՞րբ է հայերենն անջատվել հնդեվրոպական մայր լեզվից.',
    opts: ['Ք. ա. VI հազարամյակի սկզբին', 'Ք. ա. VI հազարամյակի վերջին', 'Ք. ա. IV հազարամյակի վերջին', 'Ք. ա. V հազարամյակի սկզբին'], answer: 2,
  };
  HK.QUIZ = { bio: BIO, hist: HIST };
  const DISNEY = ['Walt Disney was born in 1901 in Chicago, but soon moved to a', 'small farm near Marceline, Missouri. From this rural and rather humble', 'beginning, he later became one of the most famous and beloved',
    'motion-picture producers in history. Although he died in 1966, his', 'name and artistic legacy continue to influence the lives of millions of', 'people throughout the world.',
    'After several years of barely making ends meet as a cartoon artist', 'operating from his Los Angeles garage, Disney had his first success in', '1928, with his release of Mickey Mouse cartoon. Throughout the next',
    'decade, he continued to produce a number of cartoons, and developed', 'more of his highly profitable and enduring creations, such as Donald', 'Duck and Pluto.'];
  // assets/vocab/en-hy.json
  const VOCAB = { humble: 'համեստ, խոնարհ', rural: 'գյուղական, գյուղատնտեսական', beloved: 'սիրելի, սիրված', legacy: 'ժառանգություն, ժառանգած բան', enduring: 'տևական, մնայուն, երկարատև', barely: 'հազիվ, հազիվ թե', influence: 'ազդեցություն, ներգործություն', famous: 'հայտնի, նշանավոր' };
  HK.VOCAB = VOCAB;

  // ───────────── 1. home ─────────────
  HK.screens = {};
  // All 5 subjects as in constants/subjects.ts; biology and history carry BETA. Covers take the
  // cloth by shelf position (constants/bookCovers.ts BOOK_CLOTH) and an owner's «Բացել ›».
  HK.screens.home = ({ subject = 'en' } = {}) => {
    const pills = [['en', 'Անգլերեն'], ['hy', 'Հայոց լեզու'], ['math', 'Մաթեմատիկա'], ['bio', 'Կենսաբանություն', true], ['hist', 'Հայոց պատմություն', true]];
    const CLOTH = ['slate', 'green', 'wine', 'navy'], RN = ['I', 'II', 'III', 'IV'];
    const shelf = (ser, n, beta = false) => Array.from({ length: n }, (_, i) => book(ser, RN[i], CLOTH[i], 'open', beta));
    const books = {
      en: shelf('Անգլերեն', 3), hy: shelf('Հայոց լեզու', 4), math: shelf('Մաթեմատիկա', 2),
      bio: shelf('Կենսաբանություն', 4, true), hist: shelf('Հայոց պատմություն', 3, true),
    }[subject] || [];
    const beta = `<div style="position:absolute;top:-6px;right:-6px;background:#3182CE;border:1.5px solid #4F6D7B;border-radius:8px;padding:2px 6px;font-size:8px;font-weight:700;letter-spacing:.6px;color:#fff;box-shadow:0 2px 4px rgba(49,130,206,.4)">BETA</div>`;
    return `<div class="scr">${sb(true)}
      <div class="hdr" style="height:250px"><div style="position:absolute;left:20px;top:78px">${logo(22)}</div>
        <div style="position:absolute;right:20px;top:82px;width:36px;height:36px;border-radius:18px;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center">${ic('help-circle', 24, '#fff')}</div>
        <div class="pillrow" style="position:absolute;left:20px;top:140px;display:flex;gap:10px;white-space:nowrap">${pills.map(([k, l, b]) => `<div ${k === subject ? 'data-on="1"' : ''} style="position:relative;padding:12px 20px;border-radius:25px;font-size:14px;font-weight:${k === subject ? 800 : 600};${k === subject ? 'background:#FFB347;color:#fff;box-shadow:0 4px 12px rgba(255,179,71,.45)' : 'background:rgba(255,255,255,.15);color:rgba(255,255,255,.8)'}">${l}${b ? beta : ''}</div>`).join('')}</div></div>
      <div class="sheet" style="top:205px">
        <div style="position:absolute;left:20px;top:26px;font-size:19px;font-weight:700">Շտեմարաններ</div>
        <div class="shelf" style="top:219px"><div class="top"></div><div class="lip"></div><div class="fr"></div><div class="un"></div><div class="cast"></div></div>
        <div style="position:absolute;left:20px;top:74px;display:flex;gap:22px">${books.join('')}</div>
        <div style="position:absolute;left:20px;top:272px;font-size:19px;font-weight:700">Այլ հնարավորություններ</div>
        <div style="position:absolute;left:20px;right:20px;top:312px;display:flex;flex-direction:column;gap:9px">
          <div class="feat"><div class="d">${ic('school-outline', 17)}</div><div class="n">Փորձնական քննություն</div>${ic('chevron-forward', 17, '#94A3B8')}</div>
          <div class="feat"><div class="d">${ic('alert-circle-outline', 18)}</div><div class="n">Բոլոր սխալները</div><span class="cnt red">16</span>${ic('chevron-forward', 17, '#94A3B8')}</div>
          <div class="feat"><div class="d">${ic('bookmark-outline', 17)}</div><div class="n">Պահպանված հարցեր</div><span class="cnt amb">3</span>${ic('chevron-forward', 17, '#94A3B8')}</div>
          <div class="feat"><div class="d">${ic('language-outline', 17)}</div><div class="n">Իմ բառերը</div><span class="cnt grn">24</span>${ic('chevron-forward', 17, '#94A3B8')}</div>
        </div></div>
      ${tabs(0)}${hi()}</div>`;
  };

  // ───────────── 2. math question ─────────────
  // state: idle | picked | ok | no ; pick = chosen option index
  HK.screens.mathQ = ({ state = 'idle', pick = MATH.answer, saved = false } = {}) => {
    const cls = i => state === 'idle' ? '' : state === 'picked' ? (i === pick ? 'sel' : '') : i === MATH.answer ? 'ok' : (state === 'no' && i === pick ? 'no' : '');
    const segs = [1, 2, 3, 4].map(n => `<div class="seg ${n === 3 ? 'cur' : n === 1 ? 'ok' : n === 2 ? 'ok' : ''}">${n}</div>`).join('');
    const btn = state === 'idle' ? `<div class="prim ghost">Բաց թողնել ${ic('chevron-forward', 16)}</div>` : state === 'picked' ? `<div class="prim">Ստուգել</div>` : `<div class="prim">Հաջորդ ${ic('chevron-forward', 16)}</div>`;
    return `<div class="scr" style="background:#fff">${sb(false)}${toolbar(saved)}
      <div style="position:absolute;left:18px;right:18px;top:122px;display:flex;align-items:baseline;gap:8px"><b style="font-size:13px">Խումբ 4 / 20</b><span style="font-size:12px;color:#94A3B8">էջ 94</span>
</div>
      <div style="position:absolute;left:16px;right:16px;top:144px;display:flex;gap:8px">${segs}</div>
      <div class="paper" style="top:200px;bottom:0"></div>
      <div style="position:absolute;left:16px;right:16px;top:214px;display:flex;flex-direction:column;gap:12px">
        <div class="qcard" style="font-size:15.5px;font-weight:700;padding:14px 16px">${MATH.stem}</div>
        <div class="qcard" style="display:flex;gap:10px;font-size:17px;font-weight:600;line-height:24px;padding:18px 16px"><span style="color:#94A3B8">3.</span><span>${MATH.q}</span></div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:6px">${MATH.opts.map((o, i) => `<div class="ch ${cls(i)}"><div class="c">${i + 1}</div><span>${o}</span></div>`).join('')}</div>
        <div style="display:flex;justify-content:center;margin-top:16px"><div class="xpill">${ic('bulb', 17, '#F59E0B')}Բացատրություն <span style="font-weight:600;opacity:.8">· 4 քայլ</span></div></div>
      </div>
      <div class="dock"><div class="circ">${ic('chevron-back', 20)}</div>${btn}</div>${hi()}</div>`;
  };

  // ───────────── 3. explanation sheet (over the math question) ─────────────
  // at: optional x of the tangent point (the app's slider); the tangent then takes the slope's colour as in the app
  function graphSVG(step, W, H, at) {
    const f = x => x ** 3 - 3 * x * x - 9 * x + 8, d = x => 3 * x * x - 6 * x - 9;
    const X0 = -3.6, X1 = 5.6, pad = 14;
    const two = step >= 2;
    const boxes = two ? [{ y: 10, h: H / 2 - 16, r: [-26, 22], fn: f }, { y: H / 2 + 6, h: H / 2 - 16, r: [-15, 40], fn: d }] : [{ y: 10, h: H - 20, r: [-26, 22], fn: f }];
    let s = '';
    const INK = '#4A5568', AMB = '#F59E0B', moved = at != null;
    const tx = moved ? at : step === 1 ? -0.4514 : 0.6349;
    const RED = moved && (step === 1 || step === 2) && d(tx) > 0 ? '#10B981' : '#E53E3E';
    const num = v => v.toFixed(2).replace('-', '−').replace('.', ',');
    boxes.forEach((b, bi) => {
      const sx = x => pad + (x - X0) / (X1 - X0) * (W - 2 * pad), sy = y => b.y + (b.r[1] - y) / (b.r[1] - b.r[0]) * b.h;
      for (let x = -3; x <= 5; x++) s += `<line x1="${sx(x)}" y1="${b.y}" x2="${sx(x)}" y2="${b.y + b.h}" stroke="#94A3B8" stroke-opacity=".3"/>` + (x ? `<text x="${sx(x)}" y="${sy(0) + 13}" font-size="10" fill="#94A3B8" text-anchor="middle">${x < 0 ? '−' + -x : x}</text>` : '');
      for (let y = Math.ceil(b.r[0] / 10) * 10; y <= b.r[1]; y += 10) s += `<line x1="${pad}" y1="${sy(y)}" x2="${W - pad}" y2="${sy(y)}" stroke="#94A3B8" stroke-opacity=".3"/>` + (y ? `<text x="${sx(0) - 4}" y="${sy(y) + 3}" font-size="10" fill="#94A3B8" text-anchor="end">${y < 0 ? '−' + -y : y}</text>` : '');
      s += `<line x1="${pad}" y1="${sy(0)}" x2="${W - pad}" y2="${sy(0)}" stroke="#64748B" stroke-width="1.3"/><line x1="${sx(0)}" y1="${b.y}" x2="${sx(0)}" y2="${b.y + b.h}" stroke="#64748B" stroke-width="1.3"/>`;
      const clipId = 'cl' + step + bi;
      s += `<clipPath id="${clipId}"><rect x="${pad}" y="${b.y}" width="${W - 2 * pad}" height="${b.h}"/></clipPath><g clip-path="url(#${clipId})">`;
      if (step === 4) s += `<rect x="${sx(-1)}" y="${b.y}" width="${sx(3) - sx(-1)}" height="${b.h}" fill="${RED}" fill-opacity=".12"/><line x1="${sx(-1)}" y1="${b.y}" x2="${sx(-1)}" y2="${b.y + b.h}" stroke="${RED}" stroke-dasharray="5 4" stroke-opacity=".6"/><line x1="${sx(3)}" y1="${b.y}" x2="${sx(3)}" y2="${b.y + b.h}" stroke="${RED}" stroke-dasharray="5 4" stroke-opacity=".6"/>`;
      const path = (a, z) => { let p = ''; for (let i = 0; i <= 160; i++) { const x = a + (z - a) * i / 160; p += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(b.fn(x)).toFixed(1); } return p; };
      const col = bi === 0 ? INK : AMB;
      s += `<path d="${path(X0, X1)}" fill="none" stroke="${col}" stroke-width="2.2"/>`;
      if (step === 4) s += `<path d="${path(-1, 3)}" fill="none" stroke="${RED}" stroke-width="3"/>`;
      if (bi === 0 && (step === 1 || step === 2)) { // tangent line at x0
        // a moved tangent keeps one length on screen, however steep it gets
        const x0 = tx, m = d(x0), y0 = f(x0), dx = moved ? 46 / Math.hypot(sx(1) - sx(0), m * (sy(1) - sy(0))) : 1.1, far = moved && x0 > 2.2;
        s += `<line x1="${sx(x0 - dx)}" y1="${sy(y0 - m * dx)}" x2="${sx(x0 + dx)}" y2="${sy(y0 + m * dx)}" stroke="${RED}" stroke-width="1.8"/><circle cx="${sx(x0)}" cy="${sy(y0)}" r="4.5" fill="${RED}"/>`;
        s += `<text x="${sx(x0) + (far ? -10 : 10)}" y="${Math.max(b.y + 30, sy(y0) - 8)}" font-size="12" font-weight="600" fill="${RED}"${far ? ' text-anchor="end"' : ''}>թեքություն ${num(m)}</text>`;
        if (step === 2) s += `<line x1="${sx(x0)}" y1="${sy(y0)}" x2="${sx(x0)}" y2="${H}" stroke="#94A3B8" stroke-dasharray="5 4"/>`;
      }
      if (bi === 1 && step === 2) { const x0 = moved ? tx : 0.635, far = moved && x0 > 2.2; s += `<circle cx="${sx(x0)}" cy="${sy(d(x0))}" r="4.5" fill="${RED}"/><text x="${sx(x0) + (far ? -10 : 10)}" y="${sy(d(x0)) + 4}" font-size="12" font-weight="600" fill="${RED}"${far ? ' text-anchor="end"' : ''}>f′ = ${moved ? num(d(x0)) : '−11,60'}</text>`; }
      if (step === 3) [-1, 3].forEach(x => { s += bi === 0 ? `<line x1="${sx(x - 0.9)}" y1="${sy(f(x))}" x2="${sx(x + 0.9)}" y2="${sy(f(x))}" stroke="${RED}" stroke-width="1.8"/><circle cx="${sx(x)}" cy="${sy(f(x))}" r="4.5" fill="${RED}"/>` : `<circle cx="${sx(x)}" cy="${sy(0)}" r="4.5" fill="#fff" stroke="${RED}" stroke-width="2.2"/><text x="${sx(x)}" y="${sy(0) - 9}" font-size="12" font-weight="600" fill="${RED}" text-anchor="middle">${x < 0 ? '−1' : '3'}</text>`; });
      s += '</g>';
      s += `<text x="${pad + 4}" y="${b.y + 13}" font-size="11" fill="#64748B" font-style="italic">${bi === 0 ? 'y = f(x)' : 'y = f′(x)'}</text>`;
      if (step === 4) s += bi === 0 ? `<text x="${sx(1) - 10}" y="${sy(f(1)) - 28}" font-size="12" font-weight="600" fill="${RED}">իջնում է</text><text x="${sx(-0.85)}" y="${sy(-21)}" font-size="12" font-weight="700" fill="${RED}">[−1; 3]</text>` : `<text x="${sx(1)}" y="${sy(-12) - 6}" font-size="12" font-weight="700" fill="${RED}" text-anchor="middle">f′ &lt; 0</text>`;
    });
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system,system-ui">${s}</svg>`;
  }
  HK.graphSVG = graphSVG;
  HK.screens.explain = ({ step = 1 } = {}) => {
    const st = MATH.steps[step - 1];
    return `<div class="scr" style="background:#fff">${HK.screens.mathQ({ state: 'ok' }).replace(/^<div class="scr"[^>]*>/, '').replace(/<\/div>$/, '').replace(/<div class="sb[\s\S]*?<\/span><\/div>/, '')}
      <div class="dim"></div>${sb(true)}
      <div class="xs"><div class="hd"><div class="q">${MATH.q}</div><div class="x">${ic('close', 18, '#475569')}</div>
        <div class="okrow">${ic('checkmark-circle', 17, '#10B981')}Ճիշտ պատասխանը՝ <b style="font-size:14px">4)</b><span style="font-weight:500;color:#1A202C">[−1; 3]</span></div></div>
        <div style="position:relative;height:${step >= 2 ? 330 : 300}px;background:#F8F9FB;border-bottom:1px solid #EEF1F5">${graphSVG(step, 402, step >= 2 ? 330 : 300)}<div style="position:absolute;right:12px;top:10px;width:30px;height:30px;border-radius:8px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center">${ic('expand', 15, '#475569')}</div></div>
        <div style="padding:14px 12px"><div class="step"><div class="k">${step}/4</div><div class="t">${st.t}</div><div class="b">${st.b}</div><div class="f">${st.f}</div></div></div>
        <div class="xnav"><div class="nb2 ${step === 1 ? 'off' : ''}">${ic('chevron-back', 16)}Նախորդ</div><div class="row" style="gap:14px;margin-top:2px"><div class="dots">${[1, 2, 3, 4].map(i => `<i class="${i === step ? 'on' : ''}"></i>`).join('')}</div><div class="play">${ic('play', 18, '#fff', 'margin-left:3px')}</div></div><div class="nb2 ${step === 4 ? 'off' : ''}">Հաջորդ${ic('chevron-forward', 16)}</div></div>
      </div>${hi()}</div>`;
  };

  // ───────────── 4. text-subject quiz (biology / history, v_snippet) ─────────────
  // state: idle | ok | no ; pick = tapped option (checks on first tap)
  HK.screens.textQ = ({ subj = 'bio', state = 'idle', pick } = {}) => {
    const Q = HK.QUIZ[subj]; if (pick == null) pick = state === 'no' ? (Q.answer + 1) % 4 : Q.answer;
    const cls = i => state === 'idle' ? '' : i === Q.answer ? 'ok' : i === pick ? 'no' : '';
    return `<div class="scr">${sb(false)}${toolbar(false)}
      <div style="position:absolute;left:18px;right:18px;top:118px">
        <div style="display:inline-block;background:#EEF2FF;border:1px solid var(--border);border-radius:8px;padding:2px 8px;font-size:12px;font-weight:600">${Q.where}</div>
        <div style="font-size:17px;font-weight:700;letter-spacing:.2px;line-height:28px;padding:10px 4px 20px">${Q.n}. ${Q.q}</div>
        <div style="display:flex;flex-direction:column;gap:10px">${Q.opts.map((o, i) => `<div class="ans ${cls(i)}"><div class="c">${'ABCD'[i]}</div><span>${o}</span></div>`).join('')}</div></div>
      <div class="nav"><div class="bar"><i style="width:${(Q.n / Q.total * 100 + 3).toFixed(1)}%"></i></div>
        <div class="row" style="justify-content:space-between"><div class="nb off">${ic('chevron-back', 18, '#fff')}Նախորդ</div><div class="ai" style="width:52px;height:52px;border-radius:26px">${ic('school', 22, '#fff')}</div><div class="nb ${state === 'idle' ? 'off' : ''}">Հաջորդ${ic('chevron-forward', 18, '#fff')}</div></div></div>${hi()}</div>`;
  };

  // ───────────── 5. mistakes shelf ─────────────
  HK.screens.mistakes = () => {
    const cards = [ // debug-data/english.json — Բաժին 1 Text 1, Բաժին 3
      { ad: 'I · Բաժին 1 · Վարժ. 1', pv: '3. The word <i>enduring</i> in line 11 is closest in meaning to', n: 2 },
      { ad: 'I · Բաժին 3 · Վարժ. 4', pv: '4. __________ Mary Ann Shadd famous for helping escaped slaves, she was also the first African Canadian woman to establish a newspaper.', n: 1 },
      { ad: 'I · Բաժին 3 · Վարժ. 1', pv: '1. When population is not checked by artificial means, __________ increases, putting more strain on limited natural resources.', n: 1 },
      { ad: 'I · Բաժին 1 · Վարժ. 1', pv: '2. According to the text', n: 3 },
    ];
    const chip = (rn, col, txt, n, on) => `<div class="chip ${on ? 'on' : ''}">${on ? `<div class="ico">${ic('library', 15, '#fff')}</div>` : `<div class="mini" style="background:${COVERS[col][0]}">${rn}</div>`}${txt}${n ? `<span class="num">${n}</span>` : ''}</div>`;
    return `<div class="scr">${sb(false)}
      <div style="position:absolute;left:16px;top:70px;width:40px;height:40px;border-radius:20px;background:#EDF1F5;display:flex;align-items:center;justify-content:center">${ic('chevron-back', 22)}</div>
      <div style="position:absolute;left:68px;top:60px"><div style="font-size:28px;font-weight:800;letter-spacing:-.3px">Բոլոր սխալները</div><div style="font-size:15px;color:#94A3B8;margin-top:1px">Անգլերեն</div></div>
      <div style="position:absolute;left:16px;top:132px;display:flex;gap:8px">${chip('', '', 'Բոլորը', 16, true)}${chip('I', 'slate', 'Մաս I', 12)}${chip('II', 'green', 'Մաս II', 4)}${chip('III', 'wine', 'Մաս III', '')}</div>
      <div style="position:absolute;left:16px;right:16px;top:186px;display:flex;flex-direction:column;gap:12px">${cards.map(c => `<div class="mcard"><div class="xx">${ic('close', 18)}</div><div class="ad">${c.ad}</div><div class="pv">${c.pv}</div><div class="hr"></div><span class="wr">${ic('close-circle', 14, '#EF4444')}${c.n} սխալ հարց</span><div class="cd">${ic('chevron-down', 16)}</div></div>`).join('')}</div>
      ${hi()}</div>`;
  };

  // ───────────── 6. progress ─────────────
  HK.screens.progress = () => {
    const nodes = [ // English book I sections as on the real Progress screen
      { n: 1, l: 'Տեքստի ընկալում', s: '65 հարց · 62%', st: 2, bd: 4, x: 52, y: 0, side: 'r' },
      { n: 2, l: 'Ճիշտ տարբերակը', s: '35 հարց · 40%', st: 1, bd: 2, x: 250, y: 152, side: 'l' },
      { n: 3, l: 'Բովանդակությանը<br>համապատասխան', s: '32 հարց · 50%', st: 1, bd: 0, x: 52, y: 304, side: 'r' },
    ];
    return `<div class="scr">${sb(true)}
      <div class="hdr" style="height:190px"><div style="position:absolute;left:18px;top:70px;display:flex;align-items:center;gap:14px">${ic('chevron-back', 24, '#fff')}<span style="font-size:25px;font-weight:800">Առաջընթաց</span></div>
        <div style="position:absolute;left:20px;top:112px;font-size:13.5px;color:rgba(255,255,255,.85);display:flex;align-items:center;gap:6px">${ic('flame', 15, '#FFB347')}12 օր անընդմեջ</div></div>
      <div class="sheet" style="top:152px;background:#F1F5F9;border-radius:28px 28px 0 0">
        <div class="card" style="position:absolute;left:16px;right:16px;top:18px;border-radius:20px;padding:16px 16px 14px">
          <div class="row" style="justify-content:space-between"><b style="font-size:16px">Այսօր 7 / 10</b><span style="font-size:13px;color:var(--muted)">Մնաց 3 վարժություն</span></div>
          <div style="height:8px;border-radius:4px;background:#EDF1F5;margin-top:10px;overflow:hidden"><i style="display:block;width:70%;height:100%;background:#FFB347;border-radius:4px"></i></div></div>
        <div class="card" style="position:absolute;left:16px;right:16px;top:110px;bottom:-20px;border-radius:20px;padding:16px">
          <div class="row" style="justify-content:space-between"><span style="font-size:11px;font-weight:800;letter-spacing:1.4px;color:var(--faint)">ՇՏԵՄԱՐԱՆԸ</span><span style="font-size:13px;font-weight:600;color:var(--muted)">քննությանը 115 օր ›</span></div>
          <div style="margin-top:6px"><b style="font-size:22px">4,860</b> <span style="font-size:15px">վարժություն մնաց</span></div>
          <div style="font-size:12px;color:var(--faint);margin-top:6px;display:flex;align-items:center;gap:5px">${ic('hand-left-outline', 13)}Սեղմիր կանգառի վրա՝ մանրամասների համար</div>
          <div style="position:absolute;left:0;right:0;top:132px;height:420px">
            <svg width="370" height="420" style="position:absolute;left:0;top:0"><path d="M80 30 C 80 120, 280 80, 280 182 S 80 250, 80 334 S 280 400, 280 460" fill="none" stroke="#E2E8F0" stroke-width="20" stroke-linecap="round"/><path d="M80 30 C 80 120, 280 80, 280 182 S 80 250, 80 334 S 280 400, 280 460" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="9 11"/></svg>
            ${nodes.map(n => `<div class="node" style="left:${n.x}px;top:${n.y}px"><span class="st">${'★'.repeat(n.st)}<s>${'★'.repeat(3 - n.st)}</s></span>${n.n}${n.bd ? `<span class="bd">${n.bd}</span>` : ''}</div>
              <div class="nl" style="top:${n.y + 10}px;${n.side === 'r' ? `left:${n.x + 72}px` : `right:${370 - n.x + 14}px;text-align:right`}">${n.l}<small>${n.s}</small></div>`).join('')}
          </div></div></div>
      ${tabs(1)}${hi()}</div>`;
  };

  // ───────────── 7. words portal ─────────────
  HK.screens.words = () => `<div class="scr" style="background:#F1F5F9">${sb(true)}
    <div class="hdr" style="height:200px"><div style="position:absolute;left:18px;top:70px;display:flex;align-items:center;gap:14px">${ic('chevron-back', 24, '#fff')}<span style="font-size:25px;font-weight:800">Բառապաշար</span></div>
      <div style="position:absolute;right:18px;top:70px;background:rgba(255,255,255,.18);border-radius:16px;padding:6px 12px;font-size:12px"><b style="font-size:15px">3</b> մակարդակ</div>
      <div style="position:absolute;left:20px;right:18px;top:118px;display:flex;align-items:center;gap:10px"><div style="flex:1;height:6px;border-radius:3px;background:rgba(0,0,0,.22);overflow:hidden"><i style="display:block;width:70%;height:100%;background:#FEB100"></i></div><b style="font-size:11px">140/200 XP</b></div>
      <div style="position:absolute;left:20px;top:140px;font-size:13px;color:rgba(255,255,255,.85)">5 օր անընդմեջ · օրվա նպատակ 2/3</div></div>
    <div class="sheet" style="top:172px;background:#F1F5F9">
      <div class="card" style="position:absolute;left:16px;right:16px;top:20px;border-radius:16px;padding:14px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 3px rgba(15,23,42,.06)">
        <div style="width:38px;height:38px;border-radius:19px;background:var(--primarySoft);display:flex;align-items:center;justify-content:center;color:var(--primary)">${ic('bookmark', 18)}</div>
        <div style="flex:1"><b style="font-size:16px">Իմ բառերը</b><div style="font-size:13px;color:var(--muted)">24 բառ · 9 սովորած</div></div>${ic('chevron-forward', 18, '#94A3B8')}</div>
      <div style="position:absolute;left:18px;top:106px;font-size:16px;font-weight:800">Խաղեր</div>
      <div style="position:absolute;left:16px;right:16px;top:138px;display:flex;flex-direction:column;gap:10px">
        ${[['flash', '#7C3AED', 'Արագ', '12 հարց'], ['grid', '#3182CE', 'Հիշողություն', '6 զույգ'], ['create', '#E8833A', 'Ուղղագրություն', '6 բառ']].map(([i, c, t, s]) => `<div class="gtile"><div class="sq" style="background:${c}">${ic(i, 22, '#fff')}</div><div class="tx"><b>${t}</b><span>${s}</span></div><div style="display:flex;align-items:center;padding-right:14px">${ic('chevron-forward', 18, '#94A3B8')}</div></div>`).join('')}
      </div></div>${tabs(2)}${hi()}</div>`;

  // ───────────── 8. word game (Արագ) ─────────────
  // kind: match (Ճի՞շտ է թարգմանությունը) | pick (Ի՞նչ է նշանակում) ; state: idle | ok | no
  HK.screens.wordGame = ({ kind = 'pick', state = 'idle', word = 'humble', i = 4, score = 3 } = {}) => {
    const V = '#7C3AED', opts = ['սիրելի, սիրված', VOCAB.humble, 'գյուղական, գյուղատնտեսական', 'ժառանգություն, ժառանգած բան'], ans = 1, wrong = 2;
    const border = state === 'idle' ? V : state === 'ok' ? '#10B981' : '#EF4444';
    const tone = k => state === 'idle' ? '' : k === ans ? 'good' : (state === 'no' && k === wrong ? 'bad' : 'dimb');
    return `<div class="scr" style="background:#F8FAFC">${sb(false)}
      <div style="position:absolute;left:16px;right:16px;top:68px;display:flex;align-items:center;gap:14px"><div style="width:40px;height:40px;border-radius:20px;background:#F3EEFF;display:flex;align-items:center;justify-content:center">${ic('close', 22, V)}</div><b style="font-size:18px">${i} / 12</b>
        <div style="margin-left:auto;background:#FFF7DB;color:#8A6100;border-radius:14px;padding:4px 10px;font-size:13px;font-weight:800">+${score * 10}</div></div>
      <div style="position:absolute;left:16px;right:16px;top:120px;height:8px;border-radius:4px;background:#EEF0F6;overflow:hidden"><i style="display:block;height:100%;width:${(i - (state === 'idle' ? 1 : 0)) / 12 * 100}%;background:${V};border-radius:4px"></i></div>
      <div style="position:absolute;left:20px;right:20px;top:${kind === 'pick' ? 236 : 340}px">
        <div style="text-align:center;font-size:16px;font-weight:700;color:#5B21B6;margin-bottom:16px">${kind === 'pick' ? 'Ի՞նչ է նշանակում' : 'Ճի՞շտ է թարգմանությունը'}</div>
        <div style="background:#fff;border:2px solid ${border};border-radius:22px;padding:30px 20px;text-align:center;box-shadow:0 8px 24px ${border}33;position:relative">
          <div style="position:absolute;top:12px;right:14px;display:flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:${V}">${ic('bookmark', 12, V)}քո բառը</div>
          <div style="font-size:32px;font-weight:800">${word}</div>
          ${kind === 'match' ? `<div style="width:40px;height:2px;background:#E9DDFE;margin:12px auto"></div><div style="font-size:23px;font-weight:700;color:#5B21B6">${VOCAB[word]}</div>` : ''}
          ${state !== 'idle' ? `<div style="margin-top:12px;font-size:14px;font-weight:700;color:${state === 'ok' ? '#065F46' : '#991B1B'}">${state === 'ok' ? `Ճիշտ է · ${score + 1} անընդմեջ` : `Ճիշտը՝ ${VOCAB[word]}`}</div>` : ''}</div>
        <div style="margin-top:28px;display:${kind === 'pick' ? 'flex;flex-direction:column;gap:12px' : 'flex;gap:12px'}">
          ${kind === 'pick' ? opts.map((o, k) => `<div class="gbtn ${tone(k)}" style="height:54px;font-size:15px">${o}</div>`).join('')
        : `<div class="gbtn" style="flex:1">${ic('close', 20)}Սխալ</div><div class="gbtn ${state === 'ok' ? 'good' : ''}" style="flex:1">${ic('checkmark', 20)}Ճիշտ</div>`}
        </div></div>${hi()}</div>`;
  };

  // ───────────── 9. English text with tap-to-translate ─────────────
  // pop: false = the same text before the tap (word not yet highlighted, no popup)
  HK.screens.translate = ({ word = 'humble', saved = false, pop = true } = {}) => {
    const text = DISNEY.join(' ').replace(new RegExp(`\\b${word}\\b`), `<span class="${pop ? 'hl' : ''}" id="hw">${word}</span>`);
    return `<div class="scr">${sb(false)}${toolbar(false)}
      <div style="position:absolute;left:16px;right:16px;top:120px">
        <div style="background:#fff;border:1px solid #E5E7EB;border-radius:18px;padding:14px 16px 16px">
          <div style="font-size:15px;font-weight:700;margin-bottom:6px">Text 1</div>
          <div style="font-size:15px;line-height:25px;color:#22223B">${text}</div></div>
        <div style="font-size:16px;font-weight:700;line-height:22px;margin:18px 2px 12px">3. The word <i>enduring</i> in line 11 is closest in meaning to</div>
        <div style="display:flex;flex-direction:column;gap:10px">${['difficult', 'suffering', 'famous', 'lasting'].map((o, i) => `<div class="ans"><div class="c">${'ABCD'[i]}</div><span>${o}</span></div>`).join('')}</div></div>
      ${pop ? `<div class="pop" data-anchor="hw"><b style="font-size:16px">${word}</b>
        <div style="font-size:15px;font-weight:600;color:var(--primary);margin-top:4px">${VOCAB[word]}</div>
        <div style="margin-top:10px;display:flex;justify-content:flex-end"><div style="border-radius:9px;padding:7px 14px;font-size:13px;font-weight:600;${saved ? 'border:1px solid var(--border);color:var(--muted)' : 'background:var(--primary);color:#fff'}">${saved ? 'Հեռացնել' : 'Պահել'}</div></div></div>` : ''}
      ${hi()}</div>`;
  };

  // Call after mounting a screen: places popups under their anchor word.
  HK.fix = root => {
    // the subject row scrolls like the app's ScrollView: an active pill past the edge comes into view
    root.querySelectorAll('.pillrow').forEach(row => {
      const on = row.querySelector('[data-on]'), scr = row.closest('.scr'); if (!on || !scr) return;
      const k = scr.getBoundingClientRect().width / 402, right = (on.getBoundingClientRect().right - scr.getBoundingClientRect().left) / k;
      if (right > 402 - 20) row.style.transform = `translateX(${-(right - (402 - 20))}px)`;
    });
    root.querySelectorAll('.pop[data-anchor]').forEach(p => {
      const w = root.querySelector('#' + p.dataset.anchor), scr = p.closest('.scr'); if (!w) return;
      const sr = scr.getBoundingClientRect(), r = w.getBoundingClientRect(), k = sr.width / 402;
      const cx = (r.left + r.width / 2 - sr.left) / k, top = (r.bottom - sr.top) / k + 10;
      const left = Math.max(12, Math.min(402 - 12 - 252, cx - 126));
      p.style.left = left + 'px'; p.style.top = top + 'px'; p.style.setProperty('--caret', (cx - left - 7) + 'px');
    });
  };

  // ───────────── 10. AI tutor over the math question ─────────────
  // msgs: [{me:true,t:'...'}, {t:'...'}] — the AI's lines must stay faithful to the real explanation
  // the default conversation, exported so a page can show it message by message
  HK.TUTOR = [
    { t: 'Բարև՛ 👋 Նախ պատասխանի՛ր հարցին, և ես կբացատրեմ՝ ինչու է այդ պատասխանը ճիշտ։ Իսկ եթե հիմա ակնարկ է պետք, պարզապես գրի՛ր ինձ՝ «ակնարկ տուր» 😊' },
    { me: true, t: 'Ես 2-ն էի ընտրել, ինչու՞ է սխալ' },
    { t: '2-ը այն միջակայքն է, որտեղ <b>f′(x) &gt; 0</b>, այսինքն՝ ֆունկցիան <b>աճում</b> է։ Մեզ պետք է նվազման միջակայքը՝ որտեղ <b>f′(x) &lt; 0</b>.' },
    { t: '<b>f′(x) = 3(x + 1)(x − 3)</b> — բացասական է −1-ի և 3-ի միջև, ուրեմն պատասխանը <b>[−1; 3]</b> է 👍' },
  ];
  // input: text sitting in the message field (a question being typed)
  HK.screens.tutor = ({ msgs, typing = false, input = '' } = {}) => {
    msgs = msgs || HK.TUTOR;
    return `<div class="scr" style="background:#fff">${HK.screens.mathQ({ state: 'no', pick: 1 }).replace(/^<div class="scr"[^>]*>/, '').replace(/<\/div>$/, '').replace(/<div class="sb[\s\S]*?<\/span><\/div>/, '')}
      <div class="dim"></div>${sb(true)}
      <div class="ts"><div style="height:18px;position:relative"><div style="position:absolute;top:7px;left:50%;width:40px;margin-left:-20px;height:4px;border-radius:2px;background:#CBD5E1"></div></div>
        <div class="row" style="gap:12px;padding:6px 16px 12px;border-bottom:1px solid var(--border)"><div style="position:relative" class="ai">${ic('school', 20, '#fff')}<span style="position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:6px;background:#10B981;border:2px solid #fff"></span></div>
          <div><b style="font-size:18px">AI Ուսուցիչ</b><div style="font-size:12px;color:var(--muted)">Առցանց է</div></div><div style="margin-left:auto;width:32px;height:32px;border-radius:16px;background:#F1F5F9;display:flex;align-items:center;justify-content:center">${ic('close', 18, '#475569')}</div></div>
        <div style="padding:8px 16px;display:flex;align-items:center;gap:10px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--border)">Այսօր՝ 2/15<div style="flex:1;height:6px;border-radius:3px;background:#EDF1F5;overflow:hidden"><i style="display:block;width:13%;height:100%;background:#10B981"></i></div></div>
        <div style="flex:1;background:#F1F5F9;padding:14px 14px;display:flex;flex-direction:column;gap:10px;overflow:hidden">${msgs.map(m => m.me ? `<div class="bub me">${m.t}</div>` : `<div class="row" style="align-items:flex-end;gap:8px"><div class="ai" style="width:26px;height:26px">${ic('school', 13, '#fff')}</div><div class="bub bot">${m.t}</div></div>`).join('')}
          ${typing ? `<div class="row" style="align-items:flex-end;gap:8px"><div class="ai" style="width:26px;height:26px">${ic('school', 13, '#fff')}</div><div class="bub bot" style="display:flex;gap:5px;padding:13px 14px"><i style="width:7px;height:7px;border-radius:4px;background:#94A3B8;display:block"></i><i style="width:7px;height:7px;border-radius:4px;background:#94A3B8;display:block"></i><i style="width:7px;height:7px;border-radius:4px;background:#94A3B8;display:block"></i></div></div>` : ''}</div>
        <div class="row" style="gap:10px;padding:10px 14px 38px;border-top:1px solid var(--border)"><div style="flex:1;height:44px;border-radius:22px;border:1px solid var(--border);display:flex;align-items:center;padding:0 16px;color:${input ? 'var(--text)' : 'var(--faint)'};font-size:14.5px;white-space:nowrap;overflow:hidden" class="tin">${input || 'Գրիր հաղորդագրություն...'}</div><div style="width:44px;height:44px;border-radius:22px;background:var(--primary);display:flex;align-items:center;justify-content:center">${ic('send', 18, '#fff')}</div></div>
      </div>${hi()}</div>`;
  };

  // ───────────── 11. exam-countdown widget (Android) — returns a 148×148 tile, not a screen ─────────────
  HK.widget = ({ days = 115, streak = 7, today = '12/20' } = {}) => `<div style="width:148px;height:148px;border-radius:22px;background:#fff;padding:12px 14px;box-shadow:0 8px 24px rgba(0,0,0,.18);font-family:-apple-system,system-ui;display:flex;flex-direction:column;color:#1A202C">
    <div class="row" style="justify-content:space-between"><span style="font-size:10px;font-weight:800;color:#A3AFBD">Հարցեր.am</span><span style="font-size:11px;font-weight:800;color:#B45309">🔥 ${streak}</span></div>
    <div style="font-size:44px;font-weight:800;line-height:1;margin-top:10px">${days}</div><div style="font-size:12px;color:#64748B;margin-top:2px">օր մնաց</div>
    <div style="height:4px;border-radius:2px;background:#EDF1F5;margin-top:auto;overflow:hidden"><i style="display:block;width:60%;height:100%;background:#FFB347"></i></div><div style="font-size:10px;color:#64748B;margin-top:5px">Այսօր ${today}</div></div>`;

  // all screens with their states, for the gallery / stills
  HK.CATALOG = [
    ['home-en', () => HK.screens.home({ subject: 'en' })],
    ['home-math', () => HK.screens.home({ subject: 'math' })],
    ['home-hy', () => HK.screens.home({ subject: 'hy' })],
    ['home-bio', () => HK.screens.home({ subject: 'bio' })],
    ['home-hist', () => HK.screens.home({ subject: 'hist' })],
    ['math-idle', () => HK.screens.mathQ({ state: 'idle' })],
    ['math-picked', () => HK.screens.mathQ({ state: 'picked', pick: 3 })],
    ['math-ok', () => HK.screens.mathQ({ state: 'ok' })],
    ['math-no', () => HK.screens.mathQ({ state: 'no', pick: 1 })],
    ['explain-1', () => HK.screens.explain({ step: 1 })],
    ['explain-2', () => HK.screens.explain({ step: 2 })],
    ['explain-3', () => HK.screens.explain({ step: 3 })],
    ['explain-4', () => HK.screens.explain({ step: 4 })],
    ['bio-idle', () => HK.screens.textQ({ subj: 'bio' })],
    ['bio-no', () => HK.screens.textQ({ subj: 'bio', state: 'no', pick: 1 })],
    ['hist-ok', () => HK.screens.textQ({ subj: 'hist', state: 'ok' })],
    ['mistakes', () => HK.screens.mistakes()],
    ['progress', () => HK.screens.progress()],
    ['words', () => HK.screens.words()],
    ['translate-before', () => HK.screens.translate({ pop: false })],
    ['translate', () => HK.screens.translate()],
    ['game-pick', () => HK.screens.wordGame({ kind: 'pick' })],
    ['game-ok', () => HK.screens.wordGame({ kind: 'pick', state: 'ok' })],
    ['game-match', () => HK.screens.wordGame({ kind: 'match', word: 'beloved' })],
    ['tutor', () => HK.screens.tutor()],
  ];
})();
