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

# Check if kind is installed
check_kind() {
    if command -v kind &> /dev/null; then
        echo "kind is already installed."
        return 0
    else
        echo "kind is not installed."
        return 1
    fi
}

# Check if kubectl is installed
check_kubectl() {
    if command -v kubectl &> /dev/null; then
        echo "kubectl is already installed."
        return 0
    else
        echo "kubectl is not installed."
        return 1
    fi
}

# Install kind on Debian-based systems
install_kind_debian() {
    echo "Installing kind on Debian..."
    curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.17.0/kind-linux-amd64
    sudo mv ./kind /usr/local/bin/kind
    sudo chmod +x /usr/local/bin/kind
}

# Install kind on RedHat-based systems
install_kind_redhat() {
    echo "Installing kind on RedHat..."
    curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.17.0/kind-linux-amd64
    sudo mv ./kind /usr/local/bin/kind
    sudo chmod +x /usr/local/bin/kind
}

# Install kubectl on Debian-based systems
install_kubectl_debian() {
    echo "Installing kubectl on Debian..."
    sudo apt update
    sudo apt install -y kubectl
}

# Install kubectl on RedHat-based systems
install_kubectl_redhat() {
    echo "Installing kubectl on RedHat..."
    sudo yum install -y kubectl
}

# Create a Kind cluster
create_kind_cluster() {
    echo "Creating Kind cluster with the name 'my-k8s' using config.yml..."
    kind create cluster --name=my-k8s --config=config.yml
}

# Check the status of the nodes using kubectl
check_kubectl_nodes() {
    echo "Checking the status of Kubernetes nodes..."
    kubectl get nodes
}

# Main Script Execution

echo "Starting Kubernetes setup script..."

# Detect OS type
detect_os
echo "Detected OS: $DISTRO"

# Check if kind is installed, install if necessary
if ! check_kind; then
    if [ "$DISTRO" == "Debian" ]; then
        install_kind_debian
    elif [ "$DISTRO" == "RedHat" ]; then
        install_kind_redhat
    else
        echo "Unsupported OS for kind installation. Exiting..."
        exit 1
    fi
fi

# Check if kubectl is installed, install if necessary
if ! check_kubectl; then
    if [ "$DISTRO" == "Debian" ]; then
        install_kubectl_debian
    elif [ "$DISTRO" == "RedHat" ]; then
        install_kubectl_redhat
    else
        echo "Unsupported OS for kubectl installation. Exiting..."
        exit 1
    fi
fi

# Check if the kind cluster already exists
if kind get clusters | grep -q "my-k8s"; then
    echo "Kind cluster 'my-k8s' already exists. Skipping cluster creation."
else
    # Create the kind cluster if it doesn't already exist
    create_kind_cluster
fi

# Check the status of Kubernetes nodes
check_kubectl_nodes

echo "Kubernetes setup completed successfully."
