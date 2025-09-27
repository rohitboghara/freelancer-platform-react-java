#!/bin/bash

# Detect the Linux distribution (RedHat or Debian-based)
detect_os() {
    if [ -f /etc/debian_version ]; then
        DISTRO="Debian"
    elif [ -f /etc/redhat-release ]; then
        DISTRO="RedHat"
    else
        DISTRO="Unknown"
    fi
}

check_maven() {
    if command -v mvn &> /dev/null
    then
        echo "Maven is already installed, skipping installation."
        return 0 
    else
        echo "Maven not found, installing..."
        return 1  
    fi
}

install_maven_debian() {
    sudo apt update
    sudo apt install -y maven
}

install_maven_redhat() {
    if command -v dnf &> /dev/null
    then
        sudo dnf install -y maven
    else
        sudo yum install -y maven
    fi
}

install_deb_package() {
    if [ -f "your-package.deb" ]; then
        echo "Installing .deb package..."
        sudo dpkg -i your-package.deb
        sudo apt-get install -f  
    else
        echo ".deb package not found."
    fi
}

install_rpm_package() {
    if [ -f "your-package.rpm" ]; then
        echo "Installing .rpm package..."
        sudo rpm -ivh your-package.rpm
    else
        echo ".rpm package not found."
    fi
}

# Start of the script
echo "Starting the installation script..."

# Detect OS type
detect_os
echo "Detected OS: $DISTRO"

if ! check_maven; then
    # OS-specific logic for Maven installation
    if [ "$DISTRO" == "Debian" ]; then
        # Debian/Ubuntu
        install_maven_debian
    elif [ "$DISTRO" == "RedHat" ]; then
        # Red Hat/CentOS
        install_maven_redhat
    else
        echo "Unsupported OS. Exiting..."
        exit 1
    fi
fi

# Install package based on distro
if [ "$DISTRO" == "Debian" ]; then
    install_deb_package
elif [ "$DISTRO" == "RedHat" ]; then
    install_rpm_package
else
    echo "Unsupported package type for OS $DISTRO. Exiting..."
    exit 1
fi

echo "Script execution completed."
