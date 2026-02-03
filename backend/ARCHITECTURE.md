# Food Tracker Backend Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│                    (Flutter Frontend / API Clients)              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS Requests
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                    API Gateway Layer                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Rate Limiting Middleware                                   │ │
│  │  - General: 100 req/15min                                   │ │
│  │  - Auth: 10 req/15min                                       │ │
│  └─────────────────────┬──────────────────────────────────────┘ │
│  ┌─────────────────────▼──────────────────────────────────────┐ │
│  │  CORS & Body Parser Middleware                              │ │
│  └─────────────────────┬──────────────────────────────────────┘ │
└────────────────────────┼─────────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │               │
┌─────────▼─────┐ ┌──────▼──────┐ ┌────▼──────────┐
│ Auth Routes   │ │ Food Routes │ │ Food Log      │
│               │ │             │ │ Routes        │
│ /api/auth/*   │ │ /api/foods/*│ │ /api/food-    │
│               │ │             │ │ logs/*        │
└─────┬─────────┘ └──────┬──────┘ └────┬──────────┘
      │                  │               │
      │      ┌───────────┴───────────────┴─────────────┐
      │      │                                          │
┌─────▼──────▼──────────────────────────────────┐ ┌────▼─────────┐
│         Authentication Middleware              │ │ User Routes  │
│         (JWT Token Validation)                 │ │              │
└─────┬──────────────────────────────────────────┘ │ /api/users/* │
      │                                             └────┬─────────┘
      │                                                  │
┌─────▼──────────────────────────────────────────────┬─┘
│                Controller Layer                     │
├────────────────┬──────────────┬────────────────────┴──────┐
│ authController │foodController│foodLogController│userController│
│                │              │                 │          │
│ - register()   │ - search()   │ - create()     │- getProfile() │
│ - login()      │ - getById()  │ - getByDate()  │- updateGoals()│
│ - validate()   │ - create()   │ - update()     │          │
└────────┬───────┴──────┬───────┴────────┬────────┴──────────┘
         │              │                 │
         │              │                 │
┌────────▼──────────────▼─────────────────▼─────────────────┐
│                   Service Layer                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Nutrition Service (External API Integration)        │ │
│  │  - USDA FoodData Central API                         │ │
│  │  - Open Food Facts API (Fallback)                    │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                   Database Layer                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SQLite Database (foodtracker.db)                    │  │
│  │                                                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │   users    │  │   foods    │  │  food_logs   │  │  │
│  │  ├────────────┤  ├────────────┤  ├──────────────┤  │  │
│  │  │ id         │  │ id         │  │ id           │  │  │
│  │  │ email      │  │ name       │  │ user_id  (FK)│  │  │
│  │  │ password_  │  │ brand      │  │ food_id  (FK)│  │  │
│  │  │   hash     │  │ serving_   │  │ servings     │  │  │
│  │  │ name       │  │   size     │  │ meal_type    │  │  │
│  │  │ created_at │  │ calories   │  │ date         │  │  │
│  │  │ updated_at │  │ protein    │  │ notes        │  │  │
│  │  └────────────┘  │ carbs      │  │ created_at   │  │  │
│  │                  │ fat        │  │ updated_at   │  │  │
│  │  ┌────────────┐  │ fiber      │  └──────────────┘  │  │
│  │  │user_goals  │  │ sugar      │                    │  │
│  │  ├────────────┤  │ sodium     │                    │  │
│  │  │ id         │  │ source     │                    │  │
│  │  │ user_id(FK)│  │ external_id│                    │  │
│  │  │ daily_     │  │ created_at │                    │  │
│  │  │  calories_ │  │ updated_at │                    │  │
│  │  │  goal      │  └────────────┘                    │  │
│  │  │ daily_     │                                     │  │
│  │  │  protein_  │  Indexes:                           │  │
│  │  │  goal      │  - idx_food_logs_user_date         │  │
│  │  │ daily_     │  - idx_foods_name                   │  │
│  │  │  carbs_    │                                     │  │
│  │  │  goal      │  Initial Seed Data: 15 foods       │  │
│  │  │ daily_fat_ │                                     │  │
│  │  │  goal      │                                     │  │
│  │  │ created_at │                                     │  │
│  │  │ updated_at │                                     │  │
│  │  └────────────┘                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

External APIs:
┌────────────────────────────────────────────────────────────┐
│  USDA FoodData Central                                      │
│  https://api.nal.usda.gov/fdc/v1                           │
│  - Comprehensive nutritional database                       │
└────────────────────────────────────────────────────────────┘
                              ▼ (fallback)
┌────────────────────────────────────────────────────────────┐
│  Open Food Facts                                            │
│  https://world.openfoodfacts.org                           │
│  - Open source food database                                │
└────────────────────────────────────────────────────────────┘


Request Flow Example (Create Food Log):

1. Client sends POST /api/food-logs with JWT token
2. Rate limiter checks request count (100/15min limit)
3. Authentication middleware validates JWT token
4. Request routed to foodLogController.create()
5. Controller validates input (foodId, servings, mealType, date)
6. Controller queries database for food details
7. Controller calculates nutritional totals (servings × nutrients)
8. Controller inserts log entry into food_logs table
9. Controller returns formatted response with totals
10. Response sent back to client


Security Layers:

┌─────────────────────────────────────────────────────────────┐
│  1. Rate Limiting (express-rate-limit)                      │
│     - Prevents DoS attacks                                  │
│     - IP-based throttling                                   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  2. JWT Authentication (jsonwebtoken)                       │
│     - Stateless authentication                              │
│     - 24-hour token expiration                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  3. Password Hashing (bcrypt)                               │
│     - 10 salt rounds                                        │
│     - One-way hashing                                       │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  4. SQL Injection Prevention                                │
│     - Parameterized queries                                 │
│     - No string concatenation in SQL                        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  5. Input Validation                                        │
│     - Required field checks                                 │
│     - Data type validation                                  │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

✅ **Modular Architecture**: Separation of concerns with controllers, routes, and services
✅ **Security**: Multiple layers including rate limiting, JWT auth, and password hashing  
✅ **Scalability**: Easy to add new endpoints and features
✅ **External Integration**: Seamless connection to public nutritional APIs
✅ **Performance**: Database indexing for fast queries
✅ **Reliability**: Graceful degradation when external APIs fail
