const axios = require('axios');

async function getAllProvinces(req, res, next) {
    try {//get id, title(name) only
        let getProvincesData = await axios.get('https://thongtindoanhnghiep.co/api/city');

        res.cities = getProvincesData.data;
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
}

async function getAllDistrict(req, res, next) {
    try {//get id, title(name) only
        let getProvincesData = await axios.get(
            'https://thongtindoanhnghiep.co/api/city/'
            + req.body.provinceID
            + '/district'
            );

        res.cities = getProvincesData.data;
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
}

export { }