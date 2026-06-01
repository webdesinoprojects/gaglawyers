#!/bin/bash

# Complete Verification Script for SSR Implementation
# Run this after deploying to verify all SSR functionality works

set -e

SITE_URL="${1:-https://www.gaglawyers.com}"
TEMP_FILE="/tmp/ssr-test-output.html"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         SSR Implementation Verification Script                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Testing: $SITE_URL"
echo ""

# Test 1: Location page
echo "📄 Test 1: Location Page"
echo "─────────────────────────────────────────────────────────────────"

TEST_URL="$SITE_URL/insolvency-bankruptcy-lawyer-in-abhirampur"
echo "URL: $TEST_URL"

curl -sL "$TEST_URL" > "$TEMP_FILE"

# Check title
TITLE=$(grep -o '<title>[^<]*</title>' "$TEMP_FILE" | head -1)
if [ -z "$TITLE" ]; then
    echo "❌ FAIL: No <title> tag found"
else
    echo "✅ PASS: $TITLE"
fi

# Check meta description
META=$(grep -o '<meta name="description" content="[^"]*"' "$TEMP_FILE" | head -1)
if [ -z "$META" ]; then
    echo "❌ FAIL: No meta description found"
else
    echo "✅ PASS: $META"
fi

# Check canonical
CANONICAL=$(grep -o '<link rel="canonical" href="[^"]*"' "$TEMP_FILE" | head -1)
if [ -z "$CANONICAL" ]; then
    echo "❌ FAIL: No canonical tag found"
else
    echo "✅ PASS: $CANONICAL"
fi

# Check H1
H1=$(grep -o '<h1[^>]*>[^<]*</h1>' "$TEMP_FILE" | head -1)
if [ -z "$H1" ]; then
    echo "❌ FAIL: No <h1> tag found (content might not be loaded)"
else
    echo "✅ PASS: H1 found: ${H1:0:80}..."
fi

# Check JSON-LD
SCHEMA=$(grep -c "application/ld+json" "$TEMP_FILE" || echo 0)
if [ "$SCHEMA" -eq 0 ]; then
    echo "❌ FAIL: No JSON-LD schema found"
else
    echo "✅ PASS: JSON-LD schema present"
fi

echo ""

# Test 2: Service page
echo "📄 Test 2: Service Page"
echo "─────────────────────────────────────────────────────────────────"

TEST_URL="$SITE_URL/corporate-law"
echo "URL: $TEST_URL"

curl -sL "$TEST_URL" > "$TEMP_FILE"

TITLE=$(grep -o '<title>[^<]*</title>' "$TEMP_FILE" | head -1)
if [ -z "$TITLE" ]; then
    echo "❌ FAIL: No <title> tag"
else
    echo "✅ PASS: $TITLE"
fi

CANONICAL=$(grep -o '<link rel="canonical" href="[^"]*"' "$TEMP_FILE" | head -1)
if [[ "$CANONICAL" == *"corporate-law"* ]]; then
    echo "✅ PASS: Correct canonical for service page"
else
    echo "❌ FAIL: Canonical not matching service slug"
fi

echo ""

# Test 3: Static page
echo "📄 Test 3: Static Page"
echo "─────────────────────────────────────────────────────────────────"

TEST_URL="$SITE_URL/about"
echo "URL: $TEST_URL"

curl -sL "$TEST_URL" > "$TEMP_FILE"

TITLE=$(grep -o '<title>[^<]*</title>' "$TEMP_FILE" | head -1)
if [[ "$TITLE" == *"About"* ]]; then
    echo "✅ PASS: $TITLE"
else
    echo "⚠️  WARNING: About title might be generic"
fi

CANONICAL=$(grep -o '<link rel="canonical" href="[^"]*"' "$TEMP_FILE" | head -1)
if [[ "$CANONICAL" == *"/about"* ]]; then
    echo "✅ PASS: Correct canonical for static page"
else
    echo "❌ FAIL: Canonical not set for static page"
fi

echo ""

# Test 4: React Hydration
echo "📄 Test 4: React App Shell Check"
echo "─────────────────────────────────────────────────────────────────"

TEST_URL="$SITE_URL/corporate-law"
curl -sL "$TEST_URL" > "$TEMP_FILE"

# Check if entry-client.jsx is loaded (or assets/index-*.js)
JS_BUNDLE=$(grep -o 'src="[^"]*assets[^"]*\.js"' "$TEMP_FILE" | head -1)
if [ -z "$JS_BUNDLE" ]; then
    echo "⚠️  WARNING: No JS bundle reference found (check if using entry-client.jsx)"
else
    echo "✅ PASS: JS bundle loaded: $JS_BUNDLE"
fi

# Check for React root div
ROOT_DIV=$(grep -o '<div id="root">' "$TEMP_FILE" | head -1)
if [ -z "$ROOT_DIV" ]; then
    echo "❌ FAIL: No root div found for React hydration"
else
    echo "✅ PASS: React root div present"
fi

echo ""

# Test 5: Performance Check
echo "⏱️  Test 5: Response Time"
echo "─────────────────────────────────────────────────────────────────"

TEST_URL="$SITE_URL/corporate-law"
RESPONSE_TIME=$(curl -sL -w "%{time_total}" -o /dev/null "$TEST_URL")
RESPONSE_MS=$(echo "$RESPONSE_TIME * 1000" | bc)

echo "Response time: ${RESPONSE_MS%.*}ms"
if (( $(echo "$RESPONSE_MS < 1000" | bc -l) )); then
    echo "✅ PASS: Response time < 1 second"
else
    echo "⚠️  WARNING: Response time > 1 second (might need optimization)"
fi

echo ""

# Test 6: Accessibility
echo "🔍 Test 6: SEO Essentials Check"
echo "─────────────────────────────────────────────────────────────────"

TEST_URL="$SITE_URL/insolvency-bankruptcy-lawyer-in-abhirampur"
curl -sL "$TEST_URL" > "$TEMP_FILE"

# Check robots meta tag
ROBOTS=$(grep -o '<meta name="robots" content="[^"]*"' "$TEMP_FILE" | head -1)
if [ -z "$ROBOTS" ]; then
    echo "⚠️  WARNING: No robots meta tag"
else
    echo "✅ PASS: $ROBOTS"
fi

# Check OG tags
OG_TITLE=$(grep -o '<meta property="og:title"' "$TEMP_FILE" | head -1)
OG_DESC=$(grep -o '<meta property="og:description"' "$TEMP_FILE" | head -1)
OG_URL=$(grep -o '<meta property="og:url"' "$TEMP_FILE" | head -1)

if [ -n "$OG_TITLE" ] && [ -n "$OG_DESC" ] && [ -n "$OG_URL" ]; then
    echo "✅ PASS: All OG tags present"
else
    echo "⚠️  WARNING: Some OG tags missing"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                   Verification Complete                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Cleanup
rm -f "$TEMP_FILE"

echo ""
echo "✅ If all tests passed, your SSR implementation is working!"
echo "🔍 You can now:"
echo "  1. Submit your website to Google Search Console"
echo "  2. Monitor crawl stats for improved indexation"
echo "  3. Check Core Web Vitals in Google PageSpeed Insights"
echo ""
