#!/bin/bash

# Set the name for the cluster
CLUSTER_NAME="my-k8s"
CONFIG_FILE="config/config.yml"

# Check if kind is installed
if ! command -v kind &> /dev/null; then
    echo "kind could not be found. Please install kind first."
    exit 1
fi

# Check if the config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Config file '$CONFIG_FILE' not found. Please ensure the file exists."
    exit 1
fi

# Create the Kubernetes cluster using kind and the provided config file
echo "Creating Kubernetes cluster with kind using config file '$CONFIG_FILE'..."
kind create cluster --name $CLUSTER_NAME --config $CONFIG_FILE

# Check if the cluster was created successfully
if [ $? -eq 0 ]; then
    echo "Cluster '$CLUSTER_NAME' created successfully!"
else
    echo "Failed to create the cluster."
    exit 1
fi

# Export the kubeconfig for the new cluster

# Set up kubectl to use the newly created cluster
echo "Configuring kubectl..."
kubectl cluster-info --context kind-$CLUSTER_NAME

# Optionally, you can install additional tools or set up Helm, etc.

echo "Cluster setup complete."

kubectl get nodes
