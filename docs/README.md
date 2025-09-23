# Tracking Number Validation - Interactive Demo

This directory contains the GitHub Pages showcase for the tracking-number-validation library.

## 🌐 Live Demo

Visit the live demo at: [https://niradler.github.io/tracking-number-validation/](https://niradler.github.io/tracking-number-validation/)

## 📁 Contents

- `index.html` - The main showcase page with interactive demos
- `dist/` - Built library files (copied from the main build process)

## 🚀 Features Demonstrated

The interactive demo showcases all the library features:

1. **Basic Validation** - Test tracking numbers and see results
2. **Courier Detection** - Automatically identify shipping carriers
3. **URL Generation** - Get tracking URLs for validated numbers
4. **Bulk Validation** - Validate multiple tracking numbers at once
5. **Pattern Injection** - Add custom patterns to existing couriers
6. **Number Generation** - Generate valid tracking numbers for testing

## 🔧 Local Development

To run this locally:

1. Build the library: `pnpm build`
2. Copy dist files: `cp -r dist docs/`
3. Serve the docs directory with any static file server

## 📦 Supported Carriers

The demo supports all 11+ carriers including:
- UPS
- FedEx
- USPS
- DHL
- Amazon
- OnTrac
- Canada Post
- China Post
- Australia Post
- Royal Mail
- And more...

## 🛠 GitHub Pages Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the main branch.
