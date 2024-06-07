let ex04_output = document.querySelector(".ex04_output");
let ex04_input = [
  [
    "https://picsum.photos/300/200",
    "Tiêu đề bài viết 1",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorum magni eius! Sapiente totam voluptates dolore placeat tempora eum molestiae odio veniam, quis corrupti blanditiis nisi maxime exercitationem suscipit ipsam!",
  ],
  [
    "https://picsum.photos/300/200",
    "Tiêu đề bài viết 2",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorum magni eius! Sapiente totam voluptates dolore placeat tempora eum molestiae odio veniam, quis corrupti blanditiis nisi maxime exercitationem suscipit ipsam!",
  ],
  [
    "https://picsum.photos/300/200",
    "Tiêu đề bài viết 3",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorum magni eius! Sapiente totam voluptates dolore placeat tempora eum molestiae odio veniam, quis corrupti blanditiis nisi maxime exercitationem suscipit ipsam!",
  ],
];

let data = ex04_input.map(function (item, index) {
  return `<div key='${index}' class='wrapper'>
        <div class='thumbnail'><img src='${item[0]}' alt='thumbnail' /></div>
        <div class='content_box'>
            <h2 class='title'>${item[1]}</h2>
            <p  class='description'>${item[2]}</p>
        </div>
    </div>`;
});

ex04_output.innerHTML = data;
