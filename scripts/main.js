// main.js - 初始化與入口

document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// 入口
show(viewHome, '首頁');
