#!/bin/bash

# Food Tracker Backend Verification Script

echo "==================================="
echo "Food Tracker Backend Verification"
echo "==================================="
echo ""

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✓ Node.js found: $(node --version)"
else
    echo "✗ Node.js not found. Please install Node.js v14 or higher."
    exit 1
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo "✓ npm found: $(npm --version)"
else
    echo "✗ npm not found."
    exit 1
fi

# Check if package.json exists
if [ -f "backend/package.json" ]; then
    echo "✓ package.json found"
else
    echo "✗ package.json not found"
    exit 1
fi

# Check if node_modules exists
if [ -d "backend/node_modules" ]; then
    echo "✓ Dependencies installed"
else
    echo "⚠ Dependencies not installed. Run 'npm install' in the backend directory."
fi

# Check if .env exists
if [ -f "backend/.env" ]; then
    echo "✓ .env file found"
else
    echo "⚠ .env file not found. Copy .env.example to .env and configure it."
fi

echo ""
echo "==================================="
echo "Backend structure verification:"
echo "==================================="

# Check directory structure
dirs=("config" "controllers" "middleware" "models" "routes" "utils")
for dir in "${dirs[@]}"; do
    if [ -d "backend/$dir" ]; then
        echo "✓ backend/$dir"
    else
        echo "✗ backend/$dir missing"
    fi
done

echo ""
echo "==================================="
echo "Next steps:"
echo "==================================="
echo "1. cd backend"
echo "2. npm install (if not already done)"
echo "3. cp .env.example .env"
echo "4. Configure .env with your MongoDB URI"
echo "5. npm run seed (to populate database)"
echo "6. npm run dev (to start the server)"
echo ""
echo "See backend/README.md for detailed instructions"
echo "==================================="
