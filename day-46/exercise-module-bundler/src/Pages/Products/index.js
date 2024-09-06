function Products() {
  return `
    <h1 class='text-2xl font-medium text-blue-500'>Danh sách sản phẩm</h1>
    <ul class='list-disc ml-5'>
      <li><a class='block py-1 hover:text-blue-500' href='/san-pham/1' data-route>Sản phẩm 1</a></li>
      <li><a class='block py-1 hover:text-blue-500' href='/san-pham/2' data-route>Sản phẩm 2</a></li>
      <li><a class='block py-1 hover:text-blue-500' href='/san-pham/3' data-route>Sản phẩm 3</a></li>
    </ul>
  `;
}

export default Products;
