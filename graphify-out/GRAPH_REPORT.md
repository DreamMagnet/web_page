# Graph Report - web_page  (2026-09-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 303 nodes · 471 edges · 29 communities (12 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15a6cc58`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16

## God Nodes (most connected - your core abstractions)
1. `AuthService` - 20 edges
2. `@angular/core` - 14 edges
3. `UserPublic` - 12 edges
4. `create_user()` - 12 edges
5. `authenticate()` - 11 edges
6. `update_user()` - 11 edges
7. `CountUpDirective` - 9 edges
8. `options` - 9 edges
9. `@angular/router` - 8 edges
10. `AppLogoComponent` - 7 edges

## Surprising Connections (you probably didn't know these)
- `get_current_user()` --uses--> `UserPublic`  [INFERRED]
  backend/profile-service/app/api/deps.py → backend/auth-service/app/models/user.py
- `read_me()` --uses--> `UserPublic`  [INFERRED]
  backend/profile-service/app/api/users.py → backend/auth-service/app/models/user.py
- `update_me()` --uses--> `UserPublic`  [INFERRED]
  backend/profile-service/app/api/users.py → backend/auth-service/app/models/user.py
- `get_by_session()` --uses--> `UserPublic`  [INFERRED]
  backend/profile-service/app/services/user_service.py → backend/auth-service/app/models/user.py
- `_to_public()` --uses--> `UserPublic`  [INFERRED]
  backend/profile-service/app/services/user_service.py → backend/auth-service/app/models/user.py

## Import Cycles
- None detected.

## Communities (29 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (24): AppComponent, Component, HostListener, appConfig, routes, AppLogoComponent, Component, Input (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (35): login(), logout(), Authentication endpoints: register, login, logout., register(), hash_password(), new_session_token(), Password hashing and session token utilities., _to_bcrypt_input() (+27 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (30): Thread-safe, atomic JSON persistence for the shared users file., get_current_user(), get_session_token(), Shared FastAPI dependencies for the profile service., get, Current-user profile endpoints., read_me(), update_me() (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (35): build, extract-i18n, serve, test, builder, configurations, defaultConfiguration, cli (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (28): name, private, scripts, build, ng, start, test, watch (+20 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (9): LoginPayload, LoginResponse, RegisterPayload, UpdateProfilePayload, User, AuthService, environment, Injectable (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (14): dependencies, @angular/animations, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/platform-browser-dynamic (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.21
Nodes (9): Feature, get_landing_content(), LandingContent, BaseModel, get, Public landing-page content served by the profile service., create_app(), FastAPI (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (12): devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, jasmine-core, karma, karma-chrome-launcher, karma-coverage (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (10): options, assets, browser, index, outputPath, polyfills, scripts, styles (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.43
Nodes (3): CountUpDirective, Directive, Input

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (3): create_app(), FastAPI, FastAPI entry point for the auth microservice.

## Knowledge Gaps
- **79 isolated node(s):** `Testimonial`, `Settings`, `Settings`, `builder`, `defaultConfiguration` (+74 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 146 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `Community 0` to `Community 4`, `Community 5`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `UserPublic` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 6` to `Community 4`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `UserPublic` (e.g. with `authenticate()` and `create_user()`) actually correct?**
  _`UserPublic` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `create_user()` (e.g. with `UserCreate` and `UserPublic`) actually correct?**
  _`create_user()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Testimonial`, `Settings`, `Settings` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07493061979648474 - nodes in this community are weakly interconnected._