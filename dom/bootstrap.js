import { RNDomInstance } from "react-native-dom";

// Path to RN Bundle Entrypoint ================================================
const rnBundlePath = "./entry.bundle?platform=dom&dev=true";

// React Native DOM Runtime Options =============================================
const ReactNativeDomOptions = {
  enableHotReload: true,
  nativeModules: [],
};

// App Initialization ============================================================
const app = new RNDomInstance(
  rnBundlePath,
  "GuitarShopDemo",
  document.body,
  ReactNativeDomOptions
);

console.log(app);

app.start();
