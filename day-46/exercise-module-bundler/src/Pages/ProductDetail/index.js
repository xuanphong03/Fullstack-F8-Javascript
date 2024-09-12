function ProductDetail(url) {
  const {
    data: { id },
  } = url;

  return `
    <h1 class="text-2xl font-medium text-blue-500">Chi tiết sản phẩm: ${id} </h1>
    <button class="px-5 py-1 text-white bg-blue-500 block rounded mt-2"  onclick="navigate('/san-pham')">Back</button>
  `;
}

export default ProductDetail;
