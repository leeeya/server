const companyProfileService = require('../services/companyProfile.service');
const RESPONSE = require('../constants/responses');

exports.recommendationSymbolList = async (req, res, next) => {
  const { keyword } = req.params;

  try {
    const companyProfile = await companyProfileService.findOne(keyword);

    if (!companyProfile) {
      res.status(200).json({ result: RESPONSE.FAILURE });
      return;
    }

    const { sector, industry, marketCap } = companyProfile.dataValues;
    const recommendationSymbolList = await companyProfileService.findAll(keyword, sector, industry, marketCap);

    res.status(200).json({ result: RESPONSE.OK, recommendationSymbolList, recommendationSymbolInfo: { sector, industry } });
  } catch (error) {
    next(error);
  }
};

exports.updateViews = async (req, res, next) => {
  const { keyword } = req.params;

  try {
    await companyProfileService.update(keyword);

    res.status(200).json({ result: RESPONSE.OK });
  } catch (error) {
    next(error);
  }
};