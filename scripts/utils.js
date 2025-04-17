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
