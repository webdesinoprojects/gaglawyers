#!/bin/bash

# Exact Validation Commands for SSR Implementation Fix
# Copy-paste these commands to verify the fix is working

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║    GAG Lawyers SSR Fix - Validation Commands                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# TEST 1: Check if server is running
echo "🔍 TEST 1: Check if server is running"
echo "────────────────────────────────────────────────────────────────"
echo "Command: curl -I http://localhost:5000/"
echo ""
curl -I http://localhost:5000/ 2>/dev/null | head -5
echo ""

# TEST 2: Check if title tag appears in view-source
echo "🔍 TEST 2: Check <title> tag in view-source"
echo "────────────────────────────────────────────────────────────────"
echo "Command: curl -L http://localhost:5000/corporate-law | grep '<title>'"
echo ""
TITLE=$(curl -sL http://localhost:5000/corporate-law | grep '<title>')
if [ -z "$TITLE" ]; then
    echo "❌ FAIL: No title tag found"
else
    echo "✅ PASS: $TITLE"
fi
echo ""

# TEST 3: Check if meta description appears
echo "🔍 TEST 3: Check <meta name=\"description\"> in view-source"
echo "────────────────────────────────────────────────────────────────"
echo "Command: curl -L http://localhost:5000/corporate-law | grep 'meta.*description'"
echo ""
META=$(curl -sL http://localhost:5000/corporate-law | grep 'meta.*description')
if [ -z "$META" ]; then
    echo "❌ FAIL: No meta description found"
else
    echo "✅ PASS: Found"
fi
echo ""

# TEST 4: Check canonical URL
echo "🔍 TEST 4: Check <link rel=\"canonical\"> in view-source"
echo "────────────────────────────────────────────────────────────────"
echo "Command: curl -L http://localhost:5000/corporate-law | grep 'canonical'"
echo ""
CANONICAL=$(curl -sL http://localhost:5000/corporate-law | grep 'canonical')
if [ -z "$CANONICAL" ]; then
    echo "❌ FAIL: No canonical tag found"
else
    echo "✅ PASS: $CANONICAL"
fi
echo ""

# TEST 5: Check location page
echo "🔍 TEST 5: Check location page with unique title"
echo "────────────────────────────────────────────────────────────────"
echo "Command: curl -L http://localhost:5000/criminal-lawyer-in-delhi | grep '<title>'"
echo ""
LOCATION_TITLE=$(curl -sL http://localhost:5000/criminal-lawyer-in-delhi | grep '<title>')
if [ -z "$LOCATION_TITLE" ]; then
    echo "❌ FAIL: No title for location page"
else
    echo "✅ PASS: $LOCATION_TITLE"
fi
echo ""

# TEST 6: Full HTML output (for debugging)
echo "🔍 TEST 6: Full HTML head output for /corporate-law"
echo "────────────────────────────────────────────────────────────────"
echo "Command: curl -L http://localhost:5000/corporate-law | head -40"
echo ""
curl -sL http://localhost:5000/corporate-law | head -40
echo ""

# TEST 7: Check for duplicate title tags
echo "🔍 TEST 7: Count <title> tags (should be exactly 1)"
echo "────────────────────────────────────────────────────────────────"
TITLE_COUNT=$(curl -sL http://localhost:5000/corporate-law | grep -c '<title>' || echo 0)
echo "Command: curl -L http://localhost:5000/corporate-law | grep -c '<title>'"
echo ""
if [ "$TITLE_COUNT" -eq 1 ]; then
    echo "✅ PASS: Exactly 1 <title> tag (correct)"
else
    echo "❌ FAIL: Found $TITLE_COUNT <title> tags (should be 1)"
fi
echo ""

# TEST 8: Production URL verification (if deployed)
echo "🔍 TEST 8: Test production URL (update URL if different)"
echo "────────────────────────────────────────────────────────────────"
PROD_URL="https://www.gaglawyers.com"
echo "Command: curl -L $PROD_URL/insolvency-bankruptcy-lawyer-in-abhirampur | grep '<title>'"
echo ""
PROD_TITLE=$(curl -sL "$PROD_URL/insolvency-bankruptcy-lawyer-in-abhirampur" | grep '<title>' 2>/dev/null)
if [ -z "$PROD_TITLE" ]; then
    echo "⚠️  SKIP: Production not accessible from this location"
else
    echo "✅ PASS: $PROD_TITLE"
fi
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                Validation Complete                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "If all tests passed, your SSR implementation is working correctly!"
echo ""
