// router.js - 堆疊導覽邏輯
const stack = [];
function show(render, label) {
  stack.push({ render, label });
  renderView();
}
function goBack() {
  if (stack.length > 1) {
    stack.pop();
    renderView();
  }
}
function jump(idx) {
  if (idx >= 0 && idx < stack.length) {
    stack.splice(idx + 1);
    renderView();
  }
}
function goHome() {
  jump(0);
}
