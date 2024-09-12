function ProductDetail(url) {
  const {
    data: { id },
  } = url;

  return `
    <h1 class='text-2xl font-medium text-blue-500'>Chi tiết sản phẩm: ${id} </h1>
    <button><a class='px-5 py-1 text-white bg-blue-500 block rounded mt-2' href='/san-pham' data-route>Back</a></button>
  `;
}

export default ProductDetail;
