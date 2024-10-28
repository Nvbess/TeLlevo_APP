import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TeLlevo_APP',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      lensFacing: 'back',
    }
  }
};

export default config;