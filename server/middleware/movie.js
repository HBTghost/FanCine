import mongoose from 'mongoose';
import Movie from '../models/movie.js';

async function getMovie(req, res, next) {
  try {
    res.movie = await Movie.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllMovies(req, res, next) {
  try {
    res.allMovies = await Movie.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getMoviesByTheaterID(req, res, next) {
  try {
    res.movies = [];
    for await (const ids of res.theaterMovies) {
      const movie = await Movie.findById(mongoose.Types.ObjectId(ids._idMovie)).lean();
      movie._idTheaterMovie = ids._id;
      res.movies.push(movie);
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function postSampleMovies(req, res, next) {
  try {
    const movies = [];
    let movie = new Movie();
    movie.originalName = 'Fate/Stay Night: Heaven\'s Feel III. Spring Song';
    movie.vietnameseName = 'Fate/Stay Night: Heaven\'s Feel III. Khúc Xuân Ca';
    movie.rating = 9.4;
    movie.rates = 188;
    movie.label = 'C13';
    movie.time = '122 phút';
    movie.producer = 'Ufotable';
    movie.category = ['Hoạt Hình'];
    movie.cast = ['Noriaki Sugiyama', 'Noriko Shitaya'];
    movie.nation = 'Nhật Bản';
    movie.director = 'Tomonori Sudo';
    movie.date = '13/11/2020';
    movie.description = ['Các Ma Thuật Sư (Chủ Nhân) và Anh Linh (Người Hầu) hợp tác với nhau trong những Cuộc Chiến Chén Thánh… một cuộc chiến vì một vật chứa có sức mạnh vô hạn thực hiện ước muốn, tên là Chén Thánh. Tuy nhiên, cuộc chiến này đã biến hẳn theo một hướng khác.', 'Phim mới Fate/Stay Night: Heaven\'s Feel III. Spring Song, ra mắt tại các rạp chiếu phim từ 13.11.2020.'];
    movie.trailerEmbedID = 'bkY8ntjoQsg';
    movie.imageSource = 'https://galaxycine.vn/media/2020/10/29/300-anime_1603948612503.jpg';
    movies.push(movie);

    movie = new Movie();
    movie.originalName = 'TIỆC TRĂNG MÁU';
    movie.vietnameseName = 'TIỆC TRĂNG MÁU';
    movie.rating = 8.7;
    movie.rates = 365;
    movie.label = 'C18';
    movie.time = '118 phút';
    movie.producer = 'Lotte Entertainment';
    movie.category = ['Hài', 'Tâm Lý'];
    movie.cast = ['Thái Hòa', 'Đức Thịnh', 'Hồng Ánh', 'Thu Trang', 'Kiều Minh Tuấn', 'Kaity Nguyễn', 'Hứa Vĩ Văn'];
    movie.nation = 'Việt Nam';
    movie.director = 'Nguyễn Quang Dũng';
    movie.date = '20/10/2020';
    movie.description = [
      'Chuyển thể từ kịch bản nước ngoài, Tiệc Trăng Máu quy tụ dàn diễn viên "bạc tỷ" - Thái Hòa, Đức Thịnh, Kiều Minh Tuấn, Hứa Vỹ Văn, Hồng Ánh, Thu Trang và Kaity Nguyễn.',
      'Ngay từ khi những thông tin về phim được công bố, Tiệc Trăng Máu đã ngay lập tức cho thấy tham vọng tạo nên sự đột phá cho điện ảnh Việt. Nhà sản xuất đã công bố thông tin chi tiết về ngày ra mắt chính thức và giới thiệu dàn diễn viên hùng hậu.',
      'Trong một buổi tiệc họp mặt bạn bè vào đêm trăng máu, nhân vật do nữ diễn viên Hồng Ánh thể hiện đã đề nghị một trò chơi với tên gọi “công khai bí mật từ điện thoại”. Cuộc tụ tập của nhóm bạn đã trở thành một thử thách căng thẳng với luật chơi tưởng như đơn giản nhẹ nhàng. Những tin nhắn, cuộc gọi bất ngờ hé lộ bí mật sâu kín họ muốn chôn giấu. Tình bạn mấy chục năm có nguy cơ tan vỡ...',
      '"Bản tính con người giống như nguyệt thực, có thể che giấu tạm thời nhưng sớm muộn gì cũng lộ ra thôi", câu thoại đầy ẩn ý của diễn viên Đức Thịnh khép lại đoạn trailer đồng thời dẫn dắt người xem qua đủ mọi cung bậc cảm xúc.  Phim mới của đạo diễn Nguyễn Quang Dũng hứa hẹn sẽ đem đến những trải nghiệm điện ảnh độc đáo và công phá phòng vé vào dịp lễ 02/09 năm nay.',
      'Đạo diễn Nguyễn Quang Dũng chia sẻ "Tiệc Trăng Máu là một thử thách không chỉ với cá nhân tôi mà còn với toàn bộ ê kíp và dàn diễn viên. Có thể nói đây là dự án tham vọng nhất trong sự nghiệp của tôi". Với loạt hình ảnh đầu tiên gây tò mò này, khán giả yêu điện ảnh chắc chắn càng háo hức đợi chờ đến ngày thưởng thức bộ phim có một không hai của màn ảnh Việt.',
      'Phim mới Tiệc Trăng Máu ra mắt tại các rạp chiếu phim từ 23.10.2020.',
    ];
    movie.trailerEmbedID = 'VY4wLeReeGo';
    movie.imageSource = 'https://galaxycine.vn/media/2020/10/2/300x450_1601622736171.jpg';
    movies.push(movie);

    movie = new Movie();
    movie.originalName = 'MY GOD! FATHER';
    movie.vietnameseName = 'ĐỪNG GỌI ANH LÀ BỐ';
    movie.rating = 7.1;
    movie.rates = 16;
    movie.label = 'C16';
    movie.time = '104 phút';
    movie.producer = '';
    movie.category = ['Hài'];
    movie.cast = ['Pope Thanawat', 'Ter Chantavit'];
    movie.nation = 'Thái Lan';
    movie.director = 'Mai Pawat';
    movie.date = '11/11/2020';
    movie.description = ['Chàng trai Got mồ côi mẹ, bố anh gà trống nuôi con. Vì một tai nạn bất ngờ, Got bị đưa về quá khứ. Got gặp bố anh - Prem ở độ tuổi thanh niên và đang làm đầu lĩnh một nhóm trai trẻ vô công rỗi nghề. Got quyết định gia nhập vào nhóm để tìm hiểu thêm về bố và gặp lại người mẹ đã qua đời. Liệu anh có thay đổi được quá khứ và cứu sống mẹ mình?', 'Phim mới Đừng Gọi Anh Là Bố ra mắt tại các rạp chiếu phim từ 13.11.2020.'];
    movie.trailerEmbedID = 'zqQqD-8EvBs';
    movie.imageSource = 'https://galaxycine.vn/media/2020/11/6/poster-dgalb_1604647452309.jpg';
    movies.push(movie);

    movie = new Movie();
    movie.originalName = 'THE SWORDSMAN';
    movie.vietnameseName = 'KIẾM KHÁCH';
    movie.rating = 7.0;
    movie.rates = 6;
    movie.label = 'C18';
    movie.time = '101 phút';
    movie.producer = '';
    movie.category = ['Hành Động'];
    movie.cast = ['Jang Hyuk', 'Kim Hyun Soo'];
    movie.nation = 'Hàn Quốc';
    movie.director = 'Choi Jae Hoon';
    movie.date = '13/11/2020';
    movie.description = ['Lấy cảm hứng từ sự kiện có thật, phim lấy bối cảnh năm 1623, khi vị vua Gwanghae bị truất ngôi. Kiếm khách kiêm cấm vệ quân kiêm kiếm khách lừng lẫy nhất lúc bấy giờ -Tae-yul phải mai danh ẩn tích.', 'Đất nước rơi vào loạn lạc, bị nhà Thanh hà hiếp. Vì yêu sách vô lý của sứ giả, con gái Tae-yul bị bắt làm cống phẩm. Vì cứu cô bé, Tae-yul phải đối đầu với cả một đội quân tinh nhuệ.', 'Phim mới Kiếm Khách ra mắt tại các rạp chiếu phim từ 13.11.2020.'];
    movie.trailerEmbedID = 'q_L0vsIuEFw';
    movie.imageSource = 'https://galaxycine.vn/media/2020/11/6/406wx600h_1604635193603.jpg';
    movies.push(movie);

    movie = new Movie();
    movie.originalName = 'YOUR EYES TELL';
    movie.vietnameseName = 'THANH ÂM TRONG MẮT EM';
    movie.rating = 7.6;
    movie.rates = 19;
    movie.label = 'C16';
    movie.time = '123 phút';
    movie.producer = '';
    movie.category = ['Tình Cảm'];
    movie.cast = ['Yokohama Ryusei', 'Yoshitaka Yuriko'];
    movie.nation = 'Nhật Bản';
    movie.director = 'Miki Takahiro';
    movie.date = '13/11/2020';
    movie.description = ['Sau vụ tai nạn thương tâm, Akari mất đi cả gia đình lẫn đôi mắt. Thế nhưng, cô gái vẫn rất mạnh mẽ, tìm kiếm niềm vui từ những điều bình dị để sống tiếp. Tình cờ, cô quen biết Rui. Nụ cười trong sáng của Akari đã khiến chàng từng là võ sĩ quyền anh có quá khứ đen tối thay đổi. Thế nhưng, lúc họ nhận ra tình cảm dành cho nhau thì Rui cũng biết được tai nạn ngày xưa của Akari có liên quan đến anh...', 'Phim mới Your Eyes Tell ra mắt tại các rạp chiếu phim từ 13.11.2020.'];
    movie.trailerEmbedID = '0WtwLINWiXY';
    movie.imageSource = 'https://galaxycine.vn/media/2020/11/2/1200wx1800h_1604303848219.jpg';
    movies.push(movie);

    movie = new Movie();
    movie.originalName = 'STARDOG AND TURBOCAT';
    movie.vietnameseName = 'LIÊN QUÂN SIÊU THÚ';
    movie.rating = 5.5;
    movie.rates = 4;
    movie.label = 'P';
    movie.time = '91 phút';
    movie.producer = 'Head Gear Films';
    movie.category = ['Hoạt Hình'];
    movie.cast = ['Luke Evans', 'Nick Frost', 'Gemma Arterton'];
    movie.nation = 'Anh';
    movie.director = 'Ben Smith';
    movie.date = '6/11/2020';
    movie.description = ['Vào năm 1969, chú chó Buddy được lựa chọn làm đối tượng thử nghiệm cho một chuyến thám hiểm không gian. Tuy nhiên, một sự cố đã xảy ra khiến Buddy trôi lạc tới tận 50 năm sau và đáp xuống Glenfield - nơi mà tất cả đều ghét bỏ động vật.', 'Với sự giúp đỡ của cậu bạn mèo Mun, đặc vụ thỏ Cassidy, giáo sư Todd, cô chuột Tinker... liệu chú chó Buddy có tìm được chủ nhân của mình?', 'Phim mới Liên Quân Siêu Thú sẽ ra mắt tại các rạp chiếu phim từ ngày 6.11.2020.'];
    movie.trailerEmbedID = '515e_EpswpA';
    movie.imageSource = 'https://galaxycine.vn/media/2020/11/3/300wx450h_1604372215389.jpg';
    movies.push(movie);

    movie = new Movie();
    movie.originalName = 'THE GHOUL: HORROR AT THE HOWLING FIELD';
    movie.vietnameseName = 'NGẠ QUỶ: TIẾNG THÉT ĐỒI GIÓ HÚ';
    movie.rating = 7.1;
    movie.rates = 64;
    movie.label = 'C18';
    movie.time = '112 phút';
    movie.producer = '';
    movie.category = ['Kinh Dị'];
    movie.cast = ['Ble Pathumraj', 'Lada R-Siam', 'Khom Chuanchuen'];
    movie.nation = 'Thái Lan';
    movie.director = 'Chalerm Wongphim';
    movie.date = '29/10/2020';
    movie.description = ['Sau khi một vụ án xảy ra, Trung Úy Satjathorn buộc phải đi đến ngôi làng kỳ bí TungMhaHon để điều tra phá án. Tại đây, mọi chuyện đều diễn ra bình thường vào ban ngày nhưng khi đêm đến, một bầu không khí rùng rợn lại bao trùm lên tất cả.', 'Liệu rằng anh chàng cảnh sát Satjathorn có tìm ra được sự thật, giải thoát bản thân và ngôi làng khỏi những rắc rối này?', 'Phim mới Ngạ Quỷ: Tiếng Thét Đồi Gió Hú ra mắt tại các rạp chiếu phim từ ngày 30.10.2020.'];
    movie.trailerEmbedID = 'dPyrBwK0vYg';
    movie.imageSource = 'https://galaxycine.vn/media/2020/10/21/ngaquy300x450_1603269432866.jpg';
    movies.push(movie);

    // movies.forEach(async movie => await movie.save());

    res.movies = movies;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getMovie,
  getAllMovies,
  getMoviesByTheaterID,
  postSampleMovies,
};
