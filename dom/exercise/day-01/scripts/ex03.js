var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    children: [
      {
        id: 4,
        name: "Chuyên mục 2.1",
      },
      {
        id: 5,
        name: "Chuyên mục 2.2",
        children: [
          {
            id: 10,
            name: "Chuyên mục 2.2.1",
          },
          {
            id: 11,
            name: "Chuyên mục 2.2.2",
          },
          {
            id: 12,
            name: "Chuyên mục 2.2.3",
          },
        ],
      },
      {
        id: 6,
        name: "Chuyên mục 2.3",
      },
    ],
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    children: [
      {
        id: 7,
        name: "Chuyên mục 3.1",
      },
      {
        id: 8,
        name: "Chuyên mục 3.2",
      },
      {
        id: 9,
        name: "Chuyên mục 3.3",
      },
    ],
  },
];

function renderMenu(menu, level = 0) {
  var html = "";
  for (var i = 0; i < menu.length; i++) {
    html += `<option value='${menu[i].name}'>${"--|".repeat(level)} ${
      menu[i].name
    }</option>`;
    if (menu[i].children) {
      html += renderMenu(menu[i].children, level + 1);
    }
  }
  return html;
}
var result = `<select name='categories'><option value='0'>Chọn chuyên mục</option> ${renderMenu(
  categories
)}</select>`;
document.write(result);
