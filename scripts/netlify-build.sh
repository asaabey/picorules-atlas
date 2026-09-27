#!/usr/bin/env bash
set -euo pipefail
# Netlify base directory is the workspace root (which has no package.json).
workspace_dir="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$workspace_dir"
compiler_sha="$(cat picorules-atlas/CORE_COMPILER_SHA)"
if [ ! -d picorules-compiler-js-core ]; then
  git clone https://github.com/asaabey/picorules-compiler-js-core.git picorules-compiler-js-core
  git -C picorules-compiler-js-core checkout "$compiler_sha"
fi
if [ "$(git -C picorules-compiler-js-core rev-parse HEAD)" != "$compiler_sha" ]; then
  echo 'Compiler checkout differs from CORE_COMPILER_SHA; use the pinned revision.' >&2
  exit 1
fi
npm --prefix picorules-compiler-js-core ci
npm --prefix picorules-compiler-js-core run build
npm --prefix picorules-atlas ci
npm --prefix picorules-atlas run build
