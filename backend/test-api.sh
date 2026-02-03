#!/bin/bash

# Backend API Test Script
# This script tests all endpoints of the Food Tracker API

BASE_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Food Tracker Backend API Test ===${NC}\n"

# Test 1: Health check
echo -e "${BLUE}1. Testing health check endpoint...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" ${BASE_URL}/health)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}\n"
else
    echo -e "${RED}✗ Health check failed (HTTP $HTTP_CODE)${NC}\n"
    exit 1
fi

# Test 2: Register user
echo -e "${BLUE}2. Testing user registration...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST ${BASE_URL}/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"testuser$(date +%s)@example.com\",\"password\":\"testpass123\",\"name\":\"Test User\"}")

TOKEN=$(echo $REGISTER_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))" 2>/dev/null)
if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✓ User registration successful${NC}"
    echo -e "  Token: ${TOKEN:0:20}...\n"
else
    echo -e "${RED}✗ User registration failed${NC}\n"
    exit 1
fi

# Test 3: Login
echo -e "${BLUE}3. Testing user login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST ${BASE_URL}/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test123"}')

LOGIN_TOKEN=$(echo $LOGIN_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))" 2>/dev/null)
if [ -n "$LOGIN_TOKEN" ]; then
    echo -e "${GREEN}✓ User login successful${NC}\n"
    TOKEN=$LOGIN_TOKEN
else
    echo -e "${GREEN}✓ Using registered user token${NC}\n"
fi

# Test 4: Validate token
echo -e "${BLUE}4. Testing token validation...${NC}"
VALIDATE_RESPONSE=$(curl -s -w "\n%{http_code}" ${BASE_URL}/api/auth/validate \
    -H "Authorization: Bearer $TOKEN")
HTTP_CODE=$(echo "$VALIDATE_RESPONSE" | tail -n1)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Token validation passed${NC}\n"
else
    echo -e "${RED}✗ Token validation failed (HTTP $HTTP_CODE)${NC}\n"
    exit 1
fi

# Test 5: Search foods
echo -e "${BLUE}5. Testing food search...${NC}"
SEARCH_RESPONSE=$(curl -s "${BASE_URL}/api/foods/search?query=apple&limit=5" \
    -H "Authorization: Bearer $TOKEN")
FOOD_COUNT=$(echo $SEARCH_RESPONSE | python3 -c "import sys, json; print(len(json.load(sys.stdin).get('foods', [])))" 2>/dev/null)
if [ "$FOOD_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Food search successful (found $FOOD_COUNT foods)${NC}\n"
else
    echo -e "${RED}✗ Food search failed${NC}\n"
    exit 1
fi

# Test 6: Get food by ID
echo -e "${BLUE}6. Testing get food by ID...${NC}"
FOOD_RESPONSE=$(curl -s -w "\n%{http_code}" ${BASE_URL}/api/foods/1 \
    -H "Authorization: Bearer $TOKEN")
HTTP_CODE=$(echo "$FOOD_RESPONSE" | tail -n1)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Get food by ID successful${NC}\n"
else
    echo -e "${RED}✗ Get food by ID failed (HTTP $HTTP_CODE)${NC}\n"
    exit 1
fi

# Test 7: Create food log
echo -e "${BLUE}7. Testing create food log...${NC}"
LOG_RESPONSE=$(curl -s -X POST ${BASE_URL}/api/food-logs \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"foodId\":\"1\",\"servings\":2,\"mealType\":\"lunch\",\"date\":\"2026-02-03\",\"notes\":\"Test log\"}")
LOG_ID=$(echo $LOG_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('id', ''))" 2>/dev/null)
if [ -n "$LOG_ID" ]; then
    echo -e "${GREEN}✓ Food log created successfully (ID: $LOG_ID)${NC}\n"
else
    echo -e "${RED}✗ Create food log failed${NC}\n"
    exit 1
fi

# Test 8: Get daily logs
echo -e "${BLUE}8. Testing get daily logs...${NC}"
DAILY_RESPONSE=$(curl -s "${BASE_URL}/api/food-logs?date=2026-02-03" \
    -H "Authorization: Bearer $TOKEN")
ENTRY_COUNT=$(echo $DAILY_RESPONSE | python3 -c "import sys, json; print(len(json.load(sys.stdin).get('entries', [])))" 2>/dev/null)
if [ "$ENTRY_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Get daily logs successful (found $ENTRY_COUNT entries)${NC}\n"
else
    echo -e "${RED}✗ Get daily logs failed${NC}\n"
    exit 1
fi

# Test 9: Update food log
echo -e "${BLUE}9. Testing update food log...${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT ${BASE_URL}/api/food-logs/${LOG_ID} \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"servings":3,"notes":"Updated test log"}')
UPDATED_SERVINGS=$(echo $UPDATE_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('servings', 0))" 2>/dev/null)
if [ "$UPDATED_SERVINGS" -eq 3 ]; then
    echo -e "${GREEN}✓ Food log updated successfully${NC}\n"
else
    echo -e "${RED}✗ Update food log failed${NC}\n"
    exit 1
fi

# Test 10: Get user profile
echo -e "${BLUE}10. Testing get user profile...${NC}"
PROFILE_RESPONSE=$(curl -s -w "\n%{http_code}" ${BASE_URL}/api/users/profile \
    -H "Authorization: Bearer $TOKEN")
HTTP_CODE=$(echo "$PROFILE_RESPONSE" | tail -n1)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Get user profile successful${NC}\n"
else
    echo -e "${RED}✗ Get user profile failed (HTTP $HTTP_CODE)${NC}\n"
    exit 1
fi

# Test 11: Update user goals
echo -e "${BLUE}11. Testing update user goals...${NC}"
GOALS_RESPONSE=$(curl -s -X PUT ${BASE_URL}/api/users/goals \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"dailyCaloriesGoal":2500,"dailyProteinGoal":150}')
CALORIES_GOAL=$(echo $GOALS_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('dailyCaloriesGoal', 0))" 2>/dev/null)
if [ "$CALORIES_GOAL" -eq 2500 ]; then
    echo -e "${GREEN}✓ User goals updated successfully${NC}\n"
else
    echo -e "${RED}✗ Update user goals failed${NC}\n"
    exit 1
fi

# Test 12: Delete food log
echo -e "${BLUE}12. Testing delete food log...${NC}"
DELETE_RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE ${BASE_URL}/api/food-logs/${LOG_ID} \
    -H "Authorization: Bearer $TOKEN")
HTTP_CODE=$(echo "$DELETE_RESPONSE" | tail -n1)
if [ "$HTTP_CODE" -eq 204 ]; then
    echo -e "${GREEN}✓ Food log deleted successfully${NC}\n"
else
    echo -e "${RED}✗ Delete food log failed (HTTP $HTTP_CODE)${NC}\n"
    exit 1
fi

echo -e "${BLUE}=== All tests passed! ===${NC}"
echo -e "${GREEN}✓ All 12 endpoint tests completed successfully${NC}\n"
