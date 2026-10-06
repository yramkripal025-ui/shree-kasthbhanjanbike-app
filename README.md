# Kashtbhanjan Motors – Invoice Android

Existing Kashtbhanjan Motors Invoice HTML app wrapped with Capacitor for Android.

## Build

GitHub Actions builds a debug APK and an unsigned release APK. The workflow validates the actual `www/index.html` path without relying on brittle feature-name greps, then bundles html2canvas and jsPDF locally before creating the Android project.

Package ID: `com.kashtbhanjan.motors`
