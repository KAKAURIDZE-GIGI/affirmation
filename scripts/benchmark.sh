#!/usr/bin/env bash
# =============================================================================
# benchmark.sh — Host or Die VPS benchmark suite
#
# Usage:    ./benchmark.sh <provider-name>
# Example:  ./benchmark.sh digitalocean
#
# Runs the CPU (sysbench) and disk (fio) tests and saves ALL raw output to:
#     benchmark-results/<provider-name>-<YYYY-MM-DD>.txt
#
# Run this on a fresh instance of the tier being tested. It installs fio,
# sysbench and iperf3 via apt if they are missing.
#
# NOT done here — these are manual steps, run separately:
#   * iperf3 network throughput  — needs a second reference machine
#                                  (e.g. iperf3 -c <ref-host> -t 30, both ways)
#   * boot time                  — needs human timing / provider API timestamps
#                                  (e.g. `systemd-analyze` after a reboot)
# =============================================================================
set -euo pipefail

PROVIDER="${1:-}"
if [ -z "$PROVIDER" ]; then
  echo "Usage: $0 <provider-name>   (e.g. $0 digitalocean)" >&2
  exit 1
fi

DATE="$(date +%F)"
OUTDIR="benchmark-results"
OUTFILE="${OUTDIR}/${PROVIDER}-${DATE}.txt"

# fio test files MUST live on the real filesystem, not /tmp (often tmpfs / RAM),
# otherwise the disk numbers are meaningless.
WORKDIR="$(pwd)/.bench-fio-tmp"
mkdir -p "$OUTDIR" "$WORKDIR"
trap 'rm -rf "$WORKDIR"' EXIT

log() { printf '%b\n' "$*" | tee -a "$OUTFILE"; }
run() { log "\n\$ $*"; "$@" 2>&1 | tee -a "$OUTFILE"; }

: > "$OUTFILE"

# -----------------------------------------------------------------------------
# 0. Environment + setup check
# -----------------------------------------------------------------------------
log "=================================================================="
log " Host or Die benchmark"
log " provider : ${PROVIDER}"
log " date     : ${DATE}"
log "=================================================================="
log "kernel : $(uname -srm)"
log "vcpu   : $(nproc)"
log "memory : $(free -h 2>/dev/null | awk '/Mem:/ {print $2}')"
log "rootfs : $(df -h / | awk 'NR==2 {print $2" total, "$4" free ("$1")"}')"
log ""

MISSING=()
for tool in fio sysbench iperf3; do
  command -v "$tool" >/dev/null 2>&1 || MISSING+=("$tool")
done
if [ "${#MISSING[@]}" -gt 0 ]; then
  log "installing missing tools: ${MISSING[*]}"
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update -qq
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y "${MISSING[@]}" >/dev/null
  else
    log "ERROR: apt-get not found — install ${MISSING[*]} manually, then re-run."
    exit 1
  fi
fi
log "tools:"
log "  $(sysbench --version)"
log "  $(fio --version)"
log "  $(iperf3 --version 2>&1 | head -1)"

# -----------------------------------------------------------------------------
# 1. CPU — sysbench
# -----------------------------------------------------------------------------
log "\n\n######################  CPU  ######################"
log "# sysbench cpu --cpu-max-prime=20000 --threads=$(nproc)"
run sysbench cpu --cpu-max-prime=20000 --threads="$(nproc)" run

# -----------------------------------------------------------------------------
# 2. Disk — fio
# -----------------------------------------------------------------------------
FIO_COMMON=(
  --directory="$WORKDIR"
  --direct=1
  --ioengine=libaio
  --group_reporting
  --time_based
  --runtime=30
)

log "\n\n######################  DISK: sequential write  ######################"
log "# fio 1M block, 1G file, direct=1, 30s"
run fio --name=seqwrite --rw=write --bs=1M --size=1G "${FIO_COMMON[@]}"

log "\n\n######################  DISK: sequential read  ######################"
log "# fio 1M block, 1G file, direct=1, 30s"
run fio --name=seqread --rw=read --bs=1M --size=1G "${FIO_COMMON[@]}"

log "\n\n######################  DISK: random write  ######################"
log "# fio 4k block, 512M file, numjobs=4, direct=1, 30s"
run fio --name=randwrite --rw=randwrite --bs=4k --size=512M --numjobs=4 "${FIO_COMMON[@]}"

log "\n\n######################  DISK: random read  ######################"
log "# fio 4k block, 512M file, numjobs=4, direct=1, 30s"
run fio --name=randread --rw=randread --bs=4k --size=512M --numjobs=4 "${FIO_COMMON[@]}"

# -----------------------------------------------------------------------------
# 3. Cleanup
# -----------------------------------------------------------------------------
# Remove the fio scratch files (the whole WORKDIR is also cleared by the EXIT trap).
rm -f "$WORKDIR"/seqwrite.* "$WORKDIR"/seqread.* \
      "$WORKDIR"/randwrite.* "$WORKDIR"/randread.* 2>/dev/null || true
rm -rf "$WORKDIR"

log "\n\n=================================================================="
log " done — raw output: ${OUTFILE}"
log "=================================================================="
log ""
log "manual follow-ups (not run by this script):"
log "  network : iperf3 -c <reference-host> -t 30      # run both directions"
log "  boot    : reboot, then  systemd-analyze         # or provider API timestamps"
