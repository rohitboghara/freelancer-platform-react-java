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

# Create Kubernetes resources (namespace and other yml files)
create_k8s_resources() {
    echo "Creating Kubernetes resources from YAML files..."
    kubectl apply -f ./k8s/namespace.yml -f ./k8s/
}

# Check the status of the pods in the freelancer namespace
check_pod_status() {
    echo "Checking the status of pods in the freelancer namespace..."
    kubectl get pods -n freelancer
}

# Port-forward the backend service
port_forward_backend_service() {
    echo "Port forwarding backend service (3031:3031)..."
    kubectl port-forward svc/backend-service -n freelancer 3031:3031 --address=0.0.0.0
}

# Port-forward the frontend service
port_forward_frontend_service() {
    echo "Port forwarding frontend service (8090:80)..."
    kubectl port-forward svc/frontend-service -n freelancer 8090:80 --address=0.0.0.0
}

# Main Script Execution

echo "Starting Kubernetes deployment and service setup..."

# Detect OS type
detect_os
echo "Detected OS: $DISTRO"

# Check if kubectl is installed, install if necessary
if ! check_kubectl; then
    echo "kubectl is not installed. Exiting..."
    exit 1
fi

# Create Kubernetes resources (namespace and other yml files)
create_k8s_resources

# Check the status of the pods in the freelancer namespace
check_pod_status

# Wait until the pods are in 'Running' status
echo "Waiting for pods to be in 'Running' status..."
while [[ "$(kubectl get pods -n freelancer --no-headers | grep -v Running | wc -l)" -gt 0 ]]; do
    echo "Some pods are not ready yet, waiting for 10 seconds..."
    sleep 10
done

echo "All pods are running."

# Port-forward the backend service
port_forward_backend_service

# Port-forward the frontend service
port_forward_frontend_service

echo "Port forwarding completed. Services are accessible at the forwarded ports."
