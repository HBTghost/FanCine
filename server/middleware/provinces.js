import axios from 'axios';

async function getAllProvinces(req, res, next) {
  try { // get id, title(name) only
    const getProvincesData = await axios.get('https://thongtindoanhnghiep.co/api/city');

    res.fullProvinces = getProvincesData.data.LtsItem.map(
      (province) => ({ 'ID': province.ID, 'Title': province.Title }),
    )
      .sort((a, b) => ((a.Title > b.Title) ? 1 : -1));
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllDistrict(req, res, next) {
  try { // get id, title(name) only
    const getDistrictData = await axios.get(
      `https://thongtindoanhnghiep.co/api/city/${req.params.provinceID}/district`,
    );

    res.districts = getDistrictData.data.map(
      (district) => ({ 'ID': district.ID, 'Title': district.Title }),
    )
      .sort((a, b) => ((a.Title > b.Title) ? 1 : -1));
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export { getAllProvinces, getAllDistrict };
