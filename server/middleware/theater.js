import Theater from '../models/theater.js';
import mongoose from 'mongoose';

async function getTheater(req, res, next) {
  try {
    res.theater = await Theater.findById(mongoose.Types.ObjectId(req.params.id));
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}


async function getAllTheaters(req, res, next) {
  try {
    res.allTheaters = await Theater.find();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

async function postSampleTheaters(req, res, next) {
  try {
    let theaters = [];
    let theater = new Theater();
    theater['name'] = 'Galaxy Nguyễn Du';
    theater['city'] = 'Tp. Hồ Chí Minh ';
    theater['address'] = '116 Nguyễn Du, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh';
    theater['phone'] = '+8419002224';
    theater['rooms'] = ['Max 1', 'Max 2', '3D', '4D max'];
    theater['mapEmbedID'] = '!1m18!1m12!1m3!1d3919.497656679971!2d106.69101661480077!3d10.773144692323761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c0189fa2b%3A0x6e75dc36d4dba07d!2sGalaxy%20Nguy%E1%BB%85n%20Du!5e0!3m2!1svi!2s!4v1605598352014!5m2!1svi!2s';
    theaters.push(theater);

    theater = new Theater();
    theater['name'] = 'CGV Hùng Vương Plaza';
    theater['city'] = 'Tp. Hồ Chí Minh ';
    theater['address'] = 'Parkson Hung Vuong Plaza, 126 Đường Hùng Vương, Phường 12, Quận 5, Thành phố Hồ Chí Minh';
    theater['phone'] = '+8419006017';
    theater['rooms'] = ['Max 1', 'Max 2', '3D max 1', '3D max 2', '4D max 1', '4D max 2'];
    theater['mapEmbedID'] = '!1m18!1m12!1m3!1d3919.7198468030197!2d106.66079761480064!3d10.756061192335329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef08a32cf6f%3A0x796d8897cb4e6b59!2zQ0dWIEjDuW5nIFbGsMahbmcgUGxhemE!5e0!3m2!1svi!2s!4v1605598598616!5m2!1svi!2s';
    theaters.push(theater);

    theater = new Theater();
    theater['name'] = 'BHD Star 3/2';
    theater['city'] = 'Tp. Hồ Chí Minh ';
    theater['address'] = '3 Đường 3 Tháng 2, Phường 11, Quận 11, Thành phố Hồ Chí Minh 700000';
    theater['phone'] = '+842862670670';
    theater['rooms'] = ['Max 1', 'Max 2', '3D max1', '3D max 2'];
    theater['mapEmbedID'] = '!1m18!1m12!1m3!1d3919.4605982761527!2d106.67868221480073!3d10.775991392321812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2661403577%3A0x9257956110ab20c!2sBHD%20Star%20Cineplex!5e0!3m2!1svi!2s!4v1605598782377!5m2!1svi!2s';
    theaters.push(theater);

    theater = new Theater();
    theater['name'] = 'Lotte Nowzone';
    theater['city'] = 'Tp. Hồ Chí Minh ';
    theater['address'] = 'TTTM Nowzone, 235 Đ. Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ Chí Minh';
    theater['phone'] = '+842839262255';
    theater['rooms'] = ['Max 1', 'Max 2', 'Max3', '3D max 1', '3D max 2', '4D max 1', '4D max 2'];
    theater['mapEmbedID'] = '!1m18!1m12!1m3!1d3919.6133428171815!2d106.68024861480066!3d10.764253292329798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f19358a688d%3A0x950e00fb59d5e2db!2sLotte%20Cinema%20Nowzone!5e0!3m2!1svi!2s!4v1605598867827!5m2!1svi!2s';
    theaters.push(theater);

    // theaters.forEach(async theater => await theater.save());

    res.theaters = theaters;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

export  {
  getTheater,
  getAllTheaters,
  postSampleTheaters
};