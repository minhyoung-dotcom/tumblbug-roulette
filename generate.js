<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>텀블벅 액션아이템 룰렛 🎰</title>
<style>
:root {
  color-scheme: light;
  --orange: #FF6B35;
  --orange-light: #FFF0EB;
  --orange-dark: #E55A25;
  --bg: #F5F4F0;
  --card: #FFFFFF;
  --text: #1A1A1A;
  --text-muted: #888;
  --border: #E8E6E0;
  --tb-blue: #1A1A2E;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  padding: 28px 16px 60px;
}
.container { max-width: 660px; margin: 0 auto; }

/* Header */
.header { text-align: center; margin-bottom: 28px; }
.header h1 { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 5px; }
.header h1 span { color: var(--orange); }
.header p { font-size: 13px; color: var(--text-muted); }

/* Input */
.input-card {
  background: var(--card); border-radius: 16px;
  padding: 20px; margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.input-row { display: flex; gap: 8px; }
.keyword-input {
  flex: 1; height: 50px; padding: 0 16px;
  border: 2px solid var(--border); border-radius: 12px;
  font-size: 15px; font-family: inherit; outline: none;
  transition: border-color 0.2s; background: var(--bg);
}
.keyword-input:focus { border-color: var(--orange); }
.spin-btn {
  height: 50px; padding: 0 20px;
  background: var(--orange); color: white;
  border: none; border-radius: 12px;
  font-size: 15px; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
  font-family: inherit; white-space: nowrap;
}
.spin-btn:hover:not(:disabled) { background: var(--orange-dark); transform: translateY(-1px); }
.spin-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
.examples { margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.ex-label { font-size: 12px; color: var(--text-muted); }
.ex-tag {
  font-size: 12px; color: var(--text-muted);
  background: var(--bg); padding: 3px 10px;
  border-radius: 20px; cursor: pointer;
  border: 1px solid var(--border); transition: all 0.15s;
}
.ex-tag:hover { border-color: var(--orange); color: var(--orange); }

/* Slot machine */
.slot-card {
  background: var(--card); border-radius: 16px;
  padding: 20px 20px 24px; margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: none;
}
.slot-label {
  font-size: 11px; font-weight: 700; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: 1px;
  text-align: center; margin-bottom: 14px;
}
.slot-machine {
  position: relative; height: 76px;
  overflow: hidden; border-radius: 12px;
  background: var(--bg); border: 2px solid var(--border);
}
.slot-highlight {
  position: absolute; top: 50%; left: 0; right: 0;
  height: 52px; transform: translateY(-50%);
  background: var(--orange-light);
  border-top: 2px solid var(--orange);
  border-bottom: 2px solid var(--orange);
  z-index: 1; pointer-events: none;
}
.slot-machine::before, .slot-machine::after {
  content: ''; position: absolute; left: 0; right: 0; height: 18px; z-index: 2; pointer-events: none;
}
.slot-machine::before { top: 0; background: linear-gradient(to bottom, rgba(245,244,240,0.92), transparent); }
.slot-machine::after { bottom: 0; background: linear-gradient(to top, rgba(245,244,240,0.92), transparent); }
.slot-strip { position: absolute; width: 100%; will-change: transform; }
.slot-item {
  height: 76px; display: flex; align-items: center;
  justify-content: center; font-size: 21px; font-weight: 800;
  color: var(--text); letter-spacing: -0.3px;
}

/* Loading */
.loading-state {
  text-align: center; padding: 32px 20px;
  color: var(--text-muted); font-size: 13px; display: none;
}
.spinner {
  width: 28px; height: 28px;
  border: 3px solid var(--border); border-top-color: var(--orange);
  border-radius: 50%; animation: spin 0.7s linear infinite;
  margin: 0 auto 10px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.error-msg {
  background: #FFF0F0; border: 1px solid #FFCCCC;
  border-radius: 12px; padding: 14px 16px;
  font-size: 13px; color: #C0392B;
  margin-bottom: 16px; display: none;
}

/* Guide card */
.guide-card {
  background: var(--card); border-radius: 16px;
  overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: none; animation: slideUp 0.4s ease;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.guide-header { background: var(--orange); padding: 22px 24px; color: white; }
.guide-badge {
  font-size: 10px; font-weight: 700;
  background: rgba(255,255,255,0.25); padding: 3px 10px;
  border-radius: 20px; display: inline-block;
  margin-bottom: 8px; letter-spacing: 0.5px;
}
.guide-title { font-size: 26px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 5px; }
.guide-summary { font-size: 14px; opacity: 0.9; line-height: 1.5; }
.guide-body { padding: 22px 24px; }
.section { margin-bottom: 24px; }
.section-title {
  font-size: 11px; font-weight: 700; color: var(--orange);
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
}

/* Trend list */
.trend-list { display: flex; flex-direction: column; gap: 8px; }
.trend-item { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; line-height: 1.55; }
.trend-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); margin-top: 7px; flex-shrink: 0; }

/* Tumblbug reference cards */
.ref-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ref-card {
  border: 1px solid var(--border); border-radius: 12px;
  overflow: hidden; text-decoration: none; color: inherit;
  transition: all 0.18s; display: block;
  background: var(--card);
}
.ref-card:hover { border-color: var(--orange); box-shadow: 0 2px 8px rgba(255,107,53,0.12); transform: translateY(-1px); }
.ref-thumb {
  width: 100%; aspect-ratio: 16/9;
  background: linear-gradient(135deg, #F0EDE8 0%, #E8E4DC 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; position: relative; overflow: hidden;
}
.ref-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  position: absolute; top: 0; left: 0;
}
.ref-thumb-emoji { position: relative; z-index: 1; }
.ref-info { padding: 10px 12px 12px; }
.ref-category {
  font-size: 10px; font-weight: 600; color: var(--orange);
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.ref-name { font-size: 13px; font-weight: 700; line-height: 1.35; margin-bottom: 6px; color: var(--text); }
.ref-stats { display: flex; gap: 8px; }
.ref-stat { font-size: 11px; color: var(--text-muted); }
.ref-stat strong { color: var(--text); font-weight: 700; }
.ref-search-link {
  display: flex; align-items: center; gap: 6px;
  margin-top: 10px; padding: 8px 12px;
  background: var(--bg); border-radius: 8px;
  font-size: 12px; color: var(--text-muted);
  text-decoration: none; border: 1px solid var(--border);
  transition: all 0.15s;
}
.ref-search-link:hover { border-color: var(--orange); color: var(--orange); }

/* Target list */
.target-list { display: flex; flex-direction: column; gap: 6px; }
.target-item {
  font-size: 13px; padding: 8px 12px;
  background: var(--bg); border-radius: 8px;
  border-left: 3px solid var(--orange); line-height: 1.4;
}

/* Channels */
.channel-row { display: flex; flex-wrap: wrap; gap: 7px; }
.hashtag-chip {
  font-size: 13px; padding: 4px 11px;
  background: var(--orange-light); color: var(--orange-dark);
  border-radius: 20px; font-weight: 600;
}
.channel-chip {
  font-size: 13px; padding: 4px 11px;
  background: var(--bg); color: var(--text-muted);
  border-radius: 20px; border: 1px solid var(--border);
}

/* Outreach message */
.message-card {
  background: #F8F7FF; border: 1px solid #E0DCFF;
  border-radius: 12px; padding: 16px 18px;
}
.message-label {
  font-size: 10px; font-weight: 700; color: #7B68EE;
  text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 10px;
}
.message-text {
  font-size: 14px; line-height: 1.7; color: var(--text);
  white-space: pre-wrap;
}
.copy-msg-btn {
  margin-top: 10px; padding: 7px 14px;
  background: white; border: 1px solid #E0DCFF;
  border-radius: 8px; font-size: 12px; color: #7B68EE;
  cursor: pointer; font-family: inherit; transition: all 0.15s;
}
.copy-msg-btn:hover { background: #F0EEFF; }

/* Actions */
.action-row { display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap; }
.action-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 16px; border-radius: 8px;
  font-size: 13px; cursor: pointer; font-family: inherit;
  transition: all 0.15s; border: 1px solid var(--border);
  background: var(--bg); color: var(--text-muted);
}
.action-btn:hover { border-color: var(--orange); color: var(--orange); }
.action-btn.primary { background: var(--orange); color: white; border-color: var(--orange); }
.action-btn.primary:hover { background: var(--orange-dark); }

@media (max-width: 480px) {
  .ref-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>텀블벅 액션아이템 <span>룰렛 🎰</span></h1>
    <p>키워드를 넣으면 아웃리치 액션아이템 + 리스트업 가이드가 뚝딱</p>
  </div>

  <div class="input-card">
    <div class="input-row">
      <input class="keyword-input" id="keywordInput" type="text" placeholder="키워드 입력 (예: 요가, 커피, 독서...)" />
      <button class="spin-btn" id="spinBtn" onclick="startSpin()">🎰 돌려!</button>
    </div>
    <div class="examples">
      <span class="ex-label">예시:</span>
      <span class="ex-tag" onclick="setKw('요가')">요가</span>
      <span class="ex-tag" onclick="setKw('커피')">커피</span>
      <span class="ex-tag" onclick="setKw('독서')">독서</span>
      <span class="ex-tag" onclick="setKw('캠핑')">캠핑</span>
      <span class="ex-tag" onclick="setKw('명상')">명상</span>
      <span class="ex-tag" onclick="setKw('빵')">빵</span>
      <span class="ex-tag" onclick="setKw('반려식물')">반려식물</span>
      <span class="ex-tag" onclick="setKw('수영')">수영</span>
    </div>
  </div>

  <div class="slot-card" id="slotCard">
    <div class="slot-label">액션아이템 선정 중 ✨</div>
    <div class="slot-machine">
      <div class="slot-highlight"></div>
      <div class="slot-strip" id="slotStrip"></div>
    </div>
  </div>

  <div class="loading-state" id="loadingState">
    <div class="spinner"></div>
    <div>가이드 생성 중...</div>
  </div>

  <div class="error-msg" id="errorMsg"></div>

  <div class="guide-card" id="guideCard">
    <div class="guide-header">
      <div class="guide-badge">액션아이템 가이드</div>
      <div class="guide-title" id="resTitle"></div>
      <div class="guide-summary" id="resSummary"></div>
    </div>
    <div class="guide-body">

      <div class="section">
        <div class="section-title">📈 배경 &amp; 트렌드 (최근 1년)</div>
        <div class="trend-list" id="trendList"></div>
      </div>

      <div class="section">
        <div class="section-title">🔖 텀블벅 레퍼런스</div>
        <div class="ref-grid" id="refGrid"></div>
        <a class="ref-search-link" id="refSearchLink" href="#" target="_blank">
          🔍 텀블벅에서 직접 검색하기
        </a>
      </div>

      <div class="section">
        <div class="section-title">🎯 타깃 브랜드·창작자 유형</div>
        <div class="target-list" id="targetList"></div>
      </div>

      <div class="section">
        <div class="section-title">🔍 발굴 채널</div>
        <div class="channel-row" id="channelRow"></div>
      </div>

      <div class="section">
        <div class="section-title">✉️ 제안 메일 핵심 문구</div>
        <div class="message-card">
          <div class="message-label">Copy &amp; Paste — 메일 본문에 바로 사용</div>
          <div class="message-text" id="msgBox"></div>
          <button class="copy-msg-btn" onclick="copyMsg()">📋 문구 복사</button>
        </div>
      </div>

      <div class="action-row">
        <button class="action-btn" onclick="copyAll()">📋 전체 복사</button>
        <button class="action-btn primary" onclick="startSpin()">🎰 다시 돌리기</button>
      </div>

    </div>
  </div>
</div>

<script>
const NAMES = [
  "수면 케어 러버","이너뷰티 러버","비건뷰티 러버","제철푸드 러버",
  "홈향기 러버","미니멀패션 러버","반려동물 러버","웰니스 러버",
  "힐링 러버","감성리빙 러버","아트문구 러버","클린뷰티 러버",
  "아웃도어 러버","캠핑 러버","독서 러버","명상 러버",
  "홈카페 러버","가드닝 러버","요가 러버","빵순이 러버",
  "향수 러버","식물 러버","커피 러버","수영 러버",
  "필라테스 러버","제로웨이스트 러버","홈트 러버","반려식물 러버",
];

// Category emoji map
const CAT_EMOJI = {
  '뷰티': '💄', '리빙': '🏠', '패션': '👗', '푸드': '🍽️',
  '향수': '🌸', '향': '🕯️', '캠핑': '⛺', '반려': '🐾',
  '스포츠': '🏃', '문구': '✏️', '아트': '🎨', '헬스': '💪',
  '테크': '⚡', '음악': '🎵', '여행': '✈️', '출판': '📚',
};
function getCatEmoji(cat) {
  for (const [k, v] of Object.entries(CAT_EMOJI)) {
    if (cat && cat.includes(k)) return v;
  }
  return '🎯';
}

let currentData = null;
let currentKeyword = '';
let spinning = false;

function setKw(kw) {
  document.getElementById('keywordInput').value = kw;
  document.getElementById('keywordInput').focus();
}

function buildStrip(names) {
  const strip = document.getElementById('slotStrip');
  strip.innerHTML = names.map(n => `<div class="slot-item">${n}</div>`).join('');
  strip.style.transition = 'none';
  strip.style.transform = 'translateY(0px)';
}

function runSlot(finalName, onDone) {
  const pool = [...NAMES, ...NAMES, ...NAMES];
  const all = [...pool, finalName];
  buildStrip(all);

  const strip = document.getElementById('slotStrip');
  const itemH = 76;
  let idx = 0;
  const total = all.length;
  const slowStart = total - 6;

  strip.style.transform = `translateY(${38 - itemH / 2}px)`;
  let delay = 40;

  function tick() {
    idx++;
    const y = -(idx * itemH) + 38 - itemH / 2;
    if (idx >= slowStart) {
      delay = Math.min(delay + 55, 400);
      strip.style.transition = `transform ${delay}ms cubic-bezier(0.25, 0.8, 0.5, 1)`;
    } else {
      strip.style.transition = 'none';
    }
    strip.style.transform = `translateY(${y}px)`;
    if (idx >= total - 1) {
      setTimeout(onDone, delay + 150);
    } else {
      setTimeout(tick, delay);
    }
  }
  setTimeout(tick, delay);
}

async function startSpin() {
  const keyword = document.getElementById('keywordInput').value.trim();
  if (!keyword || spinning) return;
  spinning = true;
  currentKeyword = keyword;

  const btn = document.getElementById('spinBtn');
  btn.disabled = true;
  btn.textContent = '돌리는 중...';

  document.getElementById('guideCard').style.display = 'none';
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('errorMsg').style.display = 'none';
  document.getElementById('slotCard').style.display = 'block';

  let generatedData = null;
  const fetchPromise = fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword })
  }).then(r => r.json()).catch(e => ({ error: e.message }));

  const result = await fetchPromise;

  if (result.error) {
    document.getElementById('errorMsg').textContent = '오류가 발생했어요: ' + result.error;
    document.getElementById('errorMsg').style.display = 'block';
    document.getElementById('slotCard').style.display = 'none';
    spinning = false;
    btn.disabled = false;
    btn.textContent = '🎰 돌려!';
    return;
  }

  generatedData = result;
  const finalName = generatedData?.name || (keyword + ' 러버');

  runSlot(finalName, () => {
    if (generatedData) renderGuide(generatedData);
    spinning = false;
    btn.disabled = false;
    btn.textContent = '🎰 돌려!';
  });
}

function renderGuide(d) {
  currentData = d;

  document.getElementById('resTitle').textContent = d.name;
  document.getElementById('resSummary').textContent = d.summary;

  // Trends
  document.getElementById('trendList').innerHTML = (d.trends || []).map(t =>
    `<div class="trend-item"><div class="trend-dot"></div><div>${t}</div></div>`
  ).join('');

  // Tumblbug references
  const refGrid = document.getElementById('refGrid');
  refGrid.innerHTML = (d.references || []).map(r => {
    const url = r.slug
      ? `https://tumblbug.com/${r.slug}`
      : `https://tumblbug.com/discover?keyword=${encodeURIComponent(currentKeyword)}`;
    const emoji = getCatEmoji(r.category);
    return `
      <a class="ref-card" href="${url}" target="_blank">
        <div class="ref-thumb">
          <span class="ref-thumb-emoji">${emoji}</span>
        </div>
        <div class="ref-info">
          <div class="ref-category">${r.category || ''}</div>
          <div class="ref-name">${r.name}</div>
          <div class="ref-stats">
            <div class="ref-stat"><strong>${r.amount}</strong> 달성</div>
            <div class="ref-stat">${r.supporters} 서포터</div>
          </div>
        </div>
      </a>`;
  }).join('');

  // Search link
  const searchUrl = `https://tumblbug.com/discover?keyword=${encodeURIComponent(currentKeyword)}`;
  document.getElementById('refSearchLink').href = searchUrl;
  document.getElementById('refSearchLink').textContent = `🔍 텀블벅에서 "${currentKeyword}" 검색하기`;

  // Targets
  document.getElementById('targetList').innerHTML = (d.targets || []).map(t =>
    `<div class="target-item">${t}</div>`
  ).join('');

  // Channels
  document.getElementById('channelRow').innerHTML =
    (d.hashtags || []).map(h => `<span class="hashtag-chip">${h}</span>`).join('') +
    (d.channels || []).map(c => `<span class="channel-chip">${c}</span>`).join('');

  // Message
  document.getElementById('msgBox').textContent = d.message;

  const card = document.getElementById('guideCard');
  card.style.display = 'block';
  setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

function copyMsg() {
  if (!currentData) return;
  navigator.clipboard.writeText(currentData.message).then(() => {
    const btn = document.querySelector('.copy-msg-btn');
    btn.textContent = '✅ 복사됨!';
    setTimeout(() => { btn.textContent = '📋 문구 복사'; }, 2000);
  });
}

function copyAll() {
  if (!currentData) return;
  const d = currentData;
  const refs = (d.references || []).map(r =>
    `  - ${r.name} | ${r.amount} 달성 | ${r.supporters} 서포터`
  ).join('\n');
  const txt = `# ${d.name}\n\n${d.summary}\n\n## 배경 & 트렌드 (최근 1년)\n${(d.trends||[]).map(t=>'- '+t).join('\n')}\n\n## 텀블벅 레퍼런스\n${refs}\n\n## 타깃 브랜드·창작자 유형\n${(d.targets||[]).map(t=>'- '+t).join('\n')}\n\n## 발굴 채널\n${[...(d.hashtags||[]),(d.channels||[])].flat().join(' | ')}\n\n## 제안 메일 핵심 문구\n${d.message}`;
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.querySelector('.action-btn');
    btn.textContent = '✅ 복사됨!';
    setTimeout(() => { btn.textContent = '📋 전체 복사'; }, 2000);
  });
}

document.getElementById('keywordInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') startSpin();
});
</script>
</body>
</html>
