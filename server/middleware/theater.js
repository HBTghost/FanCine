import mongoose from 'mongoose';
import Theater from '../models/theater.js';

async function getTheater(req, res, next) {
  try {
    res.theater = await Theater.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllTheaters(req, res, next) {
  try {
    res.allTheaters = await Theater.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTheatersByMovieID(req, res, next) {
  try {
    res.theaters = [];
    const theaterIDs = res.theaterMovies.map((obj) => obj._idTheater);
    for await (const id of theaterIDs) {
      res.theaters.push(await Theater.findById(mongoose.Types.ObjectId(id)).lean());
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function postSampleTheaters(req, res, next) {
  try {
    const theaters = [];
    let theater = new Theater();
    theater.name = 'Galaxy Nguyễn Du';
    theater.city = 'Tp. Hồ Chí Minh ';
    theater.address = '116 Nguyễn Du, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh';
    theater.phone = '+8419002224';
    theater.rooms = ['Max 1', 'Max 2', '3D', '4D max'];
    theater.mapEmbedID = '!1m18!1m12!1m3!1d3919.497656679971!2d106.69101661480077!3d10.773144692323761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c0189fa2b%3A0x6e75dc36d4dba07d!2sGalaxy%20Nguy%E1%BB%85n%20Du!5e0!3m2!1svi!2s!4v1605598352014!5m2!1svi!2s';
    theater.imagesSource = ['https://galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-1_1557134449561.jpg', 'https://galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-2_1557134452480.jpg', 'https://galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-3_1557134455385.jpg'];
    theater.description = 'Rạp Galaxy Nguyễn Du nằm ở đường Nguyễn Du, là rạp chiếu phim đầu tiên của Galaxy Cinema được xây dựng với tiêu chuẩn Hollywood, có 5 phòng chiếu (1000 chỗ ngồi), chuẩn âm thanh Dolby 7.1. Galaxy Nguyễn Du nằm ở khu vực rất thuận lợi cho các bạn sinh viên - học sinh lẫn nhân viên văn phòng. Bên trong khuôn viên còn thường xuyên tổ chức các sự kiện ra mắt phim và hội chợ hết sức thú vị.';
    theaters.push(theater);

    theater = new Theater();
    theater.name = 'CGV Hùng Vương Plaza';
    theater.city = 'Tp. Hồ Chí Minh ';
    theater.address = 'Parkson Hung Vuong Plaza, 126 Đường Hùng Vương, Phường 12, Quận 5, Thành phố Hồ Chí Minh';
    theater.phone = '+8419006017';
    theater.rooms = ['Max 1', 'Max 2', '3D max 1', '3D max 2', '4D max 1', '4D max 2'];
    theater.mapEmbedID = '!1m18!1m12!1m3!1d3919.7198468030197!2d106.66079761480064!3d10.756061192335329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef08a32cf6f%3A0x796d8897cb4e6b59!2zQ0dWIEjDuW5nIFbGsMahbmcgUGxhemE!5e0!3m2!1svi!2s!4v1605598598616!5m2!1svi!2s';
    theater.imagesSource = ['https://www.cgv.vn/media/site/cache/3/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_2893a_2_1.jpg', 'https://www.cgv.vn/media/site/cache/3/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_2915a_2_1.jpg', 'https://www.cgv.vn/media/site/cache/3/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_0027_2a_2_1.jpg', 'https://www.cgv.vn/media/site/cache/3/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_9935_2a_2_1.jpg'];
    theater.description = 'Rạp CGV Hùng Vương nằm ở tầng 7 Hùng Vương Plaza, là cụm rạp đầu tiên của CGV sở hữu công nghệ 4DX, mang đến trải nghiệm điện ảnh hoàn toàn mới lạ. Ngoài ra, rạp chiếu phim còn mang đến thử nghiệm ScreenX với 3 màn hình - góc nhìn mở rộng và trải nghiệm độc đáo. Dù đã ra đời khá lâu, CGV Hùng Vương luôn có được chất lượng ổn định và giá vé hấp dẫn.';
    theaters.push(theater);

    theater = new Theater();
    theater.name = 'BHD Star 3/2';
    theater.city = 'Tp. Hồ Chí Minh ';
    theater.address = '3 Đường 3 Tháng 2, Phường 11, Quận 11, Thành phố Hồ Chí Minh 700000';
    theater.phone = '+842862670670';
    theater.rooms = ['Max 1', 'Max 2', '3D max1', '3D max 2'];
    theater.mapEmbedID = '!1m18!1m12!1m3!1d3919.4605982761527!2d106.67868221480073!3d10.775991392321812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2661403577%3A0x9257956110ab20c!2sBHD%20Star%20Cineplex!5e0!3m2!1svi!2s!4v1605598782377!5m2!1svi!2s';
    theater.imagesSource = ['https://rapchieuphim.com/photos/3/rap-bhd-star-3-2.jpg', 'https://cdn.chanhtuoi.com/uploads/2016/09/giam-43-ve-xem-phim-bhd-star-vincom-32-gia-soc-chi-49-000d.jpg', 'https://booking.bhdstar.vn/CDN/Image/Entity/CinemaGallery/0000000001?width=1024&height=316'];
    theater.description = 'Rạp BHD 3/2 nằm ở TTTM Vincom 3/2, với 5 phòng chiếu phim 2D và 3D, là rạp chiếu phim thứ 3 thuộc BHD Star tại Sài Gòn. Nhắm đến đối tượng khán giả trẻ trên trục đường rất nhộn nhịp, BHD Star 3/2 luôn có giá vé rất cạnh tranh.';
    theaters.push(theater);

    theater = new Theater();
    theater.name = 'Lotte Nowzone';
    theater.city = 'Tp. Hồ Chí Minh ';
    theater.address = 'TTTM Nowzone, 235 Đ. Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ Chí Minh';
    theater.phone = '+842839262255';
    theater.rooms = ['Max 1', 'Max 2', 'Max3', '3D max 1', '3D max 2', '4D max 1', '4D max 2'];
    theater.mapEmbedID = '!1m18!1m12!1m3!1d3919.6133428171815!2d106.68024861480066!3d10.764253292329798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f19358a688d%3A0x950e00fb59d5e2db!2sLotte%20Cinema%20Nowzone!5e0!3m2!1svi!2s!4v1605598867827!5m2!1svi!2s';
    theater.imagesSource = ['https://media.lottecinemavn.com/Media/WebAdmin/ea1d1561cf7f46ae8f9cf3dd1add4c53.jpg', 'https://s3img.vcdn.vn/123phim/2017/10/lotte-cinema-nowzone-15077929757992.jpg', 'https://reviewphimaz.com/wp-content/uploads/2018/08/rap-chieu-phim-lotte-nowzone-tphcm.jpg', 'https://rapchieuphim.com/photos/3/rap-lotte-cinema-nowzone.jpg'];
    theater.description = 'Rạp Lotte Nowzone nằm ở TTTM Nowzone, được xây dựng với tiêu chuẩn rạp Hollywood, chuẩn âm thanh Dolby 7.1, màn hình lớn, sắc nét. Lotte Nowzone tọa lạc ở 1 trong những giao điểm giải trí nhộn nhịp của quận 1,6 và 10, do đó, Lotte Nowzone luôn là điểm hẹn giải trí ưu tiên của nhiều bạn trẻ. Khu vực trong và ngoài TTTM cũng có nhiều tiện ích giải trí đa dạng. Lotte Nowzone có 4 phòng chiếu - 483 chỗ ngồi.';
    theaters.push(theater);

    // theaters.forEach(async (_theater) => { await _theater.save(); });

    res.theaters = theaters;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getTheater,
  getAllTheaters,
  getTheatersByMovieID,
  postSampleTheaters,
};
