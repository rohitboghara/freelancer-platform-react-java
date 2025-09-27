#!/bin/bash

# Detect the Linux distribution (Debian or RedHat-based)
detect_os() {
    if [ -f /etc/debian_version ]; then
        DISTRO="Debian"
    elif [ -f /etc/redhat-release ]; then
        DISTRO="RedHat"
    else
        DISTRO="Unknown"
    fi
}

# Check if Docker is installed
check_docker() {
    if command -v docker &> /dev/null; then
        echo "Docker is already installed."
        return 0
    else
        echo "Docker is not installed."
        return 1
    fi
}

# Check if Docker Compose is installed
check_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        echo "Docker Compose is already installed."
        return 0
    else
        echo "Docker Compose is not installed."
        return 1
    fi
}

# Install Docker on Debian-based systems
install_docker_debian() {
    echo "Installing Docker on Debian..."
    sudo apt update
    sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce
}

# Install Docker on RedHat-based systems
install_docker_redhat() {
    echo "Installing Docker on RedHat..."
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum install -y docker-ce docker-ce-cli containerd.io
}

# Install Docker Compose
install_docker_compose() {
    echo "Installing Docker Compose..."
    DOCKER_COMPOSE_VERSION="1.29.2"  # Update this to the latest stable version
    sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
}

# Start Docker service
start_docker() {
    echo "Starting Docker service..."
    sudo systemctl start docker
    sudo systemctl enable docker
}

# Run Docker Compose up
run_docker_compose() {
    echo "Running docker-compose up -d..."
    sudo docker-compose up -d
}

# Main Script Execution

echo "Starting Docker setup script..."

# Detect OS type
detect_os
echo "Detected OS: $DISTRO"

# Check and install Docker if necessary
if ! check_docker; then
    if [ "$DISTRO" == "Debian" ]; then
        install_docker_debian
    elif [ "$DISTRO" == "RedHat" ]; then
        install_docker_redhat
    else
        echo "Unsupported OS for Docker installation. Exiting..."
        exit 1
    fi
fi

# Check and install Docker Compose if necessary
if ! check_docker_compose; then
    install_docker_compose
fi

# Start Docker service
start_docker

# Run docker-compose up -d
run_docker_compose

echo "Docker and Docker Compose setup completed successfully."
