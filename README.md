# Kashtbhanjan Motors Invoice — Android

This project wraps the existing **Kashtbhanjan Motors – Invoice** HTML app. The existing UI/business logic is kept in `www/index.html` with only a minimal Android-readiness change: a direct **Mark as Paid** action in customer/pending cards.

## Build
- Capacitor 8.5.2
- Node 22
- Java 21
- Android API target is provided by Capacitor's generated Android project.
- `html2canvas` is installed from npm and copied into `www/` during CI so invoice image generation does not depend on the CDN at runtime.

## Data/features preserved
Invoice creation, customer records, pending payments, dealers, reports, CSV export, JSON backup/restore, WhatsApp links, print/PDF flow, localStorage draft/data, and existing web navigation/back handling.

## GitHub
The workflow builds debug and unsigned release APKs. A properly signed release requires a keystore and GitHub Actions secrets; the workflow will sign only when all four signing secrets are present.
