# Ensure development-speecific code is stripped from the bundle
export NODE_ENV=production

# clear the dist directory
rm -rf ./dom/dist
mkdir -p ./dom/dist

# Build the main thread bundle
react-native bundle \
  --config $(pwd)/rn-cli.config.js \
  --dev false \
  --platform dom \
  --entry-file ./dom/bootstrap.js \
  --assets-dest ./dom/dist \
  --bundle-output ./dom/dist/bootstrap.bundle

# Build the JS thread bundle
react-native bundle \
  --config $(pwd)/rn-cli.config.js \
  --dev false \
  --entry-file ./dom/entry.js \
  --platform dom \
  --bundle-output ./dom/dist/entry.bundle \
  --assets-dest ./dom/dist

# Copy the index.html file to the build destination
cp dom/index.html dom/dist/index.html