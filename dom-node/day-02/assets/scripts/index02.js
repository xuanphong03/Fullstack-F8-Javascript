// var div = document.querySelector('div')
// function createLoading () {
//     div.className = 'bg-loading';
//     div.innerText = 'Loading...'
//     document.body.prepend(div)
// }

// function removeLoading () {
//     div.style.opacity = 0;
//     setTimeout(function() {
//         div.style.display = 'none'
//     })
// }
// document.addEventListener("DOMContentLoaded",createLoading);
// window.addEventListener("load", removeLoading)
var input = document.querySelector("input");
var beforeUnloadHandler = function (e) {
  // Recommended
  e.preventDefault();
  e.return = true;
};
input.addEventListener("input", function (e) {
  var value = e.target.value;
  var defaultValue = e.target.defaultValue;
  if (value !== defaultValue) {
    window.addEventListener("beforeunload", beforeUnloadHandler);
  } else {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  }
});

var lyrics = [
  {
    err: 0,
    msg: "Success",
    data: {
      sentences: [
        {
          words: [
            { startTime: 14480, endTime: 14870, data: "Tìm" },
            { startTime: 14870, endTime: 14870, data: "ở" },
            { startTime: 14870, endTime: 15270, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 15270, endTime: 15680, data: "Một" },
            { startTime: 15680, endTime: 16070, data: "nơi" },
            { startTime: 16070, endTime: 16480, data: "bán" },
            { startTime: 16480, endTime: 17270, data: "đi" },
            { startTime: 17270, endTime: 17680, data: "những" },
            { startTime: 17680, endTime: 18060, data: "nỗi" },
            { startTime: 18060, endTime: 18480, data: "buồn" },
          ],
        },
        {
          words: [
            { startTime: 18480, endTime: 18900, data: "Bán" },
            { startTime: 18900, endTime: 19290, data: "đi" },
            { startTime: 19290, endTime: 19690, data: "mọi" },
            { startTime: 19690, endTime: 20080, data: "tổn" },
            { startTime: 20080, endTime: 21290, data: "thương" },
          ],
        },
        {
          words: [
            { startTime: 21290, endTime: 21290, data: "Để" },
            { startTime: 21290, endTime: 21690, data: "không" },
            { startTime: 21690, endTime: 22110, data: "còn" },
            { startTime: 22110, endTime: 22900, data: "nhớ" },
          ],
        },
        {
          words: [
            { startTime: 22900, endTime: 23290, data: "Để" },
            { startTime: 23290, endTime: 23290, data: "không" },
            { startTime: 23290, endTime: 23700, data: "còn" },
            { startTime: 23700, endTime: 24500, data: "mơ" },
          ],
        },
        {
          words: [
            { startTime: 24500, endTime: 24900, data: "Để" },
            { startTime: 24900, endTime: 24900, data: "không" },
            { startTime: 24900, endTime: 25280, data: "còn" },
            { startTime: 25280, endTime: 25690, data: "ôm" },
            { startTime: 25690, endTime: 26090, data: "trái" },
            { startTime: 26090, endTime: 26490, data: "tim" },
            { startTime: 26490, endTime: 26880, data: "tan" },
            { startTime: 26880, endTime: 28470, data: "vỡ" },
          ],
        },
        {
          words: [
            { startTime: 28470, endTime: 28470, data: "Tìm" },
            { startTime: 28470, endTime: 28870, data: "ở" },
            { startTime: 28870, endTime: 29670, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 29670, endTime: 29670, data: "Một" },
            { startTime: 29670, endTime: 30070, data: "nơi" },
            { startTime: 30070, endTime: 30460, data: "để" },
            { startTime: 30460, endTime: 31250, data: "mua" },
            { startTime: 31250, endTime: 31670, data: "những" },
            { startTime: 31670, endTime: 31670, data: "nụ" },
            { startTime: 31670, endTime: 32450, data: "cười" },
          ],
        },
        {
          words: [
            { startTime: 32450, endTime: 32860, data: "Mua" },
            { startTime: 32860, endTime: 33260, data: "niềm" },
            { startTime: 33260, endTime: 33650, data: "vui" },
            { startTime: 33650, endTime: 34050, data: "đã" },
            { startTime: 34050, endTime: 34440, data: "đánh" },
            { startTime: 34440, endTime: 34850, data: "rơi" },
          ],
        },
        {
          words: [
            { startTime: 34850, endTime: 35640, data: "Khóc" },
            { startTime: 35640, endTime: 35640, data: "thêm" },
            { startTime: 35640, endTime: 36040, data: "lần" },
            { startTime: 36040, endTime: 36840, data: "cuối" },
          ],
        },
        {
          words: [
            { startTime: 36840, endTime: 37250, data: "Đến" },
            { startTime: 37250, endTime: 37640, data: "mai" },
            { startTime: 37640, endTime: 38040, data: "rồi" },
            { startTime: 38040, endTime: 38840, data: "thôi" },
          ],
        },
        {
          words: [
            { startTime: 38840, endTime: 39230, data: "Cố" },
            { startTime: 39230, endTime: 39230, data: "quên" },
            { startTime: 39230, endTime: 39640, data: "lần" },
            { startTime: 39640, endTime: 40040, data: "yêu" },
            { startTime: 40040, endTime: 40420, data: "làm" },
            { startTime: 40420, endTime: 40820, data: "mình" },
            { startTime: 40820, endTime: 41220, data: "yếu" },
            { startTime: 41220, endTime: 43530, data: "đuối" },
          ],
        },
        {
          words: [
            { startTime: 43530, endTime: 43930, data: "Cứ" },
            { startTime: 43930, endTime: 44330, data: "thế" },
            { startTime: 44330, endTime: 44330, data: "hãy" },
            { startTime: 44330, endTime: 44730, data: "khóc" },
            { startTime: 44730, endTime: 44730, data: "cho" },
            { startTime: 44730, endTime: 45130, data: "thật" },
            { startTime: 45130, endTime: 45530, data: "to" },
          ],
        },
        {
          words: [
            { startTime: 45530, endTime: 45930, data: "Trút" },
            { startTime: 45930, endTime: 45930, data: "hết" },
            { startTime: 45930, endTime: 46340, data: "những" },
            { startTime: 46340, endTime: 46340, data: "thứ" },
            { startTime: 46340, endTime: 46730, data: "em" },
            { startTime: 46730, endTime: 47120, data: "phiền" },
            { startTime: 47120, endTime: 47530, data: "lo" },
          ],
        },
        {
          words: [
            { startTime: 47530, endTime: 47530, data: "Và" },
            { startTime: 47530, endTime: 47930, data: "điều" },
            { startTime: 47930, endTime: 47930, data: "bận" },
            { startTime: 47930, endTime: 48320, data: "lòng" },
            { startTime: 48320, endTime: 48730, data: "không" },
            { startTime: 48730, endTime: 48730, data: "đáng" },
            { startTime: 48730, endTime: 49920, data: "có" },
          ],
        },
        {
          words: [
            { startTime: 49920, endTime: 50330, data: "Tình" },
            { startTime: 50330, endTime: 50330, data: "yêu" },
            { startTime: 50330, endTime: 50730, data: "có" },
            { startTime: 50730, endTime: 51150, data: "đôi" },
            { startTime: 51150, endTime: 51150, data: "lần" },
            { startTime: 51150, endTime: 51550, data: "tan" },
            { startTime: 51550, endTime: 51960, data: "vỡ" },
          ],
        },
        {
          words: [
            { startTime: 51960, endTime: 52350, data: "Có" },
            { startTime: 52350, endTime: 52750, data: "đôi" },
            { startTime: 52750, endTime: 52750, data: "lần" },
            { startTime: 52750, endTime: 53150, data: "bỏ" },
            { startTime: 53150, endTime: 53960, data: "lỡ" },
          ],
        },
        {
          words: [
            { startTime: 53960, endTime: 53960, data: "Có" },
            { startTime: 53960, endTime: 54360, data: "lúc" },
            { startTime: 54360, endTime: 54760, data: "không" },
            { startTime: 54760, endTime: 55150, data: "như" },
            { startTime: 55150, endTime: 55540, data: "là" },
            { startTime: 55540, endTime: 57870, data: "mơ" },
          ],
        },
        {
          words: [
            { startTime: 57870, endTime: 57870, data: "Cứ" },
            { startTime: 57870, endTime: 58270, data: "thế" },
            { startTime: 58270, endTime: 58270, data: "những" },
            { startTime: 58270, endTime: 58680, data: "mẩu" },
            { startTime: 58680, endTime: 59070, data: "chuyện" },
            { startTime: 59070, endTime: 59070, data: "hợp" },
            { startTime: 59070, endTime: 59470, data: "tan" },
          ],
        },
        {
          words: [
            { startTime: 59470, endTime: 59880, data: "Tiếp" },
            { startTime: 59880, endTime: 60270, data: "nối" },
            { startTime: 60270, endTime: 60270, data: "những" },
            { startTime: 60270, endTime: 60670, data: "tiếng" },
            { startTime: 60670, endTime: 60670, data: "yêu" },
            { startTime: 60670, endTime: 61060, data: "dở" },
            { startTime: 61060, endTime: 61470, data: "dang" },
          ],
        },
        {
          words: [
            { startTime: 61470, endTime: 61870, data: "Thành" },
            { startTime: 61870, endTime: 62270, data: "một" },
            { startTime: 62270, endTime: 62270, data: "vòng" },
            { startTime: 62270, endTime: 62650, data: "lặp" },
            { startTime: 62650, endTime: 62650, data: "đầy" },
            { startTime: 62650, endTime: 63060, data: "trái" },
            { startTime: 63060, endTime: 64250, data: "ngang" },
          ],
        },
        {
          words: [
            { startTime: 64250, endTime: 64250, data: "Chẳng" },
            { startTime: 64250, endTime: 64650, data: "thể" },
            { startTime: 64650, endTime: 65040, data: "nào" },
            { startTime: 65040, endTime: 65450, data: "thoát" },
            { startTime: 65450, endTime: 65450, data: "ra" },
            { startTime: 65450, endTime: 65850, data: "được" },
          ],
        },
        {
          words: [
            { startTime: 65850, endTime: 66250, data: "Đành" },
            { startTime: 66250, endTime: 66640, data: "làm" },
            { startTime: 66640, endTime: 66640, data: "bạn" },
            { startTime: 66640, endTime: 67040, data: "với" },
            { startTime: 67040, endTime: 67440, data: "nỗi" },
            { startTime: 67440, endTime: 67850, data: "buồn" },
          ],
        },
        {
          words: [
            { startTime: 67850, endTime: 68250, data: "Như" },
            { startTime: 68250, endTime: 68250, data: "người" },
            { startTime: 68250, endTime: 68630, data: "say" },
            { startTime: 68630, endTime: 69050, data: "em" },
            { startTime: 69050, endTime: 69050, data: "lang" },
            { startTime: 69050, endTime: 69450, data: "thang" },
            { startTime: 69450, endTime: 69830, data: "trong" },
            { startTime: 69830, endTime: 70230, data: "vô" },
            { startTime: 70230, endTime: 71440, data: "hướng" },
          ],
        },
        {
          words: [
            { startTime: 71440, endTime: 71820, data: "Lạc" },
            { startTime: 71820, endTime: 72650, data: "giữa" },
            { startTime: 72650, endTime: 72650, data: "đám" },
            { startTime: 72650, endTime: 73440, data: "đông" },
            { startTime: 73440, endTime: 74240, data: "vô" },
            { startTime: 74240, endTime: 75430, data: "tình" },
          ],
        },
        {
          words: [
            { startTime: 75430, endTime: 76240, data: "Em" },
            { startTime: 76240, endTime: 76640, data: "giấu" },
            { startTime: 76640, endTime: 77030, data: "cho" },
            { startTime: 77030, endTime: 77830, data: "riêng" },
            { startTime: 77830, endTime: 78630, data: "mình" },
          ],
        },
        {
          words: [
            { startTime: 78630, endTime: 79030, data: "Tay" },
            { startTime: 79030, endTime: 79420, data: "xách" },
            { startTime: 79420, endTime: 79820, data: "hành" },
            { startTime: 79820, endTime: 80210, data: "trang" },
          ],
        },
        {
          words: [
            { startTime: 80210, endTime: 80610, data: "Đựng" },
            { startTime: 80610, endTime: 81010, data: "những" },
            { startTime: 81010, endTime: 81010, data: "câu" },
            { startTime: 81010, endTime: 81410, data: "chuyện" },
            { startTime: 81410, endTime: 81820, data: "ngổn" },
            { startTime: 81820, endTime: 82210, data: "ngang" },
          ],
        },
        {
          words: [
            { startTime: 82210, endTime: 82210, data: "Em" },
            { startTime: 82210, endTime: 82620, data: "dành" },
            { startTime: 82620, endTime: 83000, data: "gom" },
            { startTime: 83000, endTime: 83400, data: "sau" },
            { startTime: 83400, endTime: 83800, data: "nhiều" },
            { startTime: 83800, endTime: 84210, data: "năm" },
            { startTime: 84210, endTime: 85410, data: "tháng" },
          ],
        },
        {
          words: [
            { startTime: 85410, endTime: 85800, data: "Tìm" },
            { startTime: 85800, endTime: 86200, data: "ở" },
            { startTime: 86200, endTime: 86200, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 86200, endTime: 86580, data: "Một" },
            { startTime: 86580, endTime: 87000, data: "nơi" },
            { startTime: 87000, endTime: 87780, data: "bán" },
            { startTime: 87780, endTime: 88180, data: "đi" },
            { startTime: 88180, endTime: 88580, data: "những" },
            { startTime: 88580, endTime: 88990, data: "nỗi" },
            { startTime: 88990, endTime: 89370, data: "buồn" },
          ],
        },
        {
          words: [
            { startTime: 89370, endTime: 90180, data: "Bán" },
            { startTime: 90180, endTime: 90180, data: "đi" },
            { startTime: 90180, endTime: 90570, data: "mọi" },
            { startTime: 90570, endTime: 90980, data: "tổn" },
            { startTime: 90980, endTime: 92180, data: "thương" },
          ],
        },
        {
          words: [
            { startTime: 92180, endTime: 92180, data: "Để" },
            { startTime: 92180, endTime: 92560, data: "không" },
            { startTime: 92560, endTime: 92970, data: "còn" },
            { startTime: 92970, endTime: 93770, data: "nhớ" },
          ],
        },
        {
          words: [
            { startTime: 93770, endTime: 94170, data: "Để" },
            { startTime: 94170, endTime: 94560, data: "không" },
            { startTime: 94560, endTime: 94560, data: "còn" },
            { startTime: 94560, endTime: 95760, data: "mơ" },
          ],
        },
        {
          words: [
            { startTime: 95760, endTime: 96150, data: "Để" },
            { startTime: 96150, endTime: 96150, data: "không" },
            { startTime: 96150, endTime: 96550, data: "còn" },
            { startTime: 96550, endTime: 96960, data: "ôm" },
            { startTime: 96960, endTime: 97340, data: "trái" },
            { startTime: 97340, endTime: 97750, data: "tim" },
            { startTime: 97750, endTime: 98160, data: "tan" },
            { startTime: 98160, endTime: 99340, data: "vỡ" },
          ],
        },
        {
          words: [
            { startTime: 99340, endTime: 99750, data: "Tìm" },
            { startTime: 99750, endTime: 100140, data: "ở" },
            { startTime: 100140, endTime: 100530, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 100530, endTime: 100940, data: "Một" },
            { startTime: 100940, endTime: 101340, data: "nơi" },
            { startTime: 101340, endTime: 101730, data: "để" },
            { startTime: 101730, endTime: 102140, data: "mua" },
            { startTime: 102140, endTime: 102530, data: "những" },
            { startTime: 102530, endTime: 102920, data: "nụ" },
            { startTime: 102920, endTime: 103740, data: "cười" },
          ],
        },
        {
          words: [
            { startTime: 103740, endTime: 104120, data: "Mua" },
            { startTime: 104120, endTime: 104510, data: "niềm" },
            { startTime: 104510, endTime: 104930, data: "vui" },
            { startTime: 104930, endTime: 104930, data: "đã" },
            { startTime: 104930, endTime: 105320, data: "đánh" },
            { startTime: 105320, endTime: 106510, data: "rơi" },
          ],
        },
        {
          words: [
            { startTime: 106510, endTime: 106920, data: "Khóc" },
            { startTime: 106920, endTime: 106920, data: "thêm" },
            { startTime: 106920, endTime: 107300, data: "lần" },
            { startTime: 107300, endTime: 108100, data: "cuối" },
          ],
        },
        {
          words: [
            { startTime: 108100, endTime: 108500, data: "Đến" },
            { startTime: 108500, endTime: 108500, data: "mai" },
            { startTime: 108500, endTime: 108900, data: "rồi" },
            { startTime: 108900, endTime: 109700, data: "thôi" },
          ],
        },
        {
          words: [
            { startTime: 109700, endTime: 110100, data: "Cố" },
            { startTime: 110100, endTime: 110490, data: "quên" },
            { startTime: 110490, endTime: 110890, data: "lần" },
            { startTime: 110890, endTime: 111310, data: "yêu" },
            { startTime: 111310, endTime: 111690, data: "làm" },
            { startTime: 111690, endTime: 112090, data: "mình" },
            { startTime: 112090, endTime: 112480, data: "yếu" },
            { startTime: 112480, endTime: 115480, data: "đuối" },
          ],
        },
        {
          words: [
            { startTime: 115680, endTime: 116070, data: "Baby" },
            { startTime: 116070, endTime: 116870, data: "please" },
          ],
        },
        {
          words: [
            { startTime: 116870, endTime: 117270, data: "Can't" },
            { startTime: 117270, endTime: 117670, data: "you" },
            { startTime: 117670, endTime: 118860, data: "see" },
          ],
        },
        {
          words: [
            { startTime: 118860, endTime: 119270, data: "Em" },
            { startTime: 119270, endTime: 119270, data: "là" },
            { startTime: 119270, endTime: 119670, data: "một" },
            { startTime: 119670, endTime: 120460, data: "người" },
            { startTime: 120460, endTime: 120460, data: "giàu" },
            { startTime: 120460, endTime: 120850, data: "nhất" },
            { startTime: 120850, endTime: 121260, data: "trên" },
            { startTime: 121260, endTime: 121670, data: "thế" },
            { startTime: 121670, endTime: 122460, data: "gian" },
          ],
        },
        {
          words: [
            { startTime: 122460, endTime: 122460, data: "Giàu" },
            { startTime: 122460, endTime: 122840, data: "nước" },
            { startTime: 122840, endTime: 123240, data: "mắt" },
            { startTime: 123240, endTime: 123640, data: "bao" },
            { startTime: 123640, endTime: 124050, data: "đêm" },
            { startTime: 124050, endTime: 124450, data: "thâu" },
          ],
        },
        {
          words: [
            { startTime: 124450, endTime: 124830, data: "Em" },
            { startTime: 124830, endTime: 125240, data: "giàu" },
            { startTime: 125240, endTime: 125650, data: "bao" },
            { startTime: 125650, endTime: 126030, data: "thương" },
            { startTime: 126030, endTime: 126430, data: "đau" },
          ],
        },
        {
          words: [
            { startTime: 126430, endTime: 126430, data: "Em" },
            { startTime: 126430, endTime: 126830, data: "là" },
            { startTime: 126830, endTime: 127640, data: "vua" },
            { startTime: 127640, endTime: 127640, data: "của" },
            { startTime: 127640, endTime: 128020, data: "bao" },
            { startTime: 128020, endTime: 128420, data: "nỗi" },
            { startTime: 128420, endTime: 130040, data: "sầu" },
          ],
        },
        {
          words: [
            { startTime: 130040, endTime: 130450, data: "Lạc" },
            { startTime: 130450, endTime: 130840, data: "giữa" },
            { startTime: 130840, endTime: 131630, data: "đám" },
            { startTime: 131630, endTime: 132030, data: "đông" },
            { startTime: 132030, endTime: 132840, data: "vô" },
            { startTime: 132840, endTime: 134020, data: "tình" },
          ],
        },
        {
          words: [
            { startTime: 134020, endTime: 134420, data: "Em" },
            { startTime: 134420, endTime: 135520, data: "giấu" },
            { startTime: 135520, endTime: 135920, data: "cho" },
            { startTime: 135920, endTime: 136320, data: "riêng" },
            { startTime: 136320, endTime: 137520, data: "mình" },
          ],
        },
        {
          words: [
            { startTime: 137520, endTime: 137520, data: "Tay" },
            { startTime: 137520, endTime: 137910, data: "xách" },
            { startTime: 137910, endTime: 138320, data: "hành" },
            { startTime: 138320, endTime: 139020, data: "trang" },
          ],
        },
        {
          words: [
            { startTime: 139020, endTime: 139020, data: "Đựng" },
            { startTime: 139020, endTime: 139430, data: "những" },
            { startTime: 139430, endTime: 139830, data: "câu" },
            { startTime: 139830, endTime: 139830, data: "chuyện" },
            { startTime: 139830, endTime: 140200, data: "ngổn" },
            { startTime: 140200, endTime: 140610, data: "ngang" },
          ],
        },
        {
          words: [
            { startTime: 140610, endTime: 141000, data: "Em" },
            { startTime: 141000, endTime: 141420, data: "dành" },
            { startTime: 141420, endTime: 141420, data: "gom" },
            { startTime: 141420, endTime: 141830, data: "sau" },
            { startTime: 141830, endTime: 142230, data: "nhiều" },
            { startTime: 142230, endTime: 142630, data: "năm" },
            { startTime: 142630, endTime: 144250, data: "tháng" },
          ],
        },
        {
          words: [
            { startTime: 144250, endTime: 144250, data: "Tìm" },
            { startTime: 144250, endTime: 144650, data: "ở" },
            { startTime: 144650, endTime: 145040, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 145040, endTime: 145450, data: "Một" },
            { startTime: 145450, endTime: 145850, data: "nơi" },
            { startTime: 145850, endTime: 146240, data: "bán" },
            { startTime: 146240, endTime: 146630, data: "đi" },
            { startTime: 146630, endTime: 147040, data: "những" },
            { startTime: 147040, endTime: 147420, data: "nỗi" },
            { startTime: 147420, endTime: 148240, data: "buồn" },
          ],
        },
        {
          words: [
            { startTime: 148240, endTime: 148630, data: "Bán" },
            { startTime: 148630, endTime: 149020, data: "đi" },
            { startTime: 149020, endTime: 149420, data: "mọi" },
            { startTime: 149420, endTime: 149820, data: "tổn" },
            { startTime: 149820, endTime: 150630, data: "thương" },
          ],
        },
        {
          words: [
            { startTime: 150630, endTime: 151020, data: "Để" },
            { startTime: 151020, endTime: 151430, data: "không" },
            { startTime: 151430, endTime: 151430, data: "còn" },
            { startTime: 151430, endTime: 152620, data: "nhớ" },
          ],
        },
        {
          words: [
            { startTime: 152620, endTime: 152620, data: "Để" },
            { startTime: 152620, endTime: 153010, data: "không" },
            { startTime: 153010, endTime: 153410, data: "còn" },
            { startTime: 153410, endTime: 154200, data: "mơ" },
          ],
        },
        {
          words: [
            { startTime: 154200, endTime: 154600, data: "Để" },
            { startTime: 154600, endTime: 154600, data: "không" },
            { startTime: 154600, endTime: 155000, data: "còn" },
            { startTime: 155000, endTime: 155400, data: "ôm" },
            { startTime: 155400, endTime: 155790, data: "trái" },
            { startTime: 155790, endTime: 156200, data: "tim" },
            { startTime: 156200, endTime: 156990, data: "tan" },
            { startTime: 156990, endTime: 157800, data: "vỡ" },
          ],
        },
        {
          words: [
            { startTime: 157800, endTime: 158600, data: "Tìm" },
            { startTime: 158600, endTime: 158980, data: "ở" },
            { startTime: 158980, endTime: 159400, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 159400, endTime: 159400, data: "Một" },
            { startTime: 159400, endTime: 159780, data: "nơi" },
            { startTime: 159780, endTime: 160580, data: "để" },
            { startTime: 160580, endTime: 160980, data: "mua" },
            { startTime: 160980, endTime: 161380, data: "những" },
            { startTime: 161380, endTime: 161770, data: "nụ" },
            { startTime: 161770, endTime: 162580, data: "cười" },
          ],
        },
        {
          words: [
            { startTime: 162580, endTime: 162970, data: "Mua" },
            { startTime: 162970, endTime: 162970, data: "niềm" },
            { startTime: 162970, endTime: 163380, data: "vui" },
            { startTime: 163380, endTime: 163770, data: "đã" },
            { startTime: 163770, endTime: 164160, data: "đánh" },
            { startTime: 164160, endTime: 165350, data: "rơi" },
          ],
        },
        {
          words: [
            { startTime: 165350, endTime: 165350, data: "Khóc" },
            { startTime: 165350, endTime: 165760, data: "thêm" },
            { startTime: 165760, endTime: 166170, data: "lần" },
            { startTime: 166170, endTime: 166560, data: "cuối" },
          ],
        },
        {
          words: [
            { startTime: 166560, endTime: 166960, data: "Đến" },
            { startTime: 166960, endTime: 167350, data: "mai" },
            { startTime: 167350, endTime: 167350, data: "rồi" },
            { startTime: 167350, endTime: 168540, data: "thôi" },
          ],
        },
        {
          words: [
            { startTime: 168540, endTime: 168540, data: "Cố" },
            { startTime: 168540, endTime: 168940, data: "quên" },
            { startTime: 168940, endTime: 169350, data: "lần" },
            { startTime: 169350, endTime: 170040, data: "yêu" },
            { startTime: 170040, endTime: 170440, data: "làm" },
            { startTime: 170440, endTime: 170840, data: "mình" },
            { startTime: 170840, endTime: 171240, data: "yếu" },
            { startTime: 171240, endTime: 174240, data: "đuối" },
          ],
        },
        {
          words: [
            { startTime: 174310, endTime: 174310, data: "Tìm" },
            { startTime: 174310, endTime: 175110, data: "ở" },
            { startTime: 175110, endTime: 175510, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 175510, endTime: 175510, data: "Một" },
            { startTime: 175510, endTime: 175910, data: "nơi" },
            { startTime: 175910, endTime: 176320, data: "bán" },
            { startTime: 176320, endTime: 177120, data: "đi" },
            { startTime: 177120, endTime: 177120, data: "những" },
            { startTime: 177120, endTime: 177500, data: "nỗi" },
            { startTime: 177500, endTime: 178310, data: "buồn" },
          ],
        },
        {
          words: [
            { startTime: 178310, endTime: 178710, data: "Bán" },
            { startTime: 178710, endTime: 179100, data: "đi" },
            { startTime: 179100, endTime: 179510, data: "mọi" },
            { startTime: 179510, endTime: 179900, data: "tổn" },
            { startTime: 179900, endTime: 181100, data: "thương" },
          ],
        },
        {
          words: [
            { startTime: 181100, endTime: 181490, data: "Để" },
            { startTime: 181490, endTime: 181490, data: "không" },
            { startTime: 181490, endTime: 181890, data: "còn" },
            { startTime: 181890, endTime: 182680, data: "nhớ" },
          ],
        },
        {
          words: [
            { startTime: 182680, endTime: 183090, data: "Để" },
            { startTime: 183090, endTime: 183090, data: "không" },
            { startTime: 183090, endTime: 183480, data: "còn" },
            { startTime: 183480, endTime: 184680, data: "mơ" },
          ],
        },
        {
          words: [
            { startTime: 184680, endTime: 184680, data: "Để" },
            { startTime: 184680, endTime: 185080, data: "không" },
            { startTime: 185080, endTime: 185470, data: "còn" },
            { startTime: 185470, endTime: 185870, data: "ôm" },
            { startTime: 185870, endTime: 186280, data: "trái" },
            { startTime: 186280, endTime: 186680, data: "tim" },
            { startTime: 186680, endTime: 187070, data: "tan" },
            { startTime: 187070, endTime: 188280, data: "vỡ" },
          ],
        },
        {
          words: [
            { startTime: 188280, endTime: 188660, data: "Tìm" },
            { startTime: 188660, endTime: 189060, data: "ở" },
            { startTime: 189060, endTime: 189460, data: "đâu" },
          ],
        },
        {
          words: [
            { startTime: 189460, endTime: 189850, data: "Một" },
            { startTime: 189850, endTime: 190260, data: "nơi" },
            { startTime: 190260, endTime: 190660, data: "để" },
            { startTime: 190660, endTime: 191050, data: "mua" },
            { startTime: 191050, endTime: 191460, data: "những" },
            { startTime: 191460, endTime: 191850, data: "nụ" },
            { startTime: 191850, endTime: 192660, data: "cười" },
          ],
        },
        {
          words: [
            { startTime: 192660, endTime: 193060, data: "Mua" },
            { startTime: 193060, endTime: 193440, data: "niềm" },
            { startTime: 193440, endTime: 193850, data: "vui" },
            { startTime: 193850, endTime: 193850, data: "đã" },
            { startTime: 193850, endTime: 194250, data: "đánh" },
            { startTime: 194250, endTime: 195450, data: "rơi" },
          ],
        },
        {
          words: [
            { startTime: 195450, endTime: 195450, data: "Khóc" },
            { startTime: 195450, endTime: 195860, data: "thêm" },
            { startTime: 195860, endTime: 195860, data: "lần" },
            { startTime: 195860, endTime: 197050, data: "cuối" },
          ],
        },
        {
          words: [
            { startTime: 197050, endTime: 197050, data: "Đến" },
            { startTime: 197050, endTime: 197450, data: "mai" },
            { startTime: 197450, endTime: 197860, data: "rồi" },
            { startTime: 197860, endTime: 198660, data: "thôi" },
          ],
        },
        {
          words: [
            { startTime: 198660, endTime: 199050, data: "Cố" },
            { startTime: 199050, endTime: 199050, data: "quên" },
            { startTime: 199050, endTime: 199450, data: "lần" },
            { startTime: 199450, endTime: 199850, data: "yêu" },
            { startTime: 199850, endTime: 200650, data: "làm" },
            { startTime: 200650, endTime: 201040, data: "mình" },
            { startTime: 201040, endTime: 201430, data: "yếu" },
            { startTime: 201430, endTime: 202430, data: "đuối" },
          ],
        },
      ],
      file: "https://static-zmp3.zmdcdn.me/lyrics/a/c/b/1/acb108223cc71d81eb6cf72ec86278c4.lrc",
      enabledVideoBG: true,
      streamingUrl:
        "https://mcloud-bf-s7-mv-zmp3.zmdcdn.me/HxvalMobp-k/5c595ade0e02e15cb813/538b3f91c41d2b43720c/1080/nguoi-ban-noi-buon.mp4?authen=exp=1720967675~acl=/HxvalMobp-k/*~hmac=c9c28db28d5aeeb2ed40e0e9449377bd",
      defaultIBGUrls: [
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/c/0/5/3c05c10ae36f6361f9af0874bb7c4851.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/b/e/0/bbe01e4bf6d8e23101fcb6db44df311d.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/a/1/f/3/a1f34293d1dc92735be8c3f9082c4acf.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/e/9/5/6e95b598e1e14a187ee779bcd888e75c.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/c/8/1/1c81e957a6270eba91571d822a47e7c5.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/0/0/d/000d9d0679bbbb564a191a6801d7f19d.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/6/4/f/e64f4fd6f53caebabc1c26d592093cfa.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/e/3/1/de315c40b537d40b7409a6702f446631.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/4/6/2/1462efc7378bed3f98ace411e11eab45.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/5/b/f/a/5bfa05533ed7975035e69a4508c82fd6.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/2/b/1/f2b1b91fa64e0c354150c86fd96c249c.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/5/1/f/b/51fbcd4ae32096ffe2dd89cd36bb6ed9.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/2/3/9/62392463eab1eb1aaa2d1f3bd0f758bb.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/2/f/0/12f01e12d6e13e263ef76f3fdb65d66e.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/8/2/4/8824ef8e3e3aa3e302f03879a1f9d7d3.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/4/3/4/9/43491e9d95a9942015548bd2a061250d.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/9/8/7/5/987517940ce71a96bab9c0c88d5b6b95.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/e/2/4/8e24305fde744814083af980a593e8c2.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/1/2/7/f1270dd1bed79b527228e3351d2b67ae.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/a/3/0/0a301934881ee4e2de30dc8f41bc55f9.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/c/9/f/cc9fce8719364ba9d8a846984c590a0e.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/5/d/e/e5de86acd7567465f54a6b9307076947.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/4/b/b/64bb19c5f971b4e4f16f3bfdff64a396.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/3/2/0/03206606d461843e22451747a9b60769.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/d/4/4/bd4485d6dfef80764869a4d88d9b0475.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/8/6/8/e86817d147315d9d644835f60d17ae41.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/b/4/7/bb477f2f56f162b13426f70c9858c732.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/5/3/6/c536ff6ab992e36be24ca0adf8e86ae0.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/c/f/c/6cfc1e6e3b94c62cded257659602f00b.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/2/5/d/6/25d6adaa11b4e932d61309ed635d57fa.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/2/a/e/d2ae42243ccd4fec321fc60692a5a2dc.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/8/0/e/b80e5777c7eec332c882bf79bd692056.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/7/b/a/e7ba1207018f1d2fa7048598c7d627df.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/f/4/0/3f40bd0d6d8cbcf833c72ab050f19e6a.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/a/d/a/d/adad060e15f8409ec2e7670cf943c202.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/d/1/7/ed17742d63b635725e6071a9bee362c5.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/a/e/8/3ae816de233a9eae0116b4b5a21af43e.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/7/f/1/d7f15e3996e7923ffc2a64d1f8e43448.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/0/7/e/007e6b48696aab4a61ca46a10d980f63.jpg",
        "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/9/f/5/d9f592437d80e358a76e32798ce2d294.jpg",
      ],
      BGMode: 0,
    },
    timestamp: 1720796880198,
  },
];
