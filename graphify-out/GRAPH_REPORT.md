# Graph Report - web_page  (2026-09-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 311 nodes · 449 edges · 34 communities (16 shown, 6 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `905fe49d`
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
- Community 17
- Community 23
- Community 25
- Community 26
- Community 33

## God Nodes (most connected - your core abstractions)
1. `AuthService` - 20 edges
2. `UserPublic` - 12 edges
3. `update_user()` - 12 edges
4. `authenticate()` - 11 edges
5. `create_user()` - 11 edges
6. `CountUpDirective` - 9 edges
7. `options` - 9 edges
8. `RevealDirective` - 7 edges
9. `AppLogoComponent` - 7 edges
10. `TiltDirective` - 7 edges

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

## Communities (34 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (21): appConfig, routes, AppLogoComponent, Component, Input, RevealDirective, Directive, Input (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (32): get_current_user(), get_session_token(), UserPublic, Shared FastAPI dependencies for the profile service., get, UserPublic, Current-user profile endpoints., read_me() (+24 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (31): login(), logout(), Authentication endpoints: register, login, logout., register(), new_session_token(), _ensure_file(), Any, Path (+23 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (28): build, extract-i18n, serve, test, builder, configurations, defaultConfiguration, development (+20 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (25): @angular/animations, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/platform-browser-dynamic, @angular/router (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (23): @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, jasmine-core (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (16): options, assets, browser, index, outputPath, polyfills, scripts, styles (+8 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (5): CountUpDirective, Directive, Input, ProfileComponent, Component

### Community 8 - "Community 8"
Cohesion: 0.24
Nodes (9): Feature, get_landing_content(), LandingContent, BaseModel, get, Public landing-page content served by the profile service., create_app(), FastAPI (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, ng, start, test, watch (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.21
Nodes (4): Component, LoginComponent, Component, RegisterComponent

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (7): cli, analytics, packageManager, newProjectRoot, projects, $schema, version

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (4): TiltDirective, Directive, HostListener, Input

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (3): AppComponent, Component, HostListener

### Community 14 - "Community 14"
Cohesion: 0.60
Nodes (4): hash_password(), Password hashing and session token utilities., _to_bcrypt_input(), verify_password()

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (3): create_app(), FastAPI, FastAPI entry point for the auth microservice.

## Knowledge Gaps
- **64 isolated node(s):** `Testimonial`, `Settings`, `Settings`, `analytics`, `packageManager` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 134 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 4` to `Community 9`, `Community 6`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `zone.js` connect `Community 6` to `Community 4`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `UserPublic` (e.g. with `authenticate()` and `create_user()`) actually correct?**
  _`UserPublic` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Testimonial`, `Settings`, `Settings` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08078431372549019 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09672830725462304 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1361344537815126 - nodes in this community are weakly interconnected._