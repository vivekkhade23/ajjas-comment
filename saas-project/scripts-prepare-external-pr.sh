#!/usr/bin/env bash
set -euo pipefail

TARGET_REPO_URL="${1:-https://github.com/vivekkhade23/HIMS_Client.git}"
TARGET_DIR="${2:-HIMS_Client}"
BRANCH_NAME="${3:-feat/multi-tenant-saas-starter}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -d "${TARGET_DIR}" ]]; then
  echo "Target directory ${TARGET_DIR} already exists."
  exit 1
fi

git clone "${TARGET_REPO_URL}" "${TARGET_DIR}"
cd "${TARGET_DIR}"
git checkout -b "${BRANCH_NAME}"

rsync -av --exclude node_modules --exclude dist "${SCRIPT_DIR}/" ./saas-project/

git add saas-project
git commit -m "Add multi-tenant SaaS starter (Node/Express + Angular)"

echo "Prepared branch ${BRANCH_NAME}. Push with: git push -u origin ${BRANCH_NAME}"
