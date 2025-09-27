#!/bin/bash

echo "Starting the process to create SNAPSHOT..."

# Navigate to the backend directory
cd backend/PROGIGS || { echo "Directory backend/PROGIGS not found. Exiting..."; exit 1; }

# Check Maven version
echo "Checking Maven version..."
mvn --version || { echo "Maven is not installed or failed to get version. Exiting..."; exit 1; }

# Clean target directory
echo "Cleaning target files..."
mvn clean || { echo "Failed to clean target directory. Exiting..."; exit 1; }

# Create the SNAPSHOT package
echo "Creating SNAPSHOT..."
mvn package || { echo "Failed to create SNAPSHOT. Exiting..."; exit 1; }

# Install the package
echo "Installing the package..."
mvn install || { echo "Failed to install the package. Exiting..."; exit 1; }

echo "Process completed successfully."
