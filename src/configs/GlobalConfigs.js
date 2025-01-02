import Config from "react-native-config";

class GlobalConfigs {
  get VERSION() {
    return "1";
  }
  get API_URL() {
    // return process.env.REACT_APP_APIHOSTURL
    return Config.API_URL
    // return "https://lmsapi.schemaphic.co.in:4000/mobile/v1/api/"
  }

  get PDF_URL()
  {
    return Config.PDFURL
  }

  get IMAGE_URL() {
    return process.env.REACT_APP_IMAGE_URL
  }

}

const globalConfigs = new GlobalConfigs();

export default globalConfigs;
