const zoomGlassEl = document.querySelector(".zoom-glass");
const originalImageWrapperEl = document.querySelector(
  ".original-image-wrapper"
);

originalImageWrapperEl.addEventListener("mousemove", function (e) {
  const { clientX, clientY } = e;

  const rect = this.getBoundingClientRect();
  const minClientX = rect.left;
  const maxClientX = rect.right;
  const minClientY = rect.top;
  const maxClientY = rect.bottom;

  zoomGlassEl.style.display = "block";

  if (
    clientX - zoomGlassEl.clientWidth / 2 >= minClientX &&
    clientX + zoomGlassEl.clientWidth / 2 <= maxClientX
  ) {
    zoomGlassEl.style.left = `${clientX}px`;
  }
  if (
    clientY - zoomGlassEl.clientHeight / 2 >= minClientY &&
    clientY + zoomGlassEl.clientHeight / 2 <= maxClientY
  ) {
    zoomGlassEl.style.top = `${clientY}px`;
  }
});

// originalImageWrapperEl.addEventListener("mouseout", function (e) {
//   zoomGlassEl.style.display = "none";
// });
