#!/bin/bash

echo "🌞 Setting up PV Solar Documentation System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18+."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create public directory if it doesn't exist
if [ ! -d "public" ]; then
    mkdir public
    echo "📁 Created public directory"
fi

# Copy environment file
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "📝 Created .env.local file"
    echo "⚠️  Please update .env.local with your email credentials"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update config/config.js with your company information"
echo "2. Set up Gmail App Password for email functionality"
echo "3. Optionally add your company logo to public/logo.png"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Visit http://localhost:3000 after starting the server"
echo ""