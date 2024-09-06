function DefaultLayout() {
  return `
    <header class='border-b border-solid border-red-500'>
        <div class='px-5 py-4'>
            <h1 class='text-red-500 text-4xl font-medium'><a href='/'>HEADER</a></h1>
        </div>
    </header>
    <main class='px-5 py-4'>
        <div class='grid grid-cols-12 gap-4'>
            <div class='col-span-3'>
                <h2 class='text-blue-500 text-2xl font-medium'>Menu</h2>
                <ul class='list-disc ml-5'>
                    <li><a class='block py-1 hover:text-blue-500' href='/' data-route>Trang chủ</a></li>
                    <li><a class='block py-1 hover:text-blue-500' href='/gioi-thieu' data-route>Giới thiệu</a></li>
                    <li><a class='block py-1 hover:text-blue-500' href='/san-pham' data-route>Sản phẩm</a></li>
                </ul>
            </div>
            <div  class='col-span-9'>
                {body}
            </div>
        </div>
    </main>
    <footer class='border-t border-solid border-red-500'>
        <div class='px-5 py-4'>
            <h1 class='text-red-500 text-4xl font-medium'>FOOTER</h1>
        </div>
    </footer>
  `;
}
export default DefaultLayout;
