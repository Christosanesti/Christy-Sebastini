#!/usr/bin/env bash
# Fix Arch WiFi "connected but traffic stops" by:
# 1. Disabling WiFi power saving in NetworkManager
# 2. Stopping systemd-networkd from fighting with NetworkManager on wlan0
# 3. Stopping iwd so only wpa_supplicant is used (avoids "Match already configured")
set -e
echo "=== Installing NetworkManager WiFi powersave disable ==="
cp "$(dirname "$0")/default-wifi-powersave-on.conf" /etc/NetworkManager/conf.d/
chmod 644 /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf

echo "=== Disabling systemd-networkd (conflicts with NetworkManager on wlan0) ==="
systemctl stop systemd-networkd.service
systemctl disable systemd-networkd.service

echo "=== Disabling iwd (use only wpa_supplicant for WiFi) ==="
systemctl stop iwd.service
systemctl disable iwd.service

echo "=== Restarting NetworkManager ==="
systemctl restart NetworkManager.service

echo "=== Done. WiFi should be more stable. ==="
echo "If you use wired Ethernet and need systemd-networkd, re-enable it:"
echo "  sudo systemctl enable --now systemd-networkd.service"
