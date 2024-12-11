#!/bin/bash

# First remove the nested src directory if it's empty
rm -rf src

# Create necessary directories in features
mkdir -p features/registration/components/forms

# Move registration components to features
mv app/[event]/register/client.tsx features/registration/components/
mv components/register/* features/registration/components/
mv components/register/forms/* features/registration/components/forms/

# Move events data to features/events/api
mv data/events.ts features/events/api/

# Ensure UI components directory exists and move components
mkdir -p components/ui
mv components/ui/* components/ui/

# Move types to their new location
mkdir -p types
mv types/generated-types.ts types/
mv types/registration.ts types/

# Clean up empty directories
rm -rf data
rm -rf components/register

echo "Refactoring complete! Please check the new structure and update imports accordingly."
