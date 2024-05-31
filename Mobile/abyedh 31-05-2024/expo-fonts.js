import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [loaded] = useFonts({
    'Droid': require('./assets/fonts/Roboto/Droid.ttf'),
  });

  return loaded;
}