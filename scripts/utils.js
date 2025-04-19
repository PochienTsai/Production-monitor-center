// utils.js - 工具函式
const randState = () => (Math.random() > 0.2 ? 'green' : 'red');
const dot = (s) => `<span class="dot ${s}"></span>`;
// 全域圖片 fallback
function imgFallback(e) {
  e.target.src = 'https://placehold.co/800x600?text=No+Image';
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach((img) => {
    img.onerror = imgFallback;
  });
});

function toggleOptimization(switchEl, areaLabel, machineNo) {
  const label = document.querySelector('label[for="optimizeSwitch"]');
  const isAuto = switchEl.checked;
  label.textContent = isAuto ? '自動優化機台程式' : '手動優化機台程式';

  // ⬇️ 預留與後端 API 溝通區塊（使用 axios）
  // ⚠️ 記得前端需先引入 axios，例如在 index.html 加上：
  // <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  const payload = {
    area: areaLabel,
    machine: machineNo,
    optimizeMode: isAuto ? 'auto' : 'manual',
  };

  axios
    .post(
      '/api/machine/optimize-mode',
      payload,
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`, // 這裡放 token
      //   'Content-Type': 'application/json', // 如有需要也可一起設
      // },
      // }
    )
    .then((res) => {
      console.log('✅ 優化模式已通知後端', res.data);
      alert('優化模式已通知後端');
    })
    .catch((err) => {
      console.error('❌ 優化模式送出失敗', err);
      alert('切換優化模式時發生錯誤，請稍後再試');
    });
}
