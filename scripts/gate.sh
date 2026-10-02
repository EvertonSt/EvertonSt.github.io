#!/usr/bin/env bash
# The full local gate, in the order the kit requires: formatter, linter,
# typecheck, unit tests, build, repo verifiers.
#
# WHY THIS FILE EXISTS
# The failure it prevents is mundane and has bitten this project before:
# `npx tsc -b | tail -20; echo "exit=$?"` reports the exit status of `tail`,
# not of `tsc`. The pipeline succeeds, `tail` succeeds, and a broken build
# prints a great-looking green verdict. Every step here runs with pipefail and
# echoes its own status, so a red step is red.
#
# Usage: bash scripts/gate.sh [--fast]
#   --fast   skips the E2E suite (which needs a built site and a browser)

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

FAST=0
[ "${1:-}" = "--fast" ] && FAST=1

FAILED=()
PASSED=()

run_step() {
  local name="$1"
  shift
  printf '\n=== %s ===\n' "$name"
  if "$@"; then
    printf 'PASS %s\n' "$name"
    PASSED+=("$name")
  else
    local status=$?
    printf 'FAIL %s (exit %d)\n' "$name" "$status"
    FAILED+=("$name")
  fi
}

run_step "format:check" npm run --silent format:check
run_step "lint" npm run --silent lint
run_step "typecheck" npm run --silent typecheck
run_step "test:unit" npm run --silent test:unit
run_step "build" npm run --silent build
run_step "verify:links" npm run --silent verify:links
run_step "verify:assets" npm run --silent verify:assets
run_step "verify:cv" npm run --silent verify:cv
run_step "verify:attribution" npm run --silent verify:attribution

if [ "$FAST" -eq 0 ]; then
  run_step "test:e2e" npm run --silent test:e2e
fi

printf '\n========================================\n'
printf 'passed: %d\n' "${#PASSED[@]}"
if [ "${#FAILED[@]}" -ne 0 ]; then
  printf 'FAILED: %s\n' "${FAILED[*]}"
  printf 'Gate is RED. Fix or revert before continuing.\n'
  exit 1
fi
printf 'GATE GREEN (%d steps)\n' "${#PASSED[@]}"