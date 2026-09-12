# VMware Workstation and Ubuntu Server

This guide creates a Dune Docker host in an Ubuntu Server virtual machine on VMware Workstation Pro. A native Linux host remains the simplest option for a busy public server, but a properly sized bridged VM is supported.

## 1. Avoid the Hyper-V Default Switch

If the Windows host also has Funcom's Hyper-V setup, prevent VMware from automatically bridging through Hyper-V's private default switch:

1. Press **Win + R**.
2. Enter `ncpa.cpl` and press **Enter**.
3. Open **Properties** for **vEthernet (Default Switch)**.
4. Clear **VMware Bridge Protocol**.
5. Select **OK**.

{% hint style="warning" %}
Remove VMware Bridge Protocol only from **vEthernet (Default Switch)**. Leave it enabled on the physical Ethernet or Wi-Fi adapter VMware intentionally uses for bridged networking.
{% endhint %}

## 2. Download the Software

- Download [VMware Workstation Pro from Broadcom](https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Workstation%20Pro). Follow the current Broadcom account and licensing instructions shown by the download portal.
- Download the current [Ubuntu Server LTS ISO](https://ubuntu.com/download/server).

## 3. Create the Virtual Machine

Create a new Ubuntu 64-bit VM and attach the Ubuntu Server ISO. Use these Dune Docker requirements as the starting point:

| Resource | Guidance |
|---|---|
| CPU | The physical CPU and VM must expose AVX/AVX2. Allocate multiple vCPUs and monitor sustained load. |
| Memory | 20 GB minimum for a basic layout; use 30–40 GB or more for additional always-on maps. |
| Disk | 200 GB or more, with room for game content, Docker images, logs, and backups. |
| Network | Bridged to the intended physical LAN adapter. |

Bridged mode gives the VM its own address on the same LAN as Windows:

```text
Windows host: 192.168.1.25
Ubuntu VM:    192.168.1.50
Router:       192.168.1.1
```

Do not assign the VM the Windows host's address. Avoid VMware NAT unless you have deliberately planned both VMware and router port forwarding.

## 4. Install Ubuntu Server

Boot from the ISO and complete the Ubuntu installer:

- Use the default storage layout unless you have a specific disk plan.
- Create a regular user with `sudo` access.
- Enable **OpenSSH Server** if you want to administer the VM over SSH.

After the installation, reboot and disconnect the ISO when VMware asks.

## 5. Verify the VM Network

Log in to Ubuntu and run:

```bash
hostname -I
ip -4 route get 1.1.1.1
```

Use the LAN address associated with the default route. Reserve that address for the VM in your router or DHCP server so Console bookmarks and port-forwarding rules remain stable.

## 6. Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

Reboot if Ubuntu reports that one is required:

```bash
sudo reboot
```

## 7. Install Dune Docker

Open the public [Dune Docker repository](https://github.com/Red-Blink/dune-awakening-selfhost-docker) and copy its current one-command installer. Run it inside Ubuntu as the regular user, not as `root` and not by prefixing the install command with `sudo`.

Using Windows Terminal, OpenSSH, or PuTTY can make copying commands into the VM easier than the VMware console.

## 8. Open the Console

The installer prints the Console URL and first login password. Open the URL from the Windows browser using the Ubuntu VM's address, normally:

```text
http://192.168.1.50:8088
```

Sign in, complete First Run, and start the Battlegroup from the Console. Then verify:

```bash
cd "$HOME/dune-awakening-selfhost-docker"
runtime/scripts/dune doctor
runtime/scripts/dune ready
```

## 9. Prepare for Players

- Follow [Networking and Ports](networking.md) for the required firewall and router rules.
- Use the VM's LAN address as the forwarding destination.
- Keep the Console private to trusted administrators.
- Treat VMware snapshots as VM rollback points, not as a replacement for Dune Docker database backups.

If the server appears in game but players remain stuck on Connecting and the Windows host also runs Docker Desktop, WSL2, or Hyper-V, use [Docker Desktop, WSL2, Hyper-V, and VMware Network Conflict](../operations/docker-desktop-wsl2-network-conflict.md).
