#!/bin/bash

# Function to detect OS type (Debian or RedHat)
detect_os() {
    if [ -f /etc/debian_version ]; then
        DISTRO="Debian"
    elif [ -f /etc/redhat-release ]; then
        DISTRO="RedHat"
    else
        DISTRO="Unknown"
    fi
}

# Check if Maven is installed
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

# Check if Java is installed and its version
check_java_version() {
    if command -v java &> /dev/null
    then
        CURRENT_JAVA_VERSION=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}')
        echo "Current Java version: $CURRENT_JAVA_VERSION"
        if [[ "$CURRENT_JAVA_VERSION" == 17* ]]; then
            echo "Java 17 is already installed."
            return 0
        else
            echo "Java version is not 17, updating..."
            return 1
        fi
    else
        echo "Java is not installed."
        return 1
    fi
}

# Install Java 17 on Debian-based systems
install_java_debian() {
    echo "Installing Java 17 on Debian..."
    sudo apt update
    sudo apt install -y openjdk-17-jdk
}

# Install Java 17 on RedHat-based systems
install_java_redhat() {
    echo "Installing Java 17 on RedHat..."
    sudo yum install -y java-17-openjdk-devel
}

# Install Maven on Debian-based systems
install_maven_debian() {
    sudo apt update
    sudo apt install -y maven
}

# Install Maven on RedHat-based systems
install_maven_redhat() {
    if command -v dnf &> /dev/null
    then
        sudo dnf install -y maven
    else
        sudo yum install -y maven
    fi
}

# Install .deb package (if any)
install_deb_package() {
    if [ -f "your-package.deb" ]; then
        echo "Installing .deb package..."
        sudo dpkg -i your-package.deb
        sudo apt-get install -f  
    else
        echo ".deb package not found."
    fi
}

# Install .rpm package (if any)
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

if ! check_java_version; then
    # OS-specific logic for Java installation
    if [ "$DISTRO" == "Debian" ]; then
        install_java_debian
    elif [ "$DISTRO" == "RedHat" ]; then
        install_java_redhat
    else
        echo "Unsupported OS for Java installation. Exiting..."
        exit 1
    fi
fi

if ! check_maven; then
    # OS-specific logic for Maven installation
    if [ "$DISTRO" == "Debian" ]; then
        install_maven_debian
    elif [ "$DISTRO" == "RedHat" ]; then
        install_maven_redhat
    else
        echo "Unsupported OS. Exiting..."
        exit 1
    fi
fi

if [ "$DISTRO" == "Debian" ]; then
    install_deb_package
elif [ "$DISTRO" == "RedHat" ]; then
    install_rpm_package
else
    echo "Unsupported package type for OS $DISTRO. Exiting..."
    exit 1
fi

echo "Script execution completed."
