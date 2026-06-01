#!/bin/bash

# Test Script for Soft 404 Fix Verification
# This script verifies that non-existent pages return 404 status codes
# instead of 200 (soft 404s)

DOMAIN="${1:-https://www.gaglawyers.com}"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Soft 404 Fix Verification Script                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Testing: $DOMAIN"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

# Test helper function
test_url() {
  local url=$1
  local expected_status=$2
  local description=$3
  
  local status=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
  local robots=$(curl -sL "$url" | grep -o 'robots" content="[^"]*"' | head -1)
  
  echo "Testing: $description"
  echo "URL: $url"
  echo "Expected: $expected_status"
  echo "Got: $status"
  
  if [ "$status" = "$expected_status" ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((PASS++))
  else
    echo -e "${RED}❌ FAIL${NC}"
    ((FAIL++))
  fi
  
  if [ -n "$robots" ]; then
    echo "Robots: $robots"
  fi
  
  echo ""
}

echo "════════════════════════════════════════════════════════════════"
echo "Test Group 1: Real Pages (Should Return 200 OK)"
echo "════════════════════════════════════════════════════════════════"
echo ""

test_url "$DOMAIN/corporate-law" "200" "Real Service Page"
test_url "$DOMAIN/about" "200" "Static About Page"
test_url "$DOMAIN/services" "200" "Static Services List Page"
test_url "$DOMAIN/contact" "200" "Static Contact Page"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "Test Group 2: Real Location Pages (Should Return 200 OK)"
echo "════════════════════════════════════════════════════════════════"
echo ""

test_url "$DOMAIN/criminal-lawyer-in-delhi" "200" "Real Location Page"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "Test Group 3: Non-Existent Pages (Should Return 404 Not Found)"
echo "════════════════════════════════════════════════════════════════"
echo ""

test_url "$DOMAIN/this-service-does-not-exist" "404" "Non-existent Service"
test_url "$DOMAIN/fake-lawyer-in-fake-city" "404" "Non-existent Location"
test_url "$DOMAIN/invalid-slug-12345" "404" "Invalid Slug"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "Test Group 4: Robots Meta Tags (404 pages should have noindex)"
echo "════════════════════════════════════════════════════════════════"
echo ""

echo "Checking: /this-service-does-not-exist (should have noindex)"
ROBOTS=$(curl -sL "$DOMAIN/this-service-does-not-exist" | grep -o 'name="robots" content="[^"]*"')
if [[ "$ROBOTS" == *"noindex"* ]]; then
  echo -e "${GREEN}✅ PASS: Contains noindex${NC}"
  ((PASS++))
else
  echo -e "${RED}❌ FAIL: Missing noindex${NC}"
  ((FAIL++))
fi
echo "Meta tag: $ROBOTS"
echo ""

echo "Checking: /corporate-law (real page, should NOT have noindex)"
ROBOTS=$(curl -sL "$DOMAIN/corporate-law" | grep -o 'name="robots" content="[^"]*"')
if [[ "$ROBOTS" != *"noindex"* ]]; then
  echo -e "${GREEN}✅ PASS: No noindex (correct)${NC}"
  ((PASS++))
else
  echo -e "${RED}❌ FAIL: Has noindex (should not)${NC}"
  ((FAIL++))
fi
echo "Meta tag: $ROBOTS"
echo ""

# Summary
echo "════════════════════════════════════════════════════════════════"
echo "SUMMARY"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed! Soft 404s are fixed.${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed. Check the output above.${NC}"
  exit 1
fi
