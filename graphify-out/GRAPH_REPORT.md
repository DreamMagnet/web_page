# Graph Report - web_page  (2026-09-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 308 nodes · 455 edges · 26 communities (12 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97ccc272`
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

## God Nodes (most connected - your core abstractions)
1. `AuthService` - 20 edges
2. `create_user()` - 13 edges
3. `UserPublic` - 12 edges
4. `authenticate()` - 12 edges
5. `update_user()` - 12 edges
6. `CountUpDirective` - 9 edges
7. `options` - 9 edges
8. `RevealDirective` - 7 edges
9. `TiltDirective` - 7 edges
10. `AppLogoComponent` - 7 edges

## Surprising Connections (you probably didn't know these)
- `authenticate()` --uses--> `UserPublic`  [INFERRED]
  backend/auth-service/app/services/user_service.py → backend/auth-service/app/models/user.py
- `create_user()` --uses--> `UserPublic`  [INFERRED]
  backend/auth-service/app/services/user_service.py → backend/auth-service/app/models/user.py
- `login()` --uses--> `LoginResponse`  [INFERRED]
  backend/auth-service/app/api/auth.py → backend/auth-service/app/models/user.py
- `register()` --uses--> `LoginResponse`  [INFERRED]
  backend/auth-service/app/api/auth.py → backend/auth-service/app/models/user.py
- `register()` --uses--> `UserCreate`  [INFERRED]
  backend/auth-service/app/api/auth.py → backend/auth-service/app/models/user.py

## Import Cycles
- None detected.

## Communities (26 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (35): login(), logout(), Authentication endpoints: register, login, logout., register(), hash_password(), new_session_token(), Password hashing and session token utilities., _to_bcrypt_input() (+27 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (33): UserPublic, get_current_user(), get_session_token(), UserPublic, Shared FastAPI dependencies for the profile service., get, UserPublic, Current-user profile endpoints. (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (32): @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, jasmine-core (+24 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (15): CountUpDirective, Directive, Input, RevealDirective, Directive, Input, TiltDirective, Directive (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (14): AppComponent, Component, HostListener, appConfig, routes, AppLogoComponent, Component, Input (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (28): build, extract-i18n, serve, test, builder, configurations, defaultConfiguration, development (+20 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (25): @angular/animations, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/platform-browser-dynamic, @angular/router (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.19
Nodes (8): LoginPayload, LoginResponse, RegisterPayload, UpdateProfilePayload, User, AuthService, environment, Injectable

### Community 8 - "Community 8"
Cohesion: 0.16
Nodes (16): options, assets, browser, index, outputPath, polyfills, scripts, styles (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.24
Nodes (9): Feature, get_landing_content(), LandingContent, BaseModel, get, Public landing-page content served by the profile service., create_app(), FastAPI (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (7): cli, analytics, packageManager, newProjectRoot, projects, $schema, version

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (3): create_app(), FastAPI, FastAPI entry point for the auth microservice.

## Knowledge Gaps
- **64 isolated node(s):** `Settings`, `Settings`, `Testimonial`, `analytics`, `packageManager` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 130 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 6` to `Community 8`, `Community 2`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `zone.js` connect `Community 8` to `Community 6`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `create_user()` (e.g. with `UserCreate` and `UserPublic`) actually correct?**
  _`create_user()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `UserPublic` (e.g. with `authenticate()` and `create_user()`) actually correct?**
  _`UserPublic` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Settings`, `Settings`, `Testimonial` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1141025641025641 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09986504723346828 - nodes in this community are weakly interconnected._