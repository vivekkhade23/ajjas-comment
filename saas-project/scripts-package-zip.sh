#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${ROOT_DIR}/.." && pwd)"
OUT_ZIP="${REPO_ROOT}/saas-project.zip"

cd "${REPO_ROOT}"
zip -r "${OUT_ZIP}" saas-project -x "*.git*" "*/node_modules/*" "*/dist/*"
echo "Created ${OUT_ZIP}"
